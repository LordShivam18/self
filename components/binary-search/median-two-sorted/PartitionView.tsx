"use client";

interface PartitionViewProps {
  A: number[];
  B: number[];
  i: number | null; // partition index for A
  j: number | null; // partition index for B
  status: string; // "ready" | "running" | "done"
}

export default function PartitionViewMSA({
  A,
  B,
  i,
  j,
  status,
}: PartitionViewProps) {
  const highlightLeft = "bg-gradient-to-r from-cyan-900/40 to-transparent";
  const highlightRight = "bg-gradient-to-l from-fuchsia-900/40 to-transparent";

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-10 mt-6">
      {/* ================= ARRAY A ================= */}
      <div className="flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-400">
          Array A
        </div>

        <div className="relative flex items-center gap-1">
          {A.map((num, idx) => {
            const isLeft = i !== null && idx < i;
            const isRight = i !== null && idx >= i;

            return (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono text-sm border 
                transition-all duration-500 
                ${
                  isLeft
                    ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : isRight
                    ? "border-fuchsia-400 text-fuchsia-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                    : "border-slate-700 text-slate-300"
                }
              `}
                style={{
                  transform:
                    status === "running"
                      ? "translateY(0)"
                      : "translateY(4px)",
                }}
              >
                {num}
              </div>
            );
          })}

          {/* Vertical partition line */}
          {i !== null && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-cyan-300 rounded-full transition-all"
              style={{ left: `${i * 3.1}rem` }}
            />
          )}
        </div>
      </div>

      {/* ================= ARRAY B ================= */}
      <div className="flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.2em] text-fuchsia-400">
          Array B
        </div>

        <div className="relative flex items-center gap-1">
          {B.map((num, idx) => {
            const isLeft = j !== null && idx < j;
            const isRight = j !== null && idx >= j;

            return (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono text-sm border 
                transition-all duration-500 
                ${
                  isLeft
                    ? "border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : isRight
                    ? "border-fuchsia-400 text-fuchsia-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                    : "border-slate-700 text-slate-300"
                }
              `}
                style={{
                  transform:
                    status === "running"
                      ? "translateY(0)"
                      : "translateY(4px)",
                }}
              >
                {num}
              </div>
            );
          })}

          {/* Partition Line */}
          {j !== null && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-fuchsia-300 rounded-full transition-all"
              style={{ left: `${j * 3.1}rem` }}
            />
          )}
        </div>
      </div>

      {/* ================= Legend ================= */}
      <div className="grid grid-cols-3 gap-4 text-xs text-center text-slate-400">
        <div className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
          Left Partition (A & B)
        </div>
        <div className="px-3 py-1 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/40 text-fuchsia-300">
          Right Partition (A & B)
        </div>
        <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700">
          Balancing Partitions
        </div>
      </div>
    </div>
  );
}
