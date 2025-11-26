import React from "react";

const CODE_LINES = [
  "// 1. Build map from inorder values to indices",
  "indexMap = {}",
  "for i, val in enumerate(inorder): indexMap[val] = i",
  "",
  "// 2. Recursive helper",
  "def build(preL, preR, inL, inR):",
  "  if preL > preR: return None",
  "  rootVal = preorder[preL]",
  "  rootIn = indexMap[rootVal]",
  "  leftSize = rootIn - inL",
  "  root.left = build(preL+1, preL+leftSize, inL, rootIn-1)",
  "  root.right = build(preL+leftSize+1, preR, rootIn+1, inR)",
  "  return root",
];

export default function CodePanel({ trace, cursor, mode }: any) {
  // Very simple active line guesser:
  let active = 0;
  if (!trace || trace.length === 0) active = 0;
  else {
    const t = trace[cursor];
    if (!t) active = 3;
    else if (t.type === "pick-root") active = 6;
    else if (t.type === "recurse-left") active = 8;
    else if (t.type === "recurse-right") active = 10;
    else if (t.type === "backtrack") active = 11;
  }

  return (
    <div className="text-sm font-mono">
      <div className="bg-[#020318] border border-slate-800 rounded-md overflow-hidden">
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className={`px-3 py-1 text-xs ${i === active ? "bg-gradient-to-r from-cyan-600/40 to-violet-600/30" : ""}`}
          >
            <span className="text-slate-400 mr-3">{String(i + 1).padStart(2, " ")}</span>
            <span className={`${i === active ? "text-white font-medium" : "text-slate-300"}`}>{line}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-slate-400">Code panel (active line highlighted)</div>
    </div>
  );
}
