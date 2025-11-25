"use client";

import React from "react";
import { ModeM2 } from "./ModeToggleM2";

type Status = "ready" | "processing" | "done";

interface StatsPanelM2Props {
  nums1: number[];
  nums2: number[];
  i: number | null;
  j: number | null;
  status: Status;
  median: number | null;
  relation: "balanced" | "move-left" | "move-right" | "none";
  mode: ModeM2;
}

function sentinelLabel(v: number, isLeft: boolean) {
  if (!Number.isFinite(v)) {
    return isLeft ? "-∞" : "+∞";
  }
  return v.toString();
}

export default function StatsPanelM2({
  nums1,
  nums2,
  i,
  j,
  status,
  median,
  relation,
  mode,
}: StatsPanelM2Props) {
  const m = nums1.length;
  const n = nums2.length;

  const ii = i ?? 0;
  const jj = j ?? 0;

  const left1 = ii > 0 ? nums1[ii - 1] : Number.NEGATIVE_INFINITY;
  const right1 = ii < m ? nums1[ii] : Number.POSITIVE_INFINITY;
  const left2 = jj > 0 ? nums2[jj - 1] : Number.NEGATIVE_INFINITY;
  const right2 = jj < n ? nums2[jj] : Number.POSITIVE_INFINITY;

  const combinedLeft = Math.max(left1, left2);
  const combinedRight = Math.min(right1, right2);

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4 flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="inline-flex h-4 w-1.5 rounded-full bg-gradient-to-b from-sky-400 to-emerald-400" />
        Partition snapshot
      </h2>

      <div className="grid grid-cols-2 gap-3 text-[11px] md:text-xs font-mono text-slate-300">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl px-3 py-2 flex flex-col gap-1">
          <p className="text-slate-500 mb-1">Array A around i</p>
          <p>
            i = <span className="text-sky-300">{i ?? "?"}</span>
          </p>
          <p>
            leftA ={" "}
            <span className="text-sky-300">
              {sentinelLabel(left1, true)}
            </span>
          </p>
          <p>
            rightA ={" "}
            <span className="text-sky-300">
              {sentinelLabel(right1, false)}
            </span>
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl px-3 py-2 flex flex-col gap-1">
          <p className="text-slate-500 mb-1">Array B around j</p>
          <p>
            j = <span className="text-rose-300">{j ?? "?"}</span>
          </p>
          <p>
            leftB ={" "}
            <span className="text-rose-300">
              {sentinelLabel(left2, true)}
            </span>
          </p>
          <p>
            rightB ={" "}
            <span className="text-rose-300">
              {sentinelLabel(right2, false)}
            </span>
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl px-3 py-2 flex flex-col gap-1 col-span-2">
          <p className="text-slate-500 mb-1">Cross comparison</p>
          <p>
            max(leftA, leftB) ={" "}
            <span className="text-emerald-300">
              {sentinelLabel(combinedLeft, true)}
            </span>
          </p>
          <p>
            min(rightA, rightB) ={" "}
            <span className="text-amber-300">
              {sentinelLabel(combinedRight, false)}
            </span>
          </p>
          {status === "done" && median !== null && (
            <p className="mt-1">
              median ={" "}
              <span className="text-lg text-emerald-300 font-semibold">
                {median}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-1 text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {mode === "beginner" ? (
          <>
            We keep sliding the cut <span className="text-sky-300">i</span> in
            A and <span className="text-rose-300">j</span> in B until everything
            on the left side is ≤ everything on the right. Then the answer is
            built from{" "}
            <span className="text-emerald-300">max(leftA, leftB)</span> and{" "}
            <span className="text-amber-300">min(rightA, rightB)</span>.
          </>
        ) : (
          <>
            Invariant: the combined left partition has exactly{" "}
            <span className="font-mono">
              (m + n + 1) / 2
            </span>{" "}
            elements. We adjust i so that{" "}
            <span className="font-mono">leftA ≤ rightB</span> and{" "}
            <span className="font-mono">leftB ≤ rightA</span>. When both hold,
            the median is determined by{" "}
            <span className="font-mono">max(leftA, leftB)</span> and{" "}
            <span className="font-mono">min(rightA, rightB)</span>.
          </>
        )}
      </div>

      <p className="text-[11px] text-slate-400 italic">
        Step relation:{" "}
        {relation === "balanced"
          ? "balanced (we found the correct cut)"
          : relation === "move-left"
          ? "i moved left (leftA was too big)"
          : relation === "move-right"
          ? "i moved right (leftB was too big)"
          : "choosing the next cut"}
      </p>
    </div>
  );
}
