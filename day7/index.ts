export function calcMinFuel(
  sortedPositions: number[],
  usageFormula: (number: number) => number
): number {
  let total = Number.MAX_VALUE;

  for (let i = 0; i < sortedPositions[0]; i++) {
    const totalForI = sortedPositions.reduce((acc, cur) => {
      return acc + usageFormula(Math.abs(cur - i));
    }, 0);

    if (totalForI > total) {
      return total;
    }
    total = totalForI;
  }
  return total;
}

export function part1(input: string): number {
  return calcMinFuel(
    input
      .split(",")
      .map(Number)
      .sort((a, b) => b - a),
    (diff) => diff
  );
}

export function part2(input: string): number {
  return calcMinFuel(
    input
      .split(",")
      .map(Number)
      .sort((a, b) => b - a),
    (diff) => (diff * (diff + 1)) / 2
  );
}
