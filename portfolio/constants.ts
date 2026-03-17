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
NanoChat: Private Android chat app with on-depth LLM inference (Gemini Nano).
Digits: Interactive browser demo for MNIST/EMNIST recognition with live neuron visualization.
Track-us: Specialized tool for F-1 students to track OPT/STEM unemployment days with precise date logic.
Soar Labs - Managed Retrieval Platform: AI framework using Django, Llama-Index, Qdrant.
Toxic Span Detection: BERT/CRF models for toxic content detection (University Curriculum).
critiQs: Secure Review Platform with TMDB integration (University Curriculum).
Fantastic Computing Machine (Atlantis): SaaS for diagrams and ML model deployment.
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
    title: "NanoChat - On-Device AI Chat",
    tech: ["Android", "Gemini Nano", "Local LLM", "Mobile AI"],
    description: [
      "Android chat app running AI models directly on phone - no internet or cloud dependencies, ensuring total privacy.",
      "Utilizes Google Gemini Nano for local inference when hardware supports AICore, with fallback to OpenAI-compatible APIs.",
      "Features local chat persistence with Room and secure API key storage via EncryptedSharedPreferences; functions as robust, offline-first ChatGPT alternative."
    ],
    github: "https://github.com/adiagarwalrock/NanoChat"
  },
  {
    title: "Digits - Visualizing Model Neurons",
    tech: ["ONNX Runtime Web", "MNIST", "Visualization", "Canvas"],
    description: [
      "Browser-based digit and character recognition demo visualizing 'black box' AI by showing model neurons firing in real-time.",
      "Visualizes model-layer activations during drawing on 28x28 grid, providing live prediction probabilities and structural insights.",
      "Powered by ONNX Runtime Web; delivers high-performance ML inference entirely in client browser with zero backend dependency."
    ],
    link: "https://digits.adityaagarwal.me",
    github: "https://github.com/adiagarwalrock/mnist-digits-web"
  },
  {
    title: "Atlantis - Open Source Notes & Diagrams",
    tech: ["Next.js", "Mermaid.js", "Docker", "SaaS"],
    description: [
      "Self-hosted platform for Mermaid.js diagrams and structured notes with clean, split-pane live preview editor for instant feedback.",
      "Docker-ready architecture supporting PostgreSQL, MySQL, or SQLite; enables full data ownership.",
      "Built with Next.js and Shadcn UI; provides streamlined workspace for documentation and system architecture."
    ],
    github: "https://github.com/Fantastic-Computing-Machine/atlantis"
  },
  {
    title: "Heathcliff - AI Butler",
    tech: ["LangChain", "AI Agent", "ChromaDB", "Gemini", "Langfuse"],
    description: [
      "Built voice-activated AI assistant using Python and Google Gemini; integrated Porcupine for wake-word detection and Google STT for low-latency speech processing.",
      "Orchestrated autonomous agent workflows using LangGraph and LangChain to reason through complex tasks and execute actions across Gmail, Calendar, and Spotify APIs.",
      "Engineered persistent memory system using Vector Databases (ChromaDB) and semantic search, enabling long-term context retention and personalized responses.",
      "Implemented full-stack observability by integrating Langfuse for LLM trace monitoring and debugging; verified reliability through comprehensive Pytest coverage."
    ],
    github: "https://github.com/Fantastic-Computing-Machine/heathcliff"
  },
  {
    title: "Soar Labs - Managed Retrieval Platform",
    tech: ["Django", "RAG", "Llama-Index", "Qdrant", "GCP"],
    description: [
      "Built AI framework converting unstructured documents into semantic, searchable knowledge graphs.",
      "Developed tools for live prompt engineering and model swapping (Claude, GPT-4).",
      "Productized solutions as embeddable widgets and REST APIs."
    ],
    link: "https://soarlabs.tech",
    github: "https://github.com/Fantastic-Computing-Machine/soar_labs_home"
  },
  {
    title: "Track-us",
    tech: ["React", "Date-fns", "TypeScript", "Immigration Tool"],
    description: [
      "Tool helping F-1 students track OPT/STEM unemployment days - ensures accurate status monitoring without manual calculation.",
      "Handles initial OPT and STEM extension calculation logic; ensures compliance with USCIS requirements through automated date math."
    ],
    link: "https://trackus.vercel.app/",
    github: "https://github.com/adiagarwalrock/track-us"
  },
  {
    title: "critiQs - Secure Review Platform",
    tech: ["Cloud-Native", "TMDB API", "Auth"],
    description: [
      "Developed as university academic project; cloud-native web application integrating TMDB database with 1000+ entries.",
      "Designed scalable architecture with REST APIs and database optimization for high-frequency user interactions."
    ],
    link: "https://critiqs.vercel.app/",
    github: "https://github.com/adiagarwalrock/critiQs"
  },
  {
    title: "Toxic Span Detection & Content Security",
    tech: ["BERT", "CRF", "NLP"],
    description: [
      "Developed as university research project; focused on AI-powered security using BERT and CRF models for automated toxic content detection.",
      "Implemented ML-based governance controls highlighting malicious spans to improve content moderation efficiency."
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