"use client";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect, useRef } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showButton && window.scrollY > 800) {
        setShowButton(true);
      } else if (showButton && window.scrollY <= 800) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${showButton ? "" : "hidden"} flex justify-center`}>
      <button
        id="btn-back-to-top"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 shadow-lg ring-1 ring-slate-900/5 sm:right-20 dark:bg-slate-800 dark:ring-slate-200/20"
      >
        <ArrowUpIcon className="h-6 w-6 text-violet-500" />
      </button>
    </div>
  );
};

export default BackToTopButton;
