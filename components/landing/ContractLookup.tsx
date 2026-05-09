"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Eye,
  EyeOff,
  FileSearch,
  HelpCircle,
  Key,
  Loader2,
  LockKeyhole,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { ChainBadge } from "@/components/incidents/ChainBadge";
import { SeverityBadge } from "@/components/incidents/SeverityBadge";
import type { Incident } from "@/lib/types";

type SmartAnalysisResult = {
  riskScore: number;
  verdict: "malicious" | "suspicious" | "clean" | "unknown";
  rootCause: string;
  indicators: string[];
  mitigations: string[];
  summary: string;
  demoMode: boolean;
};

const demoAddress = "0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31";

function normalizeCandidate(value: string) {
  const trimmed = value.trim();
  const tx = trimmed.match(/0x[a-fA-F0-9]{64}/)?.[0];
  const address = trimmed.match(/0x[a-fA-F0-9]{40}/)?.[0];
  return (tx ?? address ?? trimmed).toLowerCase();
}

type StoredKeys = { openai: string; anthropic: string };

function loadKeys(): StoredKeys {
  if (typeof window === "undefined") return { openai: "", anthropic: "" };
  try {
    const raw = localStorage.getItem("nulltrace_api_keys");
    if (raw) return JSON.parse(raw) as StoredKeys;
  } catch {}
  return { openai: "", anthropic: "" };
}

export function ContractLookup({ feed }: { feed: Incident[] }) {
  const [value, setValue] = useState(demoAddress);
  const [searched, setSearched] = useState(false);
  const [keys, setKeys] = useState<StoredKeys>({ openai: "", anthropic: "" });
  const [provider, setProvider] = useState<"openai" | "anthropic">("openai");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [draftKey, setDraftKey] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SmartAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadKeys();
    setKeys(stored);
    setDraftKey(stored.openai);
  }, []);

  const normalized = useMemo(() => normalizeCandidate(value), [value]);

  const matchedIncident = useMemo(() => {
    if (!searched || !normalized) return undefined;
    return feed.find((incident) =>
      incident.affectedContracts.some((c) => c.toLowerCase().includes(normalized)),
    );
  }, [normalized, searched, feed]);

  const hasUnknownResult = searched && !matchedIncident;

  function saveKey() {
    const updated: StoredKeys = { ...keys, [provider]: draftKey };
    setKeys(updated);
    localStorage.setItem("nulltrace_api_keys", JSON.stringify(updated));
    setShowKeyInput(false);
  }

  async function runAnalysis() {
    setAnalyzing(true);
    setAnalysis(null);
    setAnalysisError(null);
    const activeKey = provider === "openai" ? keys.openai : keys.anthropic;
    try {
      const res = await fetch("/api/agents/smart-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: value, apiKey: activeKey, provider }),
      });
      const data = (await res.json()) as SmartAnalysisResult & { error?: string };
      if (data.error) throw new Error(data.error);
      setAnalysis(data);
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  const activeKey = provider === "openai" ? keys.openai : keys.anthropic;
  const hasKey = activeKey.length > 6;

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Left: input */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            <Search className="h-4 w-4" />
            instant contract lookup
          </div>
          <h2 className="mt-3 text-3xl font-black text-white">
            Paste a contract or TX. Get a breakdown instantly.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            If NullTrace already has a dossier, it shows the technical context immediately. If not, the AI
            agent analyzes it on the spot — add your API key for a real scan, or run in demo mode.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input
              id="contract-lookup-input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setAnalysis(null);
                setAnalysisError(null);
              }}
              placeholder="Paste contract, tx, or explorer link"
              className="font-mono"
              onKeyDown={(e) => e.key === "Enter" && setSearched(true)}
            />
            <Button id="contract-check-btn" onClick={() => setSearched(true)}>
              <FileSearch className="h-4 w-4" />
              Check
            </Button>
          </div>
          <button
            onClick={() => {
              setValue("https://etherscan.io/address/0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31");
              setSearched(true);
              setAnalysis(null);
            }}
            className="mt-3 text-left font-mono text-xs uppercase tracking-[0.16em] text-cyan-200 hover:text-white"
          >
            Try demo TrustedVolumes resolver →
          </button>
        </div>

        {/* Right: result panel */}
        <div>
          {!searched && (
            <div className="rounded-lg border border-white/10 bg-black/30 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Ready</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Paste a contract address or transaction hash to check if NullTrace has an existing
                dossier, or to trigger an AI security scan.
              </p>
            </div>
          )}

          {/* Known incident match */}
          {matchedIncident && (
            <div className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-5 shadow-[0_0_42px_rgba(0,255,209,.12)]">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={matchedIncident.severity} />
                <ChainBadge chain={matchedIncident.chain} />
                <span className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-200">
                  breakdown found
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">{matchedIncident.protocol}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{matchedIncident.summary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-white/10 bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">loss</p>
                  <p className="mt-1 font-mono text-rose-200">{matchedIncident.loss}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">vector</p>
                  <p className="mt-1 text-sm font-semibold text-white">{matchedIncident.attackVector}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">confidence</p>
                  <p className="mt-1 font-mono text-cyan-100">{matchedIncident.confidence}%</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href={`/incidents/${matchedIncident.id}`}>
                    Open Breakdown
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/analysis">
                    <LockKeyhole className="h-4 w-4" />
                    Run Paid Agent
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Unknown — AI analysis panel */}
          {hasUnknownResult && (
            <div className="space-y-3">
              <div className="rounded-lg border border-amber-300/20 bg-black/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                      <Brain className="h-4 w-4" />
                      Not in our index — AI scan available
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      No existing dossier found for this target. Run the AI agent to get an instant
                      security assessment.
                    </p>
                  </div>
                  {hasKey && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
                      <ShieldCheck className="h-3 w-3" />
                      Key saved
                    </span>
                  )}
                </div>

                <div className="mt-3 rounded-md border border-white/10 bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">target</p>
                  <code className="mt-1 block break-all font-mono text-sm text-cyan-100">{value}</code>
                </div>

                {/* Provider toggle */}
                <div className="mt-3 flex gap-2">
                  {(["openai", "anthropic"] as const).map((p) => (
                    <button
                      key={p}
                      id={`lookup-provider-${p}`}
                      onClick={() => {
                        setProvider(p);
                        setDraftKey(p === "openai" ? keys.openai : keys.anthropic);
                      }}
                      className={`flex-1 rounded-lg border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition ${
                        provider === p
                          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      {p === "openai" ? "GPT-4o" : "Claude"}
                    </button>
                  ))}
                  <button
                    id="toggle-api-key-btn"
                    onClick={() => setShowKeyInput((v) => !v)}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-slate-400 transition hover:text-cyan-300"
                  >
                    <Key className="h-3.5 w-3.5" />
                    {hasKey ? "Key ✓" : "Add Key"}
                  </button>
                </div>

                {/* Inline key input */}
                {showKeyInput && (
                  <div className="mt-2 flex gap-2">
                    <div className="relative flex-1">
                      <input
                        id="lookup-api-key-input"
                        type={showKey ? "text" : "password"}
                        value={draftKey}
                        onChange={(e) => setDraftKey(e.target.value)}
                        placeholder={provider === "openai" ? "sk-…" : "sk-ant-…"}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-9 font-mono text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <Button size="sm" onClick={saveKey} variant="ghost">
                      Save
                    </Button>
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button
                    id="run-ai-analysis-btn"
                    onClick={() => void runAnalysis()}
                    disabled={analyzing}
                    variant="danger"
                    className="flex-1"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        {hasKey ? "Run AI Analysis" : "Demo Analysis"}
                      </>
                    )}
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/analysis">
                      <LockKeyhole className="h-4 w-4" />
                      Full Paid Report
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Analysis error */}
              {analysisError && (
                <div className="rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {analysisError}
                </div>
              )}

              {/* Analysis result */}
              {analysis && !analysisError && (
                <div className="rounded-xl border border-white/10 bg-black/40 p-5 space-y-4">
                  {/* Verdict row */}
                  <div className="flex items-center gap-3">
                    {analysis.verdict === "malicious" && (
                      <AlertTriangle className="h-6 w-6 shrink-0 text-rose-400" />
                    )}
                    {analysis.verdict === "suspicious" && (
                      <AlertTriangle className="h-6 w-6 shrink-0 text-amber-400" />
                    )}
                    {(analysis.verdict === "clean" || analysis.verdict === "unknown") && (
                      <HelpCircle className="h-6 w-6 shrink-0 text-slate-400" />
                    )}
                    <div className="flex-1">
                      <div
                        className={`font-mono text-sm font-black uppercase ${
                          analysis.verdict === "malicious"
                            ? "text-rose-300"
                            : analysis.verdict === "suspicious"
                              ? "text-amber-300"
                              : "text-slate-300"
                        }`}
                      >
                        {analysis.verdict === "malicious"
                          ? "🔴 Exploit / Malicious"
                          : analysis.verdict === "suspicious"
                            ? "🟡 Suspicious Activity"
                            : "⚪ No Confirmed Exploit"}
                      </div>
                      {analysis.demoMode && (
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                          Demo — add API key for real AI scan
                        </p>
                      )}
                    </div>
                    {/* Risk score */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-xs text-slate-400">Risk {analysis.riskScore}/100</span>
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${
                            analysis.riskScore > 65
                              ? "bg-rose-400"
                              : analysis.riskScore > 35
                                ? "bg-amber-400"
                                : "bg-emerald-400"
                          }`}
                          style={{ width: `${analysis.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300">{analysis.summary}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Root Cause</p>
                      <p className="text-xs leading-relaxed text-slate-400">{analysis.rootCause}</p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Indicators</p>
                      <ul className="space-y-1">
                        {analysis.indicators.slice(0, 4).map((ind) => (
                          <li key={ind} className="flex items-start gap-1.5 text-xs text-slate-400">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                            {ind}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Mitigations</p>
                    <ul className="space-y-1">
                      {analysis.mitigations.map((m) => (
                        <li key={m} className="flex items-start gap-1.5 text-xs text-slate-400">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-cyan-400" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pay CTA */}
                  <Link
                    href="/analysis"
                    className="group flex items-center justify-between gap-3 rounded-lg border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-rose-500/10 p-3 transition-all hover:border-amber-400/50"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-200">Pay for Instant Full Forensic Report</span>
                    </div>
                    <span className="shrink-0 rounded-md border border-amber-400/30 bg-amber-500/20 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-300">
                      $49
                    </span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
