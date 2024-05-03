// Vertex class represents a node in the graph
class Vertex {
  constructor(name) {
    this.name = name; // The name or identifier of the vertex
    this.adjacencies = []; // An array to store the edges connected to this vertex
    this.minDistance = Infinity; // The minimum distance from the source vertex (initially set to Infinity)
    this.previous = null; // The previous vertex in the shortest path (initially set to null)
  }

  // Method to convert the vertex to a string representation
  toString() {
    return this.name;
  }

  // Method to compare the minDistance property of two vertices
  compareTo(other) {
    return this.minDistance - other.minDistance;
  }
}

// Edge class represents an edge between two vertices
class Edge {
  constructor(target, weight, name) {
    this.target = target; // The destination vertex of the edge
    this.weight = weight; // The weight or cost associated with the edge
    this.name = name; // The name or identifier of the edge
  }

  // Method to convert the edge to a string representation
  toString() {
    return this.name;
  }
}

// Dijkstra class implements the Dijkstra algorithm to find the shortest path
class Dijkstra {
  constructor() {}

  // Method to compute the shortest paths from the given source vertex to all other vertices
  computePaths(source) {
    source.minDistance = 0; // Set the distance of the source vertex to 0
    const vertexQueue = new PriorityQueue(); // Create a priority queue to store vertices
    vertexQueue.enqueue(source); // Enqueue the source vertex

    // Loop until the priority queue is empty
    while (!vertexQueue.isEmpty()) {
      const u = vertexQueue.dequeue(); // Dequeue the vertex with the smallest minDistance

      // Iterate over the adjacencies (edges) of the current vertex
      for (const edge of u.adjacencies) {
        const v = edge.target; // The destination vertex of the current edge
        const weight = edge.weight; // The weight of the current edge
        const distanceThroughU = u.minDistance + weight; // Calculate the distance through the current vertex

        // If the distance through the current vertex is smaller than the current minDistance of the destination vertex
        if (distanceThroughU < v.minDistance) {
          vertexQueue.remove(v); // Remove the destination vertex from the queue (if present)
          v.minDistance = distanceThroughU; // Update the minDistance of the destination vertex
          v.previous = u; // Set the previous vertex in the shortest path
          vertexQueue.enqueue(v); // Enqueue the updated destination vertex
        }
      }
    }
  }

  // Method to retrieve the shortest path to the given target vertex
  getShortestPathTo(target) {
    const path = []; // Array to store the vertices in the shortest path
    let vertex = target; // Start from the target vertex

    // Traverse the previous pointers to build the shortest path backward
    while (vertex !== null) {
      path.unshift(vertex); // Add the current vertex to the beginning of the path array
      vertex = vertex.previous; // Move to the previous vertex
    }

    return path; // Return the shortest path array
  }
}

// PriorityQueue implementation to store vertices based on their minDistance
class PriorityQueue {
  constructor() {
    this.items = []; // Array to store the vertices
  }

  // Method to enqueue a vertex into the priority queue
  enqueue(item) {
    this.items.push(item); // Add the vertex to the end of the array
    this.items.sort((a, b) => a.compareTo(b)); // Sort the array based on the minDistance of the vertices
  }

  // Method to dequeue the vertex with the smallest minDistance
  dequeue() {
    return this.items.shift(); // Remove and return the first element (smallest minDistance)
  }

  // Method to remove a vertex from the priority queue
  remove(item) {
    const index = this.items.indexOf(item); // Find the index of the vertex
    if (index !== -1) {
      this.items.splice(index, 1); // Remove the vertex from the array
    }
  }

  // Method to check if the priority queue is empty
  isEmpty() {
    return this.items.length === 0; // Return true if the array is empty
  }
}

function main() {
  // Create empty arrays to store vertices for each group (A, B, C, D, E)
  const groupA = [];
  const groupB = [];
  const groupC = [];
  const groupD = [];
  const groupE = [];

  // Create 5 vertices for each group (A1 to A5, B1 to B5, C1 to C5, D1 to D5, E1 to E5)
  for (let i = 1; i <= 5; i++) {
    groupA.push(new Vertex(`A${i}`));
    groupB.push(new Vertex(`B${i}`));
    groupC.push(new Vertex(`C${i}`));
    groupD.push(new Vertex(`D${i}`));
    groupE.push(new Vertex(`E${i}`));
  }

  // Connect nodes within each group (A1-A2-A3-A4-A5, B1-B2-B3-B4-B5, etc.)
  connectNodesInGroup(groupA);
  connectNodesInGroup(groupB);
  connectNodesInGroup(groupC);
  connectNodesInGroup(groupD);
  connectNodesInGroup(groupE);

  // Create vertices for the "Last" group (A_L, B_L, C_L, D_L, E_L)
  const groupLast = [
    new Vertex("A_L"),
    new Vertex("B_L"),
    new Vertex("C_L"),
    new Vertex("D_L"),
    new Vertex("E_L"),
  ];
  connectNodesInGroup(groupLast); // Connect nodes within the "Last" group

  // Create vertices for the "First" group (A_F, B_F, C_F, D_F, E_F)
  const groupFirst = [
    new Vertex("A_F"),
    new Vertex("B_F"),
    new Vertex("C_F"),
    new Vertex("D_F"),
    new Vertex("E_F"),
  ];
  connectNodesInGroup(groupFirst); // Connect nodes within the "First" group
  const start = new Vertex("start"); // Create the start vertex
  const end = new Vertex("end"); // Create the end vertex

  // Connect the start vertex to A_F and E_F to the end vertex
  const edge_start_A_F = new Edge(groupFirst[0], 8, "Edge_start_A_F");
  start.adjacencies.push(edge_start_A_F);

  const edge_E_F_end = new Edge(end, 8, "Edge_E_F_end");
  groupFirst[4].adjacencies.push(edge_E_F_end);

  // Connect vertices within each group to the "First" and "Last" groups
  // For group A:
  const edge_AF_A1 = new Edge(groupA[0], 8, "Edge_AF_A1");
  groupFirst[0].adjacencies.push(edge_AF_A1);
  const edge_A1_AF = new Edge(groupFirst[0], 8, "Edge_A1_AF");
  groupA[0].adjacencies.push(edge_A1_AF);

  const edge_A5_AL = new Edge(groupLast[0], 8, "Edge_A5_AL");
  groupA[4].adjacencies.push(edge_A5_AL);
  const edge_AL_A5 = new Edge(groupA[4], 8, "Edge_AL_A5");
  groupLast[0].adjacencies.push(edge_AL_A5);

  // Repeat the above for the rest of the groups (B, C, D, E)
  // ... (code omitted for brevity)

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

  // Create a mapping between item names and their corresponding vertices
  const itemToVertex = {
    cookies: groupB[2],
    cake: groupB[3],
    juice: groupD[2],
    milk: groupD[4],
  };

  // Import the readline module for reading user input
  const readline = require("readline");

  // Create a readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter your preferences (separate items with a space, e.g., cookies milk): ",
    (input) => {
      // Trim any leading/trailing whitespace from the user input
      const userPreferences = input.trim().split(" ");

      // Create a mapping between user preferences and their corresponding vertices
      const itemToVertex = {
        cookies: groupB[2], // Map 'cookies' to the third vertex in groupB
        milk: groupD[4], // Map 'milk' to the fifth vertex in groupD
      };

      // Map the user preferences to their corresponding vertices
      const nodesToVisit = userPreferences.map((item) => itemToVertex[item]);
      nodesToVisit.push(end); // Add the end vertex to the list of nodes to visit

      // Compute the overall path by visiting the nodes in the specified order
      const overallPath = computeOverallPath(start, nodesToVisit, end, [
        groupA,
        groupB,
        groupC,
        groupD,
        groupE,
        groupFirst,
        groupLast,
      ]);

      // Log the overall path taken, excluding the end vertex
      console.log(
        "Overall path taken:",
        [
          start.toString(),
          ...overallPath.slice(0, -1).map((vertex) => vertex.toString()),
        ].join(" -> ")
      );

      rl.close(); // Close the readline interface
    }
  );
}

//Added some functions to make it easy:
function findShortestPath(startNode, endNode, graph, startA, endF) {
  // Create a new instance of the Dijkstra class
  const dijkstra = new Dijkstra();
  dijkstra.computePaths(startNode); // Compute paths from the start node

  // Find the shortest path to the end node
  const shortestPath = dijkstra.getShortestPathTo(endNode);
  resetGraph(graph, startA, endF); // Reset the graph for the next iteration
  return shortestPath;
}

// Function to compute the overall path given a sequence of nodes to visit
function computeOverallPath(startNode, nodesToVisit, endNode, graph) {
  let overallPath = [];

  // Iterate over the sequence of nodes to visit
  for (let i = 0; i < nodesToVisit.length; i++) {
    const currentNode = i === 0 ? startNode : nodesToVisit[i - 1];
    const nextNode = nodesToVisit[i];

    // Find the shortest path from the current node to the next node
    const pathToNextNode = findShortestPath(
      currentNode,
      nextNode,
      graph,
      startNode,
      endNode
    );
    // Concatenate the path to the next node (excluding the current node) to the overall path
    overallPath = overallPath.concat(pathToNextNode.slice(1));
  }

  // Add the end node to the overall path
  overallPath.push(endNode);
  resetGraph(graph, startNode, endNode); // Reset the graph
  return overallPath;
}

function resetVertices(vertices) {
  // Iterate over each vertex in the array
  for (const vertex of vertices) {
    // Reset minDistance to Infinity
    vertex.minDistance = Infinity;
    // Reset previous to null
    vertex.previous = null;
  }
}

function resetGraph(groups, startVertex, endVertex) {
  // Iterate over each group and reset vertices
  for (const group of groups) {
    resetVertices(group);
  }

  // Reset the start vertex
  startVertex.minDistance = Infinity;
  startVertex.previous = null;

  // Reset the end vertex
  endVertex.minDistance = Infinity;
  endVertex.previous = null;
}

// Function to connect nodes within a group
function connectNodesInGroup(group) {
  for (let i = 0; i < group.length - 1; i++) {
    const current = group[i];
    const next = group[i + 1];

    // Create an edge between the current and next node
    const edge_current_next = new Edge(
      next,
      8,
      `Edge_${current.name}_${next.name}`
    );
    current.adjacencies.push(edge_current_next);

    // Create an edge between the next and current node
    const edge_next_current = new Edge(
      current,
      8,
      `Edge_${next.name}_${current.name}`
    );
    next.adjacencies.push(edge_next_current);
  }
}

main();
