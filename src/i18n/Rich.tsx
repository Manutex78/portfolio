import { Fragment } from "react";

// Renders **bold** spans inside translated copy, so paragraphs can keep their emphasis
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
