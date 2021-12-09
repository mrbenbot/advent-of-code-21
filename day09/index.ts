// https://adventofcode.com/2021/day/9

export function part1(input: string): any {
  const heightMap = input.split(`\n`).map((line) => [...line].map(Number));

  let total = 0;
  for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
      if (isLowest(heightMap, { y, x })) {
        total += heightMap[y][x] + 1;
      }
    }
  }
  return total;
}

export function part2(input: string): number {
  const heightMap = input.split(`\n`).map((line) => [...line].map(Number));
  const points = getLowestPoints(heightMap);
  const basinSizes = points
    .map((lowPoint) => {
      const qResult = getBasinSize(heightMap, lowPoint);
      return qResult;
    })
    .sort((a, b) => b - a)
    .slice(0, 3);

  return basinSizes.reduce((a, c) => a * c, 1);
}

type Point = { x: number; y: number };

const directions: { [key: string]: (point: Point) => Point } = {
  up: ({ y, x }) => ({ y: y - 1, x }),
  down: ({ y, x }) => ({ y: y + 1, x }),
  left: ({ y, x }) => ({ y, x: x - 1 }),
  right: ({ y, x }) => ({ y, x: x + 1 }),
};

function getBasinSize(heightMap: number[][], { x, y }: Point): number {
  const queue = [{ x, y }];
  let index = 0;

  while (true) {
    if (index >= queue.length) {
      return queue.length;
    }

    const nextSquares = ["up", "down", "left", "right"].reduce(
      (acc: Point[], cur) => {
        const nextSquare = directions[cur](queue[index]);

        const isNextSquareValid =
          heightMap[nextSquare.y]?.[nextSquare.x] !== 9 &&
          heightMap[queue[index].y]?.[queue[index].x] <
            heightMap[nextSquare.y]?.[nextSquare.x] &&
          !queue.some(
            (point) => point.x === nextSquare.x && point.y === nextSquare.y
          );

        if (isNextSquareValid) {
          acc.push(nextSquare);
        }
        return acc;
      },
      []
    );

    queue.push(...nextSquares);

    index++;
  }
}

function getLowestPoints(heightMap: number[][]): Point[] {
  const points: Point[] = [];
  for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
      if (isLowest(heightMap, { y, x })) {
        points.push({ y, x });
      }
    }
  }
  return points;
}

function isLowest(heightMap: number[][], { y, x }: Point): boolean {
  return [
    heightMap[y][x - 1],
    heightMap[y][x + 1],
    heightMap[y - 1]?.[x],
    heightMap[y + 1]?.[x],
  ].every((number) => number === undefined || number > heightMap[y][x]);
}
