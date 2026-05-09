export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Chain = "Solana" | "Ethereum" | "Base" | "Arbitrum" | "BSC" | "TRON";

export type IncidentStatus = "ACTIVE" | "CONTAINED" | "ATTRIBUTED" | "MONITORING";

export type ExploitCategory =
  | "Bridge Exploit"
  | "Liquidity Drain"
  | "Rug Pull"
  | "Signer Compromise"
  | "Durable Nonce Abuse"
  | "Hot Wallet Compromise"
  | "Owner Permission Phishing"
  | "Signature/Execution Parameter Mismatch"
  | "Missing Access Control"
  | "Oracle Manipulation"
  | "Oracle Misconfiguration"
  | "Phishing"
  | "Smart Contract Bug";

export type TimelineEvent = {
  time: string;
  title: string;
  detail: string;
};

export type TweetIntel = {
  author: string;
  handle: string;
  time: string;
  content: string;
  tag: "Researcher" | "Warning" | "Confirmation" | "Fake Info Flag";
};

export type Incident = {
  id: string;
  protocol: string;
  logo: string;
  chain: Chain;
  secondaryChains?: Chain[];
  severity: Severity;
  status: IncidentStatus;
  category: ExploitCategory;
  loss: string;
  lossValue: number;
  timestamp: string;
  confidence: number;
  riskLevel: string;
  summary: string;
  attackExplanation: string;
  rootCause: string;
  attackVector: string;
  vulnerability: string;
  affectedContracts: string[];
  mitigations: string[];
  timeline: TimelineEvent[];
  tweets: TweetIntel[];
};

export type Agent = {
  name: "Scout Agent" | "Analyst Agent" | "Forensics Agent" | "Reporter Agent";
  status: "SCANNING" | "ANALYZING" | "TRACING" | "GENERATING";
  activity: string;
  confidence: number;
};

export type LabResult = {
  score: number;
  probability: number;
  classification: string;
  indicators: string[];
  matchedPatterns: string[];
};

export type ApiHistoryItem = {
  endpoint: string;
  target: string;
  status: "Paid" | "Unlocked" | "Processing";
  credits: number;
  responseTime: string;
  time: string;
};
