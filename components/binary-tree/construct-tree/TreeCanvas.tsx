"use client";
import React, { useMemo } from "react";

/** Simple layout engine: produce x,y per node from parent references. */
function layoutNodes(nodes: { id: string; value: number; parentId?: string; side?: "L" | "R" }[]) {
  // Build adjacency tree (since trace creates parent references)
  const byId: Record<string, { id: string; value: number; parentId?: string; side?: "L" | "R"; children: string[] }> = {};
  nodes.forEach((n) => (byId[n.id] = { ...n, children: [] }));
  nodes.forEach((n) => {
    if (n.parentId && byId[n.parentId]) byId[n.parentId].children.push(n.id);
  });

  // find roots (nodes with no parent)
  const roots = nodes.filter((n) => !n.parentId).map((r) => r.id);
  // We'll place nodes by BFS level order with relative offsets for left/right
  const placements: Record<string, { x: number; y: number }> = {};
  if (roots.length === 0) return placements;

  // naive layout: do a recursive layout using subtree widths
  function subtreeWidth(id: string): number {
    const node = byId[id];
    if (!node) return 1;
    if (node.children.length === 0) return 1;
    return node.children.map(subtreeWidth).reduce((a, b) => a + b, 0);
  }

  function assign(id: string, left: number, top: number) {
    const w = subtreeWidth(id);
    const node = byId[id];
    const center = left + w / 2;
    placements[id] = { x: center * 140, y: top * 120 };
    let cur = left;
    for (const c of node.children) {
      const cw = subtreeWidth(c);
      assign(c, cur, top + 1);
      cur += cw;
    }
  }

  let start = 0;
  for (const r of roots) {
    const w = subtreeWidth(r);
    assign(r, start, 0);
    start += w;
  }
  return placements;
}

export default function TreeCanvas({
  nodes,
  highlightPick,
}: {
  nodes: { id: string; value: number; parentId?: string; side?: "L" | "R" }[];
  highlightPick?: { value: number; preIndex: number; inorderIndex: number } | undefined;
}) {
  const placements = useMemo(() => layoutNodes(nodes), [nodes]);

  return (
    <div className="bg-gradient-to-b from-[#050616] to-[#020212] p-4 rounded-xl border border-slate-800 min-h-[300px]">
      <svg width="100%" height="360">
        {/* edges */}
        {nodes.map((n) => {
          const p = placements[n.id];
          if (!p || !n.parentId) return null;
          const parentP = placements[n.parentId];
          if (!parentP) return null;
          return (
            <g key={`edge-${n.id}`}>
              <line
                x1={parentP.x + 40}
                y1={parentP.y + 40}
                x2={p.x + 40}
                y2={p.y + 40}
                stroke="#274155"
                strokeWidth={2}
                strokeOpacity={0.6}
              />
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((n, idx) => {
          const p = placements[n.id];
          if (!p) return null;
          const isRoot = !n.parentId;
          const isPicked = highlightPick && highlightPick.value === n.value;
          return (
            <g key={n.id} transform={`translate(${p.x}, ${p.y})`}>
              <rect
                x={0}
                y={0}
                width={80}
                height={80}
                rx={18}
                ry={18}
                fill={isPicked ? "url(#glow)" : "#081226"}
                stroke={isPicked ? "#29d2ff" : "#173040"}
                strokeWidth={isRoot ? 3 : 1.5}
                style={{
                  filter: isPicked ? "drop-shadow(0 8px 20px rgba(41,210,255,0.12))" : undefined,
                }}
              />
              <text x={40} y={44} fontSize={22} fontWeight={700} textAnchor="middle" fill="#e6f7ff" style={{ pointerEvents: "none" }}>
                {n.value}
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="glow" x1="0" x2="1">
            <stop offset="0%" stopColor="#1ce0ff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#9b7cff" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-3 text-xs text-slate-400 font-mono">Nodes created: {nodes.length}</div>
    </div>
  );
}
