type ListOrNumber = number | Array<ListOrNumber>;
type Pair = [ListOrNumber[], ListOrNumber[]];

const parsePairs = (lines: string[]) => {
  const pairCount = (lines.length + 1) / 3;
  const pairs: Pair[] = [];
  for (let i = 0; i < pairCount; i++) {
    const listOne = eval(lines[i * 3]) as ListOrNumber[];
    const listTwo = eval(lines[i * 3 + 1]) as ListOrNumber[];
    pairs.push([listOne, listTwo]);
  }
  return pairs;
};

enum Result {
  RightOrder,
  WrongOrder,
  Undetermined,
}

const compareNumbers = (left: number, right: number) => {
  if (left < right) {
    return Result.RightOrder;
  } else if (left > right) {
    return Result.WrongOrder;
  } else {
    return Result.Undetermined;
  }
};

const compareLists = (left: ListOrNumber[], right: ListOrNumber[]): Result => {
  const maxIterations = Math.max(left.length, right.length);

  for (let i = 0; i <= maxIterations; i++) {
    if (left[i] === undefined && right[i] === undefined) {
      return Result.Undetermined;
    } else if (left[i] === undefined) {
      return Result.RightOrder;
    } else if (right[i] === undefined) {
      return Result.WrongOrder;
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

      if (result !== Result.Undetermined) return result;
    }
  }

  return Result.Undetermined;
};

export default (lines: string[]) => {
  const pairs: Pair[] = parsePairs(lines);

  const results = pairs.map((pair) => compareLists(pair[0], pair[1]));
  const rightSum = results.reduce(
    (sum, result, index) =>
      sum + (result === Result.RightOrder ? index + 1 : 0),
    0,
  );

  return rightSum;
};
