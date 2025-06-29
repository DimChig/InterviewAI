import React from "react";
import { LoadingState, useResponseLoading } from "./ResponseLoadingContext";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingBotMessageSkeleton = () => {
  const { loadingState } = useResponseLoading();
  if (loadingState !== LoadingState.BotMessage) return null;
  return (
    <Skeleton className="rounded-xl p-3 text-lg w-3/4 min-h-[150px] shadow-md/5 rounded-bl-none" />
  );
};

export default LoadingBotMessageSkeleton;
