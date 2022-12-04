def split_line(encoded_sections_pair: str) -> list:
    return encoded_sections_pair.split(",")


def expand_sections(encoded_sections: str) -> list:
    start, end = (int(n) for n in encoded_sections.split("-"))
    return list(range(start, end + 1))


def list_intersection(first_list: list, second_list: list) -> list:
    return list(set(first_list).intersection(second_list))


def is_pair_containing(pair: list) -> bool:
    return len(list_intersection(*pair)) == min(map(len, pair))


def does_pair_overlap(pair: list) -> bool:
    return len(list_intersection(*pair)) > 0


def print_part_one(input_file_path: str) -> None:
    result = 0
    with open(input_file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                if is_pair_containing(
                    list(map(expand_sections, split_line(clean_line)))
                ):
                    result += 1
    print(result)


def print_part_two(input_file_path: str) -> None:
    result = 0
    with open(input_file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                if does_pair_overlap(
                    list(map(expand_sections, split_line(clean_line)))
                ):
                    result += 1
    print(result)


if __name__ == "__main__":
    print_part_one("../input/4.txt")
    print_part_two("../input/4.txt")
