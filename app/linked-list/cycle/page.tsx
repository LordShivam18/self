"use client";

import { useState } from "react";
import Node from "@/components/Node";
import Arrow from "@/components/Arrow";
import Pointer from "@/components/Pointer";

export default function CycleDetection() {
  // Initial Linked List
  const nodes = [1, 2, 3, 4, 5, 3]; // Cycle at node 3

  const [slowIndex, setSlowIndex] = useState(0);
  const [fastIndex, setFastIndex] = useState(0);
  const [explanation, setExplanation] = useState("Click Start to begin detecting cycle.");
  const [cycleFound, setCycleFound] = useState(false);

  // ===== Pointer Animation Positions =====
  const NODE_GAP = 110; // Adjust until the pointer aligns perfectly
  const slowPos = slowIndex * NODE_GAP;
  const fastPos = fastIndex * NODE_GAP;

  function step() {
    if (cycleFound) return;

    let newSlow = (slowIndex + 1) % nodes.length;
    let newFast = (fastIndex + 2) % nodes.length;

    setSlowIndex(newSlow);
    setFastIndex(newFast);

    if (newSlow === newFast) {
      setCycleFound(true);
      setExplanation(`Cycle detected! Slow and Fast met at value ${nodes[newSlow]}.`);
    } else {
      setExplanation(`Slow moved to ${nodes[newSlow]}, Fast moved to ${nodes[newFast]}.`);
    }
  }

  function reset() {
    setSlowIndex(0);
    setFastIndex(0);
    setCycleFound(false);
    setExplanation("Click Start to begin detecting cycle.");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center gap-8">

      <h1 className="text-4xl font-bold">Linked List Cycle Detection</h1>

      {/* ===== Visualization ===== */}
      <div className="flex flex-col items-center">

        {/* ===== Animated Pointer Layer ===== */}
        <div className="relative h-12 w-full mb-4">
          <Pointer type="slow" position={slowPos} />
          <Pointer type="fast" position={fastPos} />
        </div>

        {/* ===== Nodes + Arrows ===== */}
        <div className="flex items-center gap-2">
          {nodes.map((value, index) => (
            <div key={index} className="flex items-center gap-2">

              {/* Node */}
              <Node
                value={value}
                isCycleNode={cycleFound && index === slowIndex}
              />

              {/* Straight arrows */}
              {index < nodes.length - 1 && <Arrow />}

              {/* Curved loop arrow */}
              {index === nodes.length - 1 && <Arrow type="cycle" />}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Explanation Box ===== */}
      <div className="bg-gray-900 text-gray-200 p-4 rounded-xl max-w-xl text-center shadow-[0_0_12px_#22d3ee]">
        {explanation}
      </div>

      {/* ===== Buttons ===== */}
      <div className="flex gap-4">
        <button
          onClick={step}
          className="px-6 py-2 text-lg bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-[0_0_12px_#22d3ee]"
        >
          Step →
        </button>

        <button
          onClick={reset}
          className="px-6 py-2 text-lg bg-gray-700 hover:bg-gray-600 rounded-xl"
        >
          Reset
        </button>
      </div>

    </div>
  );
}
