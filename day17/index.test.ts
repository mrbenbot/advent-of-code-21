import * as functions from ".";

describe("day x", () => {
  describe("part 1", () => {
    test("target area: x=20..30, y=-10..-5", () => {
      const target = { x1: 20, x2: 30, y1: -10, y2: -5 };
      const result = functions.part1(target);
      expect(result).toBe(45);
    });

    test("target area: x=235..259, y=-118..-62", () => {
      const target = { x1: 235, x2: 259, y1: -118, y2: -62 };
      const result = functions.part1(target);
      expect(result).not.toBe(57);
      expect(result).not.toBe(1653);
      expect(result).toBe(6903);
    });
  });

  describe("part 2", () => {
    test("target area: x=20..30, y=-10..-5", () => {
      const target = { x1: 20, x2: 30, y1: -10, y2: -5 };
      const result = functions.part2(target);
      expect(result).toBe(112);
    });

    test("target area: x=235..259, y=-118..-62", () => {
      const target = { x1: 235, x2: 259, y1: -118, y2: -62 };
      const result = functions.part2(target);
      expect(result).toBe(2351);
    });
  });
});
