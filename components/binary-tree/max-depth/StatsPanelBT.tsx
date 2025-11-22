"use client";

import { ModeBT } from "@/components/binary-tree/max-depth/ModeToggleBT";
import { NODES_BY_ID } from "@/components/binary-tree/max-depth/TreeView";

interface StatsPanelBTProps {
  depth: number;
  queue: string[];
  currentId: string | null;
  mode: ModeBT;
}

export default function StatsPanelBT({
  depth,
  queue,
  currentId,
  mode,
}: StatsPanelBTProps) {
  const queueLabels =
    queue.length === 0
      ? "∅"
      : queue.map((id) => NODES_BY_ID[id]?.label ?? id).join(" , ");

  const currentLabel = currentId
    ? NODES_BY_ID[currentId]?.label ?? currentId
    : "—";

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(15,23,42,0.95)]">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        BFS intuition
      </h2>

      <div className="grid grid-cols-2 gap-3 text-[11px] md:text-xs font-mono text-slate-300">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Current node</p>
          <p>
            node = <span className="text-cyan-300">{currentLabel}</span>
          </p>
          <p>
            depth so far ={" "}
            <span className="text-emerald-300">{depth}</span>
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Queue (front → back)</p>
          <p className="text-violet-300 break-words">{queueLabels}</p>
        </div>
      </div>

      <div className="mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-3 flex flex-col gap-2">
        <p className="text-[11px] md:text-xs font-mono text-slate-400 mb-1">
          Queue length
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-400 to-emerald-400 shadow-[0_0_16px_rgba(56,189,248,0.9)] transition-all duration-500"
              style={{
                width: `${Math.min(queue.length / 4, 1) * 100}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {queue.length}
          </span>
        </div>
      </div>

      <div className="mt-2 text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {mode === "beginner" ? (
          <>
            Think of the{" "}
            <span className="text-violet-300">queue</span> as a waiting
            line of nodes. We always take from the{" "}
            <span className="text-cyan-300">front</span>, inspect its
            children, and put them at the{" "}
            <span className="text-emerald-300">back</span>. Finishing one
            full round over the queue corresponds to finishing one level
            of the tree.
          </>
        ) : (
          <>
            BFS maintains an invariant: at the start of each level, the
            queue contains exactly the nodes with the same depth. After
            processing all of them, we increment{" "}
            <span className="font-mono">depth</span>. This guarantees
            that when the queue becomes empty,{" "}
            <span className="font-mono">depth</span> equals the maximum
            number of levels in the tree.
          </>
        )}
      </div>
    </div>
  );
}
