export default function MicroscopeView({
  left,
  right,
  cleaned,
}: {
  left: number;
  right: number;
  cleaned: string;
}) {
  return (
    <div className="bg-[#050816] border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 max-w-lg mx-auto shadow-[0_0_25px_rgba(10,20,40,0.6)]">
      <div className="font-semibold text-slate-100 mb-1">Microscope View</div>

      <p className="text-xs">
        Left pointer (L): <span className="text-cyan-300">{left}</span>  
        | Right pointer (R): <span className="text-cyan-300">{right}</span>
      </p>

      <p className="mt-2 font-mono">
        String: <span className="text-cyan-300">"{cleaned}"</span>
      </p>

      <p className="mt-2 text-xs text-slate-400">
        We compare characters at L and R until they cross.
      </p>
    </div>
  );
}
