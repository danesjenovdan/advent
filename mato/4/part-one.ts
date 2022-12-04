type Range = {
  start: number;
  end: number;
};

const rangesFullyOverlap = (range1: Range, range2: Range) =>
  (range1.start <= range2.start && range1.end >= range2.end) ||
  (range2.start <= range1.start && range2.end >= range1.end);

export default (lines: string[]) => {
  let overlappingCount = 0;
  lines.forEach((line) => {
    const [range1, range2] = line.split(",").map((range) => {
      const [start, end] = range.split("-").map(Number);
      return { start, end };
    });

    if (rangesFullyOverlap(range1, range2)) overlappingCount++;
  });

  return overlappingCount;
};
