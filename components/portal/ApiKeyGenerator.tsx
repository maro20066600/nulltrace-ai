"use client";

import { useMemo, useState } from "react";
import { Copy, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

export function ApiKeyGenerator() {
  const [version, setVersion] = useState(1);
  const key = useMemo(() => `nt_live_${version}_x402_${"9af3c82b".repeat(3)}`.slice(0, 42), [version]);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3">
        <KeyRound className="h-6 w-6 text-cyan-200" />
        <div>
          <h2 className="text-xl font-bold text-white">Team Access Key</h2>
          <p className="text-sm text-slate-500">Shared workspace access with usage credits for paid investigations</p>
        </div>
      </div>
      <div className="mt-5 rounded-md border border-white/10 bg-black/35 p-4 font-mono text-sm text-cyan-100">
        {key}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-black/25 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">credits</p>
          <p className="mt-1 font-mono text-2xl text-white">420</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">scan limit</p>
          <p className="mt-1 font-mono text-2xl text-white">120/m</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">expiry</p>
          <p className="mt-1 font-mono text-2xl text-white">30d</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={() => setVersion((item) => item + 1)}>Generate Access Key</Button>
        <Button variant="ghost">
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
    </GlassCard>
  );
}
