"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle, RotateCcw } from "lucide-react";
import React from "react";
import FooterQuestionControls from "./footer/FooterQuestionControls";
import FooterTextInput from "./footer/FooterTextInput";
import { useChatHistory } from "./history/ChatHistoryContext";
import {
  LoadingState,
  useResponseLoading,
} from "./history/ResponseLoadingContext";
import { useSummary } from "./history/SummaryContext";

const ConversationFooter: React.FC = () => {
  const { messages } = useChatHistory();
  const { loadingState } = useResponseLoading();
  const { summary, setSummary } = useSummary();
  if (loadingState !== null) {
    return (
      <div className="flex w-full h-full items-center justify-center p-4 gap-2 text-primary/75">
        <LoaderCircle className="animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (summary) {
    return (
      <div className="flex w-full h-full items-center justify-center p-4 gap-2 text-primary/75">
        {/* <Button className="w-full" onClick={() => window.location.reload()}> */}
        <Button className="w-full" onClick={() => setSummary(null)}>
          Start Over
          <RotateCcw className="ml-2" />
        </Button>
      </div>
    );
  }

  if (!messages || !messages.length) return null;

  const lastMessage = messages[messages.length - 1];

  return (
    <div
      className={cn(
        "flex w-full h-full items-center justify-between p-4 bg-transparent",
        {
          "pt-0": lastMessage.type === "bot",
        }
      )}
    >
      {lastMessage.type === "bot" && <FooterTextInput />}
      {lastMessage.type === "user" && <FooterQuestionControls />}
    </div>
  );
};

export default ConversationFooter;
