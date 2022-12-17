import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(
    solve([
      "498,4 -> 498,6 -> 496,6",
      "503,4 -> 502,4 -> 502,9 -> 494,9",
    ]),
    93,
  );
});
