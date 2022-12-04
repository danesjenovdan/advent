# max_value = 0
# current = 0

# with open('input.txt') as f:
#     lines = f.readlines()
#     for line in lines:
#         if line == "\n":
#             if current > max_value:
#                 max_value = current
#             current = 0
#         else:
#             value = int(line[:-1])
#             current = current + value

# print("MAX VALUE", max_value)


elves_food = []

with open('input.txt') as f:
    lines = f.readlines()
    current = 0
    for line in lines:
        if line == "\n":
            elves_food.append(current)
            current = 0
        else:
            value = int(line[:-1])
            current = current + value
    elves_food.append(current)

elves_food.sort(reverse=True)

print(sum(elves_food[:3]))
