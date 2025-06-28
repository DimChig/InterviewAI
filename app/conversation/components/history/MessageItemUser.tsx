"use client";

import { useEffect, useState } from "react";
import { Message } from "@/app/types/messages";
import MessageItemContainer from "./MessageItemContainer";
import MessageItemUserRating from "./MessageItemUserRating";
import MessageItemUserFeedback from "./MessageItemUserFeedback";
import { censorWords } from "./censor";

interface Props {
  message: Message;
}

const MessageItemUser = ({ message }: Props) => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const setFeedbackVisible = (visible: boolean) => {
    setIsFeedbackVisible(visible);
  };

  return (
    <div className="flex w-full justify-end">
      <MessageItemContainer className="rounded-br-none bg-slate-200/50 p-0">
        <div className="p-3 relative">
          <span>{censorWords(message.text)}</span>
          <MessageItemUserRating
            message={message}
            isFeedbackVisible={isFeedbackVisible}
            setFeedbackVisible={setFeedbackVisible}
          />
        </div>

        <MessageItemUserFeedback
          message={message}
          isFeedbackVisible={isFeedbackVisible}
        />
      </MessageItemContainer>
    </div>
  );
};

export default MessageItemUser;
