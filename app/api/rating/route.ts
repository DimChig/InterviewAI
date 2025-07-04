// /app/api/extract-conversation/route.ts
import { NextResponse } from "next/server";
import type { Message } from "@/app/types/messages";
import { ai } from "@/lib/ai";
import { Type } from "@google/genai";

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { userContext, messages } = body;
  if (typeof userContext !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid userContext" },
      { status: 400 }
    );
  }
  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: "Missing or invalid messages array" },
      { status: 400 }
    );
  }

  // Find the last user message
  let lastUserIndex = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].type === "user") {
      lastUserIndex = i;
      break;
    }
  }
  if (lastUserIndex < 0) {
    return NextResponse.json(
      { error: "No user message found in history" },
      { status: 400 }
    );
  }
  const userResponse: Message = messages[lastUserIndex];

  // Find the bot message that immediately precedes it
  let lastBotIndex = -1;
  for (let i = lastUserIndex - 1; i >= 0; i--) {
    if (messages[i].type === "bot") {
      lastBotIndex = i;
      break;
    }
  }
  if (lastBotIndex < 0) {
    return NextResponse.json(
      { error: "No bot message found before the last user message" },
      { status: 400 }
    );
  }
  const interviewQuestion: Message = messages[lastBotIndex];

  // Grab up to 6 messages immediately before that bot question
  const start = Math.max(0, lastBotIndex - 6);
  const previousConversationHistory: Message[] = messages.slice(
    start,
    lastBotIndex
  );

  const contents = `
        You are an optimistic interview grader. For the given question and user's response, return a JSON object with:
        - "feedback" (actionable suggestions for improvement, e.g., tie in skills/experience, 2-4 sentences max)
        - "bestResponse" (ideal answer for this user and job context, 2-4 sentences max)
        - "grading" (integer 1-10; 10 is best. Give good optimistic ratings.)
        
        You must be friendly and aim to help the user to help prepare for the interview. Use simple grammar and word choices. Do not greet the user.

        ### Input:
        - UserResponse
        - InterviewQuestion
        - UserContext
        - ConversationHistory

        ### Grading rating must be one of these (chess.com inspired):        
        [ Blunder = 1,
          Incorrect = 2,
          Mistake = 3,
          Inaccuracy = 4,
          Ok = 5,
          Good = 6,
          Great = 7,
          Excellent = 8,
          Best = 9,
          Perfect = 10]        

        ### User Context:       
        ${userContext}

        ### Conversation History:
        Within the Conversation History you will see the previous 3 chats from both the interviewer and interviewee.
${previousConversationHistory
  .map((m) => `${m.type === "user" ? "Candidate" : "Interviewer"}: ${m.text}`)
  .join("\n\n")}
        ${
          previousConversationHistory.length === 0 ? "No previous messages" : ""
        }

        ### Interview Question:
        This is the current question that the user answered.
        ${interviewQuestion.text}

        ### UserResponse:
        This is the user response to the current question "Interview Question"
        This is the answer that must be graded.
        ${userResponse.text}

        Return only the JSON that can be easily parsed.
    `;

  // get response
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        temperature: 0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            grading: { type: Type.INTEGER },
            bestResponse: { type: Type.STRING },
          },
          propertyOrdering: ["feedback", "grading", "bestResponse"],
        },
      },
    });

    let result;
    try {
      result = JSON.parse(response.text!);
    } catch {
      console.error("Failed to parse JSON from LLM:", response.text);
      return NextResponse.json(
        { error: "Invalid JSON generated by model" },
        { status: 500 }
      );
    }

    // Success: return the parsed JSON
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error grading response:", err);
    // Internal error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
