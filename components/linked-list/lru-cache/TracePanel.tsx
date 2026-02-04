// components/linked-list/lru-cache/TracePanel.tsx
"use client";

import { LRUStep } from "./generateTrace";

export default function TracePanel({ step }: { step: LRUStep }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#040715] p-4 text-sm text-slate-200 space-y-2">
      <div>
        Step: <span className="text-cyan-400 font-semibold">{step.step}</span>
      </div>

      {step.evictedKey !== undefined && (
        <div className="text-red-300">
          Evicted Key: {step.evictedKey}
        </div>
      )}
    </div>
  );
}
