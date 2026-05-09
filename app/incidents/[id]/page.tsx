import { notFound } from "next/navigation";
import { AIBreakdown } from "@/components/details/AIBreakdown";
import { AttackTimeline } from "@/components/details/AttackTimeline";
import { EmergencyBridgePanel } from "@/components/details/EmergencyBridgePanel";
import { IncidentHeader } from "@/components/details/IncidentHeader";
import { InvestigationAccessNotice } from "@/components/details/InvestigationAccessNotice";
import { TechnicalBreakdown } from "@/components/details/TechnicalBreakdown";
import { TwitterPanel } from "@/components/details/TwitterPanel";
import { VoiceBriefing } from "@/components/details/VoiceBriefing";
import { WalletFlowGraph } from "@/components/details/WalletFlowGraph";
import { X402PaymentGate } from "@/components/details/X402PaymentGate";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { getUnifiedFeed } from "@/lib/feed";
import { incidents } from "@/lib/mock-data/incidents";

export function generateStaticParams() {
  return incidents.map((incident) => ({ id: incident.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feed = getUnifiedFeed();
  const incident = feed.find((item) => item.id === id);
  return {
    title: incident ? `${incident.protocol} Exploit Analysis | NullTrace` : "Incident | NullTrace",
    description: incident
      ? `AI-powered forensic breakdown of the ${incident.protocol} ${incident.category} — ${incident.loss} lost. NullTrace security intelligence.`
      : "DeFi exploit forensic report — NullTrace AI security platform.",
  };
}

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feed = getUnifiedFeed();
  const incident = feed.find((item) => item.id === id) ?? incidents.find((item) => item.id === id);
  if (!incident) notFound();

  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <IncidentHeader incident={incident} />
        <X402PaymentGate incident={incident} />
        <InvestigationAccessNotice incident={incident} />
        <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <AIBreakdown incident={incident} />
            <WalletFlowGraph incident={incident} />
            <TechnicalBreakdown incident={incident} />
          </div>
          <div className="space-y-6">
            <EmergencyBridgePanel chain={incident.chain} />
            <AttackTimeline events={incident.timeline} />
            <TwitterPanel tweets={incident.tweets} />
            <VoiceBriefing />
          </div>
        </div>
      </div>
    </main>
  );
}
