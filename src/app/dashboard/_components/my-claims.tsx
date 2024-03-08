"use client";
import ClaimItem from "@/app/find/components/claim-item";
import {
  Claim,
  type ClaimSchema,
  type IClaimDeprecated,
  IClaimsResponse,
  ClaimDrizzle,
} from "@/app/models/Claim.model";
import { api } from "@/trpc/react";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { claims } from "drizzle/schema";

import type { Key } from "react";

export function MyClaims({ userId }: { userId: string }) {
  const { data, isLoading, error } = api.claim.getClaimsForUserWithId.useQuery({
    userId,
  });
  //

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) {
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>error with no message</div>;
    }
  }

  const myClaims: IClaimsResponse[] = data!;

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
              let claimInstance: Claim = new ClaimDrizzle(claimData);
              //   claimInstance = claimInstance();
              return <ClaimItem key={idx} claimInstance={claimInstance} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}
