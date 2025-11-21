"use client";

export type CharState = "idle" | "active" | "matched" | "skipped";

interface CharNodeProps {
  ch: string;
  state: CharState;
}

export default function CharNode({ ch, state }: CharNodeProps) {
  let base =
    "w-10 h-10 flex items-center justify-center rounded-xl font-mono text-lg transition-all duration-300 border";

  if (state === "active") {
    base +=
      " bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.7)] scale-105";
  } else if (state === "matched") {
    base +=
      " bg-emerald-500/15 border-emerald-400 text-emerald-200 shadow-[0_0_14px_rgba(16,185,129,0.6)]";
  } else if (state === "skipped") {
    base += " bg-rose-500/10 border-rose-400 text-rose-200 opacity-80";
  } else {
    base += " bg-slate-900/80 border-slate-700 text-slate-100 opacity-90";
  }

  return <div className={base}>{ch}</div>;
}
