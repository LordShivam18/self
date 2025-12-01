"use client";
import React from "react";
import { TraceStep } from "./generateTrace";

export default function TracePanel({
  trace,
  cursor,
}: {
  trace: TraceStep[];
  cursor: number;
}) {
  const s = trace[cursor];

  return (
    <div className="text-slate-300 text-sm font-mono p-2">
      <div className="mb-2">Step: {cursor + 1} / {trace.length}</div>
      <div className="mb-1">Index: {s?.i ?? "-"}</div>
      <div className="mb-1">Current Sum: {s?.currentSum ?? "-"}</div>
      <div className="mb-1">Best Sum: {s?.bestSum ?? "-"}</div>

      <div className="mb-1">
        Active Range:{" "}
        {s?.activeRange
          ? `${s.activeRange[0]} .. ${s.activeRange[1]}`
          : "-"}
      </div>

      <div className="mb-1">
        Best Range:{" "}
        {s?.bestRange
          ? `${s.bestRange[0]} .. ${s.bestRange[1]}`
          : "-"}
      </div>
    </div>
  );
}
