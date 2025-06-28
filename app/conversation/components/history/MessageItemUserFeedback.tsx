// /components/history/MessageItemUserFeedback.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/app/types/messages";
import { censorWords } from "./censor";
import HighlightText from "./HighlightText";

interface Props {
  message: Message;
  isFeedbackVisible: boolean;
}

export default function MessageItemUserFeedback({
  message,
  isFeedbackVisible,
}: Props) {
  if (!message.analysis?.feedback) return null;

  return (
    <AnimatePresence initial={false}>
      {isFeedbackVisible && (
        <motion.div
          key="feedback"
          // only animate height & opacity
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            // set bounce to 0 to eliminate any overshoot
            bounce: 0,
          }}
          style={{ overflow: "hidden" }}
          className="rounded-bl-xl bg-slate-200"
        >
          {/* static padding is applied here, not on the animated container */}
          <div className="p-4">
            <h2 className="text-primary/50">Feedback</h2>
            <p className="mb-4">
              <HighlightText text={censorWords(message.analysis.feedback)} />
            </p>
            <hr className="border-slate-300 my-2" />
            <h2 className="text-primary/50">Best Response</h2>
            <p>
              &quot;
              <HighlightText
                text={censorWords(message.analysis.bestResponse)}
              />
              &quot;
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
