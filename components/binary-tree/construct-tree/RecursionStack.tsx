import React from "react";

export default function RecursionStack({ trace, cursor }: { trace: any[]; cursor: number }) {
  // Build stack frames by replaying trace until cursor
  const frames: string[] = [];
  let depth = 0;
  for (let i = 0; i <= cursor; i++) {
    const t = trace[i];
    if (!t) continue;
    if (t.type === "pick-root") {
      depth += 1;
      frames.push(`build( root=${String(t.nodeId).split("-")[1]} , depth=${depth})`);
    } else if (t.type === "backtrack") {
      frames.push(`return from ${String(t.nodeId).split("-")[1]}`);
      depth = Math.max(0, depth - 1);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col-reverse gap-2 max-h-64 overflow-y-auto">
        {frames.length === 0 ? (
          <div className="text-slate-400">Stack is empty (not started)</div>
        ) : (
          frames.map((f, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-700 rounded-md p-2 text-xs">
              <code className="text-[12px]">{f}</code>
            </div>
          ))
        )}
      </div>
      <div className="text-xs text-slate-400">Recursion stack (top at bottom)</div>
    </div>
  );
}
