// components/math/plus-one/Controls.tsx
"use client";

export default function Controls({
  stepBack,
  stepForward,
}: {
  stepBack: () => void;
  stepForward: () => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={stepBack}
        className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 hover:bg-slate-700"
      >
        ◀ Prev
      </button>

      <button
        onClick={stepForward}
        className="px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-400 hover:bg-cyan-500/30"
      >
        Next ▶
      </button>
    </div>
  );
}
