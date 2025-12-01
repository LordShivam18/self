"use client";
import React from "react";


export default function Controls({ stepBack, stepForward }: { stepBack: () => void; stepForward: () => void }) {
return (
<div className="flex gap-2">
<button onClick={stepBack} className="px-3 py-2 rounded-md border border-slate-700">◀ Step</button>
<button onClick={stepForward} className="px-3 py-2 rounded-md border border-slate-700">Step ▶</button>
</div>
);
}