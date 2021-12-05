export function part1(input: string): number {
  const directions = input.split(`\n`);
  const board: number[][] = [[0]];
  for (const direction of directions) {
    const [from, to] = direction.split(" -> ").map((point) => {
      return point.split(",").map(Number) as [number, number];
    });
    const numberOfRowsToAdd = Math.max(from[1], to[1]) - board.length + 1;
    const numberOfColumnsToAdd = Math.max(from[0], to[0]) - board[0].length + 1;

    if (numberOfRowsToAdd > 0) {
      add(board, "rows", numberOfRowsToAdd);
    }
    if (numberOfColumnsToAdd > 0) {
      add(board, "columns", numberOfColumnsToAdd);
    }

    drawLine(board, from, to);
  }

  return board.reduce(
    (acc, cur) =>
      acc + cur.reduce((total, num) => total + (num > 1 ? 1 : 0), 0),
    0
  );
}

function add(
  board: number[][],
  rowOrColumn: "rows" | "columns",
  number: number
) {
  for (let i = 0; i < number; i++) {
    if (rowOrColumn === "rows") {
      board.push([...Array(board[0].length)].fill(0));
    } else {
      board.forEach((row) => {
        row.push(0);
      });
    }
  }
}

export function part2(input: string): number {
  const directions = input.split(`\n`);
  const board: number[][] = [[0]];
  for (const direction of directions) {
    const [from, to] = direction
      .split(" -> ")
      .map((point) => point.split(",").map(Number) as [number, number]);

    const numberOfRowsToAdd = Math.max(from[1], to[1]) - board.length + 1;
    const numberOfColumnsToAdd = Math.max(from[0], to[0]) - board[0].length + 1;

    if (numberOfRowsToAdd > 0) {
      add(board, "rows", numberOfRowsToAdd);
    }
    if (numberOfColumnsToAdd > 0) {
      add(board, "columns", numberOfColumnsToAdd);
    }

    drawLine(board, from, to, true);
  }

  return board.reduce(
    (acc, cur) =>
      acc + cur.reduce((total, num) => total + (num > 1 ? 1 : 0), 0),
    0
  );
}

function drawLine(
  board: number[][],
  from: [number, number],
  to: [number, number],
  allowDiagonals?: boolean
) {
  if (from[0] !== to[0] && from[1] === to[1]) {
    const y = from[1];
    const [fromX, toX] = [from[0], to[0]].sort((a, b) => a - b);
    for (let x = fromX; x <= toX; x++) {
      board[y][x] += 1;
    }
  } else if (from[0] === to[0] && from[1] !== to[1]) {
    const x = from[0];
    const [fromY, toY] = [from[1], to[1]].sort((a, b) => a - b);
    for (let y = fromY; y <= toY; y++) {
      board[y][x] += 1;
    }
  } else if (allowDiagonals) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    for (let i = 0; i <= Math.abs(fromX - toX); i++) {
      const x = fromX < toX ? fromX + i : fromX - i;
      const y = fromY < toY ? fromY + i : fromY - i;
      board[y][x] += 1;
    }
  }
}

const pretty = ({
  from,
  to,
  numberOfColumnsToAdd,
  numberOfRowsToAdd,
  board,
}: any): string => {
  return `\n\n\n------ DRAWN A LINE -----------
from: ${from}
to: ${to}
numberOfColumnsToAdd: ${numberOfColumnsToAdd}
numberOfRowsToAdd: ${numberOfRowsToAdd}
board: 
${board.map((row: any) => row.join(" ")).join(`\n`)}
        `;
};
