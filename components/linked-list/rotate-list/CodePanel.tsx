// components/linked-list/rotate-list/CodePanel.tsx
"use client";

import { RotateListStep } from "./generateTrace";

const codeLines = [
  "if (!head || !head->next || k == 0) return head;",
  "ListNode* tail = head;",
  "int length = 1;",
  "while (tail->next) { tail = tail->next; length++; }",
  "k = k % length;",
  "tail->next = head;",          // make circular
  "int stepsToNewTail = length - k;",
  "while (--stepsToNewTail) tail = tail->next;",
  "ListNode* newHead = tail->next;",
  "tail->next = nullptr;",
  "return newHead;",
];

function highlight(line: string, step: RotateListStep) {
  const a = step.action;

  if (a.includes("Length calculated")) return line.includes("length");
  if (a.includes("Effective rotation")) return line.includes("k = k % length");
  if (a.includes("circular")) return line.includes("tail->next = head");
  if (a.includes("Moving")) return line.includes("stepsToNewTail");
  if (a.includes("New head")) return line.includes("newHead");
  if (a.includes("rotation complete")) return line.includes("return");

  return false;
}

export default function CodePanel({ step }: { step: RotateListStep }) {
  return (
    <pre className="text-xs bg-[#050816] p-4 rounded-2xl border border-slate-700 overflow-x-auto">
      {codeLines.map((line, idx) => (
        <div
          key={idx}
          className={`whitespace-pre ${
            highlight(line, step)
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
