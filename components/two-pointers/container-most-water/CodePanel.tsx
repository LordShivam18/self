interface CodePanelProps {
  activeLine: number;
}

const CODE_LINES = [
  "1  int maxArea(vector<int>& height) {",
  "2      int n = height.size();",
  "3      int l = 0, r = n - 1;",
  "4      int best = 0;",
  "5      while (l < r) {",
  "6          int h = min(height[l], height[r]);",
  "7          int width = r - l;",
  "8          best = max(best, h * width);",
  "9          if (height[l] <= height[r]) {",
  "10             l++;",
  "11         } else {",
  "12             r--;",
  "13         }",
  "14     }",
  "15     return best;",
  "16 }",
];

export default function CodePanel({ activeLine }: CodePanelProps) {
  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_32px_rgba(15,23,42,0.95)] font-mono text-[11px] md:text-[12px] text-slate-300">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-1">
        <span className="w-1.5 h-4 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.9)]" />
        What this step corresponds to in code
      </h2>

      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 overflow-auto max-h-72">
        {CODE_LINES.map((line, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={idx}
              className={`whitespace-pre leading-relaxed ${
                isActive
                  ? "bg-cyan-500/10 border-l-2 border-cyan-400 -mx-3 px-3 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.6)]"
                  : ""
              }`}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
