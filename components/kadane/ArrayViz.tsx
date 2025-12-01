"use client";
import React from "react";
import { TraceStep } from "./generateTrace";


export default function ArrayViz({ trace, cursor, width = 940, height = 220 }: { trace: TraceStep[]; cursor: number; width?: number; height?: number }) {
const step = trace[cursor];
const arr = step?.arr || [];
const active = step?.activeRange || null;
const best = step?.bestRange || null;


const maxVal = Math.max(...arr.map((n) => Math.abs(n)), 1);


return (
<div style={{ width }} className="relative overflow-hidden">
<div className="grid grid-cols-9 gap-4 px-2 py-6">
{arr.map((v, idx) => {
const isActive = active && idx >= active[0] && idx <= active[1];
const isBest = best && idx >= best[0] && idx <= best[1];
const h = Math.abs(v) / maxVal * 140 + 12;
const color = isBest ? "bg-teal-400/90" : isActive ? "bg-cyan-400/80" : "bg-slate-700/20";
const glow = isBest ? "shadow-[0_0_18px_rgba(20,255,210,0.16)]" : isActive ? "shadow-[0_0_12px_rgba(56,189,248,0.12)]" : "";


return (
<div key={idx} className="flex flex-col items-center">
<div className={`relative rounded-md border border-cyan-500/20 ${glow}`} style={{ width: 48, height: 160 }}>
<div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 28, height: h }} className={`${color} rounded-md flex items-end justify-center`}>
<span className="text-xs font-mono text-slate-900 py-1">{v}</span>
</div>
</div>
<div className="text-xs text-slate-400 mt-2">{idx}</div>
</div>
);
})}
</div>
</div>
);
}