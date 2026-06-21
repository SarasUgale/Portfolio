export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectSection = {
  title: string;
  lines: string[];
};

export type LogicProject = {
  id: string;
  label: string;
  category: string;
  window: string;
  summary: string;
  stack: string[];
  metrics: ProjectMetric[];
  architecture: string[];
  challenges: string[];
  experiments: string[];
  snippet: string;
  chart: number[];
  rationale: ProjectSection[];
  linkTo: string;
  githubUrl: string;
};

export type BuildPillar = {
  title: string;
  description: string;
  accent: string;
};

export type TimelineItem = {
  window: string;
  title: string;
  detail: string;
};

export type PersonalWidget = {
  title: string;
  value: string;
  note: string;
};

export type LifeFrame = {
  id: string;
  title: string;
  caption: string;
  tag: string;
};

export type QAEntry = {
  keywords: string[];
  answer: string;
};

export const heroMetrics = [
  { label: "Core Domains", value: "CV, NLP & Generative AI" },
  { label: "Best Metric", value: "95.1% Recall@5 (NLP)" },
  { label: "Status", value: "Open for Interviews / Internships" },
  { label: "Expected Graduation", value: "July 2026 (B.Tech CSE-AI)" }
];

export const buildPillars: BuildPillar[] = [
  {
    title: "AI Product Builder",
    description:
      "I don't just train models in Jupyter Notebooks. I build end-to-end products: from custom data pipelines to high-performance FastAPI/Flask backends and production deployments.",
    accent: "from-[#8BD3C7] to-[#4C7AF2]"
  },
  {
    title: "Explainable ML Advocate",
    description:
      "A raw prediction is useless without trust. I focus heavily on embedding explainability (XAI) features, evidence extraction, and intuitive confidence metrics into user interfaces.",
    accent: "from-[#F4B183] to-[#E98074]"
  },
  {
    title: "Rigorous Evaluator",
    description:
      "I design rigorous testing routines: evaluating model options (e.g. ResNeXt vs ResNet, embedding similarity searches) and tracking key metrics like Recall@K, EER, and latency.",
    accent: "from-[#B7B7E8] to-[#7665D6]"
  }
];

export const logicProjects: LogicProject[] = [
  {
    id: "deepfake-detection",
    label: "DeepShield AI",
    category: "Computer Vision",
    window: "Feb 2025 - Jun 2025",
    summary:
      "A hybrid spatial-temporal Deep Learning video forensics system designed to detect AI-generated and manipulated faces. Leverages ResNeXt for frame-level feature encoding and an LSTM network for sequence analysis.",
    stack: ["PyTorch", "ResNeXt", "LSTM", "OpenCV", "Flask", "MLOps"],
    metrics: [
      { label: "Accuracy", value: "87.0%" },
      { label: "Dataset", value: "Celeb-DF" },
      { label: "Deployment", value: "Flask Web App" }
    ],
    architecture: [
      "Face detection and frame cropping via OpenCV Haar/MTCNN",
      "Spatial feature extraction using pretrained ResNeXt-CNN",
      "Temporal pattern modeling using Long Short-Term Memory (LSTM)",
      "Flask-based web wrapper for uploading and analyzing videos"
    ],
    challenges: [
      "Spatial artifacts (like mismatched eye color) were easily missed by simple CNNs on low-res frames.",
      "Temporal flickering was ignored by static classifiers, necessitating sequence-based modeling."
    ],
    experiments: [
      "Compared ResNet-50 vs ResNeXt; ResNeXt improved spatial classification accuracy by 4.2%.",
      "Swapped GRU for LSTM; LSTM demonstrated better retention of long-range inter-frame discrepancies."
    ],
    snippet: `import torch\nimport torch.nn as nn\n\nclass DeepShieldNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.cnn = resnext101_32x8d(pretrained=True)\n        self.lstm = nn.LSTM(2048, 256, num_layers=2, batch_first=True)\n        self.fc = nn.Linear(256, 1)\n\n    def forward(self, x):\n        # x shape: (batch, frames, channels, h, w)\n        batch_size, timesteps, C, H, W = x.size()\n        c_in = x.view(batch_size * timesteps, C, H, W)\n        c_out = self.cnn(c_in)\n        r_in = c_out.view(batch_size, timesteps, -1)\n        r_out, _ = self.lstm(r_in)\n        return torch.sigmoid(self.fc(r_out[:, -1, :]))`,
    chart: [0.95, 0.88, 0.72, 0.58, 0.44, 0.32, 0.21],
    rationale: [
      {
        title: "Why this mattered",
        lines: [
          "Demonstrates competence in video handling, sequential modeling, and building complex vision pipelines.",
          "Moves beyond generic classification into advanced temporal and facial alignment tasks."
        ]
      },
      {
        title: "What it proves",
        lines: [
          "I know how to manage memory constraints with 3D batching under PyTorch.",
          "I build user-facing wrappers for complex models rather than stopping at test metrics."
        ]
      }
    ],
    linkTo: "medical-coding",
    githubUrl: "https://github.com/SarasUgale/DeepShield-AI"
  },
  {
    id: "medical-coding",
    label: "MediCode AI",
    category: "Healthcare NLP",
    window: "Aug 2025 - Dec 2025",
    summary:
      "An explainable clinical intelligence assistant automating ICD-10 medical code recommendations from messy healthcare transcripts. Combines PubMedBERT/BioBERT embedding search with a FAISS vector database.",
    stack: ["Python", "BioBERT", "FAISS", "FastAPI", "Google Cloud Vision OCR", "XAI"],
    metrics: [
      { label: "Recall@5", value: "95.10%" },
      { label: "nDCG@5", value: "96.31%" },
      { label: "Mean Reciprocal Rank", value: "93.80%" }
    ],
    architecture: [
      "Document ingestion and processing via Google Cloud Vision OCR",
      "Entity extraction and contextual embedding via PubMedBERT/BioBERT",
      "Similarity search & indexing via FAISS with cosine distance metrics",
      "FastAPI backend delivering explainability feedback and code-evidence alignment"
    ],
    challenges: [
      "Messy clinical formatting, spelling errors, and medical jargon degraded search precision.",
      "Auditable decisions are mandatory; clinical reviewers will reject opaque black-box recommendations."
    ],
    experiments: [
      "Replaced standard TF-IDF matcher with BioBERT embeddings, raising Recall@5 from 78.3% to 95.1%.",
      "Tuned FAISS index structures (IVFFlat vs FlatL2) to optimize query response times to <80ms."
    ],
    snippet: `from transformers import AutoTokenizer, AutoModel\nimport faiss\n\n# Load BioBERT embeddings\ntokenizer = AutoTokenizer.from_pretrained("dmis-lab/biobert-v1.1")\nmodel = AutoModel.from_pretrained("dmis-lab/biobert-v1.1")\n\n# Build FAISS Flat L2 Index for ICD-10 codes\nindex = faiss.IndexFlatL2(768)  # 768-dim BioBERT vector\nindex.add(icd_embeddings) # Ingest medical code database\nD, I = index.search(query_embedding, k=5)  # Find top 5 candidates`,
    chart: [0.98, 0.81, 0.65, 0.47, 0.31, 0.18, 0.08],
    rationale: [
      {
        title: "Why this mattered",
        lines: [
          "Demonstrates high-fidelity NLP retrieval, custom index structuring, and domain-specific vocabulary handling.",
          "Bridges semantic search and generative explanations for auditability."
        ]
      },
      {
        title: "What it proves",
        lines: [
          "I can tackle compliance-bound workflows where reliability must be mathematically backed.",
          "I have practical experience with OCR pipelines and vector search indexing."
        ]
      }
    ],
    linkTo: "signature-verification",
    githubUrl: "https://github.com/SarasUgale/MediCode-AI-Explainable-ICD-10-Medical-Coding-Assistant"
  },
  {
    id: "signature-verification",
    label: "SignaTrust AI",
    category: "Biometric Vision",
    window: "Jan 2026 - May 2026",
    summary:
      "A biometric security system designed to authenticate handwritten signatures and detect skilled forgeries. Employs a Siamese Neural Network to compare sample pairs and compute metric similarity.",
    stack: ["PyTorch", "Siamese Network", "Contrastive Loss", "OpenCV", "Augmentation"],
    metrics: [
      { label: "Equal Error Rate", value: "4.50%" },
      { label: "Inference Latency", value: "120ms" },
      { label: "Task Shape", value: "Metric Learning" }
    ],
    architecture: [
      "Image preprocessing (resizing, denoising, and skeletonization)",
      "Siamese twin CNN branch for learning scale-invariant representation vectors",
      "Contrastive Loss minimization to separate genuine/forged feature clusters",
      "Pairwise distance calculation thresholding for final authentication"
    ],
    challenges: [
      "Severe class imbalance: very few genuine samples per user, making traditional CNN classifiers overfit.",
      "High intra-class variation: user signatures change naturally based on posture, mood, or pen type."
    ],
    experiments: [
      "Compared Triplet Loss vs Contrastive Loss; Contrastive Loss converged faster and reduced EER by 1.2%.",
      "Applied aggressive elastic deformation and random shearing during pair generation to simulate hand jitter."
    ],
    snippet: `import torch.nn.functional as F\n\nclass SiameseNetwork(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.feature_extractor = nn.Sequential(\n            nn.Conv2d(1, 32, 5), nn.ReLU(), nn.MaxPool2d(2, 2),\n            nn.Conv2d(32, 64, 5), nn.ReLU(), nn.MaxPool2d(2, 2)\n        )\n        self.fc = nn.Linear(64 * 22 * 22, 128)\n\n    def forward_once(self, x):\n        output = self.feature_extractor(x)\n        output = output.view(output.size()[0], -1)\n        return self.fc(output)\n\n    def forward(self, input1, input2):\n        output1 = self.forward_once(input1)\n        output2 = self.forward_once(input2)\n        return output1, output2 # Calculate F.pairwise_distance in loss`,
    chart: [0.88, 0.70, 0.52, 0.35, 0.22, 0.14, 0.06],
    rationale: [
      {
        title: "Why this mattered",
        lines: [
          "Demonstrates proficiency in metric learning, specialized loss functions, and image data engineering.",
          "Solves a high-stakes banking and authentication scenario without relying on massive labeled datasets."
        ]
      },
      {
        title: "What it proves",
        lines: [
          "I understand representation learning and feature embeddings.",
          "I can preprocess noisy scans into clean, binary structural representations."
        ]
      }
    ],
    linkTo: "deepfake-detection",
    githubUrl: "https://github.com/SarasUgale/SignaTrust_AI-Smart_Signature_Authentication_Platform."
  }
];

export const processTimeline: TimelineItem[] = [
  {
    window: "01",
    title: "Frame & Scope",
    detail: "I begin by detailing the user friction, input format, output target, and deployment constraints."
  },
  {
    window: "02",
    title: "Data Preparation",
    detail: "I clean and restructure data, select domain-specific embeddings (e.g. BioBERT), and build augmentation loops."
  },
  {
    window: "03",
    title: "Model Exploration",
    detail: "I experiment with architectures (e.g. ResNeXt, Siamese nets) and compare loss functions under resource limits."
  },
  {
    window: "04",
    title: "System Integration",
    detail: "I bundle models into lightweight FastAPI/Flask microservices and implement clean UI review components."
  }
];

export const valuesStories = [
  {
    level: 0,
    title: "Technical Excellence",
    body: "Evaluating model structures carefully rather than blindly choosing the largest parameter weights."
  },
  {
    level: 50,
    title: "Collaboration & Delivery",
    body: "Working across boundaries to turn model logic into deployed, readable APIs."
  },
  {
    level: 100,
    title: "Precision & Metrics",
    body: "Focusing on performance bounds (MRR, EER, Latency) to back up architectural claims."
  }
];

export const personalWidgets: PersonalWidget[] = [
  {
    title: "Academic Background",
    value: "B.Tech CSE-AI",
    note: "Nutan College of Engineering & Research (NCER). Graduating July 2026."
  },
  {
    title: "Certifications",
    value: "IBM, AWS, HP",
    note: "AI Fundamentals (IBM), Machine Learning (AWS), Data Science & Analytics (HP LIFE)."
  },
  {
    title: "Core Stack",
    value: "PyTorch & Python",
    note: "Daily drivers for building deep networks, preprocessing arrays, and training pipelines."
  },
  {
    title: "Primary Interests",
    value: "CV + NLP + GenAI",
    note: "Fascinated by bridging visual cues, semantic text structures, and generative reasoning."
  }
];

export const lifeFrames: LifeFrame[] = [
  {
    id: "setup",
    title: "01: The build deck.",
    caption: "Clean developer setup: Linux workflows, mechanical keys, and dark terminals for coding deep models.",
    tag: "Workspace"
  },
  {
    id: "coffee",
    title: "02: Brain initialization.",
    caption: "A strong espresso shot to bootstrap cognitive functions before writing recursive tensor scripts.",
    tag: "Ritual"
  },
  {
    id: "landscape",
    title: "03: Offline recovery.",
    caption: "Stepping away from monitors. Fresh air and long hikes help resolve debugging loops naturally.",
    tag: "Recovery"
  }
];

export const footerLinks = [
  { label: "Email", href: "mailto:sarasugale@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saras-ugale" },
  { label: "GitHub", href: "https://github.com/SarasUgale" }
];

export const aiKnowledgeBase: QAEntry[] = [
  {
    keywords: ["who", "are", "you", "about", "saras", "background"],
    answer: "Saras Ugale is an aspiring AI/ML Engineer graduating in July 2026 with a B.Tech in Computer Science Engineering (Artificial Intelligence) from NCER, Pune. He specializes in training deep networks (PyTorch/TensorFlow) and building production-ready applications with FastAPI, Flask, and FAISS."
  },
  {
    keywords: ["project", "projects", "work", "builds"],
    answer: "Saras has built three major portfolio projects: \n1. DeepShield AI (Deepfake detection using ResNeXt + LSTM)\n2. MediCode AI (Explainable medical coding using BioBERT + FAISS)\n3. SignaTrust AI (Signature verification using Siamese Neural Networks). Click on the projects dashboard to explore their architecture details!"
  },
  {
    keywords: ["deepshield", "deepfake", "video", "lstm", "resnext"],
    answer: "DeepShield AI is a deepfake detection system. It extracts video frames using OpenCV, passes them through a spatial CNN encoder (ResNeXt-101), and models temporal features across frames via an LSTM network. It achieves 87% accuracy on the Celeb-DF dataset and is deployed as a Flask web app."
  },
  {
    keywords: ["medicode", "medical", "coding", "nlp", "biobert", "faiss"],
    answer: "MediCode AI is an explainable ICD-10 medical coding assistant. It uses Google Cloud Vision OCR for text extraction, encodes clinical documents using PubMedBERT/BioBERT embeddings, and queries a FAISS vector database to retrieve the top-5 code suggestions. It achieves a Recall@5 of 95.10% and uses FastAPI."
  },
  {
    keywords: ["signatrust", "signature", "siamese", "contrastive"],
    answer: "SignaTrust AI is a biometric signature authentication platform. Since signature data is limited, it uses a Siamese Neural Network for metric learning rather than basic classification. It compares pairs of signatures using Contrastive Loss, achieving an Equal Error Rate (EER) of 4.5%."
  },
  {
    keywords: ["contact", "hire", "email", "linkedin", "github", "connect"],
    answer: "You can reach Saras at **sarasugale@gmail.com** or connect on [LinkedIn](https://linkedin.com/in/saras-ugale). His projects are available on [GitHub](https://github.com/SarasUgale). He is open for interview calls and AI/ML internships!"
  },
  {
    keywords: ["skills", "languages", "stack", "python", "pytorch"],
    answer: "Saras's stack includes Python, PyTorch, TensorFlow, Scikit-learn, Hugging Face, FAISS, LangChain, OpenCV, SQL, Flask, and FastAPI. He focuses on Computer Vision, NLP, and Generative AI."
  },
  {
    keywords: ["education", "college", "degree", "university", "ncer"],
    answer: "Saras is pursuing a B.Tech in Computer Science Engineering (Artificial Intelligence) at Nutan College of Engineering & Research (NCER), Pune (Jan 2022 - July 2026)."
  },
  {
    keywords: ["certifications", "credential", "verify", "aws", "ibm", "hp"],
    answer: "Saras holds certifications in:\n- Deep Learning (Simplilearn)\n- Machine Learning (AWS Skillbuilders)\n- AI Fundamentals (IBM)\n- Data Science & Analytics (HP LIFE - Credential ID: 948f9456-efed-4159-aded-3f7024f0afce)."
  },
  {
  keywords: ["experience", "work experience", "projects", "professional experience"],
  answer: "Saras is an aspiring AI/ML Engineer with project-based experience in deep learning, computer vision, NLP, and full-stack AI development. His notable projects include DeepShield AI (Deepfake Detection), MediCode AI (Medical Coding Assistant), and SignaTrust AI (Signature Verification), demonstrating expertise in PyTorch, TensorFlow, FastAPI, Flask, FAISS, and production-ready AI systems."
},
  
];
