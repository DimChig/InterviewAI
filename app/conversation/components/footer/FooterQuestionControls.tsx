"use client";
import { generateQuestion } from "@/app/api/question/generateQuestion";
import { generateSummary } from "@/app/api/summary/generateSummary";
import type { Message } from "@/app/types/messages";
import { Button } from "@/components/ui/button";
import { ChevronRight, OctagonMinus, RotateCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useChatHistory } from "../history/ChatHistoryContext";
import {
  LoadingState,
  useResponseLoading,
} from "../history/ResponseLoadingContext";
import { useSummary } from "../history/SummaryContext";

const FooterQuestionControls: React.FC = () => {
  const { messages, addMessage, clearHistory } = useChatHistory();
  const { setSummary } = useSummary();
  const { data: authData } = useSession();
  const { setLoadingState } = useResponseLoading();

  const handleFinishInterview = async () => {
    setLoadingState(LoadingState.Default);

    // 1) Generate the summary
    const summaryText = await generateSummary(messages, authData?.user?.id);

    // 2) Extract all numeric ratings (0–10) from the messages
    const ratings = messages
      .map((m) => m.analysis?.chessRating)
      .filter((r): r is number => typeof r === "number");

    // 3) Compute the average rating (0–10 scale)
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

    // 4) Convert to a percentage (0–100) and round
    const accuracy = Math.round(avgRating * 10);

    // 5) Update the summary context
    setSummary({
      text: summaryText,
      accuracy,
    });

    setLoadingState(null);
  };

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
    setLoadingState(LoadingState.BotMessage);
    try {
      const question = await generateQuestion(messages, authData?.user?.id);
      const botMsg: Message = {
        id: Date.now().toString(),
        type: "bot",
        text: question,
      };
      addMessage(botMsg);
    } catch (err) {
      console.error("Failed to load first question", err);
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <div className="flex items-center w-full h-full gap-4">
      <Button
        onClick={handleFinishInterview}
        className="flex-1"
        variant={"destructive"}
      >
        Finish Interview
        <OctagonMinus className="ml-2" />
      </Button>
      <Button
        onClick={handleTryAgain}
        className="flex-1 bg-slate-200"
        variant={"secondary"}
      >
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
