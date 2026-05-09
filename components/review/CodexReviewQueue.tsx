"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CodexReviewRequest } from "@/lib/review-queue";

export function CodexReviewQueue() {
  const [queue, setQueue] = useState<CodexReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQueue = async () => {
    setLoading(true);
    const response = await fetch("/api/codex-review", { cache: "no-store" });
    const payload = (await response.json()) as { queue: CodexReviewRequest[] };
    setQueue(payload.queue || []);
    setLoading(false);
  };

  useEffect(() => {
    void loadQueue();
  }, []);

  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            <ShieldQuestion className="h-4 w-4" />
            codex review queue
          </div>
          <h1 className="mt-3 text-4xl font-black text-white">Requests waiting for Codex review</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            When a user submits a contract that does not have a public breakdown, NullTrace creates a Codex review
            request here. In production this would notify the internal review agent or analyst channel.
          </p>
        </div>
        <Button onClick={loadQueue} disabled={loading} variant="ghost">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-md border border-white/10 bg-black/30 p-4 text-sm text-slate-400">
            Loading review queue...
          </div>
        ) : null}

        {!loading && queue.length === 0 ? (
          <div className="rounded-md border border-white/10 bg-black/30 p-4 text-sm text-slate-400">
            No Codex review requests yet. Submit an unknown contract from the homepage lookup.
          </div>
        ) : null}

        {queue.map((request) => (
          <article key={request.id} className="rounded-lg border border-white/10 bg-black/30 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-100">
                    {request.status}
                  </span>
                  <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">
                    {request.source}
                  </span>
                </div>
                <code className="mt-4 block break-all font-mono text-sm text-cyan-100">{request.target}</code>
                <p className="mt-3 text-sm leading-6 text-slate-300">{request.note}</p>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
                {new Date(request.createdAt).toLocaleString()}
              </div>
            </div>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
