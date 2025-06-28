"use client";
import React, { useEffect, useRef } from "react";
import ConversationHistory from "./components/ConversationHistory";
import ConversationFooter from "./components/ConversationFooter";
import { useChatHistory } from "./components/history/ChatHistoryContext";
import type { Message } from "../types/messages";
import { ChessRating } from "../types/chess";

const ConversationLayout: React.FC = () => {
  const { messages, addMessage } = useChatHistory();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // initial fake exchange
  useEffect(() => {
    const initial: Message[] = [
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
      // {
      //   id: "4",
      //   type: "user",
      //   text: "I set up real-time dashboards with Grafana to track latency and error rates, and agreed on an SLO of p95 < 200ms. The main trade-off was cache invalidation complexity; I wrote a small invalidation service to keep TTLs short for frequently changing data.",
      // },
    ];

    initial.forEach((msg) => addMessage(msg));
  }, []);

  // scroll-to-bottom on every new message
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // instant scroll; swap to behavior: 'smooth' if you like smooth scrolling
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col justify-center w-full h-full max-w-3xl bg-slate-50">
      {/* scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4"
      >
        <ConversationHistory />
      </div>
      <div className="flex justify-center items-center w-full h-fit">
        <ConversationFooter />
      </div>
    </div>
  );
};

export default ConversationLayout;
