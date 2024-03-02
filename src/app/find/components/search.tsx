"use client";

import { getSome, searchWithConditions } from "@/server/api/search";
import { useMutation, useQuery } from "@tanstack/react-query";
import ClaimItem from "./claim-item";
import { ClaimSchema } from "@/app/models/Claim.model";
import { Key, SetStateAction, useState } from "react";
import SearchForm from "@/app/_components/search-form";
import { ISearchRequest } from "@/app/models/Search.model";

export function Search() {
  const [searchConditions, setSearchConditions] = useState({
    conditions: [{ name: "BTC", min_balance: 100, max_balance: 10000 }],
    page: 1,
    page_size: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults"],
    queryFn: () => searchWithConditions(searchConditions),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching claims: {JSON.stringify(error)}</div>;
  }
  console.log(data);
  const performSearch = async (
    searchRequest: SetStateAction<{
      conditions: { name: string; min_balance: number; max_balance: number }[];
      page: number;
      page_size: number;
    }>,
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
        {data.data.map(
          (claimData: typeof ClaimSchema, idx: Key | null | undefined) => (
            <ClaimItem key={idx} claimData={claimData} />
          ),
        )}
      </ul>
    </>
  );
}
