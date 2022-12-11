def move_tail(head_position, tail_position):
    x_difference = head_position[0] - tail_position[0]
    y_difference = head_position[1] - tail_position[1]

    if abs(x_difference) == 2:
        tail_position[0] += int(x_difference / abs(x_difference))

        if abs(y_difference) == 1:
            tail_position[1] += y_difference

    if abs(y_difference) == 2:
        tail_position[1] += int(y_difference / abs(y_difference))

        if abs(x_difference) == 1:
            tail_position[0] += x_difference

    return tail_position

# knots = 2
knots = 10

with open('input.txt') as f:
    lines = f.readlines()

    knots = [[0,0] for i in range(knots)]

    tail_positions = {'0-0'}

    for line in lines:
        instruction = line.split(' ')
        direction = instruction[0]
        steps = int(instruction[1])

        for step in range(steps):
            if direction == 'R':
                knots[0][0] += 1
            elif direction == 'L':
                knots[0][0] -= 1
            elif direction == 'U':
                knots[0][1] += 1
            elif direction == 'D':
                knots[0][1] -= 1
            
            for i, k in enumerate(knots[1:]):
                knots[i+1] = move_tail(knots[i], knots[i+1])
            
            tail_positions.add(f"{knots[-1][0]}-{knots[-1][1]}")

print(len(tail_positions))
