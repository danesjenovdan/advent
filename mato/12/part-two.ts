import { minBy } from "https://deno.land/std@0.167.0/collections/min_by.ts";

export class Node {
  x: number;
  y: number;
  grid: Node[][];
  elevation: number;
  visited = false;
  distance = Infinity;

  constructor(
    x: number,
    y: number,
    grid: Node[][],
    char: string,
  ) {
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.elevation = Node.getElevation(char);
  }

  getNeighbours(): Node[] {
    const x = this.x;
    const y = this.y;
    const neighbours: Node[] = [];

    const maxX = this.grid[0].length - 1;
    const maxY = this.grid.length - 1;

    if (x > 0 && this.isAccessible(y, x - 1)) {
      neighbours.push(this.grid[y][x - 1]);
    }
    if (y > 0 && this.isAccessible(y - 1, x)) {
      neighbours.push(this.grid[y - 1][x]);
    }
    if (x < maxX && this.isAccessible(y, x + 1)) {
      neighbours.push(this.grid[y][x + 1]);
    }
    if (y < maxY && this.isAccessible(y + 1, x)) {
      neighbours.push(this.grid[y + 1][x]);
    }

    return neighbours;
  }

  static getElevation(rawChar: string) {
    let char = rawChar;

    if (rawChar === "S") char = "a";
    else if (rawChar === "E") char = "z";

    return char.charCodeAt(0);
  }

  isAccessible(y: number, x: number) {
    const goal = this.grid[y][x];
    return goal.elevation <= this.elevation + 1;
  }
}

const getUnvisited = (nodes: Node[]) => nodes.filter((n) => !n.visited);

export default (lines: string[]) => {
  const WIDTH = lines[0].length;
  const HEIGHT = lines.length;
  const grid: Node[][] = [];
  const allUnvisited: Set<Node> = new Set();
  const starts: Node[] = [];
  let end: Node = new Node(0, 0, grid, "a");

  for (let y = 0; y < HEIGHT; y++) {
    grid[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      const char = lines[y][x];
      const node = new Node(x, y, grid, char);
      grid[y][x] = node;
      allUnvisited.add(node);

      if (char === "S" || char === "a") starts.push(node);
      if (char === "E") end = node;
    }
  }

  const findDistance = (start: Node, end: Node) => {
    start.distance = 0;

    let current = start;

    while (current !== end) {
      getUnvisited(current.getNeighbours()).forEach((n) => {
        n.distance = Math.min(
          current.distance + 1,
          n.distance,
        );
      });

      current.visited = true;
      allUnvisited.delete(current);
      current = minBy(
        Array.from(allUnvisited),
        (n: Node) => n.distance,
      ) as Node;
    }

    const result = end.distance;

    grid.forEach((row) =>
      row.forEach((node) => {
        allUnvisited.add(node);
        node.visited = false;
        node.distance = Infinity;
      })
    );

    return result;
  };

  const distances = starts.map((start) => findDistance(start, end));

  return Math.min(...distances);
};
