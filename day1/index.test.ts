import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 1", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");

      const result = functions.countIncreases(data);
      expect(result).toBe(7);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.countIncreases(data);
      expect(result).toBe(1502);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "./sample.txt"), "utf-8");
      const result = functions.countThreeWindowIncreases4(data);
      expect(result).toBe(5);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "./actual.txt"), "utf-8");
      const result = functions.countThreeWindowIncreases4(data);

      expect(result).toBe(1538);
    });
  });
});
