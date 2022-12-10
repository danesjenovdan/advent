from typing import List


def parse_file_to_matrix(file_path: str) -> list:
    matrix = []
    with open(file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                matrix.append([int(x) for x in clean_line])

    return matrix


def count_visible_trees_in_a_row(row: list, reverse: bool = False) -> int:
    if reverse:
        row.reverse()

    visible_trees = 0
    current_height = -1

    for tree in row:
        if tree > current_height:
            visible_trees += 1
            current_height = tree

    return visible_trees


def get_visibility_row(row: list, reverse: bool = False) -> list:
    if reverse:
        row.reverse()

    visibility_row = []
    max_height = -1

    for tree in row:
        if tree > max_height:
            visibility_row.append(1)
            max_height = tree
        else:
            visibility_row.append(0)

    if reverse:
        visibility_row.reverse()

    return visibility_row


def max_two_matrices(matrix_1: list, matrix_2: list) -> list:
    # assumes the matrices are of same size
    output = []
    for i, row in enumerate(matrix_1):
        output.append([max([x, matrix_2[i][j]]) for j, x in enumerate(row)])

    return output


def print_matrix(matrix: list) -> None:
    for row in matrix:
        print(*row)
    print()


def rows_to_columns(rows: list) -> list:
    columns: List[list] = [[] for i in range(len(rows))]

    for i, row in enumerate(rows):
        for j, item in enumerate(row):
            columns[j].append(item)

    return columns


def count_all_visible_trees(matrix: list) -> int:
    # original left to right
    visibility_lr = [get_visibility_row(row) for row in matrix]

    # original right to left
    visibility_rl = [get_visibility_row(row, reverse=True) for row in matrix]

    # top to bottom
    visibility_tb = rows_to_columns(
        [get_visibility_row(row) for row in rows_to_columns(matrix)]
    )
    for row in visibility_tb:
        row.reverse()

    # bottom to top
    visibility_bt = rows_to_columns(
        [get_visibility_row(row, reverse=True) for row in rows_to_columns(matrix)]
    )
    for row in visibility_bt:
        row.reverse()

    # union the four matrices
    lr_union = max_two_matrices(visibility_lr, visibility_rl)
    tb_union = max_two_matrices(visibility_tb, visibility_bt)
    final_union = max_two_matrices(lr_union, tb_union)

    total = 0
    return sum([sum(row) for row in final_union])


def get_perspective(x: int, y: int, direction: str, matrix: list) -> list:
    if direction == "r":
        view = [item for item in matrix[y][x + 1 :]]

    if direction == "l":
        view = [item for item in matrix[y][:x]]
        view.reverse()

    if direction == "d":
        view = [row[x] for row in matrix[y + 1 :]]

    if direction == "u":
        view = [row[x] for row in matrix[:y]]
        view.reverse()

    return [matrix[y][x], *view]


def calculate_visibility_distance(perspective: list) -> int:
    if len(perspective) == 1:
        return 0

    visibility_distance = 0
    treehouse_height = perspective[0]

    for tree in perspective[1:]:
        visibility_distance += 1

        if tree < treehouse_height:
            continue
        else:
            return visibility_distance

    return visibility_distance


def multiply(integers: List[int]) -> int:
    result = integers[0] * integers[1]

    rest = integers[2:]
    if len(rest) > 0:
        rest.append(result)
        result = multiply(rest)

    return result


def get_highest_scenic_score(matrix: list) -> int:
    scenic_scores = []
    for y, row in enumerate(matrix):
        for x, tree in enumerate(row):
            visibility_distances = []
            for direction in ["r", "l", "d", "u"]:
                visibility_distances.append(
                    calculate_visibility_distance(
                        get_perspective(x, y, direction, matrix)
                    )
                )
            scenic_scores.append(multiply(visibility_distances))
    return max(scenic_scores)


if __name__ == "__main__":
    matrix = parse_file_to_matrix("../input/8.txt")
    print(count_all_visible_trees(matrix))
    print(get_highest_scenic_score(matrix))
