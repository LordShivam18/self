// components/linked-list/lru-cache/Controls.tsx
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
    <div className="flex justify-between items-center gap-3">
      <div className="flex gap-2">
        <button onClick={prev} disabled={!canPrev}
          className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 disabled:opacity-40">
          ◀ Prev
        </button>
        <button onClick={next} disabled={!canNext}
          className="px-4 py-2 rounded-lg border border-cyan-400 bg-cyan-600/20 disabled:opacity-40">
          Next ▶
        </button>
        <button onClick={reset}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900">
          Reset
        </button>
      </div>

      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setMode("beginner")}
          className={mode === "beginner" ? "text-cyan-300" : "text-slate-400"}
        >
          Beginner
        </button>
        <button
          onClick={() => setMode("expert")}
          className={mode === "expert" ? "text-cyan-300" : "text-slate-400"}
        >
          Expert
        </button>
      </div>
    </div>
  );
}
