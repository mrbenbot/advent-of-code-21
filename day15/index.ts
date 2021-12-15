// https://adventofcode.com/2021/day/15

export function part1(input: string): any {
  const graph: Node[][] = input
    .split(`\n`)
    .map((row) => [...row].map((num) => createNode(Number(num))));

  const start = { x: 0, y: 0 };
  const end = { x: graph[0].length - 1, y: graph.length - 1 };
  return getLowestRiskPathTotal(graph, start, end);
}

export function part2(input: string): any {
  const graph: Node[][] = input
    .split(`\n`)
    .map((row) => [...row].map((num) => createNode(Number(num))));

  const bigGraph = tileAndIncrement(graph, 5);
  const start = { x: 0, y: 0 };
  const end = { x: bigGraph[0].length - 1, y: bigGraph.length - 1 };
  return getLowestRiskPathTotal(bigGraph, start, end);
}

function getLowestRiskPathTotal(graph: Node[][], start: Point, end: Point) {
  graph[start.y][start.x].weight = 0;

  const queue = [start];

  while (queue.length) {
    const currentPoint = queue.shift() as Point;
    const currentNode = nodeAtPoint(graph, currentPoint) as Node;
    currentNode.visited = true;

    if (isSamePoint(currentPoint, end)) {
      return currentNode.weight;
    }

    for (const transform of directionOptions) {
      const nextPoint = transform(currentPoint);
      const nextNode = nodeAtPoint(graph, nextPoint);

      if (!nextNode) continue;

      nextNode.weight = Math.min(
        currentNode.weight + nextNode.cost,
        nextNode.weight
      );

      if (!nextNode.visited) {
        const currentIndex = queue.findIndex((p) => isSamePoint(p, nextPoint));

        if (currentIndex !== -1) {
          queue.splice(currentIndex, 1);
        }

        const insertionIndex = queue.findIndex(
          (point) =>
            nodeAtPoint(graph, point)!.weight >
            nodeAtPoint(graph, nextPoint)!.weight
        );

        queue.splice(insertionIndex, 0, nextPoint);
      }
    }
  }
}

function tileAndIncrement(graph: Node[][], factor: number): Node[][] {
  const newGraph: Node[][] = [[]];

  for (let i = 0; i < factor; i++) {
    for (let y = 0; y < graph.length; y++) {
      if (!newGraph[y]) {
        newGraph[y] = [];
      }
      newGraph[y].push(
        ...graph[y].map(({ cost }) => createNode(incrementByFactor(cost, i)))
      );
    }
  }
  for (let i = 1; i < factor; i++) {
    for (let y = 0; y < graph.length; y++) {
      newGraph.push(
        newGraph[y].map(({ cost }) => createNode(incrementByFactor(cost, i)))
      );
    }
  }

  return newGraph;
}

function createNode(number: number) {
  return {
    cost: number,
    weight: Infinity,
    visited: false,
  };
}

function nodeAtPoint(graph: Node[][], point: Point): Node | null {
  return graph[point.y]?.[point.x] ?? null;
}
function isSamePoint(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}
function incrementByFactor(number: number, factor: number): number {
  return ((number + (factor - 1)) % 9) + 1;
}

type Point = { x: number; y: number };

type Node = {
  cost: number;
  weight: number;
  visited: boolean;
};

const directions: { [key: string]: (point: Point) => Point } = {
  up: ({ y, x }) => ({ y: y - 1, x }),
  down: ({ y, x }) => ({ y: y + 1, x }),
  left: ({ y, x }) => ({ y, x: x - 1 }),
  right: ({ y, x }) => ({ y, x: x + 1 }),
};

const directionOptions = Object.values(directions);
