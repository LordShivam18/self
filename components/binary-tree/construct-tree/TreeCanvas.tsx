import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

type TraceStep = any;

export default function TreeCanvas({
  trace,
  cursor,
}: {
  trace: TraceStep[];
  cursor: number;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesRef = useRef<Record<string, SVGElement>>({});

  // A tiny layout engine: position nodes by preorder order and level (approx).
  function computeLayoutFromTrace(steps: TraceStep[], upto: number) {
    // We'll collect created nodes from pick-root steps in the order encountered.
    const nodes: { id: string; val: string; depth: number }[] = [];
    const stackDepths: number[] = [];

    let depth = 0;
    steps.slice(0, upto + 1).forEach((s) => {
      if (s.type === "pick-root") {
        nodes.push({ id: s.nodeId, val: String(s.nodeId), depth });
        depth += 1;
      } else if (s.type === "backtrack") {
        depth = Math.max(0, depth - 1);
      } else if (s.type === "recurse-left") {
        // no-op
      } else if (s.type === "recurse-right") {
        // no-op
      }
    });

    // Spread horizontally by order, depth gives vertical position
    const width = 940;
    const height = 320;
    const gap = Math.max(60, width / Math.max(1, nodes.length));
    return nodes.map((n, i) => ({
      ...n,
      x: 40 + i * gap,
      y: 40 + n.depth * 80,
    }));
  }

  useEffect(() => {
    // Compute layout up to cursor
    const layout = computeLayoutFromTrace(trace, cursor);
    const svg = svgRef.current!;
    if (!svg) return;

    // Create/animate nodes
    layout.forEach((node) => {
      let g = document.getElementById(node.id) as SVGGElement | null;
      if (!g) {
        // create group
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("id", node.id);
        group.setAttribute("transform", `translate(${node.x}, ${node.y})`);
        group.style.opacity = "0";

        // circle
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "18");
        circle.setAttribute("fill", "#061029");
        circle.setAttribute("stroke", "url(#grad1)");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("class", "node-circle");

        // label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("fill", "#bfefff");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");
        text.setAttribute("font-size", "12");
        text.textContent = node.val.replace("node-", "").split("-")[0];

        group.appendChild(circle);
        group.appendChild(text);
        svg.appendChild(group);
        nodesRef.current[node.id] = group;

        // animate pop-in
        gsap.fromTo(
          group,
          { scale: 0.2, opacity: 0, transformOrigin: "center center" },
          { scale: 1, opacity: 1, duration: 0.45, ease: "elastic.out(1,0.6)" }
        );
      } else {
        // update position (tween)
        gsap.to(g, { x: node.x, y: node.y, duration: 0.5, ease: "power2.out" });
        g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
      }
    });

    // Remove nodes that are beyond current layout
    const existing = Array.from(svg.querySelectorAll("g[id^='node-']"));
    existing.forEach((g) => {
      const id = g.id;
      if (!layout.find((l) => l.id === id)) {
        gsap.to(g, {
          opacity: 0,
          scale: 0.6,
          duration: 0.35,
          onComplete: () => {
            try {
              g.remove();
            } catch {}
          },
        });
      }
    });
  }, [trace, cursor]);

  return (
    <div className="w-full bg-gradient-to-b from-[#020216]/40 to-transparent p-4 rounded-xl">
      <svg ref={svgRef} className="w-full h-80" viewBox="0 0 1000 360">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4EE0F6" />
            <stop offset="100%" stopColor="#8A6BFF" />
          </linearGradient>
        </defs>
        {/* connecting edges could be drawn here later */}
      </svg>
      <div className="mt-2 text-slate-400 text-sm">Tree growth canvas — animated nodes</div>
    </div>
  );
}
