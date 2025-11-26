"use client";

import { useMemo, useState } from "react";
import ModeToggleCT, { ModeCT } from "@/components/construct-tree/ModeToggleCT";
import TreeCanvas from "@/components/construct-tree/TreeCanvas";
import MapViz from "@/components/construct-tree/MapViz";
import CodePanelCT from "@/components/construct-tree/CodePanelCT";
import StatsPanelCT from "@/components/construct-tree/StatsPanelCT";

type Action =
  | { kind: "map-insert"; key: number; idx: number }
  | { kind: "pick-root"; value: number; preIndex: number; inorderIndex: number }
  | { kind: "create-node"; id: string; value: number; parentId?: string; side?: "L" | "R" }
  | { kind: "recurse"; range: { inL: number; inR: number }; note?: string }
  | { kind: "backtrack"; nodeId?: string }
  | { kind: "done"; depth: number };

function idFor(val: number, serial: number) {
  // deterministic id for node visuals
  return `n_${val}_${serial}`;
}

/**
 * Build a list of actions (a trace) that the visualizer will step through.
 * This is not the most compact trace but is explicit for teaching.
 */
function buildTrace(preorder: number[], inorder: number[]) {
  const map: Record<number, number> = {};
  const actions: Action[] = [];
  // Step 1: show building the index map (unordered_map)
  for (let i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
    actions.push({ kind: "map-insert", key: inorder[i], idx: i });
  }

  // We'll simulate recursion with a stack to build an explicit order.
  let serial = 0;
  const nodesCreated: string[] = [];

  function rec(preL: number, preR: number, inL: number, inR: number, parentId?: string, side?: "L" | "R", depth = 0) {
    actions.push({ kind: "recurse", range: { inL, inR }, note: `depth ${depth}` });

    if (preL > preR || inL > inR) {
      // nothing
      actions.push({ kind: "backtrack", nodeId: parentId });
      return;
    }

    const rootVal = preorder[preL];
    const inorderIndex = map[rootVal];
    actions.push({ kind: "pick-root", value: rootVal, preIndex: preL, inorderIndex });

    // create node visual
    const nodeId = idFor(rootVal, serial++);
    nodesCreated.push(nodeId);
    actions.push({ kind: "create-node", id: nodeId, value: rootVal, parentId, side });

    // left subtree size
    const leftSize = inorderIndex - inL;
    // recurse left
    rec(preL + 1, preL + leftSize, inL, inorderIndex - 1, nodeId, "L", depth + 1);
    // recurse right
    rec(preL + leftSize + 1, preR, inorderIndex + 1, inR, nodeId, "R", depth + 1);

    actions.push({ kind: "backtrack", nodeId });
  }

  if (preorder.length) rec(0, preorder.length - 1, 0, inorder.length - 1, undefined, undefined, 0);

  actions.push({ kind: "done", depth: Math.ceil(Math.log2(preorder.length + 1)) });
  return actions;
}

export default function ConstructTreePage() {
  // sample arrays; you can change these live if you want
  const [pre, setPre] = useState<number[]>([3, 9, 20, 15, 7]);
  const [ino, setIno] = useState<number[]>([9, 3, 15, 20, 7]);

  const trace = useMemo(() => buildTrace(pre, ino), [pre, ino]);
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<ModeCT>("beginner");
  const step = Math.min(Math.max(0, stepIndex), trace.length - 1);

  function onReset() {
    setStepIndex(0);
  }
  function onStepForward() {
    setStepIndex((s) => Math.min(s + 1, trace.length - 1));
  }
  function onStepBack() {
    setStepIndex((s) => Math.max(s - 1, 0));
  }

  // compute the "state" at current step by replaying actions up to 'step'
  const state = useMemo(() => {
    const mapEntries: { key: number; idx: number }[] = [];
    const nodes: { id: string; value: number; parentId?: string; side?: "L" | "R" }[] = [];
    const picks: { value: number; preIndex: number; inorderIndex: number }[] = [];
    const stack: string[] = [];
    for (let i = 0; i <= step; i++) {
      const a = trace[i];
      if (!a) break;
      if (a.kind === "map-insert") mapEntries.push({ key: a.key, idx: a.idx });
      if (a.kind === "pick-root") picks.push({ value: a.value, preIndex: a.preIndex, inorderIndex: a.inorderIndex });
      if (a.kind === "create-node") nodes.push({ id: a.id, value: a.value, parentId: a.parentId, side: a.side });
      if (a.kind === "recurse") stack.push(JSON.stringify(a.range));
      if (a.kind === "backtrack") stack.pop();
    }
    const currentAction = trace[step];
    return { mapEntries, nodes, picks, currentAction, total: trace.length, idx: step, stackDepth: stack.length };
  }, [trace, step]);

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 p-6">
      <header className="max-w-6xl mx-auto text-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="text-cyan-300">Construct</span>{" "}
          <span className="text-violet-300">Binary Tree</span> from Preorder & Inorder
        </h1>
        <p className="text-slate-400 mt-2 max-w-3xl mx-auto">
          Ultra-flagship visual: watch the unordered_map build, the recursion unfold, pointers move and nodes appear. Beginner and Expert modes give different levels of commentary.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <ModeToggleCT mode={mode} onChange={setMode} />
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={onStepBack}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400"
              >
                ← Prev
              </button>
              <button
                onClick={onStepForward}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 text-slate-900 font-semibold shadow-[0_8px_30px_rgba(124,58,237,0.15)]"
              >
                Step →
              </button>
              <button
                onClick={onReset}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Main visualization area */}
          <div className="bg-[#050616] border border-slate-800 rounded-2xl p-5 shadow-[0_8px_40px_rgba(2,6,23,0.9)]">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <TreeCanvas nodes={state.nodes} highlightPick={state.picks[state.picks.length - 1]} />
              </div>

              <aside className="w-full lg:w-96 space-y-4">
                <MapViz entries={state.mapEntries} highlight={state.picks[state.picks.length - 1]?.value} />
                <StatsPanelCT
                  idx={state.idx}
                  total={state.total}
                  stackDepth={state.stackDepth}
                  currentAction={state.currentAction}
                  mode={mode}
                />
              </aside>
            </div>

            {/* Explanation and code area */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-4">
              <div className="bg-[#060717] p-4 rounded-xl border border-slate-800 min-h-[120px]">
                <h3 className="font-semibold text-slate-200">Explanation</h3>
                <p className="text-slate-300 mt-2 text-sm">
                  {mode === "beginner"
                    ? "We build an index map for inorder, then take preorder's next element as root. Recursively build left and right subtrees from sliced ranges. Watch the map fill, picks happen, and nodes create."
                    : "We show the BFS of recursion: preIndex picks root (pre[preIndex]), use map[root] to determine left subtree size, then recurse left/right. The map insertions are precomputed in this trace."}
                </p>
              </div>

              <CodePanelCT activeStep={state.idx} mode={mode} />
            </div>
          </div>
        </div>

        {/* Right column: sequence / timeline */}
        <div className="space-y-4">
          <div className="bg-[#050616] p-4 rounded-2xl border border-slate-800">
            <h4 className="font-semibold text-slate-200 mb-3">Trace timeline</h4>
            <div className="space-y-2 max-h-[420px] overflow-auto">
              {trace.map((a, i) => {
                const active = i === step;
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-md flex items-center justify-between ${
                      active ? "bg-gradient-to-r from-cyan-600/20 to-violet-600/10 border border-cyan-500/30" : "bg-slate-900/30"
                    }`}
                  >
                    <div className="text-sm">
                      <strong className="text-cyan-300">#{i}</strong> <span className="text-slate-300 ml-2">{a.kind}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">{JSON.stringify(a)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#050616] p-4 rounded-2xl border border-slate-800 text-sm text-slate-300">
            <h4 className="font-semibold text-slate-200">Input arrays</h4>
            <div className="mt-2 font-mono text-xs">
              <div>preorder = [{pre.join(", ")}]</div>
              <div>inorder  = [{ino.join(", ")}]</div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Tip: change the arrays at the top of `page.tsx` when experimenting locally to see different trees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
