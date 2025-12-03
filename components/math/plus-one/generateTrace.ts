// components/math/plus-one/generateTrace.ts

export type PlusOneStep = {
  step: number;
  i: number;              // index processed
  oldDigit: number;       // original digit before action
  newDigit: number;       // digit after action
  action: string;         // description
  digits: number[];       // snapshot of array
};

export function generateTrace(digitsInput: number[]): PlusOneStep[] {
  const digits = digitsInput.slice();
  const trace: PlusOneStep[] = [];
  let step = 0;

  const n = digits.length;

  for (let i = n - 1; i >= 0; i--) {
    const oldDigit = digits[i];

    // Step 1 — show what is being checked
    trace.push({
      step: step++,
      i,
      oldDigit,
      newDigit: oldDigit,
      action: oldDigit === 9 ? "digit is 9 → carry" : "digit < 9 → increment and stop",
      digits: digits.slice(),
    });

    if (oldDigit === 9) {
      digits[i] = 0;

      // Step 2 — after carry applied
      trace.push({
        step: step++,
        i,
        oldDigit,
        newDigit: 0,
        action: "set digit to 0, continue carry",
        digits: digits.slice(),
      });
    } else {
      digits[i]++;

      trace.push({
        step: step++,
        i,
        oldDigit,
        newDigit: digits[i],
        action: "increment done → stop",
        digits: digits.slice(),
      });

      return trace;
    }
  }

  // All digits were 9 → prepend 1
  digits.unshift(1);

  trace.push({
    step: step++,
    i: -1,
    oldDigit: 9,
    newDigit: 1,
    action: "all digits were 9 → prepend 1",
    digits: digits.slice(),
  });

  return trace;
}
