import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 10", () => {
  test("get currupt line score", () => {
    const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
    const lines = data.split(`\n`).map((line) => [...line]);
    const result = functions.getScoreForCorruptLine(lines[2]);
    expect(result).toBe(1197);
  });

  test("get line score 2", () => {
    const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
    const lines = data.split(`\n`).map((line) => [...line]);
    const result = functions.getScoreForIncompleteLine(lines[lines.length - 1]);
    expect(result).toBe(294);
  });

  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(26397);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(216297);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(288957);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(2165057169);
    });
  });
});
