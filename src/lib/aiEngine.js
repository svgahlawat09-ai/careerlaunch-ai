import { TARGET_ROLES } from '../data/mockData.js';

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
