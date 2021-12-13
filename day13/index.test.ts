import { readFileSync } from "fs";
import { resolve } from "path";
import * as functions from ".";

describe("day 13", () => {
  describe("part 1", () => {
    test("sample data", () => {
      const data = readFileSync(resolve(__dirname, "sample.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(17);
    });

    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part1(data);
      expect(result).toBe(621);
    });
  });

  describe("part 2", () => {
    test("actual data", () => {
      const data = readFileSync(resolve(__dirname, "actual.txt"), "utf-8");
      const result = functions.part2(data);
      expect(result).toBe(
        `#  # #  # #  #   ##  ##   ##    ## ####\n#  # # #  #  #    # #  # #  #    #    #\n#### ##   #  #    # #    #  #    #   # \n#  # # #  #  #    # # ## ####    #  #  \n#  # # #  #  # #  # #  # #  # #  # #   \n#  # #  #  ##   ##   ### #  #  ##  ####`
      );
    });
  });
});
