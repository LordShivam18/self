"use client";

import { useEffect, useState } from "react";

import {
  generateTrace,
  LRUStep,
} from "../../../components/linked-list/lru-cache/generateTrace";

import CacheTrack from "../../../components/linked-list/lru-cache/CacheTrack";
import HashMapViz from "../../../components/linked-list/lru-cache/HashMapViz";
import MicroscopeView from "../../../components/linked-list/lru-cache/MicroscopeView";
import TracePanel from "../../../components/linked-list/lru-cache/TracePanel";
import CodePanel from "../../../components/linked-list/lru-cache/CodePanel";
import Controls from "../../../components/linked-list/lru-cache/Controls";

export default function Page() {
  const [trace, setTrace] = useState<LRUStep[]>([]);
  const [cursor, setCursor] = useState(0);
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");

  useEffect(() => {
    const ops = [
      { type: "put", key: 1, value: 1 },
      { type: "put", key: 2, value: 2 },
      { type: "get", key: 1 },
      { type: "put", key: 3, value: 3 },
      { type: "get", key: 2 },
      { type: "put", key: 4, value: 4 },
      { type: "get", key: 1 },
      { type: "get", key: 3 },
      { type: "get", key: 4 },
    ] as any;

    setTrace(generateTrace(2, ops));
  }, []);

  const step = trace[cursor];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold">
          LRU Cache — Visualizer
        </h1>

        {step && (
          <>
            <Controls
              prev={() => setCursor((c) => Math.max(0, c - 1))}
              next={() => setCursor((c) => Math.min(trace.length - 1, c + 1))}
              reset={() => setCursor(0)}
              canPrev={cursor > 0}
              canNext={cursor < trace.length - 1}
              mode={mode}
              setMode={setMode}
            />

            <HashMapViz keys={step.mapKeys} activeKey={step.activeKey} />
            <CacheTrack step={step} />
            <MicroscopeView step={step} mode={mode} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TracePanel step={step} />
              <CodePanel step={step} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
