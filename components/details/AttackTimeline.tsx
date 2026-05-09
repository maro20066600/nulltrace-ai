"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";

export function AttackTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-bold text-white">Exploit Timeline</h2>
      <div className="relative mt-6 space-y-6 before:absolute before:left-[17px] before:top-2 before:h-[calc(100%-20px)] before:w-px before:bg-gradient-to-b before:from-cyan-300 before:via-white/20 before:to-rose-400">
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            className="relative flex gap-4"
          >
            <div className="z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-black text-cyan-200">
              <Zap className="h-4 w-4" />
            </div>
            <div className="rounded-md border border-white/10 bg-black/25 p-4">
              <p className="font-mono text-xs text-cyan-200">{event.time}</p>
              <h3 className="mt-1 font-bold text-white">{event.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{event.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
