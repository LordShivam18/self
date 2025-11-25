"use client";

import React from "react";
import { ModeM2 } from "./ModeToggleM2";

interface CodePanelM2Props {
  activeLine: number;
  mode: ModeM2;
}

const codeLines = [
  "1  // Binary search on the smaller array A",
  "2  int m = A.size(), n = B.size();",
  "3  int low = 0, high = m;",
  "4  int half = (m + n + 1) / 2;",
  "5  while (low <= high) {",
  "6      int i = (low + high) / 2;",
  "7      int j = half - i;",
  "8      int leftA  = (i > 0) ? A[i-1] : -INF;",
  "9      int rightA = (i < m) ? A[i]   : +INF;",
  "10     int leftB  = (j > 0) ? B[j-1] : -INF;",
  "11     int rightB = (j < n) ? B[j]   : +INF;",
  "12     if (leftA <= rightB && leftB <= rightA) {",
  "13         if ((m + n) % 2 == 1)",
  "14             return max(leftA, leftB);",
  "15         return (max(leftA, leftB) +",
  "16                 min(rightA, rightB)) / 2.0;",
  "17     } else if (leftA > rightB) {",
  "18         high = i - 1;      // move i left",
  "19     } else {",
  "20         low = i + 1;       // move i right",
  "21     }",
  "22 }",
];

export default function CodePanelM2({
  activeLine,
  mode,
}: CodePanelM2Props) {
  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="inline-flex h-4 w-1.5 rounded-full bg-gradient-to-b from-indigo-400 to-sky-400" />
        Code trace
      </h2>

      <div className="relative rounded-xl bg-slate-950 border border-slate-900 max-h-72 overflow-auto text-[11px] md:text-xs font-mono">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400/60 via-emerald-400/40 to-amber-400/40 opacity-60" />
        <pre className="px-4 py-3 text-slate-300">
          {codeLines.map((line, idx) => {
            const lineNumber = idx + 1;
            const isActive = lineNumber === activeLine;
            return (
              <div
                key={idx}
                className={
                  isActive
                    ? "bg-sky-300/10 border-l-2 border-sky-300 -mx-2 px-2"
                    : ""
                }
              >
                {line}
              </div>
            );
          })}
        </pre>
      </div>

      {mode === "beginner" ? (
        <p className="text-[11px] md:text-xs text-slate-300">
          Watch which part of the binary search loop is running. When the
          partitions are correct, we jump into the highlighted return block that
          computes the median from the two sides.
        </p>
      ) : (
        <p className="text-[11px] md:text-xs text-slate-300">
          The loop maintains a valid partition:{" "}
          <span className="font-mono">i + j = half</span>. The comparisons on{" "}
          <span className="font-mono">leftA/rightB</span> and{" "}
          <span className="font-mono">leftB/rightA</span> decide whether i must
          shrink or grow, ensuring logarithmic time in the smaller array.
        </p>
      )}
    </div>
  );
}
