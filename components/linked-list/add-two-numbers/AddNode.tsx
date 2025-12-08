"use client";

export default function AddNode({ value }: { value: number }) {
  return (
    <div
      className="
        w-14 h-14 flex items-center justify-center
        text-xl font-semibold text-white
        rounded-2xl 
        bg-[#0f0f0f] 
        border border-[#2a2a2a]
        shadow-[0_0_15px_rgba(34,211,238,0.20)]
        hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]
        transition-all duration-300
      "
    >
      {value}
    </div>
  );
}
