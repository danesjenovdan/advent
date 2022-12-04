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

const findCommonItem = (rucksack: string) => {
  const firstCompartment = rucksack.substring(0, rucksack.length / 2).split("");
  const secondCompartment = rucksack.substring(rucksack.length / 2).split("");

  for (let i = 0; i < firstCompartment.length; i++) {
    const item = firstCompartment[i];
    if (secondCompartment.includes(item)) return item;
  }

  return "";
};

export default (lines: string[]) => {
  let sum = 0;

  lines.forEach((rucksack) => {
    const commonItem = findCommonItem(rucksack);
    const priority = getPriorityForItem(commonItem);
    sum += priority;
  });

  return sum;
};
