"use client";

type Mode = "beginner" | "expert";

interface ModeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
        View mode:
      </span>

      <div className="flex bg-slate-900/70 rounded-full border border-slate-700 overflow-hidden">
        <button
          onClick={() => onChange("beginner")}
          className={`px-4 py-1 text-xs font-medium transition-all ${
            mode === "beginner"
              ? "bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => onChange("expert")}
          className={`px-4 py-1 text-xs font-medium transition-all ${
            mode === "expert"
              ? "bg-slate-200 text-slate-900 shadow-[0_0_18px_rgba(148,163,184,0.7)]"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          Expert
        </button>
      </div>
    </div>
  );
}
