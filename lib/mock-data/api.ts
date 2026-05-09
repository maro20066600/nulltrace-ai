import type { ApiHistoryItem } from "@/lib/types";

export const apiHistory: ApiHistoryItem[] = [
  {
    endpoint: "Wallet risk",
    target: "7bF...9Qx",
    status: "Unlocked",
    credits: 12,
    responseTime: "412ms",
    time: "now",
  },
  {
    endpoint: "Transaction analysis",
    target: "5f4K...Tx9",
    status: "Paid",
    credits: 18,
    responseTime: "690ms",
    time: "2m",
  },
  {
    endpoint: "Contract threat score",
    target: "BridgeEscrow7...pLx",
    status: "Processing",
    credits: 8,
    responseTime: "streaming",
    time: "4m",
  },
];
