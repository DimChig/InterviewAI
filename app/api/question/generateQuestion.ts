import type { Message } from "@/app/types/messages";
import { loadUserContext } from "@/lib/userContextStorage";

export async function generateQuestion(history: Message[]): Promise<string> {
  const userContext = loadUserContext();

  const res = await fetch("/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userContext, history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Error ${res.status}: ${(err as any).error || res.statusText}`
    );
  }

  // The endpoint returns plain text
  const nextQuestion = await res.text();
  return nextQuestion;
}
