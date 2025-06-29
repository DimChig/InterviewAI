"use client";

import { Message } from "@/app/types/messages";
import { useState } from "react";
import { censorWords } from "./censor";
import HighlightText from "./HighlightText";
import MessageItemContainer from "./MessageItemContainer";
import MessageItemUserFeedback from "./MessageItemUserFeedback";
import MessageItemUserRating from "./MessageItemUserRating";

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
          <span>
            <HighlightText text={censorWords(message.text)} />
          </span>
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
