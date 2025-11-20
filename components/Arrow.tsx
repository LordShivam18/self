"use client";

export default function Arrow({ type = "straight" }: { type?: "straight" | "cycle" }) {
  
  // ====== Curved Cycle Arrow ======
  if (type === "cycle") {
    return (
      <div className="relative w-48 h-40 -mt-6">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 150"
          className="overflow-visible"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="14"
              markerHeight="14"
              refX="10"
              refY="7"
              orient="auto"
            >
              <polygon points="0 0, 14 7, 0 14" fill="#22d3ee" />
            </marker>
          </defs>

          {/* Smooth looping curve that circles back to the cycle node */}
          <path
            d="M30 70 
               C 180 -20, 180 180, 60 50"
            stroke="#22d3ee"
            strokeWidth="5"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="drop-shadow-[0_0_12px_#22d3ee]"
          />
        </svg>
      </div>
    );
  }

  // ====== Straight Arrow ======
  return (
    <div className="text-cyan-400 text-4xl px-3 select-none drop-shadow-[0_0_8px_#22d3ee]">
      →
    </div>
  );
}
