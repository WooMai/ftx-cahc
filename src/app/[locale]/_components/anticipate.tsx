"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { searchWithConditions } from "@/server/api/search";
import { defaultSearchPayload } from "@/app/[locale]/_components/default-search-payload";

// Prefetch data for another page: /find/page.tsx
export function Anticipate() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const secondaryKey = JSON.stringify(defaultSearchPayload);

    void queryClient.prefetchQuery({
      queryKey: ["searchResults", secondaryKey],
      queryFn: () => searchWithConditions(defaultSearchPayload),
      staleTime: 60 * 1000 * 30, // 30 minutes
    });
  }, [queryClient]); // Empty dependency array means this runs once on mount

  return null;
}
