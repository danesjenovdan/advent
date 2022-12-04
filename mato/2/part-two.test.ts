import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(
    solve([
      "A Y",
      "B X",
      "C Z",
    ]),
    12,
  );
});
