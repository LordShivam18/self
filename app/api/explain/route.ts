// app/api/explain/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { step, mode } = body;
    // If you have OpenAI key and SDK installed, call OpenAI here.
    // For now return a deterministic friendly explanation.
    const simple = `Beginner: At this step we ${
      step?.type ?? "do something"
    }. We choose ${step?.nodeId ?? step?.preIndex ?? ""} as the root and split the inorder array at index ${step?.rootInIndex ?? "?"}.`;
    const expert = `Expert: Step ${step?.type ?? "?"} — details: ${JSON.stringify(step ?? {}, null, 2)}`;
    return NextResponse.json({ explanation: mode === "beginner" ? simple : expert });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
