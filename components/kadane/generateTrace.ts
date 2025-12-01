export type TraceStep = {
i: number; // current index
currentSum: number;
bestSum: number;
bestRange: [number, number] | null;
activeRange: [number, number] | null; // current candidate range
highlightLines?: number[]; // code highlight lines
arr?: number[];
};


export function generateKadaneTrace(): TraceStep[] {
// sample array (you can change)
const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const steps: TraceStep[] = [];


let bestSum = -Infinity;
let currentSum = 0;
let start = 0;


for (let i = 0; i < arr.length; i++) {
const v = arr[i];


// decide whether to start new subarray at i
if (currentSum + v < v) {
currentSum = v;
start = i;
} else {
currentSum = currentSum + v;
}


// highlight candidate
steps.push({
i,
currentSum,
bestSum,
bestRange: bestSum === -Infinity ? null : null,
activeRange: [start, i],
highlightLines: [4, 5],
arr,
});


if (currentSum > bestSum) {
bestSum = currentSum;
steps.push({
i,
currentSum,
bestSum,
bestRange: [start, i],
activeRange: [start, i],
highlightLines: [7],
arr,
});
}
}


// final step
steps.push({ i: arr.length - 1, currentSum, bestSum, bestRange: null, activeRange: null, arr, highlightLines: [] });


return steps;
}