"use client";
import React from "react";
import FooterTextInput from "./footer/FooterTextInput";
import { useChatHistory } from "./history/ChatHistoryContext";
import FooterQuestionControls from "./footer/FooterQuestionControls";
import { useResponseLoading } from "./history/ResponseLoadingContext";
import { LoaderCircle } from "lucide-react";

const ConversationFooter: React.FC = () => {
  const { messages } = useChatHistory();
  const { isResponseLoading } = useResponseLoading();
  if (isResponseLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center p-4 gap-2 text-primary/75">
        <LoaderCircle className="animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }
  if (!messages || !messages.length) return null;

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex w-full h-full items-center justify-between p-4 pt-0 bg-transparent">
      {lastMessage.type === "bot" && <FooterTextInput />}
      {lastMessage.type === "user" && <FooterQuestionControls />}
    </div>
  );
};

export default ConversationFooter;
