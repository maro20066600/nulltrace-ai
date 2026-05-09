import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type CodexReviewRequest = {
  id: string;
  target: string;
  normalizedTarget: string;
  source: "contract-lookup" | "paid-analysis" | "manual";
  status: "PENDING_CODEX_REVIEW" | "IN_REVIEW" | "READY";
  createdAt: string;
  note: string;
};

const queuePath = path.join(process.cwd(), "data", "codex-review-queue.json");

async function ensureQueueFile() {
  await mkdir(path.dirname(queuePath), { recursive: true });
  try {
    await readFile(queuePath, "utf8");
  } catch {
    await writeFile(queuePath, "[]", "utf8");
  }
}

export async function readReviewQueue(): Promise<CodexReviewRequest[]> {
  await ensureQueueFile();
  const file = await readFile(queuePath, "utf8");
  return JSON.parse(file) as CodexReviewRequest[];
}

export async function addReviewRequest(input: {
  target: string;
  normalizedTarget: string;
  source?: CodexReviewRequest["source"];
  note?: string;
}) {
  const queue = await readReviewQueue();
  const request: CodexReviewRequest = {
    id: `codex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    target: input.target,
    normalizedTarget: input.normalizedTarget,
    source: input.source || "contract-lookup",
    status: "PENDING_CODEX_REVIEW",
    createdAt: new Date().toISOString(),
    note:
      input.note ||
      "No public breakdown was found. Codex review should inspect the target, related alerts, and available on-chain context.",
  };

  await writeFile(queuePath, JSON.stringify([request, ...queue].slice(0, 50), null, 2), "utf8");
  return request;
}
