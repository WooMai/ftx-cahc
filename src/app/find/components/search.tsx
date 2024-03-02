"use client";

import { searchWithConditions } from "@/server/api/search";
import { useQuery } from "@tanstack/react-query";
import ClaimItem from "./claim-item";
import { type ClaimSchema } from "@/app/models/Claim.model";
import { type Key, type SetStateAction, useState } from "react";
import SearchForm from "@/app/_components/search-form";
import {
  type ISearchRequest,
  type ISearchResponse,
} from "@/app/models/Search.model";

export function Search() {
  const [searchConditions, setSearchConditions] = useState({
    conditions: [{ name: "BTC", min_balance: 100, max_balance: 10000 }],
    page: 1,
    page_size: 10,
  } as ISearchRequest);

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults"],
    queryFn: (): Promise<ISearchResponse> =>
      searchWithConditions(searchConditions),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching claims: {JSON.stringify(error)}</div>;
  }
  console.log(data);
  const performSearch: (
    arg0: SetStateAction<ISearchRequest>,
  ) => Promise<void> = async (
    searchRequest: SetStateAction<ISearchRequest>,
  ) => {
    setSearchConditions(searchRequest);
  };
  return (
    <>
      <SearchForm performSearch={performSearch} />
      <ul
        role="list"
        className="divide-y divide-gray-700 overflow-hidden bg-white shadow-lg ring-1 ring-gray-700 sm:rounded-xl"
      >
        {data!.data.map(
          (claimData: typeof ClaimSchema, idx: Key | null | undefined) => (
            <ClaimItem key={idx} claimData={claimData} />
          ),
        )}
      </ul>
    </>
  );
}
