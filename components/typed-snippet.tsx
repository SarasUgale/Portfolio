"use client";

import { useEffect, useState } from "react";

type TypedSnippetProps = {
  code: string;
  active: boolean;
};

export function TypedSnippet({ code, active }: TypedSnippetProps) {
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    if (!active) {
      setRendered("");
      return;
    }

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setRendered(code.slice(0, frame));
      if (frame >= code.length) {
        window.clearInterval(interval);
      }
    }, 16);

    return () => window.clearInterval(interval);
  }, [active, code]);

  return (
    <pre className="overflow-hidden rounded-[1.6rem] bg-[var(--code-bg)] p-5 text-[12px] leading-6 text-[var(--code-text)] shadow-life">
      <code>{rendered || " "}</code>
      <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--code-text)] align-middle" />
    </pre>
  );
}
