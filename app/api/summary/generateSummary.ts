// /lib/generateSummary.ts
import type { Message } from "@/app/types/messages";
import { loadUserContext } from "@/lib/userContextStorage";

export async function generateSummary(
  history: Message[],
  userKey?: string
): Promise<string> {
  const userContext = loadUserContext(userKey);

  const res = await fetch("/api/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userContext, chatHistory: history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Error ${res.status}: ${(err as any).error || res.statusText}`
    );
  }

  // The endpoint returns plain text summary
  const summary = await res.text();
  return summary;
}
