// https://adventofcode.com/2021/day/13

export function part1(input: string): any {
  const [pointInput, foldInput] = input
    .split(`\n\n`)
    .map((section) => section.split(`\n`));

  const points = foldPoints(pointInput, foldInput.slice(0, 1));

  return points.filter(
    (point, i) =>
      points.findIndex((otherPoint) => point.isSame(otherPoint)) === i
  ).length;
}

export function part2(input: string): string {
  const [pointInput, foldInput] = input
    .split(`\n\n`)
    .map((section) => section.split(`\n`));

  const points = foldPoints(pointInput, foldInput);

  return drawPoints(points);
}

function foldPoints(
  pointInput: string[],
  foldInput: string[]
): FoldablePoint[] {
  const points = pointInput.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return new FoldablePoint({ x, y });
  });

  foldInput.forEach((line) => {
    const [axis, value] = line.replace("fold along ", "").split("=");
    points.forEach((point) => {
      point.fold(axis as "x" | "y", Number(value));
    });
  });

  return points;
}

function drawPoints(points: IPoint[]): string {
  const foldedPaper: string[][] = [[" "]];

  points.forEach(({ y, x }) => {
    if (y >= foldedPaper.length) {
      const numToAdd = y - foldedPaper.length + 1;
      for (let i = 0; i < numToAdd; i++) {
        foldedPaper.push(Array(foldedPaper[0].length).fill(" "));
      }
    }
    if (x >= foldedPaper[0].length) {
      const numToAdd = x - foldedPaper[0].length + 1;
      foldedPaper.forEach((row) => row.push(...Array(numToAdd).fill(" ")));
    }

    foldedPaper[y][x] = "#";
  });

  return foldedPaper.map((row) => row.join("")).join(`\n`);
}

interface IPoint {
  x: number;
  y: number;
}

class FoldablePoint implements IPoint {
  x: number;
  y: number;

  constructor({ x, y }: IPoint) {
    this.x = x;
    this.y = y;
  }

  fold(axis: "y" | "x", foldLine: number) {
    const currentValue = this[axis];
    if (currentValue > foldLine) {
      const diff = currentValue - foldLine;
      this[axis] = foldLine - diff;
    }
  }

  isSame(other: IPoint) {
    return this.x === other.x && this.y === other.y;
  }
}
