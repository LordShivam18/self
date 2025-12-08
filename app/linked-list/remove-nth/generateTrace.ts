// components/linked-list/remove-nth/generateTrace.ts

export type RemoveNthStep = {
  step: number;

  list: number[];          // current list snapshot
  dummyAttached: boolean; // whether dummy is visualized

  fastIndex: number | null;
  slowIndex: number | null;

  targetIndex?: number;   // node to be deleted (only when identified)

  action: string;         // explanation text

  done: boolean;          // algorithm finished?
};

export function generateTrace(
  input: number[],
  n: number
): RemoveNthStep[] {
  const trace: RemoveNthStep[] = [];
  let step = 0;

  const list = [...input];

  // ✅ STEP 0 — Attach dummy
  trace.push({
    step: step++,
    list: [...list],
    dummyAttached: true,
    fastIndex: null,
    slowIndex: null,
    action: "Dummy node attached before head to simplify edge cases.",
    done: false,
  });

  let fast = -1; // dummy index
  let slow = -1;

  // ✅ STEP 1 — Move fast pointer n+1 steps
  for (let i = 0; i <= n; i++) {
    fast++;

    trace.push({
      step: step++,
      list: [...list],
      dummyAttached: true,
      fastIndex: fast < list.length ? fast : null,
      slowIndex: slow < 0 ? null : slow,
      action:
        i === n
          ? "Fast pointer moved n+1 steps ahead — gap created."
          : "Moving fast pointer forward.",
      done: false,
    });
  }

  // ✅ STEP 2 — Move both until fast reaches end
  while (fast < list.length) {
    fast++;
    slow++;

    trace.push({
      step: step++,
      list: [...list],
      dummyAttached: true,
      fastIndex: fast < list.length ? fast : null,
      slowIndex: slow,
      action: "Moving both fast and slow pointers together.",
      done: false,
    });
  }

  // ✅ STEP 3 — Identify deletion target
  const targetIndex = slow + 1;

  trace.push({
    step: step++,
    list: [...list],
    dummyAttached: true,
    fastIndex: null,
    slowIndex: slow,
    targetIndex,
    action: `Target node identified at index ${targetIndex} (to be removed).`,
    done: false,
  });

  // ✅ STEP 4 — Remove target node
  list.splice(targetIndex, 1);

  trace.push({
    step: step++,
    list: [...list],
    dummyAttached: true,
    fastIndex: null,
    slowIndex: slow,
    action: "Target node removed by skipping slow → next link.",
    done: true,
  });

  return trace;
}
