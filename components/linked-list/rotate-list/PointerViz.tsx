// components/linked-list/rotate-list/PointerViz.tsx
"use client";

export default function PointerViz({
  label,
  visible,
  color,
}: {
  label: "TAIL" | "NEW TAIL" | "NEW HEAD";
  visible: boolean;
  color: "emerald" | "purple" | "cyan";
}) {
  if (!visible) return <div className="h-8 w-14" />;

  const map = {
    emerald: "text-emerald-300",
    purple: "text-purple-300",
    cyan: "text-cyan-300",
  };

  return (
    <div className={`flex flex-col items-center text-xs font-semibold animate-pulse ${map[color]}`}>
      <div className="text-lg leading-none">⬆</div>
      <div>{label}</div>
    </div>
  );
}
