import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe.skip("day x", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("expected");
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("part 1 result");
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("expected");
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe("part 2 result");
    });
  });
});
