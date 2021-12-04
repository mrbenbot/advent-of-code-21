import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 4", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(4512);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(25023);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(1924);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(2634);
    });
  });
});
