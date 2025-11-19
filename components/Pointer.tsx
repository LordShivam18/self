"use client";

export default function Pointer({ type }: { type: "slow" | "fast" }) {
  return (
    <div
      className={`
        text-sm font-semibold px-3 py-1 rounded-full 
        ${type === "slow" ? "bg-yellow-400 text-black shadow-[0_0_10px_#facc15]" 
                          : "bg-pink-500 text-white shadow-[0_0_12px_#ec4899]"}
      `}
    >
      {type.toUpperCase()}
    </div>
  );
}
