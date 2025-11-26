// components/binary-tree/construct-from-pre-in/TreeCanvas.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { NodeLayout } from "./layoutEngine";

type TraceStep = any;

type NodeState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  visible: boolean;
  value: number;
};

type Props = {
  trace: TraceStep[];
  cursor: number;
  nodeLayouts: NodeLayout[]; // <-- required prop
  width?: number;
  height?: number;
};

function springStep(
  current: number,
  target: number,
  velocity: number,
  stiffness = 0.14,
  damping = 0.82
) {
  const force = (target - current) * stiffness;
  velocity = (velocity + force) * damping;
  const next = current + velocity;
  return { next, velocity };
}

export default function TreeCanvas({
  trace,
  cursor,
  nodeLayouts,
  width = 940,
  height = 420,
}: Props) {
  const [nodes, setNodes] = useState<Record<string, NodeState>>({});
  const raf = useRef<number | null>(null);

  // 1) init nodes from layout (hidden)
  useEffect(() => {
    const initial: Record<string, NodeState> = {};
    for (const n of nodeLayouts) {
      initial[n.id] = {
        x: n.x,
        y: n.y + 40,
        vx: 0,
        vy: 0,
        targetX: n.x,
        targetY: n.y,
        visible: false,
        value: n.value,
      };
    }
    setNodes(initial);
  }, [nodeLayouts]);

  // 2) reveal node when trace references it
  useEffect(() => {
    const step = trace[cursor];
    if (!step) return;
    const nid = step.nodeId || step.nodeIdCreated || step.rootNodeId;
    if (!nid) return;
    setNodes((prev) => {
      const clone = { ...prev };
      if (clone[nid] && !clone[nid].visible) {
        clone[nid] = {
          ...clone[nid],
          visible: true,
          x: clone[nid].targetX,
          y: clone[nid].targetY + 40,
          vx: 0,
          vy: 0,
        };
      }
      return clone;
    });
  }, [cursor, trace]);

  // 3) spring animation loop with explicit cleanup function
  useEffect(() => {
    // bail if nothing to animate
    if (!nodeLayouts || Object.keys(nodes).length === 0) return;

    let cancelled = false;

    function tick() {
      if (cancelled) return;
      let changed = false;
      const next: Record<string, NodeState> = {};

      for (const [id, s] of Object.entries(nodes)) {
        const layout = nodeLayouts.find((n) => n.id === id);
        if (!layout) {
          next[id] = s;
          continue;
        }

        const tx = layout.x;
        const ty = layout.y;

        const sx = springStep(s.x, tx, s.vx);
        const sy = springStep(s.y, ty, s.vy);

        next[id] = {
          ...s,
          x: sx.next,
          y: sy.next,
          vx: sx.velocity,
          vy: sy.velocity,
        };

        if (Math.abs(sx.next - tx) > 0.4 || Math.abs(sy.next - ty) > 0.4) {
          changed = true;
        }
      }

      if (changed) setNodes(next);
      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);

    // EXPLICIT cleanup — returning a function that cancels RAF (no `&&` expression)
    return () => {
      cancelled = true;
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
    // we intentionally depend on nodes + nodeLayouts
  }, [nodes, nodeLayouts]);

  // 4) render edges using parentId (guarded)
  function renderEdges() {
    return nodeLayouts.map((l) => {
      if (!l.parentId) return null;
      const parent = nodes[l.parentId];
      const child = nodes[l.id];
      if (!parent || !child) return null;
      if (!parent.visible || !child.visible) return null;
      return (
        <line
          key={l.id + "-edge"}
          x1={parent.x}
          y1={parent.y}
          x2={child.x}
          y2={child.y}
          stroke="#38bdf8"
          strokeWidth={2}
          strokeOpacity={0.35}
        />
      );
    });
  }

  return (
    <div style={{ width, height }} className="relative overflow-visible">
      <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
        {renderEdges()}
      </svg>

      {Object.entries(nodes).map(([id, s]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: s.x - 18,
            top: s.y - 18,
            width: 36,
            height: 36,
            transform: `scale(${s.visible ? 1 : 0.6})`,
            transition: "transform 220ms ease",
            zIndex: s.visible ? 20 : 10,
          }}
          className="flex items-center justify-center rounded-full border-2 border-cyan-400 bg-transparent"
        >
          <span className="text-xs font-mono text-cyan-200">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
