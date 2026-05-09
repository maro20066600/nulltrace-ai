import { JudgeDemo } from "@/components/demo/JudgeDemo";
import { CyberGrid } from "@/components/ui/CyberGrid";

export default function DemoPage() {
  return (
    <main className="relative min-h-screen px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <CyberGrid />
      <div className="relative mx-auto max-w-7xl">
        <JudgeDemo />
      </div>
    </main>
  );
}
