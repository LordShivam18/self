"use client";

import { ModeBS } from "./ModeToggleBS";

interface CodePanelBSProps {
  activeLine: number;
  mode: ModeBS;
}

export default function CodePanelBS({
  activeLine,
  mode,
}: CodePanelBSProps) {
  const codeLines = [
    "int searchInsert(vector<int>& nums, int target) {",
    "  int l = 0, r = nums.size() - 1;",
    "  while (l <= r) {",
    "    int mid = l + (r - l) / 2;",
    "    if (nums[mid] == target) return mid;",
    "    else if (nums[mid] < target) l = mid + 1;",
    "    else r = mid - 1;",
    "  }",
    "  return l;",
    "}",
  ];

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_32px_rgba(15,23,42,0.95)] font-mono text-[11px] md:text-xs text-slate-200">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2 font-sans">
        <span className="w-1.5 h-4 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.9)]" />
        What this step is in code
      </h2>

      <pre className="mt-1 leading-relaxed overflow-x-auto">
        {codeLines.map((line, idx) => {
          const lineNumber = idx + 1;
          const active = lineNumber === activeLine;
          return (
            <div
              key={idx}
              className={
                active
                  ? "bg-cyan-500/10 border-l-2 border-cyan-400 -mx-2 px-2"
                  : ""
              }
            >
              {String(lineNumber).padStart(2, " ")} {line}
            </div>
          );
        })}
      </pre>

      <p className="mt-2 text-[11px] text-slate-400 font-sans">
        {mode === "beginner"
          ? "The highlighted line shows exactly which part of the binary search logic is being executed in this step."
          : "We’re visualizing the canonical binary search template that returns the smallest index where target can be inserted to keep nums sorted."}
      </p>
    </div>
  );
}
