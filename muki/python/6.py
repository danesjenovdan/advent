def get_first_line_from_file(file_path: str) -> str:
    with open(file_path, "r") as infile:
        return infile.readlines()[0].strip()


def count_characters_until_unique_n(text: str, n: int) -> int:
    for i in range(len(text) - n):
        if len(set(text[i : i + n])) == n:
            return i + n
    raise StopIteration(f"No unique sequence of {n} characters found.")


if __name__ == "__main__":
    print(
        count_characters_until_unique_n(get_first_line_from_file("../input/6.txt"), 4)
    )
    print(
        count_characters_until_unique_n(get_first_line_from_file("../input/6.txt"), 14)
    )
