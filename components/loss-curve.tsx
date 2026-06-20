"use client";

import { line, curveCatmullRom } from "d3";

type LossCurveProps = {
  values: number[];
  active: boolean;
};

export function LossCurve({ values, active }: LossCurveProps) {
  const width = 280;
  const height = 120;
  const step = width / Math.max(values.length - 1, 1);
  const path = line<number>()
    .x((_, index) => index * step)
    .y((value) => height - value * 100)
    .curve(curveCatmullRom.alpha(0.5))(values);

  return (
    <div className="rounded-[1.8rem] bg-[var(--surface-soft)] p-5">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
        <span>Model Loss</span>
        <span className={active ? "text-[var(--text)]" : ""}>
          {active ? "Live" : "Standby"}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-28 w-full">
        <defs>
          <linearGradient id="curveGlow" x1="0%" x2="100%">
            <stop offset="0%" stopColor="var(--curve-soft)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--curve-strong)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          d={path ?? ""}
          fill="none"
          stroke="url(#curveGlow)"
          strokeWidth={active ? 4 : 2}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        {values.map((value, index) => (
          <circle
            key={`${value}-${index}`}
            cx={index * step}
            cy={height - value * 100}
            r={active ? 4 : 3}
            fill={active ? "var(--curve-strong)" : "var(--curve-dot)"}
            className="transition-all duration-500"
          />
        ))}
      </svg>
    </div>
  );
}
