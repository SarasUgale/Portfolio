"use client";

import { motion } from "framer-motion";

type RecruiterModeProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RecruiterMode({ isOpen, onClose }: RecruiterModeProps) {
  if (!isOpen) return null;

  const handleDownloadResume = () => {
    window.open("/Saras_Ugale_Resume.pdf", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl overflow-y-auto rounded-[2.3rem] border border-white/10 bg-[#0f111a] p-6 text-white shadow-2xl md:p-8 max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/5 p-2.5 text-gray-400 hover:bg-white/10 hover:text-white transition"
          aria-label="Close Recruiter Mode"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#8BD3C7]">
            Recruiter Mode Active 
          </span>
          <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">
            Saras Ugale
          </h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-gray-400">
            AI/ML Engineer • Graduating July 2026
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mt-6 border-l-2 border-[#4C7AF2] bg-[#4C7AF2]/5 p-4 rounded-r-xl">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#8BD3C7]">
            Core Value Pitch
          </p>
          <p className="mt-1.5 text-sm leading-6 text-gray-300">
            Bridges the gap between technical AI/ML modeling (PyTorch, CV, NLP) and product engineering. Builds fully functional backend microservices (FastAPI, Flask) and deployment workflows rather than stopping at local notebook training.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Quick Stats Grid */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#F4B183] border-b border-white/5 pb-2">
              Key Metrics & Profile
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-3.5">
                <span className="block font-mono text-[10px] text-gray-500 uppercase">Availability</span>
                <span className="mt-1 block text-sm font-semibold text-white">Immediate Interviews</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-3.5">
                <span className="block font-mono text-[10px] text-gray-500 uppercase">Education</span>
                <span className="mt-1 block text-sm font-semibold text-white">B.Tech CSE-AI</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-3.5">
                <span className="block font-mono text-[10px] text-gray-500 uppercase">Location</span>
                <span className="mt-1 block text-sm font-semibold text-white">Pune, India (Open to Relo)</span>
              </div>
              <div className="rounded-2xl bg-white/5 p-3.5">
                <span className="block font-mono text-[10px] text-gray-500 uppercase">Languages </span>
                <span className="mt-1 block text-sm font-semibold text-white">English , Hindi , Marathi</span>
              </div>
            </div>

            {/* Certifications Checklist */}
            <div className="rounded-2xl bg-white/5 p-4">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                Verified Certifications
              </h4>
              <div className="mt-3 space-y-2">
                {[
                  "AWS Machine Learning Specialization Path",
                  "IBM AI Fundamentals: Language & Vision",
                  "Simplilearn Deep Learning for Beginners",
                  "HP LIFE Data Science & Analytics",
                  "Anthropic AI Fluency Framework & Foundations",
                  "Forage Data Science Job Simulation"
                ].map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#8BD3C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grouped Skills Matrix */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#B7B7E8] border-b border-white/5 pb-2">
              Grouped Technical Stack
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">AI/ML & Deep Learning</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Hugging Face"].map((s) => (
                    <span key={s} className="rounded-full bg-[#B7B7E8]/10 px-3 py-1 font-mono text-[10px] text-[#B7B7E8]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">NLP & Large Language Models</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["BioBERT", "FAISS Vector DB", "LangChain", "RAG", "Cosine Similarity"].map((s) => (
                    <span key={s} className="rounded-full bg-[#8BD3C7]/10 px-3 py-1 font-mono text-[10px] text-[#8BD3C7]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Web, Database & MLOps</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["Python", "SQL", "FastAPI", "Flask", "OCR Ingestion", "MLOps"].map((s) => (
                    <span key={s} className="rounded-full bg-[#F4B183]/10 px-3 py-1 font-mono text-[10px] text-[#F4B183]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Builds Summary */}
        <div className="mt-8 border-t border-white/5 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
            Production-Grade Builds
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "MediCode AI",
                description: "Clinical ICD-10 Medical Coding Assistant with Explainable AI. Achieved 95.10% Recall@5 and 96.31% nDCG@5.",
                stack: "BioBERT, FAISS, FastAPI, Cloud Vision OCR"
              },
              {
                title: "DeepShield AI",
                description: "Deepfake Detection system built with ResNeXt + LSTM to analyze frame spatial anomalies & temporal inconsistencies.",
                stack: "PyTorch, LSTM, OpenCV, Flask web service"
              },
              {
                title: "SignaTrust AI",
                description: "Signature authentication metric learning system using Siamese Twin Networks and Contrastive Loss. 4.5% EER.",
                stack: "PyTorch, Siamese Network, Contrastive Loss"
              }
            ].map((proj) => (
              <div key={proj.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-semibold text-white">{proj.title}</h4>
                  <span className="font-mono text-[10px] text-gray-400">{proj.stack}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-300">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
          <div>
            <p className="text-xs text-gray-400">
              Need to download or schedule an interview?
            </p>
            <p className="text-xs text-gray-500">
              Saras Ugale • sarasugale@gmail.com
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadResume}
              className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-gray-200 transition w-full sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Resume
            </button>
            <a
              href="mailto:sarasugale@gmail.com"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition w-full sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Schedule Interview
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
