"use client";

export default function MergeNode({ value }: { value: number }) {
  return (
    <div
      className="
        w-14 h-14 flex items-center justify-center
        rounded-2xl text-xl font-semibold text-white
        bg-[#111] border border-[#2e2e2e]
        shadow-[0_0_15px_rgba(34,211,238,0.25)]
      "
    >
      {value}
    </div>
  );
}
