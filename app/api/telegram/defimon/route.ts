import { NextResponse } from "next/server";
import { parseDefimonTemplates } from "@/lib/telegram/defimon-parser";

export async function GET() {
  return NextResponse.json({
    live: false,
    source: "telegram-template-demo",
    channel: "https://t.me/defimon_alerts",
    lastPolled: new Date().toISOString(),
    note: "Telegram Bot/API credentials are not configured, so this route returns parsed Defimon-style demo templates.",
    incidents: parseDefimonTemplates(),
  });
}
