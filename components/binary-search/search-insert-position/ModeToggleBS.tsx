"use client";

export type ModeBS = "beginner" | "expert";

interface ModeToggleBSProps {
  mode: ModeBS;
  onChange: (mode: ModeBS) => void;
}

export default function ModeToggleBS({ mode, onChange }: ModeToggleBSProps) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
        View mode
      </span>
      <div className="inline-flex rounded-full bg-slate-900/80 border border-slate-800 p-1 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
        {(["beginner", "expert"] as ModeBS[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all font-medium ${
                active
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
                  : "text-slate-300 hover:text-slate-50"
              }`}
            >
              {m === "beginner" ? "Beginner" : "Expert"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
