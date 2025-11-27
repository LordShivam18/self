"use client";

import React, { useEffect, useState } from "react";

import Controls from "@/components/binary-tree/invert-tree/Controls";
import TreeCanvas from "@/components/binary-tree/invert-tree/TreeCanvas";
import TracePanel from "@/components/binary-tree/invert-tree/TracePanel";
import CodePanel from "@/components/binary-tree/invert-tree/CodePanel";
import { generateInvertTrace } from "@/components/binary-tree/invert-tree/generateTrace";

export default function Page() {
  const [trace, setTrace] = useState<any[]>([]);
  const [cursor, setCursor] = useState(0);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");

  useEffect(() => {
    const steps = generateInvertTrace();
    setTrace(steps);
  }, []);

  const stepForward = () =>
    setCursor((c) => Math.min(c + 1, trace.length - 1));

  const reset = () => setCursor(0);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        
        {/* LEFT — Canvas + Controls */}
        <div className="space-y-6">
          <Controls
            cursor={cursor}
            mode={mode}
            setMode={setMode}
            onStep={stepForward}
            onReset={reset}
          />

          <div className="bg-[#161b22] rounded-xl shadow-md p-4">
            <TreeCanvas trace={trace} cursor={cursor} />
          </div>

          <div className="bg-[#161b22] rounded-xl shadow-md p-4">
            <TracePanel trace={trace} cursor={cursor} />
          </div>
        </div>

        {/* RIGHT — Code Panel */}
        <div className="bg-[#161b22] rounded-xl shadow-md p-4">
          <CodePanel trace={trace} cursor={cursor} mode={mode} />
        </div>

      </div>
    </div>
  );
}
