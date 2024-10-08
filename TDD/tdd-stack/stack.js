class Stack {

  constructor() {
    this._size = 0;
    this.head = null;
  }

  size() {
    return this._size;
  }

  push(item) {
    this.head = {
      item,
      next: this.head,
    };
    this._size++;
  }

  pop() {
    if (this._size === 0) {
      throw new Error('Stack is empty');
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.item;
  }

  peek() {
    if (this.size() === 0) {
      throw new Error('Stack is empty');
    }
    return this.head.item;
  }
}

module.exports = Stack;