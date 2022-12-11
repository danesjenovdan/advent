import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const inputFile = fileURLToPath(
  path.join(path.dirname(import.meta.url), "input.txt")
);
const input = fs.readFileSync(inputFile, "utf8");

function getInitialMonkeys() {
  return input
    .trim()
    .split("\n\n")
    .map((monkeyInput) => {
      const lines = monkeyInput.split("\n").map((l) => l.trim());

      return {
        items: lines[1]
          .split(": ")[1]
          .split(", ")
          .map((n) => BigInt(n)),
        op: lines[2].split(": ")[1],
        test_div: BigInt(lines[3].split("divisible by ")[1]),
        test_true: Number(lines[4].split("throw to monkey ")[1]),
        test_false: Number(lines[5].split("throw to monkey ")[1]),
        inspections: 0,
      };
    });
}

const monkeys = getInitialMonkeys();

function evalOp(old, op) {
  var new_;
  eval(op.replaceAll("new", "new_").replace(/(\d+)/g, "$1n"));
  return new_;
}

function completeRound(monkeys, divideWorry) {
  for (const monkey of monkeys) {
    monkey.items = monkey.items.map((item) => evalOp(item, monkey.op));
    if (divideWorry) {
      monkey.items = monkey.items.map((item) => item / 3n);
    }

    // monkey.inspections += BigInt(monkey.items.length);
    monkey.inspections += monkey.items.length;

    for (const item of monkey.items) {
      if (item % monkey.test_div === 0n) {
        monkeys[monkey.test_true].items.push(item);
      } else {
        monkeys[monkey.test_false].items.push(item);
      }
    }

    monkey.items = [];
  }
}

for (let i = 0; i < 20; i++) {
  completeRound(monkeys, true);
}

const monkeyInspections = monkeys
  .map((m) => m.inspections)
  .slice()
  .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

const topInspections = monkeyInspections.slice(0, 2);
const monkeyBusiness = topInspections[0] * topInspections[1];

console.log("part 1:", monkeyBusiness);

const monkeys2 = getInitialMonkeys();

// for (let i = 0; i < 1000; i++) {
//   completeRound(monkeys2, false);
//   console.log(i);
// }

// // console.log(monkeys2);

// const monkeyInspections2 = monkeys2
//   .map((m) => m.inspections)
//   .slice()
//   .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

// console.log(monkeyInspections2);

// console.log("part 2:", part2);
