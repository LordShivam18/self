"use client";

import Link from "next/link";

export default function LinkedListTopics() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10 gap-8">

      <h1 className="text-4xl font-bold">Linked List</h1>
      <p className="opacity-70">Choose a subtopic</p>

      <div className="flex flex-col gap-6 w-full max-w-xl">

        {/* Cycle Detection */}
        <Link href="/linked-list/cycle">
          <button className="
            w-full py-4 rounded-xl text-lg font-medium
            bg-[#013b47] border border-[#0ff]
            shadow-[0_0_15px_#00eaff55]
            hover:bg-[#024b58] transition
          ">
            Cycle Detection (Floyd’s Algorithm)
          </button>
        </Link>

        {/* Add Two Numbers */}
        <Link href="/linked-list/add-two-numbers">
          <button className="
            w-full py-4 rounded-xl text-lg font-medium
            bg-[#1f1f1f] hover:bg-[#242424]
            border border-[#333]
            transition
          ">
            Add Two Numbers
          </button>
        </Link>

        {/* Merge Two Sorted Lists */}
        <Link href="/linked-list/merge-two-sorted-lists">
          <button className="
            w-full py-4 rounded-xl text-lg font-medium
            bg-[#1f1f1f] hover:bg-[#242424]
            border border-[#333]
            transition
          ">
            Merge Two Sorted Lists
          </button>
        </Link>

        {/* ⭐ NEW: Reverse Nodes in k-Group (Hard) */}
        <Link href="/linked-list/reverse-k-group">
          <button className="
            w-full py-4 rounded-xl text-lg font-medium
            bg-[#200f0f] hover:bg-[#2a1414]
            border border-[#ff4444aa]
            shadow-[0_0_18px_#ff444455]
            transition
          ">
            Reverse Nodes in <span className="text-red-400 font-bold">k</span>-Group
          </button>
        </Link>

      </div>

    </div>
  );
}
