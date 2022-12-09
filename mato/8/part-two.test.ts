import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(solve(["30373", "25512", "65332", "33549", "35390"]), 8);
});
