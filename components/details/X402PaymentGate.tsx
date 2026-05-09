"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import type { Incident } from "@/lib/types";

const SOL_PRICE_USD = 155; // demo price
const REPORT_PRICE_USD = 49;
const SOL_AMOUNT = (REPORT_PRICE_USD / SOL_PRICE_USD).toFixed(4);
const DEMO_WALLET = "NuLLTr4ceA1Ffmn5xRnGsXbNT9jzP2wQkQ3HJsKABc";

type PayState = "idle" | "waiting" | "confirming" | "confirmed";

export function X402PaymentGate({ incident }: { incident: Incident }) {
  const [payState, setPayState] = useState<PayState>("idle");
  const [copied, setCopied] = useState(false);

  const isLocked =
    incident.id === "trustedvolumes-resolver-exploit" || incident.status === "MONITORING";

  if (!isLocked) return null;

  function copyAddress() {
    void navigator.clipboard.writeText(DEMO_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function startPayment() {
    setPayState("waiting");
    await new Promise((r) => setTimeout(r, 2000));
    setPayState("confirming");
    await new Promise((r) => setTimeout(r, 2500));
    setPayState("confirmed");
  }

  return (
    <GlassCard className="border-amber-300/20 bg-amber-300/[0.05] p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-amber-300/25 bg-amber-300/10 text-amber-100">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            Instant Forensic Report · x402 on Solana
          </p>
          <h2 className="mt-1 text-xl font-black text-white">
            Unlock the full AI-generated breakdown
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Pay once with SOL via x402 — the machine-to-machine payment protocol on Solana. Full
            wallet trace, fund flow graph, exploit PoC, and PDF export unlocked instantly.
          </p>
        </div>
      </div>

      {/* x402 Badge */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-[#9945FF] shadow-[0_0_6px_#9945FF]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C4A3FF]">
            HTTP 402 · x402 Protocol
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Powered by Solana
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {payState === "confirmed" ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-center space-y-3"
          >
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <p className="font-mono text-sm font-bold uppercase tracking-wider text-emerald-300">
              Payment Confirmed via x402
            </p>
            <p className="text-xs text-slate-400">
              {SOL_AMOUNT} SOL received on-chain · Full forensic report unlocked
            </p>
            <Button asChild className="w-full">
              <a href="#ai-breakdown">
                <Zap className="h-4 w-4" />
                View Full Report
              </a>
            </Button>
          </motion.div>
        ) : payState === "waiting" || payState === "confirming" ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-[#9945FF]/30 bg-[#9945FF]/10 p-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-[#9945FF]" />
              <p className="font-mono text-sm font-bold text-[#C4A3FF]">
                {payState === "waiting" ? "Waiting for Solana transaction…" : "Confirming via x402 protocol…"}
              </p>
            </div>

            {/* Demo QR */}
            <div className="flex items-center gap-5">
              <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#9945FF]/50 font-mono text-[8px] leading-tight text-[#9945FF]">
                <div className="grid grid-cols-3 gap-0.5 p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-[1px]"
                      style={{ background: Math.random() > 0.4 ? "#9945FF" : "transparent" }}
                    />
                  ))}
                </div>
                SOL PAY
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Amount</p>
                <p className="font-mono text-2xl font-black text-white">{SOL_AMOUNT} <span className="text-base text-[#9945FF]">SOL</span></p>
                <p className="font-mono text-[10px] text-slate-400">≈ ${REPORT_PRICE_USD} USD</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/40 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">To address</p>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 truncate font-mono text-xs text-cyan-200">{DEMO_WALLET}</code>
                <button onClick={copyAddress} className="text-slate-500 hover:text-cyan-300 transition">
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="idle" className="space-y-3">
            {/* What you get */}
            <div className="grid grid-cols-2 gap-2">
              {[
                "Full wallet flow graph",
                "Exploit PoC breakdown",
                "Fund tracing report",
                "PDF export + API",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  {f}
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                id="x402-pay-btn"
                onClick={() => void startPayment()}
                className="flex-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-black hover:opacity-90"
              >
                <Zap className="h-4 w-4" />
                Pay {SOL_AMOUNT} SOL · Instant Report
              </Button>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-xs text-slate-400">Free in 24h</span>
              </div>
            </div>

            <p className="font-mono text-[10px] text-center uppercase tracking-wider text-slate-600">
              x402 · HTTP 402 payment required · Solana Mainnet · Demo mode
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
