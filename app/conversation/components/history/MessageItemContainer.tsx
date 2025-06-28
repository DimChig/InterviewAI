// /components/MessageItemContainer.tsx
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children?: ReactNode;
  className?: string;
}

const MessageItemContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      // start slightly small, up high and invisible
      initial={{ scale: 0.8, y: -20, opacity: 0 }}
      // pop to full size and drop into place with a spring bounce
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-xl p-3 text-lg w-fit max-w-3/4 bg-white shadow-md/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default MessageItemContainer;
