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
