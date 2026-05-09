import { NextResponse } from "next/server";

export type SmartAnalysisResult = {
  riskScore: number;
  verdict: "malicious" | "suspicious" | "clean" | "unknown";
  rootCause: string;
  indicators: string[];
  mitigations: string[];
  summary: string;
  demoMode: boolean;
};

const SYSTEM_PROMPT = `You are a senior DeFi smart contract security analyst.
Given a contract address or transaction hash, provide a structured security assessment.
Respond ONLY with valid JSON matching this exact schema (no extra text):
{
  "riskScore": number (0-100, where 100 = confirmed exploit),
  "verdict": "malicious" | "suspicious" | "clean" | "unknown",
  "rootCause": string (1-2 sentences on the likely vulnerability or risk),
  "indicators": string[] (3-5 specific on-chain risk signals),
  "mitigations": string[] (2-4 recommended actions),
  "summary": string (2-3 sentence executive summary)
}`;

function buildPrompt(target: string): string {
  return `Analyze this target for DeFi exploit risk:

Target: ${target}

Consider: flash loan patterns, access control issues, oracle manipulation, reentrancy, 
unusual fund flows, known exploit signatures, privilege escalation, and share inflation attacks.
Provide a thorough security assessment as JSON.`;
}

function mockAnalysis(target: string): SmartAnalysisResult {
  const val = parseInt(target.replace(/^0x/, "").slice(0, 6), 16) || 0;
  const score = (val % 80) + 10;

  const isMalicious = score > 65;
  const isSuspicious = score > 35 && !isMalicious;

  return {
    riskScore: score,
    verdict: isMalicious ? "malicious" : isSuspicious ? "suspicious" : "unknown",
    rootCause: isMalicious
      ? "Demo: Contract exhibits flash-loan acquisition followed by disproportionate share minting — consistent with oracle misconfiguration or share inflation exploit."
      : isSuspicious
        ? "Demo: Contract shows non-standard interaction patterns with a lending vault. Possible price manipulation vector via low-liquidity oracle path."
        : "Demo: No definitive exploit signature detected. Contract may be involved in adjacent activity. Further on-chain tracing recommended.",
    indicators: isMalicious
      ? [
          "Flash loan from Morpho/Balancer detected in same block",
          "Vault share mint ratio deviates >1000x from expected",
          "Full token balance withdrawn within 2 blocks",
          "Recipient address has no prior on-chain history",
          "Oracle returned address(0) for multiple fee tiers",
        ]
      : [
          "Interaction with low-liquidity Uniswap V3 pool",
          "Large approve() preceding unusual token transfer",
          "Contract deployed within 48h of interaction",
          "No verified source code on block explorer",
        ],
    mitigations: [
      "Add totalAssets() deviation check and circuit breaker",
      "Validate oracle pool addresses are non-zero before use",
      "Implement TWAP with minimum observation window",
      "Add flash-loan guard (same-block deposit/withdraw prevention)",
    ],
    summary: isMalicious
      ? `Demo AI analysis: The target address shows strong indicators of an active exploit. High-confidence oracle manipulation or share inflation pattern detected with a risk score of ${score}/100. Immediate investigation recommended.`
      : `Demo AI analysis: Target shows moderate-risk signals (score ${score}/100). No confirmed exploit, but interaction patterns warrant manual review. Add an API key to run a real AI scan.`,
    demoMode: true,
  };
}

async function callOpenAI(apiKey: string, target: string): Promise<SmartAnalysisResult> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(target) },
      ],
      temperature: 0.1,
      max_tokens: 700,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  return { ...(JSON.parse(data.choices[0].message.content) as Omit<SmartAnalysisResult, "demoMode">), demoMode: false };
}

async function callAnthropic(apiKey: string, target: string): Promise<SmartAnalysisResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildPrompt(target) }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { content: { type: string; text: string }[] };
  const text = data.content.find((c) => c.type === "text")?.text ?? "{}";
  return { ...(JSON.parse(text) as Omit<SmartAnalysisResult, "demoMode">), demoMode: false };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    target?: string;
    apiKey?: string;
    provider?: "openai" | "anthropic";
  };

  const target = body.target?.trim() ?? "";
  const apiKey = body.apiKey?.trim() ?? "";
  const provider = body.provider ?? "openai";

  if (!target) {
    return NextResponse.json({ error: "target is required" }, { status: 400 });
  }

  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1400));
    return NextResponse.json(mockAnalysis(target));
  }

  try {
    const result =
      provider === "anthropic"
        ? await callAnthropic(apiKey, target)
        : await callOpenAI(apiKey, target);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Analysis failed" }, { status: 500 });
  }
}
