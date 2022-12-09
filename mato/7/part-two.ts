interface Node {
  name: string;
  parent: Directory | null;
  size: number;
}

class File implements Node {
  name: string;
  parent: Directory | null;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.parent = null;
    this.size = size;
  }
}

class Directory implements Node {
  name: string;
  parent: Directory | null;
  children: Array<Directory | File>;

  constructor(name: string) {
    this.name = name;
    this.parent = null;
    this.children = [];
  }

  get size(): number {
    return this.children.reduce((sum, child) => sum + child.size, 0);
  }

  getChildDirectory(name: string): Directory {
    return this.children.find(
      (child) => child instanceof Directory && child.name === name,
    )! as Directory;
  }

  addChild(node: Node) {
    node.parent = this;
    this.children.push(node);
  }
}

enum ActionType {
  ChangeDir,
  CreateDir,
  CreateFile,
  NoOp,
}

type Action = {
  type: ActionType;
  name?: string;
  size?: number;
};

const parseLine = (line: string): Action => {
  const parts = line.split(" ");
  if (parts[0] === "$") {
    if (parts[1] === "cd") {
      return { type: ActionType.ChangeDir, name: parts[2] };
    } else {
      return { type: ActionType.NoOp };
    }
  } else if (parts[0] === "dir") {
    return { type: ActionType.CreateDir, name: parts[1] };
  } else {
    return {
      type: ActionType.CreateFile,
      name: parts[1],
      size: Number(parts[0]),
    };
  }
};

const TOTAL_SPACE = 70000000;
const REQUIRED_SPACE = 30000000;

export default (lines: string[]) => {
  const root = new Directory("ROOT");
  root.addChild(new Directory("/"));
  let currentDir = root;

  lines.forEach((line) => {
    const action = parseLine(line);
    if (action.type === ActionType.CreateDir) {
      currentDir.addChild(new Directory(action.name!));
    } else if (action.type === ActionType.CreateFile) {
      currentDir.addChild(new File(action.name!, action.size!));
    } else if (action.type === ActionType.ChangeDir) {
      if (action.name === "..") {
        currentDir = currentDir.parent!;
      } else {
        currentDir = currentDir.getChildDirectory(action.name!);
      }
    }
  });

  const bigEnoughDirectories: number[] = [];
  const needToDelete = REQUIRED_SPACE - (TOTAL_SPACE - root.size);

  const checkSubdirectories = (directory: Directory) => {
    directory.children.forEach((child) => {
      if (child instanceof Directory) {
        if (child.size >= needToDelete) bigEnoughDirectories.push(child.size);
        checkSubdirectories(child);
      }
    });
  };
  checkSubdirectories(root);

  return bigEnoughDirectories.sort((a, b) => a - b)[0];
};
