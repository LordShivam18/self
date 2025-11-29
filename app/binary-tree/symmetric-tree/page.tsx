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

  // Load initial trace
  useEffect(() => {
    const steps = generateSymmetricTrace();
    setTrace(steps);
    setCursor(0);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (!playing) return;

    timerRef.current = window.setInterval(() => {
      setCursor((c) => Math.min(c + 1, trace.length - 1));
    }, 600);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing, trace.length]);

  // Stop autoplay at the end
  useEffect(() => {
    if (cursor >= trace.length - 1) {
      setPlaying(false);
    }
  }, [cursor, trace.length]);

  const reset = () => {
    const steps = generateSymmetricTrace();
    setTrace(steps);
    setCursor(0);
    setPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#06070c] p-6 text-slate-50">
      <h1 className="text-3xl font-bold mb-4">Symmetric Tree Visualizer</h1>

      <Controls
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReset={reset}
        onStepForward={() => setCursor((c) => Math.min(c + 1, trace.length - 1))}
        onStepBack={() => setCursor((c) => Math.max(c - 1, 0))}
        mode={mode}
        setMode={setMode}
      />

      <TreeCanvas trace={trace} cursor={cursor} />

      <TracePanel trace={trace} cursor={cursor} />
      <CodePanel trace={trace} cursor={cursor} />
    </div>
  );
}
