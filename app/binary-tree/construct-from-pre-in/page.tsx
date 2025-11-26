"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

// Correct imports
import TreeCanvas from "@/components/binary-tree/construct-from-pre-in/TreeCanvas";
import PreorderBar from "@/components/binary-tree/construct-from-pre-in/PreorderBar";
import InorderBar from "@/components/binary-tree/construct-from-pre-in/InorderBar";
import RecursionStack from "@/components/binary-tree/construct-from-pre-in/RecursionStack";
import TimeSlider from "@/components/binary-tree/construct-from-pre-in/TimeSlider";
import CodePanel from "@/components/binary-tree/construct-from-pre-in/CodePanelCT";
import ExplainButton from "@/components/binary-tree/construct-from-pre-in/ExplainButton";

import {
  computeBarsLayout,
  buildNodeLayouts,
  NodeLayout,
} from "@/components/binary-tree/construct-from-pre-in/layoutEngine";

const PRE = [3, 9, 20, 15, 7];
const IN = [9, 3, 15, 20, 7];

type TraceStep = {
  type: string;
  preIndex?: number;
  inRange?: [number, number];
  rootInIndex?: number;
  nodeId?: string;
  snapshot?: any;
};

export default function Page() {
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");

  const [nodeLayouts, setNodeLayouts] = useState<NodeLayout[]>([]);
  const timelineRef = useRef<TraceStep[]>([]);

  // ---------------- Build Trace ----------------
  const buildTrace = useCallback(() => {
    const steps: TraceStep[] = [];
    const inorderIndexMap = new Map<number, number>();
    IN.forEach((v, i) => inorderIndexMap.set(v, i));

    function build(preL: number, preR: number, inL: number, inR: number, depth = 0) {
      if (preL > preR || inL > inR) {
        steps.push({ type: "empty-range", preIndex: preL, inRange: [inL, inR] });
        return null;
      }

      const rootVal = PRE[preL];
      const rootInIdx = inorderIndexMap.get(rootVal)!;
      const nodeId = `node-${rootVal}-${preL}`;

      steps.push({
        type: "pick-root",
        preIndex: preL,
        rootInIndex: rootInIdx,
        inRange: [inL, inR],
        nodeId,
        snapshot: { depth, rootVal },
      });

      const leftSize = rootInIdx - inL;

      steps.push({ type: "recurse-left", snapshot: { root: rootVal, leftSize } });
      build(preL + 1, preL + leftSize, inL, rootInIdx - 1, depth + 1);

      steps.push({ type: "recurse-right", snapshot: { root: rootVal } });
      build(preL + leftSize + 1, preR, rootInIdx + 1, inR, depth + 1);

      steps.push({ type: "backtrack", nodeId });

      return null;
    }

    build(0, PRE.length - 1, 0, IN.length - 1);

    setTrace(steps);
    timelineRef.current = steps;
    setCursor(0);
  }, []);

  useEffect(() => {
    buildTrace();
  }, [buildTrace]);

  // ---------------- Animation Loop ----------------
  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setCursor((prev) => {
        const next = Math.min(prev + 1, trace.length - 1);
        if (next === trace.length - 1) setPlaying(false);
        return next;
      });
    }, 700);

    return () => clearInterval(id);
  }, [playing, trace.length]);

  // ---------------- Node Layout Builder ----------------
  useEffect(() => {
    if (trace.length === 0) return;

    const nodesFound: {
      id: string;
      value: number;
      preorderIndex: number;
      inorderIndex: number;
      depth: number;
    }[] = [];

    for (const step of trace) {
      if (!step.nodeId) continue;

      const parts = step.nodeId.split("-");
      const val = Number(parts[1]);
      const preIndex = Number(parts[2]);
      const depth = step.snapshot?.depth ?? 0;

      const inIndex = IN.indexOf(val);

      nodesFound.push({
        id: step.nodeId,
        value: val,
        preorderIndex: preIndex,
        inorderIndex: inIndex,
        depth,
      });
    }

    // Remove duplicates
    const unique = Array.from(new Map(nodesFound.map(n => [n.id, n])).values());

    const bars = computeBarsLayout(940, PRE.length);
    const layouts = buildNodeLayouts(unique, bars);

    setNodeLayouts(layouts);
  }, [trace]);

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06060a] to-[#04040b] text-slate-50 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold">
          Construct Binary Tree from Preorder & Inorder
        </h1>
        <p className="text-slate-300 mt-2 max-w-2xl">
          Ultra-flagship visualizer — recursion unrolled, pointer motion,
          animated array partitions, dynamic tree building, time-travel slider
          and AI-powered explanations.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <section className="space-y-4">
          <div className="bg-[#050817] border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500"
                >
                  {playing ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => {
                    setCursor(0);
                    setPlaying(false);
                  }}
                  className="px-3 py-2 rounded-md bg-slate-800 border border-slate-600"
                >
                  Reset
                </button>

                <div className="ml-4">
                  <label className="text-sm text-slate-400 mr-2">Mode</label>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "beginner" | "expert")
                    }
                    className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <ExplainButton traceStep={trace[cursor]} />
            </div>

            <div className="flex flex-col gap-3">
              <PreorderBar pre={PRE} cursor={cursor} trace={trace} />
              <InorderBar ino={IN} cursor={cursor} trace={trace} />
              <TreeCanvas trace={trace} cursor={cursor} nodeLayouts={nodeLayouts} />
            </div>
          </div>

          <TimeSlider
            length={trace.length}
            value={cursor}
            onChange={(v: number) => {
              setCursor(v);
              setPlaying(false);
            }}
          />
        </section>

        <aside className="space-y-4">
          <div className="bg-[#051025] border border-slate-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Recursion Stack</h3>
            <RecursionStack trace={trace} cursor={cursor} />
          </div>

          <div className="bg-[#041022] border border-slate-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Code</h3>
            <CodePanel trace={trace} cursor={cursor} mode={mode} />
          </div>
        </aside>
      </main>
    </div>
  );
}
