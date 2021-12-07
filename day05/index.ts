export function part1(input: string): number {
  return getHeatMapTotal(input, false);
}

export function part2(input: string): number {
  return getHeatMapTotal(input, true);
}

function getHeatMapTotal(input: string, includeDiagonals = false): number {
  const lines = input.split(`\n`);
  const heatMap: number[][] = [[0]];

  for (const line of lines) {
    const [from, to] = line.split(" -> ").map((point) => {
      return point.split(",").map(Number) as [number, number];
    });
    const numberOfRowsToAdd = Math.max(from[1], to[1]) - heatMap.length + 1;
    const numberOfColumnsToAdd =
      Math.max(from[0], to[0]) - heatMap[0].length + 1;

    if (numberOfRowsToAdd > 0) {
      add(heatMap, "rows", numberOfRowsToAdd);
    }
    if (numberOfColumnsToAdd > 0) {
      add(heatMap, "columns", numberOfColumnsToAdd);
    }

    drawLine(heatMap, from, to, includeDiagonals);
  }

  return heatMap.reduce(
    (acc, cur) =>
      acc + cur.reduce((total, num) => total + (num > 1 ? 1 : 0), 0),
    0
  );
}

function add(
  board: number[][],
  rowsOrColumns: "rows" | "columns",
  number: number
) {
  for (let i = 0; i < number; i++) {
    if (rowsOrColumns === "rows") {
      board.push(Array(board[0].length).fill(0));
    } else {
      board.forEach((row) => {
        row.push(0);
      });
    }
  }
}

function drawLine(
  board: number[][],
  from: [number, number],
  to: [number, number],
  includeDiagonals?: boolean
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
  } else if (includeDiagonals) {
    const [fromX, fromY] = from;
    const [toX, toY] = to;
    for (let i = 0; i <= Math.abs(fromX - toX); i++) {
      const x = fromX < toX ? fromX + i : fromX - i;
      const y = fromY < toY ? fromY + i : fromY - i;
      board[y][x] += 1;
    }
  }
}
