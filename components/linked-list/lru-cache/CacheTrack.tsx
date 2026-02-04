// components/linked-list/lru-cache/CacheTrack.tsx
"use client";

import { LRUStep } from "./generateTrace";
import NodeViz from "./NodeViz";
import ArrowViz from "./ArrowViz";

export default function CacheTrack({ step }: { step: LRUStep }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-3">
        Doubly Linked List (MRU → LRU)
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        {step.list.map((node, idx) => (
          <div key={node.key} className="flex items-center gap-2">
            <NodeViz
              node={node}
              isMRU={idx === 0}
              isLRU={idx === step.list.length - 1}
              isActive={step.activeKey === node.key}
            />
            {idx < step.list.length - 1 && <ArrowViz />}
          </div>
        ))}
      </div>
    </div>
  );
}
