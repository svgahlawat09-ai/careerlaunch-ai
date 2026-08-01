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
  },
  'system-design': {
    id: 'system-design',
    title: 'System Design & Architecture',
    keywords: [
      'scalability', 'microservices', 'load balancer', 'caching', 'redis', 'database sharding',
      'kafka', 'event driven', 'cap theorem', 'rate limiting', 'cdn', 'consistent hashing'
    ],
    benchmarkSkills: [
      { name: 'Distributed System Architecture', level: 4.5, category: 'Architecture' },
      { name: 'Database Scaling & Sharding', level: 4.0, category: 'Database' },
      { name: 'Caching Strategies & Redis', level: 4.2, category: 'Performance' },
      { name: 'Message Queues (Kafka/RabbitMQ)', level: 4.0, category: 'Networking' },
      { name: 'Load Balancing & High Availability', level: 4.5, category: 'Infrastructure' }
    ]
  },
  'hr-behavioral': {
    id: 'hr-behavioral',
    title: 'HR & Behavioral Interview',
    keywords: [
      'star method', 'leadership', 'conflict resolution', 'teamwork', 'communication',
      'adaptability', 'problem solving', 'prioritization', 'growth mindset'
    ],
    benchmarkSkills: [
      { name: 'STAR Method Delivery', level: 4.8, category: 'Communication' },
      { name: 'Leadership & Initiative', level: 4.2, category: 'Soft Skills' },
      { name: 'Conflict Resolution', level: 4.0, category: 'Teamwork' },
      { name: 'Adaptability & Growth Mindset', level: 4.5, category: 'Mindset' }
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

// Categorized Question Bank for AI Mock Interviews with Model Answers & Key Concepts
export const QUESTION_BANK = {
  frontend: {
    beginner: [
      {
        id: 'fe-b1',
        question: "Explain the main differences between 'var', 'let', and 'const' in JavaScript.",
        keywords: ['scope', 'hoisting', 'reassign', 'block scope', 'function scope', 'temporal dead zone', 'const', 'let', 'var'],
        hint: "Think about scope (function vs block), hoisting behaviors, and re-assignment permissions.",
        keyConcepts: [
          "'var' is function-scoped and hoisted with 'undefined' initialization.",
          "'let' and 'const' are block-scoped and exist in the Temporal Dead Zone until initialized.",
          "'const' creates a read-only reference that cannot be reassigned (though objects can be mutated)."
        ],
        modelAnswer: "In JavaScript, 'var' is function-scoped and hoisted with a value of undefined. 'let' and 'const' were introduced in ES6 and are block-scoped. They are also hoisted but remain in the Temporal Dead Zone (TDZ) until execution reaches their declaration. Furthermore, variables declared with 'let' can be reassigned, whereas 'const' creates an immutable binding that cannot be reassigned (though internal properties of objects/arrays declared with const can still be modified).",
        tips: "Highlight block scope vs function scope and explain temporal dead zone clearly."
      },
      {
        id: 'fe-b2',
        question: "What is the Virtual DOM in React and why does React use it?",
        keywords: ['virtual dom', 'reconciliation', 'diffing', 'performance', 'real dom', 'batching', 'tree'],
        hint: "Mention lightweight in-memory representation, diffing algorithm, and reconciliation.",
        keyConcepts: [
          "Virtual DOM is an in-memory lightweight JS representation of the real DOM.",
          "React compares the new Virtual DOM with the previous snapshot using a diffing algorithm (Reconciliation).",
          "It batches updates and applies only minimal changes to the real DOM for high performance."
        ],
        modelAnswer: "The Virtual DOM is a lightweight in-memory JavaScript representation of the actual DOM elements. When a component's state or props change, React creates a new Virtual DOM tree and compares it against the previous one using its diffing algorithm (Reconciliation). React then computes the minimal set of DOM operations needed and batches updates to the real DOM, which avoids expensive browser layout recalculations.",
        tips: "Mention reconciliation, diffing algorithm, and minimization of direct DOM manipulation."
      },
      {
        id: 'fe-b3',
        question: "What is the CSS box model and how does 'box-sizing: border-box' change how element dimensions are calculated?",
        keywords: ['content', 'padding', 'border', 'margin', 'box-sizing', 'border-box', 'width', 'height'],
        hint: "Break down Content + Padding + Border + Margin, and contrast content-box vs border-box.",
        keyConcepts: [
          "CSS Box Model consists of Content, Padding, Border, and Margin.",
          "By default ('content-box'), width = content width, so adding padding/border increases total visible size.",
          "With 'border-box', specified width includes content, padding, and border, making responsive layouts predictable."
        ],
        modelAnswer: "The CSS box model defines how HTML element sizes are calculated, consisting of Content, Padding, Border, and Margin. Under the default 'content-box', the element's width and height only apply to the content, so padding and border add extra width to the total element size. Using 'box-sizing: border-box' ensures that padding and border are included within the specified width and height, preventing layout breakage and simplifying responsive design.",
        tips: "Be sure to contrast content-box vs border-box with numerical examples if possible."
      }
    ],
    intermediate: [
      {
        id: 'fe-i1',
        question: "How do React hooks like useEffect work, and how do you handle cleanup functions to prevent memory leaks?",
        keywords: ['dependency array', 'lifecycle', 'unmount', 'side effects', 'cleanup', 'closure', 'event listener'],
        hint: "Discuss dependency array timing and returning cleanup functions for listeners or timers.",
        keyConcepts: [
          "useEffect lets components execute side effects (data fetching, subscriptions, timers).",
          "The dependency array dictates when the effect runs (empty [] runs once on mount).",
          "Returning a cleanup function ensures event listeners, timers, or WebSocket subscriptions are cleared before re-running or unmounting."
        ],
        modelAnswer: "The useEffect hook synchronizes a React component with external systems and side effects. It accepts an effect function and an optional dependency array. If the array is empty [], it runs once after initial mount. If return function is provided inside useEffect, React runs this cleanup function before re-executing the effect or unmounting the component. This prevents memory leaks from uncleared timers, global event listeners, or active subscriptions.",
        tips: "Explain how cleanup functions run before re-renders and during unmounting to prevent memory leaks."
      },
      {
        id: 'fe-i2',
        question: "How do you optimize a React web application for web performance and fast initial page load?",
        keywords: ['code splitting', 'lazy loading', 'usememo', 'usecallback', 'bundle size', 'memoization', 'lighthouse', 'suspense'],
        hint: "Cover code splitting (React.lazy), memoization (useMemo/useCallback), and asset optimization.",
        keyConcepts: [
          "Code splitting using React.lazy() and dynamic import() to reduce initial JS payload.",
          "Memoization via React.memo, useMemo, and useCallback to avoid unnecessary child re-renders.",
          "Asset optimization (WebP images, CDN, tree-shaking, HTTP caching)."
        ],
        modelAnswer: "Optimizing a React app involves reducing initial bundle size and minimizing unnecessary re-renders. We achieve code splitting using React.lazy() and React Suspense for route-based chunking. For render performance, we use React.memo, useMemo, and useCallback to prevent recalculations or child re-renders. Additionally, asset compression, lazy loading images, using modern bundlers with tree shaking, and measuring metrics with Lighthouse ensure optimal web performance.",
        tips: "Discuss React.lazy, Suspense, memoization, image compression, and CDN caching."
      }
    ],
    advanced: [
      {
        id: 'fe-a1',
        question: "How would you design an accessible and reusable Modal Component in React from scratch?",
        keywords: ['portal', 'aria', 'focus trap', 'keyboard navigation', 'esc key', 'backdrop', 'accessibility', 'focus lock'],
        hint: "Address ReactDOM.createPortal, ARIA attributes (role='dialog'), focus trapping, and ESC listeners.",
        keyConcepts: [
          "Use ReactDOM.createPortal to render modal outside component parent DOM hierarchy.",
          "Accessibility: ARIA attributes (role='dialog', aria-modal='true', aria-labelledby).",
          "Focus trapping inside modal and listener for 'Escape' key to close."
        ],
        modelAnswer: "To build a robust modal component in React: 1) Render via React DOM Portal into a separate DOM container (e.g. document.body) to avoid z-index stacking issues. 2) Implement accessibility with role='dialog', aria-modal='true', and appropriate aria-labelledby attributes. 3) Implement a focus trap so keyboard navigation stays inside the modal while open. 4) Add event listeners for Escape key closing and backdrop clicks, restoring focus to the trigger element upon closing.",
        tips: "Discuss ReactDOM.createPortal, ARIA attributes, focus trapping, and ESC key listener."
      }
    ]
  },

  backend: {
    beginner: [
      {
        id: 'be-b1',
        question: "What is RESTful API architecture and what are the standard HTTP methods used?",
        keywords: ['get', 'post', 'put', 'delete', 'stateless', 'resource', 'crud', 'status code', 'json'],
        hint: "Explain statelessness, resource URIs, and map GET, POST, PUT, DELETE to CRUD.",
        keyConcepts: [
          "REST relies on stateless client-server communication and standard URIs for resources.",
          "GET fetches data; POST creates new resources; PUT/PATCH updates existing resources; DELETE removes resources.",
          "Response standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Error)."
        ],
        modelAnswer: "REST (Representational State Transfer) is an architectural style for building scalable Web APIs. It emphasizes stateless client-server communication where requests contain all necessary context. Standard HTTP methods map directly to CRUD operations: GET reads resources, POST creates new resources, PUT updates existing resources, and DELETE removes them. Responses return standard status codes (e.g. 200 OK, 201 Created, 404 Not Found, 500 Server Error) along with structured payloads (usually JSON).",
        tips: "List GET, POST, PUT, DELETE, explain statelessness, and mention HTTP status code conventions."
      },
      {
        id: 'be-b2',
        question: "What is the difference between SQL and NoSQL databases?",
        keywords: ['relational', 'schema', 'table', 'document', 'scaling', 'acid', 'flexible', 'postgres', 'mongodb'],
        hint: "Compare relational table structure & ACID (PostgreSQL) vs document flexible schema (MongoDB).",
        keyConcepts: [
          "SQL databases are relational, table-based, require predefined schemas, and support ACID transactions.",
          "NoSQL databases are non-relational, document or key-value based, schema-flexible, and horizontally scalable.",
          "Choose SQL for complex relationships and financial data; NoSQL for unstructured data and rapid scaling."
        ],
        modelAnswer: "SQL databases (like PostgreSQL or MySQL) are relational databases structured into tables with strict, predefined schemas. They strictly adhere to ACID properties, making them ideal for structured data and transactional consistency. NoSQL databases (like MongoDB or Redis) are non-relational, document or key-value based, with flexible schemas that allow rapid iteration and easy horizontal scaling across clusters. SQL is preferred for complex relational queries, while NoSQL excels at unstructured data and real-time scaling.",
        tips: "Compare relational table structure (PostgreSQL) vs document flexible schema (MongoDB)."
      }
    ],
    intermediate: [
      {
        id: 'be-i1',
        question: "How does JWT (JSON Web Token) authentication work in a web application?",
        keywords: ['header', 'payload', 'signature', 'secret', 'bearer token', 'stateless', 'expiry', 'authorization'],
        hint: "Detail the 3 parts (header.payload.signature) and stateless token validation via secret key.",
        keyConcepts: [
          "JWT consists of three parts: Header, Payload (claims), and Signature.",
          "Server signs token using a secret key or private key upon user login.",
          "Client sends token in Authorization header (Bearer token) with subsequent requests; server verifies signature statelessly."
        ],
        modelAnswer: "JWT is a compact, URL-safe mechanism for stateless authentication. It consists of three parts separated by dots: Header (algorithm & type), Payload (user ID, claims, expiration), and Signature (hashed combination of header + payload + secret key). When a user logs in, the server signs and returns a JWT. The client stores it and attaches it to the Authorization header ('Bearer <token>') on future requests. The server verifies the signature using its secret key without querying the database for session state.",
        tips: "Explain the 3 parts of JWT (header.payload.signature) and how stateless verification works."
      }
    ],
    advanced: [
      {
        id: 'be-a1',
        question: "How would you design a database schema and caching layer to handle high concurrent traffic?",
        keywords: ['redis', 'caching', 'indexing', 'read replica', 'sharding', 'connection pool', 'ttl', 'cache aside'],
        hint: "Cover Redis cache-aside pattern, database indexing, read replicas, and connection pooling.",
        keyConcepts: [
          "Use Redis cache-aside pattern to serve frequent read queries directly from memory with TTL.",
          "Database optimizations: Indexes on queried columns, read replicas for scaling read operations.",
          "Connection pooling, query optimization, and sharding for write scaling."
        ],
        modelAnswer: "To handle high concurrency: 1) Implement a Redis caching layer using the Cache-Aside pattern, setting TTLs to serve frequent queries directly from RAM. 2) Optimize the primary database with targeted indexes and connection pooling. 3) Separate read and write traffic using Database Read Replicas. 4) Implement rate limiting, database sharding for horizontal scale, and asynchronous message queues (e.g. RabbitMQ/Kafka) for heavy background tasks.",
        tips: "Discuss Redis write-through/cache-aside patterns, database indexing, and read replicas."
      }
    ]
  },

  'software-engineer': {
    beginner: [
      {
        id: 'se-b1',
        question: "Explain the difference between Array and Linked List data structures.",
        keywords: ['array', 'linked list', 'contiguous', 'pointer', 'node', 'time complexity', 'random access', 'insertion'],
        hint: "Contrast contiguous memory indexing O(1) vs pointer node traversal O(n).",
        keyConcepts: [
          "Array stores elements in contiguous memory locations allowing O(1) random access by index.",
          "Linked List stores nodes with pointers; insertion/deletion at head is O(1), but search is O(n).",
          "Arrays have fixed memory overhead; Linked Lists require extra pointer memory."
        ],
        modelAnswer: "Arrays store elements in contiguous memory blocks, allowing constant time O(1) random access using indexes. However, insertions and deletions in the middle of an array require shifting elements, taking O(n) time. A Linked List consists of nodes containing data and pointers to the next node stored anywhere in memory. Accessing an element in a linked list requires traversing from the head (O(n)), but insertion and deletion at known pointer locations is O(1).",
        tips: "Compare memory allocation (contiguous vs node pointers) and access vs insertion time complexities."
      },
      {
        id: 'se-b2',
        question: "What are the core principles of Object-Oriented Programming (OOP)?",
        keywords: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism', 'classes', 'objects'],
        hint: "Remember the acronym EAIP: Encapsulation, Abstraction, Inheritance, Polymorphism.",
        keyConcepts: [
          "Encapsulation: Bundling data and methods together, hiding internal state.",
          "Abstraction: Hiding complex implementation details behind simple interfaces.",
          "Inheritance: Reusing properties and methods from parent classes.",
          "Polymorphism: Allowing different objects to respond to the same method call in unique ways."
        ],
        modelAnswer: "The four core OOP principles are: 1) Encapsulation — bundling data and methods inside classes while restricting access to internal state using access modifiers. 2) Abstraction — exposing only essential features while hiding background complexity. 3) Inheritance — enabling child classes to inherit attributes and behavior from a base parent class. 4) Polymorphism — allowing methods to take on multiple forms (e.g. method overriding and overloading).",
        tips: "List all 4 pillars clearly with 1-sentence code examples or practical analogies."
      }
    ],
    intermediate: [
      {
        id: 'se-i1',
        question: "How does a Hash Table / Hash Map work under the hood and how are collisions handled?",
        keywords: ['hash function', 'array', 'bucket', 'collision', 'chaining', 'open addressing', 'o(1)', 'load factor'],
        hint: "Explain hashing keys to indices, average O(1) time, and chaining vs open addressing for collisions.",
        keyConcepts: [
          "Hash function computes an integer index from a key to place items in a array bucket.",
          "Average lookup/insert time is O(1).",
          "Collisions happen when two keys hash to the same bucket; handled via Separate Chaining (linked lists/trees) or Open Addressing (probing)."
        ],
        modelAnswer: "A Hash Table maps keys to values by passing keys through a Hash Function, which converts them into array indices for average O(1) time complexity operations. When two keys hash to the same index (a collision), it is resolved using either Separate Chaining (storing colliding elements in a linked list or balanced tree at that index) or Open Addressing (probing adjacent array slots like linear probing or quadratic probing). When load factor exceeds a threshold, the table resizes.",
        tips: "Detail the hash function indexing step, average O(1) runtime, and compare Chaining vs Open Addressing."
      }
    ],
    advanced: [
      {
        id: 'se-a1',
        question: "How would you design an API Rate Limiter handling millions of requests?",
        keywords: ['token bucket', 'leaky bucket', 'sliding window', 'redis', 'distributed', 'rate limit', '429 too many requests'],
        hint: "Discuss token bucket algorithm, Redis atomic counters (INCR), and returning 429 status code.",
        keyConcepts: [
          "Choose an algorithm: Token Bucket, Leaky Bucket, or Sliding Window Log/Counter.",
          "Use distributed in-memory cache like Redis to store client request counters with TTL.",
          "Return HTTP 429 Too Many Requests status code when limit is exceeded."
        ],
        modelAnswer: "To design a distributed rate limiter: 1) Select an algorithm such as Token Bucket or Sliding Window Counter. 2) Use Redis as a central, high-performance in-memory store for tracking IP/user request counts using atomic operations (INCR) or Redis Lua scripts to avoid race conditions. 3) Place rate limiter middleware at API Gateway level. 4) When client exceeds quota, respond with HTTP 429 (Too Many Requests) along with Retry-After headers.",
        tips: "Discuss Token Bucket algorithm, Redis atomic counters, API gateway placement, and HTTP 429."
      }
    ]
  },

  'data-analyst': {
    beginner: [
      {
        id: 'da-b1',
        question: "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?",
        keywords: ['match', 'null', 'left table', 'right table', 'intersection', 'foreign key', 'join'],
        hint: "Use Venn diagram mental model: intersection vs left table full list vs right table full list.",
        keyConcepts: [
          "INNER JOIN returns only rows that have matching values in both tables.",
          "LEFT JOIN returns all rows from the left table and matched rows from the right table (NULL for unmatched).",
          "RIGHT JOIN returns all rows from the right table and matched rows from the left table."
        ],
        modelAnswer: "In SQL, INNER JOIN returns only records where there is a match in both the left and right tables. LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, along with matching records from the right table; if no match exists, NULL values are returned for right-table columns. RIGHT JOIN does the reverse, returning all records from the right table and matched records from the left table.",
        tips: "Use Venn diagram mental model and explain how unmatched rows yield NULL values."
      }
    ],
    intermediate: [
      {
        id: 'da-i1',
        question: "Walk me through your process for cleaning an unorganized dataset in Python using Pandas.",
        keywords: ['missing values', 'drop_duplicates', 'fillna', 'data types', 'outliers', 'normalization', 'pandas', 'dropna'],
        hint: "Walk through exploration (info/describe), dropping duplicates, imputing missing values (fillna), and datatype conversions.",
        keyConcepts: [
          "Inspect data with .info(), .describe(), and check for missing/duplicate values.",
          "Handle missing values via imputation (mean/median/mode) or dropna().",
          "Convert data types, trim whitespaces, remove outliers, and validate constraints."
        ],
        modelAnswer: "My data cleaning process in Pandas begins with exploration using df.info(), df.describe(), and df.isnull().sum(). Next, I handle duplicates using drop_duplicates(). For missing values, I either impute them using mean/median/mode (df.fillna()) or drop rows if appropriate. I then fix data types (e.g., converting strings to datetime using pd.to_datetime()), strip leading/trailing spaces from strings, and detect outliers using Z-score or IQR before normalizing key columns.",
        tips: "Mention handling missing values, identifying outliers, datatype conversion, and string cleaning."
      }
    ],
    advanced: [
      {
        id: 'da-a1',
        question: "How do you evaluate whether an A/B test result is statistically significant?",
        keywords: ['p-value', 'null hypothesis', 'confidence interval', 'sample size', 'z-test', 't-test', 'alpha', 'statistical significance'],
        hint: "Mention null hypothesis, sample size calculation, p-value (<0.05 threshold), and confidence intervals.",
        keyConcepts: [
          "Define Null Hypothesis (H0) and Alternative Hypothesis (H1).",
          "Calculate sample size required for statistical power (80%) before starting test.",
          "Compute p-value; if p-value < 0.05 (alpha threshold), reject Null Hypothesis and claim statistical significance."
        ],
        modelAnswer: "To evaluate an A/B test: 1) Formulate the Null Hypothesis (no difference between Variant A and B) and Alternative Hypothesis. 2) Determine required sample size beforehand to avoid early stopping bias. 3) Run the test and perform a two-sample t-test or z-test to calculate the p-value. If p < 0.05, we reject the null hypothesis, concluding the observed difference is statistically significant. We also calculate 95% Confidence Intervals to understand magnitude.",
        tips: "Reference p-values (<0.05 threshold), null hypothesis testing, sample size calculation, and statistical power."
      }
    ]
  },

  'product-manager': {
    beginner: [
      {
        id: 'pm-b1',
        question: "How do you prioritize features when building a product roadmap?",
        keywords: ['rice', 'moscow', 'impact', 'effort', 'user feedback', 'business value', 'framework', 'prioritization'],
        hint: "Mention quantitative scoring frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW.",
        keyConcepts: [
          "Use standard frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW.",
          "Align feature selection with business strategic goals and core user pain points.",
          "Balance quick wins against long-term strategic investments."
        ],
        modelAnswer: "I prioritize features by combining quantitative scoring frameworks with strategic business goals. I frequently use the RICE framework — scoring Reach, Impact, and Confidence divided by Effort — to yield an objective priority score. I also evaluate qualitative customer feedback, competitive gaps, and technical dependencies. Ultimately, I balance high-impact quick wins against strategic long-term roadmap investments.",
        tips: "Use a recognized framework like RICE (Reach, Impact, Confidence, Effort) or MoSCoW."
      }
    ],
    intermediate: [
      {
        id: 'pm-i1',
        question: "Tell me about a time you had to handle conflicting feedback from engineering tech leads vs UI design leads.",
        keywords: ['trade-off', 'user experience', 'technical debt', 'compromise', 'data driven', 'alignment', 'star method'],
        hint: "Use STAR method to describe bringing design and engineering together for a pragmatic MVP compromise.",
        keyConcepts: [
          "Use STAR method (Situation, Task, Action, Result).",
          "Gather engineering constraint facts and UX requirements.",
          "Facilitate data-backed compromise that satisfies core user needs without incurring excessive tech debt."
        ],
        modelAnswer: "In a previous sprint, our lead designer proposed a custom interactive animation that our engineering lead flagged as requiring 3 extra weeks of dev work due to architectural limitations. I stepped in by organizing a collaborative alignment workshop. We evaluated user goal impact and agreed on a simplified CSS micro-interaction MVP that retained 80% of design elegance while requiring only 2 days of engineering effort. The feature launched on schedule with positive user feedback.",
        tips: "Structure using STAR method (Situation, Task, Action, Result) focusing on pragmatic compromise."
      }
    ],
    advanced: [
      {
        id: 'pm-a1',
        question: "If retention on our mobile app dropped 15% overnight, how would you systematically investigate?",
        keywords: ['funnel', 'cohort', 'segmentation', 'logs', 'release', 'analytics', 'root cause', 'investigation'],
        hint: "Break down systematically: 1) Verify data logging integrity 2) Operational/release check 3) Segmentation by OS/cohort 4) User funnel drop-off.",
        keyConcepts: [
          "1. Verify analytics telemetry accuracy (rule out data pipeline bug).",
          "2. Check app releases, server deployments, and third-party API outages.",
          "3. Segment users by OS platform, app version, geography, and onboarding cohort."
        ],
        modelAnswer: "I would investigate systematically: 1) Verify data integrity first — check if the drop is real or caused by a broken analytics tracking event. 2) Check operational deployments — look for app release updates, server outages, or API error spikes. 3) Segment the metric — isolate drop-offs by OS (iOS vs Android), app version, user demographic, and traffic source. 4) Map user funnels to identify exactly where users drop off, then sync with engineering and QA to deploy a hotfix.",
        tips: "Break down systematically: data check -> system/release deployment check -> user segmentation -> funnel drop-off analysis."
      }
    ]
  },

  'ml-engineer': {
    beginner: [
      {
        id: 'ml-b1',
        question: "Explain the difference between Supervised and Unsupervised Machine Learning with examples.",
        keywords: ['labeled data', 'classification', 'regression', 'clustering', 'kmeans', 'supervised', 'unsupervised'],
        hint: "Contrast labeled data X->Y (classification/regression) vs unlabeled data pattern discovery (K-Means clustering).",
        keyConcepts: [
          "Supervised learning trains on labeled datasets (input X paired with ground-truth label Y).",
          "Unsupervised learning finds hidden patterns or clusters in unlabeled data (input X only).",
          "Supervised examples: Spam detection, price prediction. Unsupervised examples: K-Means customer segmentation."
        ],
        modelAnswer: "Supervised Machine Learning algorithms are trained on labeled datasets where every input sample has a known target output. Tasks include classification (e.g. spam vs non-spam) and regression (e.g. house price prediction). Unsupervised Machine Learning works on unlabeled data, aiming to discover underlying patterns, groupings, or structures. Common tasks include clustering (e.g. K-Means customer segmentation) and dimensionality reduction (e.g. PCA)."
      }
    ],
    intermediate: [
      {
        id: 'ml-i1',
        question: "What is Precision, Recall, and F1-Score, and when is Recall more important than Precision?",
        keywords: ['precision', 'recall', 'f1-score', 'false positive', 'false negative', 'confusion matrix', 'medical diagnosis'],
        hint: "Define Precision (TP/(TP+FP)) and Recall (TP/(TP+FN)). Explain why high Recall is critical when False Negatives are dangerous.",
        keyConcepts: [
          "Precision = True Positives / (True Positives + False Positives) [Accuracy of positive predictions].",
          "Recall = True Positives / (True Positives + False Negatives) [Ability to catch all actual positives].",
          "Recall is crucial when False Negatives are dangerous (e.g., medical cancer diagnosis or fraud detection)."
        ],
        modelAnswer: "Precision measures how many of the predicted positive instances were actually correct (TP / (TP + FP)). Recall measures how many of the actual positive instances were successfully identified (TP / (TP + FN)). F1-Score is the harmonic mean of Precision and Recall. Recall is far more critical when the cost of a False Negative is high — for instance, in medical disease screening or fraud detection, missing a sick patient (False Negative) is far worse than a false alarm."
      }
    ],
    advanced: [
      {
        id: 'ml-a1',
        question: "Explain the Transformer architecture and self-attention mechanism used in modern LLMs.",
        keywords: ['transformer', 'self-attention', 'query key value', 'positional encoding', 'multi-head attention', 'llm', 'parallelization'],
        hint: "Explain Q, K, V matrices, dot-product self-attention weights, multi-head attention, and positional encodings.",
        keyConcepts: [
          "Replaced RNNs/LSTMs by allowing parallel processing of entire sequences.",
          "Self-Attention computes Query (Q), Key (K), and Value (V) projections to score token relationships.",
          "Positional Encodings inject word order awareness into sequence embeddings."
        ],
        modelAnswer: "The Transformer architecture revolutionized NLP by replacing sequential RNNs with parallelizable Self-Attention mechanisms. In self-attention, input token embeddings are projected into Query (Q), Key (K), and Value (V) matrices. The dot product of Q and K yields attention weights, determining how strongly each token relates to every other token in the sequence. Multi-Head Attention allows the model to jointly attend to information from different representation subspaces, while Positional Encodings maintain sequence word order."
      }
    ]
  },

  'system-design': {
    beginner: [
      {
        id: 'sd-b1',
        question: "What is Load Balancing and what strategies exist (e.g. Round Robin, Least Connections)?",
        keywords: ['load balancer', 'round robin', 'least connections', 'health check', 'traffic', 'scaling', 'nginx'],
        hint: "Explain distributing incoming network traffic across multiple backend servers to ensure high availability.",
        keyConcepts: [
          "Load Balancer sits between clients and servers to distribute incoming traffic evenly.",
          "Strategies: Round Robin (rotational), Least Connections (routes to least busy server), IP Hash.",
          "Health checks monitor node health to prevent routing to failed servers."
        ],
        modelAnswer: "A Load Balancer acts as a reverse proxy traffic cop that distributes client requests across multiple backend servers to prevent any single server from becoming a bottleneck. Common algorithms include Round Robin (sequentially assigning requests), Least Connections (routing requests to servers with active fewest connections), and IP Hashing. Load balancers also perform continuous health checks to redirect traffic away from failing servers.",
        tips: "Explain reverse proxy architecture, health checks, and compare Round Robin vs Least Connections."
      }
    ],
    intermediate: [
      {
        id: 'sd-i1',
        question: "Explain the CAP Theorem in distributed databases and the trade-offs between CP and AP systems.",
        keywords: ['cap theorem', 'consistency', 'availability', 'partition tolerance', 'mongo', 'cassandra', 'trade-off'],
        hint: "State CAP: Consistency, Availability, Partition Tolerance. In a network partition, you must choose between Consistency (CP) or Availability (AP).",
        keyConcepts: [
          "CAP Theorem: A distributed data system can simultaneously provide at most two of: Consistency, Availability, Partition Tolerance.",
          "Since network partitions (P) are inevitable in distributed systems, design choices boil down to CP vs AP.",
          "CP systems (e.g. HBase, MongoDB) return errors if data cannot be guaranteed consistent; AP systems (e.g. Cassandra, DynamoDB) remain available but may return stale data."
        ],
        modelAnswer: "The CAP Theorem states that a distributed system can simultaneously guarantee only two out of three properties: Consistency (every read receives the most recent write or error), Availability (every non-failing node returns a response), and Partition Tolerance (the system operates despite network breaks). Because network partitions are inevitable in real-world networks, system designers must choose between CP (sacrificing availability to guarantee strict data consistency) and AP (sacrificing consistency to maintain high availability with eventual consistency)."
      }
    ],
    advanced: [
      {
        id: 'sd-a1',
        question: "How would you design a URL Shortening Service like TinyURL handling 100 million daily shortened links?",
        keywords: ['base62', 'hash function', 'redis', 'database sharding', 'key-value', 'nosql', 'unique id generator', 'read heavy'],
        hint: "Discuss read-heavy 100:1 ratio, Base62 encoding (a-z, A-Z, 0-9), key-value NoSQL/Redis cache, and unique ID generation (Snowflake).",
        keyConcepts: [
          "Read-to-Write ratio is highly skewed (e.g. 100:1 read heavy).",
          "Convert auto-increment ID or 64-bit integer to Base62 string (yielding 62^7 ~ 3.5 trillion unique URLs).",
          "Use Redis caching for top 20% viral shortened links, with Cassandra or MongoDB for scalable persistence."
        ],
        modelAnswer: "To design TinyURL: 1) Analyze scale — for 100M daily links, read traffic dominates (100:1 ratio). 2) Encoding — use Base62 encoding (a-z, A-Z, 0-9) on a 64-bit auto-incrementing integer or Twitter Snowflake ID generator, creating a compact 7-character string. 3) Storage — store mappings in a scalable NoSQL Key-Value database (MongoDB/DynamoDB) indexed by shortened key. 4) Performance — cache top requested URLs in Redis with a LRU eviction policy to achieve sub-10ms read redirects."
      }
    ]
  },

  'hr-behavioral': {
    beginner: [
      {
        id: 'hr-b1',
        question: "Tell me about yourself and why you are interested in this software development career path.",
        keywords: ['passion', 'background', 'projects', 'growth', 'impact', 'learning', 'present past future'],
        hint: "Structure your answer using the Present -> Past -> Future model (within 90 seconds).",
        keyConcepts: [
          "Structure response using Present -> Past -> Future model (90 seconds max).",
          "Highlight hands-on technical projects and real problem-solving accomplishments.",
          "Connect personal enthusiasm to the team's mission and continuous growth."
        ],
        modelAnswer: "I am a passionate software engineer with a strong background in computer science and building web applications. Recently, I've led development on full-stack projects using React, Node.js, and modern databases, focusing on performance and user experience. What excites me about this role is the opportunity to contribute to high-impact products, solve complex technical challenges alongside senior mentors, and continuously elevate my engineering skills.",
        tips: "Keep your response structured: Present -> Past experience -> Future aspiration (90 seconds max)."
      },
      {
        id: 'hr-b2',
        question: "Describe a situation where you faced a tight deadline and how you prioritized tasks to deliver on time.",
        keywords: ['star method', 'prioritization', 'communication', 'focus', 'delivered', 'timeline'],
        hint: "Use STAR (Situation, Task, Action, Result) and emphasize proactive communication and scope trimming.",
        keyConcepts: [
          "Use STAR method (Situation, Task, Action, Result).",
          "Break down priorities using Eisenhower matrix or MoSCoW.",
          "Communicate early with stakeholders to adjust scope if necessary while maintaining quality."
        ],
        modelAnswer: "During a 48-hour hackathon, our 4-person team aimed to build a full AI career dashboard. When we hit API integration delays with 12 hours left, I took charge to re-prioritize our scope. I used the STAR framework to organize tasks: I identified our core user flow (resume checker & recommendations) as must-haves, while moving non-essential settings to post-launch. I assigned micro-tasks to each teammate, coordinated testing, and we delivered a polished demo on time, winning 2nd place overall.",
        tips: "Use STAR (Situation, Task, Action, Result) and emphasize proactive communication with team members."
      }
    ],
    intermediate: [
      {
        id: 'hr-i1',
        question: "How do you handle constructive criticism or code review pushback from senior peers?",
        keywords: ['growth mindset', 'learning', 'open minded', 'objective', 'feedback', 'improvement'],
        hint: "Demonstrate emotional intelligence and a growth mindset — viewing feedback as code quality improvement.",
        keyConcepts: [
          "Demonstrate growth mindset: appreciate code review as continuous learning.",
          "Separate personal identity from code quality.",
          "Ask clarifying questions to understand architectural principles behind senior suggestions."
        ],
        modelAnswer: "I view code reviews and technical feedback as the fastest accelerator for growth. When a senior peer suggested refactoring my state logic to use custom hooks instead of inline state, I welcomed the feedback as an opportunity to improve. I scheduled a 10-minute check-in to understand their rationale regarding component reusability. I then applied the pattern across our module, improving team code standards.",
        tips: "Show high emotional intelligence, viewing feedback as an opportunity to raise team code quality."
      }
    ],
    advanced: [
      {
        id: 'hr-a1',
        question: "Tell me about a time you led a technical project through ambiguity or shifting requirements.",
        keywords: ['adaptability', 'agile', 'clarity', 'stakeholders', 'pivoting', 'team spirit'],
        hint: "Highlight breaking down ambiguous goals into clear actionable milestones using agile sprints.",
        keyConcepts: [
          "Demonstrate leadership by creating clarity from ambiguity.",
          "Establish short feedback loops with stakeholders to validate assumptions.",
          "Keep team momentum positive through iterative progress."
        ],
        modelAnswer: "On a capstone SaaS project, our client changed core requirements halfway through development from a B2C portal to a B2B multi-tenant architecture. Rather than panicking, I called a realignment meeting. I documented key architectural changes, broke down the new requirements into 2-day sprint spikes, and re-allocated team responsibilities based on strengths. By maintaining clear milestone tracking, we successfully pivoted the codebase and delivered the B2B portal 3 days ahead of final review.",
        tips: "Focus on how you broke down complex ambiguous goals into clear actionable task milestones for the team."
      }
    ]
  }
};

// 22 Detailed Mock Internship Listings (Indian & International Companies)
export const MOCK_INTERNSHIPS = [
  // Top Indian Companies & Tech Hubs
  {
    id: 'int-in-1',
    title: 'Software Development Engineer Intern (SDE)',
    company: 'Tata Consultancy Services (TCS)',
    logoSeed: 'TCS',
    location: 'Hybrid (Bengaluru, Karnataka)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹35,000 - ₹45,000 / mo',
    duration: '6 Months',
    roleCategory: 'software-engineer',
    skills: ['Java', 'Spring Boot', 'SQL', 'Data Structures', 'Git'],
    postedDate: '1 day ago',
    matchPercentage: 96,
    description: 'Work with TCS Innovation Labs on enterprise software applications, microservices, and database optimization for global banking and tech clients.',
    requirements: [
      'Pursuing B.Tech / B.E. / M.Tech in Computer Science or IT.',
      'Strong fundamentals in Data Structures, Algorithms, and Java/C++.',
      'Familiarity with SQL queries and relational databases.'
    ]
  },
  {
    id: 'int-in-2',
    title: 'Frontend React Developer Intern',
    company: 'Flipkart',
    logoSeed: 'Flipkart',
    location: 'On-site (Bengaluru, Karnataka)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹50,000 - ₹65,000 / mo',
    duration: '3 - 6 Months',
    roleCategory: 'frontend',
    skills: ['React', 'JavaScript', 'Redux', 'Tailwind CSS', 'Web Performance'],
    postedDate: 'Just now',
    matchPercentage: 95,
    description: 'Join Flipkart e-commerce core UI team. Build high-speed customer shopping interfaces, web vitals optimizations, and dynamic checkout components.',
    requirements: [
      'Hands-on experience building web apps with React.js and modern JS (ES6+).',
      'Understanding of state management (Redux/Context API) and REST APIs.',
      'Passion for high performance web loading and mobile-responsive UI.'
    ]
  },
  {
    id: 'int-in-3',
    title: 'Full Stack Web Developer Intern',
    company: 'Swiggy',
    logoSeed: 'Swiggy',
    location: 'Hybrid (Gurgaon / NCR, Haryana)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹40,000 - ₹55,000 / mo',
    duration: '6 Months',
    roleCategory: 'frontend',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    postedDate: '2 days ago',
    matchPercentage: 93,
    description: 'Develop high-concurrency order processing web dashboards and internal logistics tracking portals for Swiggy Delivery Cloud.',
    requirements: [
      'Proficiency in React and Node.js backend development.',
      'Experience with REST APIs, Express, and NoSQL databases.',
      'Good problem solving and debugging skills.'
    ]
  },
  {
    id: 'int-in-4',
    title: 'Backend API Engineering Intern',
    company: 'Razorpay',
    logoSeed: 'Razorpay',
    location: 'Hybrid (Bengaluru, Karnataka)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹55,000 - ₹70,000 / mo',
    duration: '6 Months',
    roleCategory: 'backend',
    skills: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    postedDate: '3 days ago',
    matchPercentage: 94,
    description: 'Build secure, scalable payment gateway APIs handling millions of daily transactions across India. Work on Redis caching, microservices, and fraud prevention.',
    requirements: [
      'Strong background in Node.js or Go programming.',
      'Understanding of database schema design, transactions, and indexing.',
      'Knowledge of RESTful API security (OAuth, JWT, HMAC).'
    ]
  },
  {
    id: 'int-in-5',
    title: 'Data Analyst & Business Insights Intern',
    company: 'Zomato',
    logoSeed: 'Zomato',
    location: 'On-site (Gurgaon, Haryana)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹35,000 - ₹45,000 / mo',
    duration: '3 Months',
    roleCategory: 'data-analyst',
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Excel'],
    postedDate: '1 day ago',
    matchPercentage: 91,
    description: 'Analyze millions of food delivery orders, restaurant partner funnels, and customer retention metrics using SQL and Python to drive growth decisions.',
    requirements: [
      'Proficiency in SQL (joins, window functions, aggregations).',
      'Experience with Python data stack (Pandas, Matplotlib, NumPy).',
      'Strong analytical mindset and ability to communicate data insights.'
    ]
  },
  {
    id: 'int-in-6',
    title: 'Machine Learning & AI Intern',
    company: 'Reliance Jio',
    logoSeed: 'RelianceJio',
    location: 'Hybrid (Mumbai, Maharashtra)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹42,000 - ₹55,000 / mo',
    duration: '6 Months',
    roleCategory: 'ml-engineer',
    skills: ['Python', 'PyTorch', 'Scikit-Learn', 'NLP', 'FastAPI'],
    postedDate: '4 days ago',
    matchPercentage: 89,
    description: 'Work on Jio GenAI platforms, speech recognition for Indian languages, recommendation engines, and customer query automation models.',
    requirements: [
      'Pursuing B.Tech / M.Tech in Computer Science, Data Science, or AI.',
      'Hands-on experience with Python, PyTorch/TensorFlow, and NLP.',
      'Understanding of model training, evaluation metrics, and API deployment.'
    ]
  },
  {
    id: 'int-in-7',
    title: 'Mobile & React Native Intern',
    company: 'CRED',
    logoSeed: 'CRED',
    location: 'On-site (Bengaluru, Karnataka)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹60,000 - ₹75,000 / mo',
    duration: '3 - 6 Months',
    roleCategory: 'frontend',
    skills: ['React', 'React Native', 'JavaScript', 'CSS Animations', 'Framer Motion'],
    postedDate: '2 days ago',
    matchPercentage: 97,
    description: 'Work on CRED premium mobile UI and web experiences. Build ultra-smooth animations, dark mode designs, and slick credit card reward flows.',
    requirements: [
      'Exceptional eye for UI design, micro-animations, and 60fps performance.',
      'Proficiency in JavaScript, React, and CSS/Tailwind.',
      'Prior portfolio of web or mobile front-end projects.'
    ]
  },
  {
    id: 'int-in-8',
    title: 'Cloud Systems & DevOps Intern',
    company: 'Infosys',
    logoSeed: 'Infosys',
    location: 'Hybrid (Hyderabad, Telangana)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹30,000 - ₹40,000 / mo',
    duration: '6 Months',
    roleCategory: 'backend',
    skills: ['AWS', 'Docker', 'Linux', 'Python', 'CI/CD'],
    postedDate: '5 days ago',
    matchPercentage: 88,
    description: 'Assist cloud infrastructure engineering teams in configuring AWS EC2/S3 clusters, Docker containers, and automated Jenkins CI/CD deployment pipelines.',
    requirements: [
      'Basic knowledge of Linux shell scripting and AWS cloud services.',
      'Familiarity with Docker containerization and Git version control.',
      'Curiosity for DevOps and cloud deployment automation.'
    ]
  },
  {
    id: 'int-in-9',
    title: 'Associate Product Manager (APM) Intern',
    company: 'PhonePe',
    logoSeed: 'PhonePe',
    location: 'Hybrid (Bengaluru, Karnataka)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹45,000 - ₹60,000 / mo',
    duration: '3 Months',
    roleCategory: 'product-manager',
    skills: ['Product Strategy', 'Wireframing', 'Agile', 'Jira', 'User Research'],
    postedDate: '3 days ago',
    matchPercentage: 90,
    description: 'Partner with fintech product leaders to define features for UPI payments, merchant dashboards, and financial services user journeys.',
    requirements: [
      'Strong problem-solving skills, structured thinking, and user empathy.',
      'Ability to write clear PRDs (Product Requirement Documents).',
      'Interest in Indian fintech ecosystem and payment innovations.'
    ]
  },
  {
    id: 'int-in-10',
    title: 'Software Engineer & Web Developer Intern',
    company: 'Zoho Corporation',
    logoSeed: 'Zoho',
    location: 'On-site (Chennai, Tamil Nadu)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹32,000 - ₹45,000 / mo',
    duration: '6 Months',
    roleCategory: 'software-engineer',
    skills: ['Java', 'JavaScript', 'HTML/CSS', 'SQL', 'Git'],
    postedDate: '1 week ago',
    matchPercentage: 92,
    description: 'Build SaaS products used by over 80 million global users. Work on Zoho CRM, Desk, and Creator platform web components and backend APIs.',
    requirements: [
      'Strong foundation in Java or C++ object-oriented programming.',
      'Good web technology skills (HTML, CSS, JavaScript).',
      'Self-driven learner who enjoys building clean, reliable software.'
    ]
  },
  {
    id: 'int-in-11',
    title: 'Backend & Database Systems Intern',
    company: 'Tech Mahindra',
    logoSeed: 'TechMahindra',
    location: 'Hybrid (Pune, Maharashtra)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹28,000 - ₹38,000 / mo',
    duration: '6 Months',
    roleCategory: 'backend',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST API', 'Git'],
    postedDate: '4 days ago',
    matchPercentage: 86,
    description: 'Develop RESTful backend services in Python/Django for telecom and automotive enterprise solutions.',
    requirements: [
      'Proficiency in Python programming and SQL queries.',
      'Understanding of REST API design and backend frameworks.',
      'Good verbal and written communication skills.'
    ]
  },
  {
    id: 'int-in-12',
    title: 'UI/UX & Web Developer Intern',
    company: 'Paytm',
    logoSeed: 'Paytm',
    location: 'Hybrid (Noida, UP)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹32,000 - ₹42,000 / mo',
    duration: '3 Months',
    roleCategory: 'frontend',
    skills: ['React', 'Figma', 'CSS3', 'Tailwind', 'JavaScript'],
    postedDate: 'Just now',
    matchPercentage: 94,
    description: 'Design and convert high-fidelity Paytm Mall & Wallet web mockups into fast, interactive React web interfaces.',
    requirements: [
      'Experience with React.js, HTML5, CSS3/Tailwind.',
      'Figma wireframing and responsive web layout skills.'
    ]
  },
  {
    id: 'int-in-13',
    title: 'Data Science & AdTech Analytics Intern',
    company: 'InMobi',
    logoSeed: 'InMobi',
    location: 'Remote (India)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹40,000 - ₹52,000 / mo',
    duration: '6 Months',
    roleCategory: 'data-analyst',
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'BigQuery'],
    postedDate: '2 days ago',
    matchPercentage: 89,
    description: 'Analyze mobile advertising telemetry, click-through rates, and user engagement algorithms across global ad networks.',
    requirements: [
      'Strong Python data analysis skills (Pandas, NumPy, Scikit-learn).',
      'Advanced SQL and data processing concepts.'
    ]
  },
  {
    id: 'int-in-14',
    title: 'Full Stack Engineer Intern',
    company: 'Wipro Technologies',
    logoSeed: 'Wipro',
    location: 'Hybrid (Hyderabad, Telangana)',
    region: 'India',
    type: 'Full-time',
    stipend: '₹28,000 - ₹36,000 / mo',
    duration: '6 Months',
    roleCategory: 'software-engineer',
    skills: ['JavaScript', 'Node.js', 'React', 'SQL', 'Git'],
    postedDate: '5 days ago',
    matchPercentage: 87,
    description: 'Work on enterprise client portals, building full-stack web modules with React and Node.js microservices.',
    requirements: [
      'Graduating students with CS/IT background.',
      'Knowledge of JavaScript, HTML/CSS, and relational databases.'
    ]
  },

  // International / Abroad Internships
  {
    id: 'int-1',
    title: 'Frontend React Engineering Intern',
    company: 'Apex Cloud Systems',
    logoSeed: 'ApexCloud',
    location: 'Remote (USA)',
    region: 'Abroad',
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
    region: 'Abroad',
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
    location: 'Remote (London, UK)',
    region: 'Abroad',
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
    region: 'Abroad',
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
    location: 'Remote (Canada)',
    region: 'Abroad',
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
    location: 'Remote (Berlin, Germany)',
    region: 'Abroad',
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
    region: 'Abroad',
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
    location: 'Remote (Singapore)',
    region: 'Abroad',
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
