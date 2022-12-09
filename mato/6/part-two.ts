const allCharactersDifferent = (string: string) =>
  new Set(string.split("")).size === 14;

export default (lines: string[]) => {
  const line = lines[0];

  for (let i = 14; i <= line.length; i++) {
    if (allCharactersDifferent(line.substring(i - 14, i))) return i;
  }
  return -1;
};
