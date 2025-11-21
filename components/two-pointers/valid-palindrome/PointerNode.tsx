export default function PointerNode({ type }: { type: "L" | "R" }) {
  return (
    <div className="flex flex-col items-center text-cyan-300 font-mono text-xs">
      ▲
      <span>{type}</span>
    </div>
  );
}
