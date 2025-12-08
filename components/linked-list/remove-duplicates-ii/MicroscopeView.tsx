// components/linked-list/remove-duplicates-ii/MicroscopeView.tsx
"use client";

import React from "react";
import { RemoveDupIIStep } from "./generateTrace";

export default function MicroscopeView({ step }: { step: RemoveDupIIStep }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#050815] p-4 space-y-3">
      <h2 className="text-sm font-semibold text-cyan-300">
        Duplicate Detection — Microscope View
      </h2>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div>
          <div className="text-slate-500 mb-0.5">Prev (last confirmed unique)</div>
          <div className="text-emerald-300">
            {step.prevIndex !== null ? step.prevIndex : "dummy"}
          </div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">Curr (scanning node)</div>
          <div className="text-cyan-300">
            {step.currIndex !== null ? step.currIndex : "-"}
          </div>
        </div>
      </div>

      {step.duplicateRange && (
        <div className="text-xs text-red-300">
          Duplicate block: indices {step.duplicateRange.start} to{" "}
          {step.duplicateRange.end} will be removed.
        </div>
      )}

      <div className="pt-2 text-sm text-cyan-300 font-medium">
        {step.action}
      </div>

      <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
        Idea: because the list is sorted, all duplicates appear in a single
        contiguous block. If a value repeats, we skip the whole block so that
        value does not appear at all in the final list.
      </div>
    </div>
  );
}
