// components/linked-list/reverse-linked-list-ii/PointerViz.tsx
"use client";

export default function PointerViz({
  label,
  visible,
  color,
}: {
  label: "PREV" | "CURR" | "TEMP";
  visible: boolean;
  color: "emerald" | "cyan" | "red";
}) {
  if (!visible) return <div className="h-8 w-14" />;

  const map = {
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
    red: "text-red-300",
  };

  return (
    <div className={`flex flex-col items-center text-xs font-semibold animate-pulse ${map[color]}`}>
      <div className="text-lg leading-none">⬆</div>
      <div>{label}</div>
    </div>
  );
}
