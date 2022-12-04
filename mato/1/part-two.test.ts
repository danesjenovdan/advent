import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";

Deno.test("solve", () => {
  assertEquals(
    solve([
      "1000",
      "2000",
      "3000",
      "",
      "4000",
      "",
      "5000",
      "6000",
      "",
      "7000",
      "8000",
      "9000",
      "",
      "10000",
    ]),
    45000,
  );

  assertEquals(solve(["10000", "", "1000", "", "2000", "", "3000"]), 15000);
});
