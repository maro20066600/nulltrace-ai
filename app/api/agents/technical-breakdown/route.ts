import { NextResponse } from "next/server";
import { incidents } from "@/lib/mock-data/incidents";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    incidentId?: string;
    contract?: string;
  };
  const incident = incidents.find((item) => item.id === body.incidentId) || incidents[0];
  const contract = body.contract || incident.affectedContracts[0];

  return NextResponse.json({
    source: process.env.OPENAI_API_KEY ? "openai-agent-configured-demo-response" : "local-agent-fallback",
    agent: "OpenAI Technical Breakdown Agent",
    incidentId: incident.id,
    contract,
    report: {
      title: `${incident.protocol} technical breakdown`,
      riskScore: incident.id === "trustedvolumes-resolver-exploit" ? 91 : incident.confidence,
      rootCauseHypothesis: incident.rootCause,
      exploitMechanism: incident.attackVector,
      vulnerableSurface: incident.vulnerability,
      evidence: incident.affectedContracts.slice(0, 4),
      recommendedActions: incident.mitigations,
      executiveSummary:
        "Paid agent report generated from the incident dossier, related social intelligence, on-chain identifiers, and exploit template parser output.",
    },
  });
}
