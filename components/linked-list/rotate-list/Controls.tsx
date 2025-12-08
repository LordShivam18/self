// components/linked-list/rotate-list/Controls.tsx
"use client";

export default function Controls({
  prev,
  next,
  reset,
  canPrev,
  canNext,
  mode,
  setMode,
}: {
  prev: () => void;
  next: () => void;
  reset: () => void;
  canPrev: boolean;
  canNext: boolean;
  mode: "beginner" | "expert";
  setMode: (m: "beginner" | "expert") => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <button onClick={prev} disabled={!canPrev}
          className="px-4 py-2 rounded-lg border bg-slate-900 border-slate-700 disabled:opacity-40">
          ◀ Prev
        </button>

        <button onClick={next} disabled={!canNext}
          className="px-4 py-2 rounded-lg border bg-cyan-600/20 border-cyan-400 disabled:opacity-40">
          Next ▶
        </button>

        <button onClick={reset}
          className="px-3 py-2 rounded-lg border bg-slate-900 border-slate-700">
          Reset
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Mode:</span>
        <button
          onClick={() => setMode("beginner")}
          className={`px-3 py-1 rounded-full border ${
            mode === "beginner"
              ? "border-cyan-400 text-cyan-300 bg-cyan-500/10"
              : "border-slate-700 text-slate-400"
          }`}
        >
          Beginner
        </button>
        <button
          onClick={() => setMode("expert")}
          className={`px-3 py-1 rounded-full border ${
            mode === "expert"
              ? "border-cyan-400 text-cyan-300 bg-cyan-500/10"
              : "border-slate-700 text-slate-400"
          }`}
        >
          Expert
        </button>
      </div>
    </div>
  );
}
