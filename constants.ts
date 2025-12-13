import { User, Target, BookOpen, AlertTriangle, ListChecks } from 'lucide-react';
import { RocreSectionConfig, RocreOption } from './types';

const EXPERT_ROLES: RocreOption[] = [
  { label: "Senior Software Architect", value: "You are an expert Senior Software Architect with deep knowledge of scalable systems, design patterns, and cloud infrastructure." },
  { label: "Senior Frontend Engineer", value: "You are an expert Senior Frontend Engineer specializing in React, TypeScript, Tailwind CSS, and modern web performance optimization." },
  { label: "Senior Backend Developer", value: "You are an expert Senior Backend Developer proficient in API design, database optimization, microservices, and secure coding practices." },
  { label: "Mobile App Developer", value: "You are an expert Mobile Application Developer specializing in cross-platform frameworks like React Native and Flutter, as well as native Android/iOS development." },
  { label: "Data Scientist", value: "You are an expert Data Scientist skilled in statistical analysis, machine learning, Python (Pandas, NumPy, Scikit-learn), and data visualization." },
  { label: "DevOps Engineer", value: "You are an expert DevOps Engineer specializing in CI/CD pipelines, containerization (Docker, Kubernetes), and infrastructure as code (Terraform)." },
  { label: "Cybersecurity Specialist", value: "You are an expert Cybersecurity Specialist focused on application security, penetration testing, threat modeling, and secure coding standards." },
  { label: "Product Manager", value: "You are an expert Product Manager skilled in agile methodologies, user story mapping, roadmap planning, and stakeholder management." },
  { label: "UI/UX Designer", value: "You are an expert UI/UX Designer with a focus on user-centered design, accessibility (WCAG), prototyping, and design systems." },
  { label: "Digital Marketer", value: "You are an expert Digital Marketing Strategist proficient in SEO, SEM, content marketing, and conversion rate optimization." },
  { label: "Copywriter", value: "You are an expert Copywriter capable of writing persuasive, high-converting copy for landing pages, emails, and advertisements." },
  { label: "SEO Specialist", value: "You are an expert SEO Specialist with deep knowledge of on-page optimization, technical SEO, keyword research, and link-building strategies." },
  { label: "Business Consultant", value: "You are an expert Business Strategy Consultant capable of analyzing market trends, financial models, and operational efficiency." },
  { label: "Financial Analyst", value: "You are an expert Financial Analyst skilled in financial modeling, investment analysis, risk management, and economic forecasting." },
  { label: "Legal Consultant", value: "You are an expert Legal Consultant specializing in corporate law, intellectual property, contract drafting, and compliance." },
  { label: "HR Specialist", value: "You are an expert Human Resources Specialist focused on talent acquisition, employee relations, organizational development, and labor laws." },
  { label: "Academic Researcher", value: "You are an expert Academic Researcher skilled in literature review, experimental design, data analysis, and scientific writing." },
  { label: "Math Tutor", value: "You are an expert Mathematics Educator capable of explaining complex concepts in calculus, algebra, and statistics clearly and simply." },
  { label: "Creative Writer", value: "You are an expert Creative Writer and Storyteller skilled in character development, world-building, narrative structure, and dialogue." },
  { label: "Prompt Engineer", value: "You are an expert AI Prompt Engineer specialized in crafting highly effective prompts for Large Language Models to achieve precise outputs." },
  { label: "Game Designer", value: "You are an expert Game Designer specializing in gameplay mechanics, level design, player psychology, and interactive storytelling." },
];

const OBJECTIVES_DB: Record<string, RocreOption[]> = {
  architect: [
    { label: "Design System Architecture", value: "Design a scalable microservices architecture for a high-traffic e-commerce platform, including database choices and communication patterns." },
    { label: "Refactor Legacy Monolith", value: "Create a strategy to strangle a legacy monolithic application into microservices without downtime." },
    { label: "Evaluate Cloud Providers", value: "Compare AWS, Azure, and GCP for a specific enterprise use case, analyzing costs and services." }
  ],
  frontend: [
    { label: "Create React Component", value: "Write a reusable, accessible, and performant React component for a complex data grid with sorting and filtering." },
    { label: "Debug Performance", value: "Analyze a scenario where a React application is re-rendering excessively and propose a solution using memoization and state management." },
    { label: "Implement Design System", value: "Set up a foundational design system using Tailwind CSS configuration and React Context for theming." }
  ],
  backend: [
    { label: "Design REST API", value: "Design a RESTful API specification (OpenAPI/Swagger) for a user management system with role-based access control." },
    { label: "Optimize SQL Query", value: "Analyze a slow-running complex SQL query and rewrite it for better performance, explaining index usage." },
    { label: "Secure API Endpoint", value: "Implement authentication and rate limiting middleware for a Node.js Express API." }
  ],
  mobile: [
    { label: "Build React Native Screen", value: "Create a responsive profile screen in React Native that handles safe areas, platform-specific styles, and dark mode." },
    { label: "Offline Sync Logic", value: "Design a data synchronization strategy for a mobile app that needs to work offline and sync when online." }
  ],
  data: [
    { label: "Analyze Dataset", value: "Perform exploratory data analysis (EDA) on a provided CSV dataset to identify trends, outliers, and correlations." },
    { label: "Train ML Model", value: "Write Python code to train a Random Forest classifier using Scikit-learn, including data preprocessing and hyperparameter tuning." }
  ],
  devops: [
    { label: "Create CI/CD Pipeline", value: "Write a GitHub Actions workflow to build, test, and deploy a containerized application to AWS ECS." },
    { label: "Dockerize Application", value: "Write a multi-stage Dockerfile for a Node.js application to minimize image size and ensure security." }
  ],
  security: [
    { label: "Conduct Security Audit", value: "Review a provided snippet of code for common security vulnerabilities (OWASP Top 10) and suggest fixes." },
    { label: "Threat Modeling", value: "Perform a threat modeling exercise for a new fintech payment gateway integration." }
  ],
  product: [
    { label: "Write User Stories", value: "Draft comprehensive user stories with acceptance criteria for a new 'Forgot Password' feature." },
    { label: "Create Product Roadmap", value: "Outline a 6-month product roadmap for launching a mobile MVP, prioritizing high-impact features." }
  ],
  design: [
    { label: "Critique UI Design", value: "Evaluate a provided screenshot of a user interface based on usability heuristics and accessibility standards." },
    { label: "Create Accessibility Checklist", value: "Generate a checklist for developers to ensure a web form meets WCAG 2.1 AA standards." }
  ],
  marketing: [
    { label: "Plan Content Calendar", value: "Create a one-month content calendar for LinkedIn targeting B2B SaaS decision-makers." },
    { label: "Analyze Ad Performance", value: "Analyze a set of hypothetical ad metrics (CTR, CPC, ROAS) and recommend budget reallocation." }
  ],
  writer: [
    { label: "Write Landing Page Copy", value: "Write persuasive copy for a landing page selling a productivity course, focusing on pain points and benefits." },
    { label: "Draft Email Sequence", value: "Write a 3-part automated email welcome sequence for new newsletter subscribers." }
  ],
  seo: [
    { label: "Keyword Research", value: "Generate a list of long-tail keywords for a niche website about 'indoor organic gardening'." },
    { label: "Technical SEO Audit", value: "Create a checklist for a technical SEO audit of a large e-commerce website." }
  ],
  business: [
    { label: "SWOT Analysis", value: "Perform a SWOT analysis for a traditional retail business looking to expand into e-commerce." },
    { label: "Business Model Canvas", value: "Draft a Business Model Canvas for a subscription-based meal kit delivery startup." }
  ],
  finance: [
    { label: "Forecast Revenue", value: "Create a structure for a financial model to forecast revenue growth based on churn rate and acquisition cost." },
    { label: "Risk Assessment", value: "Identify potential financial risks for investing in emerging markets and suggest mitigation strategies." }
  ],
  legal: [
    { label: "Draft Contract Clauses", value: "Draft a non-disclosure agreement (NDA) clause specifically protecting software source code." },
    { label: "GDPR Compliance Check", value: "Outline the key steps a US-based company needs to take to become GDPR compliant." }
  ],
  hr: [
    { label: "Write Job Description", value: "Write an inclusive and attractive job description for a Senior Product Designer role." },
    { label: "Plan Onboarding Process", value: "Design a 30-60-90 day onboarding plan for a new remote Engineering Manager." }
  ],
  academic: [
    { label: "Summarize Research Paper", value: "Summarize the key findings, methodology, and limitations of a hypothetical research paper on climate change." },
    { label: "Design Experiment", value: "Propose an experimental design to test the hypothesis that blue light glasses improve sleep quality." }
  ],
  tutor: [
    { label: "Explain Concept", value: "Explain the concept of 'Eigenvalues and Eigenvectors' to a high school student using intuitive analogies." },
    { label: "Create Practice Problems", value: "Generate 5 calculus practice problems involving derivatives, increasing in difficulty." }
  ],
  creative: [
    { label: "Develop Character Profile", value: "Create a detailed character profile for a protagonist in a cyberpunk noir novel, including flaws and motivations." },
    { label: "Write Story Opening", value: "Write the opening paragraph of a mystery novel that immediately establishes a tense atmosphere." }
  ],
  prompt: [
    { label: "Optimize Prompt", value: "Analyze a vague prompt and rewrite it using the Chain-of-Thought technique for better reasoning." },
    { label: "Generate Few-Shot Examples", value: "Create 3 high-quality few-shot examples to teach an LLM how to convert natural language to SQL." }
  ],
  game: [
    { label: "Design Game Mechanic", value: "Design a core gameplay mechanic for a rogue-like card game that encourages risk-taking." },
    { label: "Write Lore", value: "Write the backstory for a fallen kingdom in a dark fantasy RPG setting." }
  ]
};

const GENERIC_OBJECTIVES: RocreOption[] = [
  { label: "Explain Concept", value: "Explain the following concept clearly and concisely for a beginner audience." },
  { label: "Summarize Text", value: "Summarize the provided text into 5 key bullet points, capturing the main arguments." },
  { label: "Generate Ideas", value: "Brainstorm 10 creative and unique ideas for..." },
  { label: "Step-by-Step Guide", value: "Create a detailed step-by-step guide on how to achieve..." },
  { label: "Compare and Contrast", value: "Compare and contrast Option A and Option B, highlighting pros and cons." }
];

export const getObjectivesForRole = (roleText: string): RocreOption[] => {
  if (!roleText) return GENERIC_OBJECTIVES;
  
  const lowerRole = roleText.toLowerCase();

  if (lowerRole.includes('architect')) return OBJECTIVES_DB.architect;
  if (lowerRole.includes('frontend') || lowerRole.includes('react') || lowerRole.includes('css')) return OBJECTIVES_DB.frontend;
  if (lowerRole.includes('backend') || lowerRole.includes('api') || lowerRole.includes('database')) return OBJECTIVES_DB.backend;
  if (lowerRole.includes('mobile') || lowerRole.includes('android') || lowerRole.includes('ios') || lowerRole.includes('flutter')) return OBJECTIVES_DB.mobile;
  if (lowerRole.includes('data') || lowerRole.includes('scientist') || lowerRole.includes('machine learning')) return OBJECTIVES_DB.data;
  if (lowerRole.includes('devops') || lowerRole.includes('cloud') || lowerRole.includes('docker')) return OBJECTIVES_DB.devops;
  if (lowerRole.includes('security') || lowerRole.includes('cyber') || lowerRole.includes('penetration')) return OBJECTIVES_DB.security;
  if (lowerRole.includes('product') || lowerRole.includes('manager')) return OBJECTIVES_DB.product;
  if (lowerRole.includes('ux') || lowerRole.includes('ui') || lowerRole.includes('designer')) return OBJECTIVES_DB.design;
  if (lowerRole.includes('marketing') || lowerRole.includes('marketer')) return OBJECTIVES_DB.marketing;
  if (lowerRole.includes('copywriter') || lowerRole.includes('copy')) return OBJECTIVES_DB.writer;
  if (lowerRole.includes('seo')) return OBJECTIVES_DB.seo;
  if (lowerRole.includes('business') || lowerRole.includes('consultant')) return OBJECTIVES_DB.business;
  if (lowerRole.includes('financial') || lowerRole.includes('finance')) return OBJECTIVES_DB.finance;
  if (lowerRole.includes('legal') || lowerRole.includes('law')) return OBJECTIVES_DB.legal;
  if (lowerRole.includes('hr') || lowerRole.includes('human resources')) return OBJECTIVES_DB.hr;
  if (lowerRole.includes('researcher') || lowerRole.includes('academic')) return OBJECTIVES_DB.academic;
  if (lowerRole.includes('tutor') || lowerRole.includes('teacher') || lowerRole.includes('educator') || lowerRole.includes('math')) return OBJECTIVES_DB.tutor;
  if (lowerRole.includes('creative') || lowerRole.includes('story') || lowerRole.includes('writer')) return OBJECTIVES_DB.creative;
  if (lowerRole.includes('prompt')) return OBJECTIVES_DB.prompt;
  if (lowerRole.includes('game')) return OBJECTIVES_DB.game;

  return GENERIC_OBJECTIVES;
};


export const ROCRE_SECTIONS: RocreSectionConfig[] = [
  {
    key: 'role',
    label: 'Role',
    shortLabel: 'R',
    description: 'Define the persona the AI should adopt (e.g., "Senior Software Engineer").',
    placeholder: 'You are an expert Senior Software Engineer specializing in...',
    color: 'text-blue-600',
    icon: User,
    required: true,
    options: EXPERT_ROLES,
  },
  {
    key: 'objective',
    label: 'Objective',
    shortLabel: 'O',
    description: 'Clearly state what you want the AI to achieve.',
    placeholder: 'Your objective is to create a secure login system using...',
    color: 'text-green-600',
    icon: Target,
    required: true,
  },
  {
    key: 'context',
    label: 'Context',
    shortLabel: 'C',
    description: 'Provide background information, audience details, or relevant data.',
    placeholder: 'The system will be used by enterprise clients who value security over speed...',
    color: 'text-purple-600',
    icon: BookOpen,
  },
  {
    key: 'restrictions',
    label: 'Restrictions',
    shortLabel: 'R',
    description: 'List constraints, things to avoid, or strict formatting rules.',
    placeholder: 'Do not use external libraries. Ensure code is commented. Keep response under 500 words.',
    color: 'text-red-600',
    icon: AlertTriangle,
  },
  {
    key: 'examples',
    label: 'Examples / Evaluation',
    shortLabel: 'E',
    description: 'Provide examples of desired output or criteria for success.',
    placeholder: 'Output format: JSON. Example: { "status": "success", "code": 200 }',
    color: 'text-orange-600',
    icon: ListChecks,
  },
];

export const INITIAL_DATA = {
  role: '',
  objective: '',
  context: '',
  restrictions: '',
  examples: '',
};