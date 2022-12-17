type ListOrNumber = number | Array<ListOrNumber>;

const parsePackets = (lines: string[]) =>
  lines.filter((line) => line !== "").map((line) =>
    eval(line) as ListOrNumber[]
  );

type Result = -1 | 0 | 1;

const compareNumbers = (left: number, right: number) => {
  if (left < right) {
    return -1;
  } else if (left > right) {
    return 1;
  } else {
    return 0;
  }
};

const compareLists = (left: ListOrNumber[], right: ListOrNumber[]): Result => {
  const maxIterations = Math.max(left.length, right.length);

  for (let i = 0; i <= maxIterations; i++) {
    if (left[i] === undefined && right[i] === undefined) {
      return 0;
    } else if (left[i] === undefined) {
      return -1;
    } else if (right[i] === undefined) {
      return 1;
    } else {
      const leftItem = left[i];
      const rightItem = right[i];
      let result: Result;

      if (typeof leftItem === "number" && typeof rightItem === "number") {
        result = compareNumbers(leftItem, rightItem);
      } else if (typeof leftItem === "number") {
        result = compareLists([leftItem], rightItem as ListOrNumber[]);
      } else if (typeof rightItem === "number") {
        result = compareLists(leftItem, [rightItem]);
      } else {
        result = compareLists(leftItem, rightItem);
      }

      if (result !== 0) return result;
    }
  }

  return 0;
};

export default (lines: string[]) => {
  const packets: Array<ListOrNumber[]> = parsePackets(lines);
  packets.push([[2]], [[6]]);
  packets.sort(compareLists);

  let decoderKey = 1;

  packets.forEach((packet, index) => {
    if (["[[2]]", "[[6]]"].includes(JSON.stringify(packet))) {
      decoderKey *= index + 1;
    }
  });

  return decoderKey;
};
