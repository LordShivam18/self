// components/linked-list/lru-cache/MicroscopeView.tsx
"use client";

import { LRUStep } from "./generateTrace";

export default function MicroscopeView({
  step,
  mode,
}: {
  step: LRUStep;
  mode: "beginner" | "expert";
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050815] p-4 space-y-3">
      <h2 className="text-sm font-semibold text-cyan-300">
        LRU Cache Microscope
      </h2>

      <div className="text-sm text-cyan-300 font-medium">
        {step.action}
      </div>

      {mode === "beginner" && (
        <div className="text-xs text-slate-400 border-t border-slate-800 pt-2">
          LRU Cache uses a <b>HashMap</b> for O(1) access and a{" "}
          <b>Doubly Linked List</b> to track usage order.
          <br />
          Most Recently Used items move to the front.
          Least Recently Used items are evicted from the back.
        </div>
      )}
    </div>
  );
}
