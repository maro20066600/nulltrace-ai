import type { Severity } from "@/lib/types";
import { cn } from "@/lib/utils";

const severityClass: Record<Severity, string> = {
  LOW: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  MEDIUM: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  HIGH: "border-orange-400/40 bg-orange-400/10 text-orange-200",
  CRITICAL: "border-rose-400/50 bg-rose-500/15 text-rose-200 shadow-[0_0_24px_rgba(255,45,85,.28)]",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-black tracking-[0.18em]",
        severityClass[severity],
      )}
    >
      {severity}
    </span>
  );
}
