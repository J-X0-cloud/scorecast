import { Fragment } from "react";

/**
 * Renders short notification copy where `**text**` marks the highlighted part
 * (badge names, contest names). Keeps activity templates free of markup.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <b key={i}>{part.slice(2, -2)}</b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
