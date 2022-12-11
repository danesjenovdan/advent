with open('input.txt') as f:

    line = f.readline()
    signal = line[:-1]

    char_group = []

    for i, c in enumerate(signal):
        if len(char_group) < 14:
            char_group.append(c)
        else:
            if len(char_group) == len(set(char_group)): # razlicni znaki
                print("i", i)
                break
            else:
                char_group.pop(0) # first out
                char_group.append(c) # last in
