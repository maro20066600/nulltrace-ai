"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNullTraceStore } from "@/lib/store/useStore";
import type { Chain, Severity } from "@/lib/types";

const severities: Array<Severity | "ALL"> = ["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
const chains: Array<Chain | "ALL"> = ["ALL", "Solana", "Ethereum", "Base", "Arbitrum"];

export function SearchFilters() {
  const { query, severity, chain, setQuery, setSeverity, setChain } = useNullTraceStore();

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search protocol, attack vector, wallet route..."
          className="pl-10"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {severities.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={severity === item ? "primary" : "ghost"}
            onClick={() => setSeverity(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {chains.map((item) => (
          <Button key={item} size="sm" variant={chain === item ? "primary" : "ghost"} onClick={() => setChain(item)}>
            {item === "ALL" ? <SlidersHorizontal className="h-4 w-4" /> : null}
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
