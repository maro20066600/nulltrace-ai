"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { TerminalText } from "@/components/ui/TerminalText";
import { ThreatTicker } from "@/components/landing/ThreatTicker";
import { NetworkGlobe } from "@/components/landing/NetworkGlobe";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <CyberGrid />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          {/* Solana-first badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-rose-100">
              <ShieldAlert className="h-4 w-4" />
              AI exploit monitoring · live
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#9945FF]/40 bg-[#9945FF]/10 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#C4A3FF]">
              <span className="h-2 w-2 rounded-full bg-[#9945FF] shadow-[0_0_6px_#9945FF]" />
              Solana-first
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#FF4FC8]/30 bg-[#FF4FC8]/10 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FF9EE5]">
              x402 payments
            </span>
          </motion.div>

          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            <TerminalText text="AI agents tracking Solana exploits in real time." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            From exploit to forensic breakdown in under 60 seconds. NullTrace ingests on-chain signals
            across Solana, EVM, and cross-chain bridges — then delivers AI-generated incident dossiers
            anyone can understand. Pay for instant reports with SOL via x402.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/incidents">
                View Incidents
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/analysis">
                <Activity className="h-5 w-5" />
                Unlock Paid Analysis
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/10 py-5"
          >
            {[
              ["$285M+", "Solana losses tracked"],
              ["60+", "chains via LI.FI bridge"],
              ["<60s", "exploit-to-briefing"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-mono text-2xl font-black text-cyan-200">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* LI.FI + x402 integration badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">integrations:</span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold text-[#FF4FC8]">
              LI.FI Cross-Chain
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold text-[#14F195]">
              x402 · Solana Pay
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold text-cyan-300">
              OpenAI GPT-4o
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-300">
              Anthropic Claude
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <NetworkGlobe />
        </motion.div>
      </div>
      <ThreatTicker />
    </section>
  );
}
