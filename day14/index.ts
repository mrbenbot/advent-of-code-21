// https://adventofcode.com/2021/day/14

export function part1(input: string): number {
  const [templateInput, insertionRulesInput] = input.split(`\n\n`);
  const rules = createRulesObject(insertionRulesInput);
  return getResultForN([...templateInput], rules, 10);
}

export function part2(input: string): number {
  const [templateInput, insertionRulesInput] = input.split(`\n\n`);
  const rules = createRulesObject(insertionRulesInput);
  return getResultForN([...templateInput], rules, 40);
}

export function getResultForN(
  polymers: string[],
  rules: RuleMap,
  n: number
): number {
  let pairs = polymers.reduce((acc: CountMap, cur, i, arr) => {
    const next = arr[i + 1];
    if (next) {
      incrementKey(acc, `${cur}${next}`, 1);
    }
    return acc;
  }, {});

  for (let i = 0; i < n; i++) {
    pairs = Object.entries(pairs).reduce((acc: CountMap, [pair, count]) => {
      const addition = rules[pair];
      const [a, b] = pair;
      incrementKey(acc, `${a}${addition}`, count);
      incrementKey(acc, `${addition}${b}`, count);
      return acc;
    }, {});
  }

  const [first, ...rest] = Object.values(getTotals(pairs, polymers[0])).sort(
    (a, b) => a - b
  );

  return rest[rest.length - 1] - first;
}

function getTotals(pairs: CountMap, first: string): CountMap {
  const totals = Object.entries(pairs).reduce(
    (acc: CountMap, [pair, total]) => {
      incrementKey(acc, pair[1], total);
      return acc;
    },
    {}
  );
  totals[first] += 1;
  return totals;
}

function createRulesObject(input: string): RuleMap {
  return input.split(`\n`).reduce((acc: RuleMap, cur) => {
    const [pair, result] = cur.split(" -> ");
    acc[pair] = result;
    return acc;
  }, {});
}

function incrementKey(obj: CountMap, key: string, amount: number): void {
  obj[key] = key in obj ? obj[key] + amount : amount;
}

type CountMap = {
  [key: string]: number;
};

type RuleMap = {
  [key: string]: string;
};
