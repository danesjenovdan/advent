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

  sums.sort((a, b) => b - a);
  const biggest = sums.slice(0, 3);

  return biggest[0] + biggest[1] + biggest[2];
};
