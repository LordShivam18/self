// components/linked-list/lru-cache/HashMapViz.tsx
"use client";

export default function HashMapViz({
  keys,
  activeKey,
}: {
  keys: number[];
  activeKey?: number;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#050816] p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
        HashMap (Key → Node)
      </div>

      {keys.length === 0 ? (
        <div className="text-slate-500 text-sm">Empty</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keys.map((k) => (
            <div
              key={k}
              className={`px-3 py-1 rounded-lg border text-sm ${
                activeKey === k
                  ? "border-yellow-400 text-yellow-300 bg-yellow-500/10"
                  : "border-slate-600 text-slate-300"
              }`}
            >
              {k}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
