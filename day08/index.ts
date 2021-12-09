// https://adventofcode.com/2021/day/8

export function part1(input: string): number {
  return input.split(`\n`).reduce((acc, line) => {
    const [_, output] = line.split(" | ").map((part) => part.split(" "));

    const oneFourSevenEights = output.filter((num) =>
      [2, 3, 4, 7].includes(num.length)
    );
    return acc + oneFourSevenEights.length;
  }, 0);
}

const lengthToNumber: { [key: number]: string } = {
  7: "eight",
  3: "seven",
  4: "four",
  2: "one",
};

export function part2(input: string): number {
  return input.split(`\n`).reduce((acc, line) => {
    const [input, output] = line.split(" | ").map((part) => part.split(" "));
    const joined = input.concat(output).map((str) => [...str].sort().join(""));

    const numberMap: { [key: string]: number } = {};

    const { one, four, seven, eight } = joined.reduce(
      (acc: { [key: string]: string }, cur) => {
        if (lengthToNumber[cur.length]) {
          acc[lengthToNumber[cur.length]] = cur;
        }
        return acc;
      },
      {}
    );

    numberMap[one] = 1;
    numberMap[four] = 4;
    numberMap[seven] = 7;
    numberMap[eight] = 8;

    // three is the signal with length of 5 which if you take whats in 1 away you are left with 3 length
    const three =
      joined.find(
        (signal) => signal.length === 5 && diffSignal(one, signal).length === 3
      ) ?? "";

    numberMap[three] = 3;

    // b is the the letter that are different between 1 and 4 not in 3
    // d is the the letter that are different between 1 and 4 and is in 3
    const [b, d] = diffSignal(one, four).sort((a) =>
      three.includes(a) ? 1 : -1
    );

    // two is the 5 length signal that does not contain b and is not equal to three
    const two = joined.find(
      (signal) => signal.length === 5 && !signal.includes(b) && signal !== three
    ) as string;

    numberMap[two] = 2;

    // five is the 5 length signal that does contain b and is not equal to three
    const five = joined.find(
      (signal) => signal.length === 5 && signal.includes(b) && signal !== three
    ) as string;

    numberMap[five] = 5;

    // zero is the 6 length signal that does not contain d
    const zero = joined.find(
      (signal) => signal.length === 6 && !signal.includes(d)
    ) as string;

    numberMap[zero] = 0;

    // six is the 6 length signal not equal to zero with 5 left after diff 1
    const six = joined.find(
      (signal) =>
        signal.length === 6 &&
        signal !== zero &&
        diffSignal(signal, one).length === 5
    ) as string;

    numberMap[six] = 6;

    // 9 has the length of 6 and is not equal to zero or six
    const nine = joined.find(
      (signal) => signal.length === 6 && signal !== zero && signal !== six
    ) as string;

    numberMap[nine] = 9;

    const total = output.reduce((acc, cur) => {
      const key = [...cur].sort().join("");
      return `${acc}${numberMap[key]}`;
    }, "");

    return acc + Number(total);
  }, 0);
}

function diffSignal(a: string, b: string): string[] {
  const [longer, shorter] = [a, b].sort((a, b) => b.length - a.length);
  return [...longer].filter((letter) => !shorter.includes(letter));
}
