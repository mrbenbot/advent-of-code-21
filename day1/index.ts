export function countIncreases(input: string): number {
  return input.split(`\n`).reduce((acc, cur, i, arr) => {
    if (arr[i - 1] === undefined) {
      return acc;
    }
    if (Number(cur) > Number(arr[i - 1])) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export function countThreeWindowIncreases1(input: string): number {
  return input.split(`\n`).reduce((acc, _, i, arr) => {
    if (arr[i - 1] === undefined) {
      return acc;
    }
    if (sumArray(arr.slice(i, i + 3)) > sumArray(arr.slice(i - 1, i + 2))) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export function countThreeWindowIncreases5(input: string): number {
  return input
    .split(`\n`)
    .reduce(
      (t, _, i, a) =>
        !a[i - 1] ||
        a.slice(i, i + 3).reduce((a, c) => a + Number(c), 0) <=
          a.slice(i - 1, i + 2).reduce((a, c) => a + Number(c), 0)
          ? t
          : t + 1,
      0
    );
}

export function countThreeWindowIncreases6(input: string): number {
  return input
    .split(`\n`)
    .reduce(
      (acc, cur, i, arr) => (Number(arr[i + 3]) > Number(cur) ? acc + 1 : acc),
      0
    );
}

export function countThreeWindowIncreases2(input: string): number {
  const memo: { [key: string]: number } = {};

  return input.split(`\n`).reduce((acc, _, i, arr) => {
    if (arr[i - 1] === undefined) {
      return acc;
    }
    if (!memo.hasOwnProperty(i)) {
      memo[i] = sumArray(arr.slice(i, i + 3));
    }
    if (!memo.hasOwnProperty(i - 1)) {
      memo[i - 1] = sumArray(arr.slice(i - 1, i + 2));
    }
    if (memo[i] > memo[i - 1]) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export function countThreeWindowIncreases3(input: string): number {
  const [count] = input.split(`\n`).reduce(
    ([count, prev]: [number, number | null], _, i, arr) => {
      const sum = sumArray(arr.slice(i, i + 3));
      if (prev === null) {
        return [0, sum];
      }

      return [sum > prev ? count + 1 : count, sum];
    },
    [0, null]
  );

  return count;
}

export function countThreeWindowIncreases4(input: string): number {
  const arr = input.split(`\n`);
  let prev: number | null = null;
  let count = 0;

  for (let i = 0; i < arr.length - 2; i++) {
    const current = sumArraySection(arr, i, i + 3);
    if (prev !== null) {
      if (current > prev) {
        count++;
      }
    }
    prev = current;
  }
  return count;
}

function sumArraySection(arr: string[], start: number, end: number) {
  let count = 0;
  for (let i = start; i < end; i++) {
    count += Number(arr[i]);
  }
  return count;
}

function sumArray(nums: string[]): number {
  return nums.reduce((acc, cur) => acc + Number(cur), 0);
}
