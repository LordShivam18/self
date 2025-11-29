// app/binary-tree/same-tree/page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Controls from "@/components/binary-tree/same-tree/Controls";
import TreeCanvas from "@/components/binary-tree/same-tree/TreeCanvas";
import TracePanel from "@/components/binary-tree/same-tree/TracePanel";
import CodePanel from "@/components/binary-tree/same-tree/CodePanel";
import { generateSameTreeTrace, TraceStep } from "@/components/binary-tree/same-tree/generateTrace";

export default function Page() {
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const t = generateSameTreeTrace();
    setTrace(t);
    setCursor(0);
  }, []);

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setCursor((c) => Math.min(c + 1, Math.max(0, trace.length - 1)));
    }, 600);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playing, trace.length]);

  const stepForward = () => setCursor((c) => Math.min(c + 1, trace.length - 1));
  const stepBack = () => setCursor((c) => Math.max(0, c - 1));
  const reset = () => {
    setCursor(0);
    setPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#040611] text-slate-100 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold">Same Tree — Visualizer</h1>
        <p className="text-slate-400 mt-1">Compare two trees step-by-step (Beginner / Expert modes)</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <section className="bg-[#061022] border border-slate-800 rounded-2xl p-4 space-y-4">
          <Controls
            playing={playing}
            onPlayToggle={() => setPlaying((p) => !p)}
            onStepBack={stepBack}
            onStepForward={stepForward}
            onReset={reset}
            mode={mode}
            onModeChange={(m) => setMode(m)}
          />

          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <TreeCanvas trace={trace} cursor={cursor} />
            </div>
            <div className="w-80">
              <TracePanel trace={trace} cursor={cursor} />
            </div>
          </div>

          <div>
            <CodePanel trace={trace} cursor={cursor} />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="bg-[#051225] border border-slate-800 rounded-2xl p-4">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-slate-300 text-sm">
              Beginner mode shows explanatory text in trace steps. Expert mode is compact.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
