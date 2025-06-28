"use client";
import React, { useEffect, useRef } from "react";
import ConversationHistory from "./components/ConversationHistory";
import ConversationFooter from "./components/ConversationFooter";
import { useChatHistory } from "./components/history/ChatHistoryContext";
import type { Message } from "../types/messages";
import { ChessRating } from "../types/chess";
import { useResponseLoading } from "./components/history/ResponseLoadingContext";
import { generateFirstQuestion } from "../api/question/generateFirstQuestion";

const ConversationLayout: React.FC = () => {
  const { messages, addMessage } = useChatHistory();
  const { setIsResponseLoading } = useResponseLoading();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // initial fake exchange
  useEffect(() => {
    // define an async loader
    const loadFirst = async () => {
      console.log("Load first");
      setIsResponseLoading(true);
      try {
        const question = await generateFirstQuestion();
        const botMsg: Message = {
          id: Date.now().toString(),
          type: "bot",
          text: question,
        };
        addMessage(botMsg);
      } catch (err) {
        console.error("Failed to load first question", err);
      } finally {
        setIsResponseLoading(false);
      }
    };

    // call it
    loadFirst();
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
