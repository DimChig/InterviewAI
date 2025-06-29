// /app/api/generate-question/route.ts
import type { Message } from "@/app/types/messages";
import { ai } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { userContext, history } = body;
  if (typeof userContext !== "string" || !userContext.trim()) {
    return NextResponse.json(
      { error: "Missing or invalid userContext" },
      { status: 400 }
    );
  }
  if (!Array.isArray(history)) {
    return NextResponse.json(
      { error: "Missing or invalid history array" },
      { status: 400 }
    );
  }

  // Build the chat history payload for Gemini
  const chatHistory: Array<{
    role: "user" | "model";
    parts: { text: string }[];
  }> = [];
  // Insert each past turn
  for (const msg of history as Message[]) {
    chatHistory.push({
      role: msg.type === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    });
  }

  // Create a fresh chat with the full history
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: chatHistory,
    config: {
      temperature: 0,
      systemInstruction: `You are an AI interviewer in a technical interview setting.
You are provided with:

* The complete chat history of this interview so far.
* A "userContext" JSON object containing:

  * The job description, including required and desired skills.
  * Information about the user, including their skills, experiences, and parsed resume data.

**Your task:**

* Generate exactly ONE new open-ended technical interview question that is tailored to this candidate and the position.
* The question should be the next logical question in the flow of the interview, building naturally on both the previous conversation (from the chat history) and the candidate’s background and resume.
* Focus on the job description, requested skills, and any relevant experience or gaps you see in the user context.
* If this is the first question, include a brief, professional greeting to the candidate.

**UserContext Information:**
${userContext}

**Formatting:**
You are only allowed to use *bold* markup (single stars). You must use this markup for inportant parts of the text. No other markup is allowed.

**Output:**
Return only the text that will be shown in the UI.`,
    },
  });

  // Ask for the next interview question
  const response = await chat.sendMessage({
    message: "Ask the next logical interview question.",
  });

  const nextQuestion = response.text?.trim() ?? "";

  return new NextResponse(nextQuestion, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
