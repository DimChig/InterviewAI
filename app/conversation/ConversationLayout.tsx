"use client";
import React, { useEffect, useRef } from "react";
import { generateQuestion } from "../api/question/generateQuestion";
import type { Message } from "../types/messages";
import ConversationFooter from "./components/ConversationFooter";
import ConversationHistory from "./components/ConversationHistory";
import { useChatHistory } from "./components/history/ChatHistoryContext";
import {
  LoadingState,
  useResponseLoading,
} from "./components/history/ResponseLoadingContext";
import { useSummary } from "./components/history/SummaryContext";
import { useSession } from "next-auth/react";

const ConversationLayout: React.FC = () => {
  const { messages, addMessage } = useChatHistory();
  const { summary } = useSummary();
  const { setLoadingState } = useResponseLoading();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: authData, status: authStatus } = useSession();

  // initial fake exchange
  useEffect(() => {
    if (authStatus !== "authenticated") return;
    // define an async loader
    const loadFirst = async () => {
      setLoadingState(LoadingState.BotMessage);
      try {
        const question = await generateQuestion([], authData?.user?.id);
        const botMsg: Message = {
          id: Date.now().toString(),
          type: "bot",
          text: question,
        };
        if (messages.length === 0) addMessage(botMsg);
      } catch (err) {
        console.error("Failed to load first question", err);
      } finally {
        setLoadingState(null);
      }
    };

    // call it
    loadFirst();
  }, [authData, authStatus]);

  // scroll-to-bottom on every new message
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // instant scroll; swap to behavior: 'smooth' if you like smooth scrolling
    el.scrollTop = el.scrollHeight;
  }, [messages, summary]);

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
