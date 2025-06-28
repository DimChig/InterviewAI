"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useChatHistory } from "../history/ChatHistoryContext";
import type { Message } from "@/app/types/messages";
import { useResponseLoading } from "../history/ResponseLoadingContext";
import { generateQuestion } from "@/app/api/question/generateQuestion";

const SAMPLE_QUESTIONS = [
  "What is your greatest strength and how have you applied it?",
  "Describe a time you faced a conflict at work and how you resolved it.",
  "How do you prioritize your tasks when everything feels urgent?",
  "Tell me about a time you had to learn something quickly on the job.",
];

const FooterQuestionControls: React.FC = () => {
  const { messages, addMessage, clearHistory } = useChatHistory();
  const { setIsResponseLoading } = useResponseLoading();

  const handleTryAgain = () => {
    // Walk backwards until we hit the last bot message
    let idx = messages.length - 1;
    while (idx >= 0 && messages[idx].type !== "bot") {
      idx--;
    }
    // If there's no bot message at all, do nothing
    if (idx < 0) return;

    // Keep everything up through that bot message
    const newHistory = messages.slice(0, idx + 1);

    // Rebuild the history with only those messages
    clearHistory();
    newHistory.forEach((m) => addMessage(m));
  };

  const handleNextQuestion = async () => {
    setIsResponseLoading(true);
    try {
      const question = await generateQuestion(messages);
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

  return (
    <div className="flex items-center w-full h-full gap-4">
      <Button onClick={handleTryAgain} className="flex-1">
        Try Again
        <RotateCcw className="ml-2" />
      </Button>
      <Button onClick={handleNextQuestion} className="flex-1">
        Next Question
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};

export default FooterQuestionControls;
