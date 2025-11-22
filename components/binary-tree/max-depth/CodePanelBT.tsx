"use client";

import { ModeBT } from "@/components/binary-tree/max-depth/ModeToggleBT";

interface CodePanelBTProps {
  activeLine: number;
  mode: ModeBT;
}

export default function CodePanelBT({
  activeLine,
  mode,
}: CodePanelBTProps) {
  const codeLines = [
    "int maxDepth(TreeNode* root) {", // 1
    "    if (!root) return 0;", // 2
    "    queue<TreeNode*> q;", // 3
    "    q.push(root);", // 4
    "    int depth = 0;", // 5
    "    while (!q.empty()) {", // 6
    "        int levelSize = q.size();", // 7
    "        depth++;", // 8
    "        for (int i = 0; i < levelSize; i++) {", // 9
    "            TreeNode* node = q.front(); q.pop();", // 10
    "            if (node->left)  q.push(node->left);", // 11
    "            if (node->right) q.push(node->right);", // 12
    "        }", // 13
    "    }", // 14
    "    return depth;", // 15
    "}", // 16
  ];

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-[0_0_30px_rgba(15,23,42,0.95)] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
          Code mapping
        </h2>
        <span className="text-[10px] font-mono text-slate-500">
          {mode === "beginner" ? "High-level C++" : "Exact BFS pattern"}
        </span>
      </div>

      <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 px-3 py-3 overflow-x-auto">
        <pre className="text-[11px] md:text-[12px] leading-relaxed font-mono text-slate-300">
          {codeLines.map((line, idx) => {
            const lineNumber = idx + 1;
            const isActive = lineNumber === activeLine;
            return (
              <div
                key={idx}
                className={`whitespace-pre flex ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-transparent border-l-2 border-cyan-400"
                    : ""
                }`}
              >
                <span className="w-6 mr-2 text-right text-[10px] text-slate-500 select-none">
                  {lineNumber}
                </span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
