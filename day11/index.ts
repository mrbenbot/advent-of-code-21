// https://adventofcode.com/2021/day/11

export function part1(input: string): any {
  const octopusMatrix = input
    .split(`\n`)
    .map((line) => [...line].map((value) => new Octopus(Number(value))));

  let totalFlashes = 0;

  for (let n = 0; n < 100; n++) {
    const queue: Point[] = [];

    octopusMatrix.forEach((row, y) =>
      row.forEach((octopus, x) => {
        const hasFlashed = octopus.increment(n);
        if (hasFlashed) {
          queue.push({ y, x });
        }
      })
    );

    for (let i = 0; i < queue.length; i++) {
      directionOptions.forEach((transform) => {
        const adjacentPoint = transform(queue[i]);
        const octopus = octopusMatrix?.[adjacentPoint.y]?.[adjacentPoint.x];

        const hasFlashed = octopus?.increment(n);
        if (hasFlashed) {
          queue.push(adjacentPoint);
        }
      });
    }
    totalFlashes += queue.length;
  }
  return totalFlashes;
}

export function part2(input: string): number {
  const octopusMatrix = input
    .split(`\n`)
    .map((line) => [...line].map((value) => new Octopus(Number(value))));

  for (let n = 0; true; n++) {
    const queue: Point[] = [];

    octopusMatrix.forEach((row, y) =>
      row.forEach((octopus, x) => {
        const hasFlashed = octopus.increment(n);
        if (hasFlashed) {
          queue.push({ y, x });
        }
      })
    );

    for (let i = 0; i < queue.length; i++) {
      directionOptions.forEach((transform) => {
        const adjacentPoint = transform(queue[i]);
        const octopus = octopusMatrix?.[adjacentPoint.y]?.[adjacentPoint.x];

        const hasFlashed = octopus?.increment(n);
        if (hasFlashed) {
          queue.push(adjacentPoint);
        }
      });
    }

    if (queue.length === Math.pow(octopusMatrix.length, 2)) {
      return n + 1;
    }
  }
}

const directions: { [key: string]: (point: Point) => Point } = {
  u: ({ y, x }) => ({ y: y - 1, x }),
  ur: ({ y, x }) => ({ y: y - 1, x: x + 1 }),
  r: ({ y, x }) => ({ y, x: x + 1 }),
  dr: ({ y, x }) => ({ y: y + 1, x: x + 1 }),
  d: ({ y, x }) => ({ y: y + 1, x }),
  dl: ({ y, x }) => ({ y: y + 1, x: x - 1 }),
  l: ({ y, x }) => ({ y, x: x - 1 }),
  ul: ({ y, x }) => ({ y: y - 1, x: x - 1 }),
};

const directionOptions = Object.values(directions);

type Point = { y: number; x: number };

class Octopus {
  value: number;
  lastFlashed: number;
  constructor(value: number) {
    this.value = value;
    this.lastFlashed = -1;
  }

  increment(n: number): boolean {
    if (this.lastFlashed < n) {
      this.value++;
      if (this.value > 9) {
        this.value = 0;
        this.lastFlashed = n;
        return true;
      }
    }
    return false;
  }
}
