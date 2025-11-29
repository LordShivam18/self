import React from "react";
import { TraceStep } from "./generateTrace";

type Props = {
  trace: TraceStep[];
  cursor: number;
};

export default function TracePanel({ trace, cursor }: Props) {
  return (
    <div style={{ maxHeight: 340 }} className="overflow-auto">
      <ol className="space-y-2">
        {trace.map((t, i) => {
          const active = i === cursor;
          if (t.type === "enter") {
            return <li key={i} className={`p-2 rounded ${active ? "bg-slate-700" : "bg-transparent"}`}>Enter compare: {t.leftId} ↔ {t.rightId}</li>;
          }
          if (t.type === "compare") {
            return <li key={i} className={`p-2 rounded ${active ? "bg-slate-700" : "bg-transparent"}`}>Compare: {t.leftId}({t.leftVal}) vs {t.rightId}({t.rightVal}) — {t.ok ? "ok" : "fail"}</li>;
          }
          if (t.type === "exit") {
            return <li key={i} className={`p-2 rounded ${active ? "bg-slate-700" : "bg-transparent"}`}>Exit: {t.leftId} ↔ {t.rightId} → {t.result ? "true" : "false"}</li>;
          }
          if (t.type === "done") {
            return <li key={i} className={`p-2 rounded ${active ? "bg-slate-700" : "bg-transparent"}`}>Done: symmetric = {String(t.result)}</li>;
          }
          return <li key={i} className={`p-2 rounded ${active ? "bg-slate-700" : "bg-transparent"}`}>{t.type}</li>;
        })}
      </ol>
    </div>
  );
}
