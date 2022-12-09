const allCharactersDifferent = (string: string) =>
  new Set(string.split("")).size === 4;

export default (lines: string[]) => {
  const line = lines[0];

  for (let i = 4; i <= line.length; i++) {
    if (allCharactersDifferent(line.substring(i - 4, i))) return i;
  }
  return -1;
};
