"use client";

export type ModeBT = "beginner" | "expert";

interface ModeToggleBTProps {
  mode: ModeBT;
  onChange: (mode: ModeBT) => void;
}

export default function ModeToggleBT({ mode, onChange }: ModeToggleBTProps) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-xs uppercase tracking-[0.23em] text-slate-500">
        View mode
      </span>
      <div className="relative inline-flex p-1 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
        <button
          onClick={() => onChange("beginner")}
          className={`relative px-4 py-1 text-xs rounded-full z-10 transition-colors duration-200 ${
            mode === "beginner"
              ? "text-slate-900 font-semibold"
              : "text-slate-400"
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => onChange("expert")}
          className={`relative px-4 py-1 text-xs rounded-full z-10 transition-colors duration-200 ${
            mode === "expert"
              ? "text-slate-900 font-semibold"
              : "text-slate-400"
          }`}
        >
          Expert
        </button>

        {/* glowing pill */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 shadow-[0_0_24px_rgba(129,140,248,0.85)] transition-transform duration-200 ${
            mode === "beginner" ? "translate-x-0" : "translate-x-full"
          }`}
        />
      </div>
    </div>
  );
}
