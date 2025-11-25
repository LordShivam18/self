"use client";

export type ModeMSA = "beginner" | "expert";

interface ModeToggleProps {
  mode: ModeMSA;
  onChange: (m: ModeMSA) => void;
}

export default function ModeToggleMSA({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={() => onChange("beginner")}
        className={`
          px-4 py-1 rounded-xl text-xs font-medium transition-all
          border 
          ${
            mode === "beginner"
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.6)]"
              : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-cyan-500"
          }
        `}
      >
        Beginner
      </button>

      <button
        onClick={() => onChange("expert")}
        className={`
          px-4 py-1 rounded-xl text-xs font-medium transition-all
          border 
          ${
            mode === "expert"
              ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_18px_rgba(236,72,153,0.6)]"
              : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-fuchsia-500"
          }
        `}
      >
        Expert
      </button>
    </div>
  );
}
