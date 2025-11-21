"use client";

type Props = {
  label: "i" | "L" | "R";
};

export default function PointerTag({ label }: Props) {
  const color =
    label === "i"
      ? "border-cyan-400 text-cyan-300 bg-cyan-500/10"
      : label === "L"
      ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
      : "border-violet-400 text-violet-300 bg-violet-500/10";

  return (
    <div
      className={`px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase
                  tracking-[0.16em] border ${color} shadow-[0_0_16px_rgba(15,23,42,0.9)]`}
    >
      {label}
    </div>
  );
}
