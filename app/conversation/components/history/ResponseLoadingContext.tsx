"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ResponseLoadingContextValue {
  /** Whether a response is currently loading */
  isResponseLoading: boolean;
  /** Setter to toggle loading state */
  setIsResponseLoading: (loading: boolean) => void;
}

const ResponseLoadingContext = createContext<
  ResponseLoadingContextValue | undefined
>(undefined);

export const ResponseLoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  return (
    <ResponseLoadingContext.Provider
      value={{ isResponseLoading, setIsResponseLoading }}
    >
      {children}
    </ResponseLoadingContext.Provider>
  );
};

/**
 * Hook to access the loading indicator context.
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
