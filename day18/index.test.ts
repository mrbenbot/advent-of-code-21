import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 18", () => {
  describe("part 1", () => {
    describe("snailfishReduce", () => {
      test("sample data a", () => {
        const input = `[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]`;
        const output = `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`;
        const result = functions.snailfishReduce(JSON.parse(input));
        expect(result).toEqual(JSON.parse(output));
      });

      test("sample data B", () => {
        const input = `[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]`;
        const output =
          "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]";

        const result = functions.snailfishReduce(JSON.parse(input));
        expect(result).toEqual(JSON.parse(output));
      });

      test("sample data c", () => {
        const input = `[[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]],[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]]`;
        const output =
          "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]";

        const result = functions.snailfishReduce(JSON.parse(input));
        expect(result).toEqual(JSON.parse(output));
      });
    });

    describe("getMagnitude", () => {
      test("[[1,2],[[3,4],5]]", () => {
        const input = "[[1,2],[[3,4],5]]";
        const result = functions.getMagnitude(JSON.parse(input));
        expect(result).toEqual(143);
      });
      test("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]", () => {
        const input = "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]";
        const result = functions.getMagnitude(JSON.parse(input));
        expect(result).toEqual(1384);
      });
      test("[[[[1,1],[2,2]],[3,3]],[4,4]]", () => {
        const input = "[[[[1,1],[2,2]],[3,3]],[4,4]]";
        const result = functions.getMagnitude(JSON.parse(input));
        expect(result).toEqual(445);
      });
      test("[[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]", () => {
        const input =
          "[[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]";
        const result = functions.getMagnitude(JSON.parse(input));
        expect(result).toEqual(3993);
      });
    });

    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(4140);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(4235);
    });
  });

  describe("part 2", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(3993);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(4659);
    });
  });
});
