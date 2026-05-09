import { ThreatSimulation } from "@/components/lab/ThreatSimulation";
import { CyberGrid } from "@/components/ui/CyberGrid";

export default function LabPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl">
        <ThreatSimulation />
      </div>
    </main>
  );
}
