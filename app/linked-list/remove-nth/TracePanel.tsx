// components/linked-list/remove-nth/TracePanel.tsx
"use client";

import { RemoveNthStep } from "./generateTrace";

export default function TracePanel({
  step,
}: {
  step: RemoveNthStep;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#040715] p-4 text-sm text-slate-200 space-y-2">
      <div>
        Step: <span className="text-cyan-400 font-semibold">{step.step}</span>
      </div>

      <div className="text-xs text-slate-400">
        {step.action}
      </div>

      {step.done && (
        <div className="text-emerald-300 font-semibold">
          ✅ Final List Ready
        </div>
      )}
    </div>
  );
}
