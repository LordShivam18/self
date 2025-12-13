// components/linked-list/reverse-linked-list-ii/CodePanel.tsx
"use client";

import { ReverseIIStep } from "./generateTrace";

const codeLines = [
  "ListNode dummy(0);",
  "dummy.next = head;",
  "ListNode* prev = &dummy;",
  "for (int i = 1; i < left; i++) prev = prev->next;",
  "ListNode* curr = prev->next;",
  "for (int i = 0; i < right - left; i++) {",
  "    ListNode* temp = curr->next;",
  "    curr->next = temp->next;",
  "    temp->next = prev->next;",
  "    prev->next = temp;",
  "}",
  "return dummy.next;",
];

function highlight(line: string, step: ReverseIIStep) {
  const a = step.action;

  if (a.includes("Dummy")) return line.includes("dummy");
  if (a.includes("Moving prev")) return line.includes("prev = prev->next");
  if (a.includes("Detach")) return line.includes("temp = curr->next");
  if (a.includes("inserted")) return line.includes("prev->next = temp");
  if (a.includes("Reversal complete")) return line.includes("return");

  return false;
}

export default function CodePanel({ step }: { step: ReverseIIStep }) {
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
