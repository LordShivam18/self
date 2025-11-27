"use client";

type Props = {
  cursor: number;
  mode: string;
  setMode: (m: any) => void;
  onStep: () => void;
  onReset: () => void;
};

export default function Controls({ cursor, mode, setMode, onStep, onReset }: Props) {
  return (
    <div className="bg-[#161b22] p-4 rounded-xl shadow-md flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onStep}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
        >
          Step →
        </button>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Mode</span>
        <select
          className="bg-[#0d1117] border border-gray-600 rounded-lg px-3 py-1"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
        >
          <option value="beginner">Beginner</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    </div>
  );
}
