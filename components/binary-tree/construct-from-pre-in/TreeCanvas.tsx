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
  glow: number;
};

type Props = {
  trace: TraceStep[];
  cursor: number;
  nodeLayouts: NodeLayout[];
  width?: number;
  height?: number;
};

function springStep(current: number, target: number, velocity: number) {
  const stiffness = 0.12;
  const damping = 0.82;

  const force = (target - current) * stiffness;
  velocity = (velocity + force) * damping;
  return { next: current + velocity, velocity };
}

export default function TreeCanvas({
  trace,
  cursor,
  nodeLayouts,
  width = 940,
  height = 440,
}: Props) {
  const [nodes, setNodes] = useState<Record<string, NodeState>>({});
  const raf = useRef<number | null>(null);

  // ---- CENTER TREE ----
  const minX = Math.min(...nodeLayouts.map((n) => n.x));
  const maxX = Math.max(...nodeLayouts.map((n) => n.x));
  const offsetX = width / 2 - (minX + (maxX - minX) / 2);

  // ---- INIT NODES ----
  useEffect(() => {
    const initial: Record<string, NodeState> = {};

    for (const n of nodeLayouts) {
      initial[n.id] = {
        x: (n.parentId ? nodeLayouts.find(p => p.id === n.parentId)?.x || n.x : n.x) + offsetX,
        y: (n.parentId ? nodeLayouts.find(p => p.id === n.parentId)?.y || n.y : n.y),
        vx: 0,
        vy: 0,
        targetX: n.x + offsetX,
        targetY: n.y,
        visible: false,
        value: n.value,
        glow: 0,
      };
    }

    setNodes(initial);
  }, [nodeLayouts, offsetX]);

  // ---- REVEAL LOGIC ----
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
          glow: 1,
        },
      };
    });
  }, [cursor, trace]);

  // ---- ANIMATION LOOP ----
  useEffect(() => {
    if (Object.keys(nodes).length === 0) return;

    let cancel = false;

    function tick() {
      if (cancel) return;

      let changed = false;
      const next: Record<string, NodeState> = {};

      for (const [id, s] of Object.entries(nodes)) {
        const sx = springStep(s.x, s.targetX, s.vx);
        const sy = springStep(s.y, s.targetY, s.vy);

        const glowFade = Math.max(0, s.glow - 0.03);

        next[id] = {
          ...s,
          x: sx.next,
          y: sy.next,
          vx: sx.velocity,
          vy: sy.velocity,
          glow: glowFade,
        };

        if (Math.abs(sx.next - s.targetX) > 0.2 || Math.abs(sy.next - s.targetY) > 0.2 || glowFade > 0) {
          changed = true;
        }
      }

      if (changed) setNodes(next);
      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancel = true;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [nodes]);

  // ---- EDGES ----
  const renderEdges = () => {
    return nodeLayouts.map((n) => {
      if (!n.parentId) return null;

      const parent = nodes[n.parentId];
      const child = nodes[n.id];
      if (!parent || !child || !parent.visible || !child.visible) return null;

      return (
        <line
          key={n.id + "-edge"}
          x1={parent.x}
          y1={parent.y}
          x2={child.x}
          y2={child.y}
          stroke="#38bdf8"
          strokeWidth={2}
          strokeOpacity={0.35}
          className="animate-[drawEdge_0.5s_ease-out]"
        />
      );
    });
  };

  // ---- FINAL RENDER ----
  return (
    <div className="relative overflow-visible" style={{ width, height }}>
      {/* Soft grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />

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
            transform: `scale(${s.visible ? 1 : 0.3})`,
            transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
            boxShadow: `0 0 ${15 + s.glow * 25}px rgba(56,189,248,${0.4 + s.glow * 0.4})`,
          }}
          className="flex items-center justify-center rounded-full border-2 border-cyan-400 bg-[#001720]"
        >
          <span className="text-xs font-mono text-cyan-200">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
