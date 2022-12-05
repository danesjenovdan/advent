import math

with open('input.txt') as f:

    first_line = f.readline()

    stacks_no = math.ceil(len(first_line)/4)
    stacks = {}

    for s in range(stacks_no):
        if first_line[s * 4 + 1] != ' ':
            stacks[s+1] = [ first_line[s * 4 + 1] ]
        else:
            stacks[s+1] = []

    print(stacks)

    # parse stacks
    
    line = f.readline()

    while '[' in line:
        for s in range(stacks_no):
            if line[s * 4 + 1] != ' ':
                stacks[s+1].append(line[s * 4 + 1])

        line = f.readline()
    
    line = f.readline() # empty line

    for s in stacks:
        stacks[s].reverse()

    # parse instructions

    line = f.readline() # first 'move'
    
    while 'move' in line:
        words = line.split()

        n = int(words[1])
        from_position = int(words[3])
        to_position = int(words[5])

        # part 1
        # for i in range(n):
        #     stacks[to_position].append(stacks[from_position].pop())

        # part 2
        stacks[to_position][len(stacks[to_position]):] = stacks[from_position][-n:]
        del stacks[from_position][-n:]

        line = f.readline()
    
    crates = ''
    for s in stacks:
        crates = crates + stacks[s].pop()
    
    print(crates)