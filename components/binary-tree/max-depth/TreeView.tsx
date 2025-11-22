"use client";

import TreeNode3D, {
  TreeNodeState,
} from "@/components/binary-tree/max-depth/TreeNode3D";
import { ModeBT } from "@/components/binary-tree/max-depth/ModeToggleBT";

export interface TreeNodeMeta {
  id: string;
  label: string;
  depth: number; // 0-based
  x: number; // 0–100 (%)
  parentId?: string;
  side?: "left" | "right";
}

// Static example tree (like [3,9,20,null,null,15,7])
export const TREE_NODES: TreeNodeMeta[] = [
  { id: "root", label: "3", depth: 0, x: 50 },
  { id: "n9", label: "9", depth: 1, x: 25, parentId: "root", side: "left" },
  { id: "n20", label: "20", depth: 1, x: 75, parentId: "root", side: "right" },
  { id: "n15", label: "15", depth: 2, x: 65, parentId: "n20", side: "left" },
  { id: "n7", label: "7", depth: 2, x: 85, parentId: "n20", side: "right" },
];

export const NODES_BY_ID: Record<string, TreeNodeMeta> = TREE_NODES.reduce(
  (acc, node) => {
    acc[node.id] = node;
    return acc;
  },
  {} as Record<string, TreeNodeMeta>
);

// Simple structure to know children for BFS
export const TREE_STRUCTURE: Record<
  string,
  { left?: string; right?: string }
> = {
  root: { left: "n9", right: "n20" },
  n9: {},
  n20: { left: "n15", right: "n7" },
  n15: {},
  n7: {},
};

interface TreeViewProps {
  currentId: string | null;
  queue: string[];
  visited: string[];
  mode: ModeBT;
}

export default function TreeView({
  currentId,
  queue,
  visited,
}: TreeViewProps) {
  const height = 260;

  function getNodeState(id: string): TreeNodeState {
    if (currentId === id) return "current";
    if (visited.includes(id)) return "visited";
    if (queue.includes(id)) return "queued";
    return "idle";
  }

  const maxDepth = Math.max(...TREE_NODES.map((n) => n.depth));

  const levelY = (depth: number) => {
    if (maxDepth === 0) return 0;
    const topPadding = 10;
    const bottomPadding = 10;
    const usable = 100 - topPadding - bottomPadding;
    return topPadding + (usable * depth) / maxDepth;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[260px] md:h-[320px] lg:h-[360px] rounded-[32px] bg-gradient-to-b from-[#020617] via-black to-black border border-slate-800/90 overflow-hidden shadow-[0_0_40px_rgba(8,47,73,0.9)]">
      {/* subtle grid / stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.25),_transparent_60%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:100%_32px] opacity-20 pointer-events-none" />

      {/* Neon connectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        {TREE_NODES.map((node) => {
          if (!node.parentId) return null;
          const parent = NODES_BY_ID[node.parentId];
          const x1 = parent.x;
          const y1 = levelY(parent.depth);
          const x2 = node.x;
          const y2 = levelY(node.depth);

          const isLeft = node.side === "left";
          const strokeColor = isLeft ? "#22d3ee" : "#e879f9";

          return (
            <g key={`${node.id}-edge`}>
              <path
                d={`M ${x1} ${y1 + 3} C ${x1} ${(y1 + y2) / 2}, ${x2} ${
                  (y1 + y2) / 2
                }, ${x2} ${y2 - 3}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={1.3}
                opacity={0.7}
                strokeLinecap="round"
              />
              <path
                d={`M ${x1} ${y1 + 3} C ${x1} ${(y1 + y2) / 2}, ${x2} ${
                  (y1 + y2) / 2
                }, ${x2} ${y2 - 3}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={4}
                opacity={0.18}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0">
        {TREE_NODES.map((node) => {
          const top = levelY(node.depth);

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${top}%`,
              }}
            >
              <TreeNode3D
                label={node.label}
                depth={node.depth + 1}
                state={getNodeState(node.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
