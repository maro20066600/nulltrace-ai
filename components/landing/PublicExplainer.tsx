import Link from "next/link";
import { ArrowRight, BrainCircuit, CreditCard, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    icon: ShieldCheck,
    title: "We monitor the signal",
    text: "NullTrace watches Solana activity, security research, public reports, wallet movement, and protocol response signals.",
  },
  {
    icon: BrainCircuit,
    title: "AI writes the first brief",
    text: "Scout, Analyst, Forensics, and Reporter agents turn raw incident noise into a readable breakdown with confidence scoring.",
  },
  {
    icon: FileSearch,
    title: "You open the hack dossier",
    text: "Each hack has a public page with loss estimate, timeline, root cause, technical notes, wallet-flow view, and related posts.",
  },
  {
    icon: CreditCard,
    title: "Pay only for deeper analysis",
    text: "When someone needs wallet, transaction, or contract-level forensics, they unlock a premium report with a simulated Solana USDC payment.",
  },
];

export function PublicExplainer() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">What is NullTrace?</p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          A public intelligence room for Solana hacks.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-400">
          The homepage should be understandable before anyone pays. Visitors see what happened, how much was lost,
          why the exploit matters, and where to read the full forensic dossier. Payment appears only when they ask
          for deeper AI analysis of a wallet, transaction, or contract.
        </p>
        <Button asChild className="mt-6" variant="ghost">
          <Link href="/analysis">
            Unlock Paid Analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <GlassCard key={step.title} className="p-5">
              <Icon className="h-6 w-6 text-cyan-200" />
              <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
