"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Gauge } from "lucide-react";
import type { Incident } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";

export function AIBreakdown({ incident }: { incident: Incident }) {
  const isInvestigating = incident.id === "trustedvolumes-resolver-exploit";

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {isInvestigating ? "Preliminary AI Breakdown" : "AI Generated Breakdown"}
          </h2>
          <p className="text-sm text-slate-500">
            {isInvestigating
              ? "Free demo view while agents continue verification"
              : "Reporter Agent synthesis with forensic confidence scoring"}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_220px]">
        <div className="space-y-5">
          <section>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Attack explanation
            </h3>
            <p className="mt-2 leading-7 text-slate-300">{incident.attackExplanation}</p>
          </section>
          <section>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Root cause analysis
            </h3>
            <p className="mt-2 leading-7 text-slate-300">{incident.rootCause}</p>
          </section>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-5 text-center">
          <Gauge className="mx-auto h-6 w-6 text-cyan-200" />
          <div className="relative mx-auto mt-4 grid h-32 w-32 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/5">
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-cyan-300"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: `inset(${100 - incident.confidence}% 0 0 0)` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
            />
            <span className="font-mono text-3xl font-black text-white">{incident.confidence}</span>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">confidence score</p>
          <p className="mt-2 text-sm font-bold text-rose-200">{incident.riskLevel}</p>
        </div>
      </div>
    </GlassCard>
  );
}
