import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 3", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(198);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(775304);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part2OneLine(data);
      expect(result).toBe(230);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part2OneLine(data);
      expect(result).toBe(1370737);
    });
  });
});
