"use client";

interface PointerNodeProps {
  label: string;
  active?: boolean;
}

export default function PointerNode({ label, active }: PointerNodeProps) {
  if (!active) return <div className="h-4" />;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-px h-3 bg-cyan-400/70" />
      <div className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/15 border border-cyan-400/70 text-cyan-200">
        {label}
      </div>
    </div>
  );
}
