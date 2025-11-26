"use client";
import React from "react";

export type ModeCT = "beginner" | "expert";

export default function ModeToggleCT({ mode, onChange }: { mode: ModeCT; onChange: (m: ModeCT) => void }) {
  return (
    <div className="inline-flex items-center bg-slate-900/60 p-1 rounded-full border border-slate-800">
      <button
        onClick={() => onChange("beginner")}
        className={`px-3 py-1 rounded-full transition ${
          mode === "beginner" ? "bg-cyan-400 text-slate-900 font-semibold shadow-[0_8px_30px_rgba(34,211,238,0.12)]" : "text-slate-300"
        }`}
      >
        Beginner
      </button>
      <button
        onClick={() => onChange("expert")}
        className={`ml-1 px-3 py-1 rounded-full transition ${
          mode === "expert" ? "bg-violet-400 text-slate-900 font-semibold shadow-[0_8px_30px_rgba(167,139,250,0.12)]" : "text-slate-300"
        }`}
      >
        Expert
      </button>
    </div>
  );
}
