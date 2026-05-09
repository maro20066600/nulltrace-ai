"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Loader2, ScanSearch, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { PayCTA } from "@/components/monitor/PayCTA";
import type { StoredKeys } from "@/components/monitor/ApiKeyPanel";

type ScanResult = {
  verdict: "hack" | "benign" | "uncertain";
  confidence: number;
  reason: string;
  indicators: string[];
  demoMode: boolean;
};

const CHAINS = ["Ethereum", "Base", "Arbitrum", "Solana", "BSC", "TRON"];

export function TxScanPanel({ keys }: { keys: StoredKeys }) {
  const [txHash, setTxHash] = useState("");
  const [chain, setChain] = useState("Ethereum");
  const [provider, setProvider] = useState<"openai" | "anthropic">("openai");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeKey = provider === "openai" ? keys.openai : keys.anthropic;
  const hasKey = activeKey.length > 6;

  async function handleScan() {
    if (!txHash.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/scan-tx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: txHash.trim(),
          chain,
          provider,
          apiKey: activeKey,
        }),
      });
      const data = (await res.json()) as ScanResult & { error?: string };
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Scan failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <ScanSearch className="h-4 w-4 text-cyan-300" />
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
          AI TX Scanner
        </h2>
        {!hasKey && (
          <span className="ml-auto rounded-full border border-amber-400/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
            Demo mode
          </span>
        )}
      </div>

      {/* TX input */}
      <div className="space-y-3">
        <input
          id="tx-hash-input"
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="0x… transaction hash or address"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
          onKeyDown={(e) => e.key === "Enter" && void handleScan()}
        />

        {/* Chain */}
        <div className="flex flex-wrap gap-1.5">
          {CHAINS.map((c) => (
            <button
              key={c}
              id={`chain-${c.toLowerCase()}`}
              onClick={() => setChain(c)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
                chain === c
                  ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Provider toggle */}
        <div className="flex gap-2">
          {(["openai", "anthropic"] as const).map((p) => (
            <button
              key={p}
              id={`provider-${p}`}
              onClick={() => setProvider(p)}
              className={`flex-1 rounded-lg border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
                provider === p
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-slate-300"
              }`}
            >
              {p === "openai" ? "OpenAI GPT-4o" : "Anthropic Claude"}
            </button>
          ))}
        </div>

        <Button
          id="scan-tx-btn"
          onClick={() => void handleScan()}
          disabled={loading || !txHash.trim()}
          className="w-full"
          size="sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning…
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Scan Transaction
            </>
          )}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Result */}
      {result && !error && (
        <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
          {/* Verdict */}
          <div className="flex items-center gap-3">
            {result.verdict === "hack" && (
              <AlertTriangle className="h-6 w-6 shrink-0 text-rose-400" />
            )}
            {result.verdict === "benign" && (
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
            )}
            {result.verdict === "uncertain" && (
              <HelpCircle className="h-6 w-6 shrink-0 text-amber-400" />
            )}
            <div>
              <div
                className={`font-mono text-lg font-black uppercase ${
                  result.verdict === "hack"
                    ? "text-rose-300"
                    : result.verdict === "benign"
                      ? "text-emerald-300"
                      : "text-amber-300"
                }`}
              >
                {result.verdict === "hack"
                  ? "🔴 Exploit Detected"
                  : result.verdict === "benign"
                    ? "🟢 Benign"
                    : "🟡 Uncertain"}
              </div>
              {result.demoMode && (
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  Demo — add API key for real AI scan
                </p>
              )}
            </div>

            {/* Confidence bar */}
            <div className="ml-auto flex flex-col items-end gap-1">
              <span className="font-mono text-xs text-slate-400">
                {result.confidence}%
              </span>
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.verdict === "hack"
                      ? "bg-rose-400"
                      : result.verdict === "benign"
                        ? "bg-emerald-400"
                        : "bg-amber-400"
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <p className="text-sm leading-relaxed text-slate-300">{result.reason}</p>

          {/* Indicators */}
          {result.indicators?.length > 0 && (
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Indicators
              </p>
              <ul className="space-y-1">
                {result.indicators.map((ind) => (
                  <li key={ind} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <PayCTA compact />
        </div>
      )}
    </GlassCard>
  );
}
