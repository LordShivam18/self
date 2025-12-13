"use client";

import { useEffect, useState } from "react";

import {
  generateTrace,
  ReverseIIStep,
} from "../../../components/linked-list/reverse-linked-list-ii/generateTrace";

import LinkedListTrack from "../../../components/linked-list/reverse-linked-list-ii/LinkedListTrack";
import MicroscopeView from "../../../components/linked-list/reverse-linked-list-ii/MicroscopeView";
import TracePanel from "../../../components/linked-list/reverse-linked-list-ii/TracePanel";
import CodePanel from "../../../components/linked-list/reverse-linked-list-ii/CodePanel";
import Controls from "../../../components/linked-list/reverse-linked-list-ii/Controls";

export default function Page() {
  const [input, setInput] = useState("1,2,3,4,5");
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(4);

  const [trace, setTrace] = useState<ReverseIIStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");

  const parseInput = () =>
    input
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((n) => !isNaN(n));

  const regenerate = () => {
    const steps = generateTrace(parseInput(), left, right);
    setTrace(steps);
    setCursor(0);
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = trace[cursor];
  const canPrev = cursor > 0;
  const canNext = trace.length > 0 && cursor < trace.length - 1;

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold">
          Reverse Linked List II — Visualizer
        </h1>

        {/* Input + Controls */}
        <div className="rounded-2xl border border-slate-800 bg-[#020617] p-4 space-y-4">
          <div className="flex gap-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg bg-black border border-slate-700 px-3 py-2 text-sm"
              placeholder="1,2,3,4,5"
            />
            <input
              type="number"
              value={left}
              onChange={(e) => setLeft(Number(e.target.value))}
              className="w-20 rounded-lg bg-black border border-slate-700 px-3 py-2 text-sm"
            />
            <input
              type="number"
              value={right}
              onChange={(e) => setRight(Number(e.target.value))}
              className="w-20 rounded-lg bg-black border border-slate-700 px-3 py-2 text-sm"
            />
            <button
              onClick={regenerate}
              className="px-4 py-2 rounded-lg border border-cyan-400 bg-cyan-600/10"
            >
              Visualize
            </button>
          </div>

          <Controls
            prev={() => setCursor((c) => Math.max(0, c - 1))}
            next={() =>
              setCursor((c) => Math.min(trace.length - 1, c + 1))
            }
            reset={() => setCursor(0)}
            canPrev={canPrev}
            canNext={canNext}
            mode={mode}
            setMode={setMode}
          />
        </div>

        {step && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-6">
            <div className="space-y-4">
              <LinkedListTrack step={step} />
              <MicroscopeView step={step} mode={mode} />
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
