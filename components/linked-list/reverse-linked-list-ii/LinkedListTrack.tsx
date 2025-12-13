// components/linked-list/reverse-linked-list-ii/LinkedListTrack.tsx
"use client";

import { ReverseIIStep } from "./generateTrace";

import PointerViz from "./PointerViz";
import ListNodeViz from "./ListNodeViz"; // ✅ MISSING IMPORT FIXED

export default function LinkedListTrack({ step }: { step: ReverseIIStep }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Reverse Sublist (Left → Right)
      </div>

      <div className="flex items-center gap-6 justify-center">
        {step.list.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <PointerViz
              label="PREV"
              visible={step.prevIndex === idx}
              color="emerald"
            />

            <PointerViz
              label="TEMP"
              visible={step.tempIndex === idx}
              color="red"
            />

            <ListNodeViz
              value={val}
              index={idx}
              isPrev={step.prevIndex === idx}
              isCurr={step.currIndex === idx}
              isTemp={step.tempIndex === idx}
              reversing={step.reversing}
            />

            <PointerViz
              label="CURR"
              visible={step.currIndex === idx}
              color="cyan"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
