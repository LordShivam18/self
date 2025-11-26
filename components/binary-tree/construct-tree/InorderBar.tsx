import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function InorderBar({
  ino,
  cursor,
  trace,
}: {
  ino: number[];
  cursor: number;
  trace: any[];
}) {
  const splitRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // find the last rootInIndex up to cursor
    let pos = -1;
    for (let i = 0; i <= cursor; i++) {
      const t = trace[i];
      if (t?.type === "pick-root" && t.rootInIndex != null) pos = t.rootInIndex;
    }
    const el = splitRef.current;
    if (!el) return;
    if (pos < 0) {
      gsap.to(el, { x: -20, width: 0, duration: 0.35 });
      return;
    }
    const targetX = pos * 72;
    gsap.to(el, { x: targetX, width: 4, duration: 0.45, backgroundColor: "#7C52FF" });
  }, [cursor, trace]);

  return (
    <div className="relative mt-4">
      <div className="flex gap-4 overflow-x-auto py-2">
        {ino.map((v, i) => (
          <div
            key={i}
            className="w-16 h-10 rounded-md flex items-center justify-center bg-[#071026] border border-slate-800 text-sm"
          >
            {v}
          </div>
        ))}
      </div>

      <div
        ref={splitRef}
        className="absolute top-1/2 h-8 rounded-md"
        style={{ left: 8, width: 4, transform: "translateY(-50%)", backgroundColor: "#7C52FF" }}
      />
      <div className="mt-2 text-xs text-slate-400">Inorder (split marker)</div>
    </div>
  );
}
