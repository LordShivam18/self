// components/linked-list/lru-cache/generateTrace.ts

export type LRUOperation =
  | { type: "get"; key: number }
  | { type: "put"; key: number; value: number };

export type LRUNode = {
  key: number;
  value: number;
};

export type LRUStep = {
  step: number;

  capacity: number;

  list: LRUNode[];              // MRU -> LRU
  mapKeys: number[];            // keys currently in hashmap

  activeKey?: number;           // key being accessed
  evictedKey?: number;          // key removed (if any)

  action: string;               // explanation
  done: boolean;
};

export function generateTrace(
  capacity: number,
  operations: LRUOperation[]
): LRUStep[] {
  const trace: LRUStep[] = [];
  let step = 0;

  const list: LRUNode[] = [];              // front = MRU
  const map = new Map<number, LRUNode>();

  function snapshot(
    action: string,
    opts: Partial<LRUStep> = {}
  ) {
    trace.push({
      step: step++,
      capacity,
      list: [...list],
      mapKeys: Array.from(map.keys()),
      action,
      done: false,
      ...opts,
    });
  }

  snapshot("LRU Cache initialized with empty list and hashmap.");

  for (const op of operations) {
    if (op.type === "get") {
      const { key } = op;

      snapshot(`get(${key}) called. Checking hashmap.`, {
        activeKey: key,
      });

      if (!map.has(key)) {
        snapshot(`Key ${key} not found → return -1.`, {
          activeKey: key,
        });
        continue;
      }

      // Move node to front (MRU)
      const node = map.get(key)!;
      const idx = list.findIndex((n) => n.key === key);
      list.splice(idx, 1);
      list.unshift(node);

      snapshot(
        `Key ${key} found. Move node to MRU (front of list).`,
        { activeKey: key }
      );
    }

    if (op.type === "put") {
      const { key, value } = op;

      snapshot(`put(${key}, ${value}) called.`, {
        activeKey: key,
      });

      if (map.has(key)) {
        // Update existing
        const node = map.get(key)!;
        node.value = value;

        const idx = list.findIndex((n) => n.key === key);
        list.splice(idx, 1);
        list.unshift(node);

        snapshot(
          `Key ${key} exists. Update value and move to MRU.`,
          { activeKey: key }
        );
      } else {
        // Insert new
        if (list.length === capacity) {
          const lru = list.pop()!;
          map.delete(lru.key);

          snapshot(
            `Cache full. Evict LRU key ${lru.key}.`,
            { evictedKey: lru.key }
          );
        }

        const newNode = { key, value };
        list.unshift(newNode);
        map.set(key, newNode);

        snapshot(
          `Insert key ${key}. Add to MRU and hashmap.`,
          { activeKey: key }
        );
      }
    }
  }

  trace.push({
    step: step++,
    capacity,
    list: [...list],
    mapKeys: Array.from(map.keys()),
    action: "All operations completed.",
    done: true,
  });

  return trace;
}
