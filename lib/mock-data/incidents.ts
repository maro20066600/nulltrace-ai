import type { Incident, TimelineEvent, TweetIntel } from "@/lib/types";

const driftTimeline: TimelineEvent[] = [
  {
    time: "Fall 2025",
    title: "Trust-building operation begins",
    detail: "Threat actors pose as a legitimate quantitative trading firm and build relationships with Drift contributors.",
  },
  {
    time: "Dec-Feb",
    title: "Developer machines targeted",
    detail: "A VSCode/Cursor exploit and malicious TestFlight wallet app are used to compromise contributor environments.",
  },
  {
    time: "Mar 12",
    title: "Fake CVT collateral staged",
    detail: "CarbonVote Token is deployed, wash-traded, and priced to appear usable as high-value collateral.",
  },
  {
    time: "Apr 1",
    title: "Durable nonces activated",
    detail: "Pre-signed dormant transactions silently transfer admin control and approve CVT collateral limits.",
  },
  {
    time: "Minutes",
    title: "Assets drained",
    detail: "$285M in USDC, SOL, ETH, and JLP are withdrawn before protocol controls are frozen.",
  },
];

const standardTimeline: TimelineEvent[] = [
  {
    time: "00:00",
    title: "Suspicious activity begins",
    detail: "NullTrace Scout Agent detects abnormal account, wallet, or market behavior.",
  },
  {
    time: "00:19",
    title: "Exploit pattern classified",
    detail: "Analyst Agent matches the activity against known Web3 attack signatures.",
  },
  {
    time: "00:41",
    title: "Funds movement traced",
    detail: "Forensics Agent clusters wallets, bridge routes, exchange hops, and mixer exposure.",
  },
  {
    time: "01:12",
    title: "Related posts monitored",
    detail: "Reporter Agent collects researcher warnings and suppresses unverified claims.",
  },
  {
    time: "03:48",
    title: "Response tracked",
    detail: "Protocol actions, freezes, recovery updates, and public statements are added to the dossier.",
  },
];

const baseTweets: TweetIntel[] = [
  {
    author: "SlowMist Research",
    handle: "@slowmist_team",
    time: "2m",
    content: "Solana account permission changes need clear wallet simulation. Users should inspect owner reassignment instructions before signing.",
    tag: "Warning",
  },
  {
    author: "NullTrace Intel",
    handle: "@nulltrace_ai",
    time: "4m",
    content: "On-chain behavior and public reports are aligned. Confidence raised after wallet clusters matched the incident pattern.",
    tag: "Confirmation",
  },
  {
    author: "Maya Chen",
    handle: "@maya_sec",
    time: "7m",
    content: "The important signal is not only the drain. Watch the staging wallets and the small test transactions before the main move.",
    tag: "Researcher",
  },
  {
    author: "Rumor Watch",
    handle: "@intel_filter",
    time: "10m",
    content: "Unverified recovery claims are circulating. No confirmed full recovery unless the protocol or tracked wallet flows support it.",
    tag: "Fake Info Flag",
  },
];

const recentInvestigationTweets: TweetIntel[] = [
  {
    author: "Blockaid",
    handle: "@blockaid_",
    time: "3h",
    content:
      "Exploit detection identified an ongoing TrustedVolumes exploit. Victim resolver: 0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31. Extracted so far: about $5.87M.",
    tag: "Warning",
  },
  {
    author: "NullTrace Scout",
    handle: "@nulltrace_ai",
    time: "2h",
    content:
      "We are investigating TrustedVolumes resolver activity on Ethereum. Free public summary is live; instant forensic report requires paid agent execution.",
    tag: "Confirmation",
  },
  {
    author: "Maya Chen",
    handle: "@maya_sec",
    time: "1h",
    content:
      "The important pivot is the TrustedVolumes-controlled custom RFQ swap proxy, not the 1inch brand surface. Track the resolver and proxy independently.",
    tag: "Researcher",
  },
  {
    author: "Rumor Watch",
    handle: "@intel_filter",
    time: "44m",
    content:
      "Demo filter: posts claiming this is the same March-2025 Fusion V1 bug are unsupported. Same operator is plausible; vulnerability appears different.",
    tag: "Fake Info Flag",
  },
];

const recentInvestigationTimeline: TimelineEvent[] = [
  {
    time: "3h ago",
    title: "Ongoing exploit detected",
    detail: "Scout Agent ingests a Blockaid-style alert for an active TrustedVolumes resolver exploit on Ethereum.",
  },
  {
    time: "2h ago",
    title: "Public demo summary opened",
    detail: "NullTrace published a free preliminary page while the investigation continues.",
  },
  {
    time: "1h ago",
    title: "Related tweets collected",
    detail: "Reporter Agent links the victim contract, exploiter wallet, exploit transaction, and trusted researcher posts.",
  },
  {
    time: "now",
    title: "Forensic report pending",
    detail: "Instant report is available after payment; the full free report unlocks automatically after 24 hours.",
  },
];

const singularityTimeline: TimelineEvent[] = [
  {
    time: "2026-01-19",
    title: "Broken oracle routes registered",
    detail: "Protocol admin registered six yield-token oracle routes with Uniswap V3 fee tier 42 — an invalid tier. factory.getPool returns address(0) for every token, silently killing all direct price paths.",
  },
  {
    time: "2026-04-26 T+0",
    title: "Flash loan acquired",
    detail: "Attacker flash-loaned 100k USDC from Morpho to fund the attack.",
  },
  {
    time: "T+1",
    title: "Vault deposit at broken ratio",
    detail: "Attacker deposited into dynBaseUSDCv3 vault. With oracle broken, totalAssets() only counted ~$100 idle USDC, minting ~99.99% of vault supply for 100k USDC.",
  },
  {
    time: "T+2",
    title: "Proportional redemption drains all tokens",
    detail: "Attacker redeemed vault tokens, receiving a proportional cut of every actual underlying yield token balance independently of the oracle, draining the vault.",
  },
  {
    time: "T+3",
    title: "Flash loan repaid — $413K net profit",
    detail: "The 100k USDC flash loan was repaid. Net loss to the protocol: approximately $413K in drained yield tokens.",
  },
];

const singularityTweets: TweetIntel[] = [
  {
    author: "Defimon Alerts",
    handle: "@DefimonAlerts",
    time: "Apr 26",
    content:
      "🚨 SingularityFinance.ai loss ~$413K. Oracle Misconfiguration / Share Inflation. dynBaseUSDCv3 vault on Base — admin registered oracle routes with Uniswap V3 fee tier 42 (invalid), silently breaking price paths. Attacker flash-loaned 100k USDC, minted 99.99% of supply at broken ratio, redeemed for all underlying tokens.",
    tag: "Warning",
  },
  {
    author: "NullTrace Scout",
    handle: "@nulltrace_ai",
    time: "Apr 26",
    content:
      "Singularity Finance vault oracle used fee tier 42 — only tiers 100/500/3000/10000 are valid in Uniswap V3. Every getPool call returned address(0), making totalAssets() count only idle USDC.",
    tag: "Confirmation",
  },
  {
    author: "Maya Chen",
    handle: "@maya_sec",
    time: "Apr 26",
    content:
      "Classic share inflation via broken oracle. The attacker didn't need to manipulate price — the oracle was already returning zero. Share mint at $100 total assets for a $413K underlying vault is the entire attack.",
    tag: "Researcher",
  },
  ...baseTweets.slice(3),
];

export const incidents: Incident[] = [
  {
    id: "singularity-finance-oracle-misconfiguration",
    protocol: "SingularityFinance.ai",
    logo: "SF",
    chain: "Base",
    severity: "HIGH",
    status: "MONITORING",
    category: "Oracle Misconfiguration",
    loss: "~$413K",
    lossValue: 413000,
    timestamp: "Apr 26, 2026",
    confidence: 94,
    riskLevel: "Vault fully drained — preliminary post-mortem",
    summary:
      "Defimon alert: dynBaseUSDCv3 vault on Base priced non-USDC reserves via UniswapV3Oracle. Admin registered yield-token routes with fee tier 42 (invalid) — factory.getPool returned address(0) for every token. Attacker flash-loaned 100k USDC, minted ~99.99% of supply at the broken ratio, then redeemed proportionally to drain all underlying yield tokens (~$413K).",
    attackExplanation:
      "With the oracle broken, VaultTokensLib.totalAssets() only counted ~$100 idle USDC. The attacker deposited 100k USDC and received shares representing almost the entire vault supply at a 1000x inflated ratio. On redemption, the vault distributed a proportional share of every real underlying token balance — independently of oracle price — draining the full vault.",
    rootCause:
      "Protocol admin registered six yield-token Uniswap V3 oracle routes with fee tier 42. Uniswap V3 only enables fee tiers 100/500/3000/10000; factory.getPool(USDC, X, 42) returns address(0) for every token. The WETH-fallback pools existed but had zero liquidity. No validation was run on the returned pool address before using it for pricing.",
    attackVector: "Flash loan → deposit at broken oracle ratio → redeem proportional share of all underlying tokens",
    vulnerability: "Invalid Uniswap V3 fee tier in oracle route registration silently returned address(0), breaking totalAssets()",
    affectedContracts: [
      "0x67b93f6676bd1911c5fae7ffa90fff5f35e14dcd",
      "0x73b8c192bfc323c3ea224c88219d55dfc319e89f",
      "0x00b949bc3ed3edb58b04faedfbd8eb1db2edceae761382e80fe012919f8d3732",
      "0x2df0be7a17bd69a2f732c1396796690240aecdfaf13b0a8f60f49f95a8dbe150",
    ],
    mitigations: [
      "Validate that getPool returns a non-zero address before registering oracle routes",
      "Add totalAssets() sanity checks — revert if reported value deviates >10% from expected range",
      "Use Chainlink or Pyth as a primary oracle with Uniswap V3 TWAP as fallback only",
      "Emit events on oracle route registration and monitor for zero-address pool assignments",
    ],
    timeline: singularityTimeline,
    tweets: singularityTweets,
  },
  {
    id: "trustedvolumes-resolver-exploit",
    protocol: "TrustedVolumes Resolver",
    logo: "TV",
    chain: "Ethereum",
    severity: "CRITICAL",
    status: "MONITORING",
    category: "Smart Contract Bug",
    loss: "~$5.87M",
    lossValue: 5870000,
    timestamp: "3 hours ago",
    confidence: 83,
    riskLevel: "Ongoing exploit under investigation",
    summary:
      "Free demo case: NullTrace is investigating an ongoing TrustedVolumes resolver exploit on Ethereum. Instant forensic report is paid; full free report unlocks after 24 hours.",
    attackExplanation:
      "The current public view is a preliminary investigation. The alert identifies a TrustedVolumes resolver victim contract, an exploiter wallet, an exploit transaction, and about $5.87M extracted across WETH, USDT, WBTC, and USDC.",
    rootCause:
      "Root cause is still under investigation. Early public signals point to a different vulnerability from the March-2025 1inch Fusion V1 incident, likely in a TrustedVolumes-controlled custom RFQ swap proxy.",
    attackVector: "Resolver exploit through custom RFQ swap proxy",
    vulnerability: "Potential unsafe swap-proxy execution path under active review",
    affectedContracts: [
      "0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31",
      "0xeEeEEe53033F7227d488ae83a27Bc9A9D5051756",
      "0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513",
      "0xC3EBDdEa4f69df717a8f5c89e7cF20C1c0389100",
    ],
    mitigations: [
      "Monitor the victim resolver and custom RFQ proxy until final report is ready",
      "Track exploiter outflows from 0xC3EBD...89100 across swaps, bridges, and exchanges",
      "Request instant paid analysis for transaction-level trace, token movements, and operator overlap",
    ],
    timeline: recentInvestigationTimeline,
    tweets: recentInvestigationTweets,
  },
  {
    id: "ekubo-locker-access-control",
    protocol: "Ekubo Locker",
    logo: "EK",
    chain: "Ethereum",
    severity: "HIGH",
    status: "MONITORING",
    category: "Missing Access Control",
    loss: "$1.38M",
    lossValue: 1380000,
    timestamp: "May 5, 2026",
    confidence: 88,
    riskLevel: "User approval drain risk",
    summary:
      "Defimon-style Telegram alert: Ekubo v2 locker trusted a user-supplied from address in packed lock instructions, allowing repeated WBTC drains from an approved EOA.",
    attackExplanation:
      "The attacker repeatedly called Core.lock with packed operations that withdrew WBTC to the attacker while payCallback transferFrom used a victim-controlled from address embedded in calldata.",
    rootCause:
      "The locker trusted the from address supplied in the instruction payload instead of binding payment source to authenticated execution context.",
    attackVector: "Packed instruction payload with untrusted from address",
    vulnerability: "Missing access control and unsafe transferFrom source validation",
    affectedContracts: [
      "0x770bc9a1f7c32cb63a5002b9ceb5c7994cd3af0fc6b2309cb32d3c46f629daa0",
      "0x8ccb1ffd5c2aa6bd926473425dea4c8c15de60fd",
      "0x765decf4fa157756e850c1079f60801b9219edd1",
    ],
    mitigations: [
      "Bind payCallback from address to authenticated caller or signed context",
      "Reject user-supplied payment sources unless explicitly authorized",
      "Detect repeated debt-balanced lock cycles from the same router allowance",
    ],
    timeline: standardTimeline,
    tweets: [
      {
        author: "Defimon Alerts",
        handle: "@DefimonAlerts",
        time: "May 5",
        content:
          "Ekubo.org loss $1.38M. Missing access control: payCallback trusted from address in packed instruction calldata.",
        tag: "Warning",
      },
      ...baseTweets.slice(1),
    ],
  },
  {
    id: "sharwa-spot-oracle-nft-collateral",
    protocol: "Sharwa MarginTrading",
    logo: "SH",
    chain: "Arbitrum",
    severity: "MEDIUM",
    status: "MONITORING",
    category: "Oracle Manipulation",
    loss: "$32,850",
    lossValue: 32850,
    timestamp: "May 1, 2026",
    confidence: 81,
    riskLevel: "Low-liquidity oracle risk",
    summary:
      "Defimon-style Telegram alert: Sharwa priced Hegic option NFT collateral from a low-liquidity Uniswap V3 spot quote without TWAP or Chainlink fallback.",
    attackExplanation:
      "The attacker used safeTransferFrom on a Hegic option NFT to trigger onERC721Received and drain about 33k USDC through spot-priced collateral assumptions.",
    rootCause:
      "MarginTrading relied on a low-liquidity spot Quoter for NFT collateral pricing instead of TWAP, Chainlink, or conservative pricing fallback.",
    attackVector: "Spot oracle manipulation with NFT collateral callback path",
    vulnerability: "Low-liquidity spot quote accepted as collateral value",
    affectedContracts: [
      "0x05cfcfe9bdf8d19aaea3ba417e6559aee37c82120974e75335d06e56030f4dad",
      "0x4551835e7C40d2A3D407C89D6a91eFF98285C681",
      "0xadc949f8b8dfb89e4b2fa2cb0d46f11e395c2cf7",
      "0x729cf665c09ef112c607290415a566fffa45826f",
    ],
    mitigations: [
      "Replace spot quote collateral pricing with TWAP and independent oracle fallback",
      "Disable callback-sensitive collateral flows until reviewed",
      "Add liquidity depth checks before accepting option NFT collateral valuations",
    ],
    timeline: standardTimeline,
    tweets: [
      {
        author: "Defimon Alerts",
        handle: "@DefimonAlerts",
        time: "May 1",
        content:
          "Sharwa.finance loss $32,850. MarginTrading relied on Uniswap V3 spot Quoter for Hegic option NFT collateral.",
        tag: "Warning",
      },
      ...baseTweets.slice(1),
    ],
  },
  {
    id: "drift-durable-nonce-hack",
    protocol: "Drift Protocol",
    logo: "DR",
    chain: "Solana",
    severity: "CRITICAL",
    status: "ACTIVE",
    category: "Durable Nonce Abuse",
    loss: "$285M",
    lossValue: 285000000,
    timestamp: "Apr 1, 2026",
    confidence: 96,
    riskLevel: "Ecosystem-level crisis",
    summary:
      "Six-month social engineering campaign used Solana durable nonces, fake CVT collateral, and compromised contributor environments to drain $285M.",
    attackExplanation:
      "Attackers built trust with Drift contributors, compromised development workflows, staged a fake collateral token, and used pre-signed durable nonce transactions to silently transfer admin control before draining real assets within minutes.",
    rootCause:
      "High-privilege signing workflows lacked pre-execution intent verification, durable nonce safeguards, and strong signer counterparty validation.",
    attackVector: "Social engineering plus durable nonce pre-signature abuse",
    vulnerability: "Dormant admin transactions could execute later without clear real-time signer awareness",
    affectedContracts: ["Drift Security Council", "CVT collateral config", "Market admin authority", "Borrow limit controls"],
    mitigations: [
      "Require transaction simulation and intent checks for every admin signature",
      "Add timelocks and secondary authentication for durable nonce transactions",
      "Run quarterly social-engineering drills for all multisig signers",
    ],
    timeline: driftTimeline,
    tweets: baseTweets,
  },
  {
    id: "upbit-solana-hot-wallet-breach",
    protocol: "Upbit Exchange",
    logo: "UP",
    chain: "Solana",
    severity: "CRITICAL",
    status: "CONTAINED",
    category: "Hot Wallet Compromise",
    loss: "$36.8M",
    lossValue: 36800000,
    timestamp: "Nov 27, 2025",
    confidence: 91,
    riskLevel: "Custodial hot-wallet exposure",
    summary:
      "South Korea's largest exchange suffered abnormal Solana-asset withdrawals from internet-connected hot wallet infrastructure.",
    attackExplanation:
      "The attacker exploited online wallet exposure and withdrew Solana-based assets before operational monitoring thresholds could stop the outflow.",
    rootCause:
      "Large volumes of liquid assets remained accessible through internet-connected wallet systems instead of stronger cold-storage and HSM controls.",
    attackVector: "Hot wallet private-key or signing infrastructure compromise",
    vulnerability: "Operational liquidity wallet was exposed to online attack paths",
    affectedContracts: ["Upbit Solana hot wallet", "Exchange withdrawal system", "Custodial asset controls"],
    mitigations: [
      "Move excess liquidity to cold storage",
      "Use HSM-backed signing policies for operational wallets",
      "Add real-time anomaly limits by asset, wallet, and withdrawal velocity",
    ],
    timeline: standardTimeline,
    tweets: baseTweets,
  },
  {
    id: "loopscale-oracle-manipulation",
    protocol: "Loopscale",
    logo: "LP",
    chain: "Solana",
    severity: "HIGH",
    status: "CONTAINED",
    category: "Oracle Manipulation",
    loss: "$5.8M",
    lossValue: 5800000,
    timestamp: "Apr 26, 2025",
    confidence: 92,
    riskLevel: "Recovered DeFi lending incident",
    summary:
      "Oracle manipulation against RateX PT collateral enabled undercollateralized loans from Loopscale's USDC and SOL Genesis Vaults.",
    attackExplanation:
      "The attacker manipulated a collateral price feed, inflated perceived value, borrowed against it, and withdrew 5.7M USDC plus 1,211 SOL.",
    rootCause:
      "Collateral pricing accepted manipulated oracle values without enough independent validation, circuit breakers, or deviation controls.",
    attackVector: "Oracle price manipulation against lending collateral",
    vulnerability: "Thin oracle validation for RateX Principal Token collateral",
    affectedContracts: ["RateX PT price adapter", "USDC Genesis Vault", "SOL Genesis Vault", "Loopscale risk engine"],
    mitigations: [
      "Require independent oracle validation",
      "Add deviation thresholds and emergency circuit breakers",
      "Stress-test new markets during the first weeks after launch",
    ],
    timeline: standardTimeline,
    tweets: baseTweets,
  },
  {
    id: "noones-cross-chain-bridge-exploit",
    protocol: "NoOnes Bridge",
    logo: "NO",
    chain: "Solana",
    secondaryChains: ["Ethereum", "TRON", "BSC"],
    severity: "HIGH",
    status: "MONITORING",
    category: "Bridge Exploit",
    loss: "~$8M",
    lossValue: 8000000,
    timestamp: "Jan 1, 2025",
    confidence: 89,
    riskLevel: "Cross-chain liquidity risk",
    summary:
      "Hundreds of sub-threshold transactions drained hot wallets across Ethereum, TRON, Solana, and BSC before funds moved toward Tornado Cash.",
    attackExplanation:
      "The attacker structured withdrawals below alert thresholds across multiple chains, exploiting bridge architecture and complicating recovery through mixing routes.",
    rootCause:
      "Bridge and hot-wallet monitoring relied on per-transaction thresholds rather than correlated multi-chain outflow detection.",
    attackVector: "Cross-chain bridge vulnerability and hot-wallet draining",
    vulnerability: "Sub-threshold transaction structuring bypassed automated alerts",
    affectedContracts: ["NoOnes Solana bridge", "Ethereum hot wallet", "TRON hot wallet", "BSC hot wallet"],
    mitigations: [
      "Correlate withdrawals across chains and time windows",
      "Apply cumulative outflow limits per bridge corridor",
      "Pre-register freeze workflows with stablecoin issuers and exchanges",
    ],
    timeline: standardTimeline,
    tweets: baseTweets,
  },
  {
    id: "solana-owner-permission-phishing",
    protocol: "Solana Phishing Wave",
    logo: "PH",
    chain: "Solana",
    severity: "HIGH",
    status: "MONITORING",
    category: "Owner Permission Phishing",
    loss: "$3M+",
    lossValue: 3000000,
    timestamp: "Dec 2025",
    confidence: 94,
    riskLevel: "User-level persistent control risk",
    summary:
      "Phishing transactions abused Solana owner reassignment, giving attacker-controlled programs delayed control over victim accounts.",
    attackExplanation:
      "Victims signed deceptive transactions disguised as approvals, mints, or DApp interactions. The transaction silently reassigned account owner permissions to an attacker-controlled program.",
    rootCause:
      "Wallet UX did not make owner reassignment risk obvious enough before signing, and users could approve dangerous native-account changes without clear simulation.",
    attackVector: "Owner permission reassignment through deceptive wallet signing",
    vulnerability: "Legitimate Solana account ownership mechanics abused by phishing flows",
    affectedContracts: ["Victim token accounts", "Attacker owner program", "Wallet signing UX", "DeFi positions"],
    mitigations: [
      "Show owner reassignment warnings in wallet simulation",
      "Block or require hardware approval for account-owner changes",
      "Monitor delayed drains after suspicious permission changes",
    ],
    timeline: standardTimeline,
    tweets: baseTweets,
  },
  {
    id: "texture-vault-exploit",
    protocol: "Texture Protocol",
    logo: "TX",
    chain: "Solana",
    severity: "MEDIUM",
    status: "ATTRIBUTED",
    category: "Smart Contract Bug",
    loss: "$2.2M",
    lossValue: 2200000,
    timestamp: "Jul 2025",
    confidence: 87,
    riskLevel: "Isolated vault exploit",
    summary:
      "A targeted vault vulnerability allowed an attacker to steal approximately $2.2M from one Texture lending vault.",
    attackExplanation:
      "The exploit appears isolated to a specific vault code path rather than a protocol-wide architecture failure, but funds were not recovered.",
    rootCause:
      "Vault-level controls did not stop the vulnerable withdrawal path before user funds left the affected market.",
    attackVector: "Targeted smart-contract vault vulnerability",
    vulnerability: "Vault logic lacked sufficient circuit breakers and withdrawal rate limits",
    affectedContracts: ["Texture vault", "Lending market controller", "Withdrawal path"],
    mitigations: [
      "Add vault-level circuit breakers",
      "Use per-vault withdrawal rate limits",
      "Expand fuzzing and invariant tests around vault accounting",
    ],
    timeline: standardTimeline,
    tweets: baseTweets,
  },
];

export const liveAlerts = [
  "SingularityFinance.ai oracle misconfiguration — ~$413K drained from Base vault (Apr 26)",
  "TrustedVolumes resolver exploit added from X security alert demo",
  "Drift dossier updated with durable nonce abuse timeline",
  "Upbit hot-wallet breach added to Solana incident archive",
  "Loopscale recovery status verified after attacker negotiations",
  "NoOnes bridge route flagged across Solana, Ethereum, TRON, and BSC",
  "Paid forensic report unlocked through Solana USDC simulation",
];
