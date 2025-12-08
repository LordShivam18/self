// components/linked-list/remove-nth/PointerViz.tsx
"use client";

export default function PointerViz({
  label,
  visible,
  color,
}: {
  label: "FAST" | "SLOW";
  visible: boolean;
  color: "cyan" | "emerald";
}) {
  if (!visible) return <div className="h-8 w-14" />;

  return (
    <div className={`flex flex-col items-center text-xs font-semibold animate-pulse ${
      color === "cyan" ? "text-cyan-300" : "text-emerald-300"
    }`}>
      <div className="text-lg leading-none">⬇</div>
      <div>{label}</div>
    </div>
  );
}
