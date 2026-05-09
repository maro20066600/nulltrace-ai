import { CyberGrid } from "@/components/ui/CyberGrid";
import { IncidentFeed } from "@/components/incidents/IncidentFeed";

export default function IncidentsPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl">
        <IncidentFeed />
      </div>
    </main>
  );
}
