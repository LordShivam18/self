"use client";

import React from "react";

export default function TreeCanvas({ trace, cursor }: any) {
  const nodes = [
    { id: 4, x: 400, y: 60 },
    { id: 2, x: 250, y: 180 },
    { id: 7, x: 550, y: 180 },
    { id: 1, x: 180, y: 300 },
    { id: 3, x: 320, y: 300 },
    { id: 6, x: 480, y: 300 },
    { id: 9, x: 620, y: 300 },
  ];

  const visibleNodes = new Set(
    trace.slice(0, cursor + 1).map((t: any) => t.value)
  );

  return (
    <div className="relative w-full h-[360px] bg-[#0d1117] rounded-xl">
      <svg className="absolute inset-0 w-full h-full">
        {/* edges */}
        <line x1={400} y1={60} x2={250} y2={180} stroke="#555" strokeWidth={3} />
        <line x1={400} y1={60} x2={550} y2={180} stroke="#555" strokeWidth={3} />

        <line x1={250} y1={180} x2={180} y2={300} stroke="#555" strokeWidth={3} />
        <line x1={250} y1={180} x2={320} y2={300} stroke="#555" strokeWidth={3} />

        <line x1={550} y1={180} x2={480} y2={300} stroke="#555" strokeWidth={3} />
        <line x1={550} y1={180} x2={620} y2={300} stroke="#555" strokeWidth={3} />
      </svg>

      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute flex items-center justify-center
            w-12 h-12 rounded-full text-white text-lg font-semibold
            transition-all duration-500 shadow-lg"
          style={{
            left: n.x - 24,
            top: n.y - 24,
            background: visibleNodes.has(n.id)
              ? "#1f6feb"
              : "rgba(255,255,255,0.05)",
            opacity: visibleNodes.has(n.id) ? 1 : 0.15,
            transform: visibleNodes.has(n.id)
              ? "scale(1)"
              : "scale(0.6)",
          }}
        >
          {n.id}
        </div>
      ))}
    </div>
  );
}
