export type Node = {
  val: number;
  left?: Node | null;
  right?: Node | null;
};

export type Trace = {
  type: string;
  depth: number;
  value?: number;
  explanation: string;
  codeLine: number;
};

export function generateInvertTrace(): Trace[] {
  const steps: Trace[] = [];

  function invert(node: Node | null, depth = 0): Node | null {
    if (!node) {
      steps.push({
        type: "null",
        depth,
        explanation: "Hit a null node, returning.",
        codeLine: 2,
      });
      return null;
    }

    steps.push({
      type: "visit",
      depth,
      value: node.val,
      explanation: `Visiting node ${node.val}`,
      codeLine: 5,
    });

    steps.push({
      type: "swap",
      depth,
      value: node.val,
      explanation: `Swapping children of node ${node.val}`,
      codeLine: 7,
    });

    const left = invert(node.right ?? null, depth + 1);
    const right = invert(node.left ?? null, depth + 1);

    steps.push({
      type: "return",
      depth,
      value: node.val,
      explanation: `Returning inverted node ${node.val}`,
      codeLine: 11,
    });

    return { val: node.val, left, right };
  }

  const tree: Node = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7, left: { val: 6 }, right: { val: 9 } },
  };

  invert(tree);
  return steps;
}
