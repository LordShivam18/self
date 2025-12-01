// components/kadane/CodePanel.tsx
"use client";

import React from "react";
import { TraceStep } from "./generateTrace";

export default function CodePanel({
  trace,
  cursor,
}: {
  trace: TraceStep[];
  cursor: number;
}) {
  const step = trace[cursor];

  return (
    <pre className="text-sm bg-[#0a0f1f] p-4 rounded-xl border border-slate-700 whitespace-pre-wrap">
{`// Kadane's Algorithm
for (let i = 0; i < n; i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    bestSum = max(bestSum, currentSum);
}`}
    </pre>
  );
}
