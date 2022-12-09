export default (lines: string[]) => {
  const GRID_SIZE = lines.length;

  const grid = lines.map((line) => line.split("").map(Number));

  const isVisible = (rowIndex: number, columnIndex: number) => {
    if (
      rowIndex === 0 ||
      rowIndex === GRID_SIZE - 1 ||
      columnIndex === 0 ||
      columnIndex === GRID_SIZE - 1
    ) {
      return true;
    }

    const value = grid[rowIndex][columnIndex];

    let visibleTop = true;
    for (let i = 0; i < rowIndex; i++) {
      if (grid[i][columnIndex] >= value) visibleTop = false;
    }
    let visibleBottom = true;
    for (let i = rowIndex + 1; i < GRID_SIZE; i++) {
      if (grid[i][columnIndex] >= value) visibleBottom = false;
    }
    let visibleLeft = true;
    for (let i = 0; i < columnIndex; i++) {
      if (grid[rowIndex][i] >= value) visibleLeft = false;
    }
    let visibleRight = true;
    for (let i = columnIndex + 1; i < GRID_SIZE; i++) {
      if (grid[rowIndex][i] >= value) visibleRight = false;
    }

    return visibleTop || visibleBottom || visibleLeft || visibleRight;
  };

  let visible = 0;

  grid.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      if (isVisible(rowIndex, columnIndex)) visible++;
    });
  });

  return visible;
};
