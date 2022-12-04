type Range = {
  start: number;
  end: number;
};

const rangesPartiallyOverlap = (range1: Range, range2: Range) => {
  const noOverlap = range1.end < range2.start || range2.end < range1.start;
  return !noOverlap;
};

export default (lines: string[]) => {
  let overlappingCount = 0;
  lines.forEach((line) => {
    const [range1, range2] = line.split(",").map((range) => {
      const [start, end] = range.split("-").map(Number);
      return { start, end };
    });

    if (rangesPartiallyOverlap(range1, range2)) overlappingCount++;
  });

  return overlappingCount;
};
