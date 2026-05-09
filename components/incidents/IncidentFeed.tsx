"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { SearchFilters } from "@/components/incidents/SearchFilters";
import { GlassCard } from "@/components/ui/GlassCard";
import { PulsingDot } from "@/components/ui/PulsingDot";
import { liveAlerts } from "@/lib/mock-data/incidents";
import { getUnifiedFeed } from "@/lib/feed";
import { useNullTraceStore } from "@/lib/store/useStore";

const allIncidents = getUnifiedFeed();

export function IncidentFeed() {
  const { query, severity, chain } = useNullTraceStore();
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return allIncidents.filter((incident) => {
      const matchesQuery =
        !normalized ||
        `${incident.protocol} ${incident.category} ${incident.summary} ${incident.attackVector}`
          .toLowerCase()
          .includes(normalized);
      const matchesSeverity = severity === "ALL" || incident.severity === severity;
      const matchesChain = chain === "ALL" || incident.chain === chain || incident.secondaryChains?.includes(chain);
      return matchesQuery && matchesSeverity && matchesChain;
    });
  }, [chain, query, severity]);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              <PulsingDot className="text-cyan-300" />
              Live incident feed
            </div>
            <h1 className="mt-2 text-3xl font-black text-white">Exploit Operations Center</h1>
          </div>
          <div className="rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-rose-100">
            {filtered.length} active dossiers
          </div>
        </div>
        <SearchFilters />
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((incident, index) => (
              <IncidentCard key={incident.id} incident={incident} index={index} />
            ))}
          </AnimatePresence>
        </div>
        <aside className="space-y-4">
          <GlassCard className="p-5">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              Incoming alerts
            </h2>
            <div className="mt-4 space-y-3">
              {liveAlerts.map((alert, index) => (
                <motion.div
                  key={alert}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.16, repeat: Infinity, repeatDelay: 8 }}
                  className="rounded-md border border-white/10 bg-black/30 p-3 text-sm leading-6 text-slate-300"
                >
                  <span className="mr-2 text-cyan-300">0{index + 1}</span>
                  {alert}
                </motion.div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              Threat taxonomy
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                ["Bridge Exploit", "11"],
                ["Liquidity Drain", "7"],
                ["Hot Wallet Compromise", "1"],
                ["Owner Permission Phishing", "1"],
                ["Oracle Manipulation", "6"],
              ].map(([item, count]) => (
                  <div key={item} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item}</span>
                    <span className="font-mono text-cyan-200">{count}</span>
                  </div>
                ),
              )}
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}
