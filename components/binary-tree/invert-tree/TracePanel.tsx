export default function TracePanel({ trace, cursor }: any) {
  const step = trace[cursor];

  return (
    <div className="space-y-1">
      <h2 className="text-xl font-bold mb-3">Explanation</h2>

      <div className="bg-[#0d1117] p-4 rounded-lg border border-gray-700 text-gray-300">
        {step?.explanation || "–––"}
      </div>
    </div>
  );
}
