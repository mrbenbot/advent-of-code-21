import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 16", () => {
  describe("part 1", () => {
    test("sample data literal", () => {
      const result = functions.part1("D2FE28");
      expect(result).toBe(6);
    });

    test("sample data a", () => {
      const result = functions.part1("8A004A801A8002F478");
      expect(result).toBe(16);
    });

    test("sample data b", () => {
      const result = functions.part1("620080001611562C8802118E34");
      expect(result).toBe(12);
    });

    test("sample data c", () => {
      const result = functions.part1("C0015000016115A2E0802F182340");
      expect(result).toBe(23);
    });

    test("sample data d", () => {
      const result = functions.part1("A0016C880162017C3686B18A3D4780");
      expect(result).toBe(31);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).not.toBe(11);
      expect(result).toBe(821);
    });
  });

  describe("part 2", () => {
    test("sum 1 + 2", () => {
      const result = functions.part2("C200B40A82");
      expect(result).toBe(3);
    });

    test("product 6 * 9 ", () => {
      const result = functions.part2("04005AC33890");
      expect(result).toBe(54);
    });

    test("max 7 8 9", () => {
      const result = functions.part2("CE00C43D881120");
      expect(result).toBe(9);
    });

    test("less than ( 1 < 15 )", () => {
      const result = functions.part2("D8005AC2A8F0");
      expect(result).toBe(1);
    });

    test("greater than ( 5 < 15 )", () => {
      const result = functions.part2("D8005AC2A8F0");
      expect(result).toBe(1);
    });

    test("equal than ( 5 !== 15 )", () => {
      const result = functions.part2("9C005AC2F8F0");
      expect(result).toBe(0);
    });

    test("1 + 3 = 2 * 2", () => {
      const result = functions.part2("9C0141080250320F1802104A08");
      expect(result).toBe(1);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).not.toBe(41885533);
      expect(result).not.toBe(1003760638485);
      expect(result).toBe(2056021084691);
    });
  });
});
