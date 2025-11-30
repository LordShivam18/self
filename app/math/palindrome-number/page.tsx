"use client";

import React, { useState, useEffect } from "react";
import { generatePalindromeTrace } from "@/components/math/palindrome/generateTrace";
import NumberCanvas from "@/components/math/palindrome/NumberCanvas";
import TracePanel from "@/components/math/palindrome/TracePanel";
import CodePanel from "@/components/math/palindrome/CodePanel";
import Controls from "@/components/math/palindrome/Controls";

export default function PalindromeNumberPage() {
  const [trace, setTrace] = useState<any[]>([]);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const steps = generatePalindromeTrace(121);
    setTrace(steps);
  }, []);

  const step = trace[cursor];

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center p-8">

      <h1 className="text-4xl font-bold mb-4">Palindrome Number</h1>

      {step && <NumberCanvas step={step} />}

      <Controls
        step={() => setCursor((c) => Math.min(trace.length - 1, c + 1))}
        reset={() => setCursor(0)}
      />

      {step && <TracePanel step={step} />}

      <CodePanel highlight={step ? step.highlight : -1} />
    </div>
  );
}
