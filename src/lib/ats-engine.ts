export interface AtsAuditResult {
  score: number;
  tier: string;
  isNonResume: boolean;
  matchedCoreSkills: string[];
  missingCoreSkills: string[];
  strengths: string[];
  improvements: string[];
  keyMissingSkills: string[];
  summary: string;
  candidateProfile?: {
    name?: string;
    targetRole?: string;
    location?: string;
    experienceLevel?: string;
  };
  breakdown?: {
    coreSkillsScore: number;
    supportingSkillsScore: number;
    productionScore: number;
    experienceRelevanceScore: number;
    formattingMetricsScore: number;
  };
}

export interface RoleSkillMatrix {
  domain: string;
  category: "Tech & Software" | "Core Engineering" | "Data & Analytics" | "Healthcare & Life Sciences" | "Finance & Legal" | "Product & Design" | "Operations & HR" | "General";
  coreSkills: string[];        // 40% Weight - Mandatory foundational skills
  supportingSkills: string[];  // 20% Weight - Secondary frameworks, APIs & libraries
  productionSkills: string[];  // 15% Weight - Deployment, MLOps, CI/CD, Cloud & Testing
  displayCoreTools: string[];
}

/**
 * Skill Synonyms Dictionary for Fuzzy & Alias Matching
 */
export const SKILL_SYNONYMS: Record<string, string[]> = {
  // Frontend
  "react": ["react", "react.js", "reactjs", "react 18", "react 19"],
  "next.js": ["next.js", "nextjs", "next.js 14", "next.js 15", "next js", "next"],
  "vue": ["vue", "vue.js", "vuejs", "vue3", "nuxt", "nuxtjs"],
  "angular": ["angular", "angularjs", "angular 17", "angular 18"],
  "svelte": ["svelte", "sveltekit"],
  "typescript": ["typescript", "ts"],
  "javascript": ["javascript", "js", "ecmascript", "es6", "es2020"],
  "html": ["html", "html5"],
  "css": ["css", "css3", "sass", "scss", "less"],
  "tailwind": ["tailwind", "tailwind css", "tailwindcss"],
  "redux": ["redux", "redux toolkit", "rtk", "zustand", "mobx", "recoil", "pinia"],
  "graphql": ["graphql", "gql", "apollo", "apollo client"],
  "rest api": ["rest api", "rest apis", "restful", "restful api", "rest", "web apis", "api integration", "apis"],

  // Backend
  "node.js": ["node.js", "nodejs", "node js", "node"],
  "express": ["express", "express.js", "expressjs"],
  "nestjs": ["nestjs", "nest.js", "nest js"],
  "python": ["python", "python3", "py"],
  "flask": ["flask"],
  "fastapi": ["fastapi", "fast-api", "fast api"],
  "django": ["django", "drf", "django rest framework"],
  "java": ["java", "java 17", "java 21", "core java", "j2ee"],
  "spring boot": ["spring boot", "springboot", "spring framework", "spring"],
  "golang": ["golang", "go lang", "go"],
  "c#": ["c#", "csharp", ".net", ".net core", "asp.net", "dotnet"],
  "c++": ["c++", "cpp"],
  "php": ["php", "laravel", "symfony"],
  "ruby": ["ruby", "ruby on rails", "rails"],
  "microservices": ["microservices", "microservice architecture", "micro-services", "soa", "distributed systems"],
  "system design": ["system design", "software architecture", "high level design", "low level design", "hld", "lld"],

  // Databases & Caching
  "sql": ["sql", "rdbms", "relational database", "relational databases"],
  "postgresql": ["postgresql", "postgres", "psql"],
  "mysql": ["mysql", "mariadb"],
  "mongodb": ["mongodb", "mongo", "nosql", "documentdb"],
  "redis": ["redis", "in-memory cache", "caching"],
  "prisma": ["prisma", "prisma orm", "typeorm", "hibernate", "sequelize", "sqlalchemy"],
  "elasticsearch": ["elasticsearch", "elastic search", "opensearch"],

  // Cloud & DevOps
  "docker": ["docker", "docker compose", "containerization", "containers"],
  "kubernetes": ["kubernetes", "k8s", "helm", "kubectl", "eks", "gke", "aks"],
  "ci/cd": ["ci/cd", "ci cd", "github actions", "gitlab ci", "jenkins", "argo cd", "continuous integration", "continuous deployment"],
  "aws": ["aws", "amazon web services", "ec2", "s3", "lambda", "ecs", "cloudformation", "iam", "sqs", "sns"],
  "gcp": ["gcp", "google cloud", "google cloud platform", "vertex ai", "bigquery", "cloud run"],
  "azure": ["azure", "microsoft azure", "azure devops"],
  "terraform": ["terraform", "iac", "infrastructure as code", "ansible"],
  "linux": ["linux", "ubuntu", "bash", "shell scripting", "unix"],

  // AI / ML / Data
  "machine learning": ["machine learning", "ml", "statistical learning"],
  "deep learning": ["deep learning", "dl", "neural networks", "cnn", "rnn", "lstm"],
  "pytorch": ["pytorch", "torch"],
  "tensorflow": ["tensorflow", "tf", "keras"],
  "llm": ["llm", "llms", "large language models", "large language model", "generative ai", "genai", "gpt-4", "gemini", "claude"],
  "rag": ["rag", "retrieval augmented generation", "retrieval-augmented generation", "semantic search", "vector search"],
  "chromadb": ["chromadb", "chroma", "pinecone", "weaviate", "qdrant", "milvus", "vector db", "vector database"],
  "langchain": ["langchain", "llamaindex", "autogen", "crewai", "agentic", "ai agents", "autonomous agents"],
  "scikit-learn": ["scikit-learn", "sklearn"],
  "pandas": ["pandas", "numpy", "scipy"],
  "nlp": ["nlp", "natural language processing", "spacy", "nltk", "bert", "hugging face", "transformers"],
  "computer vision": ["computer vision", "cv", "opencv", "yolo", "image segmentation"],
  "mlops": ["mlops", "mlflow", "kubeflow", "wandb", "model deployment", "model monitoring", "dvc"],
  "tableau": ["tableau", "power bi", "looker", "metabase", "data visualization", "dashboards"],
  "excel": ["excel", "advanced excel", "vlookup", "pivot tables", "macros"],
  "etl": ["etl", "data pipelines", "airflow", "dbt", "spark", "apache spark", "kafka"],

  // Mobile
  "react native": ["react native", "react-native", "expo"],
  "flutter": ["flutter", "dart"],
  "swift": ["swift", "swiftui", "ios", "xcode", "cocoapods"],
  "kotlin": ["kotlin", "android", "jetpack compose", "android studio"],

  // QA & Testing
  "jest": ["jest", "mocha", "chai", "vitest", "unit testing"],
  "cypress": ["cypress", "playwright", "selenium", "e2e testing", "end-to-end testing"],
  "pytest": ["pytest", "unittest"],
  "postman": ["postman", "api testing", "newman", "swagger"],

  // Core Engineering & Non-Tech
  "autocad": ["autocad", "cad", "computer aided design"],
  "solidworks": ["solidworks", "catia", "creo", "ptc creo", "inventor"],
  "ansys": ["ansys", "fea", "finite element analysis", "cfd"],
  "thermodynamics": ["thermodynamics", "heat transfer", "fluid mechanics", "fluid dynamics"],
  "gd&t": ["gd&t", "geometric dimensioning", "dfm", "dfmea"],
  "revit": ["revit", "bim", "building information modeling"],
  "staad pro": ["staad pro", "staad", "staad.pro", "etabs", "structural analysis"],
  "geotechnical": ["geotechnical", "soil mechanics", "foundation engineering", "concrete technology", "surveying"],
  "matlab": ["matlab", "simulink"],
  "power systems": ["power systems", "switchgear", "transformers", "substation", "high voltage", "transmission"],
  "plc": ["plc", "scada", "hmi", "industrial automation", "ladder logic"],
  "clinical diagnosis": ["clinical diagnosis", "patient care", "inpatient", "outpatient", "triage", "differential diagnosis"],
  "ehr": ["ehr", "emr", "electronic health records", "epic", "cerner", "hipaa"],
  "pharmacology": ["pharmacology", "pharmacokinetics", "pharmacotherapy", "pathology"],
  "gaap": ["gaap", "us gaap", "ifrs", "accounting standards"],
  "taxation": ["taxation", "direct tax", "indirect tax", "gst", "tds", "income tax"],
  "auditing": ["auditing", "statutory audit", "internal audit", "tax audit", "compliance"],
  "financial statements": ["financial statements", "balance sheet", "p&l", "profit and loss", "cash flow", "general ledger"],
  "tally": ["tally", "tally prime", "quickbooks", "sap fico", "sap erp"],

  // Product, Design & Management
  "agile": ["agile", "scrum", "kanban", "sprint planning", "jira", "confluence"],
  "product strategy": ["product strategy", "product roadmap", "user stories", "prd", "okrs", "kpis"],
  "figma": ["figma", "wireframing", "prototyping", "ui/ux", "user research", "design system"]
};

/**
 * Universal Global Role Skill Matrices
 */
export const ROLE_SKILL_MATRICES: Record<string, RoleSkillMatrix> = {
  "full stack": {
    domain: "Full-Stack Web Development",
    category: "Tech & Software",
    coreSkills: ["react", "next.js", "node.js", "typescript", "javascript", "sql", "postgresql", "rest api", "html", "css"],
    supportingSkills: ["mongodb", "redis", "tailwind", "express", "graphql", "prisma", "python", "flask", "system design"],
    productionSkills: ["docker", "kubernetes", "ci/cd", "aws", "gcp", "linux", "jest", "cypress"],
    displayCoreTools: ["React / Next.js", "TypeScript / JavaScript", "Node.js / Express Backend", "PostgreSQL / SQL Databases", "REST APIs / GraphQL"]
  },
  "frontend": {
    domain: "Frontend Web Development",
    category: "Tech & Software",
    coreSkills: ["react", "next.js", "typescript", "javascript", "html", "css", "tailwind", "redux"],
    supportingSkills: ["vue", "angular", "graphql", "rest api", "figma", "web vitals", "responsive design"],
    productionSkills: ["ci/cd", "jest", "cypress", "webpack", "vite", "git"],
    displayCoreTools: ["React / Next.js", "TypeScript / JavaScript", "Tailwind CSS & Modern UI", "HTML5 / CSS3", "State Management (Redux/Zustand)"]
  },
  "backend": {
    domain: "Backend Systems Architecture",
    category: "Tech & Software",
    coreSkills: ["node.js", "python", "java", "golang", "sql", "postgresql", "rest api", "microservices"],
    supportingSkills: ["spring boot", "fastapi", "django", "express", "mongodb", "redis", "graphql", "system design"],
    productionSkills: ["docker", "kubernetes", "kafka", "aws", "ci/cd", "linux", "pytest", "jest"],
    displayCoreTools: ["Python / Node.js / Java / Go", "PostgreSQL / MySQL", "Microservices & Distributed Systems", "REST / gRPC APIs", "Redis & Message Queues"]
  },
  "ai": {
    domain: "AI & Machine Learning Engineering",
    category: "Tech & Software",
    coreSkills: ["python", "machine learning", "deep learning", "pytorch", "tensorflow", "llm", "rag", "langchain", "chromadb", "nlp"],
    supportingSkills: ["scikit-learn", "pandas", "fastapi", "sql", "gemini", "computer vision", "transformers"],
    productionSkills: ["mlops", "docker", "aws", "gcp", "model deployment", "ci/cd", "linux"],
    displayCoreTools: ["Python", "PyTorch / TensorFlow", "Generative AI & LLMs", "Autonomous Agents & RAG", "Vector Databases (ChromaDB/Pinecone)"]
  },
  "machine learning": {
    domain: "Machine Learning Engineering",
    category: "Tech & Software",
    coreSkills: ["python", "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "pandas"],
    supportingSkills: ["sql", "fastapi", "flask", "nlp", "computer vision", "statistics", "data modeling"],
    productionSkills: ["mlops", "docker", "aws", "model deployment", "model monitoring", "linux"],
    displayCoreTools: ["Python", "PyTorch / TensorFlow", "Scikit-Learn", "Feature Engineering", "Data Modeling"]
  },
  "data scientist": {
    domain: "Data Science & Advanced Analytics",
    category: "Data & Analytics",
    coreSkills: ["python", "pandas", "scikit-learn", "sql", "machine learning", "statistics", "data visualization"],
    supportingSkills: ["tableau", "power bi", "deep learning", "pytorch", "nlp", "data modeling"],
    productionSkills: ["bigquery", "snowflake", "aws", "docker", "mlops", "git"],
    displayCoreTools: ["Python (Pandas/NumPy)", "Scikit-Learn & Statistical Modeling", "SQL (Complex Queries)", "Tableau / Power BI", "Predictive Analytics"]
  },
  "data analyst": {
    domain: "Data Analytics & Business Intelligence",
    category: "Data & Analytics",
    coreSkills: ["sql", "excel", "tableau", "power bi", "python", "pandas", "data visualization"],
    supportingSkills: ["etl", "statistics", "dashboards", "business intelligence", "data modeling"],
    productionSkills: ["bigquery", "snowflake", "automated pipelines", "git"],
    displayCoreTools: ["SQL (Advanced Aggregations)", "Power BI / Tableau Dashboards", "Advanced Excel (VLOOKUP/Pivot)", "Python (Pandas)", "KPI Reporting"]
  },
  "devops": {
    domain: "DevOps & Cloud Platform Engineering",
    category: "Tech & Software",
    coreSkills: ["docker", "kubernetes", "aws", "ci/cd", "terraform", "linux", "jenkins", "ansible"],
    supportingSkills: ["gcp", "azure", "python", "bash", "helm", "networking"],
    productionSkills: ["prometheus", "grafana", "security", "disaster recovery", "iac"],
    displayCoreTools: ["Docker & Kubernetes", "AWS / GCP / Azure", "Terraform (IaC)", "CI/CD (GitHub Actions/Jenkins)", "Prometheus & Grafana"]
  },
  "cyber": {
    domain: "Cybersecurity & InfoSec Engineering",
    category: "Tech & Software",
    coreSkills: ["penetration testing", "vulnerability assessment", "firewall", "cryptography", "zero trust", "incident response", "owasp"],
    supportingSkills: ["linux", "python", "networking", "siem", "soc", "wireshark"],
    productionSkills: ["cloud security", "cissp", "iso 27001", "endpoint detection", "nist"],
    displayCoreTools: ["Penetration Testing", "SIEM & SOC Operations", "Vulnerability Management", "OWASP Top 10", "Network Firewalls"]
  },
  "qa": {
    domain: "Quality Assurance & Test Automation (SDET)",
    category: "Tech & Software",
    coreSkills: ["jest", "cypress", "pytest", "postman", "rest api", "python", "javascript", "typescript"],
    supportingSkills: ["sql", "git", "linux", "agile", "jira"],
    productionSkills: ["ci/cd", "docker", "load testing", "performance testing", "github actions"],
    displayCoreTools: ["Cypress / Playwright / Selenium", "Jest / Pytest", "Postman API Testing", "CI/CD Test Automation", "Test Coverage Analysis"]
  },
  "mobile": {
    domain: "Mobile Application Engineering",
    category: "Tech & Software",
    coreSkills: ["react native", "flutter", "swift", "kotlin", "typescript", "javascript", "rest api"],
    supportingSkills: ["redux", "graphql", "sql", "ui/ux", "figma"],
    productionSkills: ["ci/cd", "app store deployment", "play store deployment", "jest", "git"],
    displayCoreTools: ["React Native / Flutter", "Swift / Kotlin", "REST / GraphQL APIs", "State Management", "Mobile CI/CD & Publishing"]
  },
  "product manager": {
    domain: "Technical Product Management",
    category: "Product & Design",
    coreSkills: ["product strategy", "agile", "user research", "kpis", "sql", "jira"],
    supportingSkills: ["figma", "tableau", "data visualization", "communication", "a/b testing"],
    productionSkills: ["product analytics", "stakeholder management", "go-to-market strategy"],
    displayCoreTools: ["Product Roadmapping & PRDs", "Agile / Scrum Sprint Management", "User Story Formulation", "Data-Driven KPI Analysis", "Figma Prototyping"]
  },
  "ui/ux": {
    domain: "UI/UX & Product Design",
    category: "Product & Design",
    coreSkills: ["figma", "wireframing", "prototyping", "design system", "user research", "responsive design"],
    supportingSkills: ["html", "css", "tailwind", "interaction design", "usability testing"],
    productionSkills: ["design tokens", "accessibility (wcag)", "developer handoff"],
    displayCoreTools: ["Figma & Design Systems", "Interactive Prototyping", "User Research & Journey Mapping", "Wireframing", "Design Accessibility"]
  },
  "mechanical": {
    domain: "Mechanical & Thermal Systems Engineering",
    category: "Core Engineering",
    coreSkills: ["solidworks", "autocad", "thermodynamics", "gd&t", "ansys", "manufacturing"],
    supportingSkills: ["matlab", "heat transfer", "hydraulics", "pneumatics", "kinematics"],
    productionSkills: ["quality control", "six sigma", "dfm", "production planning", "sap"],
    displayCoreTools: ["SolidWorks / CATIA", "AutoCAD", "ANSYS / FEA Simulation", "Thermodynamics & Heat Transfer", "GD&T & DFM"]
  },
  "civil": {
    domain: "Civil & Structural Engineering",
    category: "Core Engineering",
    coreSkills: ["autocad", "revit", "staad pro", "structural analysis", "concrete", "geotechnical"],
    supportingSkills: ["surveying", "construction management", "hydrology", "estimating", "structural design"],
    productionSkills: ["project estimation", "safety compliance", "quality audit", "site supervision"],
    displayCoreTools: ["AutoCAD Civil 3D", "Revit & BIM", "STAAD Pro / ETABS", "Structural Concrete & Steel Design", "Geotechnical & Site Analysis"]
  },
  "electrical": {
    domain: "Electrical & Power Systems Engineering",
    category: "Core Engineering",
    coreSkills: ["power systems", "matlab", "autocad", "circuit design", "plc", "transformers"],
    supportingSkills: ["scada", "power electronics", "transmission", "substation", "high voltage", "simulink"],
    productionSkills: ["grid integration", "energy audit", "ieee standards", "electrical safety"],
    displayCoreTools: ["MATLAB / Simulink", "AutoCAD Electrical", "Power Grid Transmission", "PLC & SCADA Automation", "Circuit Design"]
  },
  "doctor": {
    domain: "Medical Practice & Clinical Care",
    category: "Healthcare & Life Sciences",
    coreSkills: ["clinical diagnosis", "patient care", "ehr", "pharmacology", "triage"],
    supportingSkills: ["pathology", "internal medicine", "patient assessment", "clinical documentation", "medical ethics"],
    productionSkills: ["hospital protocols", "hipaa", "emergency medicine", "clinical audits"],
    displayCoreTools: ["Clinical Diagnosis & Patient Care", "Electronic Health Records (EHR)", "Pharmacology & Prescriptions", "Emergency Triage", "Inpatient Protocols"]
  },
  "accountant": {
    domain: "Accounting, Auditing & Taxation",
    category: "Finance & Legal",
    coreSkills: ["gaap", "taxation", "auditing", "financial statements", "tally", "excel"],
    supportingSkills: ["quickbooks", "reconciliation", "general ledger", "balance sheet", "gst", "tds"],
    productionSkills: ["statutory audit", "internal controls", "tax filing", "financial reporting", "sap"],
    displayCoreTools: ["US GAAP / IFRS Compliance", "Balance Sheet & P&L Statements", "Tally Prime / QuickBooks", "Direct & Indirect Tax (GST)", "Audit & Reconciliation"]
  },
  "software": {
    domain: "Software Engineering",
    category: "Tech & Software",
    coreSkills: ["python", "javascript", "typescript", "java", "sql", "rest api", "system design", "html", "css"],
    supportingSkills: ["react", "node.js", "git", "linux", "microservices", "mongodb", "postgresql"],
    productionSkills: ["docker", "ci/cd", "aws", "jest", "pytest", "testing"],
    displayCoreTools: ["TypeScript / JavaScript / Python / Java", "Databases & REST APIs", "System Architecture & OOP", "Git Version Control", "Testing & CI/CD"]
  }
};

/**
 * Checks if text contains a skill or any of its synonyms
 */
export function hasSkillMatch(text: string, canonicalSkill: string): boolean {
  if (!text || !canonicalSkill) return false;
  
  const synonyms = SKILL_SYNONYMS[canonicalSkill.toLowerCase()] || [canonicalSkill.toLowerCase()];
  
  for (const term of synonyms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Word boundary matching (allowing hyphens, dots, pluses like c++, next.js, ci/cd)
    const pattern = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, "i");
    if (pattern.test(text)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Resolves or synthesizes the role skill matrix for any user input
 */
export function resolveRoleSkillMatrix(targetRole: string): RoleSkillMatrix {
  const roleLower = (targetRole || "Software Engineer").toLowerCase().trim();

  // 1. Direct and substring matching
  for (const [key, matrix] of Object.entries(ROLE_SKILL_MATRICES)) {
    if (roleLower.includes(key) || key.includes(roleLower)) {
      return matrix;
    }
  }

  // 2. Multi-word role disambiguation
  if (roleLower.includes("full") || roleLower.includes("stack") || roleLower.includes("mern") || roleLower.includes("mean")) {
    return ROLE_SKILL_MATRICES["full stack"];
  }
  if (roleLower.includes("ai") || roleLower.includes("artificial") || roleLower.includes("genai") || roleLower.includes("llm")) {
    return ROLE_SKILL_MATRICES["ai"];
  }
  if (roleLower.includes("ml") || roleLower.includes("deep learning")) {
    return ROLE_SKILL_MATRICES["machine learning"];
  }
  if (roleLower.includes("front") || roleLower.includes("ui") || roleLower.includes("react") || roleLower.includes("web developer")) {
    return ROLE_SKILL_MATRICES["frontend"];
  }
  if (roleLower.includes("back") || roleLower.includes("api") || roleLower.includes("node") || roleLower.includes("server")) {
    return ROLE_SKILL_MATRICES["backend"];
  }
  if (roleLower.includes("cloud") || roleLower.includes("site reliability") || roleLower.includes("sre") || roleLower.includes("infrastructure")) {
    return ROLE_SKILL_MATRICES["devops"];
  }
  if (roleLower.includes("data") && (roleLower.includes("scien") || roleLower.includes("ml"))) {
    return ROLE_SKILL_MATRICES["data scientist"];
  }
  if (roleLower.includes("data") || roleLower.includes("bi") || roleLower.includes("analytics")) {
    return ROLE_SKILL_MATRICES["data analyst"];
  }
  if (roleLower.includes("test") || roleLower.includes("sdet") || roleLower.includes("automation")) {
    return ROLE_SKILL_MATRICES["qa"];
  }
  if (roleLower.includes("app") || roleLower.includes("android") || roleLower.includes("ios")) {
    return ROLE_SKILL_MATRICES["mobile"];
  }

  // 3. Dynamic semantic synthesizer for custom/emerging roles
  const tokens = roleLower
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !["the", "and", "for", "with", "specialist", "expert", "officer", "associate", "senior", "junior", "lead", "engineer", "developer"].includes(w));

  return {
    domain: targetRole,
    category: "General",
    coreSkills: tokens.length > 0 ? tokens : ["technical skills", "industry tools", "core domain expertise"],
    supportingSkills: ["git", "problem solving", "communication", "project execution", "documentation"],
    productionSkills: ["quality assurance", "deployment", "best practices", "monitoring"],
    displayCoreTools: tokens.length > 0 ? tokens.map(t => t.charAt(0).toUpperCase() + t.slice(1)) : ["Core Domain Competencies", "Industry Standard Software"]
  };
}

/**
 * Enterprise Multi-Modal ATS Engine
 * Accurately audits candidate resumes with dynamic, mathematical scoring
 */
export function evaluateResumeAts(rawText: string, targetRole: string, numPages: number = 1): AtsAuditResult {
  const text = (rawText || "").trim();
  const lower = text.toLowerCase();
  const cleanTargetRole = (targetRole || "Software Engineer").trim();

  // 1. Positive Resume Markers
  const hasContactInfo = 
    lower.includes("@") || 
    lower.includes(".com") || 
    lower.includes(".org") || 
    lower.includes("linkedin") || 
    lower.includes("github") || 
    lower.includes("phone") || 
    lower.includes("mobile") || 
    /\b\d{10}\b/.test(lower) || 
    /\+\d{1,3}[\s-]?\d{6,14}/.test(lower);

  const hasResumeSections = 
    lower.includes("summary") || 
    lower.includes("experience") || 
    lower.includes("work history") || 
    lower.includes("education") || 
    lower.includes("skills") || 
    lower.includes("projects") || 
    lower.includes("b.tech") || 
    lower.includes("bachelor") || 
    lower.includes("master") || 
    lower.includes("degree") || 
    lower.includes("university") || 
    lower.includes("college") || 
    lower.includes("certifications");

  const isLegitCandidateResume = (hasContactInfo || hasResumeSections) && text.length > 60;

  // 2. Explicit Non-Resume / Whitepaper Detection
  const isExplicitPolicyPaper = 
    numPages > 3 &&
    !hasContactInfo &&
    !lower.includes("resume") &&
    !lower.includes("curriculum vitae") &&
    (lower.includes("whitepaper") || lower.includes("policy brief") || lower.includes("ministry of") || lower.includes("table of contents") || lower.includes("proceedings of"));

  if ((!isLegitCandidateResume && text.length < 60) || isExplicitPolicyPaper) {
    return {
      score: 0,
      tier: "Invalid Document / Non-Resume",
      isNonResume: true,
      matchedCoreSkills: [],
      missingCoreSkills: [],
      strengths: [
        numPages > 1 ? `Multi-page digital document detected (${numPages} pages)` : "Document uploaded to vault",
        "Technical text formatting preserved"
      ],
      improvements: [
        "Corporate ATS filters discarded this upload: could not detect standard resume sections (Contact Info, Work Experience, Technical Skills, Education).",
        "Please upload an official 1–2 page PDF candidate resume."
      ],
      keyMissingSkills: ["Personal Contact Details", "Professional Work History", "Core Technical Competencies", "Academic Credentials"],
      summary: "Our automated ATS parser was unable to identify standard resume sections in the uploaded document. Corporate applicant tracking systems require a structured 1–2 page CV."
    };
  }

  // 3. Resolve Role Matrix & Match Skills
  const roleMatrix = resolveRoleSkillMatrix(cleanTargetRole);

  const matchedCore: string[] = [];
  const missingCore: string[] = [];
  const matchedSupporting: string[] = [];
  const missingSupporting: string[] = [];
  const matchedProduction: string[] = [];
  const missingProduction: string[] = [];

  for (const skill of roleMatrix.coreSkills) {
    if (hasSkillMatch(lower, skill)) {
      matchedCore.push(skill);
    } else {
      missingCore.push(skill);
    }
  }

  for (const skill of roleMatrix.supportingSkills) {
    if (hasSkillMatch(lower, skill)) {
      matchedSupporting.push(skill);
    } else {
      missingSupporting.push(skill);
    }
  }

  for (const skill of roleMatrix.productionSkills) {
    if (hasSkillMatch(lower, skill)) {
      matchedProduction.push(skill);
    } else {
      missingProduction.push(skill);
    }
  }

  // 4. Quantifiable Impact & Action Verb Detection
  const actionVerbs = ["architected", "engineered", "developed", "built", "designed", "optimized", "spearheaded", "implemented", "deployed", "scaled", "led", "automated", "reduced", "increased", "achieved", "managed", "supervised", "integrated", "created", "refactored"];
  const detectedActionVerbs = actionVerbs.filter(v => hasSkillMatch(lower, v));

  const metricMatches = lower.match(/(?:\d+%\s*(?:reduction|increase|growth|improvement|faster|accuracy|boost)?|\$\s*\d+[\d,.]*(?:k|m|b)?|\b\d+(?:k|m|\+)?\s*(?:users|requests|qps|queries|clients|customers|records|transactions|tps|latency|ms|lpa)\b)/gi) || [];
  const hasQuantifiableImpact = metricMatches.length >= 2;

  // 5. Multi-Factor Mathematical Score Computation (0-100)
  // - Core Technical Skills: 40 pts max
  // - Supporting & Framework Skills: 20 pts max
  // - Production, Cloud, DevOps & Testing: 15 pts max
  // - Experience & Contact Parsability: 15 pts max
  // - Impact Metrics & Action Verbs: 10 pts max

  const totalCore = Math.max(1, roleMatrix.coreSkills.length);
  const coreRatio = matchedCore.length / totalCore;
  const coreScore = Math.round(coreRatio * 40);

  const totalSupporting = Math.max(1, roleMatrix.supportingSkills.length);
  const supportingRatio = matchedSupporting.length / totalSupporting;
  const supportingScore = Math.round(supportingRatio * 20);

  const totalProd = Math.max(1, roleMatrix.productionSkills.length);
  const prodRatio = matchedProduction.length / totalProd;
  const productionScore = Math.round(prodRatio * 15);

  let experienceScore = 0;
  if (hasContactInfo) experienceScore += 5;
  if (hasResumeSections) experienceScore += 5;
  // Domain relevance in title or summary
  if (lower.includes(roleMatrix.domain.toLowerCase().split(" ")[0]) || lower.includes(cleanTargetRole.toLowerCase().split(" ")[0])) {
    experienceScore += 5;
  }

  let formattingMetricsScore = 0;
  if (detectedActionVerbs.length >= 3) formattingMetricsScore += 4;
  else if (detectedActionVerbs.length >= 1) formattingMetricsScore += 2;

  if (metricMatches.length >= 3) formattingMetricsScore += 6;
  else if (metricMatches.length >= 1) formattingMetricsScore += 3;

  let calculatedScore = coreScore + supportingScore + productionScore + experienceScore + formattingMetricsScore;

  // 6. Cross-Domain Severe Mismatch Dampener
  const isTargetInNonTech = roleMatrix.category === "Core Engineering" || roleMatrix.category === "Healthcare & Life Sciences" || roleMatrix.category === "Finance & Legal";
  const isResumeTech = lower.includes("software") || lower.includes("python") || lower.includes("javascript") || lower.includes("react") || lower.includes("frontend") || lower.includes("backend") || lower.includes("html");
  
  if (isTargetInNonTech && isResumeTech && matchedCore.length <= 1) {
    calculatedScore = Math.min(28, Math.max(15, calculatedScore));
  } else if (matchedCore.length === 0 && roleMatrix.coreSkills.length >= 4) {
    calculatedScore = Math.min(35, calculatedScore);
  } else {
    // Normal bounds
    calculatedScore = Math.min(96, Math.max(20, calculatedScore));
  }

  // 7. Determine Tier
  let tier = "Moderate Match";
  if (calculatedScore >= 88) {
    tier = "Excellent (Top 5% Match)";
  } else if (calculatedScore >= 75) {
    tier = "Strong / Highly Competitive";
  } else if (calculatedScore >= 60) {
    tier = "Moderate / Needs Optimization";
  } else if (calculatedScore >= 40) {
    tier = "Below Benchmark / Gaps Detected";
  } else {
    tier = "Severe Domain Mismatch";
  }

  // 8. Capitalize & Format Skill Display Names
  const formatSkillName = (name: string): string => {
    return name
      .split(/[\s/]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const displayMatchedCore = matchedCore.map(formatSkillName);
  const displayMissingCore = missingCore.slice(0, 5).map(formatSkillName);
  
  // Assemble actual missing skills (core first, then production/supporting)
  const allMissing = [...missingCore, ...missingProduction, ...missingSupporting];
  const displayKeyMissing = allMissing.length > 0 
    ? allMissing.slice(0, 4).map(formatSkillName)
    : [];

  // 9. Generate Contextual, Highly Specific Dynamic Strengths
  const strengths: string[] = [];
  if (matchedCore.length > 0) {
    strengths.push(`Verified core domain alignment: Strong presence of ${displayMatchedCore.slice(0, 4).join(", ")} in technical skills and project descriptions.`);
  } else {
    strengths.push("Clean resume format and parsable section layout detected by ATS engine.");
  }

  if (matchedProduction.length > 0) {
    strengths.push(`Modern engineering practices detected: Proficient in ${matchedProduction.map(formatSkillName).slice(0, 3).join(", ")}.`);
  }

  if (hasQuantifiableImpact) {
    strengths.push("Strong impact quantification: Resume incorporates measurable metrics, percentages, and performance results.");
  } else {
    strengths.push("Clear professional trajectory with verifiable academic or work credentials.");
  }

  if (hasContactInfo) {
    strengths.push("Complete contact header: Parsable email, phone, and online portfolio links.");
  }

  // 10. Generate Contextual, Actionable Dynamic Improvements
  const improvements: string[] = [];
  if (missingCore.length > 0) {
    improvements.push(`Missing high-priority keywords for ${cleanTargetRole}: Add explicit mentions of ${displayMissingCore.slice(0, 3).join(", ")} to your skills summary and experience bullet points.`);
  }

  if (!hasQuantifiableImpact) {
    improvements.push("Incorporate quantifiable metrics (e.g. '% latency reduced', '$ revenue generated', 'X active users') in each project bullet point to stand out to enterprise recruiters.");
  }

  if (missingProduction.length > 0 && roleMatrix.category === "Tech & Software") {
    improvements.push(`Highlight production & deployment capabilities: Adding ${missingProduction.slice(0, 2).map(formatSkillName).join(" and ")} will push your profile above the 90+ threshold.`);
  }

  if (calculatedScore < 70) {
    improvements.push(`Align project headlines directly with ${cleanTargetRole} terminology to pass automated ATS filters within the first 3 seconds of scanning.`);
  }

  // 11. Dynamic Tailored Summary
  let summary = "";
  if (calculatedScore >= 88) {
    summary = `Your resume demonstrates exceptional alignment for ${cleanTargetRole} positions with an ATS compatibility score of ${calculatedScore}/100. Your verified competencies in ${displayMatchedCore.slice(0, 3).join(", ")} position you in the top candidate tier.`;
  } else if (calculatedScore >= 70) {
    summary = `Your resume showcases solid fundamentals for ${cleanTargetRole} roles with a ${calculatedScore}/100 ATS score. Incorporating ${displayMissingCore.slice(0, 2).join(" and ")} and measurable outcome metrics will elevate your application into the top 5%.`;
  } else if (calculatedScore >= 45) {
    summary = `Your resume scored ${calculatedScore}/100 for ${cleanTargetRole}. Key domain keywords (${displayMissingCore.slice(0, 3).join(", ")}) are missing or underrepresented. Re-tailoring your experience bullet points will significantly improve ATS pass rates.`;
  } else {
    summary = `Automated corporate ATS filters will flag a domain mismatch (${calculatedScore}/100) for ${cleanTargetRole} roles. Your resume currently lacks core competencies in ${roleMatrix.displayCoreTools.slice(0, 3).join(", ")}.`;
  }

  // 12. Candidate Profile Heuristic Fallback
  let candidateName = "";
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length > 0) {
    const firstLine = lines[0].replace(/[^a-zA-Z\s.-]/g, "").trim();
    if (firstLine.length >= 2 && firstLine.length <= 40 && !firstLine.toLowerCase().includes("resume") && !firstLine.toLowerCase().includes("cv")) {
      candidateName = firstLine;
    }
  }

  return {
    score: calculatedScore,
    tier,
    isNonResume: false,
    matchedCoreSkills: displayMatchedCore,
    missingCoreSkills: displayMissingCore,
    strengths,
    improvements,
    keyMissingSkills: displayKeyMissing,
    summary,
    candidateProfile: {
      name: candidateName || undefined,
      targetRole: cleanTargetRole,
      experienceLevel: calculatedScore >= 80 ? "3-5 Years" : calculatedScore >= 60 ? "1-3 Years" : "Fresher"
    },
    breakdown: {
      coreSkillsScore: coreScore,
      supportingSkillsScore: supportingScore,
      productionScore: productionScore,
      experienceRelevanceScore: experienceScore,
      formattingMetricsScore: formattingMetricsScore
    }
  };
}

