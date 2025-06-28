// /components/ConversationHistory.tsx
import React from "react";
import { ChatHistory, Message } from "@/app/types/messages";
import MessageItemUser from "./history/MessageItemUser";
import MessageItemBot from "./history/MessageItemBot";
import { ChessRating } from "@/app/types/chess";

const ConversationHistory: React.FC = () => {
  const history = new ChatHistory();

  // Fake interview exchange
  const messages: Message[] = [
    {
      id: "1",
      type: "bot",
      text: "Thank you for coming in today! To start, can you tell me about a challenging problem you solved on your last team?",
    },
    {
      id: "2",
      type: "user",
      text: "Absolutely. At my previous company we had a performance bottleneck in our API under heavy load. I led an investigation, benchmarked several approaches (caching, query optimization, horizontal scaling), and implemented a Redis-backed cache layer. We saw a 70% reduction in response times within two weeks.",
      analysis: {
        feedback:
          "Your answer is clear and demonstrates strong problem-solving skills, leadership, and technical expertise. You effectively describe the challenge, actions taken, and quantifiable impact, which makes your contribution easy to understand and impressive. Great job highlighting both the process and the measurable results.",
        chessRating: ChessRating.Best,
        bestResponse:
          "Absolutely. At my previous company, our API experienced significant slowdowns under heavy load. I took the initiative to lead a thorough analysis, benchmarking solutions such as caching, query optimization, and horizontal scaling. By designing and implementing a Redis-backed cache layer, we reduced API response times by 70% within two weeks, dramatically improving user experience and system scalability",
      },
    },
    {
      id: "3",
      type: "bot",
      text: "Great! How did you measure success, and what trade-offs did you consider?",
    },
    {
      id: "4",
      type: "user",
      text: "I set up real-time dashboards with Grafana to track latency and error rates, and agreed on an SLO of p95 < 200ms. The main trade-off was cache invalidation complexity; I wrote a small invalidation service to keep TTLs short for frequently changing data.",
    },
  ];

  // Populate history
  messages.forEach((msg) => history.add(msg));

  return (
    <div className="flex flex-col p-6 gap-6 w-full h-full">
      {history.all.map((message) =>
        message.type === "user" ? (
          <MessageItemUser key={message.id} message={message} />
        ) : (
          <MessageItemBot key={message.id} message={message} />
        )
      )}
      <br />
    </div>
  );
};

export default ConversationHistory;
