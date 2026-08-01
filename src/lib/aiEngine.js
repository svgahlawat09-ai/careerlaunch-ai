import { TARGET_ROLES } from '../data/mockData.js';

// Action verbs dictionary for ATS resume scoring
const ACTION_VERBS = [
  'built', 'developed', 'created', 'designed', 'architected', 'led', 'spearheaded', 
  'managed', 'engineered', 'implemented', 'optimized', 'reduced', 'increased', 
  'achieved', 'conducted', 'collaborated', 'integrated', 'delivered', 'formulated',
  'automated', 'championed', 'deployed', 'orchestrated', 'streamlined', 'pioneered',
  'conceptualized', 'leveraged', 'organized', 'coordinated', 'participated', 'authored',
  'researched', 'analyzed', 'curated', 'modeled', 'evaluated', 'transformed'
];

/**
 * Text Sanitizer to clean up PDF/DOCX artifacts, non-breaking spaces, and broken letter spacing
 */
export function sanitizeResumeText(rawText = '') {
  if (!rawText) return '';
  let text = rawText.replace(/\u00A0/g, ' ');
  // Clean spaced uppercase headers (e.g. E D U C A T I O N -> EDUCATION)
  text = text.replace(/\b([A-Z])\s+([A-Z])\s+([A-Z])\s+([A-Z]+)\b/g, '$1$2$3$4');
  text = text.replace(/[ \t]+/g, ' ');
  return text.trim();
}

/**
 * Rule-Based ATS Resume Analyzer Engine
 * (Simulates AI behavior with deterministic NLP heuristics)
 */
export function analyzeResume(text = '', targetRoleKey = 'frontend') {
  const cleanText = sanitizeResumeText(text);
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  const normalizedText = cleanText.toLowerCase();
  const words = normalizedText.match(/\b[a-z0-9+#.-]+\b/g) || [];
  const wordCount = words.length;

  // 1. Section Completeness Check (Enhanced regex detection supporting student & project-based resumes)
  const sections = {
    contact: /(email|phone|github|linkedin|contact|location|address|@|\d{10})/i.test(cleanText),
    summary: /(summary|profile|about|objective|overview|bio|background|undergraduate|student)/i.test(cleanText),
    experience: /(experience|work|employment|internship|roles|projects|project|achievements|activities|hackathon|contributions|leadership)/i.test(cleanText),
    education: /(education|university|institute|college|degree|bachelor|master|b\.?tech|m\.?tech|btech|mtech|gpa|cgpa|graduat|academic|school|diploma)/i.test(cleanText),
    skills: /(skills|technologies|tools|languages|competencies|expertise|proficiencies|stack|technical)/i.test(cleanText)
  };

  const detectedSectionsCount = Object.values(sections).filter(Boolean).length;
  const formattingScore = Math.round((detectedSectionsCount / 5) * 100);

  // 2. Target Role Keyword & Technical Skill Matching
  const targetKeywords = roleConfig.keywords;
  const matchedKeywordsSet = new Set();
  const missingKeywords = [];

  targetKeywords.forEach(kw => {
    const escapedKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const kwRegex = new RegExp(`(\\b${escapedKw}\\b|${escapedKw})`, 'i');
    if (kwRegex.test(cleanText)) {
      matchedKeywordsSet.add(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Also extract skills explicitly listed in the candidate's resume
  const commonSkillTokens = [
    'python', 'c', 'c++', 'java', 'javascript', 'typescript', 'react', 'html', 'css', 
    'excel', 'google sheets', 'canva', 'ai', 'prompt engineering', 'data entry', 
    'internet research', 'sql', 'git', 'tableau', 'power bi', 'figma', 'node.js',
    'express', 'mongodb', 'postgresql', 'fastapi', 'pytorch', 'tensorflow', 'pandas'
  ];

  commonSkillTokens.forEach(token => {
    const escapedToken = token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    if (new RegExp(`\\b${escapedToken}\\b`, 'i').test(cleanText)) {
      // Capitalize nicely
      const formatted = token.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      matchedKeywordsSet.add(formatted);
    }
  });

  const matchedKeywords = Array.from(matchedKeywordsSet);
  const keywordMatchScore = Math.min(100, Math.max(35, Math.round((matchedKeywords.length / (targetKeywords.length || 1)) * 100)));

  // 3. Action Verbs Count
  const matchedActionVerbs = ACTION_VERBS.filter(verb => 
    new RegExp(`\\b${verb}\\b`, 'i').test(cleanText)
  );
  const actionVerbScore = Math.min(100, Math.round((matchedActionVerbs.length / 5) * 100));

  // 4. Length / Word Count Health
  let wordCountScore = 100;
  if (wordCount < 100) wordCountScore = 40;
  else if (wordCount < 200) wordCountScore = 75;
  else if (wordCount > 1000) wordCountScore = 85;

  // Weighted Overall ATS Score computation
  const overallScore = Math.round(
    (keywordMatchScore * 0.40) +
    (formattingScore * 0.30) +
    (actionVerbScore * 0.20) +
    (wordCountScore * 0.10)
  );

  // Generate dynamic, actionable improvement tips based on actual findings
  const tips = [];
  if (sections.education) {
    tips.push("✅ Education section detected! Your degree and academic background are recognized by ATS.");
  } else {
    tips.push("Add an explicit 'EDUCATION' section header with your degree, institution name, and CGPA/graduation year.");
  }

  if (sections.skills) {
    tips.push(`✅ ${matchedKeywords.length} key technical & analytical skills successfully identified.`);
  } else {
    tips.push("Add a dedicated 'SKILLS' header categorizing your technical languages, tools, and platforms.");
  }

  if (!sections.summary) {
    tips.push("Add a compelling 2-3 sentence Professional Summary or Profile header highlighting your career goals.");
  }
  if (!sections.contact) {
    tips.push("Include explicit contact details (LinkedIn URL, GitHub handle, email) at the top of your resume.");
  }

  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 4).join(', ');
    tips.push(`To target ${roleConfig.title} positions more strongly, consider adding skills like: ${topMissing}.`);
  }

  if (!/\d+%|\$\d+|\d+\s*users|\d+\s*projects|cgpa|gpa/i.test(cleanText)) {
    tips.push("Quantify your achievements with metrics (e.g., 'Maintained 9.3+ CGPA', 'Built 2 web apps', 'Served 1,000+ users').");
  }

  return {
    overallScore: Math.min(98, Math.max(35, overallScore)),
    keywordMatchScore,
    formattingScore,
    actionVerbScore,
    wordCountScore,
    totalWords: wordCount,
    sectionCheck: sections,
    matchedKeywords,
    missingKeywords,
    matchedActionVerbs,
    tips,
    targetRoleTitle: roleConfig.title
  };
}

/**
 * Enhanced Rule-Based Interview Answer Evaluator
 * Detects ignorance/non-answers ("I don't know"), relevance, keyword coverage,
 * STAR method usage, and provides model answers & key concepts for learning.
 */
export function evaluateInterviewAnswer(answerText = '', questionObj = {}) {
  const normalized = answerText.toLowerCase().trim();
  const words = normalized.match(/\b[a-z0-9'-]+\b/g) || [];
  const wordCount = words.length;

  const expectedKeywords = questionObj.keywords || [];
  const keyConcepts = questionObj.keyConcepts || [];
  const modelAnswer = questionObj.modelAnswer || "A complete answer should clearly define the core concept, provide structural details, and mention a practical real-world use case.";

  // 1. Explicit Ignorance / Non-Answer Detection
  const ignoranceRegex = /\b(i\s*don'?t\s*know|idk|no\s*idea|not\s*sure|don'?t\s*know|have\s*no\s*idea|haven'?t\s*learned|never\s*used|skip|pass|n\/?a|no\s*answer|can'?t\s*answer|cannot\s*answer|sorry\s*don'?t\s*know)\b/i;
  const isIgnorant = ignoranceRegex.test(normalized) || (wordCount <= 3 && !expectedKeywords.some(kw => normalized.includes(kw.toLowerCase())));

  if (isIgnorant) {
    return {
      score: 1,
      isIgnorant: true,
      isOffTopic: false,
      feedback: "It's completely okay to admit when you don't know an answer! Honesty in interviews is valued over guessing wildly. Review the model answer and key concepts below to master this topic for next time:",
      modelAnswer,
      keyConcepts,
      tip: questionObj.tips || "Study the model answer above, note down the key terms, and practice explaining the concept in your own words.",
      matchedKeywords: [],
      missingKeywords: expectedKeywords,
      metrics: { wordCount, keywordMatches: 0, starDetected: false }
    };
  }

  // 2. Keyword Matching & Missing Keywords Analysis
  const matchedKeywords = expectedKeywords.filter(kw => 
    normalized.includes(kw.toLowerCase())
  );
  const missingKeywords = expectedKeywords.filter(kw => 
    !normalized.includes(kw.toLowerCase())
  );

  // 3. STAR indicator phrases check
  const starIndicators = ['situation', 'task', 'action', 'result', 'because', 'led to', 'improved', 'learned', 'achieved', 'solved', 'for instance', 'example', 'in my previous'];
  const starMatches = starIndicators.filter(ind => normalized.includes(ind));
  const starDetected = starMatches.length >= 2;

  // 4. Filler words ratio check
  const fillerWords = ['like', 'um', 'uh', 'you know', 'basically', 'actually', 'sort of', 'kind of', 'stuff'];
  const fillerCount = fillerWords.reduce((acc, filler) => {
    const matches = normalized.match(new RegExp(`\\b${filler}\\b`, 'gi'));
    return acc + (matches ? matches.length : 0);
  }, 0);

  // 5. Off-Topic Check (Long answer with ZERO matched keywords)
  const kwRatio = expectedKeywords.length > 0 ? (matchedKeywords.length / expectedKeywords.length) : 0.5;
  const isOffTopic = wordCount >= 10 && matchedKeywords.length === 0 && expectedKeywords.length > 0;

  if (isOffTopic) {
    return {
      score: 2,
      isIgnorant: false,
      isOffTopic: true,
      feedback: "Your answer had reasonable length, but it missed the core technical concepts and terms required for this question. Make sure to directly address the key topics.",
      modelAnswer,
      keyConcepts,
      tip: expectedKeywords.length > 0 ? `Be sure to incorporate fundamental concepts like '${expectedKeywords.slice(0, 3).join("', '")}'.` : "Focus on addressing the question directly.",
      matchedKeywords: [],
      missingKeywords: expectedKeywords,
      metrics: { wordCount, keywordMatches: 0, starDetected }
    };
  }

  // 6. Score Calculation for Genuine Attempt
  let score = 2; // Baseline

  // Primary weight: Keyword coverage (0 to 5 points)
  if (expectedKeywords.length > 0) {
    score += Math.round(kwRatio * 5);
  } else {
    score += 3;
  }

  // Secondary weight: Explanation depth & word count
  if (wordCount >= 35) score += 2;
  else if (wordCount >= 18) score += 1;

  // Structure bonus (STAR method)
  if (starDetected) score += 1;

  // Filler word penalty
  if (fillerCount > 3) score -= 1;

  // Final score clamping between 2 and 10
  const finalScore = Math.min(10, Math.max(2, score));

  // Dynamic feedback construction
  let feedbackParts = [];
  if (finalScore >= 8) {
    feedbackParts.push("Outstanding response! You clearly articulated the core concepts with strong technical precision.");
  } else if (finalScore >= 6) {
    feedbackParts.push("Good effort! You touched on relevant key concepts, but expanding with specific examples will elevate your answer.");
  } else {
    feedbackParts.push("Your answer provides a basic start, but lacks technical depth and essential terminology.");
  }

  if (matchedKeywords.length > 0) {
    feedbackParts.push(`Great job addressing key terms: '${matchedKeywords.slice(0, 4).join("', '")}'.`);
  }
  if (missingKeywords.length > 0 && finalScore < 9) {
    feedbackParts.push(`To improve, try to also cover: '${missingKeywords.slice(0, 3).join("', '")}'.`);
  }
  if (starDetected) {
    feedbackParts.push("Strong structural storytelling detected!");
  }

  return {
    score: finalScore,
    isIgnorant: false,
    isOffTopic: false,
    feedback: feedbackParts.join(" "),
    modelAnswer,
    keyConcepts,
    tip: questionObj.tips || "Structure technical explanations by defining the concept first, followed by a concrete real-world application example.",
    matchedKeywords,
    missingKeywords,
    metrics: {
      wordCount,
      keywordMatches: matchedKeywords.length,
      starDetected
    }
  };
}

/**
 * Compute Skill Gap diff between user ratings and role benchmark
 */
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

/**
 * Filter & Match internships based on skill gap and chosen role
 */
export function matchInternships(userSkillsList = [], targetRoleKey = 'frontend', internships = []) {
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  
  return internships.map(internship => {
    let matchScore = 70; // baseline
    if (internship.roleCategory === targetRoleKey) {
      matchScore += 15;
    }
    
    // Check overlap with user skills
    const matchingSkills = internship.skills.filter(s => 
      userSkillsList.some(userSkill => userSkill.toLowerCase().includes(s.toLowerCase())) ||
      roleConfig.keywords.some(kw => kw.toLowerCase().includes(s.toLowerCase()))
    );

    matchScore += Math.min(15, matchingSkills.length * 4);

    return {
      ...internship,
      matchPercentage: Math.min(99, Math.max(65, matchScore))
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Gemini API integration helper
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

