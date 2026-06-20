"use client";

import { motion } from "framer-motion";

export function GitHubStats() {
  // Generate mock contribution grid data (53 weeks * 7 days = 371 cells)
  // We'll vary commit densities (0 to 4 commits) for a realistic, clean ML dev look.
  const gridCells = Array.from({ length: 112 }).map((_, index) => {
    // Make weekends lower activity, select blocks of high activity
    const dayOfWeek = index % 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let level = 0;

    const rand = Math.random();
    if (isWeekend) {
      level = rand > 0.85 ? 1 : 0;
    } else {
      if (rand > 0.85) level = 4;
      else if (rand > 0.65) level = 3;
      else if (rand > 0.4) level = 2;
      else if (rand > 0.15) level = 1;
      else level = 0;
    }

    return { id: index, level };
  });

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-900/40 border-emerald-800/10";
      case 2:
        return "bg-emerald-700/60 border-emerald-600/15";
      case 3:
        return "bg-emerald-500/80 border-emerald-400/20";
      case 4:
        return "bg-emerald-400 border-emerald-300/30";
      default:
        return "bg-white/[0.03] border-white/5";
    }
  };

  return (
    <div className="rounded-[2.3rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.04)] backdrop-blur-[18px]">
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-[var(--muted)]">
            Workspace Intelligence
          </span>
          <h3 className="font-display text-2xl text-[var(--text)]">
            SarasUgale / Github_Insights
          </h3>
        </div>
        <a
          href="https://github.com/SarasUgale"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[var(--chip)] hover:bg-[var(--line-strong)] hover:-translate-y-px transition-all px-4.5 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text)]"
        >
          View Profile
        </a>
      </div>

      {/* Main stats counters */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[var(--surface-soft)] p-4 border border-[var(--line)]">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">Repositories</span>
          <span className="mt-2 block font-display text-4xl leading-none text-[var(--text)]">18</span>
          <span className="mt-1 block font-mono text-[9px] text-[var(--muted)]">12 public / 6 private</span>
        </div>
        <div className="rounded-2xl bg-[var(--surface-soft)] p-4 border border-[var(--line)]">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">Commit frequency</span>
          <span className="mt-2 block font-display text-4xl leading-none text-[var(--text)]">342</span>
          <span className="mt-1 block font-mono text-[9px] text-[var(--muted)]">Yearly contributions</span>
        </div>
        <div className="rounded-2xl bg-[var(--surface-soft)] p-4 border border-[var(--line)]">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">Primary Language</span>
          <span className="mt-2 block font-display text-4xl leading-none text-[var(--text)]">Python</span>
          <span className="mt-1 block font-mono text-[9px] text-[var(--muted)]">62% of codebase volume</span>
        </div>
      </div>

      {/* Grid and Languages */}
      <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
        {/* Visual Contribution heatmap */}
        <div className="rounded-2xl bg-[var(--surface-soft)] p-4 border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text)]">
                Building Consistency
              </span>
              <span className="font-mono text-[9px] text-[var(--muted)]">Past 16 Weeks</span>
            </div>
            {/* Heatmap Grid */}
            <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto">
              {gridCells.map((cell) => (
                <div
                  key={cell.id}
                  className={`h-2.5 w-2.5 rounded-[2px] border ${getColorClass(cell.level)} transition-all`}
                  title={`Level ${cell.level} contributions`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-[var(--muted)] border-t border-[var(--line)] pt-3">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-[1px] bg-white/[0.03] border border-white/5" />
              <div className="h-2 w-2 rounded-[1px] bg-emerald-900/40" />
              <div className="h-2 w-2 rounded-[1px] bg-emerald-700/60" />
              <div className="h-2 w-2 rounded-[1px] bg-emerald-500/80" />
              <div className="h-2 w-2 rounded-[1px] bg-emerald-400" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Languages Breakdowns */}
        <div className="rounded-2xl bg-[var(--surface-soft)] p-4 border border-[var(--line)]">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text)]">
            Volume breakdown
          </span>
          <div className="mt-4 space-y-3">
            {[
              { name: "Python (Models & APIs)", pct: 62, color: "bg-[#3572A5]" },
              { name: "TypeScript / JS (Web UIs)", pct: 24, color: "bg-[#3178C6]" },
              { name: "Shell & SQL (Data pipelines)", pct: 14, color: "bg-[#89e051]" }
            ].map((lang) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[var(--body)]">{lang.name}</span>
                  <span className="text-[var(--text)] font-semibold">{lang.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full rounded-full ${lang.color}`}
                    style={{ width: `${lang.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
