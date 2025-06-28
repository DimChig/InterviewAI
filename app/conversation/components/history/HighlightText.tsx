import React from "react";

interface HighlightTextProps {
  text: string;
}

/**
 * Highlights *bold* segments by wrapping them in <strong> with font-semibold.
 */
const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
  // Split on *bold* segments (including the asterisks)
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <p>
      {parts.map((part, i) => {
        // If it's wrapped in *, render as bold with font-semibold
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <strong key={i} className="font-semibold">
              {part.slice(1, -1)}
            </strong>
          );
        }
        // Otherwise, render plain text
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </p>
  );
};

export default HighlightText;
