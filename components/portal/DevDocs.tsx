import { FileCode2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const endpoints = [
  {
    name: "/analyze-wallet",
    body: '{ "wallet": "7bF...9Qx", "chain": "solana" }',
    response: '{ "risk": 94, "labels": ["attacker-adjacent", "bridge-exit"], "paid": true }',
  },
  {
    name: "/analyze-transaction",
    body: '{ "tx": "5f4K...Tx9", "includeTrace": true }',
    response: '{ "attackVector": "oracle-manipulation", "confidence": 0.92 }',
  },
  {
    name: "/threat-score",
    body: '{ "contract": "BridgeEscrow7...pLx" }',
    response: '{ "score": 87, "classification": "cross-chain exploit risk" }',
  },
  {
    name: "/wallet-risk",
    body: '{ "wallet": "Astra911...Nul" }',
    response: '{ "score": 78, "indicators": ["fresh funding", "mixer proximity"] }',
  },
];

export function DevDocs() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3">
        <FileCode2 className="h-6 w-6 text-cyan-200" />
        <div>
          <h2 className="text-xl font-bold text-white">Automation Examples</h2>
          <p className="text-sm text-slate-500">Optional technical examples for teams that want to automate paid analysis</p>
        </div>
      </div>
      <div className="mt-6 rounded-lg border border-white/10 bg-black/35 p-4">
        <p className="text-sm leading-6 text-slate-300">
          Premium analysis can also be automated. A paid request receives a payment challenge, the team submits a
          Solana USDC proof, and NullTrace returns the unlocked forensic result.
        </p>
      </div>
      <div className="mt-5 grid gap-4">
        {endpoints.map((endpoint) => (
          <section key={endpoint.name} className="rounded-lg border border-white/10 bg-black/25 p-4">
            <h3 className="font-mono text-cyan-100">{endpoint.name}</h3>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <pre className="overflow-x-auto rounded-md bg-black/50 p-3 text-xs text-slate-300">
                <code>{`POST ${endpoint.name}\nAuthorization: Bearer nt_live_x402...\nX-Payment: solana-usdc-proof\n\n${endpoint.body}`}</code>
              </pre>
              <pre className="overflow-x-auto rounded-md bg-black/50 p-3 text-xs text-slate-300">
                <code>{endpoint.response}</code>
              </pre>
            </div>
          </section>
        ))}
      </div>
    </GlassCard>
  );
}
