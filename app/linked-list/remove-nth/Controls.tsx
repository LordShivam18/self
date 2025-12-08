// components/linked-list/remove-nth/Controls.tsx
"use client";

export default function Controls({
  prev,
  next,
  reset,
  canPrev,
  canNext,
}: {
  prev: () => void;
  next: () => void;
  reset: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className="flex gap-3">
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
  );
}
