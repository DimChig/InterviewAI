import React from "react";
import { Message } from "@/app/types/messages";
import Image from "next/image";
import { ChessRatingImagePath } from "@/app/types/chess";

interface Props {
  message: Message;
  isFeedbackVisible: boolean;
  setFeedbackVisible: (visible: boolean) => void;
}

const MessageItemUserRating = ({
  message,
  isFeedbackVisible,
  setFeedbackVisible,
}: Props) => {
  if (!message.analysis?.chessRating) return null;

  const imgSrc = ChessRatingImagePath[message.analysis.chessRating];
  return (
    <Image
      src={imgSrc}
      alt="rating"
      width={48}
      height={48}
      className="absolute top-[calc(50%-24px)] left-[-64px] z-10 cursor-pointer"
      onClick={() => setFeedbackVisible(!isFeedbackVisible)}
    />
  );
};

export default MessageItemUserRating;
