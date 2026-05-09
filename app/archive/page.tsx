"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Archive, Search } from "lucide-react";
import { ChainBadge } from "@/components/incidents/ChainBadge";
import { SeverityBadge } from "@/components/incidents/SeverityBadge";
import { Button } from "@/components/ui/button";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { incidents } from "@/lib/mock-data/incidents";

export default function ArchivePage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"severity" | "loss">("loss");
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return incidents
      .filter((incident) => `${incident.protocol} ${incident.category} ${incident.chain}`.toLowerCase().includes(normalized))
      .sort((a, b) => (sort === "loss" ? b.lossValue - a.lossValue : b.severity.localeCompare(a.severity)));
  }, [query, sort]);

  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <GlassCard className="p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                <Archive className="h-4 w-4" />
                Incident archive
              </div>
              <h1 className="mt-2 text-3xl font-black text-white">Searchable Exploit Memory</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search archive" className="pl-10" />
              </label>
              <Button variant="ghost" onClick={() => setSort(sort === "loss" ? "severity" : "loss")}>
                <ArrowUpDown className="h-4 w-4" />
                Sort by {sort === "loss" ? "loss" : "severity"}
              </Button>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="overflow-hidden">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-5 py-4">Protocol</th>
                <th className="px-5 py-4">Severity</th>
                <th className="px-5 py-4">Chain</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Loss</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((incident) => (
                <tr key={incident.id} className="border-t border-white/10 transition hover:bg-cyan-300/5">
                  <td className="px-5 py-4">
                    <Link href={`/incidents/${incident.id}`} className="font-bold text-white hover:text-cyan-200">
                      {incident.protocol}
                    </Link>
                  </td>
                  <td className="px-5 py-4"><SeverityBadge severity={incident.severity} /></td>
                  <td className="px-5 py-4"><ChainBadge chain={incident.chain} /></td>
                  <td className="px-5 py-4 text-slate-300">{incident.category}</td>
                  <td className="px-5 py-4 font-mono text-rose-200">{incident.loss}</td>
                  <td className="px-5 py-4 text-slate-300">{incident.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </main>
  );
}
