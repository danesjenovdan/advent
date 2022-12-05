#     [C]         [Q]         [V]
#     [D]         [D] [S]     [M] [Z]
#     [G]     [P] [W] [M]     [C] [G]
#     [F]     [Z] [C] [D] [P] [S] [W]
# [P] [L]     [C] [V] [W] [W] [H] [L]
# [G] [B] [V] [R] [L] [N] [G] [P] [F]
# [R] [T] [S] [S] [S] [T] [D] [L] [P]
# [N] [J] [M] [L] [P] [C] [H] [Z] [R]
#  1   2   3   4   5   6   7   8   9

# left to right, top to bottom
CRATES = [
    ["P", "G", "R", "N"],
    ["C", "D", "G", "F", "L", "B", "T", "J"],
    ["V", "S", "M"],
    ["P", "Z", "C", "R", "S", "L"],
    ["Q", "D", "W", "C", "V", "L", "S", "P"],
    ["S", "M", "D", "W", "N", "T", "C"],
    ["P", "W", "G", "D", "H"],
    ["V", "M", "C", "S", "H", "P", "L", "Z"],
    ["Z", "G", "W", "L", "F", "P", "R"],
]


def parse_instructions(instructions: str) -> tuple:
    how_many = int(instructions.split(" ")[1])
    from_where = int(instructions.split(" ")[3]) - 1
    to_where = int(instructions.split(" ")[5]) - 1

    return (how_many, from_where, to_where)


def execute_move_9000(instructions: str, crates: list) -> list:
    how_many, from_where, to_where = parse_instructions(instructions)
    for i in range(how_many):
        crates = move_n_crates(from_where, to_where, 1, crates)

    return crates


def execute_move_9001(instructions: str, crates: list) -> list:
    how_many, from_where, to_where = parse_instructions(instructions)
    crates = move_n_crates(from_where, to_where, how_many, crates)

    return crates


def move_n_crates(from_where: int, to_where: int, how_many: int, crates: list) -> list:
    crates[to_where] = crates[from_where][:how_many] + crates[to_where]
    crates[from_where] = crates[from_where][how_many:]

    return crates


if __name__ == "__main__":
    crates_9000 = [*CRATES]
    crates_9001 = [*CRATES]

    with open("../input/5.txt", "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                crates_9000 = execute_move_9000(clean_line, crates_9000)
                crates_9001 = execute_move_9001(clean_line, crates_9001)
        print("".join([m[0] for m in crates_9000]))
        print("".join([m[0] for m in crates_9001]))
