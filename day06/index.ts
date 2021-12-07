export function part1(input: string): number {
  return calculateLanternFish(input.split(","), 80);
}

export function part2(input: string): number {
  return calculateLanternFish(input.split(","), 256);
}

export function calculateLanternFish(
  fishes: string[],
  numDays: number
): number {
  const fishCounters = [..."012345678"].map(
    (counterValue) => fishes.filter((fish) => fish === counterValue).length
  );

  for (let i = 0; i < numDays; i++) {
    const numZeros = fishCounters.shift() as number;
    fishCounters[6] += numZeros;
    fishCounters.push(numZeros);
  }

  return fishCounters.reduce((total, numFish) => total + numFish, 0);
}
