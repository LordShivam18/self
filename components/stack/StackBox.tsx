"use client";

import BracketNode from "./BracketNode";

type LastAction =
  | { kind: "push"; char: string; index: number }
  | { kind: "pop"; char: string; index: number; expected: string }
  | { kind: "mismatch"; char: string; index: number; expected: string; actualTop: string | null }
  | { kind: "emptyPop"; char: string; index: number }
  | { kind: "done-valid" }
  | { kind: "done-invalid-unclosed" }
  | null;

export default function StackBox({
  stack,
  lastAction,
}: {
  stack: string[];
  lastAction: LastAction;
}) {
  const topIndex = stack.length - 1;

  return (
    <div className="flex flex-col items-center gap-3 mt-2">
      <div className="text-xs text-slate-400 mb-1">Stack (top at the top)</div>

      <div className="relative bg-slate-950/90 border border-slate-800 rounded-2xl px-6 py-4 min-h-[120px] shadow-[0_0_35px_rgba(15,23,42,0.9)]">
        {stack.length === 0 ? (
          <div className="w-28 h-16 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-700 rounded-xl">
            empty
          </div>
        ) : (
          <div className="flex flex-col-reverse items-center gap-2">
            {stack.map((ch, i) => {
              const isTop = i === topIndex;

              const isErrorTop =
                (lastAction?.kind === "mismatch" ||
                  lastAction?.kind === "emptyPop" ||
                  lastAction?.kind === "done-invalid-unclosed") && isTop;

              const isActiveTop =
                !isErrorTop &&
                (lastAction?.kind === "push" || lastAction?.kind === "pop") &&
                isTop;

              const isNew =
                lastAction?.kind === "push" && isTop && lastAction.char === ch;

              let state: "default" | "active" | "processed" | "error" =
                "default";
              if (isErrorTop) state = "error";
              else if (isActiveTop) state = "active";

              return (
                <BracketNode
                  key={i}
                  symbol={ch}
                  variant="stack"
                  state={state}
                  isNew={isNew}
                />
              );
            })}
          </div>
        )}

        {/* 'top' label */}
        <div className="absolute -top-3 right-6 text-[10px] uppercase tracking-[0.15em] text-slate-500 bg-black/80 px-2 py-0.5 rounded-full border border-slate-700">
          top
        </div>
      </div>
    </div>
  );
}
