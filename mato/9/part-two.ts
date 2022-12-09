type Point = { x: number; y: number };
type Direction = "U" | "D" | "L" | "R";

const parseMove = (line: string) => {
  const [direction, distance] = line.split(" ");
  return {
    direction: direction as Direction,
    distance: Number(distance),
  };
};

const applyMove = (point: Point, direction: Direction) => {
  const offset = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
  }[direction];

  point.x += offset.x;
  point.y += offset.y;
};

const repositionTail = (head: Point, tail: Point) => {
  const diffX = head.x - tail.x;
  const diffY = head.y - tail.y;

  if (Math.abs(diffX) > 1 && Math.abs(diffY) > 1) {
    tail.x += diffX > 0 ? 1 : -1;
    tail.y += diffY > 0 ? 1 : -1;
  } else if (Math.abs(diffX) > 1) {
    tail.y = head.y;
    tail.x += diffX > 0 ? 1 : -1;
  } else if (Math.abs(diffY) > 1) {
    tail.x = head.x;
    tail.y += diffY > 0 ? 1 : -1;
  }
};

export default (lines: string[]) => {
  const points = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  const visitedByTail = new Set();
  const savePosition = (tail: Point) => {
    visitedByTail.add(`${tail.x}_${tail.y}`);
  };
  savePosition(points[9]);

  lines.forEach((line) => {
    const move = parseMove(line);

    for (let i = 0; i < move.distance; i++) {
      applyMove(points[0], move.direction);

      for (let j = 1; j < points.length; j++) {
        repositionTail(points[j - 1], points[j]);
      }

      savePosition(points[9]);
    }
  });

  return visitedByTail.size;
};
