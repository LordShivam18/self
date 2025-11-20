"use client";

export default function Node3D({
  value,
  isInGroup,
  isReversing,
}: {
  value: number;
  isInGroup: boolean;
  isReversing: boolean;
}) {
  return (
    <div
      className={`
        relative w-14 h-20 flex items-center justify-center rounded-2xl
        font-semibold text-lg transition-all duration-500 border
        ${isInGroup
          ? "border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.6)] scale-110 -translate-y-2"
          : "border-slate-700 bg-slate-900/70 opacity-80 scale-90 translate-y-1"
        }
        ${isReversing ? "flip-3d" : ""}
      `}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* FRONT */}
      <span
        className={`
          absolute inset-0 flex items-center justify-center backface-hidden
          transition-opacity duration-300
          ${isReversing ? "opacity-0" : "opacity-100"}
        `}
      >
        {value}
      </span>

      {/* BACK */}
      <span
        className="absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180"
      >
        {value}
      </span>
    </div>
  );
}
