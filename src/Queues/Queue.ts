class Queue<T> {
    collection: T[]

    print() {
        console.log(this.collection);
    }

    enqueue(element: T): void {
        this.collection.push(element);
    }

    dequeue(): T {
        return this.collection.shift();
    }

    get front(): T {
        return this.collection[0];
    }

    isEmpty(): boolean {
        return this.collection.length === 0;
    }
}

const myQueue = new Queue();

myQueue.enqueue(1);
myQueue.enqueue(12);
myQueue.enqueue(13);
myQueue.enqueue(15);
myQueue.enqueue(16);
myQueue.enqueue(31);
myQueue.dequeue();
myQueue.dequeue();
myQueue.front;

type PriorityElement<T> = {
    value: T
    priority: number
}


class PriorityQueue<V, T extends PriorityElement<V> = PriorityElement<V>> extends Queue<T> {
    enqueue(element: T) {
        //#TODO work with edge case and if priority is equal - add element AFTER item
        if (this.isEmpty()) {
            super.enqueue(element);
            return;
        }
        this.collection.forEach((item, index) => {
            if (element.priority <= item.priority) {
                this.collection.splice(index, 0, element);
                return;
            }
            super.enqueue(element);
        });
    }

}

const myPriorityQueue = new PriorityQueue<number>();
myPriorityQueue.enqueue({value: 123, priority: 2});
myPriorityQueue.enqueue({value: 111, priority: 1});
myPriorityQueue.enqueue({value: 1255, priority: 3});
myPriorityQueue.enqueue({value: 222, priority: 1});
myPriorityQueue.print();
