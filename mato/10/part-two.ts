const SCREEN_WIDTH = 40;

class CPU {
  currentCycle = 0;
  x = 1;
  pixels: boolean[][] = [];

  constructor() {
    for (let i = 0; i < 6; i++) {
      this.pixels[i] = Array(SCREEN_WIDTH).fill(false, 0);
    }
  }

  moveCycle() {
    this.drawPixel();
    this.currentCycle++;
  }

  drawPixel() {
    const row = Math.floor(this.currentCycle / SCREEN_WIDTH);
    const column = this.currentCycle % SCREEN_WIDTH;
    const pixelLit = Math.abs(column - this.x) <= 1;

    this.pixels[row][column] = pixelLit;
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

  render() {
    return this.pixels.map((row) => row.map((lit) => lit ? "#" : ".").join(""))
      .join("\n");
  }
}

export default (lines: string[]) => {
  const cpu = new CPU();

  lines.forEach((line) => {
    cpu.execute(line);
  });

  return cpu.render();
};
