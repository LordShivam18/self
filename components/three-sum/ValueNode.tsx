"use client";

type Props = {
  value: number;
  index: number;
  isPivot: boolean;
  isLeft: boolean;
  isRight: boolean;
  isInSolution: boolean;
};

export default function ValueNode({
  value,
  isPivot,
  isLeft,
  isRight,
  isInSolution,
}: Props) {
  let highlight = "";

  if (isPivot) {
    highlight =
      "border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.65)] scale-110 -translate-y-1";
  } else if (isLeft) {
    highlight =
      "border-emerald-400/80 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.55)] scale-105 -translate-y-0.5";
  } else if (isRight) {
    highlight =
      "border-violet-400/80 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.55)] scale-105 -translate-y-0.5";
  } else if (isInSolution) {
    highlight =
      "border-amber-400/80 bg-amber-500/5 shadow-[0_0_18px_rgba(245,158,11,0.4)]";
  } else {
    highlight = "border-slate-700/80 bg-slate-900/70 opacity-80";
  }

  return (
    <div
      className={`relative w-14 h-16 rounded-2xl flex items-center justify-center
                  font-semibold text-lg text-slate-50
                  border transition-all duration-300 ${highlight}`}
    >
      {value}
    </div>
  );
}
