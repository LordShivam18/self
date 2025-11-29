// components/binary-tree/same-tree/CodePanel.tsx
"use client";

import React from "react";
import { TraceStep } from "./generateTrace";

type Props = {
  trace: TraceStep[];
  cursor: number;
};

// small code snippet for "isSameTree"
const CODE = [
  "function isSameTree(p, q) {",
  "  if (!p && !q) return true;",
  "  if (!p || !q) return false;",
  "  if (p.val !== q.val) return false;",
  "  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);",
  "}",
];

export default function CodePanel({ trace, cursor }: Props) {
  const active = trace[cursor];
  // map step types to code line number (approx)
  const mapping: Record<string, number> = {
    "compare-root": 3,
    "null-null": 1,
    "one-null": 2,
    "compare-val": 4,
    "recurse": 5,
  };

  const highlightLine = mapping[active?.type] ?? -1;

  return (
    <div>
      <h3 className="font-semibold mb-3">Code</h3>
      <pre className="bg-[#041322] rounded-md p-3 text-sm text-slate-300 overflow-auto">
        {CODE.map((l, idx) => (
          <div
            key={idx}
            style={{
              background: idx === highlightLine ? "linear-gradient(90deg, rgba(99,102,241,0.08), rgba(6,182,212,0.04))" : "transparent",
              padding: "2px 6px",
              borderRadius: 4,
            }}
            className="font-mono"
          >
            <code className="text-slate-300">{l}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
