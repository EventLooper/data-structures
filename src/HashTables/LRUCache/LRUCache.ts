class LRUCache<T = any> {
    capacity:number
    private cache = new Map<string,T>()

    constructor(capacity:number) {
        this.capacity = capacity;

    }

    get size():number {
        return this.cache.size;
    }

    get tail() {
        return this.cache.keys().next().value;
    }

    get(key:string) {
        const value = this.cache.get(key);
        if (value) {
            //move position in Map
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return -1;
    }

    put(key:string, value:T) {
        if (this.cache.has(key)) {
            // refresh key
            this.cache.delete(key);
        }

        if (this.size === this.capacity) {
            // evict oldest
            this.cache.delete(this.tail);
        }

        this.cache.set(key, value);
    }
}
