export function generateInvertTrace() {
  const steps: any[] = [];

  function invert(node: any, depth = 0) {
    if (!node) {
      steps.push({
        type: "null",
        depth,
        explanation: "Hit a null node, return.",
        codeLine: 4,
      });
      return null;
    }

    steps.push({
      type: "visit",
      depth,
      value: node.val,
      explanation: `Visiting node ${node.val}.`,
      codeLine: 7,
    });

    steps.push({
      type: "swap",
      depth,
      value: node.val,
      explanation: `Swapping children of node ${node.val}.`,
      codeLine: 10,
    });

    const left = invert(node.right, depth + 1);
    const right = invert(node.left, depth + 1);

    steps.push({
      type: "return",
      depth,
      value: node.val,
      explanation: `Returning inverted subtree of node ${node.val}.`,
      codeLine: 14,
    });

    return { val: node.val, left, right };
  }

  const tree = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7, left: { val: 6 }, right: { val: 9 } },
  };

  invert(tree);
  return steps;
}
