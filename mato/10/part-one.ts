class CPU {
  currentCycle = 0;
  x = 1;
  signalStrengthLog: number[] = [];

  moveCycle() {
    this.currentCycle++;
    if (this.currentCycle % 40 === 20) {
      this.logSignalStrength();
    }
  }

  logSignalStrength() {
    this.signalStrengthLog.push(this.currentCycle * this.x);
  }

  execute(command: string) {
    const splitCommand = command.split(" ");

    if (splitCommand[0] === "noop") {
      this.moveCycle();
    } else if (splitCommand[0] === "addx") {
      this.moveCycle();
      this.moveCycle();
      const value = Number(splitCommand[1]);
      this.x += value;
    }
  }
}

export default (lines: string[]) => {
  const cpu = new CPU();

  lines.forEach((line) => {
    cpu.execute(line);
  });

  return cpu.signalStrengthLog.reduce(
    (sum, signalStrength) => sum + signalStrength,
    0,
  );
};
