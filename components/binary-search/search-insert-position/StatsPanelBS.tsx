"use client";

import { ModeBS } from "./ModeToggleBS";
import { Status } from "./types";

interface StatsPanelBSProps {
  nums: number[];
  left: number;
  right: number;
  mid: number | null;
  target: number;
  insertPos: number | null;
  status: Status;
  mode: ModeBS;
}

export default function StatsPanelBS({
  nums,
  left,
  right,
  mid,
  target,
  insertPos,
  status,
  mode,
}: StatsPanelBSProps) {
  const inRange = left <= right;
  const length = inRange ? right - left + 1 : 0;
  const midVal = mid !== null ? nums[mid] : null;

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_32px_rgba(15,23,42,0.95)]">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
        Pointer intuition
      </h2>

      <div className="grid grid-cols-2 gap-3 text-[11px] md:text-xs font-mono text-slate-300">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Left pointer</p>
          <p>
            L = <span className="text-cyan-300">{left}</span>
          </p>
          {inRange && left >= 0 && left < nums.length && (
            <p>
              nums[L] ={" "}
              <span className="text-cyan-300">{nums[left]}</span>
            </p>
          )}
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Right pointer</p>
          <p>
            R = <span className="text-emerald-300">{right}</span>
          </p>
          {inRange && right >= 0 && right < nums.length && (
            <p>
              nums[R] ={" "}
              <span className="text-emerald-300">{nums[right]}</span>
            </p>
          )}
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 col-span-2">
          <p className="text-slate-500 mb-1">Range + mid</p>
          <p>
            Active range length ={" "}
            <span className="text-cyan-300">{length}</span>{" "}
            {inRange ? "(inclusive)" : "(empty)"}
          </p>
          <p>
            mid ={" "}
            <span className="text-violet-300">
              {mid !== null ? mid : "-"}
            </span>{" "}
            · nums[mid] ={" "}
            <span className="text-violet-300">
              {midVal !== null ? midVal : "-"}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-3 flex flex-col gap-2 text-[11px] md:text-xs">
        <div className="flex items-center justify-between font-mono">
          <span className="text-slate-400">Target</span>
          <span className="text-emerald-300">{target}</span>
        </div>
        <div className="flex items-center justify-between font-mono">
          <span className="text-slate-400">Current insert index (l)</span>
          <span className="text-cyan-300">
            {status === "done" && insertPos !== null ? insertPos : left}
          </span>
        </div>
        {status === "done" && insertPos !== null && (
          <div className="flex items-center justify-between font-mono">
            <span className="text-slate-400">Result</span>
            <span className="text-emerald-300">
              {insertPos}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {mode === "beginner" ? (
          <>
            Think of the pointers as hands squeezing the array from both
            sides. We always look in the middle. If{" "}
            <span className="text-violet-300">nums[mid]</span> is too small,
            we slide the{" "}
            <span className="text-cyan-300">left hand (L)</span> right. If
            it&apos;s too big, we slide the{" "}
            <span className="text-emerald-300">right hand (R)</span> left.
            When the hands cross, the answer is where{" "}
            <span className="text-cyan-300">L</span> stopped.
          </>
        ) : (
          <>
            We maintain an invariant that the answer lies in the half-open
            interval <span className="font-mono">[l, r + 1)</span>. At every
            step we pick <span className="font-mono">mid</span>, compare
            against the target, and discard the half that cannot contain the
            answer. When the loop ends,{" "}
            <span className="font-mono">l</span> is precisely the smallest
            index where <span className="font-mono">target</span> could be
            inserted while preserving sorted order.
          </>
        )}
      </div>
    </div>
  );
}
