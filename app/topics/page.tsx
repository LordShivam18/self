"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  { name: "Array / String", url: "/arrays" },
  { name: "Two Pointers", url: "/two-pointers" },
  { name: "Sliding Window", url: "/sliding-window" },
  { name: "Matrix", url: "/matrix" },
  { name: "Hashmap", url: "/hashmap" },
  { name: "Intervals", url: "/intervals" },
  { name: "Stack", url: "/stack" },
  { name: "Linked List", url: "/linked-list" },
  { name: "Binary Tree (General)", url: "/binary-tree" },
  { name: "Binary Tree BFS", url: "/binary-tree-bfs" },
  { name: "Binary Search Tree", url: "/bst" },
  { name: "Graph (General)", url: "/graph" },
  { name: "Graph BFS", url: "/graph-bfs" },
  { name: "Trie", url: "/trie" },
  { name: "Backtracking", url: "/backtracking" },
  { name: "Divide & Conquer", url: "/divide-conquer" },
  { name: "Kadane's Algorithm", url: "/kadane" },
  { name: "Binary Search", url: "/binary-search" },
  { name: "Heap", url: "/heap" },
  { name: "Bit Manipulation", url: "/bit" },
  { name: "Math", url: "/math" },
  { name: "1D DP", url: "/dp-1d" },
  { name: "Multidimensional DP", url: "/dp-2d" }
];

export default function Topics() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Choose a Topic
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {topics.map((topic) => (
          <Link key={topic.url} href={topic.url}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                bg-white 
                shadow-lg 
                rounded-xl 
                p-6 
                text-center 
                text-lg 
                font-semibold 
                cursor-pointer 
                border 
                border-gray-200
                hover:shadow-2xl
                hover:bg-gray-50
                text-gray-800
              "
            >
              {topic.name}
            </motion.div>
          </Link>
        ))}

      </div>
    </div>
  );
}
