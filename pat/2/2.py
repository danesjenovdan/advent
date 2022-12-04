# opponent: A for Rock, B for Paper, and C for Scissors
# me:       X for Rock, Y for Paper, and Z for Scissors

# score: 1 for Rock, 2 for Paper, and 3 for Scissors
# score: 0 if you lost, 3 if the round was a draw, and 6 if you won

total_score = 0

# option_score = {
#     'X': 1,
#     'Y': 2, 
#     'Z': 3
# }

# opponent_score = {
#     'A': {
#         'X': 3,
#         'Y': 6,
#         'Z': 0
#     },
#     'B': {
#         'X': 0,
#         'Y': 3,
#         'Z': 6
#     },
#     'C': {
#         'X': 6,
#         'Y': 0,
#         'Z': 3
#     }
# }

# X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win

option_score = {
    'X': 0,
    'Y': 3, 
    'Z': 6
}

opponent_score = {
    #rock 1
    'A': {
        'X': 3,
        'Y': 1,
        'Z': 2
    },
    #paper 2
    'B': {
        'X': 1,
        'Y': 2,
        'Z': 3
    },
    #scissors 3
    'C': {
        'X': 2,
        'Y': 3,
        'Z': 1
    }
}

with open('input.txt') as f:
    lines = f.readlines()
    for line in lines:
        round = line.split()
        opponent = round[0]
        me = round[1]

        total_score = total_score + option_score[me] + opponent_score[opponent][me]

print(total_score)