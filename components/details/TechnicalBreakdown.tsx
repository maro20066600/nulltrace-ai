import { AlertTriangle, Code2, Route, ShieldCheck, Wallet, Wrench } from "lucide-react";
import type { Incident } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";

const trustedVolumesExtractedAssets = [
  "1,291.16 WETH",
  "206,282 USDT",
  "16.939 WBTC",
  "1,268,771 USDC",
];

const trustedVolumesEvidence = [
  ["Victim resolver", "0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31"],
  ["Custom RFQ proxy", "0xeEeEEe53033F7227d488ae83a27Bc9A9D5051756"],
  ["Exploiter", "0xC3EBDdEa4f69df717a8f5c89e7cF20C1c0389100"],
  ["Exploit tx", "0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513"],
];

export function TechnicalBreakdown({ incident }: { incident: Incident }) {
  const isTrustedVolumes = incident.id === "trustedvolumes-resolver-exploit";

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3">
        <Code2 className="h-6 w-6 text-cyan-200" />
        <h2 className="text-xl font-bold text-white">Technical Breakdown</h2>
      </div>
      {isTrustedVolumes ? (
        <div className="mt-6 space-y-5">
          <div className="rounded-lg border border-rose-400/25 bg-rose-500/10 p-5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-rose-100">
              <AlertTriangle className="h-4 w-4" />
              ongoing exploit technical readout
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              The alert indicates an active exploit against a TrustedVolumes resolver used in the 1inch market
              maker/resolver flow. Current evidence points to a TrustedVolumes-controlled custom RFQ swap proxy as the
              likely vulnerable execution surface. This is tracked as a different vulnerability from the March 2025
              1inch Fusion V1 incident, while preserving operator-overlap as an attribution lead.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <section className="rounded-md border border-white/10 bg-black/25 p-4">
              <Route className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Attack path hypothesis
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">
                Exploiter interacts with the resolver/proxy path, abuses swap execution assumptions, then extracts
                liquid assets from the resolver-controlled flow.
              </p>
            </section>
            <section className="rounded-md border border-white/10 bg-black/25 p-4">
              <Wallet className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Extracted assets
              </h3>
              <div className="mt-2 space-y-1.5 text-base text-slate-300">
                {trustedVolumesExtractedAssets.map((asset) => (
                  <p key={asset}>{asset}</p>
                ))}
              </div>
            </section>
            <section className="rounded-md border border-white/10 bg-black/25 p-4">
              <ShieldCheck className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Immediate action
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">
                Isolate resolver permissions, revoke unsafe proxy routes, monitor exploiter outflows, and notify
                liquidity partners before broader routing resumes.
              </p>
            </section>
          </div>

          <section>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Evidence map
            </h3>
            <div className="mt-3 grid gap-2">
              {trustedVolumesEvidence.map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-black/35 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <code className="mt-2 block break-all font-mono text-sm text-cyan-100">{value}</code>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : null}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <section className="rounded-md border border-white/10 bg-black/25 p-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Attack vector</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-300">{incident.attackVector}</p>
        </section>
        <section className="rounded-md border border-white/10 bg-black/25 p-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">Vulnerability</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-300">{incident.vulnerability}</p>
        </section>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <section>
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Affected contracts
          </h3>
          <div className="mt-3 space-y-2">
            {incident.affectedContracts.map((contract) => (
              <code key={contract} className="block rounded-md border border-white/10 bg-black/35 px-3 py-2.5 text-sm font-bold text-slate-300">
                {contract}
              </code>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
            Mitigation suggestions
          </h3>
          <div className="mt-3 space-y-2">
            {incident.mitigations.map((mitigation) => (
              <div key={mitigation} className="flex gap-2.5 rounded-md border border-white/10 bg-black/25 p-3.5 text-base leading-relaxed text-slate-300">
                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                {mitigation}
              </div>
            ))}
          </div>
        </section>
      </div>
    </GlassCard>
  );
}
