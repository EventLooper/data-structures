import {BinaryTree} from './BinaryTree'
const bst = new BinaryTree();

const data = [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90];

data.forEach((item) => bst.add(item));

console.log(bst);
bst.remove(10);
console.log(bst);
bst.breadthTraversal((node) => console.log('breadth', node));
//bst.inorderTraversal((node) => console.log("in order", node));
//bst.preorderTraversal(node => console.log("pre order", node.data));
//bst.postorderTraversal(node => console.log("post order", node.data));
