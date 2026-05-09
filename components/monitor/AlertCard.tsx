"use client";

import { ExternalLink } from "lucide-react";
import type { ParsedDefimonAlert } from "@/lib/telegram/defimon-parser";

function chainLabel(protocol: string, summary: string): string {
  if (summary.toLowerCase().includes("base") || protocol.toLowerCase().includes("base")) return "Base";
  if (summary.toLowerCase().includes("arbitrum")) return "Arbitrum";
  if (summary.toLowerCase().includes("solana")) return "Solana";
  if (summary.toLowerCase().includes("bsc")) return "BSC";
  return "Ethereum";
}

function shortAddr(url: string): string {
  const addr = url.split("/").pop() ?? url;
  if (addr.startsWith("0x") && addr.length > 16) {
    return `${addr.slice(0, 8)}…${addr.slice(-6)}`;
  }
  return addr;
}

export function AlertCard({ alert, index }: { alert: ParsedDefimonAlert; index: number }) {
  const chain = chainLabel(alert.protocol, alert.summary);

  const links: { label: string; url: string }[] = [];
  if (alert.tx) links.push({ label: "TX", url: alert.tx });
  if (alert.victim) links.push({ label: "Victim", url: alert.victim });
  if (alert.router) links.push({ label: "Oracle", url: alert.router });
  if (alert.attacker) links.push({ label: "Attacker", url: alert.attacker });
  if (alert.drainedUser) links.push({ label: "Drained", url: alert.drainedUser });

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-rose-500/20 bg-gradient-to-br from-black/60 to-rose-950/20 p-5 backdrop-blur-md transition-all duration-300 hover:border-rose-400/40 hover:shadow-[0_0_40px_rgba(239,68,68,.12)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-rose-500/10 blur-3xl transition group-hover:bg-rose-500/20" />

      {/* Header */}
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-lg">
            🚨
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-white">{alert.protocol}</h3>
              <span className="rounded-full border border-rose-400/30 bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-300">
                {chain}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="text-rose-200 font-bold">{alert.loss}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{alert.date}</span>
            </div>
          </div>
        </div>

        {/* Type badge */}
        <span className="shrink-0 rounded-md border border-amber-400/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300">
          {alert.type}
        </span>
      </div>

      {/* Summary */}
      <p className="relative mt-4 text-sm leading-relaxed text-slate-300 line-clamp-4">
        {alert.summary}
      </p>

      {/* Links */}
      {links.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {links.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-200"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="font-semibold text-slate-400">{label}:</span>
              <span>{shortAddr(url)}</span>
            </a>
          ))}
        </div>
      )}

      {/* Source X link */}
      {alert.sourceUrl && (
        <div className="relative mt-3">
          <a
            href={alert.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 transition hover:text-cyan-300"
          >
            <ExternalLink className="h-3 w-3" />
            View on X / DefimonAlerts
          </a>
        </div>
      )}
    </article>
  );
}
