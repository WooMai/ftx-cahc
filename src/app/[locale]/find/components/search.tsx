"use client";

import { searchWithConditions } from "@/server/api/search";
import { useQuery } from "@tanstack/react-query";
import ClaimItem from "./claim-item";
import { Claim, type ClaimSchema } from "@/app/[locale]/models/Claim.model";
import {
  type Key,
  type SetStateAction,
  useState,
  useEffect,
  Suspense,
} from "react";
import SearchForm from "@/app/[locale]/_components/search-form";
import {
  type ISearchRequest,
  type ISearchResponse,
} from "@/app/[locale]/models/Search.model";
import { type AxiosResponse } from "axios";
import { defaultSearchPayload } from "@/app/[locale]/_components/default-search-payload";
import Stopwatch from "./stopwatch";

export function Search({ assets }: { assets: { name: string }[] }) {
  const [searchConditions, setSearchConditions] =
    useState(defaultSearchPayload);

  // In the Search component
  const [currentPage, setCurrentPage] = useState(defaultSearchPayload.page);
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 whenever searchConditions change
  }, [searchConditions]);

  const performSearch: (
    arg0: SetStateAction<ISearchRequest>,
  ) => Promise<void> = async (
    searchRequest: SetStateAction<ISearchRequest>,
  ) => {
    setSearchConditions(searchRequest);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <SearchForm
        assets={assets as { name: string }[]} // Add type annotation to assets prop
        searchConditions={searchConditions}
        performSearch={performSearch}
      />

      <SearchResults
        searchConditions={searchConditions}
        currentPage={currentPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </>
  );
}

export function SearchResults({
  searchConditions,
  currentPage,
  onNextPage,
  onPreviousPage,
}: {
  searchConditions: ISearchRequest;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "searchResults",
      JSON.stringify({ ...searchConditions, page: currentPage }),
    ],
    queryFn: (): Promise<AxiosResponse<ISearchResponse>> =>
      searchWithConditions({ ...searchConditions, page: currentPage }),
  });

  if (isLoading) {
    return (
      <>
        <div>
          <p className="my-3 w-full pr-3 text-right text-xs italic text-stone-500">
            {" "}
            &nbsp;
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
              <p className="text-sm italic text-stone-400">
                Searching through millions of claims...{" "}
                <span className="text-stone-500">
                  <Suspense>
                    <Stopwatch />
                  </Suspense>
                </span>
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
        <p className="my-3 w-full pr-3 text-right text-xs italic text-stone-500">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * searchConditions.page_size + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(
              currentPage * searchConditions.page_size,
              searchResponse.total_records,
            )}
          </span>{" "}
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
          (claimData: typeof ClaimSchema, idx: Key | null | undefined) => {
            let claimInstance: Claim;
            try {
              claimInstance = new Claim(claimData);
            } catch (error) {
              console.error("Error creating claim:", error);
              return (
                <li key="error" className="gap-x-6 py-5">
                  <span>Something went wrong fetching the claim</span>
                </li>
              );
            }
            return <ClaimItem key={idx} claimInstance={claimInstance} />;
          },
        )}
        <nav
          className="flex items-center justify-between border-stone-700 bg-stone-800 px-4 py-3 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-stone-400">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * searchConditions.page_size + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * searchConditions.page_size,
                  searchResponse.total_records,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {searchResponse.total_records}
              </span>{" "}
              results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button
              onClick={onPreviousPage}
              className="relative inline-flex items-center rounded-md bg-stone-800 px-3 py-2 text-sm text-stone-400 ring-1 ring-inset ring-stone-700 hover:bg-stone-700/80 focus-visible:outline-offset-0"
            >
              Previous
            </button>
            <button
              onClick={onNextPage}
              className="relative ml-3 inline-flex items-center rounded-md bg-stone-800 px-3 py-2 text-sm text-stone-400 ring-1 ring-inset ring-stone-700 hover:bg-stone-700/80 focus-visible:outline-offset-0"
            >
              Next
            </button>
          </div>
        </nav>
      </ul>
    </>
  );
}
