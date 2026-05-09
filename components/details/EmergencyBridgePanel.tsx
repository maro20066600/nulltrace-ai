"use client";

import { useState } from "react";
import { ExternalLink, ShieldAlert, Wallet } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Chain } from "@/lib/types";

const CHAIN_LIFI_MAP: Record<string, { id: number; name: string; key: string }> = {
  Ethereum: { id: 1, name: "Ethereum", key: "ETH" },
  Base: { id: 8453, name: "Base", key: "BASE" },
  Arbitrum: { id: 42161, name: "Arbitrum", key: "ARB" },
  Solana: { id: 1151111081099710, name: "Solana", key: "SOL" },
  BSC: { id: 56, name: "BNB Chain", key: "BSC" },
  TRON: { id: 728126428, name: "Tron", key: "TRX" },
};

const SAFE_CHAINS = ["Ethereum", "Base", "Arbitrum"];

function QRPlaceholder({ chain }: { chain: string }) {
  const colors: Record<string, string> = {
    Ethereum: "#627EEA",
    Base: "#0052FF",
    Arbitrum: "#28A0F0",
    Solana: "#9945FF",
    BSC: "#F3BA2F",
  };
  const color = colors[chain] ?? "#00FFD1";
  return (
    <div
      className="flex h-32 w-32 items-center justify-center rounded-xl border-2 border-dashed text-center text-[9px] leading-tight font-mono uppercase"
      style={{ borderColor: color, color }}
    >
      LI.FI
      <br />
      Bridge
      <br />
      QR
    </div>
  );
}

export function EmergencyBridgePanel({ chain }: { chain: Chain }) {
  const [toChain, setToChain] = useState("Ethereum");

  const fromInfo = CHAIN_LIFI_MAP[chain];
  const toInfo = CHAIN_LIFI_MAP[toChain];

  const lifiWidgetUrl = fromInfo && toInfo
    ? `https://transferto.xyz/swap/${fromInfo.key}-USDC/${toInfo.key}-USDC`
    : "https://li.fi";

  const safeAlternatives = SAFE_CHAINS.filter((c) => c !== chain);

  return (
    <GlassCard className="overflow-hidden border-amber-400/20 p-0">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-amber-400/15 bg-amber-500/5 px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-500/15">
          <ShieldAlert className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
            Emergency Bridge
          </p>
          <p className="text-sm font-semibold text-white">Move funds off {chain}</p>
        </div>
        {/* LI.FI badge */}
        <div className="ml-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
          <span className="font-mono text-[10px] font-bold text-white">Powered by</span>
          <span className="font-mono text-[10px] font-black text-[#FF4FC8]">LI.FI</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs leading-relaxed text-slate-400">
          If your assets are at risk on <span className="font-semibold text-amber-200">{chain}</span>, bridge
          them to a safer chain immediately via LI.FI — the cross-chain aggregator covering 60+ chains and all
          major Solana bridges.
        </p>

        {/* From/To selector */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-rose-400/20 bg-rose-500/10 p-3 text-center">
            <p className="font-mono text-[10px] uppercase tracking-wider text-rose-400">From (at risk)</p>
            <p className="mt-1 font-mono text-sm font-bold text-white">{chain}</p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Bridge to</p>
            <div className="flex flex-wrap gap-1">
              {safeAlternatives.map((c) => (
                <button
                  key={c}
                  onClick={() => setToChain(c)}
                  className={`rounded-md border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition ${
                    toChain === c
                      ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200"
                      : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Route info */}
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Best Route via LI.FI</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {chain} → {toChain}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-slate-400">
              Mayan Swift • Across • Glacis aggregated
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Est. Fee</p>
            <p className="mt-1 font-mono text-sm font-bold text-emerald-300">~$0.50</p>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <a
            href={lifiWidgetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF4FC8] to-[#9945FF] px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(255,79,200,.25)] transition hover:shadow-[0_0_40px_rgba(255,79,200,.4)]"
          >
            <Wallet className="h-4 w-4" />
            Open LI.FI Bridge
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="text-center font-mono text-[9px] uppercase tracking-wider text-slate-600">
            60+ chains · gasless swaps on Solana · Jito bundles
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          {[["60+", "Chains"], ["$2B+", "Volume"], ["20+", "Bridges"]].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-mono text-sm font-black text-white">{v}</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
