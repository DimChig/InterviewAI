// /components/history/MessageItemUserRating.tsx
import React from "react";
import { motion } from "framer-motion";
import { Message } from "@/app/types/messages";
import Image from "next/image";
import { ChessRatingImagePath } from "@/app/types/chess";

interface Props {
  message: Message;
  isFeedbackVisible: boolean;
  setFeedbackVisible: (visible: boolean) => void;
}

const MessageItemUserRating: React.FC<Props> = ({
  message,
  isFeedbackVisible,
  setFeedbackVisible,
}) => {
  if (!message.analysis?.chessRating) return null;

  const imgSrc = ChessRatingImagePath[message.analysis.chessRating];

  return (
    <motion.div
      initial={{ scale: 0.8, y: -20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="absolute top-[calc(50%-24px)] left-[-64px] z-10 cursor-pointer"
      onClick={() => setFeedbackVisible(!isFeedbackVisible)}
    >
      <Image src={imgSrc} alt="rating" width={48} height={48} />
    </motion.div>
  );
};

export default MessageItemUserRating;
