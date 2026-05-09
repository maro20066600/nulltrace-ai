export type ParsedDefimonAlert = {
  protocol: string;
  loss: string;
  date: string;
  type: string;
  chain: string;
  summary: string;
  tx?: string;
  victim?: string;
  router?: string;
  attacker?: string;
  drainedUser?: string;
  sourceUrl?: string;
};

function extractUrl(label: string, text: string) {
  const match = text.match(new RegExp(`${label}:\\s*(https?:\\/\\/\\S+)`, "i"));
  return match?.[1];
}

function detectChain(text: string): string {
  const lower = text.toLowerCase();
  // Check block-explorer domains first (most reliable)
  if (lower.includes("basescan.org")) return "Base";
  if (lower.includes("arbiscan.io")) return "Arbitrum";
  if (lower.includes("bscscan.com")) return "BSC";
  if (lower.includes("solscan.io") || lower.includes("solana")) return "Solana";
  if (lower.includes("tronscan.org")) return "TRON";
  // Fallback: keyword scan
  if (lower.includes(" on base") || lower.includes("\nbase ")) return "Base";
  if (lower.includes(" on arbitrum") || lower.includes("arbitrum ")) return "Arbitrum";
  if (lower.includes(" on bsc") || lower.includes(" on bnb")) return "BSC";
  return "Ethereum";
}

export function parseDefimonAlert(text: string): ParsedDefimonAlert {
  const header = text.match(/🚨\s*(.*?)\s*-\s*Loss\s*(.*?)\s*\((\d{4}-\d{2}-\d{2})\)/);
  const type = text.match(/Type:\s*(.*)/)?.[1]?.trim() || "Undisclosed DeFi Exploit";
  const chain = detectChain(text);
  const sourceUrl = text.match(/https:\/\/x\.com\/DefimonAlerts\/status\/\d+/)?.[0];

  // Extract the first real body paragraph — skip the header and the Type: line
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  // First paragraph is always the header line; skip it and any "Type:" paragraphs
  const bodyParagraph =
    paragraphs.find(
      (p) => !p.startsWith("🚨") && !p.startsWith("Type:") && !p.startsWith("TX:") && !p.startsWith("http"),
    ) ?? paragraphs[1] ?? text;

  return {
    protocol: header?.[1]?.trim() || "Unknown Protocol",
    loss: header?.[2]?.trim() || "Under review",
    date: header?.[3]?.trim() || "Unknown date",
    type,
    chain,
    summary: bodyParagraph,
    tx: extractUrl("TX", text),
    victim: extractUrl("Victim(?: \\([^)]*\\))?", text),
    router: extractUrl("Router|Victim \\(router\\)|Vulnerable Oracle|Oracle", text),
    attacker: extractUrl("Attacker", text),
    drainedUser: extractUrl("Drained user", text),
    sourceUrl,
  };
}

export const defimonTemplates = [
  `🚨 SingularityFinance.ai  - Loss ~$413K (2026-04-26)

Type: Oracle Misconfiguration / Share Inflation

The dynBaseUSDCv3 vault on Base prices its non-USDC reserves via UniswapV3Oracle. On 2026-01-19 the protocol admin registered the six yield-token oracle routes with a Uniswap V3 fee tier of 42. Uniswap V3 only enables fee tiers 100/500/3000/10000, so factory.getPool(USDC, X, 42) returns address(0) for every token - silently killing the direct price path. The WETH-fallback pools that did exist had zero liquidity, as a result VaultTokensLib.totalAssets() only counted the ~$100 idle USDC. 

The attacker flash-loaned 100k USDC from Morpho, deposited into the vault to mint ~99.99% of supply at the broken ratio, then redeemed the tokens to get a proportional cut of every actual token balance independently of the oracle, draining the underlying yield tokens.

This is a preliminary research, the official post-mortem to follow as per announcement in Telegram: https://t.me/Singularity_Fi/262366

TX: https://basescan.org/tx/0x00b949bc3ed3edb58b04faedfbd8eb1db2edceae761382e80fe012919f8d3732
Victim: https://basescan.org/address/0x67b93f6676bd1911c5fae7ffa90fff5f35e14dcd
Oracle: https://basescan.org/address/0x73b8c192bfc323c3ea224c88219d55dfc319e89f
setUniV3fee=42: https://basescan.org/tx/0x2df0be7a17bd69a2f732c1396796690240aecdfaf13b0a8f60f49f95a8dbe150

https://x.com/DefimonAlerts/status/2048698708309705069`,
  `🚨 TrustedVolumes.com - Loss $5.87M (2026-05-07)

Type: Signature/Execution Parameter Mismatch

The TrustedVolumes RFQ proxy has a critically broken fill function. The EIP-712 signature commits to (makerToken, takerToken, makerAmount, takerAmount, maker, counterparty, expiry, salt), and the contract checks _allowedOrderSigner[signedMaker][recoveredSigner]. But the function also takes unsigned calldata that does the actual transfer - including the real from address, real token, and real amounts. Nothing binds the executed from to the signed maker.

TX: https://etherscan.io/tx/0xc5c61b3ac39d854773b9dc34bd0cdbc8b5bbf75f18551802a0b5881fcb990513
Victim: https://etherscan.io/address/0x9bA0CF1588E1DFA905eC948F7FE5104dD40EDa31
Router: https://etherscan.io/address/0xeeeeee53033F7227d488ae83a27Bc9A9D5051756

https://x.com/DefimonAlerts/status/2052296978067837292`,
  `🚨 Ekubo.org - Loss $1.38M (2026-05-05)

Type: Missing Access Control

Ekubo v2 locker blindly trusts the from address embedded in the locker's packed instruction payload. Its payCallback(token,id,_,amount,from) does a transferFrom with from taken straight from user-supplied calldata.

TX: https://etherscan.io/tx/0x770bc9a1f7c32cb63a5002b9ceb5c7994cd3af0fc6b2309cb32d3c46f629daa0
Victim (router): https://etherscan.io/address/0x8ccb1ffd5c2aa6bd926473425dea4c8c15de60fd
Drained user: https://etherscan.io/address/0x765decf4fa157756e850c1079f60801b9219edd1

https://x.com/DefimonAlerts/status/2051944103118573736`,
  `🚨 Sharwa.finance - Loss $32,850 (2026-05-01)

Sharwa's MarginTrading priced Hegic option NFT collateral via Uniswap V3's spot Quoter on a low-liquidity USDC.e/USDC pool with no TWAP or Chainlink fallback.

TX: https://arbiscan.io/tx/0x05cfcfe9bdf8d19aaea3ba417e6559aee37c82120974e75335d06e56030f4dad
Attacker: https://arbiscan.io/address/0x4551835e7C40d2A3D407C89D6a91eFF98285C681
Victim (MarginTrading): https://arbiscan.io/address/0xadc949f8b8dfb89e4b2fa2cb0d46f11e395c2cf7
Vulnerable Oracle: https://arbiscan.io/address/0x729cf665c09ef112c607290415a566fffa45826f

https://x.com/DefimonAlerts/status/2050000000000000000`,
];

export function parseDefimonTemplates() {
  return defimonTemplates.map(parseDefimonAlert);
}
