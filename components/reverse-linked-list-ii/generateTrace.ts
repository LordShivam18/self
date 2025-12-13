// components/linked-list/reverse-linked-list-ii/generateTrace.ts

export type ReverseIIStep = {
  step: number;
  list: number[];

  left: number;
  right: number;

  dummyIndex: number | null;
  prevIndex: number | null;
  currIndex: number | null;
  tempIndex?: number | null;

  reversing: boolean;

  action: string;
  done: boolean;
};

export function generateTrace(
  input: number[],
  left: number,
  right: number
): ReverseIIStep[] {
  const trace: ReverseIIStep[] = [];
  let step = 0;

  const list = [...input];

  if (left === right || list.length === 0) {
    trace.push({
      step: step++,
      list: [...list],
      left,
      right,
      dummyIndex: null,
      prevIndex: null,
      currIndex: null,
      reversing: false,
      action: "No reversal needed (left == right or empty list).",
      done: true,
    });
    return trace;
  }

  // Dummy node at index -1
  trace.push({
    step: step++,
    list: [...list],
    left,
    right,
    dummyIndex: -1,
    prevIndex: -1,
    currIndex: 0,
    reversing: false,
    action: "Dummy node added. Prev starts at dummy.",
    done: false,
  });

  // Move prev to node before left
  let prev = -1;
  let curr = 0;

  for (let i = 1; i < left; i++) {
    prev++;
    curr++;

    trace.push({
      step: step++,
      list: [...list],
      left,
      right,
      dummyIndex: -1,
      prevIndex: prev,
      currIndex: curr,
      reversing: false,
      action: "Moving prev pointer to node before left position.",
      done: false,
    });
  }

  // curr now at left
  trace.push({
    step: step++,
    list: [...list],
    left,
    right,
    dummyIndex: -1,
    prevIndex: prev,
    currIndex: curr,
    reversing: true,
    action: "Start reversing using head-insertion technique.",
    done: false,
  });

  // Reverse using head-insertion
  for (let i = 0; i < right - left; i++) {
    const temp = curr + 1;

    trace.push({
      step: step++,
      list: [...list],
      left,
      right,
      dummyIndex: -1,
      prevIndex: prev,
      currIndex: curr,
      tempIndex: temp,
      reversing: true,
      action: "Detach next node and move it to the front of sublist.",
      done: false,
    });

    const removed = list.splice(temp, 1)[0];
    list.splice(prev + 1, 0, removed);

    trace.push({
      step: step++,
      list: [...list],
      left,
      right,
      dummyIndex: -1,
      prevIndex: prev,
      currIndex: curr + 1,
      reversing: true,
      action: "Node inserted at the front of the reversing segment.",
      done: false,
    });
  }

  trace.push({
    step: step++,
    list: [...list],
    left,
    right,
    dummyIndex: null,
    prevIndex: null,
    currIndex: null,
    reversing: false,
    action: "Reversal complete. Returning modified list.",
    done: true,
  });

  return trace;
}
