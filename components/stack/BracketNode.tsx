"use client";

type Variant = "stream" | "stack";
type State = "default" | "active" | "processed" | "error";

export default function BracketNode({
  symbol,
  variant,
  state,
  isNew,
}: {
  symbol: string;
  variant: Variant;
  state: State;
  isNew?: boolean; // for stack: animate newly pushed cell
}) {
  const isStream = variant === "stream";

  const base =
    "flex items-center justify-center rounded-xl font-mono transition-all duration-300";

  const size = isStream ? "w-10 h-10 text-lg" : "w-12 h-12 text-xl";

  let style = "";
  if (isStream) {
    // top row
    if (state === "active") {
      style =
        "bg-cyan-500/20 border border-cyan-400/70 text-cyan-100 shadow-[0_0_14px_rgba(34,211,238,0.7)] scale-110";
    } else if (state === "processed") {
      style =
        "bg-slate-900/60 border border-slate-700 text-slate-500 opacity-70";
    } else if (state === "error") {
      style =
        "bg-red-500/20 border border-red-400 text-red-100 shadow-[0_0_16px_rgba(248,113,113,0.8)] scale-110";
    } else {
      style =
        "bg-slate-900/80 border border-slate-700 text-slate-100 hover:border-cyan-500/50";
    }
  } else {
    // stack cell
    if (state === "error") {
      style =
        "bg-red-500/20 border border-red-400 text-red-100 shadow-[0_0_16px_rgba(248,113,113,0.8)]";
    } else if (state === "active") {
      style =
        "bg-cyan-500/15 border border-cyan-400/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.8)]";
    } else {
      style =
        "bg-slate-900/90 border border-slate-700 text-slate-100 opacity-90";
    }
  }

  return (
    <div className={`${base} ${size} ${style} ${isNew ? "drop-in" : ""}`}>
      {symbol}
      {/* local CSS for drop animation */}
      <style jsx>{`
        .drop-in {
          animation: drop-in 0.45s ease-out;
        }
        @keyframes drop-in {
          0% {
            transform: translateY(-24px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(4px) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
