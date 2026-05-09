"use client";

import { useState } from "react";
import { Check, Eye, EyeOff, Key, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

export type StoredKeys = {
  openai: string;
  anthropic: string;
};

export function ApiKeyPanel({
  keys,
  onSave,
}: {
  keys: StoredKeys;
  onSave: (keys: StoredKeys) => void;
}) {
  const [draft, setDraft] = useState<StoredKeys>(keys);
  const [show, setShow] = useState({ openai: false, anthropic: false });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function hasKey(provider: keyof StoredKeys) {
    return (keys[provider] || "").length > 6;
  }

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Key className="h-4 w-4 text-cyan-300" />
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
          API Keys
        </h2>
      </div>

      <p className="mb-4 text-[11px] leading-relaxed text-slate-400">
        Keys are stored in your browser only and never logged server-side.
        Required to run real AI scans — demo mode works without a key.
      </p>

      <div className="space-y-3">
        {/* OpenAI */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              OpenAI API Key
            </label>
            {hasKey("openai") && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                Saved
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={show.openai ? "text" : "password"}
                value={draft.openai}
                onChange={(e) => setDraft((d) => ({ ...d, openai: e.target.value }))}
                placeholder="sk-…"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-9 font-mono text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, openai: !s.openai }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {show.openai ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Anthropic */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              Anthropic API Key
            </label>
            {hasKey("anthropic") && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                Saved
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type={show.anthropic ? "text" : "password"}
              value={draft.anthropic}
              onChange={(e) => setDraft((d) => ({ ...d, anthropic: e.target.value }))}
              placeholder="sk-ant-…"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-9 font-mono text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, anthropic: !s.anthropic }))}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {show.anthropic ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        size="sm"
        className="mt-4 w-full"
        variant={saved ? "ghost" : "primary"}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">Saved</span>
          </>
        ) : (
          "Save Keys"
        )}
      </Button>
    </GlassCard>
  );
}
