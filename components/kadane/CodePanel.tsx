"use client";
import React from "react";
import { TraceStep } from "./generateTrace";


export default function CodePanel({ trace, cursor }: { trace: TraceStep[]; cursor: number }) {
const step = trace[cursor];
const highlight = step?.highlightLines || [];


const lines = [
'// Kadane - find max subarray',
'function kadane(arr) {',
' let best = -Infinity;',
' let cur = 0;',
' let start = 0;',
' for (let i = 0; i < arr.length; i++) {',
' if (cur + arr[i] < arr[i]) { cur = arr[i]; start = i; } else { cur += arr[i]; }',
' if (cur > best) { best = cur; }',
' }',
' return best;',
'}',
];


return (
<div className="bg-[#061018] rounded-md p-3 font-mono text-sm overflow-auto" style={{ maxHeight: 420 }}>
{lines.map((ln, idx) => {
const num = idx + 1;
const isH = highlight.includes(num);
return (
<div key={idx} className={`flex items-start gap-3 py-1 ${isH ? 'bg-cyan-500/6 rounded-md' : ''}`}>
<div className="text-xs text-slate-500 w-8">{num}</div>
<div className={`whitespace-pre-wrap ${isH ? 'text-cyan-300' : 'text-slate-300'}`}>{ln}</div>
</div>
);
})}
</div>
);
}