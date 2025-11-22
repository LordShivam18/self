export type ModeCW = "beginner" | "expert";

interface ModeToggleProps {
  mode: ModeCW;
  onChange: (mode: ModeCW) => void;
}

export default function ModeToggleCW({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-2 text-xs bg-slate-950/80 border border-slate-800 rounded-full px-1 py-1 shadow-[0_0_25px_rgba(15,23,42,0.8)]">
      <span className="px-2 text-[10px] tracking-[0.22em] uppercase text-slate-500">
        View mode
      </span>
      <button
        onClick={() => onChange("beginner")}
        className={`px-3 py-1 rounded-full transition-all ${
          mode === "beginner"
            ? "bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
            : "text-slate-400 hover:text-slate-100"
        }`}
      >
        Beginner
      </button>
      <button
        onClick={() => onChange("expert")}
        className={`px-3 py-1 rounded-full transition-all ${
          mode === "expert"
            ? "bg-slate-800 text-slate-50 shadow-[0_0_18px_rgba(148,163,184,0.8)]"
            : "text-slate-400 hover:text-slate-100"
        }`}
      >
        Expert
      </button>
    </div>
  );
}
