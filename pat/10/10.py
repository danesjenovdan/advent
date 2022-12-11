def find_value_at_cycle(cycle_no):
    cycle_changes_list = cycle_changes.keys()
    filtered_cycle_changes_list = list(filter(lambda no: no <= cycle_no, cycle_changes_list))
    last_relevant_cycle_change = sorted(filtered_cycle_changes_list)[-1]
    return cycle_no * cycle_changes[last_relevant_cycle_change]

cycle_changes = {}

cycle_no = 1
X = 1
addx_execution_time = 2
noop_execution_time = 1

with open('input.txt') as f:
    lines = f.readlines()

    for line in lines:
        command = line.strip().split(' ')

        if command[0] == 'noop':
            cycle_no += noop_execution_time
        elif command[0] == 'addx':
            V = int(command[1])
            cycle_no += addx_execution_time
            X = X + V
            cycle_changes[cycle_no] = X

final = find_value_at_cycle(20) + find_value_at_cycle(60) + find_value_at_cycle(100) + find_value_at_cycle(140) + find_value_at_cycle(180) + find_value_at_cycle(220)
print(final)

# part 2
X = 1
sprite_position = 0

for i in range(6):
    for j in range(40):
        step = i * 40 + j
        if step+1 in cycle_changes:
            X = cycle_changes[step+1]
        sprite_position = X
        if (abs(sprite_position - j) <= 1):
            print('# ', end ="")
        else:
            print('. ', end ="")
    print('')