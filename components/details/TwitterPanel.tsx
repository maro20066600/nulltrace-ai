import { BadgeCheck, Search, Siren } from "lucide-react";
import type { TweetIntel } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";

export function TwitterPanel({ tweets }: { tweets: TweetIntel[] }) {
  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-bold text-white">Related Tweets</h2>
      <p className="mt-1 text-sm text-slate-500">
        Demo X/Twitter integration for researcher posts, warnings, and fake-info checks
      </p>
      <div className="mt-4 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
          <Search className="h-4 w-4" />
          related tweets demo scan
        </div>
        <p className="mt-2 text-sm text-slate-300">
          NullTrace links social posts to the incident by contract mentions, protocol name, researcher credibility, and
          fake-loss detection tags.
        </p>
      </div>
      <div className="mt-5 max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {tweets.concat(tweets).map((tweet, index) => (
          <article key={`${tweet.handle}-${index}`} className="rounded-md border border-white/10 bg-black/30 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">{tweet.author}</p>
                  <BadgeCheck className="h-4 w-4 text-cyan-200" />
                </div>
                <p className="text-xs text-slate-500">
                  {tweet.handle} · {tweet.time}
                </p>
              </div>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">
                {tweet.tag}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{tweet.content}</p>
            {tweet.tag === "Fake Info Flag" ? (
              <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-200">
                <Siren className="h-4 w-4" />
                suppressed by misinformation filter
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </GlassCard>
  );
}
