import { AgentStatusPanel } from "@/components/landing/AgentStatusPanel";
import { ContractLookup } from "@/components/landing/ContractLookup";
import { HeroSection } from "@/components/landing/HeroSection";
import { PublicExplainer } from "@/components/landing/PublicExplainer";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { getUnifiedFeed } from "@/lib/feed";

export default function Home() {
  const feed = getUnifiedFeed();

  return (
    <>
      <HeroSection />
      <main className="relative mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <PublicExplainer />
        <ContractLookup feed={feed} />

        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">AI agent mesh</p>
              <h2 className="mt-2 text-3xl font-black text-white">Autonomous security operators</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Scout, Analyst, Forensics, and Reporter agents coordinate detection, classification, tracing, and
              investor-grade incident briefings.
            </p>
          </div>
          <AgentStatusPanel />
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-rose-100">
                latest incidents
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">Recent exploit cases</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Public summaries are free. Open any hack to see the timeline, root cause, related posts, wallet-flow
              visualization, and technical mitigation notes.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {feed.slice(0, 6).map((incident, index) => (
              <IncidentCard key={incident.id} incident={incident} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
