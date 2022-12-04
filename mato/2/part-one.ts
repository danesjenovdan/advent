enum Choice {
  Rock,
  Paper,
  Scissors,
}

const LETTER_MAPPING = {
  A: Choice.Rock,
  B: Choice.Paper,
  C: Choice.Scissors,
  X: Choice.Rock,
  Y: Choice.Paper,
  Z: Choice.Scissors,
};

type ValidLetter = keyof typeof LETTER_MAPPING;

const getPointsForOutcome = (player: Choice, opponent: Choice) => {
  if (player === opponent) {
    // DRAW
    return 3;
  } else if (
    (player === Choice.Rock && opponent === Choice.Scissors) ||
    (player === Choice.Paper && opponent === Choice.Rock) ||
    (player === Choice.Scissors && opponent === Choice.Paper)
  ) {
    // WIN
    return 6;
  } else {
    // LOSS
    return 0;
  }
};

const getPointsForChoice = (choice: Choice) => ({
  [Choice.Rock]: 1,
  [Choice.Paper]: 2,
  [Choice.Scissors]: 3,
}[choice]);

export default (lines: string[]) => {
  const results = lines.map((line) => {
    const [opponentLetter, playerLetter] = line.split(" ") as [
      ValidLetter,
      ValidLetter,
    ];
    const opponent = LETTER_MAPPING[opponentLetter];
    const player = LETTER_MAPPING[playerLetter];

    return getPointsForChoice(player) + getPointsForOutcome(player, opponent);
  });

  const sum = results.reduce((previous, current) => previous + current, 0);

  return sum;
};
