const PriorityQueue = require("./PriorityQueue");

class Dijkstra {
  constructor() {
    this.vertexQueue = new PriorityQueue();
  }

  computePaths(source) {
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

  getShortestPathTo(target) {
    const path = [];
    let vertex = target;

    while (vertex !== null) {
      path.unshift(vertex);
      vertex = vertex.previous;
    }

    return path;
  }
}

module.exports = Dijkstra;
