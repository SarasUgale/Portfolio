"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import { logicProjects } from "@/data/portfolio";

type NeuralStringsProps = {
  activeProject: string | null;
  cleanupMode: boolean;
};

type PathState = {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  cx: number;
  cy: number;
  glow: number;
};

export function NeuralStrings({
  activeProject,
  cleanupMode
}: NeuralStringsProps) {
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const statesRef = useRef<Record<string, PathState>>({});
  const settersRef = useRef<
    Record<string, Record<keyof PathState, (value: number) => void>>
  >({});

  const links = useMemo(
    () =>
      logicProjects.map((project) => ({
        from: project.id,
        to: project.linkTo
      })),
    []
  );

  useEffect(() => {
    const logicCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-logic-card]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.logicCard;
            if (!id) {
              return;
            }

            if (entry.isIntersecting) {
              next.add(id);
            } else {
              next.delete(id);
            }
          });

          return Array.from(next);
        });
      },
      {
        threshold: [0.25, 0.45, 0.7]
      }
    );

    logicCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLinks = links.filter((link) => visibleIds.includes(link.from));

    const ensureState = (id: string, initial: PathState) => {
      if (!statesRef.current[id]) {
        statesRef.current[id] = initial;
      }

      if (!settersRef.current[id]) {
        const state = statesRef.current[id];
        settersRef.current[id] = {
          sx: gsap.quickTo(state, "sx", {
            duration: 0.75,
            ease: "elastic.out(1, 0.42)"
          }),
          sy: gsap.quickTo(state, "sy", {
            duration: 0.75,
            ease: "elastic.out(1, 0.42)"
          }),
          ex: gsap.quickTo(state, "ex", {
            duration: 0.75,
            ease: "elastic.out(1, 0.42)"
          }),
          ey: gsap.quickTo(state, "ey", {
            duration: 0.75,
            ease: "elastic.out(1, 0.42)"
          }),
          cx: gsap.quickTo(state, "cx", {
            duration: 0.9,
            ease: "elastic.out(1, 0.35)"
          }),
          cy: gsap.quickTo(state, "cy", {
            duration: 0.9,
            ease: "elastic.out(1, 0.35)"
          }),
          glow: gsap.quickTo(state, "glow", {
            duration: 0.55,
            ease: "power3.out"
          })
        };
      }
    };

    const updateTargets = () => {
      activeLinks.forEach((link) => {
        const fromEl = document.querySelector<HTMLElement>(
          `[data-anchor-id="${link.from}"]`
        );
        const toEl = document.querySelector<HTMLElement>(
          `[data-anchor-id="${link.to}"]`
        );

        if (!fromEl || !toEl) {
          return;
        }

        const from = fromEl.getBoundingClientRect();
        const to = toEl.getBoundingClientRect();
        const isActive = activeProject === link.from;
        const amplitude = cleanupMode ? 0 : isActive ? 68 : 36;

        const initialState: PathState = {
          sx: from.right,
          sy: from.top + from.height / 2,
          ex: to.left,
          ey: to.top + to.height / 2,
          cx: window.innerWidth / 2,
          cy: (from.top + to.top) / 2,
          glow: isActive ? 1 : 0.45
        };

        ensureState(link.from, initialState);

        const midX = (from.right + to.left) / 2;
        const driftY = (from.top + to.top) / 2 + Math.sin(window.scrollY * 0.01) * amplitude;
        const setters = settersRef.current[link.from];

        setters.sx(from.right);
        setters.sy(from.top + from.height / 2);
        setters.ex(to.left);
        setters.ey(to.top + to.height / 2);
        setters.cx(midX + (isActive ? 12 : -8));
        setters.cy(driftY);
        setters.glow(isActive ? 1 : 0.42);
      });
    };

    updateTargets();

    const ticker = () => {
      activeLinks.forEach((link) => {
        const state = statesRef.current[link.from];
        const path = pathRefs.current[link.from];
        if (!state || !path) {
          return;
        }

        path.setAttribute(
          "d",
          `M ${state.sx} ${state.sy} Q ${state.cx} ${state.cy} ${state.ex} ${state.ey}`
        );
        path.style.opacity = String(state.glow);
      });
    };

    const scheduleTargets = () => updateTargets();

    gsap.ticker.add(ticker);
    window.addEventListener("scroll", scheduleTargets, { passive: true });
    window.addEventListener("resize", scheduleTargets);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("scroll", scheduleTargets);
      window.removeEventListener("resize", scheduleTargets);
    };
  }, [activeProject, cleanupMode, links, visibleIds]);

  const activeLinks = links.filter((link) => visibleIds.includes(link.from));

  return (
    <svg className="pointer-events-none fixed inset-0 z-30 hidden h-full w-full xl:block">
      <defs>
        <filter id="string-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="logic-life-string" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#69F0FF" />
          <stop offset="100%" stopColor="#B96B3C" />
        </linearGradient>
      </defs>

      {activeLinks.map((link) => (
        <path
          key={link.from}
          ref={(node) => {
            pathRefs.current[link.from] = node;
          }}
          d=""
          fill="none"
          stroke="url(#logic-life-string)"
          strokeWidth={activeProject === link.from ? 2.4 : 1.5}
          strokeDasharray={activeProject === link.from ? "0" : "8 8"}
          filter="url(#string-glow)"
          className="transition-all duration-500"
        />
      ))}
    </svg>
  );
}
