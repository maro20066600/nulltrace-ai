"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  LockKeyhole,
  MessageCircle,
  Play,
  RadioTower,
  Search,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { TelegramMonitor } from "@/components/monitor/TelegramMonitor";
import { incidents } from "@/lib/mock-data/incidents";

const demoIncident = incidents[0];

type RelatedTweet = {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  tag: string;
  url?: string;
  metrics?: {
    likes: number;
    reposts: number;
    replies: number;
  };
};

const replaySteps = [
  {
    title: "Suspicious contract detected",
    detail: "Scout Agent flags the TrustedVolumes resolver victim contract and exploit transaction from X intelligence.",
  },
  {
    title: "X/Twitter scan starts",
    detail: "Reporter Agent searches researcher posts, warnings, confirmations, and fake-loss claims.",
  },
  {
    title: "Related tweets attached",
    detail: "NullTrace links demo social intelligence directly to the incident dossier.",
  },
  {
    title: "Free vs instant report decision",
    detail: "The public report remains preliminary; paid mode runs agents now, free full report unlocks in 24h.",
  },
];

export function JudgeDemo() {
  const [twitterScanned, setTwitterScanned] = useState(false);
  const [replayStarted, setReplayStarted] = useState(false);
  const [loadingTweets, setLoadingTweets] = useState(false);
  const [tweetSource, setTweetSource] = useState<"not-scanned" | "live" | "fallback">("not-scanned");
  const [xStatus, setXStatus] = useState("Not scanned yet");
  const [relatedTweets, setRelatedTweets] = useState<RelatedTweet[]>(
    demoIncident.tweets.map((tweet, index) => ({
      id: `initial-${index}`,
      author: tweet.author,
      handle: tweet.handle,
      time: tweet.time,
      content: tweet.content,
      tag: tweet.tag,
      url: "https://x.com",
      metrics: { likes: 0, reposts: 0, replies: 0 },
    })),
  );

  const scanX = async () => {
    setLoadingTweets(true);
    setTwitterScanned(true);

    const query = `${demoIncident.affectedContracts[0]} OR ${demoIncident.protocol} -is:retweet lang:en`;
    const response = await fetch(`/api/x/related?q=${encodeURIComponent(query)}`, { cache: "no-store" });
    const payload = (await response.json()) as {
      live?: boolean;
      source?: string;
      error?: string;
      tweets?: RelatedTweet[];
    };

    setRelatedTweets(payload.tweets || []);
    setTweetSource(payload.live ? "live" : "fallback");
    setXStatus(
      payload.live
        ? "Live X API results loaded"
        : payload.error
          ? `${payload.error}; showing demo fallback`
          : "No live X results; showing demo fallback",
    );
    setLoadingTweets(false);
  };

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              judge-friendly demo mode
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black text-white sm:text-5xl">
              One click demo: detect a new hack, scan X, then unlock the instant report.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              This is the clean hackathon path. A fresh Web3 contract incident is free while we investigate. Related
              tweets appear as demo social intelligence. The immediate forensic report is paid; the full free version
              unlocks after 24 hours.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setReplayStarted(true)}>
                <Play className="h-4 w-4" />
                Replay Demo
              </Button>
              <Button variant="ghost" onClick={scanX}>
                <MessageCircle className="h-4 w-4" />
                Scan X/Twitter
              </Button>
              <Button asChild variant="ghost">
                <Link href="/analysis">
                  <LockKeyhole className="h-4 w-4" />
                  Pay Instant Report
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
              <ShieldAlert className="h-4 w-4" />
              live demo case
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">{demoIncident.protocol}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{demoIncident.summary}</p>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-slate-500">Detected</span>
                <span className="font-mono text-cyan-100">{demoIncident.timestamp}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-slate-500">Status</span>
                <span className="font-mono text-amber-100">Investigating</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-slate-500">Free report</span>
                <span className="font-mono text-cyan-100">Full unlock in 24h</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                <Search className="h-4 w-4" />
                X/Twitter demo integration
              </div>
              <h2 className="mt-2 text-2xl font-black text-white">Related tweets pulled into the case</h2>
            </div>
            <Button size="sm" onClick={scanX} disabled={loadingTweets}>
              {loadingTweets ? "Scanning..." : "Scan X"}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-300">
              {tweetSource === "live"
                ? "Live X API results"
                : tweetSource === "fallback"
                  ? "Demo fallback results"
                  : "Not scanned yet"}
            </span>
            <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan-100">
              Recent search endpoint ready
            </span>
          </div>
          <div className="mt-3 rounded-md border border-white/10 bg-black/25 p-3 text-sm leading-6 text-slate-300">
            {xStatus}
          </div>
          <div className="mt-5 rounded-md border border-white/10 bg-black/35 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Demo query</p>
            <code className="mt-2 block break-all font-mono text-sm text-cyan-100">
              {demoIncident.affectedContracts[0]} OR TrustedVolumes OR Blockaid
            </code>
          </div>
          <AnimatePresence>
            {twitterScanned ? (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-3">
                {relatedTweets.map((tweet, index) => (
                  <motion.article
                    key={tweet.id || tweet.handle}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-md border border-white/10 bg-black/30 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-white">{tweet.author}</p>
                        <p className="text-xs text-slate-500">
                          {tweet.handle} · {tweet.time}
                        </p>
                      </div>
                      <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100">
                        {tweet.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{tweet.content}</p>
                    <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                      <span>{tweet.metrics?.likes || 0} likes</span>
                      <span>{tweet.metrics?.reposts || 0} reposts</span>
                      <span>{tweet.metrics?.replies || 0} replies</span>
                      {tweet.url ? (
                        <a className="text-cyan-200 hover:text-white" href={tweet.url} target="_blank">
                          Open on X
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 rounded-md border border-white/10 bg-black/25 p-5 text-sm leading-6 text-slate-400"
              >
                Press Scan X to show the related tweets demo that will be attached to the incident dossier.
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
            <Bot className="h-4 w-4" />
            replay timeline
          </div>
          <h2 className="mt-2 text-2xl font-black text-white">What judges should see in 30 seconds</h2>
          <div className="mt-5 space-y-3">
            {replaySteps.map((step, index) => {
              const active = replayStarted || index === 0;
              return (
                <motion.div
                  key={step.title}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0.45, x: 0 }}
                  transition={{ delay: replayStarted ? index * 0.18 : 0 }}
                  className="flex gap-3 rounded-md border border-white/10 bg-black/30 p-4"
                >
                  <div className="mt-1">
                    {active ? (
                      <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                    ) : (
                      <RadioTower className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button asChild variant="ghost">
              <Link href={`/incidents/${demoIncident.id}`}>
                Open Free Case
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/analysis">
                <Clock className="h-4 w-4" />
                Instant Paid Report
              </Link>
            </Button>
          </div>
        </GlassCard>
      </div>
      <TelegramMonitor />
    </div>
  );
}
