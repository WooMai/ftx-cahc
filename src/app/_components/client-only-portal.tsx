"use client";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector: string;
}) {
  const ref = useRef<Element | null>(null); // Add type annotation to useRef
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as Element; // Use type assertion to specify the type
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}
