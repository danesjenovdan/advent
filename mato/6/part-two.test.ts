import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(
    solve(["mjqjpqmgbljsphdztnvjfqwrcgsmlb"]),
    19,
  );
  assertEquals(
    solve(["bvwbjplbgvbhsrlpgdmjqwftvncz"]),
    23,
  );
  assertEquals(
    solve(["nppdvjthqldpwncqszvftbrmjlhg"]),
    23,
  );
  assertEquals(
    solve(["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"]),
    29,
  );
  assertEquals(
    solve(["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"]),
    26,
  );
});
