import { liveAlerts } from "@/lib/mock-data/incidents";

export function ThreatTicker() {
  const alerts = [...liveAlerts, ...liveAlerts];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/45 py-3 backdrop-blur-xl">
      <div className="ticker flex w-max items-center gap-10 whitespace-nowrap">
        {alerts.map((alert, index) => (
          <span key={`${alert}-${index}`} className="font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
            <span className="mr-3 text-cyan-300">LIVE ALERT</span>
            {alert}
          </span>
        ))}
      </div>
    </div>
  );
}
