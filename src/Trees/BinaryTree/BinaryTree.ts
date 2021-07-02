//TODO add strict null check


interface CallbackFn {
    (node: TreeNode | null): any
}

class TreeNode {
    data: number
    left: TreeNode = null
    right: TreeNode = null
    depth?:number

    constructor(data: number) {
        this.data = data;

    }

    * [Symbol.iterator]():Iterator<TreeNode> {
        if (this.left) yield* this.left;
        yield this;
        if (this.right) yield* this.right;
    }
}

export class BinaryTree {
    root: TreeNode = null

    add(data: number) {
        if (this.root === null) {
            this.root = new TreeNode(data);
            return;
        } else {
            const searchTree = (node = this.root) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new TreeNode(data);
                        return;
                    } else if (node.data !== null) {
                        searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new TreeNode(data);
                        return;
                    } else if (node.data !== null) {
                        searchTree(node.right);
                    }
                } else {
                    return;
                }
            };
            return searchTree();
        }
    }

    get maxValue() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

    get minValue() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    has(data: number): boolean {
        return !!this.get(data);
    }

    get(data: number): TreeNode {
        let current = this.root;
        while (current) {
            if (current.data === data) {
                return current;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    remove(data: number): void {
        //#TODO refactor remove method,fix deleted node dublication
        const removeNode = (node: TreeNode, data: number) => {
            if (node === null) {
                return null;
            }

            if (node.data === data) {
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }

                if (node.data === data && !node.left && !node.right) {
                    //deleting moved node from its original position
                    return null;
                }
                //if node has two children
                let tempNode = node.right;
                while (tempNode.left) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, node.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        };
        this.root = removeNode(this.root, data);
    }

    inorderTraversal(callback: CallbackFn) {
        const traverseInorder = (node = this.root) => {
            if (node === null) {
                return;
            }
            traverseInorder(node.left);
            callback(node);
            traverseInorder(node.right);
        };
        //traverseInorder();
        const stack = [];
        let currentNode = this.root;
        while (currentNode || stack.length !== 0) {
            while (currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.pop();
            callback(currentNode);
            currentNode = currentNode.right;
        }
    }

    preorderTraversal(callback: CallbackFn) {
        const traversePreorder = (node = this.root) => {
            if (node === null) {
                return;
            }
            callback(node);
            traversePreorder(node.left);
            traversePreorder(node.right);
        };
        traversePreorder();
    }

    postorderTraversal(callback: CallbackFn) {
        const traversePostorder = (node = this.root) => {
            if (node === null) {
                return;
            }
            traversePostorder(node.left);
            traversePostorder(node.right);
            callback(node);
        };
        traversePostorder();
    }

    breadthTraversal(callback: CallbackFn) {
        if (!this.root) {
            return;
        }

        const queue: TreeNode[] = [];
        let nextNode:TreeNode = null;
        this.root.depth = 0
        queue.push(this.root)
        while (queue.length > 0) {
            nextNode = queue.shift();

            if (nextNode.right || nextNode.right) {
                const children: TreeNode[] = [nextNode.left, nextNode.right].filter(n => !!n).map(n => {
                    n.depth = nextNode.depth +1
                    return n
                })

                queue.push(...children);
            }
            callback(nextNode);
        }
    }

    //#TODO redo solution for generator, one generator per tree no for every node
    * [Symbol.iterator]():Iterator<TreeNode> {
        if (this.root) {
            yield* this.root;
        }
    }
}


