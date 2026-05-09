import { NextResponse } from "next/server";
import { addReviewRequest, readReviewQueue } from "@/lib/review-queue";

export async function GET() {
  return NextResponse.json({
    queue: await readReviewQueue(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    target?: string;
    normalizedTarget?: string;
    source?: "contract-lookup" | "paid-analysis" | "manual";
    note?: string;
  };

  if (!body.target || !body.normalizedTarget) {
    return NextResponse.json({ error: "target and normalizedTarget are required" }, { status: 400 });
  }

  const review = await addReviewRequest({
    target: body.target,
    normalizedTarget: body.normalizedTarget,
    source: body.source,
    note: body.note,
  });

  return NextResponse.json({
    ok: true,
    review,
  });
}
