def line_to_number_or_pipe(line: str) -> str:
    if line.strip() == "":
        return "|"
    return f"{line}_"


def parse_calory_log_file_to_string(file_path: str) -> str:
    output = ""
    with open(file_path, "r") as infile:
        for line in infile.readlines():
            output += line_to_number_or_pipe(line)

    return output


def get_top_carrying_calories(calory_log_string: str) -> int:
    elves = calory_log_string.split("|")
    return max([sum([int(s) for s in elf[:-1].split("_")]) for elf in elves])


def sum_top_three_carrying_calories(calory_log_string: str) -> int:
    elves = calory_log_string.split("|")
    calories = [sum([int(s) for s in elf[:-1].split("_")]) for elf in elves]
    top_3 = []
    for i in range(3):
        top_3.append(max(calories))
        calories = list(filter(lambda c: c != top_3[i], calories))

    return sum(top_3)


if __name__ == "__main__":
    print(get_top_carrying_calories(parse_calory_log_file_to_string("../input/1.txt")))
    print(
        sum_top_three_carrying_calories(
            parse_calory_log_file_to_string("../input/1.txt")
        )
    )
