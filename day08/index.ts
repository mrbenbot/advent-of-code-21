export function part1(input: string): any {
  const lines = input.split(`\n`);
  return lines.reduce((acc, line) => {
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

export function part2(input: string): any {
  const lines = input.split(`\n`);
  return lines.reduce((acc, line) => {
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

    // 3 is the signal with length of 5 which if you take whats in 1 away you are left with 3 length
    const three =
      joined
        .filter((signal) => signal.length === 5)
        .find((signal) => diffSignal(one, signal).length === 3) ?? "";

    numberMap[three] = 3;

    // b is the the letter that are different between 1 and 4 not in 3
    const b = diffSignal(one, four)
      .split("")
      .find((letter) => !three.includes(letter)) as string;

    // d is the the letter that are different between 1 and 4 and is in 3
    const d = diffSignal(one, four)
      .split("")
      .find((letter) => letter !== b) as string;

    // two is the 5 length signal that does not contain b and is not three
    const two = joined
      .filter((signal) => signal.length === 5)
      .find((signal) => !signal.includes(b) && signal !== three) as string;

    numberMap[two] = 2;

    // five is the 5 length signal that does contain b and is not 3
    const five = joined
      .filter((signal) => signal.length === 5)
      .find((signal) => signal.includes(b) && signal !== three) as string;

    numberMap[five] = 5;

    // zero is the 6 length signal that does not contain d
    const zero = joined
      .filter((signal) => signal.length === 6)
      .find((signal) => !signal.includes(d)) as string;

    numberMap[zero] = 0;

    // 6 is the 6 length signal not equal to zero with 5 left after diff 1
    const six = joined
      .filter((signal) => signal.length === 6)
      .find(
        (signal) => signal !== zero && diffSignal(signal, one).length === 5
      ) as string;

    numberMap[six] = 6;

    // 9 has the length of 6 and is not 0 or 6
    const nine = joined
      .filter((signal) => signal.length === 6)
      .find((signal) => signal !== zero && signal !== six) as string;

    numberMap[nine] = 9;

    const total = output
      .map((str) => [...str].sort().join(""))
      .reduce((acc, cur) => `${acc}${numberMap[cur]}`, "");

    return acc + Number(total);
  }, 0);
}

function diffSignal(a: string, b: string): string {
  const [longer, shorter] = [a, b].sort((a, b) => b.length - a.length);
  const diff = [...longer]
    .filter((letter) => !shorter.includes(letter))
    .join("");
  return diff;
}
