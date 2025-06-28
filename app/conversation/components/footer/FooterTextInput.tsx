"use client";
import React, { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import type { Message } from "@/app/types/messages";
import { useChatHistory } from "../history/ChatHistoryContext";
import { useResponseLoading } from "../history/ResponseLoadingContext";
import { generateRating } from "@/app/api/rating/generateRating";

const FooterTextInput = () => {
  const { messages, addMessage } = useChatHistory();
  const { isResponseLoading, setIsResponseLoading } = useResponseLoading();
  const [text, setText] = useState("");

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: trimmed,
    };

    addMessage(newMsg);
    setText("");

    // Set a request to analyze
    setIsResponseLoading(true);

    // Call api to update
    const { feedback, grading, bestResponse } = await generateRating(
      "Name: Tyler Jakson",
      [...messages, newMsg]
    );

    newMsg.analysis = {
      feedback: feedback,
      chessRating: grading,
      bestResponse: bestResponse,
    };

    setIsResponseLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // On Enter (without Shift), send message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full relative">
      <Textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here."
        className="pe-14 resize-none !text-lg"
      />
      <Button
        className="absolute rounded-full right-3 bottom-3"
        size="icon"
        onClick={handleSend}
      >
        <ArrowUp className="min-w-5 min-h-5" />
      </Button>
    </div>
  );
};

export default FooterTextInput;
