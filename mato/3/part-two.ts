const getPriorityForItem = (item: string) => {
  const code = item.charCodeAt(0);

  if (code >= 97 && code <= 122) {
    // a-z
    return code - 96;
  } else if (code >= 65 && code <= 90) {
    // A-Z
    return code - 38;
  } else {
    return 0;
  }
};

const findBadge = (rucksacks: [string, string, string]) => {
  const first = rucksacks[0].split("");
  const second = rucksacks[1].split("");
  const third = rucksacks[2].split("");

  for (let i = 0; i < first.length; i++) {
    const item = first[i];
    if (second.includes(item) && third.includes(item)) return item;
  }

  return "";
};

export default (lines: string[]) => {
  let sum = 0;

  lines.forEach((rucksack, index) => {
    if (index % 3 === 2) {
      const badge = findBadge([lines[index - 2], lines[index - 1], rucksack]);
      const priority = getPriorityForItem(badge);
      sum += priority;
    }
  });

  return sum;
};
