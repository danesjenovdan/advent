# part 1
# with open('input.txt') as f:
#     lines = f.readlines()

#     map = []

#     for line in lines:
#         row = [int(x) for x in line[:-1]]
#         map.append(row)

#     columns = [list(col) for col in zip(*map)]
    
#     visible_no = 0
    
#     for i, row in enumerate(map):
#         for j, tree in enumerate(row):
#             if i == 0 or j == 0 or i == len(map) - 1 or j == len(row) - 1:
#                 visible_no += 1
#             else:
#                 # print(tree, row[:j], row[j+1:], columns[j][:i], columns[j][i+1:])
#                 if tree > max(row[:j]) or tree > max(row[j+1:]) or tree > max(columns[j][:i]) or tree > max(columns[j][i+1:]):
#                     visible_no += 1
#                     # print("visible!")
    
#     print(visible_no)

# part 2
def calculate_distance(row, tree):
    distance = 0
    for el in row:
        distance += 1
        if el >= tree:
            break
    return distance


with open('input.txt') as f:
    lines = f.readlines()

    map = []

    for line in lines:
        row = [int(x) for x in line[:-1]]
        map.append(row)

    columns = [list(col) for col in zip(*map)]
    
    highest_scenic_score = 0
    
    for i, row in enumerate(map):
        for j, tree in enumerate(row):
            if i == 0 or j == 0 or i == len(map) - 1 or j == len(row) - 1:
                continue

            scenic_score_left = calculate_distance(reversed(row[:j]), tree)
            scenic_score_right = calculate_distance(row[j+1:], tree)
            scenic_score_top = calculate_distance(reversed(columns[j][:i]), tree)
            scenic_score_down = calculate_distance(columns[j][i+1:], tree)

            scenic_score = scenic_score_left * scenic_score_right * scenic_score_top * scenic_score_down
            
            if scenic_score > highest_scenic_score:
                highest_scenic_score = scenic_score
    
    print(highest_scenic_score)