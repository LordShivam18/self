"use client";

export default function NumberCanvas({ step }: any) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">

      <div className="flex gap-6 text-4xl font-mono">
        <div className="px-4 py-2 rounded bg-slate-800 border border-slate-600">
          {step.x}
        </div>

        <span className="text-cyan-300 font-bold text-3xl">⇆</span>

        <div className="px-4 py-2 rounded bg-slate-800 border border-slate-600">
          {step.reversed}
        </div>
      </div>

    </div>
  );
}
