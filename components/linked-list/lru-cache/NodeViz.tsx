// components/linked-list/lru-cache/NodeViz.tsx
"use client";

export default function NodeViz({
  node,
  isMRU,
  isLRU,
  isActive,
}: {
  node: { key: number; value: number };
  isMRU: boolean;
  isLRU: boolean;
  isActive: boolean;
}) {
  let border = "border-slate-700";
  let text = "text-slate-200";
  let glow = "shadow-[0_0_8px_rgba(255,255,255,0.15)]";

  if (isMRU) {
    border = "border-cyan-400";
    text = "text-cyan-300";
    glow = "shadow-[0_0_20px_rgba(34,211,238,0.8)]";
  }

  if (isLRU) {
    border = "border-red-400";
    text = "text-red-300";
    glow = "shadow-[0_0_20px_rgba(248,113,113,0.8)]";
  }

  if (isActive) {
    border = "border-yellow-400";
    text = "text-yellow-300";
    glow = "shadow-[0_0_24px_rgba(250,204,21,0.9)]";
  }

  return (
    <div
      className={`w-24 h-14 rounded-xl border bg-[#050816]
      flex flex-col items-center justify-center font-semibold ${border} ${text} ${glow}`}
    >
      <div className="text-sm">Key: {node.key}</div>
      <div className="text-xs text-slate-400">Val: {node.value}</div>
    </div>
  );
}
