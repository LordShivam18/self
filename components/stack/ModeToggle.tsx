"use client";

type Mode = "beginner" | "expert";

export default function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-slate-400">View mode:</span>
      <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full p-1">
        <button
          onClick={() => onChange("beginner")}
          className={`px-4 py-1.5 text-xs rounded-full transition-all ${
            mode === "beginner"
              ? "bg-cyan-500 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => onChange("expert")}
          className={`px-4 py-1.5 text-xs rounded-full transition-all ${
            mode === "expert"
              ? "bg-slate-100 text-slate-900 shadow-[0_0_16px_rgba(148,163,184,0.7)]"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          Expert
        </button>
      </div>
    </div>
  );
}
