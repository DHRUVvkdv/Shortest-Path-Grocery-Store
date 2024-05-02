const Vertex = require("./vertex");
const Edge = require("./Edge");
const Dijkstra = require("./Dijkstra2").default;
const { computePaths, getShortestPathTo } = require("./Dijkstra2");

class Main {
  //   static run() {
  //     const main = new Main();
  //     main.createVertices();
  //     main.connectGroups();
  //     main.calculatePaths();
  //     main.printPaths();
  //   }
  //   createVertices() {
  //     // Your code for creating vertices
  //   }
  //   connectGroups() {
  //     // Your code for connecting groups
  //   }
  //   calculatePaths() {
  //     // Your code for calculating paths
  //   }
  //   printPaths() {
  //     // Your code for printing paths
  //   }
}
function main() {
  // Create vertices for each group
  const groupA = [];
  const groupB = [];
  const groupC = [];
  const groupD = [];
  const groupE = [];

  // Create vertices for each group
  for (let i = 1; i <= 5; i++) {
    groupA.push(new Vertex(`A${i}`));
    groupB.push(new Vertex(`B${i}`));
    groupC.push(new Vertex(`C${i}`));
    groupD.push(new Vertex(`D${i}`));
    groupE.push(new Vertex(`E${i}`));
  }

  // Connect nodes within each group
  connectNodesInGroup(groupA);
  connectNodesInGroup(groupB);
  connectNodesInGroup(groupC);
  connectNodesInGroup(groupD);
  connectNodesInGroup(groupE);

  const groupLast = [
    new Vertex("A_L"),
    new Vertex("B_L"),
    new Vertex("C_L"),
    new Vertex("D_L"),
    new Vertex("E_L"),
  ];
  connectNodesInGroup(groupLast);

  // Connect A_F to E_F
  const groupFirst = [
    new Vertex("A_F"),
    new Vertex("B_F"),
    new Vertex("C_F"),
    new Vertex("D_F"),
    new Vertex("E_F"),
  ];
  connectNodesInGroup(groupFirst);
  const start = new Vertex("start");
  const end = new Vertex("end");

  // Connect start to A_F and E_F to end
  const edge_start_A_F = new Edge(groupFirst[0], 8, "Edge_start_A_F");
  start.adjacencies.push(edge_start_A_F);

  const edge_E_F_end = new Edge(end, 8, "Edge_E_F_end");
  groupFirst[4].adjacencies.push(edge_E_F_end);

  // Connect A_F to A1, A1 to A_F, A5 to A_L, A_L to A5
  //Connecting averything
  const edge_AF_A1 = new Edge(groupA[0], 8, "Edge_AF_A1");
  groupFirst[0].adjacencies.push(edge_AF_A1);
  const edge_A1_AF = new Edge(groupFirst[0], 8, "Edge_A1_AF");
  groupA[0].adjacencies.push(edge_A1_AF);

  const edge_A5_AL = new Edge(groupLast[0], 8, "Edge_A5_AL");
  groupA[4].adjacencies.push(edge_A5_AL);
  const edge_AL_A5 = new Edge(groupA[4], 8, "Edge_AL_A5");
  groupLast[0].adjacencies.push(edge_AL_A5);

  // Repeat the above for the rest of the groups

  // Connect B_F to B1, B1 to B_F, B5 to B_L, B_L to B5
  const edge_BF_B1 = new Edge(groupB[0], 8, "Edge_BF_B1");
  groupFirst[1].adjacencies.push(edge_BF_B1);
  const edge_B1_BF = new Edge(groupFirst[1], 8, "Edge_B1_BF");
  groupB[0].adjacencies.push(edge_B1_BF);

  const edge_B5_BL = new Edge(groupLast[1], 8, "Edge_B5_BL");
  groupB[4].adjacencies.push(edge_B5_BL);
  const edge_BL_B5 = new Edge(groupB[4], 8, "Edge_BL_B5");
  groupLast[1].adjacencies.push(edge_BL_B5);

  // Connect C_F to C1, C1 to C_F, C5 to C_L, C_L to C5
  const edge_CF_C1 = new Edge(groupC[0], 8, "Edge_CF_C1");
  groupFirst[2].adjacencies.push(edge_CF_C1);
  const edge_C1_CF = new Edge(groupFirst[2], 8, "Edge_C1_CF");
  groupC[0].adjacencies.push(edge_C1_CF);

  const edge_C5_CL = new Edge(groupLast[2], 8, "Edge_C5_CL");
  groupC[4].adjacencies.push(edge_C5_CL);
  const edge_CL_C5 = new Edge(groupC[4], 8, "Edge_CL_C5");
  groupLast[2].adjacencies.push(edge_CL_C5);

  // Connect D_F to D1, D1 to D_F, D5 to D_L, D_L to D5
  const edge_DF_D1 = new Edge(groupD[0], 8, "Edge_DF_D1");
  groupFirst[3].adjacencies.push(edge_DF_D1);
  const edge_D1_DF = new Edge(groupFirst[3], 8, "Edge_D1_DF");
  groupD[0].adjacencies.push(edge_D1_DF);

  const edge_D5_DL = new Edge(groupLast[3], 8, "Edge_D5_DL");
  groupD[4].adjacencies.push(edge_D5_DL);
  const edge_DL_D5 = new Edge(groupD[4], 8, "Edge_DL_D5");
  groupLast[3].adjacencies.push(edge_DL_D5);

  // Connect E_F to E1, E1 to E_F, E5 to E_L, E_L to E5
  const edge_EF_E1 = new Edge(groupE[0], 8, "Edge_EF_E1");
  groupFirst[4].adjacencies.push(edge_EF_E1);
  const edge_E1_EF = new Edge(groupFirst[4], 8, "Edge_E1_EF");
  groupE[0].adjacencies.push(edge_E1_EF);

  const edge_E5_EL = new Edge(groupLast[4], 8, "Edge_E5_EL");
  groupE[4].adjacencies.push(edge_E5_EL);
  const edge_EL_E5 = new Edge(groupE[4], 8, "Edge_EL_E5");
  groupLast[4].adjacencies.push(edge_EL_E5);

  // Dijkstra.computePaths(groupA[0]); // Assuming A1 is the starting node

  // console.log(`Distance to ${groupA[4]}: ${groupA[4].minDistance}`);
  // const path = Dijkstra.getShortestPathTo(groupA[4]);
  // console.log("Path:", path.map((vertex) => vertex.toString()).join(" -> "));
  //try 1:
  //   const nodesToVisit = [groupB[2], groupD[4]];
  //   const overallPath = computeOverallPath(start, nodesToVisit, end);

  //   console.log(
  //     "Overall path taken:",
  //     overallPath.map((vertex) => vertex.toString()).join(" -> ")
  //   );
  //Try 2:
  // const nodesToVisit = [start, groupB[2], groupD[4], end];
  // for (let i = 0; i < nodesToVisit.length; i++) {
  //   Dijkstra.computePaths(nodesToVisit[i]);
  // }

  // Dijkstra.computePaths(groupA[4]); // Assuming A1 is the starting node

  // console.log(`Distance to ${groupD[4]}: ${groupA[4].minDistance}`);
  // const path = Dijkstra.getShortestPathTo(groupC[1]);
  // console.log("Path:", path.map((vertex) => vertex.toString()).join(" -> "));
  //Try 3:
  //   console.log(
  //     findShortestPath(start, groupB[2])
  //       .map((vertex) => vertex.toString())
  //       .join(" -> ")
  //   );
  //   console.log(
  //     findShortestPath(groupB[2], groupD[4])
  //       .map((vertex) => vertex.toString())
  //       .join(" -> ")
  //   );
  //   console.log(
  //     findShortestPath(groupD[4], end)
  //       .map((vertex) => vertex.toString())
  //       .join(" -> ")
  //   );
  //Try 4:
  //   Dijkstra.computePaths(groupB[2]); // Assuming A1 is the starting node

  //   console.log(`Distance to ${groupD[4]}: ${groupA[4].minDistance}`);
  //   const path = Dijkstra.getShortestPathTo(groupD[4]);
  //   console.log("Path:", path.map((vertex) => vertex.toString()).join(" -> "));
  //Try 5:
  const dijkstra = new Dijkstra();
  dijkstra.computePaths(start);
  const pathToGroupB2 = dijkstra.getShortestPathTo(groupB[2]);
  console.log("Path from start to groupB[2]:");
  console.log(pathToGroupB2.map((vertex) => vertex.toString()).join(" -> "));
  // Create a new instance of Dijkstra's algorithm
  const dijkstra2 = new Dijkstra();
  // Find the shortest path from groupB[2] to groupD[4]
  dijkstra2.computePaths(groupB[2]);
  const pathToGroupD4 = dijkstra2.getShortestPathTo(groupD[4]);
  console.log("Path from groupB[2] to groupD[4]:");
  console.log(pathToGroupD4.map((vertex) => vertex.toString()).join(" -> "));
}
//Added some fucntions to make it easy:
function findShortestPath(startNode, endNode) {
  // Compute paths from the start node to every other vertex
  computePaths(startNode);

  // Find the shortest path to the end node
  const shortestPath = getShortestPathTo(endNode);

  return shortestPath;
}

// Define a function to compute the overall path given a sequence of nodes to visit
function computeOverallPath(startNode, nodesToVisit, endNode) {
  let overallPath = [];

  // Compute paths from the start node to each node in the sequence
  for (let i = 0; i < nodesToVisit.length; i++) {
    const currentNode = i === 0 ? startNode : nodesToVisit[i - 1];
    const nextNode = nodesToVisit[i];

    const pathToNextNode = findShortestPath(currentNode, nextNode);
    overallPath = overallPath.concat(pathToNextNode.slice(1)); // Exclude the current node
  }

  // Add the end node to the overall path
  overallPath.push(endNode);

  return overallPath;
}

// Function to connect nodes within a group
function connectNodesInGroup(group) {
  for (let i = 0; i < group.length - 1; i++) {
    const current = group[i];
    const next = group[i + 1];

    // Create edge between current and next node
    const edge_current_next = new Edge(
      next,
      8,
      `Edge_${current.name}_${next.name}`
    );
    current.adjacencies.push(edge_current_next);
    console.log(edge_current_next.toString());

    // Create edge between next and current node
    const edge_next_current = new Edge(
      current,
      8,
      `Edge_${next.name}_${current.name}`
    );
    next.adjacencies.push(edge_next_current);
    console.log(edge_next_current.toString());
  }
}

main();
