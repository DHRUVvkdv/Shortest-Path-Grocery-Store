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

export default Vertex;
