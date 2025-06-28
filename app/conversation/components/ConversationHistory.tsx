// /components/ConversationHistory.tsx
import React from "react";
import { ChatHistory, Message } from "@/app/types/messages";
import MessageItemUser from "./history/MessageItemUser";
import MessageItemBot from "./history/MessageItemBot";

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
    </div>
  );
};

export default ConversationHistory;
