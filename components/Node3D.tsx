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
    <>
      <div
        className={`relative w-14 h-20 flex items-center justify-center rounded-2xl
        font-semibold text-lg transition-all duration-500
        border
        ${
          isInGroup
            ? "border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.6)] scale-110 -translate-y-2"
            : "border-slate-700 bg-slate-900/70 opacity-80 scale-90 translate-y-1"
        }
        ${isReversing ? "node-flip" : ""}`}
        style={{
          transform: isReversing ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.45s ease-in-out",
          transformStyle: "preserve-3d",
        }}
      >
        <span
          className={`transition-opacity duration-300 ${
            isReversing ? "opacity-0" : "opacity-100"
          }`}
        >
          {value}
        </span>

        {isReversing && (
          <span
            className="absolute opacity-100"
            style={{
              transform: "rotateY(180deg)",
            }}
          >
            {value}
          </span>
        )}
      </div>

      <style>{`
        @keyframes nodeFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(180deg); }
        }

        .node-flip {
          animation: nodeFlip 0.45s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
