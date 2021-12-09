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
      const visited = {};
      getBasinSize(heightMap, lowPoint, visited);
      return Object.keys(visited).length;
    })
    .sort((a, b) => b - a)
    .slice(0, 3);

  return basinSizes.reduce((a, c) => a * c, 1);
}

type Point = { x: number; y: number };

function getBasinSize(
  heightMap: number[][],
  { x, y }: Point,
  visited: { [key: string]: boolean } = {}
): void {
  visited[`${y}-${x}`] = true;

  const options = [
    { y, x: x + 1 },
    { y, x: x - 1 },
    { y: y - 1, x },
    { y: y + 1, x },
  ].filter((p) => {
    const hasBeenVisited = visited[`${p.y}-${p.x}`];
    const isHigherThanPrevious = heightMap[y]?.[x] < heightMap[p.y]?.[p.x];
    const isNot9 = heightMap[p.y]?.[p.x] !== 9;
    return !hasBeenVisited && isHigherThanPrevious && isNot9;
  });

  if (options.length === 0) {
    return;
  }

  options.forEach((option) => getBasinSize(heightMap, option, visited));
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
