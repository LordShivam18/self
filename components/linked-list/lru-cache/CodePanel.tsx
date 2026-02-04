// components/linked-list/lru-cache/CodePanel.tsx
"use client";

import { LRUStep } from "./generateTrace";

const codeLines = [
  "unordered_map<int, Node*> mp;",
  "Node *head, *tail;",
  "get(key):",
  "  if key not in map return -1",
  "  move node to front",
  "put(key, value):",
  "  if key exists update + move front",
  "  if full remove tail",
  "  insert new node at front",
];

export default function CodePanel({ step }: { step: LRUStep }) {
  return (
    <pre className="text-xs bg-[#050816] p-4 rounded-2xl border border-slate-700">
      {codeLines.map((line, idx) => (
        <div
          key={idx}
          className={`${
            step.action.toLowerCase().includes(line.split("(")[0])
              ? "bg-cyan-500/10 text-cyan-300"
              : "text-slate-400"
          }`}
        >
          {line}
        </div>
      ))}
    </pre>
  );
}
