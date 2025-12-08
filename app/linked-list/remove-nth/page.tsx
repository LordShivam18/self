// app/linked-list/remove-nth/page.tsx
"use client";

import { useEffect, useState } from "react";

import {
  generateTrace,
  RemoveNthStep,
} from "@/components/linked-list/remove-nth/generateTrace";

import LinkedListTrack from "@/components/linked-list/remove-nth/LinkedListTrack";
import MicroscopeView from "@/components/linked-list/remove-nth/MicroscopeView";
import TracePanel from "@/components/linked-list/remove-nth/TracePanel";
import CodePanel from "@/components/linked-list/remove-nth/CodePanel";
import Controls from "@/components/linked-list/remove-nth/Controls";

export default function Page() {
  const [trace, setTrace] = useState<RemoveNthStep[]>([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const steps = generateTrace([1, 2, 3, 4, 5], 2);
    setTrace(steps);
    setCursor(0);
  }, []);

  const step = trace[cursor];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-extrabold">
          Remove Nth Node From End — Visualizer
        </h1>

        <Controls
          prev={() => setCursor((c) => Math.max(0, c - 1))}
          next={() => setCursor((c) => Math.min(trace.length - 1, c + 1))}
          reset={() => setCursor(0)}
          canPrev={cursor > 0}
          canNext={cursor < trace.length - 1}
        />

        {step && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6">
            <div className="space-y-4">
              <LinkedListTrack step={step} />
              <MicroscopeView step={step} />
            </div>

            <div className="space-y-4">
              <TracePanel step={step} />
              <CodePanel step={step} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
