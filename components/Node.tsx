"use client";

export default function Node({ value, isCycleNode }: { value: number; isCycleNode?: boolean }) {
  return (
    <div
      className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 text-xl font-bold
      ${isCycleNode ? "border-cyan-400 text-cyan-300" : "border-gray-500 text-gray-300"}`}
    >
      {value}
    </div>
  );
}
