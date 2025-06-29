import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import type { Message } from "@/app/types/messages";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { userContext, chatHistory } = body;
  if (typeof userContext !== "string" || !userContext.trim()) {
    return NextResponse.json(
      { error: "Missing or invalid userContext" },
      { status: 400 }
    );
  }
  if (!Array.isArray(chatHistory)) {
    return NextResponse.json(
      { error: "Missing or invalid chatHistory" },
      { status: 400 }
    );
  }

  // Format history lines
  const historyText = (chatHistory as Message[])
    .map((m) => `${m.type === "bot" ? "Interviewer" : "Candidate"}: ${m.text}`)
    .join("\n");

  // Build the prompt
  const prompt = `
You are an expert technical interviewer.

Below are two key inputs:
- userContext: Contains structured background information about the candidate, including their skills, experience, desired job, and resume highlights.
- chatHistory: Contains the full back-and-forth of the interview, with each question asked and the candidate's response.

Your task:
Using only the information in userContext and chatHistory, provide a concise summary of the overall interview.
Assess the candidate's performance, highlighting their technical strengths, relevant experience, communication skills, and any areas where they excelled or could improve.
If applicable, include an overall impression or recommendation for next steps.

Output only your summary text that will be visible in the UI. Do not repeat the chat history or user context.

Pull out key parts of the chat history that went well or went wrong.
Explain why they went well or went wrong. Maximum 4-6 sentences. Talk to the candidate directly. Simple grammar.
Formatting: only use *bold* formatting to highlight important parts (single stars);

Inputs:
userContext:
${userContext}

chatHistory:
${historyText}
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0,
      },
    });

    // Extract plain text from the first candidate

    return new NextResponse(response.text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("Error generating summary:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
