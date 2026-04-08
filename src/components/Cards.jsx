export default function Card() {
  return (
    <div className="w-[360px] bg-[#16181f] rounded-2xl border border-white/10 overflow-hidden font-sans">

      {/* ── Photo area ─────────────────────────────── */}
      <div className="relative w-full h-48 bg-[#1e2029] overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-[#262a36]" />

        {/* gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#16181f] to-transparent z-10" />

        {/* online badge */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 h-[26px] rounded-full bg-emerald-400/10 border border-emerald-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="w-9 h-2 rounded bg-emerald-400/20" />
        </div>
      </div>

      {/* ── Card body ──────────────────────────────── */}
      <div className="px-5 pt-3.5 pb-5 space-y-3">

        {/* name + match % */}
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <div className="h-[18px] w-[55%] rounded bg-[#262a36] animate-pulse" />
            <div className="h-[11px] w-[75%] rounded bg-[#262a36] animate-pulse" />
          </div>

          <div className="ml-3 shrink-0 w-[46px] h-[46px] rounded-xl bg-[#1e2029] border border-white/10 flex flex-col items-center justify-center gap-1">
            <div className="w-7 h-3 rounded bg-[#262a36] animate-pulse" />
            <div className="w-5 h-1.5 rounded bg-indigo-400/20" />
          </div>
        </div>

        {/* divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* tech stack */}
        <div>
          <p className="font-mono text-[10px] tracking-widest text-white/25 mb-2">// tech_stack</p>
          <div className="flex flex-wrap gap-1.5">
            {[16, 13, 19, 14, 11].map((w, i) => (
              <div
                key={i}
                className="h-[26px] rounded-lg bg-[#1e2029] border border-white/[0.07] animate-pulse"
                style={{ width: `${w * 4}px`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>

        {/* github stats */}
        <div>
          <p className="font-mono text-[10px] tracking-widest text-white/25 mb-2">// github_stats</p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="bg-[#1e2029] rounded-xl border border-white/[0.07] p-2.5 space-y-1.5"
              >
                <div
                  className="h-3.5 w-[60%] rounded bg-[#262a36] animate-pulse"
                  style={{ animationDelay: `${delay}s` }}
                />
                <div className="h-2 w-[80%] rounded bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </div>

        {/* about / bio */}
        <div>
          <p className="font-mono text-[10px] tracking-widest text-white/25 mb-2">// about</p>
          <div className="space-y-1.5">
            <div className="h-2.5 w-full   rounded bg-[#262a36] animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="h-2.5 w-[88%]  rounded bg-[#262a36] animate-pulse" style={{ animationDelay: "0.1s" }} />
            <div className="h-2.5 w-[62%]  rounded bg-[#262a36] animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>

      </div>
    </div>
  );
}