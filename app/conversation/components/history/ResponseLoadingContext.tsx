"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/** Two possible loading states */
export enum LoadingState {
  Default = "Default",
  BotMessage = "BotMessage",
}

interface ResponseLoadingContextValue {
  /** Current loading state, or null if not loading */
  loadingState: LoadingState | null;
  /** Setter to change (or clear) loading state */
  setLoadingState: (state: LoadingState | null) => void;
}

const ResponseLoadingContext = createContext<
  ResponseLoadingContextValue | undefined
>(undefined);

export const ResponseLoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingState, setLoadingState] = useState<LoadingState | null>(null);

  return (
    <ResponseLoadingContext.Provider value={{ loadingState, setLoadingState }}>
      {children}
    </ResponseLoadingContext.Provider>
  );
};

/**
 * Hook to access the loading state context.
 * Must be used under <ResponseLoadingProvider>.
 */
export function useResponseLoading(): ResponseLoadingContextValue {
  const context = useContext(ResponseLoadingContext);
  if (!context) {
    throw new Error(
      "useResponseLoading must be used within a <ResponseLoadingProvider>"
    );
  }
  return context;
}
