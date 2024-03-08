"use client";
import ClaimItem from "@/app/find/components/claim-item";
import { Claim, IClaimsResponse, ClaimDrizzle } from "@/app/models/Claim.model";
import { api } from "@/trpc/react";
import {
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/20/solid";

import type { Key } from "react";

export function MyClaims({ userId }: { userId: string }) {
  const { data, isLoading, error } = api.claim.getClaimsForUserWithId.useQuery({
    userId,
  });
  //

  if (isLoading)
    return (
      <>
        <ul
          key="search-results"
          role="list"
          className="divide-y divide-stone-700 overflow-hidden bg-stone-900 shadow-xl ring-1 ring-stone-700 sm:rounded-xl"
        >
          <li key={"loading"} className="gap-x-6 bg-stone-800">
            <div className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-stone-700/25 sm:px-6">
              <div className="flex min-w-0 gap-x-6">
                <div className="min-w-0 flex-auto">
                  <p className="mt-1 block text-xs leading-5 text-stone-400">
                    <span className="hidden sm:inline">Customer code</span>
                    <span className="sm:hidden">Code</span>
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    <span className="font-semibold">{"         "}</span>
                  </div>
                </div>
                <div className="sm:ml-20 sm:flex sm:flex-col sm:items-start">
                  <p className="mt-1 text-xs leading-5 text-stone-400/50">
                    Petition value
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    {"             "}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xs leading-5 text-stone-400">
                    Today{"'"}s value
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    {"             "}
                  </div>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-stone-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        </ul>
      </>
    );
  if (error ?? !data) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>error with no message</div>;
    }
  }

  const myClaims = data;

  return (
    <div>
      {!myClaims || myClaims.length === 0 ? (
        <button
          type="button"
          className="relative block w-full rounded-lg border-2 border-dashed border-stone-600 p-12 text-center hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <MagnifyingGlassPlusIcon className="mx-auto h-12 w-12 text-stone-300" />
          <span className="mt-2 block text-sm font-semibold text-stone-300">
            Find your claim to join the Customer Ad-Hoc Committee
          </span>
        </button>
      ) : (
        <>
          <ul
            key="search-results"
            role="list"
            className="divide-y divide-stone-700 overflow-hidden bg-stone-900 shadow-xl ring-1 ring-stone-700 sm:rounded-xl"
          >
            {myClaims.map((claimData, idx: Key | null | undefined) => {
              const claimInstance: Claim = new ClaimDrizzle(claimData);
              return <ClaimItem key={idx} claimInstance={claimInstance} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}
