export function part1(input: string): any {
  const horizontalPositions = input
    .split(",")
    .map(Number)
    .sort((a, b) => b - a);

  let total = Number.MAX_VALUE;

  for (let i = 0; i < horizontalPositions[0]; i++) {
    const totalForI = horizontalPositions.reduce((acc, cur) => {
      return acc + Math.abs(cur - i);
    }, 0);

    if (totalForI < total) {
      total = totalForI;
    }
  }
  return total;
}

export function part2(input: string): any {
  const horizontalPositions = input
    .split(",")
    .map(Number)
    .sort((a, b) => b - a);

  const fuelUsageMemo = {};
  let total = Number.MAX_VALUE;

  for (let i = 0; i < horizontalPositions[0]; i++) {
    const totalForI = horizontalPositions.reduce((acc, cur) => {
      return acc + getTotalFuelUsage(Math.abs(cur - i), fuelUsageMemo);
    }, 0);

    if (totalForI < total) {
      total = totalForI;
    }
  }
  return total;
}

function getTotalFuelUsage(
  number: number,
  memo: { [key: number]: number }
): number {
  if (number <= 0) {
    return number;
  }
  if (memo.hasOwnProperty(number)) {
    return memo[number];
  }
  const result = number + getTotalFuelUsage(number - 1, memo);
  memo[number] = result;
  return result;
}
