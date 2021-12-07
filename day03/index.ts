export function part1(input: string): any {
  const lines = input.split(`\n`);
  const mostCommon = findMostCommon(lines);

  const gamma = mostCommon.join("");
  const epsilon = mostCommon
    .map((digit) => (digit === "0" ? "1" : "0"))
    .join("");

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

export function part2(input: string): any {
  const lines = input.split(`\n`);

  let arr1 = lines;
  let arr2 = lines;

  for (let i = 0; i < lines[0].length; i++) {
    if (arr1.length !== 1) {
      arr1 = findAllWithNthDigit(arr1, i, findMostCommon(arr1)[i]);
    }
    if (arr2.length !== 1) {
      arr2 = findAllWithNthDigit(
        arr2,
        i,
        findMostCommon(arr2)[i] == "1" ? "0" : "1"
      );
    }
  }

  const oxygen = parseInt(arr1.join(""), 2);
  const co2 = parseInt(arr2.join(""), 2);

  return oxygen * co2;
}

function findMostCommon(lines: string[]): string[] {
  const totals = Array(lines[0].length).fill(0);

  for (const line of lines) {
    const digits = line.split("");
    for (let i = 0; i < digits.length; i++) {
      totals[i] += Number(digits[i]);
    }
  }

  const mostCommon = totals.map((digit) =>
    digit < lines.length / 2 ? "0" : "1"
  );

  return mostCommon;
}

function findAllWithNthDigit(
  arr: string[],
  n: number,
  digit: string
): string[] {
  return arr.filter((line) => line[n] === digit);
}
