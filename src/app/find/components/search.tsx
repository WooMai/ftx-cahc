"use client";

import { searchWithConditions } from "@/server/api/search";
import { useQuery } from "@tanstack/react-query";
import ClaimItem from "./claim-item";
import { type ClaimSchema } from "@/app/models/Claim.model";
import { type Key, type SetStateAction, useState, Suspense } from "react";
import SearchForm from "@/app/_components/search-form";
import {
  type ISearchRequest,
  type ISearchResponse,
} from "@/app/models/Search.model";
import { type AxiosResponse } from "axios";
import { defaultSearchPayload } from "@/app/_components/default-search-payload";
import Stopwatch from "./stopwatch";

export function Search({ assets }: { assets: { name: string }[] }) {
  const [searchConditions, setSearchConditions] =
    useState(defaultSearchPayload);

  const performSearch: (
    arg0: SetStateAction<ISearchRequest>,
  ) => Promise<void> = async (
    searchRequest: SetStateAction<ISearchRequest>,
  ) => {
    setSearchConditions(searchRequest);
  };
  
  return (
    <>
      <SearchForm
        assets={assets as { name: string }[]} // Add type annotation to assets prop
        searchConditions={searchConditions}
        performSearch={performSearch}
      />

      <SearchResults searchConditions={searchConditions} />
    </>
  );
}

function SearchResults({
  searchConditions,
}: {
  searchConditions: ISearchRequest;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults", JSON.stringify(searchConditions)],
    queryFn: (): Promise<AxiosResponse<ISearchResponse>> =>
      searchWithConditions(searchConditions),
  });

  if (isLoading) {
    return (
      <>
        <div>
          <p className="my-3 pr-3 w-full text-right text-xs italic text-stone-500">
            {' '}&nbsp;
          </p>
        </div>
        <ul
        key="search-results"
          role="list"
          className="divide-y divide-stone-700 overflow-hidden bg-stone-900 shadow-xl ring-1 ring-stone-700 sm:rounded-xl"
        >
          <nav
              className="flex items-center justify-between border-stone-700 bg-stone-800 px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div className="sm:block">
                <p className="text-sm text-stone-400 italic">
                  Searching through millions of claims... <span className="text-stone-500"><Suspense><Stopwatch /></Suspense></span>
                </p>
              </div>
              {/* <div className="flex flex-1 justify-between sm:justify-end">
                <p className="text-right text-xs italic text-stone-500">
                  
                </p>
              </div> */}
            </nav>
        </ul>
      </>
    );
  }

  if (error) {
    return <div>Error fetching claims: {JSON.stringify(error)}</div>;
  }

  const searchResponse: ISearchResponse = data!.data;
  const claims: (typeof ClaimSchema)[] = data!.data.claims;
  return (
    <>
      <div>
        <p className="my-3 pr-3 w-full text-right text-xs italic text-stone-500">
          Showing <span className="font-medium">{searchConditions.page}</span>{" "}
          to <span className="font-medium">{searchConditions.page_size}</span>{" "}
          of <span className="font-medium">{searchResponse.total_records}</span>{" "}
          results
        </p>
      </div>
      <ul
      key="search-results"
        role="list"
        className="divide-y divide-stone-700 overflow-hidden bg-stone-900 shadow-xl ring-1 ring-stone-700 sm:rounded-xl"
      >
        {claims.map(
          (claimData: typeof ClaimSchema, idx: Key | null | undefined) => (
            <ClaimItem key={idx} claimData={claimData} />
          ),
        )}
        <nav
          className="flex items-center justify-between border-stone-700 bg-stone-800 px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-stone-400">
              Showing{" "}
              <span className="font-medium">{searchConditions.page}</span> to{" "}
              <span className="font-medium">
                {searchResponse.total_records < searchConditions.page_size
                  ? searchResponse.total_records
                  : searchConditions.page_size}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {searchResponse.total_records}
              </span>{" "}
              results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md bg-stone-800 px-3 py-2 text-sm text-stone-400 ring-1 ring-inset ring-stone-700 hover:bg-stone-700/80 focus-visible:outline-offset-0"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md bg-stone-800 px-3 py-2 text-sm text-stone-400 ring-1 ring-inset ring-stone-700 hover:bg-stone-700/80 focus-visible:outline-offset-0"
            >
              Next
            </a>
          </div>
        </nav>
      </ul>
    </>
  );
}
