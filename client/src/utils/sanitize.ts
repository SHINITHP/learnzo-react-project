// utils/sanitize.ts
import DOMPurify from "dompurify";

export const sanitizeHTML = (html?: string) => {
  return html ? DOMPurify.sanitize(html) : "";
};
