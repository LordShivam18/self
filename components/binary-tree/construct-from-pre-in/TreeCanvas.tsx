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
  glow: number; // <-- NEW glow intensity for pulse
};

type Props = {
  trace: TraceStep[];
  cursor: number;
  nodeLayouts: NodeLayout[];
  width?: number;
  height?: number;
};

// spring helper
function springStep(current: number, target: number, velocity: number, stiffness = 0.14, damping = 0.82) {
  const force = (target - current) * stiffness;
  velocity = (velocity + force) * damping;
  return { next: current + velocity, velocity };
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

  // --- 1. Initialize nodes (hidden with 0 glow)
  useEffect(() => {
    const initial: Record<string, NodeState> = {};
    for (const n of nodeLayouts) {
      initial[n.id] = {
        x: n.x,
        y: n.y,
        vx: 0,
        vy: 0,
        targetX: n.x,
        targetY: n.y,
        visible: false,
        value: n.value,
        glow: 0, // start no glow
      };
    }
    setNodes(initial);
  }, [nodeLayouts]);

  // --- 2. Reveal node with glow pulse
  useEffect(() => {
    const step = trace[cursor];
    if (!step) return;

    const nid = step.nodeId || step.nodeIdCreated || step.rootNodeId;
    if (!nid) return;

    setNodes((prev) => {
      if (!prev[nid] || prev[nid].visible) return prev;

      return {
        ...prev,
        [nid]: {
          ...prev[nid],
          visible: true,
          glow: 1.0, // full glow initially
        },
      };
    });
  }, [cursor, trace]);

  // --- 3. Animation loop (position + glow animation)
  useEffect(() => {
    if (Object.keys(nodes).length === 0) return;

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

        // position springs
        const sx = springStep(s.x, layout.x, s.vx);
        const sy = springStep(s.y, layout.y, s.vy);

        // glow gently fades out
        const newGlow = s.visible ? Math.max(0, s.glow - 0.04) : 0;

        next[id] = {
          ...s,
          x: sx.next,
          y: sy.next,
          vx: sx.velocity,
          vy: sy.velocity,
          glow: newGlow,
        };

        if (
          Math.abs(sx.next - layout.x) > 0.3 ||
          Math.abs(sy.next - layout.y) > 0.3 ||
          newGlow > 0
        ) {
          changed = true;
        }
      }

      if (changed) setNodes(next);
      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [nodes, nodeLayouts]);

  // --- 4. Render edges
  function renderEdges() {
    return nodeLayouts.map((l) => {
      if (!l.parentId) return null;
      const parent = nodes[l.parentId];
      const child = nodes[l.id];
      if (!parent || !child || !parent.visible || !child.visible) return null;

      return (
        <line
          key={l.id + "-edge"}
          x1={parent.x}
          y1={parent.y}
          x2={child.x}
          y2={child.y}
          stroke="#38bdf8"
          strokeWidth={2}
          strokeOpacity={0.25}
        />
      );
    });
  }

  // --- 5. Final UI
  return (
    <div
      style={{ width, height }}
      className="relative overflow-visible"
    >
      <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
        {renderEdges()}
      </svg>

      {Object.entries(nodes).map(([id, s]) => {
        const glowStyle = {
          boxShadow: `0 0 ${18 + s.glow * 20}px rgba(56,189,248,${0.35 + s.glow * 0.3})`,
        };

        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: s.x - 18,
              top: s.y - 18,
              width: 36,
              height: 36,
              transform: `scale(${s.visible ? 1 : 0.6})`,
              transition: "transform 250ms ease",
              zIndex: s.visible ? 20 : 10,
              ...glowStyle,
            }}
            className="flex items-center justify-center rounded-full border-2 border-cyan-400 bg-transparent"
          >
            <span className="text-xs font-mono text-cyan-200">{s.value}</span>
          </div>
        );
      })}
    </div>
  );
}
