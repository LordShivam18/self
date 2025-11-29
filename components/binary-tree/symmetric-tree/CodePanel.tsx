import React from "react";
import { TraceStep } from "./generateTrace";

type Props = {
  trace: TraceStep[];
  cursor: number;
};

const code = [
  "function isMirror(l, r) {",
  "  if (!l && !r) return true;",
  "  if (!l || !r) return false;",
  "  if (l.val !== r.val) return false;",
  "  return isMirror(l.left, r.right) && isMirror(l.right, r.left);",
  "}",
  "isSymmetric(root) {",
  "  if (!root) return true;",
  "  return isMirror(root.left, root.right);",
  "}"
];

export default function CodePanel({ trace, cursor }: Props) {
  // highlight compare lines depending on current active step
  const activeStep = trace[cursor];
  let highlightLine = -1;
  if (activeStep && activeStep.type === "compare") {
    highlightLine = 3; // show the l.val !== r.val check as highlighted
  } else if (activeStep && activeStep.type === "enter") {
    highlightLine = 1; // entering recursion
  } else if (activeStep && activeStep.type === "exit") {
    highlightLine = 4; // returning
  } else if (activeStep && activeStep.type === "done") {
    highlightLine = 8;
  }

  return (
    <pre className="text-xs font-mono p-3 rounded bg-[#071026] overflow-auto">
      {code.map((ln, i) => (
        <div key={i} className={`px-2 ${i === highlightLine ? "bg-slate-700 rounded" : ""}`}>
          <span className="text-slate-400 mr-2">{String(i + 1).padStart(2, " ")} </span>
          <span className={i === highlightLine ? "text-cyan-200" : "text-slate-200"}>{ln}</span>
        </div>
      ))}
    </pre>
  );
}
