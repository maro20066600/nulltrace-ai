"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Binary, Fingerprint, ScanSearch, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import type { LabResult } from "@/lib/types";

function deriveResult(seed: string): LabResult {
  const signal = seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const score = 42 + (signal % 55);
  return {
    score,
    probability: Math.min(97, score + 7),
    classification: score > 82 ? "Critical exploit proximity" : score > 68 ? "Elevated attacker adjacency" : "Monitored anomaly",
    indicators: [
      "Fresh wallet funded through high-risk bridge corridor",
      "Program interaction pattern overlaps with known drain scripts",
      "Unusual token approval fan-out detected",
      "Funds fragmented into low-age recipient wallets",
    ],
    matchedPatterns: ["Signer compromise staging", "Bridge exit laundering", "Oracle window probing"],
  };
}

export function ThreatSimulation() {
  const [wallet, setWallet] = useState("7bF3Nq9xAstra911NullTrace");
  const [tx, setTx] = useState("5f4KTx9OracleDeviationRoute");
  const [contract, setContract] = useState("BridgeEscrow7pLx");
  const [scanning, setScanning] = useState(false);
  const [seed, setSeed] = useState(`${wallet}${tx}${contract}`);
  const result = useMemo(() => deriveResult(seed), [seed]);

  const runScan = () => {
    setScanning(true);
    window.setTimeout(() => {
      setSeed(`${wallet}${tx}${contract}${Date.now()}`);
      setScanning(false);
    }, 1200);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <GlassCard className="p-6">
        <div className="flex items-center gap-3">
          <ScanSearch className="h-6 w-6 text-cyan-200" />
          <div>
            <h1 className="text-2xl font-black text-white">Threat Simulation Lab</h1>
            <p className="text-sm text-slate-500">AI risk scoring for wallets, transactions, and contracts</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Wallet address</span>
            <Input value={wallet} onChange={(event) => setWallet(event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Transaction hash</span>
            <Input value={tx} onChange={(event) => setTx(event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Contract address</span>
            <Input value={contract} onChange={(event) => setContract(event.target.value)} />
          </label>
          <Button className="w-full" onClick={runScan} disabled={scanning}>
            {scanning ? "Scanning threat surface..." : "Run AI Simulation"}
          </Button>
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <div className="scanline absolute inset-0 opacity-20" />
        <div className="relative grid gap-6 xl:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-white/10 bg-black/35 p-5 text-center">
            <ShieldAlert className="mx-auto h-8 w-8 text-rose-200" />
            <motion.div
              key={result.score}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mx-auto mt-5 grid h-44 w-44 place-items-center rounded-full border border-rose-400/35 bg-rose-500/10"
            >
              <div className="absolute inset-4 rounded-full border border-cyan-300/20" />
              <span className="font-mono text-5xl font-black text-white">{result.score}</span>
            </motion.div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100">AI risk score</p>
            <p className="mt-2 text-sm font-bold text-rose-100">{result.classification}</p>
          </div>
          <div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md border border-white/10 bg-black/25 p-4">
                <Binary className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Exploit probability</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full bg-rose-400" animate={{ width: `${result.probability}%` }} />
                </div>
                <p className="mt-2 font-mono text-xl text-white">{result.probability}%</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/25 p-4">
                <Fingerprint className="h-5 w-5 text-cyan-200" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Threat classification</p>
                <p className="mt-3 text-lg font-bold text-white">{result.classification}</p>
              </div>
            </div>
            <h2 className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Suspicious behavior indicators
            </h2>
            <div className="mt-3 grid gap-2">
              {result.indicators.map((indicator) => (
                <div key={indicator} className="rounded-md border border-white/10 bg-black/25 p-3 text-sm text-slate-300">
                  {indicator}
                </div>
              ))}
            </div>
            <h2 className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Attack pattern matching
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.matchedPatterns.map((pattern) => (
                <span key={pattern} className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
