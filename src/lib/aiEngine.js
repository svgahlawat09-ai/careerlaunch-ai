import { TARGET_ROLES, QUESTION_BANK } from '../data/mockData';

// Synonyms map for semantic skill matching
const SYNONYMS = {
  'js': ['javascript', 'js', 'es6', 'ecmascript'],
  'javascript': ['javascript', 'js', 'es6', 'ecmascript'],
  'react': ['react', 'reactjs', 'react.js', 'frontend react'],
  'node': ['node', 'node.js', 'nodejs'],
  'node.js': ['node', 'node.js', 'nodejs'],
  'express': ['express', 'expressjs', 'express.js'],
  'expressjs': ['express', 'expressjs', 'express.js'],
  'tensorflow': ['tensorflow', 'tensorflow framework', 'tf'],
  'cpp': ['c++', 'cpp', 'c plus plus'],
  'c++': ['c++', 'cpp', 'c plus plus'],
  'mongodb': ['mongodb', 'mongo'],
  'postgres': ['postgresql', 'postgres', 'psql'],
  'postgresql': ['postgresql', 'postgres', 'psql'],
  'tailwind': ['tailwind css', 'tailwind', 'tailwindcss'],
  'next.js': ['next.js', 'nextjs', 'next'],
  'nextjs': ['next.js', 'nextjs', 'next'],
  'redux': ['redux', 'redux toolkit', 'rtk'],
  'typescript': ['typescript', 'ts'],
  'docker': ['docker', 'containerization'],
  'aws': ['aws', 'amazon web services'],
  'python': ['python', 'py'],
  'scikit-learn': ['scikit-learn', 'sklearn'],
  'algorithms': ['dsa', 'data structures', 'algorithms'],
  'a11y': ['accessibility', 'a11y', 'web accessibility'],
  'html': ['html', 'html5'],
  'css': ['css', 'css3']
};

// Check if a skill exists in the resume text using synonym-aware matching
export function checkSkillPresence(text = '', skillName = '') {
  const normText = text.toLowerCase();
  const normSkill = skillName.toLowerCase();
  
  let equivalents = [normSkill];
  for (const [canonical, aliases] of Object.entries(SYNONYMS)) {
    if (canonical === normSkill || aliases.some(alias => alias.toLowerCase() === normSkill)) {
      equivalents = Array.from(new Set([canonical, ...aliases]));
      break;
    }
  }

  for (const eq of equivalents) {
    const escaped = eq.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = (eq.length <= 3) 
      ? new RegExp(`\\b${escaped}\\b`, 'i') 
      : new RegExp(`\\b${escaped}\\b|${escaped}`, 'i');
      
    if (regex.test(normText)) {
      return true;
    }
  }
  return false;
}

// Parse resume text into distinct logical sections
export function parseResumeSections(text = '') {
  const sections = {
    skills: '',
    softSkills: '',
    education: '',
    experience: '',
    projects: '',
    certifications: '',
    tools: '',
    summary: ''
  };

  const lines = text.split('\n');
  let currentSection = 'summary';

  const headerPatterns = [
    { key: 'skills', regex: /^(technical skills|skills|technologies|core competencies|competencies|languages)/i },
    { key: 'softSkills', regex: /^(soft skills|interpersonal skills|personal skills)/i },
    { key: 'education', regex: /^(education|academic background|university|coursework)/i },
    { key: 'experience', regex: /^(experience|work history|employment|professional experience|internship|roles)/i },
    { key: 'projects', regex: /^(projects|academic projects|personal projects|key projects)/i },
    { key: 'certifications', regex: /^(certifications|licenses|awards|achievements)/i },
    { key: 'tools', regex: /^(tools|developer tools|databases|software)/i }
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let matched = false;
    for (const pat of headerPatterns) {
      if (pat.regex.test(trimmed)) {
        currentSection = pat.key;
        matched = true;
        break;
      }
    }

    if (!matched) {
      sections[currentSection] += line + '\n';
    }
  }

  return sections;
}

// Local Resume Analysis Engine using rules and synonyms
export function analyzeResume(text = '', targetRoleKey = 'frontend') {
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  const sections = parseResumeSections(text);
  
  // Clean empty sections check
  const sectionChecks = {
    contact: /(email|phone|github|linkedin|contact|location|address)/i.test(text),
    summary: sections.summary.trim().length > 10,
    experience: sections.experience.trim().length > 15,
    education: sections.education.trim().length > 15,
    skills: sections.skills.trim().length > 15,
    projects: sections.projects.trim().length > 15,
    certifications: sections.certifications.trim().length > 15 || sections.tools.trim().length > 15
  };

  const targetKeywords = roleConfig.keywords;
  const matchedKeywords = [];
  const missingKeywords = [];

  targetKeywords.forEach(kw => {
    if (checkSkillPresence(text, kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Calculate weighted criteria:
  // 1. Skills Match (35%)
  const skillsMatchScore = Math.round((matchedKeywords.length / Math.max(1, targetKeywords.length)) * 100);

  // 2. Experience Relevance (20%)
  let expScore = 0;
  if (sectionChecks.experience) {
    expScore = 60;
    const expText = sections.experience.toLowerCase();
    // check for keywords in experience
    const matchedExpKw = targetKeywords.filter(kw => expText.includes(kw.toLowerCase()));
    expScore += Math.min(40, matchedExpKw.length * 10);
  }

  // 3. Education (10%)
  const educationScore = sectionChecks.education ? (text.toLowerCase().includes('gpa') || text.toLowerCase().includes('degree') ? 100 : 70) : 0;

  // 4. Resume Structure (10%)
  const detectedSectionsCount = Object.values(sectionChecks).filter(Boolean).length;
  const formattingScore = Math.round((detectedSectionsCount / 7) * 100);

  // 5. Keyword Coverage (15%)
  const keywordMatchScore = skillsMatchScore; 

  // 6. Projects (10%)
  let projectsScore = 0;
  if (sectionChecks.projects) {
    projectsScore = 70;
    const projText = sections.projects.toLowerCase();
    const matchedProjKw = targetKeywords.filter(kw => projText.includes(kw.toLowerCase()));
    projectsScore += Math.min(30, matchedProjKw.length * 10);
  }

  // Weighted Overall ATS Score
  const overallScore = Math.round(
    (skillsMatchScore * 0.35) +
    (expScore * 0.20) +
    (educationScore * 0.10) +
    (formattingScore * 0.10) +
    (keywordMatchScore * 0.15) +
    (projectsScore * 0.10)
  );

  // Construct explainability details
  const atsBreakdown = {
    skillsMatch: {
      score: skillsMatchScore,
      reason: `Found ${matchedKeywords.length} of ${targetKeywords.length} skills required for ${roleConfig.title}.`
    },
    experienceRelevance: {
      score: expScore,
      reason: sectionChecks.experience 
        ? `Experience section contains ${targetKeywords.filter(kw => sections.experience.toLowerCase().includes(kw.toLowerCase())).length} key target skills.`
        : "Experience section is not detected in your resume structure."
    },
    education: {
      score: educationScore,
      reason: sectionChecks.education 
        ? "Education credentials and coursework detected."
        : "Education section is missing or too brief."
    },
    resumeStructure: {
      score: formattingScore,
      reason: `Detected ${detectedSectionsCount} key sections out of 7 required ATS blocks.`
    },
    keywordCoverage: {
      score: keywordMatchScore,
      reason: `Keywords coverage is aligned at ${keywordMatchScore}% matching synonyms.`
    },
    projects: {
      score: projectsScore,
      reason: sectionChecks.projects 
        ? "Projects section found with relevant matching descriptions."
        : "No distinct projects section detected in the structure."
    }
  };

  // Generate actionable tips referencing actual findings
  const tips = [];
  if (!sectionChecks.summary) {
    tips.push("Your professional summary is absent or too brief. Add a 3-4 sentence profile summary at the top.");
  }
  if (!sectionChecks.contact) {
    tips.push("Contact details (LinkedIn URL, Email, Phone) were not detected at the top of your resume.");
  }
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 3).join(', ');
    tips.push(`"${topMissing}" is not detected anywhere in your Skills, Projects, or Experience sections. Consider incorporating them.`);
  } else {
    tips.push("Excellent keyword coverage! All target skills were identified in your profile.");
  }
  if (!/\d+%|\$\d+|\d+\s*users|\d+\s*projects/i.test(text)) {
    tips.push("Quantify your achievements: add measurable metrics (e.g. 'Improved efficiency by 22%' or 'Managed 4+ projects').");
  }

  return {
    overallScore: Math.min(98, Math.max(15, overallScore)),
    keywordMatchScore,
    formattingScore,
    actionVerbScore: 90, // preserved for UI backward compatibility
    wordCountScore: 100, // preserved for UI backward compatibility
    totalWords: text.split(/\s+/).length,
    sectionCheck: sectionChecks,
    matchedKeywords,
    missingKeywords,
    tips,
    atsBreakdown,
    targetRoleTitle: roleConfig.title
  };
}

// Adaptive local question generator
export function generateAdaptiveQuestionsLocal(resumeText = '', role = 'frontend', difficulty = 'beginner') {
  const standardQuestions = QUESTION_BANK[role]?.[difficulty] || QUESTION_BANK['frontend']['beginner'];
  
  // Dynamic project questions
  const projectNames = [];
  const lines = resumeText.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes('project') || line.toLowerCase().includes('built') || line.toLowerCase().includes('developed')) {
      const match = line.match(/\b([A-Z][a-zA-Z0-9]{2,15}(?:\s+[A-Z][a-zA-Z0-9]{2,15}){0,2})\b/);
      if (match && !['Project', 'Projects', 'Experience', 'Education', 'Summary', 'Skills', 'TechStart'].includes(match[1])) {
        projectNames.push(match[1]);
      }
    }
  }
  const uniqueProjects = Array.from(new Set(projectNames)).slice(0, 2);

  const adaptiveQs = [...standardQuestions];

  if (uniqueProjects.length > 0) {
    adaptiveQs.unshift({
      id: `adaptive-proj-1`,
      question: `Describe the technical challenges and architecture of your project "${uniqueProjects[0]}" mentioned in your resume.`,
      keywords: ['architecture', 'challenges', 'decisions', 'database', 'frontend', 'learned'],
      tips: "Explain why you built it, the technical stack chosen, and how you solved a key technical bottleneck."
    });
  } else {
    adaptiveQs.unshift({
      id: `adaptive-proj-fallback`,
      question: "Describe the architecture and main technical challenges of a software engineering project mentioned in your resume.",
      keywords: ['architecture', 'challenges', 'database', 'api', 'design'],
      tips: "Focus on the database design, frontend-backend flow, and how you resolved bottlenecks."
    });
  }

  return adaptiveQs.slice(0, 3);
}

// Rule-Based Interview Answer Evaluator
export function evaluateInterviewAnswer(answerText = '', questionObj = {}) {
  const normalized = answerText.toLowerCase().trim();
  const words = normalized.match(/\b[a-z0-9'-]+\b/g) || [];
  const wordCount = words.length;

  if (wordCount < 8) {
    return {
      score: 3,
      feedback: "Your response is too brief. Elaborate on your thought process and provide specific details.",
      strengths: "None identified due to length.",
      weaknesses: "Answer is too short.",
      tip: "Use the STAR method (Situation, Task, Action, Result) to structure answers to at least 3-4 sentences.",
      metrics: { wordCount, keywordMatches: 0, starDetected: false }
    };
  }

  const expectedKeywords = questionObj.keywords || [];
  const matchedKeywords = expectedKeywords.filter(kw => 
    normalized.includes(kw.toLowerCase())
  );

  // STAR indicator words
  const starIndicators = ['situation', 'task', 'action', 'result', 'because', 'led to', 'improved', 'learned', 'achieved', 'solved', 'example'];
  const starMatches = starIndicators.filter(ind => normalized.includes(ind));
  const starDetected = starMatches.length >= 2;

  // Filler words ratio check
  const fillerWords = ['like', 'um', 'uh', 'you know', 'basically', 'actually', 'sort of'];
  const fillerCount = fillerWords.reduce((acc, filler) => {
    const matches = normalized.match(new RegExp(`\\b${filler}\\b`, 'gi'));
    return acc + (matches ? matches.length : 0);
  }, 0);

  let score = 5;
  if (wordCount >= 40 && wordCount <= 160) score += 2;
  else if (wordCount > 25) score += 1;

  if (expectedKeywords.length > 0) {
    const kwRatio = matchedKeywords.length / expectedKeywords.length;
    score += Math.round(kwRatio * 3);
  } else {
    score += 1;
  }

  if (starDetected) score += 1;
  if (fillerCount > 3) score -= 1;

  const finalScore = Math.min(10, Math.max(2, score));

  // Strengths / Weaknesses analysis
  const strengths = matchedKeywords.length > 0 
    ? `You correctly referenced key concepts: '${matchedKeywords.slice(0, 3).join("', '")}'.`
    : "Good attempt at explaining the response flow.";
  
  const weaknesses = matchedKeywords.length < expectedKeywords.length
    ? `You missed important details about: '${expectedKeywords.filter(k => !matchedKeywords.includes(k)).slice(0, 2).join("' and '")}'.`
    : "Could add more technical metrics or performance numbers.";

  let feedback = `Good effort! You touched on relevant core concepts, but there is room for extra clarity.`;
  if (finalScore >= 8) {
    feedback = `Excellent and structured answer! You clearly demonstrated sound technical understanding and structure.`;
  } else if (finalScore < 6) {
    feedback = `Your answer provides a basic start, but lacks depth and specific technical terminology.`;
  }

  return {
    score: finalScore,
    feedback: feedback,
    strengths,
    weaknesses,
    starDetected,
    tip: questionObj.tips || "Structure technical explanations by defining the concept first, followed by a concrete real-world application example.",
    metrics: {
      wordCount,
      keywordMatches: matchedKeywords.length,
      starDetected
    }
  };
}

// Fetch content from Gemini API in a standard format
export async function callGeminiAPI(apiKey, prompt, systemInstruction = '') {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');

  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');
  }
  return JSON.parse(cleaned.trim());
}

// Generate interview questions using Gemini
export async function generateAdaptiveQuestionsGemini(apiKey, resumeText, roleKey, difficulty) {
  const roleTitle = TARGET_ROLES[roleKey]?.title || roleKey;
  const systemInstruction = `You are a professional technical recruiter conducting a mock interview.
Generate exactly 3 interview questions based on the candidate's resume, job role, and difficulty level.
Return a JSON array of exactly 3 objects.
Each object must have the following fields:
- id: a unique string like "q-1", "q-2"
- question: the question text (personalized to candidate projects/skills if available)
- keywords: array of expected terms/technologies to search for in answer
- tips: helpful hint for answering this question.`;

  const prompt = `Resume Content:
${resumeText}

Target Job Role: ${roleTitle}
Difficulty: ${difficulty}`;

  return await callGeminiAPI(apiKey, prompt, systemInstruction);
}

// Evaluate interview response using Gemini
export async function evaluateAnswerGemini(apiKey, questionText, answerText, expectedKeywords) {
  const systemInstruction = `You are a senior tech lead conducting a technical interview.
Evaluate the candidate's answer using the STAR (Situation, Task, Action, Result) methodology.
Be critical and constructive. Detail what they explained correctly and what they missed.
Return a JSON object with:
- score: number between 1 and 10
- feedback: a summary text assessment
- strengths: separate text highlighting strengths in their response
- weaknesses: separate text highlighting what was missing or incorrect
- starDetected: boolean indicating if they structured it using the STAR format
- tip: detailed actionable suggestions for improvement.`;

  const prompt = `Question: ${questionText}
Expected Terms: ${expectedKeywords.join(', ')}
Candidate Answer: ${answerText}`;

  return await callGeminiAPI(apiKey, prompt, systemInstruction);
}

// Analyze resume using Gemini API
export async function analyzeResumeGemini(apiKey, resumeText, targetRoleKey) {
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  const systemInstruction = `You are an advanced ATS (Applicant Tracking System) Analyzer.
Examine the resume and calculate the weighted ATS score based on:
1. Skills Match (35%)
2. Experience Relevance (20%)
3. Education (10%)
4. Resume Structure (10%)
5. Keyword Coverage (15%)
6. Projects (10%)

For section check, check if these sections are present in the resume structure: contact, summary, experience, education, skills, projects, certifications.
For keywords, map the candidate's resume against target keywords for the role: ${roleConfig.keywords.join(', ')}. Highlight matched vs missing keywords.
Return a JSON object containing:
- overallScore: weighted score between 15 and 98
- keywordMatchScore: score out of 100
- formattingScore: score out of 100
- matchedKeywords: array of matching keywords
- missingKeywords: array of missing keywords
- tips: array of actionable recommendations. Each recommendation MUST reference evidence or details found (or confirmed missing) in the resume text.
- atsBreakdown: object with fields (skillsMatch, experienceRelevance, education, resumeStructure, keywordCoverage, projects). Each field contains:
    - score: number out of 100
    - reason: explanation of the score, referencing the resume text.`;

  const prompt = `Resume Text:
${resumeText}`;

  return await callGeminiAPI(apiKey, prompt, systemInstruction);
}

// Calculate match percentage and details between a resume and a job listing
export function calculateInternshipMatch(resumeText = '', internship, stateUserSkills = {}) {
  const text = resumeText || '';
  const requiredSkills = internship.skills || [];
  
  let matchedCount = 0;
  const matchedList = [];
  const missingList = [];
  
  requiredSkills.forEach(skill => {
    if (checkSkillPresence(text, skill)) {
      matchedCount++;
      matchedList.push(skill);
    } else {
      // Fallback: check profile slider level
      const userRating = stateUserSkills[skill];
      if (userRating !== undefined && userRating >= 3.0) {
        matchedCount++;
        matchedList.push(skill);
      } else {
        missingList.push(skill);
      }
    }
  });

  const skillsMatchRatio = requiredSkills.length > 0 ? matchedCount / requiredSkills.length : 0.8;
  
  // Calculate base score
  let score = 50 + Math.round(skillsMatchRatio * 30);
  
  // Additional points for sections
  const hasExp = /(experience|internship|work)/i.test(text);
  if (hasExp) score += 10;
  
  const hasProj = /(project|projects)/i.test(text);
  if (hasProj) score += 10;

  const matchPercentage = Math.min(99, Math.max(45, score));

  // Determine explanation
  let explanation = `This role is a solid match for your technical background.`;
  if (matchedList.includes('React') || matchedList.includes('Node') || matchedList.includes('MongoDB')) {
    explanation = `Recommended because your MERN projects and javascript skills align with this role.`;
  } else if (matchedList.length > 2) {
    explanation = `Recommended because your experience in ${matchedList.slice(0, 3).join(', ')} directly supports this internship's goals.`;
  }

  return {
    matchPercentage,
    matchedList,
    missingList,
    explanation
  };
}

// Main filter and match runner
export function matchInternships(resumeText = '', targetRoleKey = 'frontend', internships = [], stateUserSkills = {}) {
  return internships.map(internship => {
    const matchData = calculateInternshipMatch(resumeText, internship, stateUserSkills);
    return {
      ...internship,
      matchPercentage: matchData.matchPercentage,
      matchedSkills: matchData.matchedList,
      missingSkills: matchData.missingList,
      matchExplanation: matchData.explanation
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Compute Skill Gap diff between user ratings and role benchmark
export function computeSkillGap(userSkillsObj = {}, targetRoleKey = 'frontend') {
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  const benchmarks = roleConfig.benchmarkSkills;

  return benchmarks.map(skill => {
    const userRating = Number(userSkillsObj[skill.name] ?? 2.5);
    const requiredRating = skill.level;
    const gap = Math.max(0, Number((requiredRating - userRating).toFixed(1)));

    let severity = 'Minor';
    if (gap >= 1.8) severity = 'Critical';
    else if (gap >= 0.8) severity = 'Moderate';

    let reason = '';
    if (severity === 'Critical') {
      reason = `Crucial benchmark gap for ${roleConfig.title} positions. Prioritize learning immediately.`;
    } else if (severity === 'Moderate') {
      reason = `Important core skill required to pass technical screening assessments.`;
    } else {
      reason = `Solid baseline! Continuous practice will help reach senior proficiency.`;
    }

    return {
      skillName: skill.name,
      category: skill.category,
      userLevel: userRating,
      requiredLevel: requiredRating,
      gap,
      severity,
      reason
    };
  }).sort((a, b) => b.gap - a.gap);
}
