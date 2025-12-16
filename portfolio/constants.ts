import {
  Calendar,
  Github,
  Linkedin
} from 'lucide-vue-next';
import { Experience, Project, SkillCategory } from './types';

export const RESUME_TEXT = `
ADITYA AGARWAL
Jersey City, NJ | +1 (929) 592-9563 | adiagarwal1509@gmail.com
LinkedIn: @adityaagarwal1999 | GitHub: @adiagarwalrock

TECHNICAL SKILLS:
Languages: Python, Django, Flask, Java, JavaScript, TensorFlow
Cloud: AWS, GCP, Docker, Terraform
AI/ML: RAG Pipelines, Agentic Systems, BERT, NLP, Vector Databases, LangChain, Llama-Index
Databases: MongoDB, MySQL, PostgreSQL

PROFESSIONAL EXPERIENCE:
Founding Machine Learning Engineer | Soopra.ai, San Francisco (Aug 2024 - Present)
- Architected scalable AI infrastructure implementing Agentic systems.
- Developed production-grade AI pipelines for PDF document processing.
- Built resilient data processing systems for Agent-first social media platform.

Software Developer Intern | Soopra.ai, San Francisco (June 2023 - May 2024)
- Engineered enterprise RAG pipelines with vector databases.
- Designed event-driven chat systems.

Full-Stack Developer | SA Consultant, Bangalore (Oct 2021 - June 2022)
- Delivered enterprise web application using Django.
- Implemented billing and monitoring systems with PostgreSQL.

EDUCATION:
MS in Machine Learning, Stevens Institute of Technology, NJ (GPA 3.5/4.0)
BE in Computer Science, Alliance University, Bangalore

PROJECTS:
Track-us: Real-time location sharing application serving ~800 users weekly.
Soar Labs - Managed Retrieval Platform: AI framework using Django, Llama-Index, Qdrant.
Toxic Span Detection: BERT/CRF models for toxic content detection.
critiQs: Secure Review Platform with TMDB integration.
Insight: Enterprise Project Management Platform.
Fantastic Computing Machine: SaaS platform for dynamic ML model deployment.
`;

export const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/in/adityaagarwal1999", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/adiagarwalrock", label: "GitHub" },
  { icon: Calendar, href: "https://calendar.app.google/SNdonGredqAc8KWL9", label: "Book a Meeting" },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: "Soopra.ai",
    role: "Founding Machine Learning Engineer",
    location: "San Francisco",
    period: "August 2024 - Present",
    points: [
      "Architected scalable AI infrastructure implementing Agentic systems with custom recommendation engines, improving engagement by 35%.",
      "Developed production-grade AI pipelines for PDF document processing with vector database integration.",
      "Built resilient data processing systems creating Agent-first social media platform with high availability.",
      "Implemented security controls for AI service deployments and automated threat detection.",
    ]
  },
  {
    company: "Soopra.ai",
    role: "Software Developer Intern",
    location: "San Francisco",
    period: "June 2023 - May 2024",
    points: [
      "Engineered enterprise RAG pipelines with vector databases for multi-source data ingestion.",
      "Designed event-driven chat systems utilizing domain-driven architecture.",
      "Built scalable ETL infrastructure for real-time social media data extraction.",
    ]
  },
  {
    company: "SA Consultant",
    role: "Full-Stack Developer",
    location: "Bangalore",
    period: "October 2021 - June 2022",
    points: [
      "Delivered enterprise web application using Django framework with object-oriented principles.",
      "Implemented billing and monitoring systems with PostgreSQL backend.",
      "Deployed cloud-native solution on Heroku with AWS RDS integration.",
    ]
  }
];

export const PROJECT_DATA: Project[] = [
  {
    title: "Heathcliff - AI Butler",
    tech: ["LangChain", "ChromaDB", "Gemini", "Langfuse"],
    description: [
      "Developed a voice - activated AI assistant using Python and Google Gemini, integrating Porcupine for wake - word detection and Google STT for low - latency speech processing.",
      "Orchestrated autonomous agent workflows using LangGraph and LangChain, enabling the system to reason through complex tasks and execute actions across Gmail, Calendar, and Spotify APIs.",
      "Engineered a persistent memory system using Vector Databases(ChromaDB) and semantic search, allowing the AI to retain long- term context and deliver personalized, history - aware responses.",
      "Implemented full-stack observability by integrating Langfuse for LLM trace monitoring and debugging, ensuring system reliability through comprehensive Pytest coverage and modular architecture."
    ],
    // link: "https://soarlabs.tech"
  },
  {
    title: "Soar Labs - Managed Retrieval Platform",
    tech: ["Django", "Llama-Index", "Qdrant", "GCP"],
    description: [
      "Built an AI framework to turn unstructured documents into a semantic, searchable knowledge graph.",
      "Developed tools for live prompt engineering and model swapping (Claude, GPT-4).",
      "Productized solutions as embeddable widgets & REST APIs."
    ],
    link: "https://soarlabs.tech"
  },
  {
    title: "Track-us",
    tech: ["React", "Leaflet", "Real-time"],
    description: [
      "Real-time location sharing application actively serving ~800 users weekly.",
      "Open-source privacy-focused alternative for location tracking without account creation."
    ],
    link: "https://trackus.vercel.app/"
  },
  {
    title: "critiQs - Secure Review Platform",
    tech: ["Cloud-Native", "TMDB API", "Auth"],
    description: [
      "Built cloud-native web application with integrated TMDB database containing 1000+ entries.",
      "Designed scalable architecture with REST APIs and database optimization."
    ],
    link: "https://critiqs.vercel.app/"
  },
  {
    title: "Toxic Span Detection & Content Security",
    tech: ["BERT", "CRF", "NLP"],
    description: [
      "Developed AI-powered security solution using BERT and CRF models for automated toxic content detection.",
      "Implemented ML-based governance controls highlighting malicious spans."
    ]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: ["Python", "Django", "Flask", "Java", "JavaScript", "TypeScript", "TensorFlow"]
  },
  {
    category: "Cloud & Infra",
    skills: ["AWS", "GCP", "Docker", "Terraform", "Microservices"]
  },
  {
    category: "AI/ML",
    skills: ["RAG Pipelines", "Agentic Systems", "BERT", "LLMs", "LangChain", "Vector DBs"]
  }
];