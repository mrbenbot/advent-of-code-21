// https://adventofcode.com/2021/day/12

export function part1(input: string): any {
  const connections = createCaveMap(input.split(`\n`));
  return countCavePaths(connections, connections["start"], [], true);
}

export function part2(input: string) {
  const connections = createCaveMap(input.split(`\n`));
  return countCavePaths(connections, connections["start"]);
}

function createCaveMap(connectionlines: string[]): CaveMap {
  return connectionlines.reduce((connections: CaveMap, connection) => {
    const [a, b] = connection.split("-");
    mapConnection(connections, a, b);
    mapConnection(connections, b, a);
    return connections;
  }, {});
}

const mapConnection = (connections: CaveMap, a: string, b: string) => {
  const connectObj = a in connections ? connections[a] : new Cave(a);
  connectObj.connections.push(b);
  connections[a] = connectObj;
};

function countCavePaths(
  map: CaveMap,
  cave: Cave,
  currentPath: string[] = [],
  hasVisitedSmallCaveTwice = false
): number {
  if (cave.isSmall && currentPath.includes(cave.name)) {
    if (hasVisitedSmallCaveTwice || cave.neverTwice) {
      return 0;
    } else {
      hasVisitedSmallCaveTwice = true;
    }
  }

  const nextPath = [...currentPath, cave.name];

  return cave.connections.reduce((pathCount, caveName) => {
    if (caveName === "end") {
      return pathCount + 1;
    }
    return (
      pathCount +
      countCavePaths(map, map[caveName], nextPath, hasVisitedSmallCaveTwice)
    );
  }, 0);
}

class Cave {
  connections: string[];
  isSmall: boolean;
  name: string;
  neverTwice: boolean;
  constructor(name: string) {
    this.name = name;
    this.connections = [];
    this.isSmall = name.toLowerCase() === name;
    this.neverTwice = ["start", "end"].includes(name);
  }
}

type CaveMap = {
  [key: string]: Cave;
};
