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

module.exports = PriorityQueue;
