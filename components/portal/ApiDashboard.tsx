import { Activity, Gauge, History, Timer } from "lucide-react";
import { apiHistory } from "@/lib/mock-data/api";
import { GlassCard } from "@/components/ui/GlassCard";

export function ApiDashboard() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 text-cyan-200" />
        <h2 className="text-xl font-bold text-white">Paid Analysis Workspace</h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          [History, "reports unlocked", "18,420"],
          [Gauge, "Threat scans", "9,114"],
          [Timer, "p95 latency", "690ms"],
          [Activity, "credit usage", "63%"],
        ].map(([Icon, label, value]) => {
          const LucideIcon = Icon as typeof Activity;
          return (
            <div key={String(label)} className="rounded-md border border-white/10 bg-black/25 p-4">
              <LucideIcon className="h-5 w-5 text-cyan-200" />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{String(label)}</p>
              <p className="mt-1 font-mono text-2xl text-white">{String(value)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Analysis type</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Credits</th>
              <th className="px-4 py-3">Ready in</th>
            </tr>
          </thead>
          <tbody>
            {apiHistory.map((item) => (
              <tr key={`${item.endpoint}-${item.target}`} className="border-t border-white/10 text-slate-300">
                <td className="px-4 py-3 font-mono text-cyan-100">{item.endpoint}</td>
                <td className="px-4 py-3">{item.target}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3">{item.credits}</td>
                <td className="px-4 py-3">{item.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
