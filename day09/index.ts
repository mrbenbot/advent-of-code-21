// https://adventofcode.com/2021/day/9

export function part1(input: string): any {
  return input
    .split(`\n`)
    .map((line) => [...line].map(Number))
    .reduce(
      (total, row, y, heightMap) =>
        total +
        row.reduce((rowTotal, point, x) => {
          if (isLowest(heightMap, { y, x })) {
            return rowTotal + point + 1;
          }
          return rowTotal;
        }, 0),
      0
    );
}

export function part2(input: string): number {
  const heightMap = input.split(`\n`).map((line) => [...line].map(Number));

  const basinSizes = getLowestPoints(heightMap)
    .map((lowPoint) => getBasinSize(heightMap, lowPoint))
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

const directionOptions = Object.values(directions);

function getBasinSize(heightMap: number[][], { x, y }: Point): number {
  const queue = [{ x, y }];
  let index = 0;

  while (index < queue.length) {
    const currentPointValue = heightMap[queue[index].y]?.[queue[index].x];

    for (const transform of directionOptions) {
      const nextPoint = transform(queue[index]);
      const nextPointValue = heightMap[nextPoint.y]?.[nextPoint.x];

      const isNextPointValid =
        nextPointValue !== 9 &&
        currentPointValue < nextPointValue &&
        !queue.some(({ x, y }) => x === nextPoint.x && y === nextPoint.y);

      if (isNextPointValid) {
        queue.push(nextPoint);
      }
    }
    index++;
  }

  return queue.length;
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
