import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PreorderBar({
  pre,
  cursor,
  trace,
}: {
  pre: number[];
  cursor: number;
  trace: any[];
}) {
  const pointerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // find the latest pick-root preIndex up to cursor
    let idx = -1;
    for (let i = 0; i <= cursor; i++) {
      const t = trace[i];
      if (t?.type === "pick-root") idx = t.preIndex ?? idx;
    }
    const el = pointerRef.current;
    if (!el) return;
    const targetX = idx < 0 ? 0 : idx * 72;
    gsap.to(el, { x: targetX, duration: 0.45, ease: "power3.out" });
  }, [cursor, trace]);

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto py-2">
        {pre.map((v, i) => (
          <div
            key={i}
            className="w-16 h-10 rounded-md flex items-center justify-center bg-[#071026] border border-slate-800 text-sm"
          >
            {v}
          </div>
        ))}
      </div>

      <div
        ref={pointerRef}
        className="absolute -mt-1 w-16 h-10 pointer-events-none border-2 border-cyan-400 rounded-md shadow-[0_0_22px_rgba(34,211,238,0.12)]"
        style={{ transform: "translateX(0px)" }}
      />
      <div className="mt-2 text-xs text-slate-400">Preorder (preIndex cursor)</div>
    </div>
  );
}
