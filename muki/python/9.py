from typing import List, Tuple


class Knot:
    def __init__(self, x: int = 0, y: int = 0):
        self.x = x
        self.y = y

    def get_coordinates(self) -> tuple:
        return (
            self.x,
            self.y,
        )

    def set_coordinates(self, x: int, y: int) -> None:
        self.x = x
        self.y = y

    def move_right(self) -> None:
        self.x += 1

    def move_left(self) -> None:
        self.x -= 1

    def move_up(self) -> None:
        self.y += 1

    def move_down(self) -> None:
        self.y -= 1


class Rope:
    def __init__(
        self, head_x: int = 0, head_y: int = 0, tail_x: int = 0, tail_y: int = 0
    ) -> None:
        self.head = Knot(head_x, head_y)
        self.tail = Knot(tail_x, tail_y)

    def move_head(self, direction: str) -> None:
        if direction == "R":
            self.head.move_right()
        if direction == "L":
            self.head.move_left()
        if direction == "U":
            self.head.move_up()
        if direction == "D":
            self.head.move_down()

    def follow_head(self) -> None:
        horizontal_distance = abs(self.head.x - self.tail.x)
        vertical_distance = abs(self.head.y - self.tail.y)

        # check for extreme diagonal situation
        # that only happens if the ropes are chained
        if horizontal_distance + vertical_distance == 4:
            if horizontal_distance == vertical_distance:
                if self.head.x > self.tail.x:
                    self.tail.move_right()
                else:
                    self.tail.move_left()

                if self.head.y > self.tail.y:
                    self.tail.move_up()
                else:
                    self.tail.move_down()

            elif horizontal_distance > vertical_distance:
                raise NotImplementedError(
                    f"Situation not implemented. H: ({self.head.x}, {self.head.y}), T: ({self.tail.x},{self.tail.y})"
                )
            else:
                raise NotImplementedError(
                    f"Situation not implemented. H: ({self.head.x}, {self.head.y}), T: ({self.tail.x},{self.tail.y})"
                )

        # check for diagonal situation
        if horizontal_distance + vertical_distance == 3:
            if horizontal_distance > vertical_distance:
                self.tail.set_coordinates(self.tail.x, self.head.y)
            else:
                self.tail.set_coordinates(self.head.x, self.tail.y)

        # check for straight follow
        if abs(self.head.x - self.tail.x) == 2:
            if self.head.x > self.tail.x:
                self.tail.move_right()
            else:
                self.tail.move_left()
            return

        # check for verical follow
        if abs(self.head.y - self.tail.y) == 2:
            if self.head.y > self.tail.y:
                self.tail.move_up()
            else:
                self.tail.move_down()
            return


def simulate_movement_from_file(file_path: str) -> List[tuple]:
    rope = Rope()
    tail_positions: List[tuple] = [(0, 0)]

    with open(file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                direction = line.split(" ")[0]
                amount = int(line.split(" ")[-1])

                for i in range(amount):
                    rope.move_head(direction)
                    rope.follow_head()
                    tail_positions.append(rope.tail.get_coordinates())

    return tail_positions


def simulate_chain_movement_from_file(file_path: str) -> List[tuple]:
    chain: List[Rope] = []
    for i in range(9):
        chain.append(Rope())

    tail_positions: List[tuple] = [(0, 0)]

    with open(file_path, "r") as infile:
        for line in infile.readlines():
            clean_line = line.strip()
            if clean_line != "":
                direction = line.split(" ")[0]
                amount = int(line.split(" ")[-1])

                for i in range(amount):
                    for j, rope in enumerate(chain):
                        # move the first rope
                        if j == 0:
                            rope.move_head(direction)
                            rope.follow_head()

                        # move all the other ropes in the chain
                        if j > 0:
                            rope.head.set_coordinates(
                                *chain[j - 1].tail.get_coordinates()
                            )
                            rope.follow_head()

                    # once the whole chain is moved, save the tail position
                    tail_positions.append(chain[-1].tail.get_coordinates())

    return tail_positions


def count_unique_tail_positions(tail_positions: list) -> int:
    return len(list(set(tail_positions)))


if __name__ == "__main__":
    print(count_unique_tail_positions(simulate_movement_from_file("../input/9.txt")))
    print(
        count_unique_tail_positions(simulate_chain_movement_from_file("../input/9.txt"))
    )
