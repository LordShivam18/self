export default function BinaryTreeIndexPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 bg-black">
      <h1 className="text-4xl font-bold mb-6">Binary Tree Visualizations</h1>

      <div className="flex flex-col gap-4 text-lg">
        <a
          className="text-cyan-400 underline hover:text-cyan-200"
          href="/binary-tree/max-depth"
        >
          Maximum Depth of Binary Tree
        </a>

        <a
          className="text-cyan-400 underline hover:text-cyan-200"
          href="/binary-tree/construct-from-pre-in"
        >
          Construct Tree (Preorder + Inorder)
        </a>
      </div>
    </div>
  );
}