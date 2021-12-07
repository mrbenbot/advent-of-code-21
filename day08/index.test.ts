import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 8", () => {
  describe("part 1", () => {
    test.only("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("expected");
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("part_1_result");
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe("expected");
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe("part_2_result");
    });
  });
});
