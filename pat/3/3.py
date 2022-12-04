# lower case imajo 1 do 26; ascii se začne pri 97
# upper case imajo 27 do 52, ascii se začne pri 65

# import math

# sum_of_priorities = 0

# with open('input.txt') as f:
#     lines = f.readlines()
#     for line in lines:
#         rucksack = line[:-1]
#         # print(ord(rucksack[0]))

#         half_index = math.floor(len(rucksack) / 2)
#         first_half = rucksack[:half_index]
#         second_half = rucksack[half_index:]

#         shared_item = next(iter(set(first_half).intersection(set(second_half))))
#         shared_item_ascii = ord(shared_item)
#         if (shared_item_ascii >= 97):
#             priority = shared_item_ascii - 96
#         else:
#             priority = shared_item_ascii - 64 + 26

#         sum_of_priorities = sum_of_priorities + priority

# print(sum_of_priorities)


with open('input.txt') as f:
    lines = f.readlines()

    sum_of_priorities = 0
    group = []
    for line in lines:
        rucksack = line[:-1]
        
        group.append(rucksack)

        if len(group) == 3:
            shared_item = next(iter(set(group[0]).intersection(set(group[1])).intersection(set(group[2]))))

            shared_item_ascii = ord(shared_item)
            if (shared_item_ascii >= 97):
                priority = shared_item_ascii - 96
            else:
                priority = shared_item_ascii - 64 + 26

            sum_of_priorities = sum_of_priorities + priority
            
            group = []

print(sum_of_priorities)