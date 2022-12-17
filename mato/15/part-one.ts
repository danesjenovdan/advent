class Sensor {
  x: number;
  y: number;
  beaconX: number;
  beaconY: number;
  emptyDistance: number;

  constructor(line: string) {
    const regex =
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
    const [_, x, y, beaconX, beaconY] = line.match(regex)!.map(Number);
    this.x = x;
    this.y = y;
    this.beaconX = beaconX;
    this.beaconY = beaconY;
    this.emptyDistance = Math.abs(x - beaconX) + Math.abs(y - beaconY);
  }
}

type Interval = [number, number];

const mergeIntervals = (intervals: Interval[]) => {
  if (intervals.length < 2) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let previous = intervals[0];

  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0] - 1) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }

  result.push(previous);
  return result;
};

export default (lines: string[], y = 2000000) => {
  const sensors = lines.map((line) => new Sensor(line));

  let intervals = sensors.map((sensor) => {
    const yDiff = Math.abs(sensor.y - y);
    if (yDiff > sensor.emptyDistance) return null;

    const remainder = sensor.emptyDistance - yDiff;
    return [sensor.x - remainder, sensor.x + remainder];
  }).filter((interval) => interval !== null) as Interval[];

  intervals = mergeIntervals(intervals);
  return intervals.reduce(
    (sum, interval) => sum += Math.abs(interval[0] - interval[1]),
    0,
  );
};
