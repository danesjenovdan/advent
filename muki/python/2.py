ASSUMPTION = {
    "A X": 3 + 1,
    "A Y": 6 + 2,
    "A Z": 0 + 3,
    #
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    #
    "C X": 6 + 1,
    "C Y": 0 + 2,
    "C Z": 3 + 3,
}

REALITY = {
    "A X": 3 + 0,
    "A Y": 1 + 3,
    "A Z": 2 + 6,
    #
    "B X": 1 + 0,
    "B Y": 2 + 3,
    "B Z": 3 + 6,
    #
    "C X": 2 + 0,
    "C Y": 3 + 3,
    "C Z": 1 + 6,
}


def parse_strategy_file(file_path: str) -> list:
    with open(file_path, "r") as infile:
        return [line.strip() for line in infile.readlines()]


def calculate_total(strategy: list, meaning: dict) -> int:
    total = 0
    for move in strategy:
        total += meaning[move]

    return total


if __name__ == "__main__":
    print(calculate_total(parse_strategy_file("../input/2.txt"), ASSUMPTION))
    print(calculate_total(parse_strategy_file("../input/2.txt"), REALITY))
