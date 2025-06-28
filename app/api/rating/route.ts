//contains current response
var UserResponse = []
//current question
var interviewQuestion = []
//contains the user context
var UserContext: React.JSX.IntrinsicAttributes | never[] = []
//conatins the last 3 chats from both ai and user
var PreviousConversationHistory = []


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
        You are an interview grader. For the given question and user's response, return a JSON object with:
        - "grading" (integer 0-10; 10 is best)
        - "bestResponse" (ideal answer for this user and job context)
        - "feedback" (actionable suggestions for improvement, e.g., tie in skills/experience)

        Input:
        - UserResponse
        - InterviewQuestion
        - UserContext
        - ConversationHistory

        User Context:
        Within the user context you will find specific tailored information about:
          -User Job Exeperiences/Skills
          -User Projects
          -Job that the user is trying to get
          -More specific tailored information for the user
          ${UserContext}


        ConversationHistory:
        Within the Conversation History you will see the previous 3 chats from both the interviewer and interviewee.
        ${PreviousConversationHistory}

        InterviewQuestion:
        This is the current question that the user answered.
        The "UserResponse" is the answer to this question.
        ${interviewQuestion}


        UserResponse:
        This is the user response to the current question "InterviewQuestion"
        This is the answer that must be graded.
        ${UserResponse}

        Return only the JSON.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          grading: { type: Type.INTEGER },
          bestResponse: { type: Type.STRING },
          feedback: { type: Type.STRING },
        },
        propertyOrdering: ["grading", "bestResponse", "feedback"],
      },
    },
  });

  console.log(response.text);
}