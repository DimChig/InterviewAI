"use client";
import React from "react";
import { useChatHistory } from "./history/ChatHistoryContext";
import MessageItemBot from "./history/MessageItemBot";
import MessageItemUser from "./history/MessageItemUser";
import SummaryContainer from "./history/SummaryContainer";
import LoadingBotMessageSkeleton from "./history/LoadingBotMessageSkeleton";

const ConversationHistory = () => {
  const { messages } = useChatHistory();

  return (
    <div className="flex flex-col p-6 gap-6 w-full h-full">
      {messages.map((message) =>
        message.type === "user" ? (
          <MessageItemUser key={message.id} message={message} />
        ) : (
          <MessageItemBot key={message.id} message={message} />
        )
      )}
      <SummaryContainer />
      <LoadingBotMessageSkeleton />
      <br />
    </div>
  );
};

export default ConversationHistory;
