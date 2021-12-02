export function part1(input: string): number {
  const [horizontal, vertical] = input.split(`\n`).reduce(
    ([horizontal, vertical], cur) => {
      const [direction, value] = cur.split(" ");
      const units = Number(value);

      switch (direction) {
        case "forward":
          return [horizontal + units, vertical];
        case "up":
          return [horizontal, vertical - units];
        case "down":
          return [horizontal, vertical + units];
        default:
          return [horizontal, vertical];
      }
    },
    [0, 0]
  );
  return horizontal * vertical;
}

export function part1_2(input: string): number {
  const array = input.split(`\n`);

  let vertical = 0;
  let horizontal = 0;

  for (const line of array) {
    const [direction, value] = line.split(" ");
    const units = Number(value);

    switch (direction) {
      case "forward":
        horizontal += units;
        break;
      case "up":
        vertical -= units;
        break;
      case "down":
        vertical += units;
        break;
      default:
        break;
    }
  }

  return horizontal * vertical;
}

type DirectionType = "forward" | "up" | "down";

export function part1_3(input: string): number {
  const { forward, up, down } = input.split(`\n`).reduce(
    (state, cur) => ({
      ...state,
      [cur.slice(0, cur.indexOf(" "))]:
        state[cur.slice(0, cur.indexOf(" ")) as DirectionType] +
        Number(cur.slice(cur.indexOf(" ") + 1)),
    }),
    { forward: 0, up: 0, down: 0 }
  );
  return forward * (-up + +down);
}

export function part2(input: string): number {
  const [horizontal, vertical] = input.split(`\n`).reduce(
    ([horizontal, vertical, aim], cur) => {
      const [direction, value] = cur.split(" ");
      const units = Number(value);

      switch (direction) {
        case "forward":
          return [horizontal + units, vertical + aim * units, aim];
        case "up":
          return [horizontal, vertical, aim - units];
        case "down":
          return [horizontal, vertical, aim + units];
        default:
          return [horizontal, vertical, aim];
      }
    },
    [0, 0, 0]
  );
  return horizontal * vertical;
}

enum Direction {
  Up = "up",
  Down = "down",
  Forward = "forward",
}

type UpdateFunctionMap = {
  [key in Direction]: (
    h: number,
    v: number,
    a: number,
    u: number
  ) => [number, number, number];
};

export function part2_1(input: string): number {
  return input
    .split(`\n`)
    .reduce(
      (acc: [number, number, number], cur) =>
        ((
          {
            forward: (h, v, a, u) => [h + u, v + a * u, a],
            down: (h, v, a, u) => [h, v, a + u],
            up: (h, v, a, u) => [h, v, a - u],
          } as UpdateFunctionMap
        )[cur.split(" ")[0] as Direction](...acc, Number(cur.split(" ")[1]))),
      [0, 0, 0]
    )
    .slice(0, 2)
    .reduce((a, c) => a * c, 1);
}
