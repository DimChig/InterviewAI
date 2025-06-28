// /lib/generateFeedback.ts
import type { Message } from "@/app/types/messages";
import { loadUserContext } from "@/lib/userContextStorage";

export interface FeedbackResult {
  feedback: string;
  grading: number;
  bestResponse: string;
}

/**
 * Sends the full conversation history and user context to the grading API,
 * and returns the parsed feedback object.
 */
export async function generateRating(
  messages: Message[]
): Promise<FeedbackResult> {
  const userContext = loadUserContext();

  const res = await fetch("/api/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userContext, messages: messages }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Error ${res.status}: ${(err as any).error || res.statusText}`
    );
  }

  const data = (await res.json()) as FeedbackResult;
  return data;
}
