from typing import List


def noop(register_history: List[int]) -> List[int]:
    # spend a cycle doing nothing
    register_history.append(register_history[-1])

    return register_history


def addx(x: int, register_history: List[int]) -> List[int]:
    # spend a cycle doing nothing
    register_history = noop(register_history)

    new_value = register_history[-1] + x
    register_history.append(new_value)

    return register_history


def execute_command(command: str, register_history: List[int]) -> List[int]:
    if command == "noop":
        return noop(register_history)

    if "addx" in command:
        return addx(int(command.split(" ")[-1]), register_history)

    raise NotImplementedError(f"Command `{command}` not implemented.")


def execute_file_and_return_history(file_path: str) -> List[int]:
    register_history: List[int] = [1]

    with open(file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                register_history = execute_command(clean_line, register_history)

    return register_history


# cycle_number is 1-indexed
def calculate_signal_strength(cycle_number: int, register_history: List[int]) -> int:
    return (cycle_number) * register_history[cycle_number - 1]


def execute_file_and_sum_interesting_signal_strenghts(file_path: str) -> int:
    relevant_cycle_numbers = [20, 60, 100, 140, 180, 220]
    return sum(
        [
            calculate_signal_strength(
                cycle_number, execute_file_and_return_history(file_path)
            )
            for cycle_number in relevant_cycle_numbers
        ]
    )


# cycle_number is 1-indexed
def get_drawable_pixels(cycle_number: int, register_history: List[int]) -> List[int]:
    current_register_value = register_history[cycle_number - 1]

    return [
        current_register_value - 1,
        current_register_value,
        current_register_value + 1,
    ]


# row_i is 0-indexed
def get_crt_row(row_i: int, register_history: List[int]) -> List[str]:
    row: List[str] = []
    for cycle_number in range(1, 41):
        if (cycle_number - 1) in get_drawable_pixels(
            cycle_number + (40 * row_i), register_history
        ):
            row.append("#")
        else:
            row.append(".")
    return row


def print_crt_row(row_i: int, register_history: List[int]) -> None:
    print("".join(get_crt_row(row_i, register_history)))


def print_crt(register_history: List[int]) -> None:
    for row_i in range(6):
        print_crt_row(row_i, register_history)


# for debugging
def execute_file_and_print_history(file_path: str) -> None:
    print(execute_file_and_return_history(file_path))


if __name__ == "__main__":
    print(execute_file_and_sum_interesting_signal_strenghts("../input/10.txt"))
    print_crt(execute_file_and_return_history("../input/10.txt"))
