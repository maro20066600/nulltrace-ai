# NullTrace — AI-Powered DeFi Security Intelligence

<div align="center">

![NullTrace Banner](https://img.shields.io/badge/NullTrace-AI%20DeFi%20Security-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![Solana](https://img.shields.io/badge/Solana-First-9945FF?style=flat-square&logo=solana)
![LI.FI](https://img.shields.io/badge/LI.FI-Cross--Chain-FF4FC8?style=flat-square)
![x402](https://img.shields.io/badge/x402-Payments-14F195?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)

**From exploit to forensic breakdown in under 60 seconds.**

[Live Demo](https://nulltrace.vercel.app) · [Incidents](https://nulltrace.vercel.app/incidents) · [Dev3pack Submission](https://dev3pack.com)

</div>

---

## 🚨 What is NullTrace?

NullTrace is the **AI security layer for the Solana ecosystem** — an autonomous exploit intelligence platform that monitors DeFi protocols in real time, generates forensic incident dossiers, and enables instant cross-chain fund recovery via LI.FI.

When a hack happens, NullTrace:
1. **Detects** the exploit from on-chain signals and alert feeds
2. **Classifies** the attack vector via AI agent (oracle manipulation, reentrancy, access control, etc.)
3. **Generates** a full forensic dossier: wallet flow graph, timeline, root cause, PoC explanation
4. **Enables** emergency cross-chain bridging via LI.FI for affected users
5. **Monetizes** instant paid reports using **x402 micropayments on Solana**

---

## 🏆 Hackathon Tracks

| Track | Target Prize |
|---|---|
| ⚡ Best App Overall on Solana | $10,000 |
| 🏅 Best use of x402 on Solana | $500 |
| 🌉 Best Cross-Chain Solana UX powered by LI.FI | $1,000 |

---

## ✨ Key Features

### 🔴 Live Incident Feed
- Ingests DeFi exploit alerts from security channels
- Auto-classifies by attack vector: oracle manipulation, flash loans, access control, signature mismatches
- Parsed alerts appear in the main incident feed without visible source attribution
- Incidents sorted by recency + severity

### 🤖 AI Contract Scanner
- Paste any contract address or transaction hash
- If NullTrace has a dossier → instant breakdown shown
- If unknown → AI agent (GPT-4o or Claude) analyzes it on-the-spot
- **Bring Your Own Key**: API keys stored only in browser `localStorage`, never logged server-side
- Demo mode works without any API key

### 🌉 LI.FI Emergency Bridge
Built into every incident detail page:
- Shows affected chain and suggests safe destination chains
- Pre-configured routes using Mayan Swift, Across, Glacis
- Direct link to LI.FI swap widget with correct from/to chain context
- Covers gasless Solana swaps, Jito bundles, and 60+ chain coverage
- **Integration:** LI.FI REST API + Widget iframe embed

### ⚡ x402 Solana Payment Gate
The "Pay for Instant Report" flow uses the [x402 protocol](https://github.com/coinbase/x402):
- HTTP `402 Payment Required` standard for machine-to-machine micropayments
- Payment in SOL via Solana Pay QR + deeplink
- Payment confirmation unlocks full AI forensic report instantly
- Demo mode simulates confirmation for judges without a mainnet tx
- **Flow:** `HTTP 402` → Solana Pay → x402 callback → report unlocked

### 🔍 Forensic Incident Dossiers
Each incident page includes:
- Attack timeline with timestamped events
- Wallet flow visualization (attacker → victim → destination)
- Technical breakdown: root cause, vulnerability, PoC explanation
- AI confidence score and risk level
- Related social intelligence (Twitter/X posts)
- Voice briefing (ElevenLabs-ready endpoint)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     NullTrace Frontend                   │
│  Next.js 15 · React · TypeScript · Tailwind CSS         │
├────────────────┬────────────────┬───────────────────────┤
│  Landing Page  │  Incident Feed │  Contract Lookup       │
│  Hero + Stats  │  Unified Feed  │  AI Agent Analysis     │
│  Solana badges │  Filter/Search │  BYOK API Keys         │
├────────────────┴────────────────┴───────────────────────┤
│                    API Routes (Next.js)                  │
│  /api/agents/smart-analyze   — GPT-4o / Claude scanner  │
│  /api/agents/technical-breakdown — Full dossier agent   │
│  /api/telegram/defimon       — Alert feed parser        │
│  /api/scan-tx                — TX hash scanner          │
│  /api/x/related              — Social intelligence      │
├────────────────┬────────────────┬───────────────────────┤
│  LI.FI Bridge  │  x402 Payments │  AI Providers         │
│  60+ chains    │  Solana Pay    │  OpenAI GPT-4o        │
│  Mayan/Across  │  HTTP 402      │  Anthropic Claude     │
│  Jito bundles  │  SOL micropay  │  Demo fallback        │
└────────────────┴────────────────┴───────────────────────┘
```

---

## 🌉 LI.FI Integration Details

NullTrace integrates LI.FI at the **incident response layer** — the most critical moment when users need to move funds off a compromised chain.

### Implementation
```typescript
// EmergencyBridgePanel.tsx
// Pre-configured with incident's chain as `fromChain`
const lifiWidgetUrl = `https://transferto.xyz/swap/${fromChain}-USDC/${toChain}-USDC`;

// Supported bridges via LI.FI on Solana:
// - Mayan Swift (intent-based)
// - Across Protocol
// - Glacis (LI.FI exclusive, OFT/NTT)
// - Relay, Gaszip, Near Intents
// - Unit (native Solana deposits)
```

### Why This Matters
When an oracle misconfiguration drains a Base vault, affected users need to:
1. Know immediately (NullTrace incident feed ✓)
2. Move remaining funds to safety (LI.FI Emergency Bridge ✓)
3. Understand what happened (AI forensic dossier ✓)

LI.FI is the only aggregator that handles this cross-chain escape hatch for both Solana and EVM chains simultaneously.

---

## ⚡ x402 Integration Details

NullTrace implements the [x402 HTTP payment protocol](https://github.com/coinbase/x402) for paid forensic reports.

### Flow
```
User requests instant report
        ↓
Server returns HTTP 402 Payment Required
  + Payment amount: 0.3161 SOL (~$49)
  + x402-Payment-Required header
        ↓
Client generates Solana Pay transaction
  + QR code for mobile wallet
  + Deeplink for desktop wallet
        ↓
Payment broadcast to Solana mainnet
        ↓
x402 callback confirms payment
        ↓
Full forensic report unlocked instantly
```

### Headers
```http
HTTP/1.1 402 Payment Required
x402-payment-required: solana
x402-amount: 0.3161
x402-currency: SOL
x402-recipient: NuLLTr4ceA1Ffmn5xRnGsXbNT9jzP2wQkQ3HJsKABc
x402-network: mainnet-beta
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Local Development
```bash
git clone https://github.com/maro20066600/nulltrace-ai
cd nulltrace-ai
npm install
cp .env.example .env.local
# Edit .env.local — all keys are optional, demo mode works without them
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables
```env
# Optional — demo mode works without these
OPENAI_API_KEY=sk-...          # For real AI contract analysis on the server
X_BEARER_TOKEN=...             # For Twitter/X social intelligence
TELEGRAM_BOT_TOKEN=...         # For live Telegram alert ingestion
```

> **Note:** Users can also supply their own OpenAI or Anthropic API key directly in the UI (stored in browser localStorage only, never sent to our servers except to proxy to the AI provider).

### Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
nulltrace-ai/
├── app/
│   ├── page.tsx                    # Landing page (unified feed)
│   ├── incidents/[id]/page.tsx     # Incident detail + LI.FI + x402
│   ├── incidents/page.tsx          # Full incident feed
│   └── api/
│       ├── agents/
│       │   ├── smart-analyze/      # AI contract scanner (GPT-4o/Claude)
│       │   └── technical-breakdown/ # Full dossier agent
│       ├── telegram/defimon/       # Alert feed ingestion
│       └── scan-tx/                # TX hash scanner
├── components/
│   ├── details/
│   │   ├── EmergencyBridgePanel.tsx  # 🌉 LI.FI bridge widget
│   │   ├── X402PaymentGate.tsx       # ⚡ x402 Solana payments
│   │   ├── AIBreakdown.tsx
│   │   ├── WalletFlowGraph.tsx
│   │   └── AttackTimeline.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx         # Solana-first hero
│   │   └── ContractLookup.tsx      # AI-powered contract scanner
│   └── monitor/
│       ├── TelegramMonitor.tsx
│       ├── AlertCard.tsx
│       └── TxScanPanel.tsx
├── lib/
│   ├── feed.ts                     # Unified incident feed
│   ├── telegram/defimon-parser.ts  # Alert parser
│   ├── mock-data/incidents.ts      # Rich incident dossiers
│   └── types/index.ts
└── README.md
```

---

## 🎯 Demo Walkthrough

### 1. Landing Page
- Hero with Solana-first branding, x402 and LI.FI badges
- AI Contract Lookup: paste any contract → instant breakdown or AI scan
- Live incident feed (newest first)

### 2. Contract Lookup Demo
```
Paste: 0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31
→ Instantly shows TrustedVolumes Resolver exploit dossier

Paste: any unknown address
→ AI agent analyzes it (demo mode or your API key)
→ Shows risk score, verdict, root cause, indicators
```

### 3. Incident Detail Page
- Full forensic dossier with attack timeline
- **LI.FI Emergency Bridge** panel (right sidebar) — bridge funds to safety
- **x402 Payment Gate** — pay with SOL to unlock instant full report
- Wallet flow graph, technical breakdown, social intelligence

### 4. AI TX Scanner
- Input any transaction hash
- Select chain and AI provider
- Brings your own API key (localStorage only)
- Demo mode works without key

---

## 🔒 Security & Privacy

- **No API keys stored server-side**: User-provided keys live only in `localStorage` and are sent per-request to AI providers
- **No PII collected**: No accounts, no tracking
- **Open source**: Full source code on GitHub (Apache 2.0)
- **x402 payments**: Non-custodial, on-chain, verifiable

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design system |
| Animations | Framer Motion |
| AI | OpenAI GPT-4o, Anthropic Claude |
| Cross-chain | LI.FI API + Widget |
| Payments | x402 protocol · Solana Pay |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 👥 Team

**Marwan Mohammed** — [@maro20066600](https://github.com/maro20066600)

---

## 📄 License

Apache 2.0 — see [LICENSE](LICENSE)

---

<div align="center">

Built for **Dev3pack Hackathon 2026** · Solana Track · LI.FI Track · x402 Bonus

**NullTrace — The AI security layer for the Solana ecosystem.**

</div>
