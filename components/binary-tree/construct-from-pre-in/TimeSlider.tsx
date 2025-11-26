import React from "react";

export default function TimeSlider({
  length,
  value,
  onChange,
}: {
  length: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-[#041122] border border-slate-800 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={Math.max(0, length - 1)}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="w-14 text-right text-sm text-slate-300">{value}/{Math.max(0, length - 1)}</div>
      </div>
      <div className="mt-1 text-xs text-slate-400">Time travel scrubber — drag to jump to any step</div>
    </div>
  );
}
