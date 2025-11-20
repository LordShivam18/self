"use client";

import Link from "next/link";

export default function StackTopics() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10 gap-8">

      <h1 className="text-4xl font-bold">Stack</h1>
      <p className="opacity-70">Choose a subtopic</p>

      <div className="flex flex-col gap-6 w-full max-w-xl">

        {/* Valid Parentheses */}
        <Link href="/stack/valid-parentheses">
          <button className="
            w-full py-4 rounded-xl text-lg font-medium
            bg-[#013b47] border border-[#0ff]
            shadow-[0_0_15px_#00eaff55]
            hover:bg-[#024b58] transition
          ">
            Valid Parentheses
          </button>
        </Link>

      </div>

    </div>
  );
}
