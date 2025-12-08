// components/linked-list/remove-nth/MicroscopeView.tsx
"use client";

import { RemoveNthStep } from "./generateTrace";

export default function MicroscopeView({
  step,
}: {
  step: RemoveNthStep;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050815] p-4 space-y-2">
      <h2 className="text-sm font-semibold text-cyan-300">
        Fast & Slow Pointer Microscope
      </h2>

      <div className="text-xs text-slate-300">
        Fast Index:{" "}
        <span className="text-cyan-300">
          {step.fastIndex !== null ? step.fastIndex : "-"}
        </span>
      </div>

      <div className="text-xs text-slate-300">
        Slow Index:{" "}
        <span className="text-emerald-300">
          {step.slowIndex !== null ? step.slowIndex : "-"}
        </span>
      </div>

      {step.targetIndex !== undefined && (
        <div className="text-xs text-red-300">
          Deleting Index: {step.targetIndex}
        </div>
      )}

      <div className="pt-2 text-sm text-cyan-300 font-medium">
        {step.action}
      </div>
    </div>
  );
}
