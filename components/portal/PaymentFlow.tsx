"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CheckCircle2, Coins, FileSearch, LockKeyhole, RadioTower, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { incidents } from "@/lib/mock-data/incidents";
import { useNullTraceStore } from "@/lib/store/useStore";

const demoIncident = incidents[0];
const defaultContract = demoIncident.affectedContracts[0];
const steps = ["contract selected", "USDC authorized", "agent running", "report unlocked"];
const agentLogs = [
  "Scout Agent validating recent contract calls",
  "Analyst Agent matching exploit signatures",
  "Forensics Agent tracing wallet and vault movement",
  "OpenAI Technical Breakdown Agent assembling the premium report",
];

type PremiumAgentReport = {
  source: string;
  agent: string;
  report: {
    riskScore: number;
    rootCauseHypothesis: string;
    exploitMechanism: string;
    vulnerableSurface: string;
    recommendedActions: string[];
    executiveSummary: string;
  };
};

export function PaymentFlow() {
  const [contract, setContract] = useState(defaultContract);
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentReport, setAgentReport] = useState<PremiumAgentReport | null>(null);
  const { spendCredits } = useNullTraceStore();

  const pay = () => {
    setPaid(false);
    setProcessing(true);
    setAgentRunning(false);
    setAgentReport(null);

    window.setTimeout(() => {
      spendCredits(18);
      setProcessing(false);
      setAgentRunning(true);
    }, 1100);

    window.setTimeout(async () => {
      const response = await fetch("/api/agents/technical-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incidentId: demoIncident.id, contract }),
      });
      const report = (await response.json()) as PremiumAgentReport;
      setAgentReport(report);
      setAgentRunning(false);
      setPaid(true);
    }, 3600);
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            <Coins className="h-4 w-4" />
            Paid instant report
          </div>
          <h2 className="mt-3 text-2xl font-black text-white">Analyze the first contract address</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            This demo starts with the first contract address from the new investigation. Pay once, the agents run, and
            a premium report appears immediately.
          </p>
        </div>
        <div className="rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 font-mono text-cyan-100">
          0.42 USDC
        </div>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          Contract address
        </span>
        <Input value={contract} onChange={(event) => setContract(event.target.value)} />
      </label>
      <div className="mt-3 rounded-md border border-white/10 bg-black/35 p-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Selected contract</p>
        <code className="mt-2 block break-all font-mono text-sm text-cyan-100">{contract}</code>
      </div>

      <div className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">
        We are still investigating this incident. The preliminary page is free now. If you want the instant forensic
        report, pay to run the agents. If you choose free access, the full report unlocks after 24 hours.
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => {
          const active = paid || processing || agentRunning || index === 0;
          return (
            <div key={step} className="rounded-md border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                {active ? (
                  <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                ) : (
                  <RadioTower className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{step}</p>
            </div>
          );
        })}
      </div>

      <Button className="mt-6 w-full" onClick={pay} disabled={processing || agentRunning}>
        <LockKeyhole className="h-4 w-4" />
        {processing
          ? "Confirming Solana payment..."
          : agentRunning
            ? "Agents are generating the report..."
            : paid
              ? "Run Again"
              : "Pay & Run Agents"}
      </Button>

      <AnimatePresence>
        {agentRunning ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              <Bot className="h-4 w-4" />
              Agent execution live
            </div>
            <div className="mt-4 grid gap-2">
              {agentLogs.map((log, index) => (
                <motion.div
                  key={log}
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: [0.35, 1, 0.55] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.18 }}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-black/30 p-3 text-sm text-slate-200"
                >
                  <ScanLine className="h-4 w-4 text-cyan-200" />
                  {log}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}

        {paid ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-5 text-sm text-cyan-50 shadow-[0_0_42px_rgba(0,255,209,.15)]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
              instant report ready · tx 5sP...x402 · finalized
            </span>
            <h3 className="mt-3 flex items-center gap-2 text-xl font-black text-white">
              <FileSearch className="h-5 w-5 text-cyan-200" />
              Demo Premium Report
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-white/10 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Risk score</p>
                <p className="mt-1 font-mono text-2xl text-rose-200">{agentReport?.report.riskScore || 83}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Classification</p>
                <p className="mt-1 font-bold text-white">Resolver / RFQ proxy exploit</p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Evidence</p>
                <p className="mt-1 font-bold text-white">1 exploit tx · 1 exploiter · 4 assets</p>
              </div>
            </div>
            <p className="mt-4 leading-6 text-slate-200">
              {agentReport?.report.executiveSummary ||
                "The victim resolver is linked to a TrustedVolumes-controlled custom RFQ swap proxy. The live demo report traces the exploit transaction, exploiter address, and extracted WETH, USDT, WBTC, and USDC balances."}
            </p>
            <div className="mt-4 rounded-md border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                {agentReport?.agent || "OpenAI Technical Breakdown Agent"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {agentReport?.report.rootCauseHypothesis || demoIncident.rootCause}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GlassCard>
  );
}
