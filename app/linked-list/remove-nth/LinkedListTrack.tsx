// components/linked-list/remove-nth/LinkedListTrack.tsx
"use client";

import { RemoveNthStep } from "./generateTrace";
import ListNodeViz from "./ListNodeViz";
import PointerViz from "./PointerViz";

export default function LinkedListTrack({
  step,
}: {
  step: RemoveNthStep;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Linked List State
      </div>

      <div className="flex items-center gap-6 justify-center">
        {step.list.map((val, idx) => {
          const isFast = step.fastIndex === idx;
          const isSlow = step.slowIndex === idx;
          const isTarget = step.targetIndex === idx;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <PointerViz label="FAST" visible={isFast} color="cyan" />
              <ListNodeViz
                value={val}
                index={idx}
                isFast={isFast}
                isSlow={isSlow}
                isTarget={isTarget}
              />
              <PointerViz label="SLOW" visible={isSlow} color="emerald" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
