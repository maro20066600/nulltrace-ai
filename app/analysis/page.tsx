import { ApiDashboard } from "@/components/portal/ApiDashboard";
import { ApiKeyGenerator } from "@/components/portal/ApiKeyGenerator";
import { PaymentFlow } from "@/components/portal/PaymentFlow";
import { CyberGrid } from "@/components/ui/CyberGrid";

export default function AnalysisPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <section className="max-w-4xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            paid Solana forensic analysis
          </p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Pay once. Unlock a deeper AI security report.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            The demo uses the first contract address from the latest investigation. The public page stays free while
            we verify the activity. Pay for an instant agent-generated report, or wait 24 hours for the complete free
            report to unlock.
          </p>
        </section>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <PaymentFlow />
          <ApiKeyGenerator />
        </div>
        <ApiDashboard />
      </div>
    </main>
  );
}
