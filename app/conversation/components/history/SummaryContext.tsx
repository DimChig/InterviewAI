// /contexts/SummaryContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Summary {
  text: string;
  accuracy: number;
}

interface SummaryContextValue {
  summary: Summary | null;
  setSummary: (summary: Summary | null) => void;
}

const SummaryContext = createContext<SummaryContextValue | undefined>(
  undefined
);

export const SummaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [summary, setSummary] = useState<Summary | null>(null);

  return (
    <SummaryContext.Provider value={{ summary, setSummary }}>
      {children}
    </SummaryContext.Provider>
  );
};

export function useSummary(): SummaryContextValue {
  const ctx = useContext(SummaryContext);
  if (!ctx) {
    throw new Error("useSummary must be used within a <SummaryProvider>");
  }
  return ctx;
}
