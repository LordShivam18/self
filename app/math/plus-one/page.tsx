// app/math/plus-one/page.tsx
"use client";

import React, { useState, useEffect } from "react";

import Controls from "@/components/math/plus-one/Controls";
import ArrayViz from "@/components/math/plus-one/ArrayViz";
import TracePanel from "@/components/math/plus-one/TracePanel";
import CodePanel from "@/components/math/plus-one/CodePanel";

import { generateTrace, PlusOneStep } from "@/components/math/plus-one/generateTrace";

export default function Page() {
  const initialDigits = [9, 9, 9]; // You can change!
  const [trace, setTrace] = useState<PlusOneStep[]>([]);
  const [cursor, setCursor] = useState(0);

  // Generate trace on load
  useEffect(() => {
    const steps = generateTrace(initialDigits);
    setTrace(steps);
    setCursor(0);
  }, []);

  const stepForward = () =>
    setCursor((c) => Math.min(c + 1, trace.length - 1));

  const stepBack = () => setCursor((c) => Math.max(c - 1, 0));

  return (
    <div className="min-h-screen p-6 text-slate-100 bg-black">
      <h1 className="text-3xl font-extrabold mb-6">
        Plus One — Visualizer
      </h1>

      <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        {/* Left side */}
        <div className="space-y-6">
          <Controls stepBack={stepBack} stepForward={stepForward} />

          <ArrayViz trace={trace} cursor={cursor} />
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <TracePanel trace={trace} cursor={cursor} />

          <div className="bg-[#0b0f19] border border-slate-700 rounded-xl p-4">
            <CodePanel trace={trace} cursor={cursor} />
          </div>
        </div>
      </div>
    </div>
  );
}
