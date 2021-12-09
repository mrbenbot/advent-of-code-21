// https://adventofcode.com/2021/day/1

export function part1(input: string): number {
  return input
    .split(`\n`)
    .reduce(
      (acc, cur, i, arr) => (Number(arr[i + 1]) > Number(cur) ? acc + 1 : acc),
      0
    );
}

export function part2(input: string): number {
  return input
    .split(`\n`)
    .reduce(
      (acc, cur, i, arr) => (Number(arr[i + 3]) > Number(cur) ? acc + 1 : acc),
      0
    );
}
