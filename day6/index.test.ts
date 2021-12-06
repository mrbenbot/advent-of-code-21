import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day x", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(5934);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(362346);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(26984457539);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(1639643057051);
    });
  });

  // describe("calculateLanternFish", () => {
  //   test.only("sample data", () => {
  //     const result = functions.calculateFishRecur([6], 21);
  //     expect(result).toBe([]);
  //   });
  // });
});
