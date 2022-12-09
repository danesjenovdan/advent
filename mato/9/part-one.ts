type Point = { x: number; y: number };
type Direction = "U" | "D" | "L" | "R";

const parseMove = (line: string) => {
  const [direction, distance] = line.split(" ");
  return {
    direction: direction as Direction,
    distance: Number(distance),
  };
};

const applyMove = (head: Point, tail: Point, direction: Direction) => {
  const offset = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
  }[direction];

  head.x += offset.x;
  head.y += offset.y;

  const diffX = head.x - tail.x;
  const diffY = head.y - tail.y;

  if (Math.abs(diffX) > 1) {
    tail.y = head.y;
    tail.x += diffX > 0 ? 1 : -1;
  } else if (Math.abs(diffY) > 1) {
    tail.x = head.x;
    tail.y += diffY > 0 ? 1 : -1;
  }
};

export default (lines: string[]) => {
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  const visitedByTail = new Set(["0_0"]);
  const savePosition = (tail: Point) => {
    visitedByTail.add(`${tail.x}_${tail.y}`);
  };

  savePosition(tail);

  lines.forEach((line) => {
    const move = parseMove(line);

    for (let i = 0; i < move.distance; i++) {
      applyMove(head, tail, move.direction);
      savePosition(tail);
    }
  });

  return visitedByTail.size;
};
