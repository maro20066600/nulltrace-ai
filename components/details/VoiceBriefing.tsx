import { Mic2, Play } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function VoiceBriefing() {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
            <Mic2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Voice Briefing</h2>
            <p className="text-sm text-slate-500">Generated incident narration for security leadership</p>
          </div>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full bg-cyan-300 text-black shadow-[0_0_28px_rgba(0,255,209,.35)]">
          <Play className="h-5 w-5 fill-black" />
        </button>
      </div>
      <div className="mt-6 flex h-24 items-center gap-1 rounded-lg border border-white/10 bg-black/35 p-4">
        {Array.from({ length: 46 }).map((_, index) => (
          <span
            key={index}
            className="wavebar w-full rounded-full bg-gradient-to-t from-cyan-300 to-rose-400"
            style={{
              height: `${18 + ((index * 17) % 54)}%`,
              animationDelay: `${index * 0.035}s`,
            }}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100">
        briefing ready · 00:58 · analyst-grade summary
      </p>
    </GlassCard>
  );
}
