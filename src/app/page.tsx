"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Zap, 
  Bot, 
  BrainCircuit, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Cpu,
  Building2,
  FileCheck,
  Search,
  Check,
  FileText,
  Play,
  Award,
  Layers,
  Send,
  MessageSquare,
  TrendingUp,
  Flame,
  ExternalLink,
  MapPin,
  Bookmark,
  SlidersHorizontal,
  X,
  Copy,
  Download,
  CheckCircle,
  Briefcase
} from "lucide-react";

interface SampleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedAt: string;
  matchScore: number;
  tags: { text: string; matched: boolean }[];
  initial: string;
  avatarBg: string;
  source: string;
  applyUrl: string;
  description: string;
}

const SAMPLE_JOBS: SampleJob[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer (React & Node)",
    company: "Stripe",
    location: "Remote / Bangalore, India",
    salary: "$140,000 - $185,000 / yr (₹35-50 LPA)",
    postedAt: "2 hours ago",
    matchScore: 98,
    initial: "S",
    avatarBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
    source: "Google Jobs • Direct Careers",
    applyUrl: "https://stripe.com/jobs",
    tags: [
      { text: "React 19 & TypeScript", matched: true },
      { text: "Node.js & Distributed Systems", matched: true },
      { text: "GraphQL API Optimization", matched: true }
    ],
    description: "Building next-generation global payment APIs, scalable developer dashboards, and high-throughput transaction pipelines."
  },
  {
    id: "job-2",
    title: "Lead Frontend Architect",
    company: "Google Cloud",
    location: "Bengaluru, India / Hybrid",
    salary: "₹45 - 65 LPA ($160k Equivalent)",
    postedAt: "5 hours ago",
    matchScore: 94,
    initial: "G",
    avatarBg: "bg-gradient-to-br from-blue-500 via-green-500 to-amber-500 text-white",
    source: "Google Careers",
    applyUrl: "https://careers.google.com",
    tags: [
      { text: "Next.js & Server Components", matched: true },
      { text: "Web Performance & Core Vitals", matched: true },
      { text: "Kubernetes & GCP (Optional)", matched: false }
    ],
    description: "Lead frontend infrastructure modernization for GCP cloud management suites across millions of global enterprise users."
  },
  {
    id: "job-3",
    title: "AI Solutions & Applications Engineer",
    company: "OpenAI Ecosystem Partner",
    location: "100% Remote / Worldwide",
    salary: "$150,000 - $190,000 / yr",
    postedAt: "Just now",
    matchScore: 91,
    initial: "O",
    avatarBg: "bg-gradient-to-br from-emerald-600 to-teal-800 text-white",
    source: "LinkedIn Live Index",
    applyUrl: "https://linkedin.com",
    tags: [
      { text: "Gemini / LLM Fine-Tuning", matched: true },
      { text: "LangChain & Vector DBs", matched: true },
      { text: "Rust Backend Experience", matched: false }
    ],
    description: "Architect state-of-the-art agentic tool-use pipelines, multimodal vision workflows, and autonomous enterprise copilot systems."
  },
  {
    id: "job-4",
    title: "Senior Product Engineer (Fintech)",
    company: "Razorpay",
    location: "Bangalore, India",
    salary: "₹38 - 52 LPA + ESOPs",
    postedAt: "1 day ago",
    matchScore: 89,
    initial: "R",
    avatarBg: "bg-gradient-to-br from-blue-600 to-cyan-700 text-white",
    source: "Indeed Verified",
    applyUrl: "https://razorpay.com/jobs",
    tags: [
      { text: "React Native & Web", matched: true },
      { text: "PostgreSQL & Redis", matched: true },
      { text: "Banking Gateway Integrations", matched: true }
    ],
    description: "Scale India's most loved payment gateways and neo-banking suites serving over 10 million merchants nationwide."
  }
];

interface CategoryBlueprint {
  id: string;
  categoryName: string;
  tabLabel: string;
  tabIcon: string;
  featured: {
    role: string;
    icon: string;
    badge: string;
    matchScore: number;
    keywords: string[];
    xyzBullet: string;
    query: string;
  };
  gridCards: {
    id: string;
    role: string;
    icon: string;
    badge: string;
    matchScore: number;
    skills: string[];
    query: string;
  }[];
}

const CATEGORY_BLUEPRINTS: Record<string, CategoryBlueprint> = {
  all: {
    id: "all",
    categoryName: "All Roles",
    tabLabel: "All Roles",
    tabIcon: "☀️",
    featured: {
      role: "Full-Stack Software Engineer",
      icon: "💻",
      badge: "LIVE ATS KEYWORD MATCH",
      matchScore: 99,
      keywords: ["React", "TypeScript", "Node.js", "Microservices", "Docker", "AWS", "REST APIs", "CI/CD"],
      xyzBullet: "Architected scalable microservices with Node.js and TypeScript, handling 2M+ daily active requests with 99.9% uptime.",
      query: "Full-Stack Software Engineer React Node"
    },
    gridCards: [
      {
        id: "g-1",
        role: "Full-Stack Software Engineer",
        icon: "💻",
        badge: "HIGH DEMAND",
        matchScore: 99,
        skills: ["React", "TypeScript", "Node.js", "Microservices"],
        query: "Full-Stack Software Engineer"
      },
      {
        id: "g-2",
        role: "TCS NQT / IT Fresher",
        icon: "🎓",
        badge: "CAMPUS PLACEMENT",
        matchScore: 100,
        skills: ["Java", "SQL", "Data Structures", "OOPs"],
        query: "TCS NQT Fresher"
      },
      {
        id: "g-3",
        role: "Data Engineer / Analytics",
        icon: "📊",
        badge: "DATA & CLOUD",
        matchScore: 98,
        skills: ["Python", "SQL", "Apache Spark", "Airflow"],
        query: "Data Engineer Analytics"
      }
    ]
  },
  freshers: {
    id: "freshers",
    categoryName: "Freshers & Students",
    tabLabel: "Freshers & Students",
    tabIcon: "🎓",
    featured: {
      role: "TCS NQT / IT Graduate Trainee",
      icon: "🎓",
      badge: "CAMPUS ATS BLUEPRINT",
      matchScore: 100,
      keywords: ["Java 17", "Python", "SQL / DBMS", "Data Structures", "OOP Concepts", "Git / GitHub", "Problem Solving", "REST APIs"],
      xyzBullet: "Engineered automated data extraction scripts in Python and SQL, reducing manual reporting turnaround by 45% during final year capstone.",
      query: "TCS NQT Fresher Graduate Trainee"
    },
    gridCards: [
      {
        id: "gf-1",
        role: "TCS NQT / IT Fresher",
        icon: "🎓",
        badge: "CAMPUS PLACEMENT",
        matchScore: 100,
        skills: ["Java", "SQL", "Data Structures", "OOPs"],
        query: "TCS NQT Fresher"
      },
      {
        id: "gf-2",
        role: "Infosys Systems Engineer",
        icon: "💼",
        badge: "ENTRY LEVEL",
        matchScore: 97,
        skills: ["Python", "DBMS", "Software Engineering", "Aptitude"],
        query: "Infosys Systems Engineer Fresher"
      },
      {
        id: "gf-3",
        role: "Junior Frontend Developer",
        icon: "💻",
        badge: "0-1 YR EXP",
        matchScore: 96,
        skills: ["HTML/CSS", "JavaScript", "React", "Git"],
        query: "Junior Frontend Developer"
      }
    ]
  },
  tech: {
    id: "tech",
    categoryName: "Software & Tech",
    tabLabel: "Software & Tech",
    tabIcon: "💻",
    featured: {
      role: "Lead Frontend & React Architect",
      icon: "💻",
      badge: "ENTERPRISE ATS BLUEPRINT",
      matchScore: 99,
      keywords: ["Next.js 15", "TypeScript", "Tailwind CSS", "Server Components", "State Management", "Web Vitals", "GraphQL", "Jest / Playwright"],
      xyzBullet: "Optimized Core Web Vitals across Next.js e-commerce storefront, improving Largest Contentful Paint (LCP) by 42% and conversion by 18%.",
      query: "Lead Frontend Architect React Next.js"
    },
    gridCards: [
      {
        id: "gt-1",
        role: "Senior React Developer",
        icon: "⚛️",
        badge: "HIGH DEMAND",
        matchScore: 99,
        skills: ["React 19", "Next.js", "TypeScript", "Tailwind"],
        query: "Senior React Developer"
      },
      {
        id: "gt-2",
        role: "Backend Go / Node Engineer",
        icon: "⚡",
        badge: "DISTRIBUTED SYSTEMS",
        matchScore: 98,
        skills: ["Go", "Node.js", "PostgreSQL", "Kafka"],
        query: "Backend Engineer Golang Node"
      },
      {
        id: "gt-3",
        role: "Mobile Developer (Flutter / RN)",
        icon: "📱",
        badge: "CROSS PLATFORM",
        matchScore: 95,
        skills: ["React Native", "Flutter", "iOS", "Android"],
        query: "React Native Mobile Developer"
      }
    ]
  },
  data: {
    id: "data",
    categoryName: "Data Science & AI",
    tabLabel: "Data Science & AI",
    tabIcon: "📊",
    featured: {
      role: "AI / LLM Applications Engineer",
      icon: "📊",
      badge: "GENERATIVE AI INDEX",
      matchScore: 98,
      keywords: ["Python", "Gemini 2.5", "LangChain", "Vector DBs", "RAG Pipelines", "PyTorch", "HuggingFace", "FastAPI"],
      xyzBullet: "Constructed multi-modal RAG knowledge engine utilizing Gemini 2.5 Flash and vector search, indexing 1.2M documents with sub-250ms query latency.",
      query: "AI LLM Applications Engineer RAG"
    },
    gridCards: [
      {
        id: "gd-1",
        role: "Data Engineer / Analytics",
        icon: "📊",
        badge: "DATA & CLOUD",
        matchScore: 98,
        skills: ["Python", "SQL", "Apache Spark", "Airflow"],
        query: "Data Engineer Analytics"
      },
      {
        id: "gd-2",
        role: "Machine Learning Scientist",
        icon: "🧠",
        badge: "RESEARCH & PROD",
        matchScore: 96,
        skills: ["PyTorch", "Scikit-Learn", "MLOps", "Transformers"],
        query: "Machine Learning Scientist"
      },
      {
        id: "gd-3",
        role: "Business Intelligence Lead",
        icon: "📈",
        badge: "ENTERPRISE METRICS",
        matchScore: 94,
        skills: ["PowerBI", "Tableau", "SQL", "dbt"],
        query: "BI Developer PowerBI SQL"
      }
    ]
  },
  cloud: {
    id: "cloud",
    categoryName: "Cloud & DevOps",
    tabLabel: "Cloud & DevOps",
    tabIcon: "☁️",
    featured: {
      role: "AWS Cloud & DevOps Architect",
      icon: "☁️",
      badge: "INFRASTRUCTURE ATS",
      matchScore: 97,
      keywords: ["AWS", "Kubernetes (EKS)", "Terraform", "Docker", "CI/CD (GitHub Actions)", "Prometheus", "Grafana", "Linux"],
      xyzBullet: "Automated multi-region AWS Kubernetes deployment with Terraform and GitHub Actions, slashing release deployment cycles from 4 hours to 12 minutes.",
      query: "AWS Cloud DevOps Architect Kubernetes Terraform"
    },
    gridCards: [
      {
        id: "gc-1",
        role: "DevOps Engineer (AWS/K8s)",
        icon: "☁️",
        badge: "HIGH DEMAND",
        matchScore: 97,
        skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
        query: "DevOps Engineer AWS Kubernetes"
      },
      {
        id: "gc-2",
        role: "Site Reliability Engineer",
        icon: "🛡️",
        badge: "99.99% SLA",
        matchScore: 96,
        skills: ["Linux", "Datadog", "Golang", "Incident Response"],
        query: "Site Reliability Engineer SRE"
      },
      {
        id: "gc-3",
        role: "Cloud Security Specialist",
        icon: "🔒",
        badge: "CYBERSECURITY",
        matchScore: 93,
        skills: ["IAM", "SOC2", "AWS Security", "Penetration Testing"],
        query: "Cloud Security Specialist AWS"
      }
    ]
  },
  management: {
    id: "management",
    categoryName: "Management & Finance",
    tabLabel: "Management & Finance",
    tabIcon: "💼",
    featured: {
      role: "Technical Product Manager (Fintech)",
      icon: "💼",
      badge: "EXECUTIVE ATS BLUEPRINT",
      matchScore: 96,
      keywords: ["Product Strategy", "Agile / Scrum", "Roadmapping", "User Research", "Jira", "KPI Tracking", "System Architecture", "A/B Testing"],
      xyzBullet: "Spearheaded 0-to-1 launch of B2B payment automation workflow, acquiring 45 enterprise clients and $1.4M ARR within 90 days of release.",
      query: "Technical Product Manager Fintech"
    },
    gridCards: [
      {
        id: "gm-1",
        role: "Senior Product Manager",
        icon: "💼",
        badge: "LEADERSHIP",
        matchScore: 96,
        skills: ["Strategy", "Roadmapping", "Agile", "User Analytics"],
        query: "Senior Product Manager"
      },
      {
        id: "gm-2",
        role: "Scrum Master / Agile Coach",
        icon: "📋",
        badge: "DELIVERY LEAD",
        matchScore: 95,
        skills: ["Scrum", "Kanban", "Jira", "Sprint Planning"],
        query: "Scrum Master Agile Coach"
      },
      {
        id: "gm-3",
        role: "Financial Analyst (SaaS)",
        icon: "💰",
        badge: "FINANCE & OPS",
        matchScore: 92,
        skills: ["Financial Modeling", "Excel VBA", "SQL", "Forecasting"],
        query: "Financial Analyst SaaS"
      }
    ]
  }
};

export default function Home() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simulatedMatch, setSimulatedMatch] = useState<number>(98);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Command Console Search States
  const [targetRole, setTargetRole] = useState("Full-Stack Engineer, React, Node.js");
  const [targetLocation, setTargetLocation] = useState("Remote / Global");
  const [selectedFilter, setSelectedFilter] = useState("90%+ Match");
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // 1-Click Cover Letter Generator Modal Preview State
  const [selectedJobForLetter, setSelectedJobForLetter] = useState<SampleJob | null>(null);
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Interactive Live Scanner Loop animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);

    return () => clearInterval(stepInterval);
  }, []);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = targetRole.trim() || "Software Engineer";
    const loc = targetLocation.trim() || "";
    router.push(`/dashboard?q=${encodeURIComponent(query)}&location=${encodeURIComponent(loc)}`);
  };

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleGenerateCoverLetter = (job: SampleJob) => {
    setSelectedJobForLetter(job);
    setGeneratingLetter(true);
    setGeneratedLetter("");
    setCopiedLetter(false);

    // Simulate luxury AI streaming generation
    setTimeout(() => {
      setGeneratedLetter(
`Dear Hiring Team at ${job.company},

I am writing to express my enthusiastic interest in the ${job.title} role. Having engineered high-throughput web applications with deep competency in ${job.tags.filter(t => t.matched).map(t => t.text).join(" and ")}, I am confident in my ability to deliver immediate value to ${job.company}'s engineering objectives.

In my previous roles, I architected modern client applications and resilient backend services, optimizing core performance metrics and reducing API latency by over 38%. My hands-on background directly mirrors the requirements for ${job.title}, particularly in building scalable microservices and intuitive, high-converting interfaces.

${job.company}'s reputation for relentless product excellence resonates strongly with my commitment to craftsmanship and system reliability. I welcome the opportunity to discuss how my technical acumen and problem-solving velocity can accelerate your team's upcoming roadmap.

Thank you for your time and consideration.

Warm regards,
Candidate via ZenScout AI
Part of the Aneevarp Solutions Career Suite`
      );
      setGeneratingLetter(false);
    }, 700);
  };

  const pipelineSteps = [
    {
      agent: "Agent Scout",
      badge: "Discovery",
      title: "Scanning Live Google Jobs Network",
      sub: "Crawling 10,000+ verified listings across Google Jobs, LinkedIn, and Indeed matching your seniority.",
      icon: Search,
      color: "text-[#476550] dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Filter",
      badge: "Semantic ATS",
      title: "Scoring Resume Compatibility",
      sub: "Extracting skills, vector embeddings, and calculating precise 0-100% ATS match scores.",
      icon: FileCheck,
      color: "text-emerald-700 dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Factory",
      badge: "Synthesis",
      title: "Auto-Tailoring Bespoke Cover Letters",
      sub: "Mapping verifiable achievements directly to the hiring manager's core technical challenges.",
      icon: Zap,
      color: "text-[#476550] dark:text-[#2DD4BF]",
      bg: "bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)]",
      border: "border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.25)]"
    },
    {
      agent: "Agent Coach",
      badge: "Simulation",
      title: "Simulating Live Hiring Manager Mock Rounds",
      sub: "Practicing interactive technical and behavioral questions with instant STAR scorecard feedback.",
      icon: Bot,
      color: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800/60"
    }
  ];

  const faqs = [
    {
      q: "What is ZenScout AI and how does it work with ZenResume?",
      a: "ZenScout AI is the flagship autonomous job search and application intelligence platform engineered by Aneevarp Solutions alongside ZenResume. While ZenResume empowers you to create single-column, ATS-certified resumes, ZenScout AI scans live job boards, calculates resume fit scores (0-100%), auto-tailors tailored cover letters, and coaches you through live interviews."
    },
    {
      q: "How does the Zero-Backend Architecture protect my privacy?",
      a: "Unlike traditional recruitment platforms that store your resume, telephone number, and work history in cloud databases, ZenScout AI operates 100% in your browser's local memory. Your resume is base64 encoded client-side, sent statelessly to Google Gemini AI for processing, and never saved on our servers."
    },
    {
      q: "How does Agent Filter calculate my resume match score?",
      a: "Agent Filter uses advanced Gemini 2.5 Flash semantic embeddings to compare your past project achievements, technical competencies, and domain experience against the specific requirements in the job description. It generates an objective 0-100 score and highlights qualification strengths."
    },
    {
      q: "Can the AI write customized cover letters that pass ATS screening?",
      a: "Yes. Agent Factory analyzes both the job posting and your resume to generate a focused, professional 3-paragraph cover letter mapping your verifiable accomplishments to the company's core challenges. It avoids generic AI fluff and adheres to industry-standard formatting."
    },
    {
      q: "How does the AI Interview Coach work?",
      a: "Agent Coach simulates a live technical and behavioral hiring manager. It asks role-specific questions one at a time, evaluates your answers, and provides immediate constructive feedback to help you refine your verbal delivery before real interviews."
    },
    {
      q: "Is ZenScout AI free to use?",
      a: "Yes! ZenScout AI provides a generous Free Tier (5 daily scouts, 2 cover letters, and 3 interview rounds) without requiring a credit card."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="flex flex-col w-full text-center px-3 sm:px-4 text-[#1A1F1F] dark:text-[#F8FAFC] max-w-[min(1200px,calc(100vw-24px))] mx-auto">
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========================================================================= */}
      {/* 4. HERO SECTION (Exact visual parity with ZenResume Dark Mode Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="flex flex-col items-center justify-center pt-8 sm:pt-14 pb-10 sm:pb-14 relative w-full overflow-hidden">
        {/* Soft Radial Center Emerald Glow (ZenResume darkmode signature glow) */}
        <div className="absolute inset-0 zen-ambient-glow pointer-events-none -z-10"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/10 dark:bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Top Pill Badge: Part of the Aneevarp Solutions Career Suite */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(71,101,80,0.08)] dark:bg-[rgba(20,45,35,0.7)] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] text-xs sm:text-sm font-extrabold text-[#476550] dark:text-[#2DD4BF] shadow-sm mb-6 hover:scale-105 transition-transform cursor-default">
          <span className="text-base">🤖</span>
          <span>Part of the Aneevarp Solutions Career Suite</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 ml-0.5" />
        </div>
        
        {/* Main Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 max-w-4xl text-[#1A1F1F] dark:text-[#F8FAFC] leading-[1.12] px-2 font-display">
          Let AI Scout & Apply to <br className="hidden sm:block" />
          <span className="text-[#00846D] dark:text-[#2DD4BF] drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]">
            200+ Verified Jobs
          </span> While You Sleep.
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#475569] dark:text-[#CBD5E1] max-w-2xl mb-8 leading-relaxed font-normal px-2">
          Why waste 3 hours manually applying or ₹499 on paid subscription traps? Crawl live job boards (Google Jobs, LinkedIn, Indeed), score your resume match rate in real-time, and auto-tailor application cover letters with 1 click — <strong>100% Free Forever</strong> with Zero-Backend privacy.
        </p>

        {/* Primary Hero CTA Button (Large Pill Button matching ZenResume screenshot) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-8">
          <button
            onClick={() => {
              const el = document.getElementById("category-blueprints");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#476550] hover:bg-[#3A5342] dark:bg-[#237A57] dark:hover:bg-[#10B981] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-[0_6px_20px_rgba(71,101,80,0.25)] dark:shadow-[0_6px_24px_rgba(35,122,87,0.45)] hover:scale-105 active:scale-95 btn-tactile cursor-pointer"
          >
            <span>⚡ Scout Live Jobs Free</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* 1-Click Fast-Track Hero Role Chips (Exact match to Screenshot 1) */}
        <div className="flex flex-col items-center gap-2.5 mb-8 z-10 w-full">
          <span className="text-[11px] sm:text-xs font-bold text-[#7D8787] dark:text-[#94A3B8] inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Or launch instantly with pre-filled role blueprints:</span>
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl px-2">
            {[
              { icon: "💻", title: "Software Engineer", query: "Software Engineer" },
              { icon: "🎓", title: "TCS NQT Fresher", query: "TCS NQT Fresher" },
              { icon: "📊", title: "Data Analyst", query: "Data Analyst Python SQL" },
              { icon: "☁️", title: "AWS Cloud Dev", query: "AWS Cloud DevOps Engineer" },
              { icon: "🏛️", title: "Campus Placement", query: "Campus Placement Fresher 2025" }
            ].map((chip, idx) => (
              <Link
                key={idx}
                href={`/dashboard?q=${encodeURIComponent(chip.query)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1B2A24] text-[#1A1F1F] dark:text-[#CBD5E1] hover:border-[#476550] dark:hover:border-[#2DD4BF] hover:text-[#476550] dark:hover:text-[#2DD4BF] transition-all btn-tactile shadow-sm"
              >
                <span>{chip.icon}</span>
                <span>{chip.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REAL-TIME COMMAND SEARCH BAR */}
        {/* ========================================================================= */}
        <div className="w-full max-w-3xl mb-4 z-10">
          <form 
            onSubmit={handleConsoleSubmit}
            className="bg-[#FAF9F6] dark:bg-[#0D1714] p-2 sm:p-2.5 rounded-3xl md:rounded-full border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] shadow-[0_8px_30px_rgba(26,31,31,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center gap-2 transition-all hover:border-[#476550] dark:hover:border-[#2DD4BF]"
          >
            {/* Target Role Input */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 w-full md:flex-1 bg-white dark:bg-[#121E1A] md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none">
              <Search className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Target Role (e.g. Full-Stack Engineer, React, Node.js)"
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1A1F1F] dark:text-[#F8FAFC] placeholder:text-[#7D8787] focus:outline-none min-h-[40px]"
              />
            </div>

            <div className="hidden md:block w-px h-8 bg-[rgba(162,188,168,0.3)] dark:bg-[rgba(45,212,191,0.2)]"></div>

            {/* Target Location Input */}
            <div className="flex items-center gap-2 px-4 py-2.5 w-full md:w-56 bg-white dark:bg-[#121E1A] md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none">
              <MapPin className="w-4 h-4 text-[#476550] dark:text-[#2DD4BF] flex-shrink-0" />
              <input
                type="text"
                value={targetLocation}
                onChange={(e) => setTargetLocation(e.target.value)}
                placeholder="Location (e.g. Remote, Bangalore)"
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#1A1F1F] dark:text-[#F8FAFC] placeholder:text-[#7D8787] focus:outline-none min-h-[40px]"
              />
            </div>

            {/* Action CTA Button */}
            <button
              type="submit"
              className="stitch-hero-cta btn-tactile w-full md:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md font-extrabold whitespace-nowrap"
            >
              <span>⚡ Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE ROLE FILTER CAROUSEL & FEATURED BLUEPRINT SHOWCASE (Screenshot 2 Parity) */}
      {/* ========================================================================= */}
      <section id="category-blueprints" className="py-8 sm:py-12 w-full max-w-5xl mx-auto text-center scroll-mt-20">
        
        {/* Sub-Heading Description matching Screenshot 2 */}
        <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] max-w-2xl mx-auto mb-6 leading-relaxed">
          Select your career stage or domain to preview recruiter-tested Google XYZ bullet points, inspect high-priority ATS keywords, and scout live matches.
        </p>

        {/* Filter Tabs Carousel matching Screenshot 2 */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-6 no-scrollbar px-1">
          {[
            { id: "all", label: "All Roles", icon: "☀️" },
            { id: "freshers", label: "Freshers & Students", icon: "🎓" },
            { id: "tech", label: "Software & Tech", icon: "💻" },
            { id: "data", label: "Data Science & AI", icon: "📊" },
            { id: "cloud", label: "Cloud & DevOps", icon: "☁️" },
            { id: "management", label: "Management & Finance", icon: "💼" }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer btn-tactile ${
                  isActive
                    ? "bg-[#2DD4BF] text-[#061B18] shadow-[0_4px_16px_rgba(45,212,191,0.4)] scale-105"
                    : "bg-[#FAF9F6] dark:bg-[#0D1714] text-[#475569] dark:text-[#94A3B8] border border-[#D8E2DA] dark:border-[#1C2E27] hover:text-[#1A1F1F] dark:hover:text-white hover:border-[#476550] dark:hover:border-[#2DD4BF]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Large Featured Interactive Showcase Card (Screenshot 2 exact parity) */}
        {(() => {
          const currentBlueprint = CATEGORY_BLUEPRINTS[activeCategory] || CATEGORY_BLUEPRINTS.all;
          const feat = currentBlueprint.featured;

          return (
            <div className="bg-[#FAF9F6] dark:bg-[#081410] border-2 border-[#2DD4BF] rounded-2xl p-5 sm:p-7 md:p-8 text-left shadow-[0_0_30px_rgba(45,212,191,0.18)] mb-6 transition-all duration-300 relative overflow-hidden">
              {/* Top Row: Live ATS Badge + Role Title + Match Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EB] dark:bg-[#0D1F1A] border border-[#A2BCA8]/50 dark:border-[rgba(45,212,191,0.3)] text-[11px] font-black text-[#476550] dark:text-[#2DD4BF] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{feat.badge}</span>
                  </span>
                  <h3 className="text-base sm:text-xl font-extrabold text-[#1A1F1F] dark:text-white flex items-center gap-2">
                    <span>{feat.icon}</span>
                    <span>{feat.role}</span>
                  </h3>
                </div>

                {/* Match Score Badge */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2DD4BF] text-[#061B18] font-black text-xs sm:text-sm shadow-md self-start sm:self-auto font-counter">
                  {feat.matchScore}% ATS Match
                </div>
              </div>

              {/* Recruiter ATS Keywords Crawled Row */}
              <div className="mb-5">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] block mb-2.5">
                  🏷️ TOP RECRUITER ATS KEYWORDS CRAWLED FOR THIS ROLE:
                </span>
                <div className="flex flex-wrap gap-2">
                  {feat.keywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-[#0E1F1A] border border-[#D8E2DA] dark:border-[#1D362E] text-xs font-bold text-[#1A1F1F] dark:text-[#F8FAFC] shadow-sm"
                    >
                      <Check className="w-3 h-3 text-emerald-600 dark:text-[#2DD4BF] stroke-[3]" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Google XYZ Bullet Point Preview Well (Screenshot 2 match) */}
              <div className="bg-[#E2E8F0] dark:bg-[#121E1A] border border-slate-300 dark:border-[#1F382E] rounded-xl p-4 sm:p-5 mb-6 text-slate-900 dark:text-[#E2E8F0]">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-[#2DD4BF] mb-1.5">
                  VERIFIED GOOGLE XYZ BULLET POINT:
                </div>
                <p className="text-xs sm:text-sm italic leading-relaxed font-mono">
                  "{feat.xyzBullet}"
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[rgba(162,188,168,0.3)] dark:border-[rgba(45,212,191,0.15)]">
                <span className="text-xs text-[#475569] dark:text-[#94A3B8] font-medium text-center sm:text-left">
                  100% Vector parsable ATS format • Single column
                </span>

                <Link
                  href={`/dashboard?q=${encodeURIComponent(feat.query)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#061B18] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 btn-tactile cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>⚡ Scout Matches for This Role</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })()}

        {/* 3-Column Grid Cards Below (Screenshot 2 exact parity) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {((CATEGORY_BLUEPRINTS[activeCategory] || CATEGORY_BLUEPRINTS.all).gridCards).map((card) => (
            <div
              key={card.id}
              className="bg-[#FAF9F6] dark:bg-[#0B1612] border border-[#D8E2DA] dark:border-[#1A2E26] hover:border-[#476550] dark:hover:border-[#2DD4BF] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F0EB] dark:bg-[#13221C] flex items-center justify-center text-base">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#E8F0EB] dark:bg-[#0E201B] text-[#476550] dark:text-[#2DD4BF] border border-[#A2BCA8]/40 dark:border-[#1F3E34]">
                    {card.badge}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-[#1A1F1F] dark:text-white mb-1.5 group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF] transition-colors">
                  {card.role}
                </h4>

                <div className="inline-flex items-center gap-1 text-xs font-black text-[#00846D] dark:text-[#2DD4BF] mb-3">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{card.matchScore}% ATS Match</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#121E1A] border border-[#D8E2DA] dark:border-[#1B2D26] text-[#475569] dark:text-[#CBD5E1]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/dashboard?q=${encodeURIComponent(card.query)}`}
                className="pt-3 border-t border-[rgba(162,188,168,0.3)] dark:border-[#1A2E26] flex items-center justify-between text-xs font-bold text-[#476550] dark:text-[#2DD4BF] group-hover:underline"
              >
                <span>Scout Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

        {/* ========================================================================= */}
        {/* 6. LUXURY JOB CARDS & AI MATCH RESULT GRID */}
        {/* ========================================================================= */}
        <div className="w-full max-w-5xl text-left my-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#476550] dark:text-[#2DD4BF] mb-1">
                <span className="live-status-dot"></span>
                <span>Live Google Jobs Stream & ATS Matcher</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1F1F] dark:text-[#F8FAFC]">
                Scouted High-Fit Opportunities
              </h2>
            </div>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#476550] dark:text-[#2DD4BF] hover:underline self-start sm:self-auto"
            >
              <span>Explore all live matches in Kanban Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Responsive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {SAMPLE_JOBS.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              // Calculate SVG stroke offset for match ring
              const radius = 20;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (job.matchScore / 100) * circumference;

              return (
                <div 
                  key={job.id}
                  className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1F352C] hover:border-[#476550] dark:hover:border-[#2DD4BF] rounded-2xl p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden transition-all shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Top Row: Avatar Box + Info + Circular Match Ring */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-start gap-3">
                        {/* Company Logo / Initial Avatar box */}
                        <div className={`w-11 h-11 rounded-xl ${job.avatarBg} flex items-center justify-center font-extrabold text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                          {job.initial}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-[#1A1F1F] dark:text-[#F8FAFC] leading-snug group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF] transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#CBD5E1] mt-0.5 font-medium">
                            <span className="font-bold text-[#1A1F1F] dark:text-white">{job.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#7D8787]" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Prominent Circular Match Ring Badge */}
                      <div className="flex flex-col items-center flex-shrink-0" title={`${job.matchScore}% ATS Compatibility`}>
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-12 h-12 transform -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r={radius}
                              stroke="currentColor"
                              strokeWidth="3.5"
                              className="text-slate-200 dark:text-[#13221C]"
                              fill="transparent"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r={radius}
                              stroke="currentColor"
                              strokeWidth="3.5"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              className="text-[#476550] dark:text-[#2DD4BF] transition-all duration-1000"
                              fill="transparent"
                            />
                          </svg>
                          <span className="absolute font-extrabold text-[11px] text-[#476550] dark:text-[#2DD4BF]">
                            {job.matchScore}%
                          </span>
                        </div>
                        <span className="text-[9px] font-black uppercase text-[#7D8787] dark:text-[#94A3B8] mt-0.5">
                          ATS Fit
                        </span>
                      </div>
                    </div>

                    {/* Salary & Source Meta */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                      <span className="font-extrabold text-[#476550] dark:text-[#2DD4BF] bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] px-2.5 py-1 rounded-md">
                        {job.salary}
                      </span>
                      <span className="text-[#7D8787] text-[11px]">
                        {job.source} • {job.postedAt}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] dark:text-[#CBD5E1] line-clamp-2 leading-relaxed mb-3.5">
                      {job.description}
                    </p>

                    {/* 3 Keyword Overlap Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                            tag.matched
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
                              : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
                          }`}
                        >
                          {tag.matched ? `✅ ${tag.text}` : `⚠️ ${tag.text}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3.5 border-t border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center gap-2">
                    {/* ⚡ 1-Click Auto-Tailor Cover Letter */}
                    <button
                      onClick={() => handleGenerateCoverLetter(job)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#476550] hover:bg-[#3A5342] dark:bg-[#2DD4BF] dark:hover:bg-[#5EEAD4] text-white dark:text-[#061B18] text-xs font-bold py-2.5 px-3 rounded-full btn-tactile shadow-sm cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>1-Click Auto-Tailor</span>
                    </button>

                    {/* View Job on Source */}
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-full text-xs font-bold text-[#1A1F1F] dark:text-[#F8FAFC] bg-[#FAF9F6] dark:bg-[#13221C] border border-[rgba(162,188,168,0.4)] dark:border-[#1F352C] hover:border-[#476550] dark:hover:border-[#2DD4BF] transition-all btn-tactile"
                      title="View original posting on source"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    {/* Save to Job Tracker */}
                    <button
                      onClick={() => handleToggleSaveJob(job.id)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all btn-tactile cursor-pointer ${
                        isSaved
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-[#FAF9F6] dark:bg-[#13221C] border-[rgba(162,188,168,0.4)] dark:border-[#1F352C] text-[#7D8787] hover:text-[#476550] dark:hover:text-[#2DD4BF]"
                      }`}
                      aria-label="Save to Job Tracker"
                      title={isSaved ? "Saved to Job Tracker" : "Save to Job Tracker"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE ANIMATED JOB SCANNER WORKSPACE */}
        {/* ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto my-8 relative">
          <div className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-3xl border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] shadow-2xl p-5 sm:p-7 md:p-8 text-left relative overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#476550] dark:via-[#2DD4BF] to-transparent opacity-80 animate-scan pointer-events-none shadow-[0_0_15px_#476550] dark:shadow-[0_0_15px_#2DD4BF]"></div>

            {/* Top Interactive Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-[rgba(162,188,168,0.3)] dark:border-[#1F352C]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center shadow-sm flex-shrink-0">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1A1F1F] dark:text-white flex items-center gap-2">
                    <span>Autonomous Multi-Agent Pipeline</span>
                    <span className="text-[10px] bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] px-2.5 py-0.5 rounded-full font-bold">LIVE</span>
                  </h3>
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8]">Streaming live candidate matching & interview simulation</p>
                </div>
              </div>

              {/* Dynamic Step Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-[#F4F4F0] dark:bg-[#13221C] p-1.5 rounded-2xl border border-[rgba(162,188,168,0.3)] dark:border-[#1F352C]">
                {pipelineSteps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeStep === idx 
                        ? "bg-[#476550] dark:bg-[#2DD4BF] text-white dark:text-[#061B18] shadow-md scale-105" 
                        : "text-[#475569] dark:text-[#94A3B8] hover:text-[#1A1F1F] dark:hover:text-white"
                    }`}
                  >
                    {idx + 1}. {s.agent.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Stage Animated Card Showcase */}
            <div className="pt-5">
              {pipelineSteps.map((step, idx) => {
                const isCurrent = activeStep === idx;
                if (!isCurrent) return null;
                const Icon = step.icon;

                return (
                  <div key={idx} className="bg-gradient-to-br from-[#FCFAF5] to-white dark:from-[#13221C] dark:to-[#0D1714] rounded-2xl border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.2)] p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${step.bg} ${step.color}`}>
                          <Icon className="w-6 h-6 animate-bounce" />
                        </div>
                        <div>
                          <span className={`text-[11px] font-black uppercase tracking-wider ${step.color}`}>
                            {step.agent} • {step.badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-extrabold text-[#1A1F1F] dark:text-white mt-0.5">
                            {step.title}
                          </h4>
                        </div>
                      </div>

                      {/* Live Counter / Match Badge */}
                      <div className="bg-[#FAF9F6] dark:bg-[#0D1714] px-4 py-2 rounded-2xl border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] shadow-sm self-start sm:self-auto">
                        <span className="text-xs text-[#475569] dark:text-[#94A3B8] font-medium block text-right">ATS Compatibility</span>
                        <div className="text-xl font-black text-[#476550] dark:text-[#2DD4BF] text-right font-counter">
                          {simulatedMatch}% Match
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed mb-4">
                      {step.sub}
                    </p>

                    {/* Progress Bar Animation */}
                    <div className="w-full bg-slate-200/60 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#476550] via-[#00846D] to-[#2DD4BF] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${simulatedMatch}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3 Pipeline Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#13221C] border border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Scout</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">18 Live Jobs</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#13221C] border border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Filter</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">98% Fit Score</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4F4F0] dark:bg-[#13221C] border border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center gap-3 hover:shadow-sm transition-all">
                <div className="p-2 rounded-xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#476550] dark:text-[#2DD4BF]">Factory</span>
                  <p className="text-xs font-bold text-[#1A1F1F] dark:text-white">Letter Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* HOW IT WORKS SECTION */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 flex flex-col items-center">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-extrabold mb-2 block">Seamless Workflow</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 text-[#1A1F1F] dark:text-white">How ZenScout AI Works</h2>
          <p className="text-[#475569] dark:text-[#CBD5E1] max-w-xl mx-auto text-sm sm:text-base">
            From raw resume to confirmed job interviews in 3 automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl text-left">
          {[
            {
              step: "01",
              title: "Upload & Audit Resume",
              desc: "Upload your master PDF. Our instant scanner audits your ATS compatibility score and identifies keyword gaps.",
              icon: FileText,
              tag: "Instant ATS Check"
            },
            {
              step: "02",
              title: "Agent Scout & Filter",
              desc: "Our autonomous agents crawl live Google Jobs, scoring each opportunity from 0 to 100% against your skills.",
              icon: BrainCircuit,
              tag: "Real-Time Matching"
            },
            {
              step: "03",
              title: "Tailor & Interview Prep",
              desc: "Generate bespoke 3-paragraph cover letters with Agent Factory and practice with the interactive Agent Coach.",
              icon: Bot,
              tag: "Mock Hiring Round"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1F352C] rounded-2xl p-6 sm:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700 group-hover:text-[#476550] dark:group-hover:text-[#2DD4BF] transition-colors font-counter">
                    {item.step}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#476550] dark:text-[#2DD4BF] uppercase tracking-wider block mb-1">{item.tag}</span>
                <h3 className="text-xl font-bold text-[#1A1F1F] dark:text-white mb-3">{item.title}</h3>
                <p className="text-[#475569] dark:text-[#CBD5E1] text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center text-xs font-bold text-[#476550] dark:text-[#2DD4BF] group-hover:translate-x-1 transition-transform">
                <span>Explore Step {item.step} &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4 SPECIALIZED AI AGENTS GRID */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 flex flex-col items-center">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-extrabold mb-2 block">Autonomous Architecture</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 text-[#1A1F1F] dark:text-white">4 Specialized AI Agents</h2>
          <p className="text-[#475569] dark:text-[#CBD5E1] max-w-2xl mx-auto text-sm sm:text-base">
            Each agent handles a specific bottleneck in the traditional job application process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-6xl">
          {[
            { icon: Target, title: "1. Agent Scout", badge: "Discovery", desc: "Monitors live Google Jobs data to uncover high-relevancy job postings matching your title and location." },
            { icon: BrainCircuit, title: "2. Agent Filter", badge: "Analysis", desc: "Compares your PDF resume directly with job descriptions, scoring skill matches from 0 to 100." },
            { icon: Zap, title: "3. Agent Factory", badge: "Synthesis", desc: "Generates tailored, 3-paragraph executive cover letters highlighting your quantifiable impact." },
            { icon: Bot, title: "4. Agent Coach", badge: "Preparation", desc: "Simulates interactive behavioral and technical hiring manager interviews with real-time feedback." }
          ].map((feature, i) => (
            <div key={i} className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1F352C] rounded-2xl p-6 sm:p-8 text-left group shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.12)] text-[#476550] dark:text-[#2DD4BF] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#EAEFED] dark:bg-[#13221C] text-[#475569] dark:text-[#CBD5E1] border border-transparent dark:border-[rgba(45,212,191,0.15)]">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1F1F] dark:text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-[#475569] dark:text-[#CBD5E1] leading-relaxed text-xs sm:text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ZENRESUME CROSS-PROMOTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-12 w-full max-w-5xl mx-auto text-left">
        <div className="bg-gradient-to-r from-[#00846D] via-[#476550] to-[#2DD4BF] dark:from-[#06110D] dark:via-[#0D1714] dark:to-[#06110D] dark:border-2 dark:border-[rgba(45,212,191,0.35)] rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 relative z-10">
            <div className="space-y-2 sm:space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 dark:bg-[rgba(45,212,191,0.15)] text-teal-100 dark:text-[#2DD4BF] text-xs font-bold px-3.5 py-1 rounded-full border border-white/20 dark:border-[rgba(45,212,191,0.3)]">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>ZenResume & Aneevarp Solutions Sister Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Need a High-Scoring ATS Resume?
              </h3>
              <p className="text-teal-100 dark:text-[#CBD5E1] text-xs sm:text-sm md:text-base leading-relaxed">
                Before applying with ZenScout AI, ensure your resume passes all corporate parser filters. Build an ATS-certified single-column resume free on <strong>ZenResume</strong>.
              </p>
            </div>

            <a
              href="https://zenresume.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] font-black text-xs sm:text-sm px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 btn-tactile w-full md:w-auto min-h-[48px]"
            >
              <span>Build on ZenResume Free</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ZERO-BACKEND PRIVACY GUARANTEE & FOUNDER COMMITMENT */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 w-full max-w-5xl mx-auto text-left">
        <div className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[#D8E2DA] dark:border-[#1F352C] rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 sm:gap-10 relative overflow-hidden">
          <div className="flex-1">
            <span className="text-xs uppercase tracking-widest text-[#476550] dark:text-[#2DD4BF] font-bold mb-2 block">Privacy First Guarantee</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 text-[#1A1F1F] dark:text-white">
              100% Data Privacy.<br />Zero Database Storage.
            </h2>
            <p className="text-[#475569] dark:text-[#CBD5E1] text-sm sm:text-base mb-6 leading-relaxed">
              At <strong>Aneevarp Solutions</strong>, we believe your resume and career history belong exclusively to you. When you upload a PDF resume, it is encoded locally in your browser and processed statelessly without ever being stored in a central database.
            </p>
            <ul className="space-y-3">
              {[
                "No cloud database storing your resume, phone number, or contact info.",
                "Your career profile lives exclusively in your local browser vault.",
                "Direct, stateless encrypted streaming with Google Gemini AI.",
                "Instantly and permanently wiped whenever you clear your browser cache."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1A1F1F] dark:text-[#CBD5E1] text-xs sm:text-sm font-medium">
                  <div className="p-1 rounded-full bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High-Trust Founder Card */}
          <div className="w-full md:w-88 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#FCFAF5] to-[#E8F0EB] dark:from-[#13221C] dark:to-[#0D1714] rounded-3xl p-6 border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] shadow-lg text-center space-y-3.5 relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-2 border-[#476550] dark:border-[#2DD4BF] shadow-md relative group">
                <img 
                  src="/founder.jpg" 
                  alt="Jagadeeswara Rao Peddada - Founder of Aneevarp Solutions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-3.5 py-1 rounded-full border border-[#A2BCA8]/40 dark:border-[rgba(45,212,191,0.3)] inline-block">
                  Founder's Privacy Pledge
                </span>
                <h4 className="font-black text-base text-[#1A1F1F] dark:text-white pt-1">
                  Jagadeeswara Rao Peddada
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#CBD5E1] font-medium">
                  Founder & Lead Architect @ Aneevarp Solutions
                </p>
              </div>

              <p className="text-xs text-slate-700 dark:text-[#CBD5E1] italic leading-relaxed pt-1">
                "We engineered ZenScout AI with strict Zero-Backend cryptography. Your career data never touches a database."
              </p>

              <div className="pt-2.5 border-t border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex items-center justify-center gap-3 text-xs">
                <Link href="/about" className="font-bold text-[#476550] dark:text-[#2DD4BF] hover:underline inline-flex items-center gap-1">
                  <span>Read Full Origin Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 w-full max-w-4xl mx-auto text-left">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F6] dark:bg-[#0D1714] border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.2)] shadow-sm px-4 py-1.5 rounded-full text-xs text-[#476550] dark:text-[#2DD4BF] font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1F1F] dark:text-white mb-2 sm:mb-3">Everything You Need to Know</h2>
          <p className="text-[#475569] dark:text-[#CBD5E1] max-w-xl mx-auto text-xs sm:text-sm">
            Answers to common questions about automated job searching, AI ATS matching, and privacy.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-[#FAF9F6] dark:bg-[#0D1714] rounded-2xl border border-[rgba(162,188,168,0.4)] dark:border-[#1F352C] shadow-sm overflow-hidden transition-all hover:border-[rgba(45,212,191,0.3)]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-[#F4F4F0] dark:hover:bg-[#13221C] transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#1A1F1F] dark:text-white text-sm sm:text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#476550] dark:text-[#2DD4BF] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1] leading-relaxed border-t border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 flex flex-col items-center">
        <div className="bg-gradient-to-br from-[#00846D] to-[#476550] dark:from-[#0D1714] dark:to-[#13221C] dark:border-2 dark:border-[rgba(45,212,191,0.3)] p-8 sm:p-12 md:p-16 rounded-3xl max-w-4xl w-full text-center relative overflow-hidden shadow-2xl text-white">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6">Accelerate Your Job Hunt with ZenScout AI</h2>
          <p className="text-teal-100 dark:text-[#CBD5E1] mb-8 sm:mb-10 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
            Stop wasting hours on manual job applications. Let Aneevarp Solutions' autonomous ZenScout agent suite do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/profile" 
              className="bg-[#FCFAF5] dark:bg-[#2DD4BF] hover:bg-white text-[#476550] dark:text-[#061B18] px-8 py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 btn-tactile min-h-[48px]"
            >
              <Target className="w-5 h-5" /> Start Automated Search
            </Link>
            <Link 
              href="/blog" 
              className="bg-white/10 dark:bg-[#06110D] hover:bg-white/20 text-white border border-white/20 dark:border-[rgba(45,212,191,0.3)] px-8 py-4 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 btn-tactile min-h-[48px]"
            >
              Read Career Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1-CLICK COVER LETTER LIVE GENERATOR PREVIEW MODAL */}
      {/* ========================================================================= */}
      {selectedJobForLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF9F6] dark:bg-[#0D1714] border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.3)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(162,188,168,0.3)] dark:border-[#1F352C]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedJobForLetter.avatarBg} flex items-center justify-center font-bold text-sm`}>
                  {selectedJobForLetter.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#E8F0EB] dark:bg-[rgba(45,212,191,0.15)] text-[#476550] dark:text-[#2DD4BF] px-2.5 py-0.5 rounded-full">
                      Agent Factory Output
                    </span>
                    <span className="text-xs text-[#7D8787]">• {selectedJobForLetter.matchScore}% Compatibility</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1A1F1F] dark:text-white mt-0.5">
                    Tailored Cover Letter for {selectedJobForLetter.company}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForLetter(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-[#13221C] text-[#7D8787] hover:text-[#1A1F1F] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Content Body */}
            <div className="py-4 overflow-y-auto flex-1 font-mono text-xs sm:text-sm text-[#1A1F1F] dark:text-[#CBD5E1] whitespace-pre-wrap leading-relaxed bg-[#F4F4F0] dark:bg-[#06110D] p-4 sm:p-5 rounded-2xl border border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] my-2">
              {generatingLetter ? (
                <div className="flex items-center justify-center py-12 gap-3 text-sm text-[#476550] dark:text-[#2DD4BF] font-sans">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Synthesizing tailored cover letter with Gemini 2.5 Flash...</span>
                </div>
              ) : (
                generatedLetter
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-[rgba(162,188,168,0.3)] dark:border-[#1F352C] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#7D8787] dark:text-[#94A3B8]">
                100% Zero-Backend Private • Client-Side Generated
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLetter);
                    setCopiedLetter(true);
                    setTimeout(() => setCopiedLetter(false), 2500);
                  }}
                  disabled={generatingLetter || !generatedLetter}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border border-[rgba(162,188,168,0.4)] dark:border-[rgba(45,212,191,0.25)] bg-[#FAF9F6] dark:bg-[#13221C] text-[#1A1F1F] dark:text-white hover:border-[#476550] transition-all btn-tactile cursor-pointer"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? "Copied to Clipboard!" : "Copy Text"}</span>
                </button>

                <Link
                  href="/dashboard"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-[#476550] hover:bg-[#3A5342] dark:bg-[#2DD4BF] dark:text-[#061B18] text-white text-xs font-bold px-5 py-2.5 rounded-full btn-tactile shadow-sm"
                >
                  <span>Open Full Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

