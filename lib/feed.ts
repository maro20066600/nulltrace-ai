import type { Incident } from "@/lib/types";
import { incidents as mockIncidents } from "@/lib/mock-data/incidents";
import { parseDefimonTemplates } from "@/lib/telegram/defimon-parser";

/**
 * Converts a parsed Defimon alert into a minimal Incident shape
 * so it can be shown in the same feed as mock incidents.
 * The Telegram origin is intentionally not exposed in the output.
 */
function defimonToIncident(
  alert: ReturnType<typeof parseDefimonTemplates>[number],
): Incident {
  // Derive a stable slug-style id
  const slug = alert.protocol
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Map alert type to the closest ExploitCategory
  const categoryMap: Record<string, Incident["category"]> = {
    "oracle misconfiguration": "Oracle Misconfiguration",
    "oracle manipulation": "Oracle Manipulation",
    "missing access control": "Missing Access Control",
    "signature": "Signature/Execution Parameter Mismatch",
    "execution parameter": "Signature/Execution Parameter Mismatch",
    "bridge": "Bridge Exploit",
    "rug pull": "Rug Pull",
    phishing: "Phishing",
    "smart contract": "Smart Contract Bug",
    liquidity: "Liquidity Drain",
  };
  const typeLower = alert.type.toLowerCase();
  const category =
    (Object.entries(categoryMap).find(([key]) =>
      typeLower.includes(key),
    )?.[1] as Incident["category"]) ?? "Smart Contract Bug";

  // Parse loss string into a rough numeric value for sorting
  const lossNum = (() => {
    const m = alert.loss.match(/([\d,.]+)\s*([KMBkmb]?)/);
    if (!m) return 0;
    const base = parseFloat(m[1].replace(/,/g, ""));
    const mult = { k: 1e3, m: 1e6, b: 1e9 }[m[2].toLowerCase()] ?? 1;
    return base * mult;
  })();

  // Determine severity from loss value
  const severity: Incident["severity"] =
    lossNum >= 5_000_000
      ? "CRITICAL"
      : lossNum >= 500_000
        ? "HIGH"
        : lossNum >= 50_000
          ? "MEDIUM"
          : "LOW";

  // Collect on-chain addresses from the known fields
  const contracts = [alert.tx, alert.victim, alert.router, alert.attacker, alert.drainedUser]
    .filter(Boolean) as string[];

  return {
    id: slug,
    protocol: alert.protocol,
    logo: alert.protocol
      .split(/[\s.]+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join(""),
    chain: alert.chain as Incident["chain"],
    severity,
    status: "MONITORING",
    category,
    loss: alert.loss,
    lossValue: lossNum,
    timestamp: alert.date,
    confidence: 88,
    riskLevel: `${alert.type} — AI-flagged`,
    summary: alert.summary,
    attackExplanation: alert.summary,
    rootCause: `Type: ${alert.type}. See source analysis for full root-cause breakdown.`,
    attackVector: alert.type,
    vulnerability: alert.type,
    affectedContracts: contracts,
    mitigations: [
      "Review all admin-configurable parameters before deployment",
      "Add invariant checks and circuit breakers to critical vault functions",
      "Use independent oracle validation with fallback and deviation checks",
    ],
    timeline: [
      {
        time: alert.date,
        title: "Incident detected",
        detail: alert.summary,
      },
    ],
    tweets: alert.sourceUrl
      ? [
          {
            author: "DefimonAlerts",
            handle: "@DefimonAlerts",
            time: alert.date,
            content: alert.summary,
            tag: "Warning",
          },
        ]
      : [],
  };
}

/**
 * Returns the unified incident feed: Defimon alerts + static mock incidents,
 * deduplicated and sorted newest-first (by lossValue as tiebreaker).
 * No reference to Telegram is exposed.
 */
export function getUnifiedFeed(): Incident[] {
  const defimonAlerts = parseDefimonTemplates();
  const defimonIncidents = defimonAlerts.map(defimonToIncident);

  // Deduplicate: if a Defimon alert id already exists in mock data, prefer the richer mock entry
  const mockIds = new Set(mockIncidents.map((i) => i.id));
  const freshAlerts = defimonIncidents.filter((i) => !mockIds.has(i.id));

  const merged = [...freshAlerts, ...mockIncidents];

  // Sort: newest date first, then by loss value descending
  return merged.sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime() || 0;
    const dateB = new Date(b.timestamp).getTime() || 0;
    if (dateB !== dateA) return dateB - dateA;
    return b.lossValue - a.lossValue;
  });
}
