"use client";

import { useState } from "react";
import AddNode from "./AddNode";
import AddArrow from "./AddArrow";
import AddPointer from "./AddPointer";

export default function AddTwoNumbers() {
  const l1 = [2, 4, 3];
  const l2 = [5, 6, 4];

  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [carry, setCarry] = useState(0);
  const [result, setResult] = useState<number[]>([]);
  const [explanation, setExplanation] = useState(
    "Click Step to begin adding."
  );

  const NODE_GAP = 90;
  const p1Pos = i1 * NODE_GAP;
  const p2Pos = i2 * NODE_GAP;

  function step() {
    if (i1 >= l1.length && i2 >= l2.length && carry === 0) return;

    const x = i1 < l1.length ? l1[i1] : 0;
    const y = i2 < l2.length ? l2[i2] : 0;

    const sum = x + y + carry;
    const digit = sum % 10;
    const newCarry = Math.floor(sum / 10);

    setResult((prev) => [...prev, digit]);
    setExplanation(
      `${x} + ${y} + carry ${carry} = ${sum} → write ${digit}, carry ${newCarry}`
    );

    setCarry(newCarry);
    if (i1 < l1.length) setI1(i1 + 1);
    if (i2 < l2.length) setI2(i2 + 1);
  }

  function reset() {
    setI1(0);
    setI2(0);
    setCarry(0);
    setResult([]);
    setExplanation("Click Step to begin adding.");
  }

  return (
  <div className="min-h-screen bg-black text-white px-6 py-14 flex flex-col items-center gap-12">

    <h1 className="text-5xl font-bold tracking-wide drop-shadow-[0_0_30px_#22d3ee]">
      Add Two Numbers
    </h1>

    {/* Floating card container */}
    <div className="p-8 rounded-3xl bg-[#0e0e0e] border border-[#1f1f1f] shadow-[0_0_20px_rgba(255,255,255,0.05)]">

      <div className="flex flex-col items-center" style={{ width: "360px" }}>

        {/* Pointer Layer */}
        <div className="relative h-12 w-full mb-3">
          <AddPointer type="p1" position={p1Pos} />
          <AddPointer type="p2" position={p2Pos} />
        </div>

        {/* List 1 */}
        <div className="flex items-center gap-3 mb-2">
          {l1.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <AddNode value={v} />
              {i < l1.length - 1 && <AddArrow />}
            </div>
          ))}
        </div>

        {/* List 2 */}
        <div className="flex items-center gap-3 opacity-75">
          {l2.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <AddNode value={v} />
              {i < l2.length - 1 && <AddArrow />}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Explanation Box */}
    <div className="bg-[#111] border border-[#2a2a2a] px-6 py-3 rounded-xl text-center shadow-[0_0_12px_rgba(255,255,255,0.05)] max-w-lg">
      {explanation}
    </div>

    {/* Result nodes */}
    {result.length > 0 && (
      <div className="flex items-center gap-3">
        {result.map((v, i) => (
          <AddNode key={i} value={v} />
        ))}
      </div>
    )}

    {/* Buttons */}
    <div className="flex gap-6 mt-4">
      <button
        onClick={step}
        className="px-8 py-3 bg-white text-black rounded-xl font-medium
                 hover:bg-neutral-200 transition-all shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        Step →
      </button>

      <button
        onClick={reset}
        className="px-8 py-3 bg-[#1f1f1f] border border-[#333] rounded-xl
                  hover:bg-[#2a2a2a] transition-all"
      >
        Reset
      </button>
    </div>
  </div>
);
}
