"use client";

export type TreeNodeState = "idle" | "current" | "queued" | "visited";

interface TreeNode3DProps {
  label: string;
  depth: number;
  state: TreeNodeState;
}

export default function TreeNode3D({
  label,
  depth,
  state,
}: TreeNode3DProps) {
  const baseGlow =
    state === "current"
      ? "shadow-[0_0_32px_rgba(56,189,248,0.95)]"
      : state === "queued"
      ? "shadow-[0_0_28px_rgba(217,70,239,0.9)]"
      : state === "visited"
      ? "shadow-[0_0_24px_rgba(52,211,153,0.85)]"
      : "shadow-[0_0_16px_rgba(15,23,42,0.9)]";

  const ringColor =
    state === "current"
      ? "from-cyan-300 via-white to-cyan-500"
      : state === "queued"
      ? "from-fuchsia-300 via-white to-violet-500"
      : state === "visited"
      ? "from-emerald-300 via-white to-lime-400"
      : "from-slate-500 via-slate-300 to-slate-500";

  const borderColor =
    state === "current"
      ? "border-cyan-300/90"
      : state === "queued"
      ? "border-fuchsia-400/90"
      : state === "visited"
      ? "border-emerald-300/90"
      : "border-slate-600";

  return (
    <div
      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl border ${borderColor} ${baseGlow}
                  bg-gradient-to-br from-[#050816] via-[#020617] to-black
                  flex items-center justify-center
                  transition-all duration-200
                  animate-[pulse-slow_3s_ease-in-out_infinite]`}
    >
      {/* inner neon ring */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-90 bg-gradient-to-br ${ringColor} mix-blend-screen blur-[14px]`}
      />
      {/* frosted core */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-slate-950/80 border border-slate-600/50 backdrop-blur-md flex items-center justify-center">
        <span className="font-semibold text-sm md:text-base text-slate-50">
          {label}
        </span>
      </div>

      {/* tiny depth indicator dot */}
      <div className="absolute -bottom-2 text-[9px] font-mono text-slate-400">
        d={depth}
      </div>
    </div>
  );
}
