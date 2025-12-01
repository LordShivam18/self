// components/kadane/generateTrace.ts
// Clean, strict-safe Kadane trace generator.

export interface TraceStep {
  i: number;                               // current index
  currentSum: number;                      // running sum
  bestSum: number;                         // best sum so far
  activeRange: [number, number] | null;    // currently considered subarray
  bestRange: [number, number] | null;      // best subarray found so far
  nums: number[];                          // reference to input array
}

// Default array for visualizer
const DEFAULT_ARRAY = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

export function generateTrace(arr: number[] = DEFAULT_ARRAY): TraceStep[] {
  const nums = [...arr];

  if (nums.length === 0) return [];

  const trace: TraceStep[] = [];

  let currentSum = 0;
  let bestSum = Number.NEGATIVE_INFINITY;

  let start = 0;
  let bestStart = 0;
  let bestEnd = 0;

  // Initial "before step 0"
  trace.push({
    i: -1,
    currentSum: 0,
    bestSum: Number.NEGATIVE_INFINITY,
    activeRange: null,
    bestRange: null,
    nums,
  });

  // Kadane’s core logic
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];

    // Restart or extend subarray?
    if (currentSum + v < v) {
      currentSum = v;
      start = i;
    } else {
      currentSum += v;
    }

    // Update best sum found
    if (currentSum > bestSum) {
      bestSum = currentSum;
      bestStart = start;
      bestEnd = i;
    }

    trace.push({
      i,
      currentSum,
      bestSum,
      activeRange: [start, i],
      bestRange: [bestStart, bestEnd],
      nums,
    });
  }

  // Final completion step
  trace.push({
    i: nums.length - 1,
    currentSum,
    bestSum,
    activeRange: null,
    bestRange: [bestStart, bestEnd],
    nums,
  });

  return trace;
}
