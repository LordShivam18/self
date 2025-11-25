"use client";

import React from "react";

export type ModeM2 = "beginner" | "expert";

interface ModeToggleM2Props {
  mode: ModeM2;
  onChange: (mode: ModeM2) => void;
}

export default function ModeToggleM2({ mode, onChange }: ModeToggleM2Props) {
  return (
    <div className="inline-flex items-center rounded-full bg-slate-900/80 border border-slate-700 px-1 py-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange("beginner")}
        className={`px-3 py-1 text-xs md:text-sm rounded-full transition-all ${
          mode === "beginner"
            ? "bg-sky-100 text-slate-900 font-semibold shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-slate-800/80"
        }`}
      >
        Beginner
      </button>
      <button
        type="button"
        onClick={() => onChange("expert")}
        className={`px-3 py-1 text-xs md:text-sm rounded-full transition-all ${
          mode === "expert"
            ? "bg-amber-100 text-slate-900 font-semibold shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-slate-800/80"
        }`}
      >
        Expert
      </button>
    </div>
  );
}
