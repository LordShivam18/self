// components/linked-list/remove-nth/CodePanel.tsx
"use client";

import { RemoveNthStep } from "./generateTrace";

const codeLines = [
  "ListNode* dummy = new ListNode(0);",
  "dummy->next = head;",
  "ListNode* fast = dummy;",
  "ListNode* slow = dummy;",
  "for (int i = 0; i <= n; i++) fast = fast->next;",
  "while (fast != nullptr) {",
  "    fast = fast->next;",
  "    slow = slow->next;",
  "}",
  "slow->next = slow->next->next;",
  "return dummy->next;",
];

export default function CodePanel({ step }: { step: RemoveNthStep }) {
  return (
    <pre className="text-xs bg-[#050816] p-4 rounded-2xl border border-slate-700 overflow-x-auto">
      {codeLines.map((line, idx) => (
        <div
          key={idx}
          className={`whitespace-pre ${
            step.done && line.includes("return")
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
