"use client";
import React from "react";
import { TraceStep } from "./generateTrace";


export default function ChartViz({ trace, cursor }: { trace: TraceStep[]; cursor: number }) {
const arr = trace[0]?.arr || [];
const points = trace.map((s, i) => ({ x: i, y: s.currentSum }));
const maxY = Math.max(...points.map((p) => p.y), 1);
const minY = Math.min(...points.map((p) => p.y), 0);


const w = 860;
const h = 120;


function mapX(i: number) {
return (i / Math.max(1, points.length - 1)) * (w - 20) + 10;
}
function mapY(y: number) {
const span = maxY - minY || 1;
return h - ((y - minY) / span) * (h - 10) - 5;
}


const d = points.map((p, i) => `${mapX(p.x)},${mapY(p.y)}`).join(' ');


return (
<div className="px-2 py-4">
<svg width={w} height={h} className="block mx-auto">
<polyline fill="none" stroke="#06b6d4" strokeWidth={2} points={d} strokeOpacity={0.9} />
{points.map((p, i) => (
<circle key={i} cx={mapX(p.x)} cy={mapY(p.y)} r={i === cursor ? 6 : 4} fill={i === cursor ? '#06b6d4' : '#0ea5a4'} opacity={0.95} />
))}
</svg>
</div>
);
}