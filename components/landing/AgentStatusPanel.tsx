"use client";

import { motion } from "framer-motion";
import { Bot, FileAudio, Radar, Route } from "lucide-react";
import { agents } from "@/lib/mock-data/agents";
import { GlassCard } from "@/components/ui/GlassCard";
import { PulsingDot } from "@/components/ui/PulsingDot";

const icons = [Radar, Bot, Route, FileAudio];

export function AgentStatusPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {agents.map((agent, index) => {
        const Icon = icons[index];
        return (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08 }}
          >
            <GlassCard className="group h-full p-5">
              <div className="scanline absolute inset-0 opacity-20" />
              <div className="relative flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                  <PulsingDot className="text-cyan-300" />
                  {agent.status}
                </div>
              </div>
              <div className="relative mt-5">
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{agent.activity}</p>
              </div>
              <div className="relative mt-5">
                <div className="mb-2 flex justify-between font-mono text-xs text-slate-400">
                  <span>confidence</span>
                  <span className="text-cyan-200">{agent.confidence}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-300 to-rose-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${agent.confidence}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
