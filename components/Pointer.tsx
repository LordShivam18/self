"use client";

export default function Pointer({
  type,
  position,
}: {
  type: "slow" | "fast";
  position: number;
}) {
  const color = type === "slow" ? "bg-yellow-400 text-black" : "bg-pink-500";

  return (
    <div
      className={`${color} px-3 py-1 rounded-full text-xs font-bold absolute transition-all duration-500 ease-in-out drop-shadow-[0_0_8px_#ffffffaa]`}
      style={{ transform: `translateX(${position}px)` }}
    >
      {type.toUpperCase()}
    </div>
  );
}
