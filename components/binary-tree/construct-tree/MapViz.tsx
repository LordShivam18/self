"use client";
import React from "react";

export default function MapViz({
  entries,
  highlight,
}: {
  entries: { key: number; idx: number }[];
  highlight?: number;
}) {
  return (
    <div className="bg-[#04050a] border border-slate-800 rounded-xl p-3">
      <h4 className="text-slate-200 font-semibold">unordered_map (inorder → index)</h4>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        {entries.length === 0 ? (
          <div className="col-span-2 text-slate-400">Map is empty (step through to see inserts)</div>
        ) : (
          entries.map((e, i) => (
            <div
              key={i}
              className={`p-2 rounded-md flex items-center justify-between ${
                highlight === e.key ? "bg-cyan-600/10 border border-cyan-500/30" : "bg-slate-900/30 border border-slate-800"
              }`}
            >
              <div className="font-mono text-xs text-slate-300">{e.key}</div>
              <div className="text-xs text-slate-400 font-mono">{e.idx}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
