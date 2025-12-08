// app/linked-list/remove-duplicates-ii/page.tsx
"use client";

import React, { useEffect, useState } from "react";

import {
  generateTrace,
  RemoveDupIIStep,
} from "@/components/linked-list/remove-duplicates-ii/generateTrace";

import LinkedListTrack from "@/components/linked-list/remove-duplicates-ii/LinkedListTrack";
import MicroscopeView from "@/components/linked-list/remove-duplicates-ii/MicroscopeView";
import TracePanel from "@/components/linked-list/remove-duplicates-ii/TracePanel";
import CodePanel from "@/components/linked-list/remove-duplicates-ii/CodePanel";
import Controls from "@/components/linked-list/remove-duplicates-ii/Controls";

export default function Page() {
  const [trace, setTrace] = useState<RemoveDupIIStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [input, setInput] = useState("1,2,3,3,4,4,5");

  // helper to parse "1,2,3,3,4" → [1,2,3,3,4]
  function parseInput(str: string): number[] {
    return str
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => Number(s))
      .filter((n) => !Number.isNaN(n));
  }

  const regenerate = () => {
    const arr = parseInput(input);
    const steps = generateTrace(arr);
    setTrace(steps);
    setCursor(0);
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = trace[cursor];

  const canPrev = cursor > 0;
  const canNext = trace.length > 0 && cursor < trace.length - 1;

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Remove Duplicates from Sorted List II — Visualizer
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            We keep only the values that appear exactly once in the sorted linked
            list. Contiguous duplicate blocks are detected and skipped using a{" "}
            <span className="text-cyan-300">dummy</span>,{" "}
            <span className="text-emerald-300">prev</span>, and{" "}
            <span className="text-cyan-300">curr</span> pointers.
          </p>
        </header>

        {/* Input + controls */}
        <div className="rounded-2xl border border-slate-800 bg-[#020617] p-4 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-400 uppercase tracking-wide">
              Input Sorted List (comma-separated)
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") regenerate();
              }}
              className="w-full rounded-lg bg-black border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="e.g. 1,2,3,3,4,4,5"
            />
            <button
              onClick={regenerate}
              className="self-start px-3 py-1.5 text-xs rounded-lg border border-cyan-500 bg-cyan-600/10 hover:bg-cyan-500/20"
            >
              Visualize
            </button>
          </div>

          <Controls
            onPrev={() => setCursor((c) => Math.max(0, c - 1))}
            onNext={() => setCursor((c) => Math.min(trace.length - 1, c + 1))}
            onReset={() => setCursor(0)}
            canPrev={canPrev}
            canNext={canNext}
          />
        </div>

        {current && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6">
            <div className="space-y-4">
              <LinkedListTrack step={current} />
              <MicroscopeView step={current} />
            </div>

            <div className="space-y-4">
              <TracePanel step={current} />
              <CodePanel step={current} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
