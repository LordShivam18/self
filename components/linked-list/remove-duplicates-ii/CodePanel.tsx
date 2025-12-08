// components/linked-list/remove-duplicates-ii/CodePanel.tsx
"use client";

import React from "react";
import { RemoveDupIIStep } from "./generateTrace";

const codeLines = [
  "ListNode* deleteDuplicates(ListNode* head) {",
  "    ListNode* dummy = new ListNode(0, head);",
  "    ListNode* prev = dummy;",
  "    ListNode* curr = head;",
  "    while (curr != nullptr) {",
  "        if (curr->next != nullptr && curr->val == curr->next->val) {",
  "            int dup = curr->val;",
  "            while (curr != nullptr && curr->val == dup) {",
  "                curr = curr->next;",
  "            }",
  "            prev->next = curr;",
  "        } else {",
  "            prev = curr;",
  "            curr = curr->next;",
  "        }",
  "    }",
  "    return dummy->next;",
  "}",
];

function highlight(line: string, step: RemoveDupIIStep): boolean {
  const a = step.action;

  if (a.includes("Duplicate block detected")) {
    return (
      line.includes("if (curr->next") ||
      line.includes("int dup") ||
      line.includes("while (curr != nullptr && curr->val == dup)")
    );
  }

  if (a.includes("All duplicates removed")) {
    return line.includes("prev->next = curr;");
  }

  if (a.includes("No duplicate detected")) {
    return line.includes("prev = curr;") || line.includes("curr = curr->next;");
  }

  if (a.includes("Traversal complete")) {
    return line.includes("return dummy->next;");
  }

  return false;
}

export default function CodePanel({ step }: { step: RemoveDupIIStep }) {
  return (
    <pre className="text-xs bg-[#050816] p-4 rounded-2xl border border-slate-700 overflow-x-auto">
      {codeLines.map((line, idx) => (
        <div
          key={idx}
          className={`whitespace-pre leading-5 ${
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
