// https://adventofcode.com/2021/day/18

export function part1(input: string): any {
  const [first, ...rest] = input.split(`\n`).map((line) => JSON.parse(line));

  const finalPair: Pair = rest.reduce((acc, pair) => {
    return snailfishReduce([acc, pair]);
  }, first);

  return getMagnitude(finalPair);
}

export function part2(input: string): any {
  const numbers = input.split(`\n`).map((line) => JSON.parse(line));
  return numbers.reduce((maxMagnitude, currentNumber, i, arr) => {
    const maxThisNumberWithOthers = [
      ...arr.slice(0, i),
      ...arr.slice(i + 1),
    ].reduce((maxForThisNumber, otherNumber) => {
      return Math.max(
        maxForThisNumber,
        ...[
          [currentNumber, otherNumber],
          [otherNumber, currentNumber],
        ].map(([a, b]) => getMagnitude(snailfishReduce([a, b])))
      );
    }, 0);
    return Math.max(maxMagnitude, maxThisNumberWithOthers);
  }, 0);
}

type Pair =
  | [Pair, Pair]
  | [number, number]
  | [Pair, number]
  | [number | Pair]
  | number;

export function snailfishReduce(pair: Pair) {
  const newPair = JSON.parse(JSON.stringify(pair));
  let keepGoing = true;
  while (keepGoing) {
    const paths = getPaths(newPair);
    const hasExploded = explodeFirst(newPair, paths);
    if (hasExploded) {
      continue;
    }
    const hasSplit = splitFirst(newPair, paths);
    if (hasSplit) {
      continue;
    }
    keepGoing = false;
  }
  return newPair;
}

function explodeFirst(pair: Pair, paths: { path: number[] }[]): boolean {
  for (let i = 0; i < paths.length; i++) {
    const { path } = paths[i];
    if (path.length > 4) {
      //   @ts-ignore
      const [a, b] = path.slice(0, -1).reduce((a, c) => a[c], pair);

      set(pair, path.slice(0, -1), 0);

      if (paths[i - 1]) {
        add(pair, paths[i - 1].path, a);
      }
      if (paths[i + 2]) {
        add(pair, paths[i + 2].path, b);
      }

      return true;
    }
  }
  return false;
}

function splitFirst(pair: Pair, paths: { path: number[] }[]): boolean {
  for (let i = 0; i < paths.length; i++) {
    const { path } = paths[i];
    // @ts-ignore
    const value: number = path.reduce((a, c) => a[c], pair);
    if (value >= 10) {
      set(pair, path, split(value));
      return true;
    }
  }
  return false;
}

function getPaths(pair: Pair, path: number[] = []): { path: number[] }[] {
  if (typeof pair === "number") {
    return [{ path }];
  }
  return pair.flatMap((pair, i) => getPaths(pair, [...path, i]));
}

function add(pair: Pair, path: number[], value: number) {
  let pairToUpdate = pair;
  for (let i = 0; i < path.length - 1; i++) {
    // @ts-ignore
    pairToUpdate = pairToUpdate[path[i]];
  }
  // @ts-ignore
  pairToUpdate[path[path.length - 1]] += value;
}

function split(n: number): Pair {
  return [Math.floor(n / 2), Math.ceil(n / 2)];
}

function set(pair: Pair, path: number[], value: number | Pair) {
  let pairToUpdate = pair;
  for (let i = 0; i < path.length - 1; i++) {
    // @ts-ignore
    pairToUpdate = pairToUpdate[path[i]];
  }
  // @ts-ignore
  pairToUpdate[path[path.length - 1]] = value;
}

export function getMagnitude(pair: Pair): number {
  const [left, right] = pair;

  const leftSum = (Array.isArray(left) ? getMagnitude(left as Pair) : left) * 3;
  const rightSum =
    (Array.isArray(right) ? getMagnitude(right as Pair) : right) * 2;

  return leftSum + rightSum;
}
