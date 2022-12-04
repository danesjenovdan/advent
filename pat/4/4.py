pairs_no = 0

# contain
# with open('input.txt') as f:
#     lines = f.readlines()
#     for line in lines:
#         elves = line[:-1].split(',')
#         elf1 = elves[0].split('-')
#         elf2 = elves[1].split('-')

#         if int(elf1[0]) >= int(elf2[0]) and int(elf1[1]) <= int(elf2[1]) or int(elf2[0]) >= int(elf1[0]) and int(elf2[1]) <= int(elf1[1]):
#             print(elf1, elf2)
#             pairs_no = pairs_no + 1

# overlap
with open('input.txt') as f:
    lines = f.readlines()
    for line in lines:
        elves = line[:-1].split(',')
        elf1 = elves[0].split('-')
        elf2 = elves[1].split('-')

        if int(elf1[0]) >= int(elf2[0]) and int(elf1[0]) <= int(elf2[1]) or int(elf2[0]) >= int(elf1[0]) and int(elf2[0]) <= int(elf1[1]):
            print(elf1, elf2)
            pairs_no = pairs_no + 1

print(pairs_no)