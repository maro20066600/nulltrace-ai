import { NextResponse } from "next/server";

export type ScanResult = {
  verdict: "hack" | "benign" | "uncertain";
  confidence: number;
  reason: string;
  indicators: string[];
  demoMode: boolean;
};

const SYSTEM_PROMPT = `You are an expert DeFi security analyst specializing in on-chain exploit detection.
Given a transaction hash and chain, analyze whether this transaction represents a hack, exploit, or attack — or if it is benign.
Respond ONLY with valid JSON matching this exact schema:
{
  "verdict": "hack" | "benign" | "uncertain",
  "confidence": number (0-100),
  "reason": string (1-3 sentences explaining your verdict),
  "indicators": string[] (list of specific on-chain signals that informed your verdict)
}
Do not include any text outside the JSON object.`;

function buildUserPrompt(txHash: string, chain: string): string {
  return `Transaction: ${txHash}
Chain: ${chain}

Analyze this transaction and determine if it is a hack/exploit or benign activity. 
Consider: flash loans, large value transfers, oracle interactions, reentrancy patterns, 
fund routing to mixers, unusual contract interactions, and known attack vectors.
Return your analysis as JSON.`;
}

// Mock analysis for demo mode (no API key)
function mockAnalysis(txHash: string): ScanResult {
  // Deterministic mock based on hash prefix
  const prefix = txHash.toLowerCase().replace(/^0x/, "").slice(0, 4);
  const val = parseInt(prefix, 16);

  if (val < 0x3000) {
    return {
      verdict: "hack",
      confidence: 87,
      reason:
        "Demo analysis: Transaction exhibits flash loan acquisition followed by large-scale token outflows to an external address. Pattern is consistent with oracle manipulation or share inflation attacks.",
      indicators: [
        "Flash loan call detected (Morpho / Balancer / Aave)",
        "Large mint of vault shares at abnormal ratio",
        "Immediate full redemption to attacker EOA",
        "Tokens bridged to external chain within 2 blocks",
      ],
      demoMode: true,
    };
  } else if (val < 0x9000) {
    return {
      verdict: "uncertain",
      confidence: 61,
      reason:
        "Demo analysis: Transaction involves complex multi-step interactions with DeFi protocols. Requires deeper forensic analysis to rule out exploit patterns — some indicators are present but not conclusive.",
      indicators: [
        "Multi-protocol interaction in single tx",
        "Unusual token flow path detected",
        "Contract not previously flagged",
        "Value discrepancy before/after",
      ],
      demoMode: true,
    };
  } else {
    return {
      verdict: "benign",
      confidence: 91,
      reason:
        "Demo analysis: Transaction appears to be routine DeFi interaction — likely a standard swap, liquidity provision, or yield harvest. No indicators of malicious activity detected.",
      indicators: [
        "Standard ERC-20 approve + swap pattern",
        "Known DEX router interaction",
        "Value transferred matches expected swap output",
        "No flash loan detected",
      ],
      demoMode: true,
    };
  }
}

async function callOpenAI(
  apiKey: string,
  txHash: string,
  chain: string,
): Promise<ScanResult> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(txHash, chain) },
      ],
      temperature: 0.1,
      max_tokens: 600,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  const content = data.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as Omit<ScanResult, "demoMode">;
  return { ...parsed, demoMode: false };
}

async function callAnthropic(
  apiKey: string,
  txHash: string,
  chain: string,
): Promise<ScanResult> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(txHash, chain) }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    content: { type: string; text: string }[];
  };
  const text = data.content.find((c) => c.type === "text")?.text ?? "{}";
  const parsed = JSON.parse(text) as Omit<ScanResult, "demoMode">;
  return { ...parsed, demoMode: false };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    txHash?: string;
    chain?: string;
    apiKey?: string;
    provider?: "openai" | "anthropic";
  };

  const txHash = body.txHash?.trim() ?? "";
  const chain = body.chain?.trim() ?? "Ethereum";
  const apiKey = body.apiKey?.trim() ?? "";
  const provider = body.provider ?? "openai";

  if (!txHash) {
    return NextResponse.json({ error: "txHash is required" }, { status: 400 });
  }

  // No API key → demo mode
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1200)); // simulate latency
    return NextResponse.json(mockAnalysis(txHash));
  }

  try {
    const result =
      provider === "anthropic"
        ? await callAnthropic(apiKey, txHash, chain)
        : await callOpenAI(apiKey, txHash, chain);

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message, demoMode: false },
      { status: 500 },
    );
  }
}
