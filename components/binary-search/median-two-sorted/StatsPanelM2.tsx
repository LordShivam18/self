"use client";

import { ModeMSA } from "./ModeToggleM2";

interface StatsPanelMSAProps {
  A: number[];
  B: number[];
  i: number | null;
  j: number | null;
  mode: ModeMSA;
  status: string; // "ready" | "running" | "done"
}

export default function StatsPanelMSA({
  A,
  B,
  i,
  j,
  mode,
  status,
}: StatsPanelMSAProps) {
  // Helpers using safe boundaries
  const maxLeftA =
    i === null || i === 0 ? -Infinity : A[i - 1];
  const minRightA =
    i === null || i === A.length ? Infinity : A[i];

  const maxLeftB =
    j === null || j === 0 ? -Infinity : B[j - 1];
  const minRightB =
    j === null || j === B.length ? Infinity : B[j];

  const conditionOK =
    maxLeftA <= minRightB && maxLeftB <= minRightA;

  const greaterSide =
    maxLeftA > minRightB ? "A-left-too-big" : maxLeftB > minRightA ? "B-left-too-big" : "good";

  const glowOK = conditionOK
    ? "shadow-[0_0_18px_rgba(52,211,153,0.7)] border-emerald-400 text-emerald-300"
    : "border-slate-700 text-slate-300";

  const glowBad = "shadow-[0_0_18px_rgba(239,68,68,0.7)] border-rose-500 text-rose-400";

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_0_40px_rgba(15,23,42,0.95)]">
      {/* Title */}
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"></span>
        Partition Diagnostics
      </h2>

      {/* Top numbers grid */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        {/* A */}
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col gap-1">
          <p className="text-cyan-300 font-semibold">Array A</p>
          <p className="text-slate-400">maxLeftA: <span className="text-cyan-300">{maxLeftA}</span></p>
          <p className="text-slate-400">minRightA: <span className="text-cyan-300">{minRightA}</span></p>
        </div>

        {/* B */}
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col gap-1">
          <p className="text-fuchsia-300 font-semibold">Array B</p>
          <p className="text-slate-400">maxLeftB: <span className="text-fuchsia-300">{maxLeftB}</span></p>
          <p className="text-slate-400">minRightB: <span className="text-fuchsia-300">{minRightB}</span></p>
        </div>
      </div>

      {/* Condition block */}
      <div
        className={`p-3 rounded-xl border text-xs font-mono 
        ${
          conditionOK
            ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.6)]"
            : "bg-rose-500/10 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        }`}
      >
        {conditionOK
          ? "✓ Partition is balanced — correct halves found."
          : `✗ Partition not valid — adjusting search direction...`}
      </div>

      {/* Explanation */}
      <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 rounded-xl p-3 border border-slate-800">
        {mode === "beginner" ? (
          <>
            To compute the median, we split both arrays so that the total left
            side has the same number of elements as the right side.  
            <br />
            <br />
            Partition is correct when:
            <br />
            <span className="text-emerald-300">
              maxLeftA ≤ minRightB AND maxLeftB ≤ minRightA.
            </span>
            <br />
            If not, we move the partition in A:
            <br />
            - If <span className="text-rose-400">maxLeftA &gt; minRightB</span>, we shift partition left  
            - If <span className="text-rose-400">maxLeftB &gt; minRightA</span>, we shift partition right  
          </>
        ) : (
          <>
            Invariant: We seek a partition i in A and j in B such that the combined
            left side contains ⌊(n + m + 1)/2⌋ elements and each left-side element
            is ≤ each right-side element.  
            <br />
            <br />
            The direction rule:  
            {greaterSide === "A-left-too-big" && (
              <span className="text-rose-400">
                • maxLeftA &gt; minRightB → decrease i
              </span>
            )}
            {greaterSide === "B-left-too-big" && (
              <span className="text-rose-400">
                • maxLeftB &gt; minRightA → increase i
              </span>
            )}
            {greaterSide === "good" && (
              <span className="text-emerald-300">
                • Both inequalities satisfied — median reachable.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
