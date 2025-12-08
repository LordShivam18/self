// components/linked-list/remove-duplicates-ii/LinkedListTrack.tsx
"use client";

import React from "react";
import { RemoveDupIIStep } from "./generateTrace";
import ListNodeViz from "./ListNodeViz";
import PointerViz from "./PointerViz";

export default function LinkedListTrack({
  step,
}: {
  step: RemoveDupIIStep;
}) {
  const { list, prevIndex, currIndex, duplicateRange } = step;

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Sorted Linked List (only duplicates should disappear)
      </div>

      <div className="flex items-center gap-6 justify-center">
        {list.map((val, idx) => {
          const isPrev = prevIndex === idx;
          const isCurr = currIndex === idx;
          const inDuplicateBlock =
            !!duplicateRange &&
            idx >= duplicateRange.start &&
            idx <= duplicateRange.end;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <PointerViz
                label="PREV"
                visible={isPrev}
                color="emerald"
              />
              <ListNodeViz
                value={val}
                index={idx}
                isPrev={!!isPrev}
                isCurr={!!isCurr}
                inDuplicateBlock={inDuplicateBlock}
              />
              <PointerViz
                label="CURR"
                visible={isCurr}
                color="cyan"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
