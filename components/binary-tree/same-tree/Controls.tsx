// components/binary-tree/same-tree/Controls.tsx
"use client";

import React from "react";

type Props = {
  playing: boolean;
  onPlayToggle: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  mode: "beginner" | "expert";
  onModeChange: (m: "beginner" | "expert") => void;
};

export default function Controls({
  playing,
  onPlayToggle,
  onStepForward,
  onStepBack,
  onReset,
  mode,
  onModeChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onPlayToggle}
          className="px-4 py-2 rounded-xl border border-cyan-400 bg-transparent text-cyan-200"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <button
          onClick={onReset}
          className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700"
        >
          Reset
        </button>

        <button
          onClick={onStepBack}
          className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700"
        >
          Step ←
        </button>

        <button
          onClick={onStepForward}
          className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700"
        >
          Step →
        </button>

        <div className="ml-4 text-sm text-slate-300">Mode</div>
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value as "beginner" | "expert")}
          className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm text-slate-200"
        >
          <option value="beginner">Beginner</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div className="text-slate-300 text-sm">Step-by-step comparison</div>
    </div>
  );
}
