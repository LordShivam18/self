"use client";

type Mode = "beginner" | "expert";

export default function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-xs text-slate-400">View mode:</span>
      <div className="inline-flex rounded-full bg-slate-900 border border-slate-700 p-1">
        <button
          onClick={() => onChange("beginner")}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            mode === "beginner"
              ? "bg-cyan-500 text-black shadow-[0_0_14px_rgba(34,211,238,0.7)]"
              : "text-slate-400 hover:text-slate-100"
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => onChange("expert")}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            mode === "expert"
              ? "bg-slate-700 text-slate-50"
              : "text-slate-400 hover:text-slate-100"
          }`}
        >
          Expert
        </button>
      </div>
    </div>
  );
}
