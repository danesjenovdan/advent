const splitFile = (lines: string[]): [string[], string[], number] => {
  const border = lines.findIndex((line) => line === "");

  const stacks = lines.slice(0, border - 1);
  const stackCount = lines[border - 1].trim().split("   ").length;
  const instructions = lines.slice(border + 1);

  return [stacks, instructions, stackCount];
};

const parseStacks = (lines: string[], stackCount: number): string[][] => {
  let stacks: string[][] = [];

  for (let i = 0; i < stackCount; i++) {
    stacks[i] = lines.map((line) => line[4 * i + 1]).reverse();
  }

  stacks = stacks.map((stack) => stack.filter((i) => i && i.trim()));

  return stacks;
};

type Instruction = {
  count: number;
  source: number;
  destination: number;
};

const parseInstructions = (lines: string[]): Instruction[] => {
  const regex = /move (\d+) from (\d+) to (\d+)/;
  return lines.map((line) => {
    const [_, count, source, destination] = line.match(regex)!.map(Number);
    return { count, source, destination };
  });
};

export default (lines: string[]) => {
  const [stackLines, instructionLines, stackCount] = splitFile(lines);

  const stacks = parseStacks(stackLines, stackCount);
  const instructions = parseInstructions(instructionLines);

  instructions.forEach((instruction) => {
    const s = instruction.source - 1;
    const d = instruction.destination - 1;
    stacks[d] = [...stacks[d], ...stacks[s].slice(-1 * instruction.count)];
    stacks[s] = stacks[s].slice(0, -1 * instruction.count);
  });

  const result = stacks.map((stack) => stack.pop()).join("");

  return result;
};
