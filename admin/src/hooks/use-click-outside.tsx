import { useEffect } from "react";

export const useClickOutside = (
  refs: (React.RefObject<HTMLElement> | React.RefObject<HTMLElement | null>)[],
  callback: (event: MouseEvent) => void,
  options: { dialogOpen?: boolean; excludeSelector?: string } = {}
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log("dialogOpen:", options.dialogOpen); // Debug log
      if (options.dialogOpen || typeof callback !== "function") return;

      const isOutside = refs.every((ref) => {
        const current = ref.current;
        return !current || !current.contains(event.target as Node);
      });
      const isExcluded = options.excludeSelector
        ? !(event.target as Element).closest(options.excludeSelector)
        : true;

      if (isOutside && isExcluded) {
        callback(event);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, refs, options.dialogOpen, options.excludeSelector]);
};