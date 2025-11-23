"use client";

import { Status } from "./types";

interface BarViewProps {
  nums: number[];
  left: number;
  right: number;
  mid: number | null;
  target: number;
  insertPos: number | null;
  status: Status;
}

export default function BarView({
  nums,
  left,
  right,
  mid,
  target,
  insertPos,
  status,
}: BarViewProps) {
  return (
    <div className="bg-[#020617] border border-slate-800/80 rounded-2xl px-6 py-5 shadow-[0_0_40px_rgba(15,23,42,0.95)]">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
        <span className="font-mono">
          Search range:{" "}
          <span className="text-cyan-300">
            [{left}, {right}]
          </span>
        </span>
        <span className="font-mono">
          Target: <span className="text-emerald-300">{target}</span>
        </span>
      </div>

      {/* bars */}
      <div className="flex items-end justify-center gap-4 h-40 relative">
        {/* search window highlight */}
        <div className="absolute inset-x-6 bottom-0 top-6 pointer-events-none">
          <div className="h-full w-full rounded-3xl bg-gradient-to-t from-cyan-500/5 via-violet-500/4 to-transparent" />
        </div>

        {nums.map((value, idx) => {
          const inactive = idx < left || idx > right;
          const isMid = mid === idx;
          const isInsert =
            status === "done" && insertPos !== null && insertPos === idx;

          let barClasses =
            "relative flex items-end justify-center rounded-t-xl border transition-all duration-300 w-10 md:w-12";

          if (inactive) {
            barClasses +=
              " bg-slate-800/40 border-slate-700/40 opacity-40 scale-95";
          } else {
            barClasses +=
              " bg-slate-900/80 border-slate-700 shadow-[0_0_10px_rgba(15,23,42,0.7)]";
          }

          if (isMid) {
            barClasses +=
              " bg-gradient-to-t from-violet-600 via-fuchsia-500 to-pink-400 border-fuchsia-300 shadow-[0_0_24px_rgba(217,70,239,0.9)] scale-[1.03]";
          }

          if (isInsert) {
            barClasses +=
              " bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 border-emerald-300 shadow-[0_0_26px_rgba(16,185,129,0.9)]";
          }

          const height = 14 * value; // px

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              {/* pointer chips row above bar */}
              <div className="h-6 flex items-end justify-center">
                <div className="flex gap-1">
                  {idx === left && left <= right && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                      L
                    </span>
                  )}
                  {mid !== null && idx === mid && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-violet-500/20 text-violet-300 border border-violet-400/70 shadow-[0_0_12px_rgba(139,92,246,0.8)]">
                      M
                    </span>
                  )}
                  {idx === right && left <= right && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/70 shadow-[0_0_12px_rgba(16,185,129,0.8)]">
                      R
                    </span>
                  )}
                </div>
              </div>

              {/* bar */}
              <div
                className={barClasses}
                style={{ height: `${height + 12}px` }}
              >
                {/* beam for mid */}
                {isMid && (
                  <div className="absolute inset-x-1 bottom-0 top-0 bg-gradient-to-t from-violet-500/20 via-violet-400/10 to-transparent pointer-events-none" />
                )}
              </div>

              {/* index + value */}
              <div className="flex flex-col items-center text-[11px] font-mono text-slate-300">
                <span className="text-slate-500">idx {idx}</span>
                <span className="text-cyan-200">{value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* insert position indicator row */}
      <div className="mt-3 flex justify-center gap-4 text-[11px] font-mono text-slate-400">
        {nums.map((_, idx) => (
          <div
            key={idx}
            className="w-10 md:w-12 flex flex-col items-center justify-center"
          >
            {insertPos !== null && insertPos === idx && (
              <>
                <span className="text-emerald-400 text-xs">▲</span>
                <span className="text-emerald-400">insert</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* extra slot for "at end" insert position */}
      {insertPos !== null && insertPos === nums.length && (
        <div className="mt-2 text-center text-[11px] font-mono text-emerald-300">
          Insert after last element (index {nums.length})
        </div>
      )}
    </div>
  );
}
