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

module.exports = Edge;
