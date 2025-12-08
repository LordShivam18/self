// components/linked-list/remove-duplicates-ii/Controls.tsx
"use client";

import React from "react";

export default function Controls({
  onPrev,
  onNext,
  onReset,
  canPrev,
  canNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`px-4 py-2 rounded-lg border text-sm ${
            canPrev
              ? "bg-slate-900 border-slate-600 hover:bg-slate-800"
              : "bg-slate-900/40 border-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          ◀ Prev
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`px-4 py-2 rounded-lg border text-sm ${
            canNext
              ? "bg-cyan-600/20 border-cyan-400 hover:bg-cyan-500/30"
              : "bg-slate-900/40 border-slate-700 text-slate-500 cursor-not-allowed"
          }`}
        >
          Next ▶
        </button>
        <button
          onClick={onReset}
          className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-900 text-xs hover:bg-slate-800"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
