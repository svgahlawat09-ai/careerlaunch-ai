// Target roles dictionary with keyword datasets and required skill benchmark ratings (scale 0-5)
export const TARGET_ROLES = {
  'frontend': {
    id: 'frontend',
    title: 'Frontend Developer',
    keywords: [
      'react', 'javascript', 'typescript', 'html', 'css', 'tailwind', 'next.js', 'redux', 
      'vite', 'web performance', 'responsive design', 'rest api', 'git', 'webpack', 'jest', 
      'cypress', 'browser compatibility', 'accessibility', 'a11y', 'dom', 'hooks', 'state management'
    ],
    benchmarkSkills: [
      { name: 'JavaScript / ES6+', level: 4.5, category: 'Core' },
      { name: 'React & Frameworks', level: 4.5, category: 'Core' },
      { name: 'HTML5 & CSS3 / Tailwind', level: 4.0, category: 'Styling' },
      { name: 'TypeScript', level: 3.5, category: 'Core' },
      { name: 'State Management (Redux/Context)', level: 4.0, category: 'Architecture' },
      { name: 'REST & GraphQL APIs', level: 3.5, category: 'Networking' },
      { name: 'Git & Version Control', level: 4.0, category: 'Tools' },
      { name: 'Testing (Jest/RTL)', level: 3.0, category: 'Testing' },
      { name: 'Web Performance Optimization', level: 3.5, category: 'Performance' },
      { name: 'UI/UX Principles & Accessibility', level: 3.5, category: 'Design' }
    ]
  },
  'backend': {
    id: 'backend',
    title: 'Backend Engineer',
    keywords: [
      'node.js', 'express', 'python', 'django', 'java', 'spring boot', 'postgresql', 'mongodb', 
      'sql', 'redis', 'docker', 'aws', 'rest api', 'graphql', 'microservices', 'git', 
      'authentication', 'jwt', 'ci/cd', 'system design', 'orm'
    ],
    benchmarkSkills: [
      { name: 'Node.js / Express or Python', level: 4.5, category: 'Runtime' },
      { name: 'Database Design & SQL (Postgres)', level: 4.5, category: 'Database' },
      { name: 'REST & Microservice Architecture', level: 4.0, category: 'Architecture' },
      { name: 'Authentication & Security (JWT/OAuth)', level: 3.5, category: 'Security' },
      { name: 'NoSQL Databases (MongoDB/Redis)', level: 3.5, category: 'Database' },
      { name: 'Docker & Containerization', level: 3.5, category: 'DevOps' },
      { name: 'Git & CI/CD Pipelines', level: 4.0, category: 'Tools' },
      { name: 'Cloud Services (AWS/GCP)', level: 3.0, category: 'Cloud' },
      { name: 'Unit & Integration Testing', level: 3.5, category: 'Testing' },
      { name: 'System Design Fundamentals', level: 3.5, category: 'Architecture' }
    ]
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    keywords: [
      'sql', 'python', 'excel', 'tableau', 'power bi', 'pandas', 'numpy', 'statistics', 
      'data visualization', 'data cleaning', 'etl', 'r', 'ab testing', 'business intelligence', 
      'dashboard', 'scikit-learn', 'data modeling'
    ],
    benchmarkSkills: [
      { name: 'Advanced SQL Queries', level: 4.5, category: 'Database' },
      { name: 'Python (Pandas / NumPy)', level: 4.0, category: 'Analysis' },
      { name: 'Excel & Pivot Tables', level: 4.5, category: 'Tools' },
      { name: 'Tableau / Power BI', level: 4.0, category: 'Visualization' },
      { name: 'Statistical Analysis & A/B Testing', level: 3.5, category: 'Math' },
      { name: 'Data Wrangling & ETL', level: 3.5, category: 'Data Engineering' },
      { name: 'Data Storytelling & Reporting', level: 4.0, category: 'Soft Skills' },
      { name: 'Git & Jupyter Notebooks', level: 3.5, category: 'Tools' },
      { name: 'Data Warehousing Fundamentals', level: 3.0, category: 'Database' }
    ]
  },
  'software-engineer': {
    id: 'software-engineer',
    title: 'Software Engineer (Generalist)',
    keywords: [
      'java', 'c++', 'python', 'data structures', 'algorithms', 'object-oriented programming', 
      'system design', 'git', 'sql', 'linux', 'testing', 'debugging', 'agile', 'sdlc', 
      'design patterns', 'ci/cd', 'code review'
    ],
    benchmarkSkills: [
      { name: 'Data Structures & Algorithms', level: 4.5, category: 'CS Fundamentals' },
      { name: 'Object-Oriented Design', level: 4.0, category: 'Architecture' },
      { name: 'Main Language (Python/Java/C++)', level: 4.5, category: 'Coding' },
      { name: 'Version Control (Git/GitHub)', level: 4.5, category: 'Tools' },
      { name: 'Databases & SQL', level: 3.5, category: 'Database' },
      { name: 'Operating Systems & Linux Shell', level: 3.5, category: 'Systems' },
      { name: 'Software Testing & TDD', level: 3.0, category: 'Quality' },
      { name: 'Agile & Team Collaboration', level: 4.0, category: 'Process' }
    ]
  },
  'product-manager': {
    id: 'product-manager',
    title: 'Associate Product Manager',
    keywords: [
      'product strategy', 'roadmap', 'user research', 'agile', 'scrum', 'kpis', 'analytics', 
      'wireframing', 'figma', 'user stories', 'jira', 'market research', 'product analytics', 
      'prioritization', 'stakeholder management', 'a/b testing'
    ],
    benchmarkSkills: [
      { name: 'Product Strategy & Vision', level: 4.0, category: 'Strategy' },
      { name: 'User Research & Personas', level: 4.0, category: 'UX' },
      { name: 'Data Metrics & Product Analytics', level: 4.0, category: 'Analytics' },
      { name: 'Agile/Scrum & PRD Writing', level: 4.5, category: 'Execution' },
      { name: 'Wireframing & Prototyping (Figma)', level: 3.5, category: 'Design' },
      { name: 'Feature Prioritization (RICE/MoSCoW)', level: 4.0, category: 'Strategy' },
      { name: 'Cross-functional Communication', level: 4.5, category: 'Leadership' }
    ]
  },
  'ml-engineer': {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    keywords: [
      'python', 'pytorch', 'tensorflow', 'scikit-learn', 'machine learning', 'deep learning', 
      'nlp', 'computer vision', 'pandas', 'numpy', 'model deployment', 'mlops', 'fastapi', 
      'docker', 'sql', 'linear algebra', 'transformers'
    ],
    benchmarkSkills: [
      { name: 'Python & Scientific Computing', level: 4.8, category: 'Language' },
      { name: 'PyTorch / TensorFlow', level: 4.2, category: 'Frameworks' },
      { name: 'Classic Machine Learning & Math', level: 4.5, category: 'Math/Theory' },
      { name: 'Deep Learning & Neural Networks', level: 4.0, category: 'AI' },
      { name: 'Data Preprocessing & Feature Eng.', level: 4.2, category: 'Data' },
      { name: 'Model Serving & FastAPI', level: 3.5, category: 'Engineering' },
      { name: 'MLOps & Docker', level: 3.0, category: 'DevOps' }
    ]
  }
};

// Sample Resume for Demo Testing
export const SAMPLE_RESUME_TEXT = `
ALEX MORGAN
Email: alex.morgan@college.edu | Phone: (555) 234-5678 | GitHub: github.com/alexmorgan | LinkedIn: linkedin.com/in/alexmorgan

SUMMARY
Energetic Computer Science senior with hands-on experience building responsive web applications using React, JavaScript, HTML5, CSS3, and Node.js. Passionate about frontend engineering, component design systems, and web performance optimization. Proven track record in hackathons and open-source contributions.

EDUCATION
Bachelor of Science in Computer Science
State University, Graduating May 2025 | GPA: 3.8/4.0
Relevant Coursework: Data Structures & Algorithms, Web Development, Database Systems, Software Engineering, UI/UX Design

EXPERIENCE
Frontend Developer Intern | TechStart Innovations | June 2024 - August 2024
• Architected and deployed 12+ reusable React components, reducing page load times by 28%.
• Collaborated with backend engineers to integrate REST API endpoints and state management using React Context.
• Optimized mobile responsiveness using Tailwind CSS across 5 primary client dashboards.
• Conducted unit testing with Jest, achieving 85% code coverage across core modules.

Software Engineering Project Lead | University Coding Club | Sept 2023 - Present
• Spearheaded the development of a peer-to-peer tutoring portal serving 1,200+ active students.
• Engineered client-side routing using React Router v6 and persistent state using LocalStorage.
• Mentored 6 junior developers in Git workflows, code reviews, and clean code principles.

PROJECTS
SmartPrep — AI Interview Mock Platform | React, Tailwind CSS, Node.js, Express
• Developed a web application providing simulated technical mock interviews for job candidates.
• Integrated REST APIs for dynamic score reporting and interactive chart visualization.

DevHub Dashboard | React, TypeScript, Vite, Chart.js
• Built a personal developer dashboard visualizing GitHub commit activity and active project stats.

SKILLS
Programming Languages: JavaScript (ES6+), HTML5, CSS3, TypeScript, Python, SQL
Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, Next.js, Redux, Vite
Tools & Databases: Git, GitHub, VS Code, Postman, MongoDB, PostgreSQL, Docker, Figma
`;

// Categorized Question Bank for AI Mock Interviews
export const QUESTION_BANK = {
  frontend: {
    beginner: [
      {
        id: 'fe-b1',
        question: "Explain the main differences between 'var', 'let', and 'const' in JavaScript.",
        keywords: ['scope', 'hoisting', 'reassign', 'block scope', 'function scope', 'immutability'],
        tips: "Highlight block scope vs function scope and explain temporal dead zone."
      },
      {
        id: 'fe-b2',
        question: "What is the Virtual DOM in React and why does React use it?",
        keywords: ['virtual dom', 'reconciliation', 'diffing', 'performance', 'real dom', 'batching'],
        tips: "Mention reconciliation, diffing algorithm, and minimization of direct DOM manipulation."
      },
      {
        id: 'fe-b3',
        question: "What is the box model in CSS?",
        keywords: ['content', 'padding', 'border', 'margin', 'box-sizing', 'border-box'],
        tips: "Be sure to mention box-sizing: border-box and how padding/border affect total element width."
      }
    ],
    intermediate: [
      {
        id: 'fe-i1',
        question: "How do React hooks like useEffect work, and how do you handle cleanup functions?",
        keywords: ['dependency array', 'lifecycle', 'unmount', 'side effects', 'cleanup', 'closure'],
        tips: "Explain how cleanup functions run before re-renders and during unmounting to prevent memory leaks."
      },
      {
        id: 'fe-i2',
        question: "How do you optimize a React web app for web performance?",
        keywords: ['code splitting', 'lazy loading', 'usememo', 'usecallback', 'bundle size', 'memoization', 'lighthouse'],
        tips: "Discuss React.lazy, Suspense, memoization, image compression, and CDN caching."
      }
    ],
    advanced: [
      {
        id: 'fe-a1',
        question: "How would you design a accessible and reusable Modal Component in React from scratch?",
        keywords: ['portal', 'aria', 'focus trap', 'keyboard navigation', 'esc key', 'backdrop', 'accessibility'],
        tips: "Discuss ReactDOM.createPortal, ARIA attributes (role='dialog'), focus trapping, and ESC key listener."
      }
    ]
  },
  backend: {
    beginner: [
      {
        id: 'be-b1',
        question: "What is RESTful API architecture and what are the standard HTTP methods?",
        keywords: ['get', 'post', 'put', 'delete', 'stateless', 'resource', 'crud', 'status code'],
        tips: "List GET, POST, PUT, DELETE and explain statelessness between client and server."
      },
      {
        id: 'be-b2',
        question: "What is the difference between SQL and NoSQL databases?",
        keywords: ['relational', 'schema', 'table', 'document', 'scaling', 'acid', 'flexible'],
        tips: "Compare relational structure (Postgres) vs document-based flexible schema (MongoDB)."
      }
    ],
    intermediate: [
      {
        id: 'be-i1',
        question: "How does JWT (JSON Web Token) authentication work in a web application?",
        keywords: ['header', 'payload', 'signature', 'secret', 'bearer token', 'stateless', 'expiry'],
        tips: "Explain the 3 parts of JWT (header.payload.signature) and how the server verifies authenticity without state."
      }
    ],
    advanced: [
      {
        id: 'be-a1',
        question: "How would you design a database schema and caching layer to handle high concurrent traffic?",
        keywords: ['redis', 'caching', 'indexing', 'read replica', 'sharding', 'connection pool', 'ttl'],
        tips: "Discuss Redis write-through/cache-aside patterns, database indexing, and read replicas."
      }
    ]
  },
  'data-analyst': {
    beginner: [
      {
        id: 'da-b1',
        question: "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?",
        keywords: ['match', 'null', 'left table', 'right table', 'intersection', 'foreign key'],
        tips: "Describe Venn diagram relationships and handling unmatched rows."
      }
    ],
    intermediate: [
      {
        id: 'da-i1',
        question: "Walk me through your process for cleaning an unorganized dataset in Python using Pandas.",
        keywords: ['missing values', 'drop_duplicates', 'fillna', 'data types', 'outliers', 'normalization'],
        tips: "Mention handling missing values, identifying outliers, datatype conversion, and string cleaning."
      }
    ],
    advanced: [
      {
        id: 'da-a1',
        question: "How do you evaluate whether an A/B test result is statistically significant?",
        keywords: ['p-value', 'null hypothesis', 'confidence interval', 'sample size', 'z-test', 't-test'],
        tips: "Reference p-values (<0.05 threshold), null hypothesis testing, sample size calculation, and statistical power."
      }
    ]
  },
  'product-manager': {
    beginner: [
      {
        id: 'pm-b1',
        question: "How do you prioritize features when building a product roadmap?",
        keywords: ['rice', 'moscow', 'impact', 'effort', 'user feedback', 'business value', 'framework'],
        tips: "Use a recognized framework like RICE (Reach, Impact, Confidence, Effort) or Eisenhower matrix."
      }
    ],
    intermediate: [
      {
        id: 'pm-i1',
        question: "Tell me about a time you had to handle conflicting feedback from tech leads vs design leads.",
        keywords: ['trade-off', 'user experience', 'technical debt', 'compromise', 'data driven', 'alignment'],
        tips: "Structure using STAR method (Situation, Task, Action, Result) focusing on objective user-centric decision making."
      }
    ],
    advanced: [
      {
        id: 'pm-a1',
        question: "If retention on our mobile app dropped 15% overnight, how would you investigate?",
        keywords: ['funnel', 'cohort', 'segmentation', 'logs', 'release', 'analytics', 'root cause'],
        tips: "Break down systematically: check metric tracking accuracy, app release version, OS platform, geographic cohort, and funnel step."
      }
    ]
  },
  'hr-behavioral': {
    beginner: [
      {
        id: 'hr-b1',
        question: "Tell me about yourself and why you are interested in this software development career path.",
        keywords: ['passion', 'background', 'projects', 'growth', 'impact', 'learning'],
        tips: "Keep your response structured: Present -> Past experience -> Future aspiration (90 seconds max)."
      },
      {
        id: 'hr-b2',
        question: "Describe a situation where you faced a difficult deadline and how you handled it.",
        keywords: ['star method', 'prioritization', 'communication', 'focus', 'delivered', 'timeline'],
        tips: "Use STAR (Situation, Task, Action, Result) and emphasize proactive communication with team members."
      }
    ],
    intermediate: [
      {
        id: 'hr-i1',
        question: "How do you handle constructive criticism or code review pushback from senior peers?",
        keywords: ['growth mindset', 'learning', 'open minded', 'objective', 'feedback', 'improvement'],
        tips: "Show high emotional intelligence, viewing feedback as an opportunity to raise team code quality."
      }
    ],
    advanced: [
      {
        id: 'hr-a1',
        question: "Tell me about a time you led a team project through ambiguity or changing requirements.",
        keywords: ['adaptability', 'agile', 'clarity', 'stakeholders', 'pivoting', 'team spirit'],
        tips: "Focus on how you broke down complex ambiguous goals into clear actionable task milestones for the team."
      }
    ]
  }
};

// 16 Detailed Mock Internship Listings
export const MOCK_INTERNSHIPS = [
  {
    id: 'int-1',
    title: 'Frontend React Engineering Intern',
    company: 'Apex Cloud Systems',
    logoSeed: 'ApexCloud',
    location: 'Remote',
    type: 'Full-time',
    stipend: '$2,800 - $3,500 / mo',
    duration: '3 - 6 Months',
    roleCategory: 'frontend',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'REST API'],
    postedDate: '2 days ago',
    matchPercentage: 96,
    description: 'Join our core platform engineering team building next-generation cloud monitoring dashboards. You will work closely with senior engineers to implement pixel-perfect user interface components in React.',
    requirements: [
      'Pursuing a BS or MS in Computer Science or related STEM field.',
      'Proficiency in React 18, ES6+ JavaScript, and modern CSS frameworks.',
      'Experience with version control (Git & GitHub PR workflows).',
      'Strong eye for UI/UX detail and web accessibility.'
    ]
  },
  {
    id: 'int-2',
    title: 'Full Stack Web Developer Intern',
    company: 'Vanguard Innovations',
    logoSeed: 'Vanguard',
    location: 'Hybrid (San Francisco, CA)',
    type: 'Full-time',
    stipend: '$3,200 - $4,000 / mo',
    duration: '6 Months',
    roleCategory: 'frontend',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    postedDate: '1 day ago',
    matchPercentage: 92,
    description: 'Assist in building scalable web microservices and responsive user interfaces. Excellent opportunity to gain experience with end-to-end full stack software development.',
    requirements: [
      'Strong grasp of JavaScript / TypeScript fundamentals.',
      'Hands-on experience with Node.js/Express and relational databases.',
      'Familiarity with REST APIs and containerization tools.'
    ]
  },
  {
    id: 'int-3',
    title: 'Backend API & Infrastructure Intern',
    company: 'Nexus Cyberworks',
    logoSeed: 'NexusCyber',
    location: 'Remote',
    type: 'Part-time',
    stipend: '$2,500 - $3,000 / mo',
    duration: '4 Months',
    roleCategory: 'backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
    postedDate: '3 days ago',
    matchPercentage: 88,
    description: 'Help design high-throughput REST and GraphQL backend services. Work on database indexing, Redis caching, and automated testing suites.',
    requirements: [
      'Solid foundation in Data Structures, Algorithms, and Object-Oriented Programming.',
      'Experience building backend servers in Node.js or Python.',
      'Understanding of relational databases (PostgreSQL/MySQL).'
    ]
  },
  {
    id: 'int-4',
    title: 'Data Analyst & Insights Intern',
    company: 'Pulse Analytics Lab',
    logoSeed: 'PulseAnalytics',
    location: 'On-site (New York, NY)',
    type: 'Full-time',
    stipend: '$3,000 / mo',
    duration: '3 Months',
    roleCategory: 'data-analyst',
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Excel'],
    postedDate: 'Just now',
    matchPercentage: 94,
    description: 'Transform complex user activity data into actionable business dashboards. You will write SQL queries, analyze funnel drop-offs, and present findings to executive teams.',
    requirements: [
      'Advanced SQL skills (joins, window functions, aggregations).',
      'Proficiency in Python data stack (Pandas, NumPy, Matplotlib).',
      'Experience building interactive dashboards in Tableau or Power BI.'
    ]
  },
  {
    id: 'int-5',
    title: 'Associate Product Manager Intern',
    company: 'HyperDrive Studio',
    logoSeed: 'HyperDrive',
    location: 'Remote',
    type: 'Full-time',
    stipend: '$2,900 - $3,400 / mo',
    duration: '3 Months',
    roleCategory: 'product-manager',
    skills: ['Product Strategy', 'Wireframing', 'Agile', 'Jira', 'Analytics'],
    postedDate: '4 days ago',
    matchPercentage: 85,
    description: 'Partner with engineering and design leads to define feature specifications, conduct user interviews, and manage sprint roadmaps for our SaaS desktop applications.',
    requirements: [
      'Enthusiasm for software product management and user empathy.',
      'Ability to write clear Product Requirement Documents (PRDs).',
      'Basic understanding of agile development cycles and UX design.'
    ]
  },
  {
    id: 'int-6',
    title: 'Machine Learning Research Intern',
    company: 'Aether Cognitive AI',
    logoSeed: 'AetherAI',
    location: 'Remote',
    type: 'Full-time',
    stipend: '$3,800 - $4,500 / mo',
    duration: '6 Months',
    roleCategory: 'ml-engineer',
    skills: ['Python', 'PyTorch', 'Scikit-Learn', 'NLP', 'FastAPI'],
    postedDate: '5 days ago',
    matchPercentage: 90,
    description: 'Work on cutting-edge LLM fine-tuning, retrieval-augmented generation (RAG) pipelines, and deep learning model benchmarking.',
    requirements: [
      'Strong math foundation in Linear Algebra, Calculus, and Probability.',
      'Proficiency in Python and deep learning frameworks (PyTorch or TensorFlow).',
      'Prior academic or project work in ML / NLP algorithms.'
    ]
  },
  {
    id: 'int-7',
    title: 'Software Development Engineer Intern (SDE)',
    company: 'OmniStack Technologies',
    logoSeed: 'OmniStack',
    location: 'Hybrid (Seattle, WA)',
    type: 'Full-time',
    stipend: '$3,600 / mo',
    duration: '3 Months',
    roleCategory: 'software-engineer',
    skills: ['Java', 'C++', 'Data Structures', 'Git', 'System Design'],
    postedDate: '1 week ago',
    matchPercentage: 89,
    description: 'Generalist software engineering internship working across distributed microservices, test automation frameworks, and core algorithm optimization.',
    requirements: [
      'Pursuing BS/MS in Computer Science.',
      'Strong knowledge of algorithms, memory management, and clean code.',
      'Demonstrated problem-solving skills on LeetCode/HackerRank.'
    ]
  },
  {
    id: 'int-8',
    title: 'UI/UX & Frontend Developer Intern',
    company: 'PixelCraft Design Labs',
    logoSeed: 'PixelCraft',
    location: 'Remote',
    type: 'Part-time',
    stipend: '$2,200 / mo',
    duration: '3 Months',
    roleCategory: 'frontend',
    skills: ['React', 'Figma', 'CSS3', 'Tailwind', 'Framer Motion'],
    postedDate: '3 days ago',
    matchPercentage: 95,
    description: 'Bridge the gap between design and frontend code. Translate high-fidelity Figma prototypes into interactive, highly animated React components.',
    requirements: [
      'Portfolio demonstrating modern web design and animation skills.',
      'Experience with React, Tailwind CSS, and SVG manipulation.',
      'Eye for design polish, typography, and micro-interactions.'
    ]
  }
];

// Pre-packaged learning roadmaps by role
export const ROLE_ROADMAPS = {
  frontend: {
    roleTitle: 'Frontend Developer',
    phases: [
      {
        phaseId: 1,
        title: 'Phase 1: Web Foundations & Core JS',
        description: 'Master semantic HTML, CSS layout techniques, and modern ES6+ JavaScript concepts.',
        items: [
          { id: 'fe-1', text: 'Complete HTML5 & CSS Flexbox/Grid Mastery', link: 'https://developer.mozilla.org/en-US/docs/Learn', done: true },
          { id: 'fe-2', text: 'Master JavaScript ES6+ (Promises, Async/Await, Closures)', link: 'https://javascript.info/', done: true },
          { id: 'fe-3', text: 'Build 3 Responsive Landing Pages using Tailwind CSS', link: 'https://tailwindcss.com/docs', done: false }
        ]
      },
      {
        phaseId: 2,
        title: 'Phase 2: React Framework & State Management',
        description: 'Understand component lifecycle, custom hooks, React Context, and state handling.',
        items: [
          { id: 'fe-4', text: 'Build an Interactive Dashboard with React 18 & Vite', link: 'https://react.dev/learn', done: false },
          { id: 'fe-5', text: 'Implement Client-Side Routing with React Router v6', link: 'https://reactrouter.com/', done: false },
          { id: 'fe-6', text: 'Master Global State using Context API & Redux Toolkit', link: 'https://redux-toolkit.js.org/', done: false }
        ]
      },
      {
        phaseId: 3,
        title: 'Phase 3: APIs, Performance & Testing',
        description: 'Fetch REST/GraphQL APIs, optimize web page load times, and write automated tests.',
        items: [
          { id: 'fe-7', text: 'Integrate Async REST APIs with Axios & React Query', link: 'https://tanstack.com/query/latest', done: false },
          { id: 'fe-8', text: 'Audit web performance with Google Lighthouse (Target 90+ Score)', link: 'https://pagespeed.web.dev/', done: false },
          { id: 'fe-9', text: 'Write Unit & Component Tests using Jest and React Testing Library', link: 'https://testing-library.com/docs/react-testing-library/intro/', done: false }
        ]
      },
      {
        phaseId: 4,
        title: 'Phase 4: Capstone Projects & Portfolio',
        description: 'Construct complex real-world projects to showcase in interview rounds.',
        items: [
          { id: 'fe-10', text: 'Build a Full-Featured SaaS Web App (CareerLaunch AI or E-Commerce)', link: 'https://roadmap.sh/frontend', done: false },
          { id: 'fe-11', text: 'Deploy application to Vercel/Netlify with custom domain & CI/CD', link: 'https://vercel.com/docs', done: false }
        ]
      }
    ]
  },
  backend: {
    roleTitle: 'Backend Engineer',
    phases: [
      {
        phaseId: 1,
        title: 'Phase 1: Server Runtimes & Programming',
        description: 'Learn Node.js asynchronous architecture, event loop, and file system APIs.',
        items: [
          { id: 'be-1', text: 'Master Node.js Event Loop & Asynchronous I/O', link: 'https://nodejs.org/en/docs/guides/', done: true },
          { id: 'be-2', text: 'Build REST APIs with Express.js & Middleware validation', link: 'https://expressjs.com/', done: false }
        ]
      },
      {
        phaseId: 2,
        title: 'Phase 2: Database Modeling & Storage',
        description: 'Design relational database schemas, write SQL queries, and implement caching.',
        items: [
          { id: 'be-3', text: 'Master SQL Queries, Indexing & Normalization (PostgreSQL)', link: 'https://www.postgresqltutorial.com/', done: false },
          { id: 'be-4', text: 'Integrate Redis for Session Storage & Fast Caching', link: 'https://redis.io/docs/', done: false }
        ]
      },
      {
        phaseId: 3,
        title: 'Phase 3: Security, Auth & Deployment',
        description: 'Implement JWT/OAuth2 authentication, containerize services with Docker.',
        items: [
          { id: 'be-5', text: 'Implement JWT & bcrypt Auth flow with Refresh Tokens', link: 'https://jwt.io/introduction', done: false },
          { id: 'be-6', text: 'Containerize Node app with Docker & Docker Compose', link: 'https://docs.docker.com/get-started/', done: false }
        ]
      }
    ]
  }
};
