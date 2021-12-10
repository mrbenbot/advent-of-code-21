// https://adventofcode.com/2021/day/n

export function part1(input: string): any {
  const lines = input.split(`\n`).map((line) => [...line]);

  return lines.reduce((total, line) => {
    const lineScore = getScoreForCorruptLine(line);
    return total + lineScore;
  }, 0);
}

export function part2(input: string): any {
  const scores = input
    .split(`\n`)
    .filter((line) => getScoreForCorruptLine([...line]) === 0)
    .map((line) => getScoreForIncompleteLine([...line]))
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

export function getScoreForCorruptLine(line: string[]): number {
  const stack: string[] = [];

  for (const bracket of line) {
    if (["(", "[", "{", "<"].includes(bracket)) {
      stack.push(bracket);
    } else {
      const lastBracket = stack[stack.length - 1];
      if (conversion[bracket] === lastBracket) {
        stack.pop();
      } else {
        return corrupScores[bracket];
      }
    }
  }

  return 0;
}

export function getScoreForIncompleteLine(line: string[]): number {
  const stack: string[] = [];

  for (const bracket of line) {
    if (["(", "[", "{", "<"].includes(bracket)) {
      stack.push(bracket);
    } else {
      const lastBracket = stack[stack.length - 1];
      if (conversion[bracket] === lastBracket) {
        stack.pop();
      } else {
        return 0;
      }
    }
  }

  return stack.reduceRight((acc, cur) => {
    const score = completionScores[backConversion[cur]];
    return acc * 5 + score;
  }, 0);
}

const corrupScores: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const completionScores: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const conversion: { [key: string]: string } = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const backConversion: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
