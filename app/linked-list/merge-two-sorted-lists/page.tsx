"use client";

import { useState } from "react";
import MergeNode from "./MergeNode";
import MergeArrow from "./MergeArrow";
import MergePointer from "./MergePointer";

export default function MergeTwoSortedLists() {
  const l1 = [1, 3, 5];
  const l2 = [2, 4, 6];

  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);

  const [result, setResult] = useState<number[]>([]);
  const [explanation, setExplanation] = useState("Click Step to begin merging.");

  const NODE_GAP = 80;
  const p1Pos = i1 * NODE_GAP;
  const p2Pos = i2 * NODE_GAP;

  function step() {
    if (i1 >= l1.length && i2 >= l2.length) return;

    const x = i1 < l1.length ? l1[i1] : Infinity;
    const y = i2 < l2.length ? l2[i2] : Infinity;

    if (x <= y) {
      setResult((prev) => [...prev, x]);
      setExplanation(`Pick ${x} from List 1.`);
      if (i1 < l1.length) setI1(i1 + 1);
    } else {
      setResult((prev) => [...prev, y]);
      setExplanation(`Pick ${y} from List 2.`);
      if (i2 < l2.length) setI2(i2 + 1);
    }
  }

  function reset() {
    setI1(0);
    setI2(0);
    setResult([]);
    setExplanation("Click Step to begin merging.");
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12 flex flex-col items-center gap-10">

      <h1 className="text-4xl font-bold drop-shadow-[0_0_18px_#22d3ee]">
        Merge Two Sorted Lists
      </h1>

      {/* ----------- TWO PANEL SPLIT SCREEN ----------- */}
      <div className="flex gap-16">

        {/* LEFT PANEL : List 1 */}
        <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <h2 className="text-lg mb-3 text-cyan-300">List 1</h2>

          <div className="relative h-10 w-full mb-2">
            <MergePointer type="p1" position={p1Pos} />
          </div>

          <div className="flex items-center gap-2">
            {l1.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <MergeNode value={v} />
                {i < l1.length - 1 && <MergeArrow />}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL : List 2 */}
        <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#1f1f1f] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <h2 className="text-lg mb-3 text-purple-300">List 2</h2>

          <div className="relative h-10 w-full mb-2">
            <MergePointer type="p2" position={p2Pos} />
          </div>

          <div className="flex items-center gap-2">
            {l2.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <MergeNode value={v} />
                {i < l2.length - 1 && <MergeArrow />}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CENTER EXPLANATION */}
      <div className="bg-[#111] border border-[#2a2a2a] px-6 py-3 rounded-xl text-center shadow-[0_0_12px_rgba(255,255,255,0.05)] max-w-xl">
        {explanation}
      </div>

      {/* MERGED RESULT */}
      {result.length > 0 && (
        <div className="flex items-center gap-2 mt-4">
          {result.map((v, i) => (
            <MergeNode key={i} value={v} />
          ))}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-6 mt-4">
        <button
          onClick={step}
          className="px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-all shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        >
          Step →
        </button>

        <button
          onClick={reset}
          className="px-8 py-3 bg-[#1f1f1f] border border-[#333] rounded-xl hover:bg-[#2a2a2a] transition-all"
        >
          Reset
        </button>
      </div>

    </div>
  );
}
