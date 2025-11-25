"use client";

import React from "react";

interface PartitionViewProps {
  nums1: number[];
  nums2: number[];
  i: number | null;
  j: number | null;
  relation: "balanced" | "move-left" | "move-right" | "none";
}

export default function PartitionView({
  nums1,
  nums2,
  i,
  j,
  relation,
}: PartitionViewProps) {
  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2);

  const leftCount = (i ?? 0) + (j ?? 0);
  const rightCount = total - leftCount;

  const relationText =
    relation === "balanced"
      ? "Partitions are balanced – every element on the left half is ≤ every element on the right."
      : relation === "move-left"
      ? "The left side from A is too large; we shift i to the left."
      : relation === "move-right"
      ? "The left side from B is too large; we shift i to the right."
      : "We are choosing partitions so that exactly half of the elements sit on the left side.";

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-200">
          Half-split overview
        </span>
        <span className="font-mono">
          half = (m + n + 1) / 2 ={" "}
          <span className="text-slate-100">{half}</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Left half size</span>
            <span className="font-mono text-sky-300">
              {leftCount}/{half}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-300 transition-all duration-500"
              style={{ width: `${Math.min(1, leftCount / Math.max(1, half)) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Right half size</span>
            <span className="font-mono text-rose-300">
              {rightCount}/{total - half}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-300 via-fuchsia-300 to-indigo-300 transition-all duration-500"
              style={{
                width: `${Math.min(
                  1,
                  rightCount / Math.max(1, total - half)
                ) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {relationText}
      </p>
    </div>
  );
}
