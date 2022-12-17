import { minBy } from "https://deno.land/std@0.167.0/collections/min_by.ts";

class Graph {
  nodes: Record<string, Node> = {};

  insert(node: Node) {
    this.nodes[node.name] = node;
  }

  getUnvisited() {
    return Object.values(this.nodes).filter((n) => !n.visited);
  }

  calculateAllDistances() {
    const nodeList = Object.values(this.nodes);
    nodeList.forEach((start, index) => {
      for (let i = index + 1; i < nodeList.length; i++) {
        const end = nodeList[i];
        const distance = this.calculateDistanceBetween(start, end);
        start.distances[end.name] = distance;
        end.distances[start.name] = distance;
      }
    });
  }

  calculateDistanceBetween(start: Node, end: Node) {
    const allUnvisited: Set<Node> = new Set(Object.values(this.nodes));

    start.distance = 0;

    while (start !== end) {
      start.neighbors
        .map((neighbor) => this.nodes[neighbor])
        .filter((node) => !node.visited)
        .forEach((n) => {
          n.distance = Math.min(start.distance + 1, n.distance);
        });

      start.visited = true;
      allUnvisited.delete(start);
      start = minBy(Array.from(allUnvisited), (n: Node) => n.distance) as Node;
    }

    const finalDistance = end.distance;

    Object.values(this.nodes).forEach((node) => {
      node.visited = false;
      node.distance = Infinity;
    });

    return finalDistance;
  }
}

class Node {
  name: string;
  opened = false;
  visited = false;
  distance = Infinity;
  neighbors: string[] = [];
  distances: Record<string, number> = {};
  flowRate: number;

  constructor(line: string) {
    const regex =
      /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.+)/;
    const [_, name, flowRate, neighbors] = line.match(regex)!;
    this.name = name;
    this.flowRate = Number(flowRate);
    this.neighbors = neighbors.split(", ");
  }
}

const PATH_LENGTH_LIMIT = 30;

const findAllPaths = (
  currentNode: Node,
  allPaths: string[][],
  possibleNodes: Node[],
  visited: string[] = [],
  timeLeft = PATH_LENGTH_LIMIT,
) => {
  visited.push(currentNode.name);

  let noMatches = true;
  possibleNodes.forEach((node) => {
    const timeNeeded = currentNode.distances[node.name] + 1;
    if (timeNeeded < timeLeft) {
      findAllPaths(
        node,
        allPaths,
        possibleNodes.filter((n) => n !== node),
        Array.from(visited),
        timeLeft - timeNeeded,
      );
      noMatches = false;
    }
  });

  if (noMatches) allPaths.push(Array.from(visited));
};

const ratePath = (path: string[], graph: Graph) => {
  let flowEarned = 0;
  let minutesLeft = PATH_LENGTH_LIMIT;

  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = graph.nodes[path[i]];
    const nextNode = graph.nodes[path[i + 1]];

    minutesLeft -= currentNode.distances[nextNode.name] + 1;
    flowEarned += nextNode.flowRate * minutesLeft;
  }

  return flowEarned;
};

export default (lines: string[]) => {
  const graph = new Graph();
  lines.forEach((line) => {
    graph.insert(new Node(line));
  });
  graph.calculateAllDistances();

  const nodesWithFlow = Object.values(graph.nodes).filter((n) => n.flowRate);
  const currentNode = graph.nodes["AA"];
  const allPaths: string[][] = [];

  findAllPaths(currentNode, allPaths, nodesWithFlow);

  const scores = allPaths.map((path) => ratePath(path, graph));

  return Math.max(...scores);
};
