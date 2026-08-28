import type { LearningRoadmap } from "@/types/resources";

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
