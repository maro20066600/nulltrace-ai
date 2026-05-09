export function NetworkGlobe() {
  const nodes = [
    "left-[18%] top-[30%]",
    "left-[62%] top-[22%]",
    "left-[74%] top-[58%]",
    "left-[32%] top-[70%]",
    "left-[48%] top-[45%]",
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]">
      <div className="absolute inset-4 rounded-full border border-cyan-200/25 shadow-[inset_0_0_60px_rgba(0,255,209,.12),0_0_80px_rgba(0,255,209,.14)]" />
      <div className="globe-ring absolute inset-10 rounded-full border border-cyan-200/20" />
      <div className="globe-ring-slow absolute inset-20 rounded-full border border-rose-300/20" />
      <div className="absolute left-1/2 top-1/2 h-[1px] w-[86%] -translate-x-1/2 bg-cyan-200/20" />
      <div className="absolute left-1/2 top-1/2 h-[86%] w-[1px] -translate-y-1/2 bg-cyan-200/20" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,209,.2),transparent_45%)]" />
      {nodes.map((className, index) => (
        <span
          key={className}
          className={`absolute ${className} h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(0,255,209,.9)]`}
          style={{ animation: `pulse ${1.4 + index * 0.2}s infinite` }}
        />
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-black/55 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-xl">
        17 chains indexed
      </div>
    </div>
  );
}
