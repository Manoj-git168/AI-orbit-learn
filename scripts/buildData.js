const fs = require('fs');

const roadmapsContent = `import type { LearningRoadmap } from "@/types/resources";

export const roadmaps: LearningRoadmap[] = [
  {
    id: "roadmap-1",
    slug: "full-stack-ai-engineer",
    title: "Full-Stack AI Engineer Career Track",
    description: "A comprehensive learning path from software development basics to building, evaluating, and deploying production-grade LLM and agentic systems.",
    level: "Intermediate",
    estimatedDuration: "14 Weeks (8-10 hrs/wk)",
    category: "AI Engineering",
    milestones: [
      {
        step: 1,
        title: "Prompt Engineering & Foundation APIs",
        description: "Master token economics, system prompts, few-shot prompting, and structured JSON output guarantees with OpenAI, Anthropic, and Gemini APIs.",
        skills: ["Prompt Design", "JSON Schema Mode", "Token Economics", "API Integration"],
        recommendedResourceSlugs: ["mastering-prompt-engineering", "building-with-ai-apis"]
      },
      {
        step: 2,
        title: "Vector Databases & Advanced RAG",
        description: "Build robust semantic search systems with chunking strategies, embeddings, reranking, hybrid search, and citation grounding.",
        skills: ["Vector DBs", "Embeddings", "Hybrid Search", "Reranking Pipelines"],
        recommendedResourceSlugs: ["rag-from-zero-to-production", "llm-engineering-fundamentals"]
      },
      {
        step: 3,
        title: "Autonomous Agents & LangGraph",
        description: "Orchestrate multi-step tool-using agents with cyclic graph execution, persistent memory checkpoints, and human-in-the-loop validation.",
        skills: ["AI Agents", "LangGraph", "Tool Schemas", "State Machines"],
        recommendedResourceSlugs: ["building-ai-agents", "langgraph-multi-agent-mastery"]
      },
      {
        step: 4,
        title: "Fine-Tuning, Evals & Production Ops",
        description: "Perform parameter-efficient fine-tuning (LoRA/QLoRA), implement automated evaluation harnesses (LLM-as-a-Judge), and monitor token latency in production.",
        skills: ["PEFT / LoRA", "LLM Evaluation", "Observability", "Latency Optimization"],
        recommendedResourceSlugs: ["fine-tuning-large-language-models", "ai-engineering-handbook"]
      }
    ]
  },
  {
    id: "roadmap-2",
    slug: "autonomous-ai-agents-architect",
    title: "Autonomous AI Agents Architect",
    description: "Master the design, planning, memory, and orchestration of multi-agent collaborative systems for enterprise workflow automation.",
    level: "Advanced",
    estimatedDuration: "10 Weeks (6-8 hrs/wk)",
    category: "AI Agents",
    milestones: [
      {
        step: 1,
        title: "Single-Agent Reasoning & Function Calling",
        description: "Deconstruct ReAct loops, deterministic schema validation, and tool execution boundaries with state-of-the-art models.",
        skills: ["Function Calling", "ReAct Pattern", "Tool Schemas"],
        recommendedResourceSlugs: ["building-ai-agents", "building-with-ai-apis"]
      },
      {
        step: 2,
        title: "Multi-Agent Graph Orchestration",
        description: "Build graph-based state machines, hierarchical agent supervisors, and human-in-the-loop review mechanisms.",
        skills: ["LangGraph", "State Management", "Human-in-the-Loop", "Supervised Agents"],
        recommendedResourceSlugs: ["langgraph-multi-agent-mastery", "ai-automation-masterclass"]
      },
      {
        step: 3,
        title: "Long-Term Memory & Sandbox Code Execution",
        description: "Integrate vector-based episodic memory, persistent session scratchpads, and secure docker/E2B sandbox execution environments.",
        skills: ["Episodic Memory", "Docker Sandboxes", "Self-Healing Workflows"],
        recommendedResourceSlugs: ["rag-from-zero-to-production", "ai-engineering-handbook"]
      }
    ]
  },
  {
    id: "roadmap-3",
    slug: "generative-ai-for-product-leaders",
    title: "AI Product Management & Strategy",
    description: "A strategic curriculum for founders, product managers, and executives to evaluate AI feasibility, design AI UX, and calculate ROI.",
    level: "Beginner",
    estimatedDuration: "6 Weeks (4 hrs/wk)",
    category: "Generative AI",
    milestones: [
      {
        step: 1,
        title: "AI Ecosystem & Foundation Models",
        description: "Understand the landscape of foundation models, open source vs proprietary weights, pricing benchmarks, and latency tradeoffs.",
        skills: ["Model Selection", "Ecosystem Navigation", "Cost Modeling"],
        recommendedResourceSlugs: ["ai-product-management", "llm-engineering-fundamentals"]
      },
      {
        step: 2,
        title: "AI User Experience & Fail-Safe Patterns",
        description: "Design intuitive generative UI patterns, streaming feedback, confidence indicators, and graceful fallback behaviors.",
        skills: ["AI UX Design", "Hallucination Mitigation", "Product PRDs"],
        recommendedResourceSlugs: ["ai-product-management", "mastering-prompt-engineering"]
      },
      {
        step: 3,
        title: "Enterprise Governance, Safety & ROI",
        description: "Manage data privacy, SOC2/HIPAA compliance, copyright guardrails, and enterprise transformation roadmaps.",
        skills: ["AI Governance", "Enterprise Security", "ROI Analysis"],
        recommendedResourceSlugs: ["ai-engineering-handbook"]
      }
    ]
  },
  {
    id: "roadmap-4",
    slug: "prompt-engineering-to-tuning",
    title: "Prompt Engineering to Advanced Tuning",
    description: "From prompt crafting and context engineering to parameter-efficient fine-tuning and model alignment.",
    level: "Intermediate",
    estimatedDuration: "8 Weeks (5 hrs/wk)",
    category: "Prompt Engineering",
    milestones: [
      {
        step: 1,
        title: "System Instructions & Few-Shot Prompting",
        description: "Master zero-shot, few-shot, Chain-of-Thought (CoT), and role-based conditioning for precision responses.",
        skills: ["Few-Shot Prompting", "Chain-of-Thought", "Instruction Tuning"],
        recommendedResourceSlugs: ["mastering-prompt-engineering"]
      },
      {
        step: 2,
        title: "Automated Prompt Optimization (DSPy)",
        description: "Learn programmatic prompt compilation, teleprompters, and declarative LLM programming using DSPy and LangChain.",
        skills: ["DSPy", "Prompt Optimization", "Declarative Pipelines"],
        recommendedResourceSlugs: ["building-with-ai-apis", "llm-engineering-fundamentals"]
      },
      {
        step: 3,
        title: "Domain Adaptation with Fine-Tuning",
        description: "Curate instruction datasets, format JSONL training samples, and train custom adapters with LoRA on cloud GPUs.",
        skills: ["LoRA / QLoRA", "Data Curation", "Adapter Merging"],
        recommendedResourceSlugs: ["fine-tuning-large-language-models"]
      }
    ]
  }
];
`;

const resourcesContent = `import type { LearningResource } from "@/types/resources";

export const resources: LearningResource[] = [
  {
    id: "1",
    slug: "mastering-prompt-engineering",
    title: "Mastering Prompt Engineering for Production",
    description: "Learn how to design, test, and optimize high-reliability prompts for modern foundation models and AI workflows.",
    overview: "A comprehensive masterclass on prompt engineering covering core principles, structured schema outputs, chain-of-thought reasoning, few-shot learning, and automated prompt evaluation techniques used by leading AI engineering teams.",
    learningOutcomes: [
      "Design deterministic prompts for complex enterprise use cases",
      "Enforce strictly typed JSON responses using schema modes",
      "Implement Chain-of-Thought and ReAct reasoning techniques",
      "Benchmark and evaluate prompt variations with quantitative scoring",
      "Prevent prompt injection and jailbreak vulnerabilities"
    ],
    type: "Course",
    category: "Prompt Engineering",
    tags: ["Prompting", "LLMs", "Generative AI", "Production AI"],
    provider: "AI Orbit Academy",
    author: "Elena Rostova",
    authorBio: "Principal AI Engineer and researcher specializing in language model alignment and prompt optimization architectures.",
    level: "Intermediate",
    duration: "8 hours",
    format: "Video course & interactive labs",
    price: "Free",
    rating: 4.9,
    reviewCount: 1420,
    thumbnail: "/resources/prompt-engineering.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Basic understanding of LLM APIs", "Basic Python or JavaScript"],
    targetAudience: ["Software Engineers", "AI Builders", "Product Managers"],
    curriculum: [
      {
        title: "Module 1: Foundations of Prompt Architecture",
        duration: "1.5 hours",
        lessons: [
          { title: "Tokens, Context Windows & Attention Mechanics", duration: "25 min", type: "video" },
          { title: "Zero-Shot vs Few-Shot In-Context Learning", duration: "30 min", type: "video" },
          { title: "Interactive Lab: Calibrating System Instructions", duration: "35 min", type: "exercise" }
        ]
      },
      {
        title: "Module 2: Structured Outputs & Schema Enforcement",
        duration: "2 hours",
        lessons: [
          { title: "JSON Schema Definition & Strict Mode", duration: "40 min", type: "video" },
          { title: "Error Handling & Self-Correction Prompts", duration: "35 min", type: "video" },
          { title: "Building a Production Extraction Pipeline", duration: "45 min", type: "project" }
        ]
      },
      {
        title: "Module 3: Advanced Reasoning & Evaluation",
        duration: "2.5 hours",
        lessons: [
          { title: "Chain-of-Thought and Tree-of-Thoughts Patterns", duration: "45 min", type: "video" },
          { title: "Automated Prompt Evaluation with LLM-as-a-Judge", duration: "50 min", type: "video" },
          { title: "Guardrails & Prompt Injection Defense", duration: "55 min", type: "project" }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Marcus Vance",
        role: "Senior AI Engineer at Veloce",
        rating: 5,
        date: "August 2026",
        comment: "The structured output and evaluation modules alone saved our team weeks of trial and error in production. Exceptional quality."
      },
      {
        id: "rev-2",
        author: "Sophia Lin",
        role: "Full Stack Developer",
        rating: 5,
        date: "August 2026",
        comment: "Clear, concise, and purely practical. No fluff, just modern AI engineering patterns that work."
      }
    ]
  },

  {
    id: "2",
    slug: "building-ai-agents",
    title: "Building Autonomous AI Agents",
    description: "A practical guide to designing tool-using, reasoning, and multi-step autonomous AI agents from first principles.",
    overview: "Explore the architectures behind autonomous AI agents. Learn how models reason with ReAct patterns, execute sandboxed code, call third-party APIs, maintain stateful memory, and recover from failures in real-time execution loops.",
    learningOutcomes: [
      "Understand the internal loop of ReAct and plan-and-solve agents",
      "Equip agents with type-safe tools and schema-validated functions",
      "Implement persistent memory (short-term buffer + long-term vector search)",
      "Set up human-in-the-loop validation checkpoints",
      "Benchmark agent reliability, cost, and latency"
    ],
    type: "Guide",
    category: "AI Agents",
    tags: ["Agents", "LLMs", "Automation", "Tool Calling"],
    provider: "AI Orbit Research",
    author: "Dr. Alexander Kim",
    authorBio: "AI Systems Researcher and author of several open-source agent orchestration frameworks.",
    level: "Advanced",
    duration: "5 hours",
    format: "Written guide & runnable code repositories",
    price: "Free",
    rating: 4.9,
    reviewCount: 980,
    thumbnail: "/resources/ai-agents.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Intermediate Python", "Experience with OpenAI / Anthropic APIs"],
    targetAudience: ["AI Engineers", "Backend Developers", "Automation Architects"],
    curriculum: [
      {
        title: "Part 1: The Core Agent Execution Loop",
        duration: "1.5 hours",
        lessons: [
          { title: "Reasoning vs Acting: Deconstructing ReAct", duration: "30 min", type: "article" },
          { title: "Deterministic Tool Execution & Schema Binding", duration: "35 min", type: "video" },
          { title: "Handling Tool Exceptions & Dynamic Retry", duration: "25 min", type: "exercise" }
        ]
      },
      {
        title: "Part 2: Stateful Memory & Context Management",
        duration: "2 hours",
        lessons: [
          { title: "Episodic vs Semantic Memory Architectures", duration: "40 min", type: "article" },
          { title: "Vector-Indexed Scratchpads for Complex Tasks", duration: "45 min", type: "video" },
          { title: "State Checkpointing in Serverless Environments", duration: "35 min", type: "project" }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Devon Clark",
        role: "Lead Platform Architect",
        rating: 5,
        date: "July 2026",
        comment: "The most lucid breakdown of agentic memory and tool calling I have encountered. The code examples run out of the box."
      }
    ]
  },

  {
    id: "3",
    slug: "ai-engineering-handbook",
    title: "AI Engineering Handbook (2026 Edition)",
    description: "The definitive reference manual for building, evaluating, and operating reliable production AI applications.",
    overview: "A comprehensive digital handbook for developers and software architects transitioning to AI engineering. Covers foundation model selection, latency optimization, hybrid RAG, semantic caching, evals, and enterprise security guardrails.",
    learningOutcomes: [
      "Architect resilient full-stack AI applications",
      "Implement semantic caching to reduce API costs by 40-70%",
      "Deploy automated regression testing for generative features",
      "Implement streaming UI patterns with backpressure handling",
      "Ensure compliance with data governance and safety standards"
    ],
    type: "Ebook",
    category: "Generative AI",
    tags: ["AI Engineering", "LLMs", "Production AI", "Architecture"],
    provider: "AI Orbit Press",
    author: "AI Orbit Engineering Team",
    authorBio: "Collective publication by the AI Orbit core engineering and research teams.",
    level: "Intermediate",
    duration: "12 hours",
    format: "Digital ebook (EPUB / PDF / Web)",
    price: "Free",
    rating: 4.8,
    reviewCount: 2310,
    thumbnail: "/resources/ai-engineering.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["General software engineering background"],
    targetAudience: ["Full-Stack Developers", "Software Architects", "Engineering Leads"],
    curriculum: [
      {
        title: "Chapter 1: The Modern AI Tech Stack",
        duration: "2 hours",
        lessons: [
          { title: "Foundation Models vs Open-Weights Models", duration: "30 min", type: "article" },
          { title: "Inference Engines: vLLM, TensorRT-LLM, Ollama", duration: "45 min", type: "article" },
          { title: "Cost & Latency Budgeting for Production", duration: "45 min", type: "article" }
        ]
      },
      {
        title: "Chapter 2: Production Evals & Guardrails",
        duration: "3 hours",
        lessons: [
          { title: "Continuous Evaluation Frameworks", duration: "50 min", type: "article" },
          { title: "Red-Teaming & Adversarial Prompt Testing", duration: "40 min", type: "article" },
          { title: "Enterprise Compliance & PII Sanitization", duration: "50 min", type: "project" }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Kavita Rao",
        role: "VP of Engineering",
        rating: 5,
        date: "August 2026",
        comment: "This handbook is now mandatory reading for every engineer on our team. Thorough, objective, and beautifully structured."
      }
    ]
  },

  {
    id: "4",
    slug: "llm-engineering-fundamentals",
    title: "LLM Engineering Fundamentals",
    description: "Understand the core mathematical and architectural foundations behind modern large language models.",
    overview: "Demystify how modern large language models work under the hood. Learn about transformer self-attention mechanisms, tokenization, positional embeddings, KV-caching, and how foundation models generate text token by token.",
    learningOutcomes: [
      "Understand the mechanics of multi-head self-attention",
      "Calculate token budgets, KV-cache memory, and GPU VRAM requirements",
      "Compare transformer variants (Encoder-only, Decoder-only, Mixture of Experts)",
      "Understand decoding strategies (greedy, temperature, top-k, top-p)"
    ],
    type: "Course",
    category: "LLMs",
    tags: ["LLMs", "Transformers", "Deep Learning", "Foundations"],
    provider: "AI Orbit Academy",
    author: "Prof. Michael Sterling",
    authorBio: "Adjunct Professor of Computer Science and former research scientist at DeepMind.",
    level: "Beginner",
    duration: "6 hours",
    format: "Video lectures & visual simulations",
    price: "Free",
    rating: 4.8,
    reviewCount: 1690,
    thumbnail: "/resources/llm-engineering.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Basic linear algebra and Python basics"],
    targetAudience: ["Aspiring AI Engineers", "Data Scientists", "Curious Developers"],
    curriculum: [
      {
        title: "Module 1: The Transformer Architecture",
        duration: "2 hours",
        lessons: [
          { title: "From RNNs to Self-Attention", duration: "35 min", type: "video" },
          { title: "Scaled Dot-Product Attention Explained", duration: "45 min", type: "video" },
          { title: "Positional Encodings (RoPE & ALiBi)", duration: "40 min", type: "video" }
        ]
      }
    ],
    reviews: []
  },

  {
    id: "5",
    slug: "rag-from-zero-to-production",
    title: "RAG From Zero to Production",
    description: "Master document chunking, dense & sparse embeddings, vector search, and reranking pipelines for high-accuracy retrieval.",
    overview: "A hands-on, production-grade guide to Retrieval-Augmented Generation. Learn how to ingest heterogeneous documents (PDFs, Markdown, SQL tables), generate dense and sparse embeddings, store them in pgvector/Pinecone, and perform hybrid reciprocal rank fusion retrieval with zero hallucinations.",
    learningOutcomes: [
      "Implement optimal semantic chunking for enterprise documents",
      "Build hybrid search pipelines combining BM25 keyword + dense vector search",
      "Utilize Cohere / Cross-Encoder rerankers to improve top-3 retrieval accuracy by 35%",
      "Implement self-reflective RAG loops that critique retrieved context",
      "Benchmark RAG precision and recall with RAGAS metrics"
    ],
    type: "Tutorial",
    category: "Generative AI",
    tags: ["RAG", "LLMs", "Vector Databases", "Embeddings", "Search"],
    provider: "AI Orbit Labs",
    author: "Nikhil Joshi",
    authorBio: "Staff Search & Retrieval Engineer with over 8 years building large-scale vector search engines.",
    level: "Intermediate",
    duration: "6 hours",
    format: "Interactive tutorial & runnable notebooks",
    price: "Paid",
    rating: 4.9,
    reviewCount: 840,
    thumbnail: "/resources/rag.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Python", "Basic SQL / Vector DB concepts"],
    targetAudience: ["AI Developers", "Data Engineers", "Backend Architects"],
    curriculum: [
      {
        title: "Module 1: Data Ingestion & Parsing",
        duration: "1.5 hours",
        lessons: [
          { title: "Document Parsing: Tables, OCR, and Layout Analysis", duration: "30 min", type: "video" },
          { title: "Semantic Chunking vs Fixed-Size Windows", duration: "30 min", type: "exercise" }
        ]
      },
      {
        title: "Module 2: Hybrid Retrieval & Reranking",
        duration: "2.5 hours",
        lessons: [
          { title: "Dense Vectors vs Sparse BM25 Embeddings", duration: "45 min", type: "video" },
          { title: "Reciprocal Rank Fusion (RRF) Implementation", duration: "40 min", type: "project" },
          { title: "Cross-Encoder Reranking in 5 Lines of Code", duration: "35 min", type: "exercise" }
        ]
      }
    ],
    reviews: []
  },

  {
    id: "6",
    slug: "langgraph-multi-agent-mastery",
    title: "LangGraph Multi-Agent Mastery",
    description: "Design cyclic state graphs, multi-agent supervisors, and human-in-the-loop workflows for complex enterprise tasks.",
    overview: "LangGraph represents the state-of-the-art in deterministic, graph-based agent orchestration. In this deep dive, learn how to build cyclic graphs, manage global and node-scoped state, configure branch routers, and inject human approval checkpoints before destructive actions execute.",
    learningOutcomes: [
      "Master LangGraph state schemas, nodes, and conditional edges",
      "Build a hierarchical Multi-Agent Supervisor team",
      "Implement time-travel debugging and state playback",
      "Add human-in-the-loop approval triggers for critical operations",
      "Deploy production LangGraph workflows to Docker and cloud endpoints"
    ],
    type: "Course",
    category: "AI Agents",
    tags: ["LangGraph", "Multi-Agent", "Agents", "Python"],
    provider: "AI Orbit Labs",
    author: "Julian Thorne",
    authorBio: "Open-source contributor and specialist in graph-based agent runtime systems.",
    level: "Advanced",
    duration: "7 hours",
    format: "Video course & live code sandboxes",
    price: "Paid",
    rating: 4.9,
    reviewCount: 620,
    thumbnail: "/resources/langgraph.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Python", "Understanding of async programming", "Basic LangChain / LLM APIs"],
    targetAudience: ["Senior AI Engineers", "Platform Architects"],
    curriculum: [],
    reviews: []
  },

  {
    id: "7",
    slug: "introduction-to-computer-vision",
    title: "Modern Computer Vision & Multimodal AI",
    description: "Explore vision transformers, object detection, segmentation, and vision-language multimodal models.",
    overview: "An end-to-end curriculum on modern computer vision. Learn image classification, YOLO-based real-time object detection, Segment Anything (SAM), and Vision-Language models (GPT-4o Vision, Claude 3.7 Sonnet, Gemini Flash) for visual reasoning and OCR.",
    learningOutcomes: [
      "Understand Vision Transformers (ViT) vs Convolutional Networks",
      "Train custom YOLOv10 object detection models",
      "Implement zero-shot segmentation with Meta SAM 2",
      "Build visual question answering and document parsing pipelines"
    ],
    type: "Course",
    category: "Computer Vision",
    tags: ["Computer Vision", "Multimodal", "Vision Transformers", "Deep Learning"],
    provider: "AI Orbit Academy",
    author: "Dr. Rachel Chen",
    authorBio: "Computer Vision Researcher with 15+ publications in CVPR and ICCV.",
    level: "Beginner",
    duration: "8 hours",
    format: "Video course & Colab notebooks",
    price: "Free",
    rating: 4.7,
    reviewCount: 1120,
    thumbnail: "/resources/computer-vision.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Basic Python and PyTorch concepts"],
    targetAudience: ["AI Students", "Robotics Engineers", "Data Scientists"],
    curriculum: [],
    reviews: []
  },

  {
    id: "8",
    slug: "ai-automation-masterclass",
    title: "Enterprise AI Automation Masterclass",
    description: "Build robust, automated business workflows combining AI models, n8n, webhook pipelines, and cloud APIs.",
    overview: "Learn how to bridge enterprise data silos with autonomous AI automations. Connect LLMs, webhooks, databases, CRMs, and email systems using modern platforms like n8n, Make, and custom FastAPI microservices to automate end-to-end customer support, document extraction, and reporting.",
    learningOutcomes: [
      "Build production webhook-driven AI automation pipelines",
      "Design self-healing workflows with fallback model switching",
      "Automate invoice and document processing with 99.8% precision",
      "Calculate compute cost and enterprise ROI for automated tasks"
    ],
    type: "Course",
    category: "Automation",
    tags: ["Automation", "Workflows", "n8n", "AI Tools", "Business AI"],
    provider: "AI Orbit Academy",
    author: "Lucas Gomez",
    authorBio: "Enterprise automation consultant having led AI transformations across Fortune 500 companies.",
    level: "Intermediate",
    duration: "9 hours",
    format: "Video course & workflow templates",
    price: "Paid",
    rating: 4.8,
    reviewCount: 790,
    thumbnail: "/resources/automation.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Basic understanding of APIs and Webhooks"],
    targetAudience: ["Automation Consultants", "Operations Leads", "Founders"],
    curriculum: [],
    reviews: []
  },

  {
    id: "9",
    slug: "fine-tuning-large-language-models",
    title: "Fine-Tuning Large Language Models with LoRA",
    description: "Learn when, why, and how to adapt open-weights models like Llama 3, DeepSeek, and Mistral with PEFT & QLoRA.",
    overview: "A master-level engineering guide to customizing foundation models. Understand when fine-tuning is superior to prompting, curate synthetic instruction datasets, perform 4-bit QLoRA fine-tuning using Unsloth and Hugging Face TRL, and merge adapters for low-latency vLLM inference.",
    learningOutcomes: [
      "Decide between Prompting, RAG, and Parameter-Efficient Fine-Tuning",
      "Format, clean, and deduplicate instruction-tuning datasets",
      "Train LoRA / QLoRA adapters on consumer GPUs with Unsloth",
      "Merge adapters and export quantized GGUF / AWQ weights",
      "Evaluate domain-specific improvements using custom benchmarks"
    ],
    type: "Guide",
    category: "LLMs",
    tags: ["Fine-tuning", "LoRA", "Open Source", "Llama", "Machine Learning"],
    provider: "AI Orbit Research",
    author: "Zackary Bell",
    authorBio: "Machine Learning Engineer focusing on open-weights model optimization and distributed training.",
    level: "Advanced",
    duration: "6 hours",
    format: "Written guide & step-by-step scripts",
    price: "Free",
    rating: 4.9,
    reviewCount: 680,
    thumbnail: "/resources/fine-tuning.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Python", "PyTorch basics", "GPU access (Colab / RunPod / local)"],
    targetAudience: ["ML Engineers", "AI Researchers", "Full-Stack AI Developers"],
    curriculum: [],
    reviews: []
  },

  {
    id: "10",
    slug: "building-with-ai-apis",
    title: "Full-Stack Development with Modern AI APIs",
    description: "Build reactive, streaming AI applications with Next.js, Vercel AI SDK, and modern LLM endpoints.",
    overview: "A comprehensive developer course for building snappy, interactive AI web applications. Learn how to stream text and structured objects to the client, handle tool call rendering, build multi-modal upload widgets, and manage optimistic UI updates.",
    learningOutcomes: [
      "Stream responses using the Vercel AI SDK and Server-Sent Events (SSE)",
      "Render generative UI components based on model tool calls",
      "Implement multi-turn chat persistence with PostgreSQL / Prisma",
      "Handle rate limits, token quotas, and exponential backoff retry"
    ],
    type: "Tutorial",
    category: "AI Coding",
    tags: ["Next.js", "TypeScript", "AI SDK", "APIs", "Web Development"],
    provider: "AI Orbit Labs",
    author: "Sarah Jenkins",
    authorBio: "Lead Frontend Architect and advocate for generative UI engineering.",
    level: "Beginner",
    duration: "4 hours",
    format: "Interactive tutorial & starter template repo",
    price: "Free",
    rating: 4.8,
    reviewCount: 1350,
    thumbnail: "/resources/ai-apis.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["React / Next.js basics", "TypeScript"],
    targetAudience: ["Frontend Developers", "Full-Stack Engineers"],
    curriculum: [],
    reviews: []
  },

  {
    id: "11",
    slug: "understanding-transformers",
    title: "Visual Guide to Transformer Architectures",
    description: "An intuitive, diagram-heavy breakdown of the self-attention mechanism, embeddings, and modern attention variants.",
    overview: "A visual explanation of why transformers transformed artificial intelligence. Follow tensor shapes step-by-step through Query, Key, Value matrices, multi-head projections, feed-forward layers, RMSNorm, and Rotary Position Embeddings.",
    learningOutcomes: [
      "Visualize how attention vectors route context across tokens",
      "Understand why FlashAttention speeds up inference by 3-5x",
      "Compare RoPE vs Sinusoidal positional embeddings",
      "Understand Mixture of Experts (MoE) routing mechanisms"
    ],
    type: "Guide",
    category: "Machine Learning",
    tags: ["Transformers", "Deep Learning", "Attention", "Math"],
    provider: "AI Orbit Research",
    author: "Dr. Alexander Kim",
    authorBio: "AI Systems Researcher and author of several open-source agent orchestration frameworks.",
    level: "Intermediate",
    duration: "4 hours",
    format: "Illustrated visual guide",
    price: "Free",
    rating: 4.9,
    reviewCount: 1950,
    thumbnail: "/resources/transformers.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Basic matrix multiplication and linear algebra"],
    targetAudience: ["Curious Engineers", "Data Science Students", "AI Enthusiasts"],
    curriculum: [],
    reviews: []
  },

  {
    id: "12",
    slug: "ai-product-management",
    title: "Generative AI Product Management",
    description: "Learn how to discover, scope, validate, and ship high-impact AI products that users actually love and trust.",
    overview: "A specialized course designed for modern Product Managers, Tech Founders, and Designers. Learn how to write effective AI PRDs, establish evaluation metrics beyond vanity numbers, design non-intrusive feedback loops, and manage non-deterministic UX.",
    learningOutcomes: [
      "Write comprehensive Product Requirement Documents (PRDs) for AI features",
      "Design telemetry to capture implicit and explicit user satisfaction",
      "Establish product latency thresholds and streaming response heuristics",
      "Calculate unit economics and gross margins for LLM features"
    ],
    type: "Course",
    category: "Generative AI",
    tags: ["Product Management", "AI Strategy", "UX Design", "Business AI"],
    provider: "AI Orbit Academy",
    author: "Claire Moreau",
    authorBio: "Former VP of Product at scale-ups delivering AI products to millions of active users.",
    level: "Intermediate",
    duration: "5 hours",
    format: "Video lectures & PRD templates",
    price: "Paid",
    rating: 4.7,
    reviewCount: 520,
    thumbnail: "/resources/ai-product.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["General product management or startup experience"],
    targetAudience: ["Product Managers", "Founders", "Designers"],
    curriculum: [],
    reviews: []
  },

  {
    id: "13",
    slug: "machine-learning-foundations",
    title: "Machine Learning Foundations from Scratch",
    description: "Build core machine learning algorithms from first principles using Python, NumPy, and Scikit-Learn.",
    overview: "A thorough introduction to classical machine learning and data science. Implement linear regression, logistic regression, decision trees, random forests, k-means clustering, and gradient descent from scratch without external black-box libraries.",
    learningOutcomes: [
      "Understand the mathematical foundations of gradient descent",
      "Implement key supervised and unsupervised ML algorithms in NumPy",
      "Perform cross-validation, hyperparameter tuning, and ROC-AUC analysis",
      "Prepare high quality tabular datasets for model training"
    ],
    type: "Course",
    category: "Machine Learning",
    tags: ["Machine Learning", "Python", "NumPy", "Data Science"],
    provider: "AI Orbit Academy",
    author: "Prof. Michael Sterling",
    authorBio: "Adjunct Professor of Computer Science and former research scientist at DeepMind.",
    level: "Beginner",
    duration: "10 hours",
    format: "Video course & coding assignments",
    price: "Free",
    rating: 4.8,
    reviewCount: 2840,
    thumbnail: "/resources/machine-learning.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Python fundamentals"],
    targetAudience: ["Beginners in AI/ML", "Students", "Software Engineers"],
    curriculum: [],
    reviews: []
  },

  {
    id: "14",
    slug: "cursor-and-ai-coding-workflows",
    title: "AI-Augmented Coding: Cursor & Windsurf Masterclass",
    description: "Supercharge your software development speed 3-5x using modern AI code editors, rules, and agentic workflows.",
    overview: "Discover how top 1% software engineers write, debug, and refactor code in 2026. Learn cursor rules (.cursorrules), context selection strategies (@files, @symbols, @docs), composer multi-file editing, test-driven generative coding, and local model integration.",
    learningOutcomes: [
      "Configure project-specific AI rules for consistent code conventions",
      "Master multi-file Composer refactoring for complex features",
      "Automate unit and integration test generation with 95% coverage",
      "Integrate local coding models via Ollama for offline productivity"
    ],
    type: "Tutorial",
    category: "AI Coding",
    tags: ["AI Coding", "Cursor", "Developer Productivity", "Coding Tools"],
    provider: "AI Orbit Labs",
    author: "Sarah Jenkins",
    authorBio: "Lead Frontend Architect and advocate for generative UI engineering.",
    level: "Beginner",
    duration: "3 hours",
    format: "Interactive video tutorial & configuration library",
    price: "Free",
    rating: 4.9,
    reviewCount: 1580,
    thumbnail: "/resources/ai-coding.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: true,
    language: "English",
    prerequisites: ["Any programming language familiarity"],
    targetAudience: ["All Developers", "DevOps Engineers", "Engineering Leads"],
    curriculum: [],
    reviews: []
  },

  {
    id: "15",
    slug: "multimodal-ai-engineering",
    title: "Multimodal AI: Audio, Vision & Video Models",
    description: "Build next-generation applications integrating speech synthesis, real-time audio streams, vision analysis, and video generation.",
    overview: "Explore the cutting edge of multimodal artificial intelligence. Learn how to work with real-time audio WebRTC streams (OpenAI Realtime API, Gemini Live), Whisper transcription, ElevenLabs voice cloning, vision reasoning, and video generation APIs.",
    learningOutcomes: [
      "Connect WebRTC real-time voice streaming with ultra-low latency (<300ms)",
      "Build visual document inspection and video analysis pipelines",
      "Integrate neural text-to-speech with natural cadence and emotion",
      "Implement multi-modal safety filtering and content moderation"
    ],
    type: "Course",
    category: "Generative AI",
    tags: ["Multimodal", "Voice AI", "Computer Vision", "Realtime API"],
    provider: "AI Orbit Academy",
    author: "Elena Rostova",
    authorBio: "Principal AI Engineer and researcher specializing in language model alignment and prompt optimization architectures.",
    level: "Advanced",
    duration: "7 hours",
    format: "Video course & live code repository",
    price: "Paid",
    rating: 4.9,
    reviewCount: 470,
    thumbnail: "/resources/multimodal.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Intermediate JavaScript or Python", "WebSockets / WebRTC familiarity"],
    targetAudience: ["AI Engineers", "Creative Technologists", "Product Innovators"],
    curriculum: [],
    reviews: []
  },

  {
    id: "16",
    slug: "ai-safety-and-alignment",
    title: "AI Safety, Red-Teaming & Model Alignment",
    description: "A deep dive into constitutional AI, RLHF, DPO, automated red-teaming, and model jailbreak defenses.",
    overview: "Understand the ethical, technical, and regulatory landscape of safe AI deployment. Learn Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), automated red-teaming harnesses, prompt injection mitigation, and alignment evaluations.",
    learningOutcomes: [
      "Understand RLHF, DPO, and KTO alignment algorithms",
      "Run automated red-teaming scripts to identify prompt vulnerabilities",
      "Implement input/output guardrails using Llama Guard and NeMo Guardrails",
      "Comply with global AI regulatory standards and safety benchmarks"
    ],
    type: "Guide",
    category: "Machine Learning",
    tags: ["AI Safety", "Alignment", "RLHF", "Security", "Ethics"],
    provider: "AI Orbit Research",
    author: "Dr. Rachel Chen",
    authorBio: "Computer Vision Researcher with 15+ publications in CVPR and ICCV.",
    level: "Advanced",
    duration: "5 hours",
    format: "Written research guide & test harnesses",
    price: "Free",
    rating: 4.8,
    reviewCount: 390,
    thumbnail: "/resources/ai-safety.jpg",
    websiteUrl: "https://aiorbit.club/learn",
    featured: false,
    language: "English",
    prerequisites: ["Machine learning fundamentals", "Understanding of LLM training"],
    targetAudience: ["Security Researchers", "AI Governance Officers", "ML Engineers"],
    curriculum: [],
    reviews: []
  }
];
`;

fs.writeFileSync('data/roadmaps.ts', roadmapsContent, 'utf-8');
console.log('Successfully written data/roadmaps.ts');

fs.writeFileSync('data/resources.ts', resourcesContent, 'utf-8');
console.log('Successfully written data/resources.ts');

const serviceContent = `import { prisma } from "@/lib/prisma";
import { resources as staticResources } from "@/data/resources";
import type {
  LearningResource,
  ResourceLevel,
  ResourcePrice,
  ResourceType,
  ResourceReview,
} from "@/types/resources";

// In-memory store for newly submitted resources or runtime updates if DB is unavailable
let memoryResources: LearningResource[] = [...staticResources];

export interface ResourceFilters {
  search?: string;
  type?: string;
  category?: string;
  level?: string;
  price?: string;
  featured?: boolean;
  sort?: "popular" | "rating" | "newest" | "duration";
}

export async function getAllResources(
  filters: ResourceFilters = {}
): Promise<LearningResource[]> {
  try {
    const where: any = {};

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { category: { contains: filters.search, mode: "insensitive" } },
        { provider: { contains: filters.search, mode: "insensitive" } },
        { author: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters.type && filters.type !== "All") {
      where.type = filters.type;
    }

    if (filters.category && filters.category !== "All") {
      where.category = filters.category;
    }

    if (filters.level && filters.level !== "All") {
      where.level = filters.level;
    }

    if (filters.price && filters.price !== "All") {
      where.price = filters.price;
    }

    if (typeof filters.featured === "boolean") {
      where.featured = filters.featured;
    }

    const dbPromise = prisma.resource.findMany({
      where,
      orderBy:
        filters.sort === "rating"
          ? { rating: "desc" }
          : filters.sort === "newest"
          ? { createdAt: "desc" }
          : { reviewCount: "desc" },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const dbResults = await Promise.race([dbPromise, timeoutPromise]);

    if (dbResults && dbResults.length > 0) {
      // Merge with memory curriculum / reviews for richer details
      return dbResults.map((item) => {
        const match = memoryResources.find((m) => m.slug === item.slug);
        return {
          ...(item as unknown as LearningResource),
          curriculum: match?.curriculum || [],
          reviews: match?.reviews || [],
          prerequisites: match?.prerequisites || [],
          targetAudience: match?.targetAudience || [],
        };
      });
    }
  } catch {
    // DB not reachable or timed out, gracefully fall back to memory
  }

  // Fallback memory filtering
  let results = [...memoryResources];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.provider.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.type && filters.type !== "All") {
    results = results.filter((r) => r.type === filters.type);
  }

  if (filters.category && filters.category !== "All") {
    results = results.filter((r) => r.category === filters.category);
  }

  if (filters.level && filters.level !== "All") {
    results = results.filter((r) => r.level === filters.level);
  }

  if (filters.price && filters.price !== "All") {
    results = results.filter((r) => r.price === filters.price);
  }

  if (typeof filters.featured === "boolean") {
    results = results.filter((r) => r.featured === filters.featured);
  }

  if (filters.sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (filters.sort === "newest") {
    results.sort((a, b) => Number(b.id) - Number(a.id));
  } else {
    results.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return results;
}

export async function getResourceBySlug(
  slug: string
): Promise<LearningResource | null> {
  try {
    const dbPromise = prisma.resource.findUnique({
      where: { slug },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const resource = await Promise.race([dbPromise, timeoutPromise]);
    if (resource) {
      const match = memoryResources.find((r) => r.slug === slug);
      return {
        ...(resource as unknown as LearningResource),
        curriculum: match?.curriculum || [],
        reviews: match?.reviews || [],
        prerequisites: match?.prerequisites || [],
        targetAudience: match?.targetAudience || [],
      };
    }
  } catch {
    // DB not reachable, fall back to memory
  }

  const found = memoryResources.find((r) => r.slug === slug);
  return found || null;
}

export async function getRelatedResources(
  resource: LearningResource,
  limit = 3
): Promise<LearningResource[]> {
  try {
    const dbPromise = prisma.resource.findMany({
      where: {
        AND: [
          { id: { not: resource.id } },
          {
            OR: [
              { category: resource.category },
              { tags: { hasSome: resource.tags } },
            ],
          },
        ],
      },
      take: limit,
      orderBy: { rating: "desc" },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB Timeout")), 1200)
    );

    const related = await Promise.race([dbPromise, timeoutPromise]);
    if (related && related.length > 0) {
      return related as unknown as LearningResource[];
    }
  } catch {
    // Fall back to memory
  }

  return memoryResources
    .filter(
      (r) =>
        r.id !== resource.id &&
        (r.category === resource.category ||
          r.tags.some((t) => resource.tags.includes(t)))
    )
    .slice(0, limit);
}

export async function createResource(
  data: Omit<LearningResource, "id">
): Promise<LearningResource> {
  const newId = String(Date.now());
  const newResource: LearningResource = {
    ...data,
    id: newId,
    reviewCount: data.reviewCount || 0,
    rating: data.rating || 5.0,
    featured: data.featured || false,
    thumbnail: data.thumbnail || "/resources/ai-engineering.jpg",
    curriculum: data.curriculum || [],
    reviews: data.reviews || [],
    tags: data.tags && data.tags.length > 0 ? data.tags : [data.category],
  };

  try {
    await prisma.resource.create({
      data: {
        id: newResource.id,
        slug: newResource.slug,
        title: newResource.title,
        description: newResource.description,
        overview: newResource.overview,
        learningOutcomes: newResource.learningOutcomes,
        type: newResource.type as any,
        category: newResource.category,
        tags: newResource.tags,
        provider: newResource.provider,
        author: newResource.author,
        level: newResource.level as any,
        duration: newResource.duration,
        format: newResource.format,
        price: newResource.price as any,
        rating: newResource.rating,
        reviewCount: newResource.reviewCount,
        thumbnail: newResource.thumbnail,
        websiteUrl: newResource.websiteUrl,
        featured: newResource.featured,
      },
    });
  } catch (error) {
    console.warn("Prisma write fallback to in-memory:", error);
  }

  memoryResources = [newResource, ...memoryResources];
  return newResource;
}

export async function addReviewToResource(
  slug: string,
  review: Omit<ResourceReview, "id" | "date">
): Promise<boolean> {
  const target = memoryResources.find((r) => r.slug === slug);
  if (!target) return false;

  const newReview: ResourceReview = {
    ...review,
    id: "rev-" + Date.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };

  if (!target.reviews) {
    target.reviews = [];
  }
  target.reviews.unshift(newReview);
  target.reviewCount += 1;
  const total = target.reviews.reduce(
    (acc, curr) => acc + curr.rating,
    target.rating * 5
  );
  target.rating = Number((total / (target.reviews.length + 5)).toFixed(1));

  return true;
}
`;

fs.writeFileSync("lib/resourceService.ts", serviceContent, "utf-8");
console.log("Successfully written lib/resourceService.ts");


