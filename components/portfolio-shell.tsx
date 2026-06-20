"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RecruiterMode } from "@/components/recruiter-mode";
import {
  logicProjects,
  footerLinks,
  aiKnowledgeBase,
} from "@/data/portfolio";

const SKILLS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-learn",
  "Hugging Face", "FAISS", "LangChain", "OpenCV",
  "FastAPI", "Flask", "SQL", "Docker",
  "Computer Vision", "NLP", "Generative AI", "MLOps",
];

const CERTS = [
  { issuer: "Simplilearn", name: "Deep Learning" },
  { issuer: "AWS Skillbuilder", name: "Machine Learning" },
  { issuer: "IBM", name: "AI Fundamentals" },
  { issuer: "HP LIFE", name: "Data Science & Analytics" },
];

type ChatMessage = { role: "bot" | "user"; text: string };

function getAIReply(query: string): string {
  const cleanQuery = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ");
  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  const intents = [
    {
      id: "summary",
      phrases: ["who is saras", "tell me about yourself", "who are you", "saras ugale", "profile summary", "professional summary", "about yourself"],
      keywords: [
        { word: "saras", weight: 3 },
        { word: "ugale", weight: 3 },
        { word: "who", weight: 1 },
        { word: "about", weight: 1 },
        { word: "summary", weight: 2 },
        { word: "introduce", weight: 2 },
        { word: "introduction", weight: 2 },
        { word: "profile", weight: 2 },
        { word: "background", weight: 2 },
        { word: "bio", weight: 2 },
        { word: "engineer", weight: 1 },
        { word: "developer", weight: 1 }
      ],
      answer: "Saras Ugale is a results-driven **AI/ML Engineer** graduating in **July 2026** with a Bachelor's degree in Computer Science and Engineering (Artificial Intelligence) from **Nutan College of Engineering & Research, Pune**. He specializes in training deep architectures and deploying them as production-ready applications. His expertise spans **Computer Vision** (deepfake detection, signature biometrics), **Healthcare NLP** (ICD-10 medical coding), and **Generative AI**."
    },
    {
      id: "medicode",
      phrases: ["medicode", "medical coding", "icd-10", "icd 10", "icd10", "clinical intelligence", "medical assistant", "pubmed bert", "bio bert", "explainable ai", "xai", "google cloud vision", "cloud vision"],
      keywords: [
        { word: "medicode", weight: 5 },
        { word: "medical", weight: 4 },
        { word: "coding", weight: 4 },
        { word: "icd", weight: 5 },
        { word: "icd10", weight: 5 },
        { word: "biobert", weight: 4 },
        { word: "pubmedbert", weight: 4 },
        { word: "ocr", weight: 3 },
        { word: "prescription", weight: 3 },
        { word: "recall", weight: 2 },
        { word: "mrr", weight: 2 },
        { word: "ndcg", weight: 2 },
        { word: "faiss", weight: 3 },
        { word: "explanation", weight: 2 },
        { word: "explainable", weight: 3 },
        { word: "clinical", weight: 3 },
        { word: "healthcare", weight: 3 }
      ],
      answer: "**MediCode AI — Explainable ICD-10 Medical Coding Assistant**:\n\n" +
        "• **Overview**: Automates ICD-10 medical code recommendations from messy healthcare transcripts.\n" +
        "• **Metrics**: Achieved **95.10% Recall@5**, **93.80% MRR**, and **96.31% nDCG@5** on code retrieval tasks.\n" +
        "• **Architecture**: Uses BioBERT & PubMedBERT embeddings coupled with a FAISS vector database (IndexFlatL2) for semantic search. This retrieval-based approach avoids the need for retraining when new codes are added.\n" +
        "• **Features**: Integrates Google Cloud Vision OCR and PyMuPDF to extract text from handwritten prescriptions/scans. Features an Explainable AI (XAI) layer with LLM-generated reasoning, keyword highlighting, and confidence scores in a FastAPI dashboard."
    },
    {
      id: "deepshield",
      phrases: ["deepshield", "deepfake", "video detection", "deep fake", "resnext lstm", "resnext cnn", "celeb df", "celeb-df"],
      keywords: [
        { word: "deepshield", weight: 5 },
        { word: "deepfake", weight: 5 },
        { word: "video", weight: 4 },
        { word: "lstm", weight: 4 },
        { word: "resnext", weight: 4 },
        { word: "celeb", weight: 4 },
        { word: "accuracy", weight: 3 },
        { word: "temporal", weight: 3 },
        { word: "spatial", weight: 3 },
        { word: "forensics", weight: 3 },
        { word: "flask", weight: 2 }
      ],
      answer: "**DeepShield AI — Deepfake Video Detection System**:\n\n" +
        "• **Overview**: Detects AI-generated and manipulated faces in video sequences.\n" +
        "• **Metrics**: Achieved **87.0% classification accuracy** on the Celeb-DF v2 dataset.\n" +
        "• **Architecture**: Employs a hybrid **ResNeXt-CNN + LSTM** pipeline. ResNeXt-101 processes individual video frames to capture spatial anomalies, while LSTM models temporal inconsistencies across frame sequences.\n" +
        "• **Features**: Preprocessing pipeline uses OpenCV for face extraction, frame sampling, normalization, and sequence generation. Evaluated and benchmarked CNN-only vs CNN+LSTM models to validate sequential modeling. Deployed as a Flask web service for video uploads and real-time authenticity prediction."
    },
    {
      id: "signatrust",
      phrases: ["signatrust", "signature verification", "signature authentication", "siamese network", "contrastive loss", "triplet loss", "equal error rate", "eer", "skilled forgery", "forgery detection"],
      keywords: [
        { word: "signatrust", weight: 5 },
        { word: "signature", weight: 5 },
        { word: "signatures", weight: 5 },
        { word: "biometric", weight: 4 },
        { word: "siamese", weight: 4 },
        { word: "contrastive", weight: 4 },
        { word: "triplet", weight: 4 },
        { word: "eer", weight: 4 },
        { word: "forgeries", weight: 4 },
        { word: "forgery", weight: 4 },
        { word: "latency", weight: 3 },
        { word: "verification", weight: 3 },
        { word: "authentication", weight: 3 }
      ],
      answer: "**SignaTrust AI — Biometric Signature Verification System**:\n\n" +
        "• **Overview**: Authenticates handwritten signatures and detects skilled forgeries.\n" +
        "• **Metrics**: Achieved **4.50% Equal Error Rate (EER)** and a **120ms inference latency**.\n" +
        "• **Architecture**: Implements a Siamese Neural Network with Contrastive Loss for representation/metric learning, minimises pairwise distances to distinguish genuine/forged signatures.\n" +
        "• **Features**: Overcomes severe class imbalance (few samples per user) and high intra-class variance. Applied elastic deformation and random shearing to simulate hand jitter. Preprocessing includes OpenCV resizing, denoising, and skeletonization."
    },
    {
      id: "skills",
      phrases: ["tech stack", "technical skills", "programming languages", "machine learning", "deep learning", "generative ai", "large language models", "llm", "data science", "computer vision", "nlp", "libraries"],
      keywords: [
        { word: "skills", weight: 3 },
        { word: "stack", weight: 3 },
        { word: "languages", weight: 2 },
        { word: "frameworks", weight: 2 },
        { word: "tools", weight: 2 },
        { word: "platforms", weight: 2 },
        { word: "technologies", weight: 2 },
        { word: "python", weight: 3 },
        { word: "pytorch", weight: 4 },
        { word: "tensorflow", weight: 4 },
        { word: "keras", weight: 4 },
        { word: "sql", weight: 3 },
        { word: "fastapi", weight: 3 },
        { word: "flask", weight: 3 },
        { word: "docker", weight: 3 },
        { word: "scikit", weight: 3 },
        { word: "pandas", weight: 2 },
        { word: "numpy", weight: 2 },
        { word: "matplotlib", weight: 2 },
        { word: "seaborn", weight: 2 },
        { word: "opencv", weight: 3 },
        { word: "faiss", weight: 3 },
        { word: "langchain", weight: 4 },
        { word: "hugging", weight: 4 },
        { word: "rag", weight: 4 }
      ],
      answer: "Saras Ugale's technical stack includes:\n\n" +
        "• **Languages & Frameworks**: Python, SQL, PyTorch, TensorFlow, Scikit-learn, Keras\n" +
        "• **ML/AI**: Supervised/Unsupervised Learning, CNNs, RNNs, LSTMs, Transformer Models\n" +
        "• **Generative AI & LLMs**: LangChain, Hugging Face, RAG, Fine-Tuning LLMs, Prompt Engineering\n" +
        "• **MLOps & Deployment**: Model Deployment, FastAPI, Flask, REST APIs, GitHub Actions, Docker\n" +
        "• **Data Science & Tools**: Feature Engineering, Data Preprocessing, Pandas, NumPy, Matplotlib, Seaborn, OpenCV, FAISS, Google Cloud Vision OCR, Git, AWS\n" +
        "• **Visualization**: Power BI, Tableau"
    },
    {
      id: "contact",
      phrases: ["phone number", "email address", "how to contact", "contact details", "get in touch", "phone", "email", "mobile", "contact information", "socials", "github", "linkedin"],
      keywords: [
        { word: "contact", weight: 4 },
        { word: "email", weight: 4 },
        { word: "phone", weight: 4 },
        { word: "mobile", weight: 4 },
        { word: "number", weight: 3 },
        { word: "call", weight: 3 },
        { word: "reach", weight: 3 },
        { word: "address", weight: 3 },
        { word: "linkedin", weight: 4 },
        { word: "github", weight: 4 },
        { word: "git", weight: 2 },
        { word: "social", weight: 3 },
        { word: "socials", weight: 3 },
        { word: "location", weight: 3 },
        { word: "pune", weight: 3 }
      ],
      answer: "You can reach Saras Ugale directly through the following channels:\n\n" +
        "• **Email**: [sarasugale@gmail.com](mailto:sarasugale@gmail.com)\n" +
        "• **Phone**: +91 9284666670\n" +
        "• **LinkedIn**: [linkedin.com/in/saras-ugale](https://linkedin.com/in/saras-ugale)\n" +
        "• **GitHub**: [github.com/SarasUgale](https://github.com/SarasUgale)\n\n" +
        "He is based in Pune, India (open to relocation) and is immediately available for interview calls, AI/ML junior engineer roles, and internships."
    },
    {
      id: "education",
      phrases: ["where did he study", "college degree", "academic background", "what college", "ncer pune", "when does he graduate", "what degree", "what GPA", "what score"],
      keywords: [
        { word: "education", weight: 4 },
        { word: "college", weight: 4 },
        { word: "university", weight: 4 },
        { word: "degree", weight: 4 },
        { word: "btech", weight: 4 },
        { word: "ncer", weight: 4 },
        { word: "graduation", weight: 3 },
        { word: "graduate", weight: 3 },
        { word: "gpa", weight: 2 },
        { word: "cgpa", weight: 2 },
        { word: "dbatu", weight: 3 },
        { word: "pune", weight: 2 },
        { word: "study", weight: 2 },
        { word: "studied", weight: 2 }
      ],
      answer: "Saras Ugale's educational details:\n\n" +
        "• **Degree**: Bachelor of Engineering (B.Tech) in Computer Science and Engineering (Artificial Intelligence)\n" +
        "• **Duration**: January 2022 - July 2026\n" +
        "• **Institution**: Nutan College of Engineering & Research, Pune\n" +
        "• **Affiliation**: DBATU (Dr. Babasaheb Ambedkar Technological University)\n" +
        "• **Note on GPA**: His GPA is not explicitly listed on his resume, but he has built multiple high-end projects in computer vision and NLP as part of his academic coursework."
    },
    {
      id: "certifications",
      phrases: ["aws certification", "simplilearn deep learning", "ibm course", "british airways simulation", "anthropic certificate", "hp life data science", "what certifications", "credentials"],
      keywords: [
        { word: "certifications", weight: 4 },
        { word: "certification", weight: 4 },
        { word: "certificates", weight: 4 },
        { word: "certificate", weight: 4 },
        { word: "credential", weight: 3 },
        { word: "courses", weight: 3 },
        { word: "course", weight: 3 },
        { word: "aws", weight: 4 },
        { word: "ibm", weight: 4 },
        { word: "simplilearn", weight: 4 },
        { word: "forage", weight: 3 },
        { word: "anthropic", weight: 4 },
        { word: "hp", weight: 3 }
      ],
      answer: "Saras has completed these professional certifications & simulations:\n\n" +
        "1. **AWS Machine Learning Learning Plan** (AWS Skill Builder)\n" +
        "2. **Deep Learning for Beginners** (Simplilearn)\n" +
        "3. **AI Fundamentals: Language and Vision in AI** (IBM)\n" +
        "4. **British Airways - Data Science Job Simulation** (Forage)\n" +
        "5. **AI Fluency Framework Foundations certificate** (Anthropic)\n" +
        "6. **Data Science & Analytics** (HP LIFE - Credential ID: `948f9456-efed-4159-aded-3f7024f0afce`)"
    },
    {
      id: "projects_list",
      phrases: ["what projects", "list projects", "project list", "tell me about your projects", "portfolio projects", "project work", "experience"],
      keywords: [
        { word: "projects", weight: 3 },
        { word: "work", weight: 2 },
        { word: "builds", weight: 2 },
        { word: "portfolio", weight: 2 },
        { word: "list", weight: 2 },
        { word: "experience", weight: 2 }
      ],
      answer: "Saras Ugale has built three major portfolio projects:\n\n" +
        "1. **MediCode AI**: An Explainable ICD-10 Medical Coding Assistant achieving **95.10% Recall@5** using BioBERT, PubMedBERT, FAISS, and Google Cloud Vision OCR.\n" +
        "2. **DeepShield AI**: A Deepfake Video Detection System achieving **87.0% classification accuracy** using a ResNeXt-CNN + LSTM architecture.\n" +
        "3. **SignaTrust AI**: A Biometric Signature Verification System achieving **4.50% Equal Error Rate (EER)** using Siamese Networks and Contrastive Loss.\n\n" +
        "You can ask me questions about any of these (e.g. 'How does MediCode AI work?' or 'What is DeepShield accuracy?')."
    },
    {
      id: "resume",
      phrases: ["download resume", "download cv", "get resume", "view resume", "where is your resume", "see resume", "pdf resume"],
      keywords: [
        { word: "resume", weight: 5 },
        { word: "cv", weight: 5 },
        { word: "pdf", weight: 4 },
        { word: "download", weight: 4 },
        { word: "view", weight: 3 },
        { word: "get", weight: 2 }
      ],
      answer: "You can download Saras Ugale's full PDF Resume directly [here](/Saras_Ugale_Resume.pdf). Alternatively, you can click the **⚡ Recruiter View** button at the top right of the page to open a quick-scan interactive view of his qualifications and metrics."
    }
  ];

  let bestIntent: typeof intents[0] | null = null;
  let maxScore = 0;

  for (const intent of intents) {
    let score = 0;

    // Check exact phrases
    if (intent.phrases) {
      for (const phrase of intent.phrases) {
        if (cleanQuery.includes(phrase)) {
          score += 10;
        }
      }
    }

    // Check individual keywords
    for (const kw of intent.keywords) {
      if (tokens.includes(kw.word)) {
        score += kw.weight;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  // Threshold check
  if (bestIntent && maxScore >= 2) {
    return bestIntent.answer;
  }

  // Conversational fallbacks
  const greetingKeywords = ["hi", "hello", "hey", "greetings", "yo", "sup"];
  if (tokens.some(t => greetingKeywords.includes(t))) {
    return "Hello! I am Saras's AI Assistant. Ask me anything about his projects (MediCode AI, DeepShield AI, SignaTrust AI), technical skills, certifications, education, or how to contact him.";
  }

  return "I can answer specific questions about Saras's projects, skills, education, certifications, and contact details. Try asking: \n" +
    "• 'Tell me about MediCode AI'\n" +
    "• 'What is his stack?'\n" +
    "• 'How can I contact Saras?'\n" +
    "• 'AWS or IBM certifications?'\n" +
    "• 'Can I download his resume?'";
}

function InlineChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! Ask me anything about Saras — his projects, stack, or background.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const q = input.trim();
    if (!q) return;
    const reply = getAIReply(q);
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      { role: "bot", text: reply },
    ]);
    setInput("");
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-dot" />
        <span className="chat-label">Ask AI · Saras&apos;s Portfolio</span>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about projects, skills…"
        />
        <button className="chat-send" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function PortfolioShell() {
  const [activeId, setActiveId] = useState(logicProjects[0].id);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const activeProject =
    logicProjects.find((p) => p.id === activeId) ?? logicProjects[0];

  /* ── Always start at the top of the page ── */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ─── NAV ──────────────────────────────────────────── */}
      <nav className="nav">
        <span className="nav-logo">Saras Ugale</span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className="nav-cta"
          onClick={() => setRecruiterOpen(true)}
        >
          ⚡ Recruiter View
        </button>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section id="home">
        <div className="hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", paddingTop: "7rem", paddingBottom: "5rem" }}>
          {/* Left */}
          <div>
            <motion.p
              className="hero-eyebrow"
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
            >
              AI / ML Engineer · Open to Opportunities
            </motion.p>

            <motion.h1
              className="hero-name"
              initial="hidden"
              animate="show"
              custom={0.08}
              variants={fadeUp}
            >
              SARAS<br />UGALE
            </motion.h1>

            <motion.p
              className="hero-title"
              initial="hidden"
              animate="show"
              custom={0.16}
              variants={fadeUp}
            >
              Building production-grade intelligent systems<br />
              with PyTorch, NLP &amp; Computer Vision.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial="hidden"
              animate="show"
              custom={0.22}
              variants={fadeUp}
            >
              <a href="#work">
                <button className="btn-primary">View Work</button>
              </a>
              <a href="mailto:sarasugale@gmail.com" target="_blank" rel="noreferrer">
                <button className="btn-ghost">Get in Touch</button>
              </a>
              <a href="https://linkedin.com/in/saras-ugale" target="_blank" rel="noreferrer">
                <button className="btn-ghost">LinkedIn ↗</button>
              </a>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial="hidden"
              animate="show"
              custom={0.3}
              variants={fadeUp}
            >
              <div className="stat-item">
                <div className="stat-value">95.1%</div>
                <div className="stat-label">Recall@5 · NLP</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">87%</div>
                <div className="stat-label">Accuracy · CV</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.5%</div>
                <div className="stat-label">EER · Biometric</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Jul '26</div>
                <div className="stat-label">Graduation</div>
              </div>
            </motion.div>
          </div>

          {/* Right — Workspace visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              aspectRatio: "4/5",
              border: "1px solid var(--border)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,200,0.06)"
            }}
          >
            <Image
              src="/images/hero_workspace.png"
              alt="AI developer workspace"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            {/* Overlay gradient at bottom */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,10,11,0.7) 0%, transparent 50%)",
              pointerEvents: "none"
            }} />
            {/* Floating status badge */}
            <div style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              right: "1.5rem",
              background: "rgba(10,10,11,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "1rem 1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-primary)", fontWeight: 600, letterSpacing: "0.04em" }}>Open to Opportunities</div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 2 }}>Graduating July 2026 · Pune, India</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="section">
        <p className="section-label">About</p>
        <h2 className="section-heading">
          Engineering clarity<br />from complex data.
        </h2>
        <div className="about-grid">
          <div>
            <p className="about-text">
              I&apos;m a final-year <span className="about-highlight">B.Tech CSE-AI student at NCER, Pune</span>, graduating July 2026. I specialize in training deep neural architectures and deploying them as production-ready APIs.
            </p>
            <br />
            <p className="about-text">
              My work spans <span className="about-highlight">Computer Vision</span> (deepfake detection, signature biometrics), <span className="about-highlight">Healthcare NLP</span> (ICD-10 medical coding), and <span className="about-highlight">Generative AI</span>. I care deeply about explainability — a model only matters if it can be trusted.
            </p>
            <br />
            <p className="about-text">
              I&apos;m actively looking for <span className="about-highlight">AI/ML internships and junior engineer roles</span> where I can contribute to real-world products.
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Core Stack
            </p>
            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <div key={skill} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────── */}
      <section id="work" className="section">
        <p className="section-label">Selected Work</p>
        <h2 className="section-heading">
          Projects that prove<br />how I think.
        </h2>

        <div className="project-tabs">
          {logicProjects.map((p) => (
            <button
              key={p.id}
              className={`tab-btn ${activeId === p.id ? "active" : ""}`}
              onClick={() => setActiveId(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="project-card"
          >
            {/* Left */}
            <div>
              <p className="project-category">{activeProject.category}</p>
              <h3 className="project-name">{activeProject.label}</h3>
              <p className="project-summary">{activeProject.summary}</p>

              <div className="project-metrics">
                {activeProject.metrics.map((m) => (
                  <div key={m.label} className="metric-item">
                    <span className="metric-val">{m.value}</span>
                    <span className="metric-key">{m.label}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>
                Stack
              </p>
              <div className="stack-tags" style={{ marginBottom: "1.5rem" }}>
                {activeProject.stack.map((s) => (
                  <span key={s} className="stack-tag">{s}</span>
                ))}
              </div>

              <div style={{ marginTop: "1.8rem" }}>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.65rem 1.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderRadius: "99px",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    background: "rgba(255,255,255,0.02)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "rgba(0, 212, 200, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" style={{ width: "15px", height: "15px" }}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  View on GitHub ↗
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="project-right">
              <div className="arch-block">
                <p className="arch-title">Architecture</p>
                <div className="arch-steps">
                  {activeProject.architecture.map((line, i) => (
                    <div key={i} className="arch-step">
                      <span className="arch-num">0{i + 1}</span>
                      <span className="arch-text">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project image */}
              <div style={{
                position: "relative",
                borderRadius: "14px",
                overflow: "hidden",
                aspectRatio: "16/10",
                border: "1px solid var(--border)"
              }}>
                <Image
                  src={`/images/project_${{
                    "deepfake-detection": "deepshield",
                    "medical-coding": "medicode",
                    "signature-verification": "signatrust",
                  }[activeProject.id] ?? activeProject.id}.png`}
                  alt={activeProject.label}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,11,0.55) 0%, transparent 60%)",
                  pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  background: "rgba(10,10,11,0.7)",
                  backdropFilter: "blur(8px)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "99px",
                  border: "1px solid rgba(0,212,200,0.2)"
                }}>
                  {activeProject.category}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── AI CHAT ──────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: "3rem" }}>
        <p className="section-label">AI Assistant</p>
        <h2 className="section-heading" style={{ marginBottom: "2rem" }}>
          Ask anything about Saras.
        </h2>
        <div style={{ maxWidth: "640px" }}>
          <InlineChat />
        </div>
      </section>

      {/* ─── EDUCATION & EXPERIENCE ───────────────────────── */}
      <section id="experience" className="section">
        <p className="section-label">Background</p>
        <h2 className="section-heading">
          Education &amp;<br />Experience
        </h2>

        <div>
          <div className="exp-row">
            <div className="exp-period">Jan 2022 – Jul 2026</div>
            <div>
              <div className="exp-title">B.Tech — CSE (Artificial Intelligence)</div>
              <div className="exp-org">Nutan College of Engineering &amp; Research, Pune</div>
              <div className="exp-desc">
                Specialized in deep learning, computer vision, and natural language processing.
                Built three end-to-end AI products as major academic projects.
              </div>
            </div>
          </div>

          <div className="exp-row">
            <div className="exp-period">Feb – Jun 2025</div>
            <div>
              <div className="exp-title">DeepShield AI — CV Deepfake Detection</div>
              <div className="exp-org">Academic Project</div>
              <div className="exp-desc">
                ResNeXt + LSTM hybrid pipeline for video deepfake detection. 87% accuracy on Celeb-DF. Deployed as Flask web app.
              </div>
            </div>
          </div>

          <div className="exp-row">
            <div className="exp-period">Aug – Dec 2025</div>
            <div>
              <div className="exp-title">MediCode AI — Healthcare NLP</div>
              <div className="exp-org">Academic Project</div>
              <div className="exp-desc">
                Explainable ICD-10 medical coding with BioBERT + FAISS. Achieved 95.1% Recall@5.
                FastAPI backend with Google Cloud Vision OCR pipeline.
              </div>
            </div>
          </div>

          <div className="exp-row">
            <div className="exp-period">Jan – May 2026</div>
            <div>
              <div className="exp-title">SignaTrust AI — Biometric Signature Verification</div>
              <div className="exp-org">Academic Project</div>
              <div className="exp-desc">
                Siamese Neural Network for handwritten signature authentication. 4.5% Equal Error Rate using Contrastive Loss metric learning.
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", margin: "3rem 0 1.2rem" }}>
          Certifications
        </p>
        <div className="cert-grid">
          {CERTS.map((c) => (
            <div key={c.name} className="cert-card">
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-name">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <motion.h2
          className="contact-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          LET&apos;S<br />CONNECT.
        </motion.h2>
        <p className="contact-sub">
          Available for AI/ML internships and junior engineer roles.<br />
          Graduating July 2026 — ready to contribute immediately.
        </p>
        <div className="contact-links">
          <a href="mailto:sarasugale@gmail.com" className="contact-link">
            sarasugale@gmail.com ↗
          </a>
          <a
            href="https://linkedin.com/in/saras-ugale"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/SarasUgale"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          © 2026 Saras Ugale. Designed to get interview calls.
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>

      {/* ─── RECRUITER MODAL ──────────────────────────────── */}
      <AnimatePresence>
        {recruiterOpen && (
          <RecruiterMode
            isOpen={recruiterOpen}
            onClose={() => setRecruiterOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
