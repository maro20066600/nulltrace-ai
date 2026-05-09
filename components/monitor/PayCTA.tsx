"use client";

import Link from "next/link";
import { CreditCard, Zap } from "lucide-react";

export function PayCTA({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Link
        href="/analysis"
        id="pay-instant-report-cta"
        className="group flex items-center justify-between gap-3 rounded-lg border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-rose-500/10 p-3 transition-all hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(245,158,11,.15)]"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 shrink-0 text-amber-400" />
          <span className="text-sm font-semibold text-amber-200">
            Pay for Instant Forensic Report
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-amber-400/30 bg-amber-500/20 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-300">
          $49
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/analysis"
      id="pay-instant-report-banner"
      className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-950/60 to-rose-950/40 px-6 py-4 transition-all hover:border-amber-400/60 hover:shadow-[0_0_48px_rgba(245,158,11,.18)]"
    >
      {/* Animated pulse border */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-amber-400/20 animate-pulse" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition group-hover:bg-amber-500/20" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-500/15">
          <CreditCard className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <p className="font-semibold text-amber-100">
            ⚡ Pay for Instant Forensic Report
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            Full transaction trace · Wallet clustering · Fund flow graph · PDF export
          </p>
        </div>
      </div>

      <div className="relative flex shrink-0 flex-col items-end gap-1">
        <span className="rounded-md border border-amber-400/40 bg-amber-500/25 px-3 py-1 font-mono text-sm font-black text-amber-200">
          $49 / report
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Instant delivery
        </span>
      </div>
    </Link>
  );
}
