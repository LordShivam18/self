// components/linked-list/rotate-list/MicroscopeView.tsx
"use client";

import { RotateListStep } from "./generateTrace";

export default function MicroscopeView({
  step,
  mode,
}: {
  step: RotateListStep;
  mode: "beginner" | "expert";
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050815] p-4 space-y-3">
      <h2 className="text-sm font-semibold text-cyan-300">
        Rotation Microscope
      </h2>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div>Original k: <span className="text-cyan-300">{step.k}</span></div>
        <div>Effective k: <span className="text-purple-300">{step.effectiveK}</span></div>
        <div>Tail Index: <span className="text-emerald-300">{step.tailIndex ?? "-"}</span></div>
        <div>New Tail: <span className="text-purple-300">{step.newTailIndex ?? "-"}</span></div>
      </div>

      <div className="pt-2 text-sm text-cyan-300 font-medium">
        {step.action}
      </div>

      {mode === "beginner" && (
        <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
          After making the list circular, we move to the new tail location.
          The node after the new tail becomes the new head.
          Finally, we break the circle to get the rotated list.
        </div>
      )}
    </div>
  );
}
