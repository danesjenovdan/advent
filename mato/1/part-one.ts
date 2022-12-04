export default (lines: string[]) => {
  const sums: number[] = [];
  let currentPosition = 0;
  lines.forEach((line) => {
    if (line === "") {
      currentPosition++;
    } else {
      const num = parseInt(line);
      sums[currentPosition] = (sums[currentPosition] ?? 0) + num;
    }
  });

  return Math.max(...sums);
};
