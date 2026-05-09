import { TelegramMonitor } from "@/components/monitor/TelegramMonitor";
import { CyberGrid } from "@/components/ui/CyberGrid";

export const metadata = {
  title: "NullTrace | Telegram Monitor — DeFi Alert Feed",
  description:
    "Live DeFi security alert monitor sourced from @defimon_alerts on Telegram. AI-powered TX scanner to detect hacks and exploits.",
};

export default function MonitorPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl">
        <TelegramMonitor />
      </div>
    </main>
  );
}
