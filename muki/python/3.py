from string import ascii_lowercase, ascii_uppercase

PRIORITIES = {
    **{letter: i + 1 for i, letter in enumerate(ascii_lowercase)},
    **{letter: i + 27 for i, letter in enumerate(ascii_uppercase)},
}


def split_rugsack(rugsack: str) -> list:
    split_point = int(len(rugsack) / 2)
    assert len(rugsack[:split_point]) == len(rugsack[split_point:])
    return [rugsack[:split_point], rugsack[split_point:]]


def find_common_items(first_compartment: str, second_compartment: str) -> str:
    common_items = []
    for item in first_compartment:
        if item in second_compartment:
            if item not in common_items:
                common_items.append(item)
    return "".join(common_items)


def sum_priorities(common_items: str) -> int:
    total = 0
    for item in common_items:
        total += PRIORITIES[item]
    return total


def print_part_one() -> None:
    with open("../input/3.txt", "r") as infile:
        print(
            sum(
                [
                    sum_priorities(find_common_items(*split_rugsack(rugsack.strip())))
                    for rugsack in infile.readlines()
                    if rugsack.strip() != ""
                ]
            )
        )


def find_common_items_in_three_rugsacks(
    first_rugsack: str, second_rugsack: str, third_rugsack: str
) -> str:
    common_items = find_common_items(first_rugsack, second_rugsack)
    return find_common_items(common_items, third_rugsack)


def parse_groups_from_file(file_path: str) -> list:
    with open(file_path, "r") as infile:
        lines = [line.strip() for line in infile.readlines() if line.strip() != ""]
        return [lines[i : i + 3] for i in range(0, len(lines), 3)]


def print_part_two() -> None:
    print(
        sum(
            [
                sum_priorities(
                    find_common_items_in_three_rugsacks(group[0], group[1], group[2])
                )
                for group in parse_groups_from_file("../input/3.txt")
            ]
        )
    )


if __name__ == "__main__":
    print_part_one()
    print_part_two()
