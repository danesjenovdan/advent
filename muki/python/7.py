# this is so Folder can have elements typed with Folder
# oterwise we would have to write List['Folder'] which is
# ugly, ya know

from __future__ import annotations
from typing import List


class Folder:
    def __init__(self, path: str):
        self.path = path
        self.children: List[Folder | File] = []

    def __str__(self) -> str:
        return self.path

    def add_child(self, child: Folder | File) -> None:
        self.children.append(child)

    def find_parent(self, folders: List[Folder]) -> Folder:
        for folder in folders:
            if self in folder.children:
                return folder
        raise Exception(f"The folder {self.path} has no parent.")

    def get_total_size(self) -> int:
        total = 0

        # sum all the file sizes
        # ducktyping on the size attribute
        # (only files have it)
        total += sum([f.size for f in self.children if hasattr(f, "size")])

        # "recurse" through all the folders
        # ducktyping on the size attribute
        # (folders do not have it)
        for folder in [f for f in self.children if not hasattr(f, "size")]:
            total += folder.get_total_size()

        return total


class File:
    def __init__(self, name: str, size: int):
        self.name = name
        self.size = size

    def __str__(self) -> str:
        return self.name


def does_folder_exist(folder_path: str, folders: List[Folder]) -> bool:
    for folder in folders:
        if folder.path == folder_path:
            return True
    return False


def get_folder_by_path(folder_path: str, folders: List[Folder]) -> Folder:
    for folder in folders:
        if folder.path == folder_path:
            return folder
    raise Exception(f"No folder found with path {folder_path}.")


def parse_input_to_objects(file_path: str) -> List[Folder]:
    root = Folder("")
    folders: List[Folder] = [root]
    current_folder = root

    with open(file_path, "r") as infile:
        for i, line in enumerate(infile.readlines()):
            output = line.strip()
            if output != "":
                if "$" in output:
                    command = output[2:]
                    # first check if we're moving the directory
                    if "cd" in command:
                        # are we moving to root?
                        if command == "cd /":
                            current_folder = root
                        # are we moving up
                        elif ".." in command:
                            try:
                                current_folder = current_folder.find_parent(folders)
                            except:
                                print(
                                    f"NO PARENT {i}, {current_folder.path}, {command}"
                                )
                        # we are moving down
                        else:
                            next_folder_name = command.split(" ")[-1]
                            current_folder = get_folder_by_path(
                                f"{current_folder.path}/{next_folder_name}", folders
                            )

                    # are we listing?
                    elif "ls" in command:
                        continue

                # is it a folder?
                # create it if does not exist and add it to the folder
                elif "dir " in output[:4]:
                    new_folder_name = output.split(" ")[-1]
                    new_folder_path = f"{current_folder.path}/{new_folder_name}"
                    if not does_folder_exist(new_folder_path, folders):
                        new_folder = Folder(new_folder_path)
                        folders.append(new_folder)
                        current_folder.add_child(new_folder)
                    else:
                        print(f"{new_folder_path} already exists")

                # it's a file! create it and add it to the folder
                else:
                    file_name = output.split(" ")[-1]
                    file_size = int(output.split(" ")[0])
                    new_file = File(file_name, file_size)
                    current_folder.add_child(new_file)

    return folders


def sum_folders_with_total_size_less_than_n(folders: List[Folder], n: int) -> int:
    total = 0
    for folder in folders:
        folder_size = folder.get_total_size()
        if folder.get_total_size() <= n:
            total += folder.get_total_size()

    return total


def find_smallest_folder_to_delete(folders: List[Folder]) -> int:
    total_space = 70000000
    required_space = 30000000
    root_size = get_folder_by_path("", folders).get_total_size()
    available_space = total_space - root_size
    missing_space = required_space - available_space

    return min(
        [
            folder.get_total_size()
            for folder in folders
            if folder.get_total_size() >= missing_space
        ]
    )


if __name__ == "__main__":
    print(
        sum_folders_with_total_size_less_than_n(
            parse_input_to_objects("../input/7.txt"), 100000
        )
    )
    print(find_smallest_folder_to_delete(parse_input_to_objects("../input/7.txt")))
