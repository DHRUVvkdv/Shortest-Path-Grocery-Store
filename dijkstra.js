class Vertex {
  constructor(name) {
    this.name = name;
    this.adjacencies = [];
    this.minDistance = Infinity;
    this.previous = null;
  }

  toString() {
    return this.name;
  }

  compareTo(other) {
    return this.minDistance - other.minDistance;
  }
}

class Edge {
  constructor(target, weight, name) {
    this.target = target;
    this.weight = weight;
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

class Dijkstra {
  static computePaths(source) {
    source.minDistance = 0;
    const vertexQueue = new PriorityQueue();
    vertexQueue.enqueue(source);

    while (!vertexQueue.isEmpty()) {
      const u = vertexQueue.dequeue();

      for (const edge of u.adjacencies) {
        const v = edge.target;
        const weight = edge.weight;
        const distanceThroughU = u.minDistance + weight;

        if (distanceThroughU < v.minDistance) {
          vertexQueue.remove(v);
          v.minDistance = distanceThroughU;
          v.previous = u;
          vertexQueue.enqueue(v);
        }
      }
    }
  }

  static getShortestPathTo(target) {
    const path = [];
    let vertex = target;

    while (vertex !== null) {
      path.unshift(vertex);
      vertex = vertex.previous;
    }

    return path;
  }
}

// Assuming you have a PriorityQueue implementation
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
    this.items.sort((a, b) => a.compareTo(b));
  }

  dequeue() {
    return this.items.shift();
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Main function
// function main() {
//   // Create vertices
//   // const A = new Vertex("A");
//   // const B = new Vertex("B");
//   // const D = new Vertex("D");
//   // const F = new Vertex("F");
//   // const K = new Vertex("K");
//   // const J = new Vertex("J");
//   // const M = new Vertex("M");
//   // const O = new Vertex("O");
//   // const P = new Vertex("P");
//   // const R = new Vertex("R");
//   // const Z = new Vertex("Z");
//   // Nodes from A1 to E5
//   const A1 = new Vertex("A1");
//   const B1 = new Vertex("B1");
//   const C1 = new Vertex("C1");
//   const D1 = new Vertex("D1");
//   const E1 = new Vertex("E1");

//   const A2 = new Vertex("A2");
//   const B2 = new Vertex("B2");
//   const C2 = new Vertex("C2");
//   const D2 = new Vertex("D2");
//   const E2 = new Vertex("E2");

//   const A3 = new Vertex("A3");
//   const B3 = new Vertex("B3");
//   const C3 = new Vertex("C3");
//   const D3 = new Vertex("D3");
//   const E3 = new Vertex("E3");

//   const A4 = new Vertex("A4");
//   const B4 = new Vertex("B4");
//   const C4 = new Vertex("C4");
//   const D4 = new Vertex("D4");
//   const E4 = new Vertex("E4");

//   const A5 = new Vertex("A5");
//   const B5 = new Vertex("B5");
//   const C5 = new Vertex("C5");
//   const D5 = new Vertex("D5");
//   const E5 = new Vertex("E5");

//   // Nodes from A_L to E_L
//   const A_L = new Vertex("A_L");
//   const B_L = new Vertex("B_L");
//   const C_L = new Vertex("C_L");
//   const D_L = new Vertex("D_L");
//   const E_L = new Vertex("E_L");

//   // Nodes from A_F to E_F
//   const A_F = new Vertex("A_F");
//   const B_F = new Vertex("B_F");
//   const C_F = new Vertex("C_F");
//   const D_F = new Vertex("D_F");
//   const E_F = new Vertex("E_F");

//   const edge_A_F_A1 = new Edge(A1, 8);
//   A_F.adjacencies.push(edge_A_F_A1);
//   const edge_A1_A_F = new Edge(A_F, 8);
//   A1.adjacencies.push(edge_A1_A_F);

//   // Define the nodes array for A1 to E5
//   const nodes = [
//     A1,
//     A2,
//     A3,
//     A4,
//     A5,
//     B1,
//     B2,
//     B3,
//     B4,
//     B5,
//     C1,
//     C2,
//     C3,
//     C4,
//     C5,
//     D1,
//     D2,
//     D3,
//     D4,
//     D5,
//     E1,
//     E2,
//     E3,
//     E4,
//     E5,
//   ];

//   // Connect nodes in sequence
//   for (let i = 0; i < nodes.length - 1; i++) {
//     const current = nodes[i];
//     const next = nodes[i + 1];

//     // Create edges between current and next nodes
//     const edge_current_next = new Edge(next, 8);
//     current.adjacencies.push(edge_current_next);
//     console.log(edge_current_next);

//     // Create edges between next and current nodes
//     const edge_next_current = new Edge(current, 8);
//     next.adjacencies.push(edge_next_current);
//     console.log(edge_next_current);
//   }

//   // Set edges and weights
//   // A.adjacencies.push(new Edge(M, 8));
//   // B.adjacencies.push(new Edge(D, 11));
//   // D.adjacencies.push(new Edge(B, 11));
//   // F.adjacencies.push(new Edge(K, 23));
//   // K.adjacencies.push(new Edge(O, 40));
//   // J.adjacencies.push(new Edge(K, 25));
//   // M.adjacencies.push(new Edge(R, 8));
//   // O.adjacencies.push(new Edge(K, 40));
//   // P.adjacencies.push(new Edge(Z, 18));
//   // R.adjacencies.push(new Edge(P, 15));
//   // Z.adjacencies.push(new Edge(P, 18));

//   // Dijkstra.computePaths(R);

//   // console.log(`Distance to ${Z}: ${Z.minDistance}`);
//   // const path = Dijkstra.getShortestPathTo(Z);
//   // console.log("Path:", path.map((vertex) => vertex.toString()).join(" -> "));
// }
// Main function
// Main function
// Main function
// Main function
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

  const nodesToVisit = [groupB[2]];
  for (let i = 0; i < nodesToVisit.length; i++) {
    Dijkstra.computePaths(nodesToVisit[i]);
  }

  Dijkstra.computePaths(groupA[4]); // Assuming A1 is the starting node

  console.log(`Distance to ${groupD[4]}: ${groupA[4].minDistance}`);
  const path = Dijkstra.getShortestPathTo(groupC[1]);
  console.log("Path:", path.map((vertex) => vertex.toString()).join(" -> "));
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
