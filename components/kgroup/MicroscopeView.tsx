"use client";

type Stage = "scan" | "reverse-loop" | "apply-reverse" | "connect" | "done";

export default function MicroscopeView({
  chunk,
  loopStep,
  stage,
}: {
  chunk: number[];
  loopStep: number;
  stage: Stage;
}) {
  const len = chunk.length;

  // Only show detailed prev/curr/next when we're inside the reverse loop
  const inLoop = stage === "reverse-loop" && len > 0;

  let prevIdx = -1;
  let currIdx = -1;
  let nextIdx = -1;

  if (inLoop) {
    const i = Math.min(loopStep, len); // 0..len
    // Conceptual mapping:
    // before iteration i:
    // prev = node at i-1, curr = node at i, next = node at i+1
    prevIdx = i - 1;
    currIdx = i < len ? i : -1;
    nextIdx = i + 1 < len ? i + 1 : -1;
  }

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs md:text-sm">
      <h2 className="text-slate-200 font-semibold mb-2 flex items-center gap-2">
        <span className="inline-block w-1.5 h-4 rounded-full bg-cyan-400" />
        Microscope: inside this k-group
      </h2>

      {stage === "scan" && (
        <p className="text-slate-400 text-[11px] md:text-xs">
          In the next steps, we&apos;ll zoom into this block and run the classic
          <span className="text-cyan-300"> prev–curr–next </span>
          reversal loop only on these nodes.
        </p>
      )}

      {inLoop && (
        <p className="text-slate-400 text-[11px] md:text-xs mb-2">
          Loop iteration <span className="text-cyan-300">{loopStep + 1}</span>{" "}
          of <span className="text-cyan-300">{len}</span> in this block.
        </p>
      )}

      <div className="mt-2 flex flex-col gap-2">
        {/* Mini list */}
        <div className="flex items-center gap-1">
          {chunk.map((v, idx) => {
            const isPrev = idx === prevIdx;
            const isCurr = idx === currIdx;
            const isNext = idx === nextIdx;

            let border = "border-slate-600";
            let bg = "bg-slate-900";
            if (isCurr) {
              border = "border-cyan-400";
              bg = "bg-cyan-500/15";
            } else if (isPrev) {
              border = "border-emerald-400";
              bg = "bg-emerald-500/15";
            } else if (isNext) {
              border = "border-violet-400";
              bg = "bg-violet-500/15";
            }

            return (
              <div
                key={idx}
                className={`px-3 py-1 rounded-lg ${bg} ${border} text-slate-100 text-xs`}
              >
                {v}
              </div>
            );
          })}
        </div>

        {/* Prev / Curr / Next labels */}
        <div className="flex justify-between mt-1 text-[11px] text-slate-400">
          <div>
            <span className="text-emerald-300 font-semibold">prev</span>{" "}
            {prevIdx < 0
              ? " = null (before block)"
              : ` = node at position ${prevIdx + 1} in this block`}
          </div>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <div>
            <span className="text-cyan-300 font-semibold">curr</span>{" "}
            {currIdx < 0
              ? " = null (loop finished)"
              : ` = node at position ${currIdx + 1} in this block`}
          </div>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400">
          <div>
            <span className="text-violet-300 font-semibold">next</span>{" "}
            {nextIdx < 0
              ? " = null (no node ahead)"
              : ` = node at position ${nextIdx + 1} in this block`}
          </div>
        </div>
      </div>
    </div>
  );
}
