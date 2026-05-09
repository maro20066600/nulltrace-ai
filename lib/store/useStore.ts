"use client";

import { create } from "zustand";
import type { Chain, Severity } from "@/lib/types";

type NullTraceState = {
  query: string;
  severity: Severity | "ALL";
  chain: Chain | "ALL";
  credits: number;
  setQuery: (query: string) => void;
  setSeverity: (severity: Severity | "ALL") => void;
  setChain: (chain: Chain | "ALL") => void;
  spendCredits: (amount: number) => void;
};

export const useNullTraceStore = create<NullTraceState>((set) => ({
  query: "",
  severity: "ALL",
  chain: "ALL",
  credits: 420,
  setQuery: (query) => set({ query }),
  setSeverity: (severity) => set({ severity }),
  setChain: (chain) => set({ chain }),
  spendCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),
}));
