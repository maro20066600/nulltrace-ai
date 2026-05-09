import type { Chain } from "@/lib/types";

export function ChainBadge({ chain }: { chain: Chain }) {
  return (
    <span className="inline-flex items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100">
      {chain}
    </span>
  );
}
