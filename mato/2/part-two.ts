enum Choice {
  Rock,
  Paper,
  Scissors,
}

const CHOICE_LETTER_MAPPING = {
  A: Choice.Rock,
  B: Choice.Paper,
  C: Choice.Scissors,
};

type ValidChoiceLetter = keyof typeof CHOICE_LETTER_MAPPING;

enum Outcome {
  Win,
  Draw,
  Loss,
}

const OUTCOME_LETTER_MAPPING = {
  X: Outcome.Loss,
  Y: Outcome.Draw,
  Z: Outcome.Win,
};

type ValidOutcomeLetter = keyof typeof OUTCOME_LETTER_MAPPING;

const getPointsForOutcome = (outcome: Outcome) => ({
  [Outcome.Win]: 6,
  [Outcome.Draw]: 3,
  [Outcome.Loss]: 0,
}[outcome]);

const getPlayerChoice = (opponentChoice: Choice, outcome: Outcome) => {
  if (outcome === Outcome.Draw) {
    return opponentChoice;
  } else if (outcome === Outcome.Loss) {
    return {
      [Choice.Rock]: Choice.Scissors,
      [Choice.Paper]: Choice.Rock,
      [Choice.Scissors]: Choice.Paper,
    }[opponentChoice];
  } else {
    return {
      [Choice.Rock]: Choice.Paper,
      [Choice.Paper]: Choice.Scissors,
      [Choice.Scissors]: Choice.Rock,
    }[opponentChoice];
  }
};

const getPointsForChoice = (choice: Choice) => ({
  [Choice.Rock]: 1,
  [Choice.Paper]: 2,
  [Choice.Scissors]: 3,
}[choice]);

export default (lines: string[]) => {
  const results = lines.map((line) => {
    const [opponentLetter, outcomeLetter] = line.split(" ") as [
      ValidChoiceLetter,
      ValidOutcomeLetter,
    ];
    const opponentChoice = CHOICE_LETTER_MAPPING[opponentLetter];
    const outcome = OUTCOME_LETTER_MAPPING[outcomeLetter];

    const playerChoice = getPlayerChoice(opponentChoice, outcome);

    return getPointsForChoice(playerChoice) + getPointsForOutcome(outcome);
  });

  const sum = results.reduce((previous, current) => previous + current, 0);

  return sum;
};
