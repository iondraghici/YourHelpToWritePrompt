import { User, Target, BookOpen, AlertTriangle, ListChecks } from 'lucide-react';
import { RocreSectionConfig, RocreOption } from './types';

const EXPERT_ROLES: RocreOption[] = [
  // --- AI & Generative Art ---
  { label: 'Midjourney Expert', value: 'You are an expert AI Artist specializing in Midjourney v6, known for creating photorealistic and stylized imagery using complex parameter tuning (--s, --c, --w).' },
  { label: 'DALL-E 3 Prompter', value: 'You are an expert DALL-E 3 Prompter skilled in natural language description to generate precise, high-fidelity images with correct text rendering.' },
  { label: 'Stable Diffusion Architect', value: 'You are an expert Stable Diffusion workflow specialist, familiar with ControlNet, LoRAs, and ComfyUI for granular image control.' },
  { label: 'Vector Art Generator', value: 'You are an expert in generating scalable vector illustrations and SVG assets suitable for web design and print.' },

  // --- Engineering & Technology ---
  { label: 'Senior Software Architect', value: 'You are an expert Senior Software Architect with deep knowledge of scalable systems, design patterns, and cloud infrastructure.' },
  { label: 'Senior Frontend Engineer', value: 'You are an expert Senior Frontend Engineer specializing in React, TypeScript, Tailwind CSS, and modern web performance optimization.' },
  { label: 'Senior Backend Developer', value: 'You are an expert Senior Backend Developer proficient in API design, database optimization, microservices, and secure coding practices.' },
  { label: 'Full Stack Developer', value: 'You are an expert Full Stack Developer comfortable with both frontend frameworks and backend logic, capable of building end-to-end features.' },
  { label: 'Mobile App Developer', value: 'You are an expert Mobile Application Developer specializing in cross-platform frameworks like React Native and Flutter, as well as native Android/iOS development.' },
  { label: 'DevOps Engineer', value: 'You are an expert DevOps Engineer specializing in CI/CD pipelines, containerization (Docker, Kubernetes), and infrastructure as code (Terraform).' },
  { label: 'Site Reliability Engineer (SRE)', value: 'You are an expert SRE focused on system availability, latency, performance, efficiency, change management, monitoring, and emergency response.' },
  { label: 'QA Automation Engineer', value: 'You are an expert QA Engineer specialized in writing automated tests, creating testing frameworks, and ensuring software quality.' },
  { label: 'Blockchain Developer', value: 'You are an expert Blockchain Developer skilled in smart contracts, decentralized applications (dApps), and cryptography.' },
  { label: 'Embedded Systems Engineer', value: 'You are an expert Embedded Systems Engineer proficient in C/C++, microcontrollers, and real-time operating systems.' },
  { label: 'Cybersecurity Specialist', value: 'You are an expert Cybersecurity Specialist focused on application security, penetration testing, threat modeling, and secure coding standards.' },

  // --- Data & AI ---
  { label: 'Data Scientist', value: 'You are an expert Data Scientist skilled in statistical analysis, machine learning, Python (Pandas, NumPy, Scikit-learn), and data visualization.' },
  { label: 'Data Engineer', value: 'You are an expert Data Engineer capable of building robust data pipelines, ETL processes, and managing data warehouses.' },
  { label: 'Machine Learning Engineer', value: 'You are an expert ML Engineer focused on deploying models to production, optimization, and MLOps.' },
  { label: 'Prompt Engineer', value: 'You are an expert AI Prompt Engineer specialized in crafting highly effective prompts for Large Language Models to achieve precise outputs.' },
  { label: 'Business Intelligence Analyst', value: 'You are an expert BI Analyst skilled in SQL, Tableau/PowerBI, and translating data into actionable business insights.' },

  // --- Product & Design ---
  { label: 'Product Manager', value: 'You are an expert Product Manager skilled in agile methodologies, user story mapping, roadmap planning, and stakeholder management.' },
  { label: 'Project Manager', value: 'You are an expert Project Manager holding PMP certification, skilled in risk management, resource allocation, and timeline tracking.' },
  { label: 'UI/UX Designer', value: 'You are an expert UI/UX Designer with a focus on user-centered design, accessibility (WCAG), prototyping, and design systems.' },
  { label: 'Graphic Designer', value: 'You are an expert Graphic Designer skilled in branding, typography, color theory, and visual communication.' },
  { label: 'User Researcher', value: 'You are an expert User Researcher skilled in conducting interviews, usability testing, and analyzing qualitative data.' },
  { label: 'Game Designer', value: 'You are an expert Game Designer specializing in gameplay mechanics, level design, player psychology, and interactive storytelling.' },

  // --- Marketing & Content ---
  { label: 'Digital Marketer', value: 'You are an expert Digital Marketing Strategist proficient in SEO, SEM, content marketing, and conversion rate optimization.' },
  { label: 'SEO Specialist', value: 'You are an expert SEO Specialist with deep knowledge of on-page optimization, technical SEO, keyword research, and link-building strategies.' },
  { label: 'Social Media Manager', value: 'You are an expert Social Media Manager skilled in community building, viral trends, and platform-specific analytics.' },
  { label: 'Copywriter', value: 'You are an expert Copywriter capable of writing persuasive, high-converting copy for landing pages, emails, and advertisements.' },
  { label: 'Content Strategist', value: 'You are an expert Content Strategist skilled in planning, developing, and managing content to achieve business goals.' },
  { label: 'Technical Writer', value: 'You are an expert Technical Writer capable of explaining complex technical concepts in clear, concise documentation.' },
  { label: 'Creative Writer', value: 'You are an expert Creative Writer and Storyteller skilled in character development, world-building, narrative structure, and dialogue.' },
  { label: 'Ghostwriter', value: 'You are an expert Ghostwriter able to capture the unique voice and tone of different authors for books and articles.' },

  // --- Business & Finance ---
  { label: 'Business Consultant', value: 'You are an expert Business Strategy Consultant capable of analyzing market trends, financial models, and operational efficiency.' },
  { label: 'Financial Analyst', value: 'You are an expert Financial Analyst skilled in financial modeling, investment analysis, risk management, and economic forecasting.' },
  { label: 'Entrepreneur / Founder', value: 'You are an expert Entrepreneur with deep insight into startups, fundraising, lean methodology, and business scaling.' },
  { label: 'Accountant', value: 'You are an expert Accountant proficient in tax law, financial assertions, auditing, and bookkeeping.' },
  { label: 'Sales Representative', value: 'You are an expert Sales Professional skilled in negotiation, pipeline management, consultative selling, and closing deals.' },

  // --- Legal & HR ---
  { label: 'Legal Consultant', value: 'You are an expert Legal Consultant specializing in corporate law, intellectual property, contract drafting, and compliance.' },
  { label: 'HR Specialist', value: 'You are an expert Human Resources Specialist focused on talent acquisition, employee relations, organizational development, and labor laws.' },
  { label: 'Recruiter', value: 'You are an expert Technical Recruiter skilled in sourcing, screening, and interviewing top talent.' },
  { label: 'Diversity & Inclusion Officer', value: 'You are an expert D&I Officer focused on creating equitable and inclusive workplace environments.' },

  // --- Education & Coaching ---
  { label: 'Academic Researcher', value: 'You are an expert Academic Researcher skilled in literature review, experimental design, data analysis, and scientific writing.' },
  { label: 'Math Tutor', value: 'You are an expert Mathematics Educator capable of explaining complex concepts in calculus, algebra, and statistics clearly and simply.' },
  { label: 'Language Teacher', value: 'You are an expert Language Teacher skilled in linguistics, grammar, vocabulary acquisition, and conversational fluency.' },
  { label: 'History Professor', value: 'You are an expert Historian specializing in analyzing historical events, causes, and societal impacts.' },
  { label: 'Life Coach', value: 'You are an expert Life Coach skilled in motivational interviewing, goal setting, and personal development strategies.' },
  { label: 'Career Counselor', value: 'You are an expert Career Counselor helpful in resume building, interview preparation, and career path planning.' },

  // --- Health & Wellness ---
  { label: 'Personal Trainer', value: 'You are an expert Personal Trainer knowledgeable in exercise physiology, nutrition planning, and strength conditioning.' },
  { label: 'Nutritionist', value: 'You are an expert Nutritionist capable of creating personalized meal plans based on dietary needs and health goals.' },
  { label: 'Mental Health Counselor', value: 'You are an expert Counselor providing empathetic, non-judgmental support and coping strategies (simulated role).' },

  // --- Miscellaneous ---
  { label: 'Travel Agent', value: 'You are an expert Travel Consultant skilled in itinerary planning, logistics, and finding the best local experiences.' },
  { label: 'Event Planner', value: 'You are an expert Event Planner skilled in logistics, vendor management, and creating memorable experiences.' },
  { label: 'Interior Designer', value: 'You are an expert Interior Designer skilled in spatial planning, color palettes, and creating functional, aesthetic environments.' },
  { label: 'Chef', value: 'You are an expert Chef with deep knowledge of culinary techniques, flavor profiles, and menu design.' },
];

const OBJECTIVES_DB: Record<string, RocreOption[]> = {
  architect: [
    {
      label: 'Design System Architecture',
      value:
        'Design a scalable microservices architecture for a high-traffic e-commerce platform, including database choices and communication patterns.',
    },
    {
      label: 'Refactor Legacy Monolith',
      value:
        'Create a strategy to strangle a legacy monolithic application into microservices without downtime.',
    },
    {
      label: 'Evaluate Cloud Providers',
      value:
        'Compare AWS, Azure, and GCP for a specific enterprise use case, analyzing costs and services.',
    },
  ],
  frontend: [
    {
      label: 'Create React Component',
      value:
        'Write a reusable, accessible, and performant React component for a complex data grid with sorting and filtering.',
    },
    {
      label: 'Debug Performance',
      value:
        'Analyze a scenario where a React application is re-rendering excessively and propose a solution using memoization and state management.',
    },
    {
      label: 'Implement Design System',
      value:
        'Set up a foundational design system using Tailwind CSS configuration and React Context for theming.',
    },
  ],
  backend: [
    {
      label: 'Design REST API',
      value:
        'Design a RESTful API specification (OpenAPI/Swagger) for a user management system with role-based access control.',
    },
    {
      label: 'Optimize SQL Query',
      value:
        'Analyze a slow-running complex SQL query and rewrite it for better performance, explaining index usage.',
    },
    {
      label: 'Secure API Endpoint',
      value: 'Implement authentication and rate limiting middleware for a Node.js Express API.',
    },
  ],
  mobile: [
    {
      label: 'Build React Native Screen',
      value:
        'Create a responsive profile screen in React Native that handles safe areas, platform-specific styles, and dark mode.',
    },
    {
      label: 'Offline Sync Logic',
      value:
        'Design a data synchronization strategy for a mobile app that needs to work offline and sync when online.',
    },
  ],
  data: [
    {
      label: 'Analyze Dataset',
      value:
        'Perform exploratory data analysis (EDA) on a provided CSV dataset to identify trends, outliers, and correlations.',
    },
    {
      label: 'Train ML Model',
      value:
        'Write Python code to train a Random Forest classifier using Scikit-learn, including data preprocessing and hyperparameter tuning.',
    },
  ],
  devops: [
    {
      label: 'Create CI/CD Pipeline',
      value:
        'Write a GitHub Actions workflow to build, test, and deploy a containerized application to AWS ECS.',
    },
    {
      label: 'Dockerize Application',
      value:
        'Write a multi-stage Dockerfile for a Node.js application to minimize image size and ensure security.',
    },
  ],
  security: [
    {
      label: 'Conduct Security Audit',
      value:
        'Review a provided snippet of code for common security vulnerabilities (OWASP Top 10) and suggest fixes.',
    },
    {
      label: 'Threat Modeling',
      value: 'Perform a threat modeling exercise for a new fintech payment gateway integration.',
    },
  ],
  product: [
    {
      label: 'Write User Stories',
      value:
        "Draft comprehensive user stories with acceptance criteria for a new 'Forgot Password' feature.",
    },
    {
      label: 'Create Product Roadmap',
      value:
        'Outline a 6-month product roadmap for launching a mobile MVP, prioritizing high-impact features.',
    },
  ],
  design: [
    {
      label: 'Critique UI Design',
      value:
        'Evaluate a provided screenshot of a user interface based on usability heuristics and accessibility standards.',
    },
    {
      label: 'Create Accessibility Checklist',
      value:
        'Generate a checklist for developers to ensure a web form meets WCAG 2.1 AA standards.',
    },
  ],
  marketing: [
    {
      label: 'Plan Content Calendar',
      value: 'Create a one-month content calendar for LinkedIn targeting B2B SaaS decision-makers.',
    },
    {
      label: 'Analyze Ad Performance',
      value:
        'Analyze a set of hypothetical ad metrics (CTR, CPC, ROAS) and recommend budget reallocation.',
    },
  ],
  writer: [
    {
      label: 'Write Landing Page Copy',
      value:
        'Write persuasive copy for a landing page selling a productivity course, focusing on pain points and benefits.',
    },
    {
      label: 'Draft Email Sequence',
      value: 'Write a 3-part automated email welcome sequence for new newsletter subscribers.',
    },
  ],
  seo: [
    {
      label: 'Keyword Research',
      value:
        "Generate a list of long-tail keywords for a niche website about 'indoor organic gardening'.",
    },
    {
      label: 'Technical SEO Audit',
      value: 'Create a checklist for a technical SEO audit of a large e-commerce website.',
    },
  ],
  business: [
    {
      label: 'SWOT Analysis',
      value:
        'Perform a SWOT analysis for a traditional retail business looking to expand into e-commerce.',
    },
    {
      label: 'Business Model Canvas',
      value: 'Draft a Business Model Canvas for a subscription-based meal kit delivery startup.',
    },
  ],
  finance: [
    {
      label: 'Forecast Revenue',
      value:
        'Create a structure for a financial model to forecast revenue growth based on churn rate and acquisition cost.',
    },
    {
      label: 'Risk Assessment',
      value:
        'Identify potential financial risks for investing in emerging markets and suggest mitigation strategies.',
    },
  ],
  legal: [
    {
      label: 'Draft Contract Clauses',
      value:
        'Draft a non-disclosure agreement (NDA) clause specifically protecting software source code.',
    },
    {
      label: 'GDPR Compliance Check',
      value: 'Outline the key steps a US-based company needs to take to become GDPR compliant.',
    },
  ],
  hr: [
    {
      label: 'Write Job Description',
      value:
        'Write an inclusive and attractive job description for a Senior Product Designer role.',
    },
    {
      label: 'Plan Onboarding Process',
      value: 'Design a 30-60-90 day onboarding plan for a new remote Engineering Manager.',
    },
  ],
  academic: [
    {
      label: 'Summarize Research Paper',
      value:
        'Summarize the key findings, methodology, and limitations of a hypothetical research paper on climate change.',
    },
    {
      label: 'Design Experiment',
      value:
        'Propose an experimental design to test the hypothesis that blue light glasses improve sleep quality.',
    },
  ],
  tutor: [
    {
      label: 'Explain Concept',
      value:
        "Explain the concept of 'Eigenvalues and Eigenvectors' to a high school student using intuitive analogies.",
    },
    {
      label: 'Create Practice Problems',
      value:
        'Generate 5 calculus practice problems involving derivatives, increasing in difficulty.',
    },
  ],
  creative: [
    {
      label: 'Develop Character Profile',
      value:
        'Create a detailed character profile for a protagonist in a cyberpunk noir novel, including flaws and motivations.',
    },
    {
      label: 'Write Story Opening',
      value:
        'Write the opening paragraph of a mystery novel that immediately establishes a tense atmosphere.',
    },
  ],
  image_gen: [
    {
      label: 'Logo Design',
      value: 'Create a versatile, vector-style logo for a modern tech startup.',
    },
    {
      label: 'Game Asset',
      value: 'Design a set of isometric building assets for a mobile strategy game.',
    },
    {
      label: 'Surreal Art',
      value: 'Generate a highly detailed, dreamlike landscape in the style of Salvador Dali.',
    },
    {
      label: 'Photorealistic Portrait',
      value: 'Create a cinematic, photorealistic portrait of an astronaut on Mars.',
    },
    {
      label: 'Marketing Poster',
      value: 'Design a bold, minimalist event poster for a music festival.',
    },
  ],
  prompt: [
    {
      label: 'Optimize Prompt',
      value:
        'Analyze a vague prompt and rewrite it using the Chain-of-Thought technique for better reasoning.',
    },
    {
      label: 'Generate Few-Shot Examples',
      value:
        'Create 3 high-quality few-shot examples to teach an LLM how to convert natural language to SQL.',
    },
  ],
  game: [
    {
      label: 'Write Lore',
      value: 'Write the backstory for a fallen kingdom in a dark fantasy RPG setting.',
    },
  ],
};

export const TASK_TYPES = [
  { label: 'Write Code', value: 'coding', roleKeywords: ['software', 'architect', 'engineer', 'developer', 'stack', 'blockchain', 'embedded', 'sre', 'devops', 'qa'] },
  { label: 'Generate Images', value: 'image', roleKeywords: ['midjourney', 'dall-e', 'stable diffusion', 'vector', 'designer', 'artist', 'photographer'] },
  { label: 'Write Content', value: 'writing', roleKeywords: ['writer', 'copywriter', 'editor', 'content', 'ghostwriter', 'creative', 'story'] },
  { label: 'Data & Analysis', value: 'data', roleKeywords: ['data', 'scientist', 'analyst', 'bi', 'machine learning'] },
  { label: 'Marketing & SEO', value: 'marketing', roleKeywords: ['marketing', 'seo', 'social', 'brand'] },
  { label: 'Business & Legal', value: 'business', roleKeywords: ['business', 'consultant', 'financial', 'legal', 'law', 'hr', 'recruiter', 'sales'] },
  { label: 'Education', value: 'education', roleKeywords: ['teacher', 'tutor', 'professor', 'academic', 'coach'] },
];

const GENERIC_OBJECTIVES: RocreOption[] = [
  {
    label: 'Explain Concept',
    value: 'Explain the following concept clearly and concisely for a beginner audience.',
  },
  {
    label: 'Summarize Text',
    value: 'Summarize the provided text into 5 key bullet points, capturing the main arguments.',
  },
  { label: 'Generate Ideas', value: 'Brainstorm 10 creative and unique ideas for...' },
  {
    label: 'Step-by-Step Guide',
    value: 'Create a detailed step-by-step guide on how to achieve...',
  },
  {
    label: 'Compare and Contrast',
    value: 'Compare and contrast Option A and Option B, highlighting pros and cons.',
  },
];

export const getObjectivesForRole = (roleText: string): RocreOption[] => {
  if (!roleText) return GENERIC_OBJECTIVES;

  const lowerRole = roleText.toLowerCase();

  // Priority Check for Image/Creative Roles to avoid getting trapped in 'frontend' (designer)
  if (lowerRole.includes('midjourney') || lowerRole.includes('dall-e') || lowerRole.includes('diffusion') || lowerRole.includes('graphic') || lowerRole.includes('artist') || lowerRole.includes('photographer'))
    return OBJECTIVES_DB.image_gen;

  if (lowerRole.includes('architect') || lowerRole.includes('sre') || lowerRole.includes('reliability')) return OBJECTIVES_DB.architect;
  if (lowerRole.includes('frontend') || lowerRole.includes('react') || lowerRole.includes('css') || lowerRole.includes('ui/ux'))
    return OBJECTIVES_DB.frontend;
  if (lowerRole.includes('backend') || lowerRole.includes('api') || lowerRole.includes('database') || lowerRole.includes('full stack') || lowerRole.includes('blockchain') || lowerRole.includes('embedded'))
    return OBJECTIVES_DB.backend;
  if (
    lowerRole.includes('mobile') ||
    lowerRole.includes('android') ||
    lowerRole.includes('ios') ||
    lowerRole.includes('flutter')
  )
    return OBJECTIVES_DB.mobile;
  if (
    lowerRole.includes('data') ||
    lowerRole.includes('scientist') ||
    lowerRole.includes('machine learning') ||
    lowerRole.includes('bi') ||
    lowerRole.includes('analyst')
  )
    return OBJECTIVES_DB.data;
  if (lowerRole.includes('devops') || lowerRole.includes('cloud') || lowerRole.includes('docker') || lowerRole.includes('qa') || lowerRole.includes('automation'))
    return OBJECTIVES_DB.devops;
  if (
    lowerRole.includes('security') ||
    lowerRole.includes('cyber') ||
    lowerRole.includes('penetration')
  )
    return OBJECTIVES_DB.security;
  if (lowerRole.includes('product') || lowerRole.includes('manager') || lowerRole.includes('project')) return OBJECTIVES_DB.product;
  if (lowerRole.includes('marketing') || lowerRole.includes('marketer') || lowerRole.includes('social media') || lowerRole.includes('brand') || lowerRole.includes('content'))
    return OBJECTIVES_DB.marketing;
  if (lowerRole.includes('copywriter') || lowerRole.includes('copy') || lowerRole.includes('story') || lowerRole.includes('ghostwriter') || lowerRole.includes('technical')) return OBJECTIVES_DB.writer;
  if (lowerRole.includes('seo') || lowerRole.includes('search')) return OBJECTIVES_DB.seo;
  if (lowerRole.includes('business') || lowerRole.includes('consultant') || lowerRole.includes('entrepreneur') || lowerRole.includes('founder') || lowerRole.includes('accountant') || lowerRole.includes('sales'))
    return OBJECTIVES_DB.business;
  // Fallback for legal/finance/business overlap
  if (lowerRole.includes('financial') || lowerRole.includes('finance'))
    return OBJECTIVES_DB.finance;
  if (lowerRole.includes('legal') || lowerRole.includes('law')) return OBJECTIVES_DB.legal;
  if (lowerRole.includes('hr') || lowerRole.includes('human resources') || lowerRole.includes('recruiter') || lowerRole.includes('diversity')) return OBJECTIVES_DB.hr;
  if (lowerRole.includes('researcher') || lowerRole.includes('academic') || lowerRole.includes('teacher') || lowerRole.includes('professor') || lowerRole.includes('education'))
    return OBJECTIVES_DB.academic;
  if (
    lowerRole.includes('tutor') ||
    lowerRole.includes('math')
  )
    return OBJECTIVES_DB.tutor;
  if (lowerRole.includes('creative') || lowerRole.includes('writer')) // Handle generic Creative Writer
    return OBJECTIVES_DB.creative;
  if (lowerRole.includes('prompt')) return OBJECTIVES_DB.prompt;
  if (lowerRole.includes('game')) return OBJECTIVES_DB.game;

  // Generic Designer fallback if not caught by image_gen
  if (lowerRole.includes('designer')) return OBJECTIVES_DB.design;

  return GENERIC_OBJECTIVES;
};

const CONTEXT_DB: Record<string, RocreOption[]> = {
  architect: [
    {
      label: 'Enterprise Migration',
      value:
        'Migrating a legacy on-premise monolith to a cloud-native microservices architecture on AWS.',
    },
    {
      label: 'High-Scale Start-up',
      value:
        'Designing the MVP for a social media platform expecting 100k+ concurrent users on launch day.',
    },
    {
      label: 'Fintech Security',
      value:
        'Building a banking core system where data consistency and security are paramount over speed.',
    },
    {
      label: 'IoT Platform',
      value:
        'Architecting a system to ingest and process data from 1 million IoT sensors in real-time.',
    },
    {
      label: 'E-commerce Black Friday',
      value:
        'Preparing an existing e-commerce platform to handle 50x normal traffic load during sales events.',
    },
  ],
  frontend: [
    {
      label: 'Dashboard for Analysts',
      value:
        'Building a complex data analytics dashboard for financial analysts who need dense information.',
    },
    {
      label: 'Mobile-First E-commerce',
      value: 'Developing a shopping experience optimized for mobile users on 3G networks.',
    },
    {
      label: 'Accessibility Upgrade',
      value:
        'Refactoring an existing application to meet WCAG 2.1 AAA standards for government use.',
    },
    {
      label: 'Design System Migration',
      value:
        'Migrating a large codebase from CSS Modules to Tailwind CSS while maintaining visual consistency.',
    },
    {
      label: 'Public Facing Marketing',
      value:
        'Creating a visually stunning landing page with complex animations for a new product launch.',
    },
  ],
  backend: [
    {
      label: 'Payment Processing',
      value:
        'Implementing a transaction ledger that must be ACID compliant and handle double-entry accounting.',
    },
    {
      label: 'Real-time Chat',
      value: 'Building the backend for a real-time collaboration tool using WebSockets and Redis.',
    },
    {
      label: 'Video Streaming',
      value:
        'Designing the content delivery pipeline for a video streaming service serving global users.',
    },
    {
      label: 'Legacy Integration',
      value: 'Creating a modern API layer over mainframes and SOAP services for a bank.',
    },
    {
      label: 'Data Pipeline',
      value: 'Building an ETL pipeline to process terabytes of log data daily for analytics.',
    },
  ],
  mobile: [
    {
      label: 'Offline-First Field App',
      value: 'Building an app for field workers who often have no internet connectivity for days.',
    },
    {
      label: 'Social Media App',
      value:
        'Creating a consumer-facing app focused on smooth scrolling and media consumption like Instagram.',
    },
    {
      label: 'Health Device Sync',
      value:
        'Developing a companion app for a Bluetooth LE medical device requiring real-time sync.',
    },
    {
      label: 'Super App',
      value:
        'Building a multi-functional "Super App" integrating ride-sharing, food delivery, and payments.',
    },
  ],
  data: [
    {
      label: 'Customer Churn',
      value:
        'Analyzing subscription data to predict which users are likely to cancel in the next month.',
    },
    {
      label: 'Fraud Detection',
      value: 'Building a real-time model to detect fraudulent credit card transactions.',
    },
    {
      label: 'Recommendation Engine',
      value: 'Designing a product recommendation system for a personalized shopping experience.',
    },
    {
      label: 'Computer Vision',
      value: 'Training a model to detect defects in manufacturing parts from camera feeds.',
    },
  ],
  devops: [
    {
      label: 'Multi-Cloud Deployment',
      value: 'Managing a system that must run simultaneously on AWS and Azure for redundancy.',
    },
    {
      label: 'Zero-Downtime Migration',
      value: 'Moving a live database of 50TB to a new region without any service interruption.',
    },
    {
      label: 'Developer Experience',
      value: 'Optimizing a slow CI/CD pipeline to reduce build times from 45 minutes to 5 minutes.',
    },
    {
      label: 'Cost Optimization',
      value:
        ' Analyzing cloud spend to reduce infrastructure costs by 30% without impacting performance.',
    },
  ],
  security: [
    {
      label: 'PCI-DSS Compliance',
      value: 'Securing a payment gateway to meet strict PCI-DSS Level 1 compliance requirements.',
    },
    {
      label: 'Zero Trust Network',
      value: 'Implementing a Zero Trust security model for a remote-first organization.',
    },
    {
      label: 'Incident Response',
      value: 'Handling a live ransomware attack scenario on corporate servers.',
    },
  ],
  product: [
    {
      label: 'B2B Pivot',
      value: 'Pivoting a B2C product to serve B2B enterprise clients with different needs.',
    },
    {
      label: 'Market Entry',
      value: 'Launching an existing successful US product into the Southeast Asian market.',
    },
    {
      label: 'Feature Sunset',
      value: 'Managing the deprecation of a beloved but costly legacy feature.',
    },
  ],
  design: [
    {
      label: 'Elderly User Base',
      value:
        'Designing a healthcare app specifically for users over 70 with limited tech literacy.',
    },
    {
      label: 'Enterprise Complex',
      value: 'Redesigning a complex internal tool used by air traffic controllers.',
    },
    {
      label: 'Global Rebranding',
      value:
        'Updating digital products across 20 countries to match a new corporate brand identity.',
    },
  ],
  marketing: [
    {
      label: 'Gen Z Launch',
      value: 'Launching a new fashion brand targeting Gen Z consumers on TikTok and Instagram.',
    },
    {
      label: 'B2B Lead Gen',
      value: 'Generating high-quality leads for expensive enterprise software via LinkedIn.',
    },
    {
      label: 'Crisis Management',
      value: 'Managing PR communications during a major service outage.',
    },
  ],
  writer: [
    {
      label: 'Technical Documentation',
      value: 'Writing API documentation for developers who are new to the technology.',
    },
    {
      label: 'Sales Video Script',
      value: 'Writing a script for a 60-second high-energy sales video advertisement.',
    },
    {
      label: 'Corporate Blog',
      value: 'Writing a thought leadership article for the CEO to be published on Forbes.',
    },
  ],
  seo: [
    {
      label: 'Site Migration',
      value: 'Preserving SEO rankings during a domain name change and platform migration.',
    },
    {
      label: 'Local Business',
      value: 'Optimizing a chain of dental clinics for local search in 50 cities.',
    },
    {
      label: 'News Publisher',
      value: 'Optimizing a news site for Google Discover and Top Stories carousel.',
    },
  ],
  legal: [
    {
      label: 'SaaS Terms',
      value: 'Drafting Terms of Service for a SaaS platform with user-generated content.',
    },
    {
      label: 'Startup Fundraising',
      value: 'Preparing legal due diligence documents for a Series A venture capital round.',
    },
  ],
  hr: [
    {
      label: 'Remote Culture',
      value: 'Building company culture for a team distributed across 12 time zones.',
    },
    {
      label: 'Conflict Resolution',
      value: 'Mediating a conflict between two senior executives with opposing views.',
    },
  ],
  creative: [
    { label: 'Website Landing Page', value: 'A high-converting landing page for a SaaS product.' },
    { label: 'Social Media Post', value: 'An engaging Instagram/Twitter post with viral potential.' },
    { label: 'Logo Design', value: 'A minimalist, vector-scalable logo for a tech startup.' },
    { label: 'Character Portrait', value: 'A detailed character portrait for a fantasy RPG.' },
    { label: 'Surreal Landscape', value: 'A dreamlike, Dali-esque landscape.' },
  ],
};

const RESTRICTIONS_DB: Record<string, RocreOption[]> = {
  architect: [
    {
      label: 'Cloud Agnostic',
      value:
        'Must use open standards (CNCF) and avoid vendor lock-in features (e.g., no DynamoDB, use Cassandra).',
    },
    { label: 'Cost Cap', value: 'Total infrastructure cost must not exceed $500/month.' },
    { label: 'Latency Sensitive', value: 'P99 latency for API requests must be under 50ms.' },
    {
      label: 'Data Residency',
      value: 'All user data must technically remain within the European Union (GDPR).',
    },
  ],
  frontend: [
    {
      label: 'Performance Budget',
      value: 'First Contentful Paint (FCP) must be under 1.5s on 4G networks.',
    },
    {
      label: 'Legacy Browser',
      value: 'Must support Internet Explorer 11 due to enterprise client requirements.',
    },
    {
      label: 'No External Libs',
      value: 'Do not use any external dependencies (like Lodash or Moment.js); use native APIs.',
    },
    {
      label: 'Strict TypeScript',
      value: 'No usages of "any" type allowed; strict null checks enabled.',
    },
    {
      label: 'Bundle Size',
      value: 'Total initial JavaScript bundle size must be under 100KB gzipped.',
    },
  ],
  backend: [
    { label: 'Language Constraint', value: 'Code must be written in Rust for memory safety.' },
    {
      label: 'No SQL',
      value: 'Must use a NoSQL document store (MongoDB) instead of relational tables.',
    },
    {
      label: 'Stateless',
      value: 'The service must be completely stateless to allow infinite horizontal scaling.',
    },
    {
      label: 'Rate Limiting',
      value: 'Implement strict leaky bucket rate limiting per IP address.',
    },
  ],
  mobile: [
    {
      label: 'Battery Usage',
      value: 'Background synchronization must not drain more than 2% battery per day.',
    },
    { label: 'App Size', value: 'APK size must remain under 15MB for emerging markets.' },
    {
      label: 'No Cloud',
      value: 'All machine learning inference must happen on-device (Edge AI), no API calls.',
    },
  ],
  data: [
    {
      label: 'Privacy Preserving',
      value: 'Use Differential Privacy techniques; no raw user IDs in the dataset.',
    },
    {
      label: 'Explainability',
      value:
        'The model must be interpretable (e.g., Decision Trees), no "Black Box" Neural Networks.',
    },
    { label: 'Memory Limit', value: 'Training must fit within 16GB RAM constraints.' },
  ],
  devops: [
    {
      label: 'Immutable Infra',
      value: 'Servers should never be patched in place; always replace with new images.',
    },
    {
      label: 'Security Hardened',
      value: 'Container images must be based on distroless or Alpine and pass CIS benchmarks.',
    },
    {
      label: 'GitOps Only',
      value: 'No manual changes in the console; everything must be applied via Git commits.',
    },
  ],
  security: [
    {
      label: 'OWASP Strict',
      value: 'Must address every item in the OWASP Top 10 with specific mitigations.',
    },
    {
      label: 'No Passwords',
      value: 'Authentication must rely solely on FIDO2/WebAuthn or Magic Links.',
    },
  ],
  product: [
    {
      label: 'MVP Scope',
      value: 'Limit features to only what can be built by 2 developers in 4 weeks.',
    },
    {
      label: 'No Custom Code',
      value: 'Solve the problem using only No-Code tools (Zapier, Airtable, Webflow).',
    },
  ],
  design: [
    {
      label: 'Color Blindness',
      value: 'Design must work for Protanopia and Deuteranopia color blindness.',
    },
    { label: 'Dark Mode Only', value: 'Create a dark-themed UI only; no light theme.' },
    {
      label: 'System Fonts',
      value: 'Use system font stack only to avoid webfont loading performance penalty.',
    },
  ],
  marketing: [
    { label: 'Budget Zero', value: 'Achieve growth using only organic channels; $0 ad spend.' },
    {
      label: 'Brand Voice',
      value: 'Tone must be strictly "Professional, Authoritative, yet Approachable".',
    },
  ],
  writer: [
    { label: 'Word Count', value: 'Strictly between 150 and 200 words.' },
    {
      label: 'Flesch-Kincaid',
      value: 'Readability score must aim for Grade 6 level (Simple English).',
    },
    { label: 'No Jargon', value: 'Avoid all technical acronyms and industry jargon.' },
  ],
  creative: [
    { label: 'No Text', value: 'Do not render any text in the image.' },
    { label: 'Photorealistic', value: 'Must look indistinguishable from a photograph.' },
    { label: 'Vector Style', value: 'Flat, clean lines suitable for SVG conversion.' },
    { label: 'Cyberpunk Aesthetic', value: 'Neon lights, high tech, low life atmosphere.' },
    { label: '16:9 Aspect Ratio', value: '--ar 16:9' },
  ],
};

const GENERIC_CONTEXTS: RocreOption[] = [
  {
    label: 'Personal Project',
    value: 'A hobby project for personal learning and portfolio building.',
  },
  { label: 'Enterprise', value: 'Large-scale corporate environment with strict compliance needs.' },
  {
    label: 'Startup',
    value: 'Fast-paced startup environment where speed is prioritized over perfection.',
  },
  { label: 'Education', value: 'Educational material for students or beginners.' },
];

const GENERIC_RESTRICTIONS: RocreOption[] = [
  { label: 'Concise', value: 'Keep the response short and to the point.' },
  { label: 'Detailed', value: 'Provide a comprehensive and detailed explanation.' },
  { label: 'No Jargon', value: 'Explain using simple terms avoiding complex jargon.' },
  { label: 'Step-by-Step', value: 'Break down the solution into numbered steps.' },
];

export const getContextsForRole = (roleText: string): RocreOption[] => {
  if (!roleText) return GENERIC_CONTEXTS;
  const lowerRole = roleText.toLowerCase();

  const mapping: [string[], RocreOption[]][] = [
    [['midjourney', 'dall-e', 'diffusion', 'vector', 'prompter', 'artist', 'creative', 'graphic'], CONTEXT_DB.creative],
    [['architect', 'sre', 'reliability'], CONTEXT_DB.architect],
    [['frontend', 'react', 'css', 'ui/ux', 'designer', 'web'], CONTEXT_DB.frontend],
    [['backend', 'api', 'database', 'full stack', 'blockchain', 'embedded', 'coder', 'programmer'], CONTEXT_DB.backend],
    [['mobile', 'android', 'ios', 'flutter'], CONTEXT_DB.mobile],
    [['data', 'scientist', 'machine learning', 'bi', 'analyst'], CONTEXT_DB.data],
    [['devops', 'cloud', 'docker', 'qa', 'automation', 'engineer'], CONTEXT_DB.devops],
    [['security', 'cyber', 'penetration'], CONTEXT_DB.security],
    [['product', 'manager', 'project'], CONTEXT_DB.product],
    [['marketing', 'marketer', 'social media', 'brand', 'content', 'seo', 'search'], CONTEXT_DB.marketing],
    [['copywriter', 'copy', 'writer', 'story', 'ghostwriter', 'technical'], CONTEXT_DB.writer],
    [['legal', 'law', 'consultant', 'travel', 'event', 'planner', 'interior', 'chef', 'entrepreneur', 'founder', 'business', 'accountant', 'sales'], CONTEXT_DB.legal],
    [['hr', 'human resources', 'recruiter', 'diversity'], CONTEXT_DB.hr],
    [['teacher', 'tutor', 'professor', 'education', 'coach', 'counselor', 'personal trainer', 'nutritionist'], CONTEXT_DB.academic],
  ];

  for (const [keywords, options] of mapping) {
    if (keywords.some((k) => lowerRole.includes(k))) return options;
  }

  return GENERIC_CONTEXTS;
};

export const getRestrictionsForRole = (roleText: string): RocreOption[] => {
  if (!roleText) return GENERIC_RESTRICTIONS;
  const lowerRole = roleText.toLowerCase();

  const mapping: [string[], RocreOption[]][] = [
    [['midjourney', 'dall-e', 'diffusion', 'vector', 'prompter', 'artist', 'creative', 'graphic'], RESTRICTIONS_DB.creative],
    [['architect', 'sre', 'reliability'], RESTRICTIONS_DB.architect],
    [['frontend', 'react', 'css', 'ui/ux', 'designer', 'web'], RESTRICTIONS_DB.frontend],
    [['backend', 'api', 'database', 'full stack', 'blockchain', 'embedded', 'coder', 'programmer'], RESTRICTIONS_DB.backend],
    [['mobile', 'android', 'ios', 'flutter'], RESTRICTIONS_DB.mobile],
    [['data', 'scientist', 'machine learning', 'bi', 'analyst'], RESTRICTIONS_DB.data],
    [['devops', 'cloud', 'docker', 'qa', 'automation', 'engineer'], RESTRICTIONS_DB.devops],
    [['security', 'cyber', 'penetration'], RESTRICTIONS_DB.security],
    [['product', 'manager', 'project'], RESTRICTIONS_DB.product],
    [['marketing', 'marketer', 'social media', 'brand', 'content', 'seo', 'search'], RESTRICTIONS_DB.marketing],
    [['copywriter', 'copy', 'writer', 'story', 'ghostwriter', 'technical', 'teacher', 'tutor', 'professor', 'education'], RESTRICTIONS_DB.writer],
  ];

  for (const [keywords, options] of mapping) {
    if (keywords.some((k) => lowerRole.includes(k))) return options;
  }

  return GENERIC_RESTRICTIONS;
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
    placeholder:
      'Do not use external libraries. Ensure code is commented. Keep response under 500 words.',
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
