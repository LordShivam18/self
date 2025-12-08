// components/linked-list/rotate-list/generateTrace.ts

export type RotateListStep = {
  step: number;

  list: number[];        // current list snapshot
  k: number;             // original k
  effectiveK: number;   // k % length

  tailIndex: number | null;
  newTailIndex: number | null;
  newHeadIndex: number | null;

  circular: boolean;    // is list currently circular?

  action: string;
  done: boolean;
};

export function generateTrace(
  input: number[],
  k: number
): RotateListStep[] {
  const trace: RotateListStep[] = [];
  let step = 0;

  const list = [...input];

  if (list.length === 0 || list.length === 1 || k === 0) {
    trace.push({
      step: step++,
      list: [...list],
      k,
      effectiveK: 0,
      tailIndex: null,
      newTailIndex: null,
      newHeadIndex: null,
      circular: false,
      action: "No rotation needed (empty list, single node, or k = 0).",
      done: true,
    });
    return trace;
  }

  // ✅ STEP 1 — Compute length & tail
  let length = 1;
  let tail = 0;

  while (tail + 1 < list.length) {
    tail++;
    length++;
  }

  trace.push({
    step: step++,
    list: [...list],
    k,
    effectiveK: -1,
    tailIndex: tail,
    newTailIndex: null,
    newHeadIndex: null,
    circular: false,
    action: `Length calculated = ${length}. Tail found at index ${tail}.`,
    done: false,
  });

  // ✅ STEP 2 — Compute effective k
  const effectiveK = k % length;

  trace.push({
    step: step++,
    list: [...list],
    k,
    effectiveK,
    tailIndex: tail,
    newTailIndex: null,
    newHeadIndex: null,
    circular: false,
    action:
      effectiveK === 0
        ? "k % length = 0 → rotation has no effect."
        : `Effective rotation steps = k % length = ${effectiveK}.`,
    done: effectiveK === 0,
  });

  if (effectiveK === 0) return trace;

  // ✅ STEP 3 — Connect tail to head (make it circular)
  trace.push({
    step: step++,
    list: [...list],
    k,
    effectiveK,
    tailIndex: tail,
    newTailIndex: null,
    newHeadIndex: null,
    circular: true,
    action: "Tail connected to head → list becomes circular.",
    done: false,
  });

  // ✅ STEP 4 — Find new tail: length - k - 1 moves from head
  const stepsToNewTail = length - effectiveK - 1;
  let newTail = 0;

  for (let i = 0; i < stepsToNewTail; i++) {
    newTail++;

    trace.push({
      step: step++,
      list: [...list],
      k,
      effectiveK,
      tailIndex: tail,
      newTailIndex: newTail,
      newHeadIndex: null,
      circular: true,
      action: "Moving to find the new tail.",
      done: false,
    });
  }

  // ✅ STEP 5 — New head is next of new tail
  const newHead = newTail + 1;

  trace.push({
    step: step++,
    list: [...list],
    k,
    effectiveK,
    tailIndex: tail,
    newTailIndex: newTail,
    newHeadIndex: newHead,
    circular: true,
    action: `New head identified at index ${newHead}.`,
    done: false,
  });

  // ✅ STEP 6 — Break the circle & rotate array for visuals
  const rotated = [
    ...list.slice(newHead),
    ...list.slice(0, newHead),
  ];

  trace.push({
    step: step++,
    list: rotated,
    k,
    effectiveK,
    tailIndex: null,
    newTailIndex: null,
    newHeadIndex: 0,
    circular: false,
    action: "Circle broken at new tail → rotation complete ✅",
    done: true,
  });

  return trace;
}
