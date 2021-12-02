import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day x", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part1_3(data);
      expect(result).toBe(150);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part1_3(data);
      expect(result).toBe(2036120);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(900);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(2015547716);
    });
  });
});
