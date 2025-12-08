"use client";

export default function MergePointer({
  type,
  position,
}: {
  type: "p1" | "p2";
  position: number;
}) {
  const color =
    type === "p1"
      ? "bg-pink-500 shadow-[0_0_10px_rgba(255,0,128,0.5)]"
      : "bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.5)]";

  return (
    <div
      className={`
        absolute top-0
        px-3 py-1 rounded-full text-xs font-bold text-white
        transition-all duration-500
        ${color}
      `}
      style={{ left: position }}
    >
      {type.toUpperCase()}
    </div>
  );
}
