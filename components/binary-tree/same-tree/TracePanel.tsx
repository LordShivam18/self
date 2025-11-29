// components/binary-tree/same-tree/TracePanel.tsx
"use client";

import React from "react";
import { TraceStep } from "./generateTrace";

type Props = {
  trace: TraceStep[];
  cursor: number;
};

export default function TracePanel({ trace, cursor }: Props) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Trace</h3>
      <div className="max-h-[320px] overflow-auto space-y-2">
        {trace.map((s, i) => {
          const active = i === cursor;
          return (
            <div
              key={i}
              className={`p-2 rounded-md border ${active ? "border-cyan-400 bg-[#052034]" : "border-slate-700 bg-transparent"}`}
            >
              <div className="text-xs text-slate-300 font-mono">{i}. {s.type}</div>
              <div className="text-sm text-slate-200">{s.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
