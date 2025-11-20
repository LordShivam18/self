"use client";

export default function AddPointer({
  type,
  position,
}: {
  type: "p1" | "p2";
  position: number;
}) {
  const colorClass =
    type === "p1"
      ? "bg-pink-500 shadow-[0_0_12px_rgba(255,0,128,0.5)]"
      : "bg-purple-500 shadow-[0_0_12px_rgba(128,0,255,0.5)]";

  return (
    <div
      className={`
        absolute top-0 
        px-3 py-1 
        rounded-full 
        text-xs font-bold text-white
        transition-all duration-500 
        ${colorClass}
      `}
      style={{ transform: `translateX(${position}px)` }}
    >
      {type.toUpperCase()}
    </div>
  );
}
