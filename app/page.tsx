"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold mb-4"
      >
        DSA Visualizer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-300 mb-8"
      >
        Understand Data Structures & Algorithms Through Animation
      </motion.p>

      <motion.a
        href="/topics"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-xl"
      >
        Continue →
      </motion.a>
    </div>
  );
}
