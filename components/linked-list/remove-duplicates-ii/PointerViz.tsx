// components/linked-list/remove-duplicates-ii/PointerViz.tsx
"use client";

import React from "react";

export default function PointerViz({
  label,
  visible,
  color,
}: {
  label: "PREV" | "CURR";
  visible: boolean;
  color: "emerald" | "cyan";
}) {
  if (!visible) return <div className="h-8 w-14" />;

  const colorClass =
    color === "emerald" ? "text-emerald-300" : "text-cyan-300";

  return (
    <div className={`flex flex-col items-center text-xs font-semibold animate-pulse ${colorClass}`}>
      <div className="text-lg leading-none">⬆</div>
      <div>{label}</div>
    </div>
  );
}
