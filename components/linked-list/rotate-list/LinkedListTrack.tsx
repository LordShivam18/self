// components/linked-list/rotate-list/LinkedListTrack.tsx
"use client";

import { RotateListStep } from "./generateTrace";
import ListNodeViz from "./ListNodeViz";
import PointerViz from "./PointerViz";

export default function LinkedListTrack({ step }: { step: RotateListStep }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Rotate List — Current State {step.circular && "(Circular)"}
      </div>

      <div className="flex items-center gap-6 justify-center">
        {step.list.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <PointerViz label="TAIL" visible={step.tailIndex === idx} color="emerald" />
            <PointerViz label="NEW TAIL" visible={step.newTailIndex === idx} color="purple" />

            <ListNodeViz
              value={val}
              index={idx}
              isTail={step.tailIndex === idx}
              isNewTail={step.newTailIndex === idx}
              isNewHead={step.newHeadIndex === idx}
            />

            <PointerViz label="NEW HEAD" visible={step.newHeadIndex === idx} color="cyan" />
          </div>
        ))}
      </div>
    </div>
  );
}
