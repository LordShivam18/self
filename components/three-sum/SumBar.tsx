"use client";

type Props = {
  a: number | null;
  b: number | null;
  c: number | null;
  sum: number | null;
};

export default function SumBar({ a, b, c, sum }: Props) {
  if (a === null || b === null || c === null || sum === null) {
    return (
      <div className="bg-[#050816] border border-slate-800/80 rounded-2xl px-6 py-3 text-sm text-slate-300 text-center max-w-xl">
        Choose a pivot i and move pointers L and R to explore all triplets that
        add up to 0.
      </div>
    );
  }

  let tone = "";
  if (sum === 0) tone = "text-emerald-300";
  else if (sum < 0) tone = "text-cyan-300";
  else tone = "text-rose-300";

  const relation =
    sum === 0 ? "= 0 ✅" : sum < 0 ? "< 0 → increase L" : "> 0 → decrease R";

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl px-6 py-3 text-sm text-slate-300 text-center max-w-xl shadow-[0_0_28px_rgba(15,23,42,0.9)]">
      <span className="font-mono text-slate-100">
        {a} + {b} + {c}
      </span>{" "}
      <span className={tone}>{relation}</span>{" "}
      <span className="font-mono text-slate-500"> (sum = {sum})</span>
    </div>
  );
}
