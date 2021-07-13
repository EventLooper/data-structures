

class TreeNode {
    value: string;
    children: Map<string, TreeNode>;
    isWord: boolean;
    parent?: TreeNode;

    constructor(value: string, isWord = false) {
        this.value = value;
        this.children = new Map();
        this.isWord = isWord;
    }

    get isEnd(): boolean {
        return this.childCount === 0;
    }

    get childCount(): number {
        return this.children.size;
    }
}

export class Trie {
    private readonly root: TreeNode = new TreeNode('');


    private walkAndDelete(wordNode: TreeNode): void {
        if (!wordNode.isEnd && wordNode.isWord) {
            wordNode.isWord = false;
            return;
        }
        const word = wordNode.value;
        let node: TreeNode | undefined = wordNode;
        for (let i = word.length; i > 0; i--) {
            const currentLetter = word[i - 1];

            if (node?.value === word) {
                node.parent?.children.delete(currentLetter);
                node = node?.parent;
                continue;
            }
            if (node?.childCount === 0 && !node.isWord) {
                node.parent?.children.delete(currentLetter);
            }

            node = node?.parent;
        }
    }

    private walkAndInsert(input: string): void {
        input.split("").reduce((acc, currtLetter, index, self) => {
            const isWord = index === self.length - 1;

            if (!acc.children.has(currtLetter)) {
                acc.children.set(currtLetter, new TreeNode(input.slice(0, index + 1)));
            }
            const currentChild = acc.children.get(currtLetter) as TreeNode;

            currentChild.isWord = isWord;
            currentChild.parent = acc;

            return acc.children.get(currtLetter) as TreeNode;
        }, this.root);
    }

    private getNodeWords(node: TreeNode): string[] {
        const output: string[] = [];
        const stack: TreeNode[] = [];
        stack.push(node);
        while (stack.length) {
            const currentNode = stack.pop() as TreeNode;

            if (currentNode.isWord) {
                output.push(currentNode.value);
            }
            if (!currentNode.isEnd) {
                stack.push(...Array.from(currentNode.children.values()));
            }
        }
        return output;
    }

    private checkPrefix(prefix: string): { hasPrefix: boolean; prefixNode: TreeNode } {
        return prefix
            .split("")
            .reduce<{ hasPrefix: boolean; prefixNode: TreeNode }>(
                ({prefixNode, hasPrefix}, currtLetter) => {
                    if (prefixNode.children.has(currtLetter)) {
                        prefixNode = prefixNode.children.get(currtLetter) as TreeNode;
                        return {prefixNode, hasPrefix};
                    }
                    return {prefixNode, hasPrefix: false};
                },
                {
                    prefixNode: this.root,
                    hasPrefix: true
                }
            );
    }

    private walkAndSearch(prefix: string): string[] {
        const {hasPrefix, prefixNode} = this.checkPrefix(prefix);

        return hasPrefix ? this.getNodeWords(prefixNode) : [];
    }

    add(word: string): void {
        this.walkAndInsert(word);
    }

    remove(word: string): void {
        const {hasPrefix, prefixNode} = this.checkPrefix(word);
        if (hasPrefix && prefixNode.isWord) {
            this.walkAndDelete(prefixNode);
        }

    }

    removePrefix(prefix: string): void {
        const {hasPrefix, prefixNode} = this.checkPrefix(prefix);
        if (hasPrefix) {
            this.walkAndDelete(prefixNode)
        }
    }

    has(word: string): boolean {
        const {hasPrefix, prefixNode} = this.checkPrefix(word);
        return hasPrefix && prefixNode.isWord;
    }

    search(input: string): string[] {
        return this.walkAndSearch(input);
    }
}
