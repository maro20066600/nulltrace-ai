import type { Agent } from "@/lib/types";

export const agents: Agent[] = [
  {
    name: "Scout Agent",
    status: "SCANNING",
    activity: "Watching Solana program invocations and bridge outflows",
    confidence: 94,
  },
  {
    name: "Analyst Agent",
    status: "ANALYZING",
    activity: "Classifying anomalous pool deltas against exploit signatures",
    confidence: 88,
  },
  {
    name: "Forensics Agent",
    status: "TRACING",
    activity: "Clustering attacker wallets across mixer and CEX deposit hops",
    confidence: 91,
  },
  {
    name: "Reporter Agent",
    status: "GENERATING",
    activity: "Drafting incident briefings and fake-info suppression notes",
    confidence: 86,
  },
];
