import Link from "next/link";
import { Clock, LockKeyhole, ShieldAlert } from "lucide-react";
import type { Incident } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

export function InvestigationAccessNotice({ incident }: { incident: Incident }) {
  if (incident.id !== "trustedvolumes-resolver-exploit") {
    return null;
  }

  return (
    <GlassCard className="border-amber-300/20 bg-amber-300/[0.07] p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-amber-300/25 bg-amber-300/10 text-amber-100">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
              Investigation mode · free preliminary demo
            </p>
            <h2 className="mt-2 text-xl font-black text-white">We are still verifying this contract activity.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              This page is the free public view from a few hours ago. The instant forensic report runs the agents now
              and requires payment. If you choose free access, the full report unlocks automatically after 24 hours.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/25 px-3 py-2 text-slate-300">
                <Clock className="h-4 w-4 text-cyan-200" />
                Free full report in 24h
              </span>
              <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-cyan-100">
                Contract: {incident.affectedContracts[0].slice(0, 14)}...
              </span>
            </div>
          </div>
        </div>
        <Button asChild>
          <Link href="/analysis">
            <LockKeyhole className="h-4 w-4" />
            Pay for Instant Report
          </Link>
        </Button>
      </div>
    </GlassCard>
  );
}
