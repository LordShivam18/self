// components/linked-list/remove-duplicates-ii/generateTrace.ts

export type RemoveDupIIStep = {
  step: number;

  list: number[];           // current list snapshot
  dummyAttached: boolean;

  prevIndex: number | null;
  currIndex: number | null;

  duplicateRange?: {
    start: number;
    end: number;
  };

  action: string;
  done: boolean;
};

export function generateTrace(input: number[]): RemoveDupIIStep[] {
  const trace: RemoveDupIIStep[] = [];
  let step = 0;

  const list = [...input];

  // ✅ STEP 0 — Attach dummy
  trace.push({
    step: step++,
    list: [...list],
    dummyAttached: true,
    prevIndex: null,
    currIndex: 0,
    action: "Dummy node attached before head. Prev points to dummy.",
    done: false,
  });

  let prev = -1; // dummy index
  let curr = 0;

  while (curr < list.length) {
    let next = curr + 1;

    // ✅ STEP 1 — Scan for duplicates
    while (next < list.length && list[next] === list[curr]) {
      next++;
    }

    if (next > curr + 1) {
      // ✅ DUPLICATE BLOCK FOUND
      trace.push({
        step: step++,
        list: [...list],
        dummyAttached: true,
        prevIndex: prev < 0 ? null : prev,
        currIndex: curr,
        duplicateRange: { start: curr, end: next - 1 },
        action: `Duplicate block detected from index ${curr} to ${next - 1}.`,
        done: false,
      });

      // ✅ STEP 2 — Remove full duplicate block
      list.splice(curr, next - curr);

      trace.push({
        step: step++,
        list: [...list],
        dummyAttached: true,
        prevIndex: prev < 0 ? null : prev,
        currIndex: curr < list.length ? curr : null,
        action: "All duplicates removed by skipping the entire block.",
        done: false,
      });
    } else {
      // ✅ SINGLE UNIQUE NODE
      prev++;
      curr++;

      trace.push({
        step: step++,
        list: [...list],
        dummyAttached: true,
        prevIndex: prev,
        currIndex: curr < list.length ? curr : null,
        action: "No duplicate detected. Moving prev and curr forward.",
        done: false,
      });
    }
  }

  // ✅ FINAL STEP
  trace.push({
    step: step++,
    list: [...list],
    dummyAttached: true,
    prevIndex: null,
    currIndex: null,
    action: "Traversal complete. Only unique nodes remain.",
    done: true,
  });

  return trace;
}
