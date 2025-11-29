// components/binary-tree/same-tree/generateTrace.ts
// simple trace generator for "Same Tree" problem
export type TraceStep = {
  type: string;
  text?: string;
  leftNodes?: number[]; // snapshot of visible node values in left tree
  rightNodes?: number[]; // snapshot of visible node values in right tree
  comparePair?: { leftVal?: number; rightVal?: number };
  result?: "equal" | "diff" | "continue";
};

type Node = { val: number | null; left?: Node | null; right?: Node | null };

function makeTreeFromArray(arr: Array<number | null>) {
  // simple heap-like build for demo (level order)
  if (!arr || arr.length === 0) return null;
  const nodes: (Node | null)[] = arr.map((v) => (v === null ? null : { val: v }));
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;
    const li = 2 * i + 1;
    const ri = 2 * i + 2;
    nodes[i].left = li < nodes.length ? nodes[li] : null;
    nodes[i].right = ri < nodes.length ? nodes[ri] : null;
  }
  return nodes[0];
}

export function generateSameTreeTrace(): TraceStep[] {
  // Example small trees (you can change arrays)
  const aArr = [1, 2, 3]; // left tree level-order
  const bArr = [1, 2, 3]; // right tree level-order (same)
  const A = makeTreeFromArray(aArr);
  const B = makeTreeFromArray(bArr);

  const steps: TraceStep[] = [];

  function pushStep(s: TraceStep) {
    // push a shallow copy
    steps.push({ ...s });
  }

  function recurse(p: Node | null, q: Node | null, leftSnapshot: number[], rightSnapshot: number[]) {
    // snapshot nodes for visualization (we push before decisions)
    if (!p && !q) {
      pushStep({
        type: "null-null",
        text: "Both nodes are null -> equal at this branch.",
        leftNodes: [...leftSnapshot],
        rightNodes: [...rightSnapshot],
        result: "equal",
      });
      return true;
    }
    if (!p || !q) {
      pushStep({
        type: "one-null",
        text: "One node is null and the other is not -> not same.",
        leftNodes: [...leftSnapshot],
        rightNodes: [...rightSnapshot],
        comparePair: { leftVal: p?.val ?? undefined, rightVal: q?.val ?? undefined },
        result: "diff",
      });
      return false;
    }

    // compare current values
    pushStep({
      type: "compare-root",
      text: `Compare root values: ${p.val} ? ${q.val}`,
      leftNodes: [...leftSnapshot, p.val ?? 0],
      rightNodes: [...rightSnapshot, q.val ?? 0],
      comparePair: { leftVal: p.val ?? undefined, rightVal: q.val ?? undefined },
      result: p.val === q.val ? "equal" : "diff",
    });

    if (p.val !== q.val) {
      pushStep({
        type: "compare-val",
        text: `Values differ (${p.val} != ${q.val}) -> trees not same`,
        leftNodes: [...leftSnapshot, p.val ?? 0],
        rightNodes: [...rightSnapshot, q.val ?? 0],
        comparePair: { leftVal: p.val ?? undefined, rightVal: q.val ?? undefined },
        result: "diff",
      });
      return false;
    }

    // equal at this node; recurse left
    pushStep({
      type: "recurse",
      text: `Values equal, recurse left child`,
      leftNodes: [...leftSnapshot, p.val ?? 0],
      rightNodes: [...rightSnapshot, q.val ?? 0],
      comparePair: { leftVal: p.val ?? undefined, rightVal: q.val ?? undefined },
      result: "continue",
    });

    const leftOk = recurse(p.left ?? null, q.left ?? null, [...leftSnapshot, p.val ?? 0], [...rightSnapshot, q.val ?? 0]);
    if (!leftOk) return false;

    pushStep({
      type: "recurse",
      text: `Left subtree equal, recurse right child`,
      leftNodes: [...leftSnapshot, p.val ?? 0],
      rightNodes: [...rightSnapshot, q.val ?? 0],
      comparePair: { leftVal: p.val ?? undefined, rightVal: q.val ?? undefined },
      result: "continue",
    });

    const rightOk = recurse(p.right ?? null, q.right ?? null, [...leftSnapshot, p.val ?? 0], [...rightSnapshot, q.val ?? 0]);
    return rightOk;
  }

  // start
  pushStep({
    type: "start",
    text: "Start comparison",
    leftNodes: [],
    rightNodes: [],
    result: "continue",
  });

  const overall = recurse(A, B, [], []);
  pushStep({
    type: "end",
    text: `Finished: trees are ${overall ? "same" : "different"}`,
    leftNodes: [],
    rightNodes: [],
    result: overall ? "equal" : "diff",
  });

  return steps;
}
