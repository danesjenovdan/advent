export default (lines: string[]) => {
  const GRID_SIZE = lines.length;

  const grid = lines.map((line) => line.split("").map(Number));

  const getScenicScore = (rowIndex: number, columnIndex: number) => {
    if (
      rowIndex === 0 ||
      rowIndex === GRID_SIZE - 1 ||
      columnIndex === 0 ||
      columnIndex === GRID_SIZE - 1
    ) {
      return 0;
    }

    const value = grid[rowIndex][columnIndex];

    let visibleTop = 0;
    for (let i = rowIndex - 1; i >= 0; i--) {
      visibleTop++;
      if (grid[i][columnIndex] >= value) break;
    }
    let visibleBottom = 0;
    for (let i = rowIndex + 1; i < GRID_SIZE; i++) {
      visibleBottom++;
      if (grid[i][columnIndex] >= value) break;
    }
    let visibleLeft = 0;
    for (let i = columnIndex - 1; i >= 0; i--) {
      visibleLeft++;
      if (grid[rowIndex][i] >= value) break;
    }
    let visibleRight = 0;
    for (let i = columnIndex + 1; i < GRID_SIZE; i++) {
      visibleRight++;
      if (grid[rowIndex][i] >= value) break;
    }

    return visibleTop * visibleBottom * visibleLeft * visibleRight;
  };

  let highestScenicScore = 0;

  grid.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      highestScenicScore = Math.max(
        highestScenicScore,
        getScenicScore(rowIndex, columnIndex),
      );
    });
  });

  return highestScenicScore;
};
