export function CyberGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,.09)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />
      <div className="absolute inset-x-[-10%] bottom-[-28%] h-[58%] rotate-180 bg-[linear-gradient(rgba(255,45,85,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,.14)_1px,transparent_1px)] bg-[size:44px_44px] opacity-60 [transform:perspective(540px)_rotateX(62deg)]" />
      <div className="scanline absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[120px]" />
      <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-[110px]" />
    </div>
  );
}
