import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-one.ts";
Deno.test("solve", () => {
  assertEquals(
    solve(["bvwbjplbgvbhsrlpgdmjqwftvncz"]),
    5,
  );
  assertEquals(
    solve(["nppdvjthqldpwncqszvftbrmjlhg"]),
    6,
  );
  assertEquals(
    solve(["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"]),
    10,
  );
  assertEquals(
    solve(["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"]),
    11,
  );
  assertEquals(
    solve(["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdf"]),
    33,
  );
});
