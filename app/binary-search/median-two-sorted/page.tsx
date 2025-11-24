"use client";

import { useState } from "react";
import ModeToggleMSA, {
  ModeMSA,
} from "@/components/binary-search/median-of-two-sorted-arrays/ModeToggleMSA";
import PartitionViewMSA from "@/components/binary-search/median-of-two-sorted-arrays/PartitionViewMSA";
import StatsPanelMSA from "@/components/binary-search/median-of-two-sorted-arrays/StatsPanelMSA";
import CodePanelMSA from "@/components/binary-search/median-of-two-sorted-arrays/CodePanelMSA";

/**
 * We assume numsA is the smaller array – this is the one we binary-search on.
 * You can tweak the values to match your favourite LeetCode example.
 */
const NUMS_A = [1, 3, 8];
const NUMS_B = [7, 9, 10, 11];

const M = NUMS_A.length;
const N = NUMS_B.length;
const TOTAL = M + N;
const IS_EVEN = TOTAL % 2 === 0;

type Status = "ready" | "running" | "done";

type LastAction =
  | {
      kind: "start";
      low: number;
      high: number;
    }
  | {
      kind: "move-left";
      partitionA: number;
      partitionB: number;
      reason: "maxLeftA > minRightB";
    }
  | {
      kind: "move-right";
      partitionA: number;
      partitionB: number;
      reason: "maxLeftB > minRightA";
    }
  | {
      kind: "found";
      partitionA: number;
      partitionB: number;
      leftMax: number;
      rightMin: number;
      median: number;
    }
  | null;

export default function MedianTwoSortedArraysPage() {
  const [mode, setMode] = useState<ModeMSA>("beginner");
  const [status, setStatus] = useState<Status>("ready");

  // binary-search window on NUMS_A
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(M);

  // current partition positions
  const [partitionA, setPartitionA] = useState<number | null>(null);
  const [partitionB, setPartitionB] = useState<number | null>(null);

  // boundary values around the partitions
  const [maxLeftA, setMaxLeftA] = useState<number | null>(null);
  const [minRightA, setMinRightA] = useState<number | null>(null);
  const [maxLeftB, setMaxLeftB] = useState<number | null>(null);
  const [minRightB, setMinRightB] = useState<number | null>(null);

  const [median, setMedian] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState<LastAction>(null);

  function reset() {
    setMode("beginner");
    setStatus("ready");
    setLow(0);
    setHigh(M);
    setPartitionA(null);
    setPartitionB(null);
    setMaxLeftA(null);
    setMinRightA(null);
    setMaxLeftB(null);
    setMinRightB(null);
    setMedian(null);
    setLastAction(null);
  }

  function step() {
    if (status === "done") return;

    // First click moves us into running mode and performs the first partition step.
    if (status === "ready") {
      setStatus("running");
      setLastAction({
        kind: "start",
        low,
        high,
      });
    }

    // Use local copies to compute the next step
    let nextLow = low;
    let nextHigh = high;

    const partitionX = Math.floor((nextLow + nextHigh) / 2);
    const partitionY = Math.floor((M + N + 1) / 2) - partitionX;

    const maxLX =
      partitionX === 0 ? Number.NEGATIVE_INFINITY : NUMS_A[partitionX - 1];
    const minRX =
      partitionX === M ? Number.POSITIVE_INFINITY : NUMS_A[partitionX];

    const maxLY =
      partitionY === 0 ? Number.NEGATIVE_INFINITY : NUMS_B[partitionY - 1];
    const minRY =
      partitionY === N ? Number.POSITIVE_INFINITY : NUMS_B[partitionY];

    // push values into state so all panels/visuals see the same snapshot
    setPartitionA(partitionX);
    setPartitionB(partitionY);
    setMaxLeftA(maxLX);
    setMinRightA(minRX);
    setMaxLeftB(maxLY);
    setMinRightB(minRY);

    const isValidPartition = maxLX <= minRY && maxLY <= minRX;

    if (isValidPartition) {
      const leftMax = Math.max(maxLX, maxLY);
      const rightMin = Math.min(minRX, minRY);
      const med = IS_EVEN ? (leftMax + rightMin) / 2 : leftMax;

      setMedian(med);
      setStatus("done");
      setLastAction({
        kind: "found",
        partitionA: partitionX,
        partitionB: partitionY,
        leftMax,
        rightMin,
        median: med,
      });
      return;
    }

    // Need to move search window
    if (maxLX > minRY) {
      // Too far on right in A, go left
      nextHigh = partitionX - 1;
      setHigh(nextHigh);
      setLow(nextLow);

      setLastAction({
        kind: "move-left",
        partitionA: partitionX,
        partitionB: partitionY,
        reason: "maxLeftA > minRightB",
      });
    } else {
      // Too far on left in A, go right
      nextLow = partitionX + 1;
      setLow(nextLow);
      setHigh(nextHigh);

      setLastAction({
        kind: "move-right",
        partitionA: partitionX,
        partitionB: partitionY,
        reason: "maxLeftB > minRightA",
      });
    }
  }

  function activeCodeLine(): number {
    if (status === "ready") return 5; // low = 0, high = m;

    if (!lastAction) return 9; // while (low <= high)

    switch (lastAction.kind) {
      case "start":
        return 9; // while loop / first iteration
      case "move-left":
        return 18; // high = partitionX - 1;
      case "move-right":
        return 20; // low = partitionX + 1;
      case "found":
        return IS_EVEN ? 23 : 22; // median computation lines
      default:
        return 9;
    }
  }

  function explanation(): string {
    if (status === "ready") {
      return mode === "beginner"
        ? "We have two sorted arrays. Instead of merging them, we’ll slice them with two vertical partitions so that everything on the left is half of the combined array and <= everything on the right."
        : "We binary-search on the smaller array A. For a guess partitionX, we deduce partitionY so that left side has (m + n + 1) / 2 elements. We then check the invariant: maxLeftA ≤ minRightB and maxLeftB ≤ minRightA.";
    }

    if (!lastAction) {
      return "Click Step to move the partition and watch the invariant become true.";
    }

    if (lastAction.kind === "start") {
      return mode === "beginner"
        ? `We start binary search on array A. low = ${lastAction.low}, high = ${lastAction.high}. Each step will slide the cyan partition left or right.`
        : `Initialize low = 0, high = m. Each iteration chooses partitionX = ⌊(low + high) / 2⌋ and partitionY so that the left side has (m + n + 1) / 2 elements.`;
    }

    if (lastAction.kind === "move-left") {
      const { partitionA, partitionB, reason } = lastAction;
      return mode === "beginner"
        ? `Our slice in A was too far to the right (because ${reason}). We move high left: next time partitionX will slide left from ${partitionA}, and partitionY will slide right to keep the left side size correct.`
        : `At partitionX = ${partitionA}, partitionY = ${partitionB}, we had ${reason}, so the invariant maxLeftA ≤ minRightB fails. We shrink the search window by setting high = partitionX − 1.`;
    }

    if (lastAction.kind === "move-right") {
      const { partitionA, partitionB, reason } = lastAction;
      return mode === "beginner"
        ? `Our slice in A was too far to the left (because ${reason}). We move low right: partitionX shifts right from ${partitionA}, and partitionY shifts left.`
        : `At partitionX = ${partitionA}, partitionY = ${partitionB}, we had ${reason}, so we must move the cut in A to the right. Set low = partitionX + 1 to continue the binary search.`;
    }

    if (lastAction.kind === "found") {
      const { leftMax, rightMin, median } = lastAction;
      return mode === "beginner"
        ? `Now the blue left side is exactly half of all elements and every value on the left (max = ${leftMax}) is ≤ every value on the right (min = ${rightMin}). That means the median of the two arrays is ${median}.`
        : `We’ve found a valid partition: maxLeftA = ${maxLeftA}, maxLeftB = ${maxLeftB}, minRightA = ${minRightA}, minRightB = ${minRightB}. The median is ${IS_EVEN ? "(maxLeft + minRight) / 2" : "maxLeft"} = ${median}.`;
    }

    return "We’re sliding the partitions until the invariant holds and the median falls out naturally.";
  }

  const isValidPartition =
    maxLeftA != null &&
    minRightA != null &&
    maxLeftB != null &&
    minRightB != null &&
    maxLeftA <= minRightB &&
    maxLeftB <= minRightA;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#050017] to-black text-slate-50 flex flex-col items-center py-10 px-4 gap-8">
      {/* Header */}
      <header className="flex flex-col items-center gap-3 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-fuchsia-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          Flagship • Binary Search on Two Arrays
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          <span className="text-cyan-300 drop-shadow-[0_0_26px_rgba(34,211,238,0.9)]">
            Median
          </span>{" "}
          of{" "}
          <span className="text-fuchsia-300 drop-shadow-[0_0_26px_rgba(236,72,153,0.9)]">
            Two Sorted Arrays
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Watch a{" "}
          <span className="text-cyan-300 font-medium">laser-thin partition</span>{" "}
          slide across two arrays until the{" "}
          <span className="text-emerald-300 font-medium">median</span> literally
          appears at the boundary.
        </p>
      </header>

      {/* Mode toggle */}
      <ModeToggleMSA mode={mode} onChange={setMode} />

      {/* Info pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] md:text-xs mt-1">
        <div className="px-4 py-1 rounded-full border border-slate-700/80 bg-slate-900/70 font-mono">
          A ={" "}
          <span className="text-cyan-300">
            [{NUMS_A.join(", ")}]
          </span>
        </div>
        <div className="px-4 py-1 rounded-full border border-slate-700/80 bg-slate-900/70 font-mono">
          B ={" "}
          <span className="text-fuchsia-300">
            [{NUMS_B.join(", ")}]
          </span>
        </div>
        <div className="px-4 py-1 rounded-full border border-slate-700/80 bg-slate-900/70 font-mono">
          total = {TOTAL}{" "}
          <span className="text-slate-500">
            ({IS_EVEN ? "even → avg of 2 middles" : "odd → single middle"})
          </span>
        </div>
        <div
          className={`px-4 py-1 rounded-full border text-xs ${
            status === "done"
              ? "border-emerald-500/70 text-emerald-300 bg-emerald-500/10"
              : status === "running"
              ? "border-cyan-500/70 text-cyan-300 bg-cyan-500/10"
              : "border-slate-600 text-slate-300 bg-slate-900/70"
          }`}
        >
          Status:{" "}
          {status === "ready"
            ? "Ready"
            : status === "running"
            ? "Searching…"
            : "Done"}
        </div>
        <div className="px-4 py-1 rounded-full border border-amber-400/60 bg-amber-500/10 text-amber-200 text-[11px] md:text-xs font-mono">
          median ={" "}
          {median == null ? (
            <span className="text-slate-500">?</span>
          ) : (
            <span className="font-semibold">{median}</span>
          )}
        </div>
      </div>

      {/* Main layout */}
      <section className="w-full max-w-6xl flex flex-col gap-6 mt-3">
        {/* Partition visualization */}
        <PartitionViewMSA
          numsA={NUMS_A}
          numsB={NUMS_B}
          partitionA={partitionA}
          partitionB={partitionB}
          maxLeftA={maxLeftA}
          minRightA={minRightA}
          maxLeftB={maxLeftB}
          minRightB={minRightB}
          isValid={isValidPartition}
          status={status}
          mode={mode}
        />

        {/* Explanation banner */}
        <div className="bg-[#050818]/90 backdrop-blur-sm border border-slate-800/80 rounded-2xl px-6 py-4 text-sm md:text-base text-slate-200 shadow-[0_0_40px_rgba(15,23,42,0.95)]">
          {explanation()}
        </div>

        {/* Bottom panels: stats + code */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)] gap-4">
          <StatsPanelMSA
            low={low}
            high={high}
            partitionA={partitionA}
            partitionB={partitionB}
            maxLeftA={maxLeftA}
            minRightA={minRightA}
            maxLeftB={maxLeftB}
            minRightB={minRightB}
            isValid={isValidPartition}
            median={median}
            mode={mode}
          />
          <CodePanelMSA activeLine={activeCodeLine()} mode={mode} />
        </div>
      </section>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={step}
          disabled={status === "done"}
          className="px-7 py-2 rounded-xl text-sm font-medium
                     bg-gradient-to-r from-cyan-500 via-emerald-400 to-fuchsia-500
                     text-slate-950
                     shadow-[0_0_24px_rgba(56,189,248,0.7)]
                     hover:shadow-[0_0_38px_rgba(56,189,248,0.95)]
                     disabled:from-slate-700 disabled:via-slate-700 disabled:to-slate-700
                     disabled:text-slate-300
                     transition-all duration-200"
        >
          {status === "done" ? "Median found 🎉" : "Step →"}
        </button>
        <button
          onClick={reset}
          className="px-7 py-2 rounded-xl text-sm font-medium
                     bg-slate-900/90 border border-slate-700
                     hover:bg-slate-800 hover:border-fuchsia-500
                     hover:shadow-[0_0_24px_rgba(217,70,239,0.6)]
                     transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
