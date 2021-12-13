import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 12", () => {
  describe("part 1", () => {
    test("sample a data", () => {
      const data = readFileSync(resolve(__dirname, "sample-a.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(10);
    });
    test("sample b data", () => {
      const data = readFileSync(resolve(__dirname, "sample-b.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(19);
    });
    test("sample c data", () => {
      const data = readFileSync(resolve(__dirname, "sample-c.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(226);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(5576);
    });
  });

  describe("part 2", () => {
    test("sample a data", () => {
      const data = readFileSync(resolve(__dirname, "sample-a.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(36);
    });
    test("sample b data", () => {
      const data = readFileSync(resolve(__dirname, "sample-b.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(103);
    });
    test("sample c data", () => {
      const data = readFileSync(resolve(__dirname, "sample-c.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(3509);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(152837);
    });
  });
});
