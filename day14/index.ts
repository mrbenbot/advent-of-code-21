// https://adventofcode.com/2021/day/14

export function part1(input: string): number {
  const [templateInput, insertionRulesInput] = input.split(`\n\n`);
  const rules = createInsertionRulesObject(insertionRulesInput);
  return getResultForN([...templateInput], rules, 10);
}

export function part2(input: string): number {
  const [templateInput, insertionRulesInput] = input.split(`\n\n`);
  const rules = createInsertionRulesObject(insertionRulesInput);
  return getResultForN([...templateInput], rules, 40);
}

export function getResultForN(
  polymers: string[],
  rules: { [key: string]: string },
  n: number
): number {
  let pairs = polymers.reduce((acc: PairMap, cur, i, arr) => {
    const next = arr[i + 1];
    if (next) {
      const pair = `${cur}${next}`;
      acc[pair] = acc[pair] ? acc[pair] + 1 : 1;
    }

    return acc;
  }, {});

  for (let i = 0; i < n; i++) {
    pairs = Object.entries(pairs).reduce((acc: PairMap, [pair, number]) => {
      const addition = rules[pair];
      const [a, b] = pair;

      const pairA = `${a}${addition}`;
      acc[pairA] = acc[pairA] ? acc[pairA] + number : number;

      const pairB = `${addition}${b}`;
      acc[pairB] = acc[pairB] ? acc[pairB] + number : number;

      return acc;
    }, {});
  }

  const results = Object.values(getTotals(pairs, polymers[0])).sort(
    (a, b) => a - b
  );

  return results[results.length - 1] - results[0];
}

function getTotals(pairs: PairMap, first: string) {
  const totals = Object.entries(pairs).reduce((acc: PairMap, [pair, total]) => {
    const letter = pair[1];
    acc[letter] = acc[letter] ? acc[letter] + total : total;
    return acc;
  }, {});

  totals[first] += 1;
  return totals;
}

function createInsertionRulesObject(input: string): { [key: string]: string } {
  return input.split(`\n`).reduce((acc: { [key: string]: string }, cur) => {
    const [pair, result] = cur.split(" -> ");
    acc[pair] = result;
    return acc;
  }, {});
}

type PairMap = {
  [key: string]: number;
};
