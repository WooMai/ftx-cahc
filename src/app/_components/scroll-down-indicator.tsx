"use client";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export const ScrollDownIndicator = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showButton && window.scrollY < 800) {
        setShowButton(true);
      } else if (showButton && window.scrollY >= 800) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showButton]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: 801,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${showButton ? "" : "hidden"} flex justify-center`}>
      <button
        id="btn-back-to-top"
        aria-label="Back to top"
        onClick={scrollToBottom}
        className="fixed bottom-10 flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-white p-2 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-slate-200/20"
      >
        <ArrowDownIcon className="h-6 w-6 text-violet-500" />
      </button>
    </div>
  );
};
