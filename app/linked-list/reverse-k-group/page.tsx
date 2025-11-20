"use client";

import { useState } from "react";
import Node3D from "@/components/kgroup/Node3D";
import ModeToggle from "@/components/kgroup/ModeToggle";
import MicroscopeView from "@/components/kgroup/MicroscopeView";

const ORIGINAL = [1, 2, 3, 4, 5, 6];
const K = 3;

type Stage = "scan" | "reverse-loop" | "apply-reverse" | "connect" | "done";
type Mode = "beginner" | "expert";

export default function ReverseKGroup() {
  const [nodes, setNodes] = useState<number[]>(ORIGINAL);
  const [groupIndex, setGroupIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("scan");
  const [loopStep, setLoopStep] = useState(0);
  const [mode, setMode] = useState<Mode>("beginner");

  const totalGroups = Math.floor(nodes.length / K);
  const hasMoreGroups = groupIndex < totalGroups;

  const start = groupIndex * K;
  const end = start + K;
  const currentChunk = nodes.slice(start, end);
  const chunkLen = currentChunk.length;

  const algorithmPhase: "scan" | "reverse" | "connect" | "done" =
    stage === "done"
      ? "done"
      : stage === "scan"
      ? "scan"
      : stage === "reverse-loop"
      ? "reverse"
      : "connect";

  function handleStep() {
    if (stage === "done") return;

    if (!hasMoreGroups) {
      setStage("done");
      return;
    }

    switch (stage) {
      case "scan": {
        // Done selecting the group; now go inside the loop.
        setStage("reverse-loop");
        setLoopStep(0);
        break;
      }
      case "reverse-loop": {
        if (loopStep + 1 < chunkLen) {
          setLoopStep((s) => s + 1);
        } else {
          // Finished conceptual loop; next step will apply reversal to the main list.
          setStage("apply-reverse");
        }
        break;
      }
      case "apply-reverse": {
        // Actually reverse this k-block in the main list
        setNodes((prev) => {
          const copy = [...prev];
          const reversed = copy.slice(start, end).reverse();
          copy.splice(start, K, ...reversed);
          return copy;
        });
        setStage("connect");
        break;
      }
      case "connect": {
        // Move to next group, or done if no more
        if (groupIndex + 1 < totalGroups) {
          setGroupIndex((g) => g + 1);
          setStage("scan");
          setLoopStep(0);
        } else {
          setStage("done");
        }
        break;
      }
    }
  }

  function handleReset() {
    setNodes(ORIGINAL);
    setGroupIndex(0);
    setStage("scan");
    setLoopStep(0);
  }

  function getExplanation() {
    if (stage === "done") {
      return "All blocks of size k have been reversed. Any leftover nodes (fewer than k) remain in their original order.";
    }

    if (stage === "scan") {
      return `We scan ahead k = ${K} nodes starting at position ${
        start + 1
      } to make sure a full block exists. This block is treated as a tiny list that we'll reverse in place.`;
    }

    if (stage === "reverse-loop") {
      return `Inside this k-sized block, we conceptually run the classic prev–curr–next loop. At each iteration, we flip one arrow so that this chunk is reversed without touching the rest of the list.`;
    }

    if (stage === "apply-reverse") {
      return "Now we apply the reversal result back to the main row. The highlighted block flips as a whole while everything outside stays fixed.";
    }

    // connect
    return "We now stitch the reversed block back to the previous part of the list and move groupPrev to the end of this block, ready for the next group.";
  }

  return (
    <div className="min-h-screen bg-black text-slate-50 flex flex-col items-center py-10 gap-8">
      {/* Title */}
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          Reverse Nodes in <span className="text-cyan-400">k</span>-Group
        </h1>
        <p className="text-sm text-slate-400">
          Visual + pointer-level explanation for k = {K}
        </p>
        <ModeToggle mode={mode} onChange={setMode} />
      </header>

      {/* Top info badges */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="px-4 py-1 rounded-full border border-slate-700 bg-slate-900/60 text-xs uppercase tracking-[0.2em] text-slate-300">
          k = {K}
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-xs text-cyan-300">
          Group {Math.min(groupIndex + 1, totalGroups)} of {totalGroups} ·{" "}
          {stage === "scan"
            ? "Selecting group"
            : stage === "reverse-loop"
            ? "Running reverse loop"
            : stage === "apply-reverse"
            ? "Applying reversal"
            : stage === "connect"
            ? "Connecting groups"
            : "Done"}
        </div>
        <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-300">
          Mode: {mode === "beginner" ? "Beginner" : "Expert"}
        </div>
      </div>

      {/* 3D row */}
      <div className="relative mt-2">
        {/* subtle base line / rail */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* nodes */}
        <div className="flex items-center gap-6 px-6 pt-4">
          {nodes.map((value, index) => {
            const isInGroup = index >= start && index < end && stage !== "done";
            const isReversing = stage === "apply-reverse" && isInGroup;

            // small vertical offset to fake a curve
            const mid = (nodes.length - 1) / 2;
            const offset = (index - mid) * 6;

            return (
              <div
                key={index}
                className="relative transition-all duration-500"
                style={{ transform: `translateY(${offset}px)` }}
              >
                <Node3D
                  value={value}
                  isInGroup={!!isInGroup}
                  isReversing={!!isReversing}
                />

                {index < nodes.length - 1 && (
                  <div className="absolute top-1/2 -right-6 -translate-y-1/2 text-slate-500 text-2xl select-none">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* highlight bracket under current group */}
        {stage !== "done" && (
          <div
            className="absolute -bottom-8 h-6 rounded-3xl border border-cyan-500/60 bg-cyan-500/10 transition-all duration-500 ease-out"
            style={{
              left: `${start * 72 + 12}px`,
              width: `${K * 72 - 24}px`,
            }}
          />
        )}
      </div>

      {/* Main explanation card */}
      <div className="bg-[#050816] border border-slate-800/80 shadow-[0_0_40px_rgba(15,23,42,0.9)] rounded-2xl px-6 py-4 max-w-3xl text-center text-sm text-slate-200">
        {getExplanation()}
      </div>

      {/* Classroom board */}
      {mode === "beginner" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mt-2">
          {/* Pointer HUD / conceptual board */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs md:text-sm">
            <h2 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 rounded-full bg-emerald-400" />
              Pointer intuition
            </h2>

            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Current group range</span>
                <span>
                  positions {start + 1}–{end} of {nodes.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Group size</span>
                <span>{currentChunk.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">prev (conceptually)</span>
                <span className="text-emerald-300">
                  {stage === "scan"
                    ? "points to node before this block"
                    : stage === "reverse-loop"
                    ? "moves inside the block as we reverse"
                    : "ends at the new head of this block"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">curr</span>
                <span className="text-cyan-300">
                  {stage === "scan"
                    ? "starts at first node of block"
                    : stage === "reverse-loop"
                    ? "walks through nodes flipping arrows"
                    : "has moved past this block"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">next</span>
                <span className="text-violet-300">
                  {stage === "reverse-loop"
                    ? "temporarily saves the rest of the block"
                    : "keeps the list from being lost"}
                </span>
              </div>
            </div>
          </div>

          {/* Microscope view */}
          <MicroscopeView chunk={currentChunk} loopStep={loopStep} stage={stage} />

          {/* Algorithm snippet */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-[11px] md:text-xs font-mono text-slate-300">
            <h2 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 rounded-full bg-indigo-400" />
              What this step corresponds to in code
            </h2>

            <pre className="space-y-1">
              <code
                className={
                  algorithmPhase === "scan"
                    ? "bg-slate-800/80 rounded px-1 block"
                    : "block"
                }
              >
{`// 1. Find the kth node from groupPrev
kth = moveForward(groupPrev, k);`}
              </code>
              <code
                className={
                  algorithmPhase === "reverse"
                    ? "bg-slate-800/80 rounded px-1 block"
                    : "block"
                }
              >
{`// 2. Reverse the nodes in this block
prev = kthNext;
curr = groupPrev->next;
while (curr != kthNext) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
}`}
              </code>
              <code
                className={
                  algorithmPhase === "connect"
                    ? "bg-slate-800/80 rounded px-1 block"
                    : "block"
                }
              >
{`// 3. Stitch the reversed block back
temp = groupPrev->next;
groupPrev->next = kth;
groupPrev = temp;`}
              </code>
              <code
                className={
                  algorithmPhase === "done"
                    ? "bg-emerald-500/10 rounded px-1 block text-emerald-300"
                    : "block text-slate-500"
                }
              >
{`// Repeat until there are fewer than k nodes left.`}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Expert mode: only short summary + code */}
      {mode === "expert" && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-4 mt-2">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs md:text-sm">
            <h2 className="text-slate-200 font-semibold mb-2">
              High-level idea
            </h2>
            <p className="text-slate-300 text-[11px] md:text-xs">
              Treat each k-block as an isolated list: scan k nodes, reverse that
              section with the classical prev–curr–next loop, then reattach it
              between groupPrev and kthNext. Move groupPrev to the tail of the
              reversed block and repeat.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-[11px] md:text-xs font-mono text-slate-300">
            <pre>
{`ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* groupPrev = &dummy;

    while (true) {
        ListNode* kth = moveForward(groupPrev, k);
        if (!kth) break;
        ListNode* kthNext = kth->next;

        // reverse [groupPrev->next, kth]
        ListNode* prev = kthNext;
        ListNode* curr = groupPrev->next;
        while (curr != kthNext) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }

        ListNode* temp = groupPrev->next;
        groupPrev->next = kth;
        groupPrev = temp;
    }
    return dummy.next;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleStep}
          disabled={stage === "done"}
          className="px-7 py-2 rounded-xl text-sm font-medium
                     bg-cyan-500 text-slate-950
                     hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-400
                     shadow-[0_0_30px_rgba(34,211,238,0.55)]
                     transition-all"
        >
          {stage === "done" ? "Done" : "Step →"}
        </button>

        <button
          onClick={handleReset}
          className="px-7 py-2 rounded-xl text-sm font-medium
                     bg-slate-900 border border-slate-700
                     hover:bg-slate-800 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
