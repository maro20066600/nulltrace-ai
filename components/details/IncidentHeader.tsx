import { Activity, Crosshair, ShieldAlert } from "lucide-react";
import type { Incident } from "@/lib/types";
import { ChainBadge } from "@/components/incidents/ChainBadge";
import { SeverityBadge } from "@/components/incidents/SeverityBadge";
import { GlassCard } from "@/components/ui/GlassCard";

export function IncidentHeader({ incident }: { incident: Incident }) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-5">
          <div className="grid h-16 w-16 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 font-mono text-2xl font-black text-cyan-100">
            {incident.logo}
          </div>
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <SeverityBadge severity={incident.severity} />
              <ChainBadge chain={incident.chain} />
              <span className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100">
                {incident.category}
              </span>
              <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-200">
                {incident.status}
              </span>
            </div>
            <h1 className="text-4xl font-black text-white">{incident.protocol}</h1>
            <p className="mt-3 max-w-3xl text-slate-400">{incident.summary}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:w-[460px]">
          {[
            [ShieldAlert, "Loss", incident.loss],
            [Crosshair, "Risk", incident.riskLevel],
            [Activity, "Confidence", `${incident.confidence}%`],
          ].map(([Icon, label, value]) => {
            const LucideIcon = Icon as typeof ShieldAlert;
            return (
              <div key={String(label)} className="rounded-md border border-white/10 bg-black/25 p-4">
                <LucideIcon className="h-4 w-4 text-cyan-200" />
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-slate-500">{String(label)}</p>
                <p className="mt-1 text-sm font-bold text-white">{String(value)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
