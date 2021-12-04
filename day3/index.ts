export function part1(input: string): any {
  const lines = input.split(`\n`);
  const mostCommon = findMostCommonOneLine(lines);

  const gamma = mostCommon.join("");
  const epsilon = mostCommon
    .map((digit) => (digit === "0" ? "1" : "0"))
    .join("");

  console.log({ gamma, epsilon });
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function findMostCommon(lines: string[]): string[] {
  const totals = lines[0].split("").map(() => 0);
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

export function part2(input: string): any {
  const lines = input.split(`\n`);

  let arr1 = lines;
  let arr2 = lines;

  for (let i = 0; i < lines[0].length; i++) {
    if (arr1.length !== 1) {
      arr1 = findAllWithNthDigit(arr1, i, findMostCommonOneLine(arr1)[i]);
    }
    if (arr2.length !== 1) {
      arr2 = findAllWithNthDigit(
        arr2,
        i,
        findMostCommonOneLine(arr2)[i] == "1" ? "0" : "1"
      );
    }
  }

  const oxygen = parseInt(arr1.join(""), 2);
  const co2 = parseInt(arr2.join(""), 2);

  return oxygen * co2;
}

export function part2OneLine(input: string): any {
  return [...Array(input.indexOf(`\n`))]
    .reduce(
      ([a, b], _, i) => [
        a.length === 1
          ? a
          : findAllWithNthDigit(a, i, findMostCommonOneLine(a)[i]),
        b.length === 1
          ? b
          : findAllWithNthDigit(
              b,
              i,
              findMostCommonOneLine(b)[i] == "1" ? "0" : "1"
            ),
      ],
      [input, input].map((a) => a.split(`\n`))
    )
    .reduce((acc: number, cur: string[]) => acc * parseInt(cur.join(""), 2), 1);
}

function findMostCommonOneLine(lines: string[]): string[] {
  return lines
    .reduce(
      (acc, line) =>
        line
          .split("")
          .reduce(
            (acc, digit, i) => [
              ...acc.slice(0, i),
              acc[i] + Number(digit),
              ...acc.slice(i + 1),
            ],
            acc
          ),
      [...Array(lines[0].length)].fill(0)
    )
    .map((digit) => (digit < lines.length / 2 ? "0" : "1"));
}

function findAllWithNthDigit(
  arr: string[],
  n: number,
  digit: string
): string[] {
  return arr.filter((line) => line[n] === digit);
}
