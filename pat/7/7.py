dir_sizes = []

def read_dir(f):
    """ kličemo, ko začnemo brat vsebino podmape """

    sub_dirs = [] # seznam map v podmapi
    sum = 0 # vsota velikosti datotek v podmapi

    line = f.readline()

    while line:
        command_words = line.split()

        if command_words[0] == 'dir': # dodamo v seznam map
            sub_dirs.append(command_words[1])
            line = f.readline()

        elif command_words[0] == '$': # sem pridemo, ko zaključimo z branjem vsebin te podmape
            line = f.readline()

            if command_words[2] != '..':
                # gremo čez mape v tej mapi, ki smo jih shranili v seznam, in preberemo vsebino vsake in prištejemo k tej
                for d in sub_dirs:
                    sum = sum + read_dir(f)
                dir_sizes.append(sum)
                return sum

        else: # prištejemo k vsoti datotek
            sum = sum + int(command_words[0])
            line = f.readline()
    
    dir_sizes.append(sum)
    return sum


with open('input.txt') as f:
    line = f.readline() # cd /
    line = f.readline() # ls

    size_taken = read_dir(f)
    space_available = 70000000 - size_taken

    print("vsota vseh manjših od 100000:" , sum(filter(lambda s: s <= 100000, dir_sizes)))
    print("prvi dovolj velik da sprosti dovolj prostora:", sorted(list(filter(lambda s: s >= 30000000 - space_available, dir_sizes)))[0])
