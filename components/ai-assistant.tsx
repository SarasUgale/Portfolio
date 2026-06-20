"use client";

import { useState, useRef, useEffect } from "react";
import { aiKnowledgeBase } from "@/data/portfolio";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const SUGGESTED_PROMPTS = [
  "What is your background?",
  "Tell me about MediCode AI",
  "What certifications do you have?",
  "How can I contact Saras?"
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm Saras's AI Portfolio Assistant. Ask me anything about his projects, skills, certifications, and availability!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = queryKnowledgeBase(text);
      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        text: responseText
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 750);
  };

  const queryKnowledgeBase = (query: string): string => {
    const cleanQuery = query.toLowerCase().replace(/[?.,!]/g, "");
    const queryWords = cleanQuery.split(/\s+/);

    // Search for a matching keyword entry
    let bestMatch: { count: number; answer: string } = { count: 0, answer: "" };

    for (const entry of aiKnowledgeBase) {
      let matchCount = 0;
      for (const word of queryWords) {
        if (entry.keywords.includes(word)) {
          matchCount++;
        }
      }

      if (matchCount > bestMatch.count) {
        bestMatch = { count: matchCount, answer: entry.answer };
      }
    }

    if (bestMatch.count > 0) {
      return bestMatch.answer;
    }

    // Default response if no keywords found
    return "I couldn't find a direct answer for that. You can ask about my projects (MediCode AI, DeepShield AI, SignaTrust AI), B.Tech degree in CSE-AI, certifications, or how to contact me directly!";
  };

  return (
    <div className="flex h-[420px] flex-col rounded-[2.3rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.04)] backdrop-blur-[18px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-[var(--muted)]">
            Active checkpoint
          </span>
          <h3 className="font-display text-xl text-[var(--text)]">
            Saras_AI_Model_v1.0
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase text-emerald-500 tracking-wider">
            Online
          </span>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-[1.3rem] px-4 py-3 text-xs leading-5 shadow-sm transition-all ${
                msg.role === "user"
                  ? "bg-[var(--text)] text-[var(--inverse)] rounded-tr-none"
                  : "bg-[var(--surface-soft)] text-[var(--text)] rounded-tl-none border border-[var(--line)]"
              }`}
            >
              {msg.text.split("\n").map((line, idx) => (
                <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-[1.3rem] rounded-tl-none border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-xs text-[var(--muted)] shadow-sm">
              <span className="flex items-center gap-1.5 font-mono">
                Thinking
                <span className="flex gap-0.5 mt-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] delay-100" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] delay-200" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted)] delay-300" />
                </span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3 pb-2.5">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleSend(prompt)}
            disabled={isTyping}
            className="rounded-full bg-[var(--chip)] hover:bg-[var(--line-strong)] hover:-translate-y-px transition-all px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[var(--text)] disabled:opacity-50 disabled:pointer-events-none"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          placeholder="Ask about skills, education, or code details..."
          className="flex-1 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-2.5 text-xs text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[var(--text)] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="rounded-full bg-[var(--text)] hover:opacity-95 text-[var(--inverse)] px-4 font-mono text-[10px] uppercase tracking-widest transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
