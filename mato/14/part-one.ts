enum GridElement {
  Air,
  Rock,
  Sand,
}

class Vector {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor([x1, y1]: [number, number], [x2, y2]: [number, number]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

const parseVectors = (lines: string[]) =>
  lines
    .map((line) => {
      const vectors: Vector[] = [];
      const points = line
        .split(" -> ")
        .map(
          (point: string) => point.split(",").map(Number) as [number, number],
        );
      for (let i = 1; i < points.length; i++) {
        vectors.push(new Vector(points[i - 1], points[i]));
      }
      return vectors;
    })
    .flat();

const normalizeVectors = (vectors: Vector[]) => {
  let minY = 0;
  let minX = 500;
  let maxX = 0;
  let maxY = 0;

  vectors.forEach((vector) => {
    minX = Math.min(minX, vector.x1, vector.x2);
    minY = Math.min(minY, vector.y1, vector.y2);
  });

  vectors.forEach((vector) => {
    vector.x1 = vector.x1 - minX;
    vector.x2 = vector.x2 - minX;
    vector.y1 = vector.y1 - minY;
    vector.y2 = vector.y2 - minY;

    maxX = Math.max(maxX, vector.x1, vector.x2);
    maxY = Math.max(maxY, vector.y1, vector.y2);
  });

  return { maxX, maxY, minX };
};

const generateGrid = (maxX: number, maxY: number) => {
  const grid: GridElement[][] = [];
  for (let y = 0; y <= maxY; y++) {
    grid[y] = [];
    for (let x = 0; x <= maxX; x++) {
      grid[y][x] = GridElement.Air;
    }
  }
  return grid;
};

const populateGridWithRock = (vectors: Vector[], grid: GridElement[][]) => {
  vectors.forEach((vector) => {
    if (vector.x1 === vector.x2) {
      const bigger = Math.max(vector.y1, vector.y2);
      const smaller = Math.min(vector.y1, vector.y2);
      for (let y = smaller; y <= bigger; y++) {
        grid[y][vector.x1] = GridElement.Rock;
      }
    } else {
      const bigger = Math.max(vector.x1, vector.x2);
      const smaller = Math.min(vector.x1, vector.x2);
      for (let x = smaller; x <= bigger; x++) {
        grid[vector.y1][x] = GridElement.Rock;
      }
    }
  });
};

const addOneSand = (grid: GridElement[][], minX: number) => {
  let sandX = 500 - minX;
  let sandY = 0;
  grid[sandY][sandX] = GridElement.Sand;

  while (true) {
    if (grid[sandY + 1] === undefined) {
      // Sand falls through the bottom
      grid[sandY][sandX] = GridElement.Air;
      return false;
    } else if (grid[sandY + 1][sandX] === GridElement.Air) {
      // Sand can move 1 down
      grid[sandY][sandX] = GridElement.Air;
      sandY++;
      grid[sandY][sandX] = GridElement.Sand;
    } else if (grid[sandY + 1][sandX - 1] === undefined) {
      // Sand falls to the left
      grid[sandY][sandX] = GridElement.Air;
      return false;
    } else if (grid[sandY + 1][sandX - 1] === GridElement.Air) {
      // Sand can move down-left
      grid[sandY][sandX] = GridElement.Air;
      sandY++;
      sandX--;
      grid[sandY][sandX] = GridElement.Sand;
    } else if (grid[sandY + 1][sandX + 1] === undefined) {
      // Sand falls to the right
      grid[sandY][sandX] = GridElement.Air;
      return false;
    } else if (grid[sandY + 1][sandX + 1] === GridElement.Air) {
      // Sand can move down-right
      grid[sandY][sandX] = GridElement.Air;
      sandY++;
      sandX++;
      grid[sandY][sandX] = GridElement.Sand;
    } else {
      // Sand remains in place
      return true;
    }
  }
};

const countSand = (grid: GridElement[][]) =>
  grid.reduce(
    (sum: number, row) =>
      sum + row.filter((item) => item === GridElement.Sand).length,
    0,
  );

export default (lines: string[]) => {
  const vectors = parseVectors(lines);
  const { maxX, maxY, minX } = normalizeVectors(vectors);
  const grid = generateGrid(maxX, maxY);
  populateGridWithRock(vectors, grid);

  let keepSimulating = true;

  while (keepSimulating) {
    keepSimulating = addOneSand(grid, minX);
  }

  return countSand(grid);
};
