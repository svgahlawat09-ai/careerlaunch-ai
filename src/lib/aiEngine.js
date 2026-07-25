import { TARGET_ROLES } from '../data/mockData';

// Action verbs dictionary for ATS resume scoring
const ACTION_VERBS = [
  'built', 'developed', 'created', 'designed', 'architected', 'led', 'spearheaded', 
  'managed', 'engineered', 'implemented', 'optimized', 'reduced', 'increased', 
  'achieved', 'conducted', 'collaborated', 'integrated', 'delivered', 'formulated',
  'automated', 'championed', 'deployed', 'orchestrated', 'streamlined', 'pioneered'
];

/**
 * Rule-Based ATS Resume Analyzer Engine
 * (Simulates AI behavior with deterministic NLP heuristics)
 */
export function analyzeResume(text = '', targetRoleKey = 'frontend') {
  const roleConfig = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['frontend'];
  const normalizedText = text.toLowerCase();
  const words = normalizedText.match(/\b[a-z0-9+#.-]+\b/g) || [];
  const wordCount = words.length;

  // 1. Section Completeness Check (Regex detection)
  const sections = {
    contact: /(email|phone|github|linkedin|contact|location|address)/i.test(text),
    summary: /(summary|profile|about me|objective|overview)/i.test(text),
    experience: /(experience|work history|employment|internship|roles)/i.test(text),
    education: /(education|university|degree|bachelor|master|gpa|coursework)/i.test(text),
    skills: /(skills|technologies|tools|languages|competencies)/i.test(text)
  };

  const detectedSectionsCount = Object.values(sections).filter(Boolean).length;
  const formattingScore = Math.round((detectedSectionsCount / 5) * 100);

  // 2. Target Role Keyword Matching
  const targetKeywords = roleConfig.keywords;
  const matchedKeywordsSet = new Set();
  const missingKeywords = [];

  targetKeywords.forEach(kw => {
    // Check keyword presence in text
    const kwRegex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (kwRegex.test(text)) {
      matchedKeywordsSet.add(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const matchedKeywords = Array.from(matchedKeywordsSet);
  const keywordMatchScore = Math.round((matchedKeywords.length / targetKeywords.length) * 100);

  // 3. Action Verbs Count
  const matchedActionVerbs = ACTION_VERBS.filter(verb => 
    new RegExp(`\\b${verb}\\b`, 'i').test(text)
  );
  // Score capped at 10+ action verbs for 100%
  const actionVerbScore = Math.min(100, Math.round((matchedActionVerbs.length / 8) * 100));

  // 4. Length / Word Count Health
  let wordCountScore = 100;
  if (wordCount < 150) wordCountScore = 40;
  else if (wordCount < 250) wordCountScore = 70;
  else if (wordCount > 1000) wordCountScore = 80;

  // Weighted Overall ATS Score computation (Keywords 40%, Formatting 30%, Action Verbs 20%, Length 10%)
  const overallScore = Math.round(
    (keywordMatchScore * 0.40) +
    (formattingScore * 0.30) +
    (actionVerbScore * 0.20) +
    (wordCountScore * 0.10)
  );

  // Generate dynamic, actionable improvement tips based on actual findings
  const tips = [];
  if (!sections.summary) {
    tips.push("Add a compelling 2-3 sentence Professional Summary header highlighting your career goals.");
  }
  if (!sections.contact) {
    tips.push("Include explicit contact details (LinkedIn URL, GitHub handle, email) at the top of your resume.");
  }
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 4).join(', ');
    tips.push(`Incorporate key industry skills relevant to ${roleConfig.title}: ${topMissing}.`);
  }
  if (matchedActionVerbs.length < 5) {
    tips.push("Start experience bullet points with strong action verbs (e.g. 'Architected', 'Spearheaded', 'Optimized').");
  }
  if (!/\d+%|\$\d+|\d+\s*users|\d+\s*projects/i.test(text)) {
    tips.push("Quantify your achievements with measurable results (e.g., 'Improved load speed by 25%' or 'Served 1,000+ users').");
  }
  if (wordCount < 250) {
    tips.push("Your resume appears too brief. Expand on project descriptions and key responsibilities.");
  }

  return {
    overallScore: Math.min(98, Math.max(15, overallScore)),
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
 * Rule-Based Interview Answer Evaluator
 * Evaluates answer length, structure (STAR), keyword alignment, and filler words.
 */
export function evaluateInterviewAnswer(answerText = '', questionObj = {}) {
  const normalized = answerText.toLowerCase().trim();
  const words = normalized.match(/\b[a-z0-9'-]+\b/g) || [];
  const wordCount = words.length;

  if (wordCount < 8) {
    return {
      score: 3,
      feedback: "Your response is too brief. In technical and behavioral interviews, elaborate on your thought process and provide specific context.",
      tip: "Use the STAR method (Situation, Task, Action, Result) to structure answers to at least 3-4 full sentences.",
      metrics: { wordCount, keywordMatches: 0, starDetected: false }
    };
  }

  // Check expected concepts / keywords from question
  const expectedKeywords = questionObj.keywords || [];
  const matchedKeywords = expectedKeywords.filter(kw => 
    normalized.includes(kw.toLowerCase())
  );

  // STAR indicator phrases
  const starIndicators = ['situation', 'task', 'action', 'result', 'because', 'led to', 'improved', 'learned', 'achieved', 'solved', 'for instance', 'example'];
  const starMatches = starIndicators.filter(ind => normalized.includes(ind));
  const starDetected = starMatches.length >= 2;

  // Filler words ratio check
  const fillerWords = ['like', 'um', 'uh', 'you know', 'basically', 'actually', 'sort of', 'kind of', 'stuff'];
  const fillerCount = fillerWords.reduce((acc, filler) => {
    const matches = normalized.match(new RegExp(`\\b${filler}\\b`, 'gi'));
    return acc + (matches ? matches.length : 0);
  }, 0);

  // Base score calculation out of 10
  let score = 5;

  // Length scoring
  if (wordCount >= 40 && wordCount <= 160) score += 2;
  else if (wordCount > 25) score += 1;

  // Keyword score
  if (expectedKeywords.length > 0) {
    const kwRatio = matchedKeywords.length / expectedKeywords.length;
    score += Math.round(kwRatio * 3);
  } else {
    score += 1;
  }

  // STAR bonus
  if (starDetected) score += 1;

  // Filler word penalty
  if (fillerCount > 3) score -= 1;

  // Clamp score between 2 and 10
  const finalScore = Math.min(10, Math.max(2, score));

  // Dynamic feedback construction
  let feedbackParts = [];
  if (finalScore >= 8) {
    feedbackParts.push("Excellent and structured answer! You clearly demonstrated sound technical understanding.");
  } else if (finalScore >= 6) {
    feedbackParts.push("Good effort! You touched on relevant core concepts, but there is room for extra clarity.");
  } else {
    feedbackParts.push("Your answer provides a basic start, but lacks depth and specific technical terminology.");
  }

  if (matchedKeywords.length > 0) {
    feedbackParts.push(`Great job addressing key terms like '${matchedKeywords.slice(0, 3).join("', '")}'.`);
  } else if (expectedKeywords.length > 0) {
    feedbackParts.push(`Try to explicitly mention core concepts such as '${expectedKeywords.slice(0, 2).join("' and '")}'.`);
  }

  if (starDetected) {
    feedbackParts.push("Noticeable use of structured storytelling principles.");
  }

  return {
    score: finalScore,
    feedback: feedbackParts.join(" "),
    tip: questionObj.tips || "Structure technical explanations by defining the concept first, followed by a concrete real-world application example.",
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
