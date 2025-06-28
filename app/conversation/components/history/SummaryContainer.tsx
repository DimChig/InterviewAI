"use client";

import { motion } from "framer-motion";
import { censorWords } from "./censor";
import HighlightText from "./HighlightText";
import { useSummary } from "./SummaryContext";

const SummaryContainer = () => {
  const { summary } = useSummary();
  if (!summary) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, y: -20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full bg-slate-200 rounded-2xl p-4 text-lg mt-4"
    >
      <h2 className="text-primary/50 mb-1">Interview Summary</h2>
      <div className="mb-2">
        <HighlightText text={censorWords(summary.text)} />
      </div>
      <div className="flex gap-2">
        <span className="text-primary/50">Average Accuracy:</span>
        <span className="font-semibold">{summary.accuracy}%</span>
      </div>
    </motion.div>
  );
};

export default SummaryContainer;
