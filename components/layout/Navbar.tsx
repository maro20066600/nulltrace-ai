import Link from "next/link";
import { Activity, CreditCard, Play, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PulsingDot } from "@/components/ui/PulsingDot";

const links = [
  { href: "/demo", label: "Demo Mode" },
  { href: "/incidents", label: "Incidents" },
  { href: "/archive", label: "Archive" },
  { href: "/lab", label: "Simulation Lab" },
  { href: "/analysis", label: "Paid Analysis" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_24px_rgba(0,255,209,.2)]">
            <Radar className="h-5 w-5 text-cyan-200" />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.28em] text-white">NullTrace</span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-cyan-200 sm:block">
              Exploit Intelligence Network
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 sm:flex">
            <PulsingDot className="text-cyan-300" />
            Live
          </div>
          <Button asChild size="sm" variant="danger">
            <Link href="/demo">
              <Play className="h-4 w-4" />
              Demo
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/analysis">
              <CreditCard className="h-4 w-4" />
              Pay
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/incidents">
              <Activity className="h-4 w-4" />
              Feed
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
