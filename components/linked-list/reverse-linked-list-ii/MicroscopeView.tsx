// components/linked-list/reverse-linked-list-ii/MicroscopeView.tsx
"use client";

import { ReverseIIStep } from "./generateTrace";

export default function MicroscopeView({
  step,
  mode,
}: {
  step: ReverseIIStep;
  mode: "beginner" | "expert";
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050815] p-4 space-y-3">
      <h2 className="text-sm font-semibold text-cyan-300">
        Reversal Microscope
      </h2>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div>Left: <span className="text-cyan-300">{step.left}</span></div>
        <div>Right: <span className="text-purple-300">{step.right}</span></div>
        <div>Prev: <span className="text-emerald-300">{step.prevIndex ?? "-"}</span></div>
        <div>Curr: <span className="text-cyan-300">{step.currIndex ?? "-"}</span></div>
      </div>

      <div className="text-sm text-cyan-300 font-medium">
        {step.action}
      </div>

      {mode === "beginner" && (
        <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
          We reverse the sublist by repeatedly taking the node after <b>curr</b>
          and inserting it right after <b>prev</b>. This is called
          <b> head insertion</b>.
        </div>
      )}
    </div>
  );
}
