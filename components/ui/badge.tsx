import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/15 bg-white/7 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
