import { ModeCW } from "./ModeToggleCW";

interface StatsPanelProps {
  heights: number[];
  left: number;
  right: number;
  currentArea: number;
  maxArea: number;
  mode: ModeCW;
}

export default function StatsPanel({
  heights,
  left,
  right,
  currentArea,
  maxArea,
  mode,
}: StatsPanelProps) {
  const width = Math.max(right - left, 0);
  const leftHeight = heights[left] ?? "-";
  const rightHeight = heights[right] ?? "-";

  const ratio =
    maxArea === 0 ? 0 : Math.min(1, currentArea / Math.max(maxArea, 1));

  return (
    <div className="bg-[#050816] border border-slate-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-[0_0_32px_rgba(15,23,42,0.95)]">
      <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
        Pointer intuition
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[11px] md:text-xs font-mono text-slate-300">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Left pointer</p>
          <p>
            index L = <span className="text-cyan-300">{left}</span>
          </p>
          <p>
            height[L] = <span className="text-cyan-300">{leftHeight}</span>
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2">
          <p className="text-slate-500 mb-1">Right pointer</p>
          <p>
            index R = <span className="text-fuchsia-300">{right}</span>
          </p>
          <p>
            height[R] = <span className="text-fuchsia-300">{rightHeight}</span>
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 col-span-2 md:col-span-1">
          <p className="text-slate-500 mb-1">Container</p>
          <p>
            width = <span className="text-emerald-300">{width}</span>
          </p>
          <p>
            min height ={" "}
            <span className="text-emerald-300">
              {Math.min(
                Number(leftHeight) || 0,
                Number(rightHeight) || 0
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] md:text-xs font-mono">
          <span className="text-slate-400">Current area</span>
          <span className="text-cyan-300">{currentArea}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_18px_rgba(56,189,248,0.9)] transition-all duration-500"
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {Math.round(ratio * 100)}%
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] md:text-xs font-mono">
          <span className="text-slate-400">Best area so far</span>
          <span className="text-emerald-300">{maxArea}</span>
        </div>
      </div>

      <div className="mt-2 text-[11px] md:text-xs text-slate-300 leading-relaxed">
        {mode === "beginner" ? (
          <>
            Think of the container as stretching between{" "}
            <span className="text-cyan-300">L</span> and{" "}
            <span className="text-fuchsia-300">R</span>. The width shrinks as
            pointers move inward, so we only move the{" "}
            <span className="text-emerald-300">shorter side</span> to hunt for a
            taller wall.
          </>
        ) : (
          <>
            Invariant: at every step, the candidate container is limited by{" "}
            <span className="text-emerald-300">
              min(height[L], height[R])
            </span>
            . Discarding the taller side cannot improve this minimum, so we
            always move the limiting pointer while tracking the best area.
          </>
        )}
      </div>
    </div>
  );
}
