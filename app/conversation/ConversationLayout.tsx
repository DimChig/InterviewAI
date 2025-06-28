import React from "react";
import ConversationHistory from "./components/ConversationHistory";
import ConversationFooter from "./components/ConversationFooter";

const ConversationLayout = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full max-w-3xl bg-slate-50">
      <div className="flex justify-center w-full h-full overflow-x-hidden overflow-y-auto">
        <ConversationHistory />
      </div>
      <div className="flex justify-center items-center w-full h-fit">
        <ConversationFooter />
      </div>
    </div>
  );
};

export default ConversationLayout;
