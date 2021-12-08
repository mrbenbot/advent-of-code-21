import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 8", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(26);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(365);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(61229);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(975706);
    });
  });
});
