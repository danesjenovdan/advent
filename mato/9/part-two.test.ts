import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(
    solve(["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"]),
    1,
  );
  assertEquals(
    solve(["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"]),
    36,
  );
});
