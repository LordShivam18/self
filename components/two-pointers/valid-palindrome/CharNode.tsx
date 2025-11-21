export type CharState = "idle" | "active" | "match" | "mismatch";

export default function CharNode({
  ch,
  state,
}: {
  ch: string;
  state: CharState;
}) {
  let color = "text-slate-300";
  let bg = "bg-slate-800/40 border-slate-600";

  if (state === "active") {
    color = "text-cyan-300";
    bg = "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_18px_rgba(34,211,238,0.3)]";
  } else if (state === "match") {
    color = "text-emerald-300";
    bg = "bg-emerald-500/10 border-emerald-500/40";
  } else if (state === "mismatch") {
    color = "text-rose-300";
    bg = "bg-rose-500/10 border-rose-500/40";
  }

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-xl border text-lg font-mono transition-all ${bg} ${color}`}
    >
      {ch}
    </div>
  );
}
