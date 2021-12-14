// https://adventofcode.com/2021/day/14

export function part1(input: string): any {
  return getMostCommonAfterN(input, 10);
}
export function part2(input: string): any {
  return getMostCommonAfterN(input, 40);
}

export function getMostCommonAfterN(input: string, n: number): any {
  const [templateInput, insertionRulesInput] = input.split(`\n\n`);
  const insertionRules = createInsertionRulesObject(insertionRulesInput);
  const polymers = [...templateInput];
  const polymerCount = polymers.reduce(
    (acc: { [key: string]: number }, cur) => {
      acc[cur] = cur in acc ? acc[cur] + 1 : 1;
      return acc;
    },
    {}
  );
  console.log({ polymerCount });

  for (let i = 0; i < n; i++) {
    console.log(polymers.length);
    console.log(i);
    // loop over input and find insertions
    const currentPolymers = [...polymers];
    currentPolymers.forEach((item, i, arr) => {
      const nextItem = arr[i + 1];
      if (nextItem) {
        const insertion = insertionRules[`${item}${nextItem}`];
        polymers.splice(i * 2 + 1, 0, insertion);
        polymerCount[insertion] =
          insertion in polymerCount ? polymerCount[insertion] + 1 : 1;
      }
    });
  }
  const sorted = Object.values(polymerCount).sort((a, b) => a - b);
  return sorted[sorted.length - 1] - sorted[0];
}

function createInsertionRulesObject(input: string): { [key: string]: string } {
  return input.split(`\n`).reduce((acc: { [key: string]: string }, cur) => {
    const [pair, result] = cur.split(" -> ");
    acc[pair] = result;
    return acc;
  }, {});
}

// 0 => 1
// 1 => 3
// 2 => 5
// 3 => 7
// 4 => 9
