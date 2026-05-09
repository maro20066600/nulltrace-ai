# NullTrace

**AI-powered DeFi security intelligence for the Solana ecosystem.**

NullTrace monitors on-chain activity across Solana and EVM networks, classifies exploit patterns using AI agents, and delivers forensic incident dossiers in under 60 seconds. It integrates LI.FI for cross-chain emergency bridging and implements the x402 payment protocol on Solana for instant report monetization.

---

## Problem

When a DeFi exploit happens, affected users and investigators face three immediate problems: they learn about the attack too late, they cannot quickly move funds off the compromised chain, and understanding the technical root cause requires deep expertise. Existing tools provide raw data but no structured intelligence layer.

## Solution

NullTrace acts as an autonomous security analyst. It ingests real-time DeFi exploit alerts, classifies them by attack vector, and produces structured forensic dossiers — timeline, wallet flow, root cause, and mitigations — that any developer or investor can read and act on.

---

## Core Features

### Incident Intelligence Feed
Real-time DeFi exploit alerts are parsed, classified, and merged into a unified incident feed. Alerts are categorized by attack type: oracle manipulation, flash loan abuse, access control failures, signature mismatches, and more. No Telegram labels or raw data are shown — only clean, structured intelligence.

### AI Contract Scanner
Users paste any contract address or transaction hash. If NullTrace has an existing dossier, the breakdown appears instantly. If not, an AI agent (OpenAI GPT-4o or Anthropic Claude) analyzes the target and returns a structured risk assessment: verdict, risk score, root cause hypothesis, on-chain indicators, and recommended mitigations. API keys are stored only in the user's browser — nothing is persisted server-side.

### LI.FI Emergency Bridge
Every incident detail page includes an Emergency Bridge panel powered by LI.FI. When funds are at risk on the affected chain, users can bridge to a safer destination chain through LI.FI's aggregated route — covering Mayan Swift, Across, Glacis, and 20+ other bridges across 60+ chains, including gasless Solana swaps and Jito bundle support.

### x402 Payment Protocol on Solana
Full forensic reports are monetized using the x402 HTTP 402 Payment Required protocol on Solana. When a user requests an instant report, the server responds with payment details denominated in SOL. The user pays via Solana Pay, the payment is verified on-chain, and the full report is unlocked immediately. This enables machine-to-machine micropayments without accounts, subscriptions, or custodial intermediaries.

### Forensic Dossiers
Each incident page contains a complete forensic record: attack timeline, wallet flow visualization, technical root cause, affected contracts, and social intelligence from related posts. A voice briefing endpoint is also exposed for ElevenLabs integration.

---

## LI.FI Integration

LI.FI is integrated at the incident response layer — the moment a user needs to act. The Emergency Bridge panel is pre-configured with the incident's chain as the source and offers destination chain selection. Routes are surfaced using LI.FI's aggregated bridge and DEX coverage across the Solana ecosystem.

```
Incident detected on Base
→ Emergency Bridge panel appears
→ User selects destination chain (Ethereum, Arbitrum, etc.)
→ Routed via Mayan Swift / Across / Glacis through LI.FI
→ Gasless execution where applicable
```

**Integration points:** LI.FI REST API for route data, LI.FI Widget URL for swap execution, Solana-native bridge coverage (Mayan, Relay, Gaszip, Unit, Near Intents).

---

## x402 Protocol on Solana

NullTrace implements HTTP 402 as a native payment gate for AI-generated forensic reports.

```
User requests instant report
→ Server: HTTP 402 Payment Required
  x402-amount: 0.3161 SOL
  x402-recipient: <Solana wallet>
  x402-network: mainnet-beta
→ Client renders Solana Pay QR + deeplink
→ User signs transaction in wallet
→ Payment confirmed on-chain
→ Full report unlocked
```

This replaces traditional subscription paywalls with a direct, non-custodial, verifiable micropayment — one transaction, one report.

---

## Architecture

```
Frontend (Next.js 15, TypeScript)
├── Landing page — unified incident feed + AI contract scanner
├── Incident detail — forensic dossier + LI.FI bridge + x402 gate
└── Incidents feed — filtered, searchable, sortable

API Routes
├── /api/agents/smart-analyze    — GPT-4o / Claude contract analysis
├── /api/agents/technical-breakdown — Full dossier agent
├── /api/telegram/defimon        — Alert ingestion and parsing
└── /api/scan-tx                 — Transaction hash scanner

Integrations
├── LI.FI — cross-chain bridge routing on incident pages
├── x402  — Solana Pay micropayment gate for instant reports
├── OpenAI GPT-4o — contract and transaction analysis
└── Anthropic Claude — alternative AI provider (user's choice)
```

---

## Running Locally

```bash
git clone https://github.com/maro20066600/nulltrace-ai
cd nulltrace-ai
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. All features run in demo mode without any API keys.

### Environment Variables

```env
# All optional — demo mode works without them
OPENAI_API_KEY=        # Server-side AI analysis
X_BEARER_TOKEN=        # Twitter/X social intelligence
TELEGRAM_BOT_TOKEN=    # Live Telegram alert ingestion
```

Users can also supply their own OpenAI or Anthropic key directly in the UI. Keys are stored only in `localStorage` and are never persisted on the server.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| AI Providers | OpenAI GPT-4o, Anthropic Claude |
| Cross-chain | LI.FI API and Widget |
| Payments | x402, Solana Pay |
| Deployment | Vercel |

---

## Project Structure

```
├── app/
│   ├── page.tsx                          # Landing — unified feed + scanner
│   ├── incidents/[id]/page.tsx           # Incident detail — LI.FI + x402
│   └── api/
│       ├── agents/smart-analyze/         # AI contract analysis endpoint
│       ├── agents/technical-breakdown/   # Full dossier generation
│       ├── telegram/defimon/             # Alert parsing
│       └── scan-tx/                      # TX scanner
├── components/
│   ├── details/EmergencyBridgePanel.tsx  # LI.FI integration
│   ├── details/X402PaymentGate.tsx       # x402 Solana payment
│   ├── landing/ContractLookup.tsx        # AI-powered scanner
│   └── landing/HeroSection.tsx
├── lib/
│   ├── feed.ts                           # Unified incident feed
│   ├── telegram/defimon-parser.ts        # Alert classification
│   └── mock-data/incidents.ts            # Incident dossier data
└── README.md
```

---

## License

Apache 2.0

---

**Live:** https://nulltrace-eight.vercel.app  
**Repository:** https://github.com/maro20066600/nulltrace-ai
