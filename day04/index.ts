// https://adventofcode.com/2021/day/4

export function part1(input: string): number {
  const [numbers, ...boards] = input.split(`\n\n`);
  const boardMatixs = boards.map((board) =>
    board
      .split(`\n`)
      .map((line) => line.split(/\s/).filter((number) => number !== ""))
  );

  for (const number of numbers.split(",")) {
    for (const board of boardMatixs) {
      const y = board.findIndex((line) => line.includes(number));
      if (y >= 0) {
        const x = board[y].findIndex((num) => num === number);
        board[y][x] = "x";
      }

      if (isBoardBingo(board)) {
        return sumBoard(board) * Number(number);
      }
    }
  }
  throw new Error("no winners");
}

function sumBoard(board: string[][]) {
  return board.reduce((total, line) => {
    return (
      total +
      line.reduce(
        (lineTotal, number) =>
          number === "x" ? lineTotal : lineTotal + Number(number),
        0
      )
    );
  }, 0);
}

function isLineBingo(line: string[]) {
  return line.every((number) => number == "x");
}

function isBoardBingo(board: string[][]): boolean {
  return (
    board.some(isLineBingo) ||
    board[0]
      .map((_, x) => {
        return board[0].map((_, y) => board[y][x]);
      })
      .some(isLineBingo)
  );
}

export function part2(input: string): number {
  const [numbers, ...boards] = input.split(`\n\n`);
  const boardMatrices = boards.map((board) =>
    board
      .split(`\n`)
      .map((line) => line.split(/\s/).filter((number) => number !== ""))
  );

  const indexesThatHaveWon: number[] = [];

  for (const number of numbers.split(",")) {
    for (let i = 0; i < boardMatrices.length; i++) {
      if (indexesThatHaveWon.includes(i)) continue;

      const board = boardMatrices[i];

      const y = board.findIndex((line) => line.includes(number));
      if (y >= 0) {
        const x = board[y].findIndex((num) => num === number);
        board[y][x] = "x";
      }

      if (isBoardBingo(board)) {
        indexesThatHaveWon.push(i);
        if (indexesThatHaveWon.length === boards.length) {
          return sumBoard(board) * Number(number);
        }
      }
    }
  }
  throw new Error("no winners");
}
