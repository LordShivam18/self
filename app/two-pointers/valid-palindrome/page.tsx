"use client";

import { useState } from "react";
import ModeToggle from "@/components/stack/ModeToggle";
import CharNode, { CharState } from "@/components/two-pointers/valid-palindrome/CharNode";
import PointerNode from "@/components/two-pointers/valid-palindrome/PointerNode";
import MicroscopeView from "@/components/two-pointers/valid-palindrome/MicroscopeView";

export default function ValidPalindromePage() {
  const raw = "A man, a plan, a canal: Panama";
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9]/g, "");

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(cleaned.length - 1);
  const [status, setStatus] = useState<"ready" | "processing" | "done">(
    "ready"
  );
  const [mode, setMode] = useState<"beginner" | "expert">("beginner");
  const [result, setResult] = useState<"palindrome" | "not" | null>(null);

  function step() {
    if (status === "done") return;

    if (status === "ready") setStatus("processing");

    if (left >= right) {
      setStatus("done");
      setResult("palindrome");
      return;
    }

    if (cleaned[left] !== cleaned[right]) {
      setStatus("done");
      setResult("not");
      return;
    }

    setLeft(left + 1);
    setRight(right - 1);
  }

  function reset() {
    setLeft(0);
    setRight(cleaned.length - 1);
    setStatus("ready");
    setResult(null);
  }

  function explanation() {
    if (status === "ready") {
      return "We cleaned the string to remove punctuation and spaces. Now we will compare characters at left and right indices.";
    }

    if (status === "done") {
      return result === "palindrome"
        ? "Pointers crossed without mismatch → It's a palindrome!"
        : "Characters mismatched → Not a palindrome.";
    }

    if (cleaned[left] === cleaned[right]) {
      return `Characters match: '${cleaned[left]}' == '${cleaned[right]}'. Move both pointers inward.`;
    }

    return `Mismatch found: '${cleaned[left]}' != '${cleaned[right]}'. Stop → Not a palindrome.`;
  }

  return (
    <div className="min-h-screen bg-black text-slate-50 flex flex-col items-center py-10 px-4 gap-10">
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Valid <span className="text-cyan-400">Palindrome</span>
        </h1>
        <p className="text-sm text-slate-400">Two-pointer palindrome checker visualization</p>
      </header>

      <ModeToggle mode={mode} onChange={setMode} />

      {/* Cleaned string row */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
          Cleaned String
        </div>

        <div className="flex items-center gap-2">
          {cleaned.split("").map((ch, idx) => {
            let state: CharState = "idle";

            if (idx === left && status !== "done") state = "active";
            if (idx === right && status !== "done") state = "active";

            if (status === "done" && result === "palindrome")
              state = "match";
            if (status === "done" && result === "not" && (idx === left || idx === right))
              state = "mismatch";

            return <CharNode key={idx} ch={ch} state={state} />;
          })}
        </div>

        {/* Pointers */}
        <div className="flex items-center gap-2 h-6">
          {cleaned.split("").map((_, idx) => (
            <div key={idx} className="w-10 flex justify-center">
              {idx === left && status !== "done" && <PointerNode type="L" />}
              {idx === right && status !== "done" && <PointerNode type="R" />}
            </div>
          ))}
        </div>
      </div>

      {/* Microscope */}
      <MicroscopeView left={left} right={right} cleaned={cleaned} />

      {/* Explanation */}
      <div className="bg-[#050816] border border-slate-800 rounded-2xl px-6 py-4 max-w-3xl text-center text-sm text-slate-200 shadow-[0_0_32px_rgba(15,23,42,0.9)]">
        {explanation()}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={step}
          disabled={status === "done"}
          className="px-7 py-2 rounded-xl text-sm font-medium bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-400 shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all"
        >
          {status === "done" ? "Done" : "Step →"}
        </button>

        <button
          onClick={reset}
          className="px-7 py-2 rounded-xl text-sm font-medium bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
