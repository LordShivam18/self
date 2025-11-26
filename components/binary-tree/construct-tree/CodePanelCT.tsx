"use client";
import React from "react";
import { ModeCT } from "./ModeToggleCT";

/**
 * This is a simplified code panel with a few lines and an "active line" highlight keyed to the trace index.
 * You can expand lines or link activeLine to action kinds more precisely.
 */

const CODE_LINES = [
  "// build index map",
  "for (i = 0; i < inorder.size(); ++i) map[inorder[i]] = i;",
  "",
  "TreeNode* build(preL, preR, inL, inR) {",
  "  if (preL > preR) return null;",
  "  rootVal = preorder[preL];  // pick root",
  "  inoIdx = map[rootVal];",
  "  leftSize = inoIdx - inL;",
  "  root->left = build(preL+1, preL+leftSize, inL, inoIdx-1);",
  "  root->right= build(preL+leftSize+1, preR, inoIdx+1, inR);",
  "  return root;",
  "}",
];

export default function CodePanelCT({ activeStep = 0, mode }: { activeStep?: number; mode: ModeCT }) {
  // simple heuristic: map activeStep to line
  const activeLine = Math.min(CODE_LINES.length - 1, Math.floor(activeStep / 2) + 1);

  return (
    <div className="bg-[#030414] border border-slate-800 rounded-xl p-3 h-full">
      <div className="flex items-center justify-between">
        <h4 className="text-slate-200 font-semibold">Code (JS/C++ style)</h4>
        <span className="text-xs text-slate-400">mode: {mode}</span>
      </div>

      <pre className="mt-3 rounded-md overflow-hidden bg-[#010213]">
        {CODE_LINES.map((l, i) => (
          <div
            key={i}
            className={`px-3 py-2 text-sm font-mono ${i === activeLine ? "bg-gradient-to-r from-cyan-600/10 to-violet-600/10 border-l-4 border-cyan-400" : "text-slate-300"}`}
          >
            <span className="text-slate-500 pr-4">{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
