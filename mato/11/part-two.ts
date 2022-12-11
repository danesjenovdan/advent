const monkeys: Monkey[] = [];

class Monkey {
  items: number[];
  worryCommand: string;
  testDivisor: number;
  successDestination: number;
  failureDestination: number;
  inspectionCount = 0;

  constructor(monkeyDefinition: string[]) {
    this.items = monkeyDefinition[1]
      .replace("  Starting items: ", "")
      .split(", ")
      .map(Number);
    this.worryCommand = monkeyDefinition[2].replace("  Operation: new = ", "");
    this.testDivisor = Number(
      monkeyDefinition[3].replace("  Test: divisible by ", ""),
    );
    this.successDestination = Number(
      monkeyDefinition[4].replace("    If true: throw to monkey ", ""),
    );
    this.failureDestination = Number(
      monkeyDefinition[5].replace("    If false: throw to monkey ", ""),
    );
    monkeys.push(this);
  }

  inspectItems() {
    for (let i = 0; i < this.items.length; i++) {
      this.inspectItem(this.items[i]);
    }
    this.items = [];
  }

  inspectItem(item: number) {
    this.inspectionCount++;
    let worryLevel = this.changeWorryLevel(item);
    const destination = worryLevel % this.testDivisor === 0
      ? this.successDestination
      : this.failureDestination;
    monkeys[destination].catchItem(worryLevel);
  }

  changeWorryLevel(old: number) {
    return eval(this.worryCommand);
  }

  catchItem(item: number) {
    this.items.push(item);
  }
}

export default (lines: string[]) => {
  const monkeyCount = (lines.length + 1) / 7;

  for (let i = 0; i < monkeyCount; i++) {
    const start = i * 7;
    const end = start + 6;
    new Monkey(lines.slice(start, end));
  }

  // Assuming they're all primes
  const LCM = monkeys.reduce(
    (lcm, monkey) => lcm = monkey.testDivisor * lcm,
    1,
  );

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      monkey.items = monkey.items.map((item) => item % LCM);
      monkey.inspectItems();
    });
  }

  const inspections = monkeys.map((monkey) => monkey.inspectionCount);

  inspections.sort((a, b) => b - a);

  return inspections[0] * inspections[1];
};
