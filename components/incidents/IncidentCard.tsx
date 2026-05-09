"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, WalletCards } from "lucide-react";
import type { Incident } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChainBadge } from "@/components/incidents/ChainBadge";
import { SeverityBadge } from "@/components/incidents/SeverityBadge";

export function IncidentCard({ incident, index = 0 }: { incident: Incident; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/incidents/${incident.id}`}>
        <GlassCard className="group p-5 transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/[0.065] hover:shadow-[0_24px_90px_rgba(0,255,209,.16)]">
          <div className="absolute right-0 top-0 h-20 w-20 bg-cyan-300/10 blur-2xl transition group-hover:bg-rose-500/20" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-white/10 bg-white/10 font-mono text-lg font-black text-cyan-100 shadow-[inset_0_0_24px_rgba(0,255,209,.08)]">
                {incident.logo}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{incident.protocol}</h3>
                  <SeverityBadge severity={incident.severity} />
                  <ChainBadge chain={incident.chain} />
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{incident.summary}</p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-cyan-200" />
          </div>
          <div className="relative mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Estimated Loss</p>
              <p className="mt-1 font-mono text-lg font-black text-rose-200">{incident.loss}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Category</p>
              <p className="mt-1 text-sm font-semibold text-slate-200">{incident.category}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Detected</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                <Clock className="h-4 w-4 text-cyan-200" />
                {incident.timestamp}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">AI Confidence</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                <WalletCards className="h-4 w-4 text-cyan-200" />
                {incident.confidence}%
              </p>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
