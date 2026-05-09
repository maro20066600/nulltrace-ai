"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";
import { AlertCard } from "@/components/monitor/AlertCard";
import { ApiKeyPanel, type StoredKeys } from "@/components/monitor/ApiKeyPanel";
import { TxScanPanel } from "@/components/monitor/TxScanPanel";
import { PayCTA } from "@/components/monitor/PayCTA";
import { GlassCard } from "@/components/ui/GlassCard";
import { PulsingDot } from "@/components/ui/PulsingDot";
import { Button } from "@/components/ui/button";
import type { ParsedDefimonAlert } from "@/lib/telegram/defimon-parser";

type ApiResponse = {
  live: boolean;
  source: string;
  channel: string;
  lastPolled: string;
  incidents: ParsedDefimonAlert[];
};

const POLL_INTERVAL_MS = 30_000;

function loadKeys(): StoredKeys {
  if (typeof window === "undefined") return { openai: "", anthropic: "" };
  try {
    const raw = localStorage.getItem("nulltrace_api_keys");
    if (raw) return JSON.parse(raw) as StoredKeys;
  } catch {}
  return { openai: "", anthropic: "" };
}

function saveKeys(keys: StoredKeys) {
  localStorage.setItem("nulltrace_api_keys", JSON.stringify(keys));
}

export function TelegramMonitor() {
  const [alerts, setAlerts] = useState<ParsedDefimonAlert[]>([]);
  const [lastPolled, setLastPolled] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<StoredKeys>({ openai: "", anthropic: "" });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setKeys(loadKeys());
  }, []);

  const fetchAlerts = useCallback(async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await fetch("/api/telegram/defimon", { cache: "no-store" });
      const data = (await res.json()) as ApiResponse;
      setAlerts(data.incidents ?? []);
      setLastPolled(data.lastPolled ?? new Date().toISOString());
    } catch {
      // keep existing alerts on failure
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAlerts();
    timerRef.current = setInterval(() => void fetchAlerts(), POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchAlerts]);

  function handleKeySave(newKeys: StoredKeys) {
    setKeys(newKeys);
    saveKeys(newKeys);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-rose-300">
              <PulsingDot className="text-rose-400" />
              Telegram Monitor
            </div>
            <h1 className="mt-2 text-3xl font-black text-white">
              DeFi Alert Feed
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://t.me/defimon_alerts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-slate-400 transition hover:text-cyan-300"
              >
                <ExternalLink className="h-3 w-3" />
                t.me/defimon_alerts
              </a>
              {lastPolled && (
                <span className="font-mono text-[10px] text-slate-600">
                  Last synced{" "}
                  {new Date(lastPolled).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-rose-100">
              {alerts.length} alerts
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => void fetchAlerts(true)}
              disabled={loading}
              id="refresh-monitor-btn"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Alert cards */}
        <div className="space-y-4">
          {loading && alerts.length === 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {alerts.map((alert, index) => (
                <motion.div
                  key={`${alert.protocol}-${alert.date}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <AlertCard alert={alert} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <TxScanPanel keys={keys} />
          <ApiKeyPanel keys={keys} onSave={handleKeySave} />
          <PayCTA />
        </aside>
      </div>
    </div>
  );
}
