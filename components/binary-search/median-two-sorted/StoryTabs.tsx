"use client";

import React, { useState } from "react";
import { ModeM2 } from "./ModeToggleM2";

type Stage =
  | "intro"
  | "search"
  | "adjust-left"
  | "adjust-right"
  | "balanced"
  | "done";

interface StoryTabsProps {
  mode: ModeM2;
  stage: Stage;
}

const tabIds = ["idea", "invariant", "edges"] as const;
type TabId = (typeof tabIds)[number];

export default function StoryTabs({ mode, stage }: StoryTabsProps) {
  const [tab, setTab] = useState<TabId>("idea");

  function renderBody() {
    if (tab === "idea") {
      return mode === "beginner" ? (
        <>
          We pretend to cut the two arrays into a{" "}
          <span className="text-sky-300">left half</span> and a{" "}
          <span className="text-rose-300">right half</span>. The trick is to
          choose the cuts so the left half contains exactly half of the combined
          elements.
        </>
      ) : (
        <>
          We are searching for a partition with{" "}
          <span className="font-mono">i + j = (m + n + 1) / 2</span> such that{" "}
          <span className="font-mono">leftA ≤ rightB</span> and{" "}
          <span className="font-mono">leftB ≤ rightA</span>. This guarantees
          that all elements in the left partition are ≤ all elements in the
          right partition.
        </>
      );
    }

    if (tab === "invariant") {
      return mode === "beginner" ? (
        <>
          At every step, our partition splits the combined arrays into left and
          right. We only move{" "}
          <span className="text-sky-300">i</span> left or right when something
          on the left is bigger than something on the right.
        </>
      ) : (
        <>
          Invariant: the answer (median) always lives between{" "}
          <span className="font-mono">max(leftA, leftB)</span> and{" "}
          <span className="font-mono">min(rightA, rightB)</span>. The binary
          search changes <span className="font-mono">i</span> while preserving{" "}
          <span className="font-mono">i + j = half</span>; we discard partitions
          that violate the order constraints.
        </>
      );
    }

    // edges tab
    return mode === "beginner" ? (
      <>
        Edge cases: one array can contribute nothing to the left or right.
        That’s why we treat missing values as{" "}
        <span className="font-mono">-∞</span> or{" "}
        <span className="font-mono">+∞</span>, so they never block the correct
        comparison.
      </>
    ) : (
      <>
        Edge cases include extremely unbalanced sizes, duplicates, and all
        elements coming from one side of the cut. Using sentinels for{" "}
        <span className="font-mono">leftA/rightA/leftB/rightB</span> keeps the
        logic branch-free and mathematically clean.
      </>
    );
  }

  const stageLabel =
    stage === "intro"
      ? "Set up search space"
      : stage === "search"
      ? "Choosing cut i in A"
      : stage === "adjust-left"
      ? "i moved left (leftA too big)"
      : stage === "adjust-right"
      ? "i moved right (leftB too big)"
      : stage === "balanced"
      ? "Partitions balanced – median computed"
      : "Done";

  return (
    <div className="rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-100">Story mode</span>
        <span className="font-mono text-[10px] text-slate-400">
          Stage: <span className="text-slate-100">{stageLabel}</span>
        </span>
      </div>

      <div className="inline-flex gap-2 rounded-full bg-slate-900/80 px-1 py-1 w-fit text-[11px]">
        {tabIds.map((id) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 py-1 rounded-full capitalize transition-all ${
              tab === id
                ? "bg-slate-100 text-slate-900 font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {renderBody()}
      </p>
    </div>
  );
}
