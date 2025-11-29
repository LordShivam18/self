"use client";

import React, { useEffect, useState, useRef } from "react";
import Controls from "@/components/binary-tree/symmetric-tree/Controls";
import TreeCanvas from "@/components/binary-tree/symmetric-tree/TreeCanvas";
import TracePanel from "@/components/binary-tree/symmetric-tree/TracePanel";
import CodePanel from "@/components/binary-tree/symmetric-tree/CodePanel";
import { generateSymmetricTrace, TraceStep } from "@/components/binary-tree/symmetric-tree/generateTrace";

export default function Page() {
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const steps = generateSymmetricTrace();
    setTrace(steps);
    setCursor(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setCursor((c) => Math.min(c + 1, trace.length - 1));
    }, 600);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [playing, trace.length]);

  useEffect(() => {
    // stop when reach end
    if (cursor >= trace.length - 1) setPlaying(false);
  }, [cursor, trace.length]);

  const stepForward = () => setCursor((c) => Math.min(c + 1, trace.length - 1));
  const stepBack = () => setCursor((c) => Math.max(c - 1, 0));
  const reset = () => {
    setCursor(0);
    setPlaying(false);
    const steps = generateSymmetricTrace();
    setTrace(steps);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#06060a] to-[#04040b] text-slate-50">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold">Symmetric Tree — Visualizer</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">
          Check whether a tree is symmetric (mirror). Step through the recursion,
          watch comparisons and see code highlighted.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <section className="space-y-4">
          <div className="bg-[#050817] border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <Controls
                playing={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onReset={reset}
                onStepForward={stepForward}
                onStepBack={stepBack}
                mode={mode}
                setMode={setMode}
              />
              <div className="ml-4 text-sm text-slate-400">Mode: <span className="font-medium">{mode}</span></div>
            </div>

            <div className="relative h-[520px]">
              <TreeCanvas trace={trace} cursor={cursor} />
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={Math.max(0, trace.length - 1)}
                value={cursor}
                onChange={(e) => setCursor(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="bg-[#051025] border border-slate-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Recursion / Trace</h3>
            <TracePanel trace={trace} cursor={cursor} />
          </div>

          <div className="bg-[#041022] border border-slate-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Code</h3>
            <CodePanel trace={trace} cursor={cursor} />
          </div>
        </aside>
      </main>
    </div>
  );
}
