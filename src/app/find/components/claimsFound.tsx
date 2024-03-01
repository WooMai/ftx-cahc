"use client";

import { getSome } from "@/server/api/find";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import ClaimItem from "./claim-item";
import { ClaimSchema } from "@/app/models/Claim.model";

export default function ClaimsFound() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["demoData"],
    queryFn: getSome,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching claims: {JSON.stringify(error)}</div>;
  }
  return (
    <ul
      role="list"
      className="divide-y divide-gray-700 overflow-hidden bg-white shadow-lg ring-1 ring-gray-700 sm:rounded-xl"
    >
      {data.claims.map((claimData: typeof ClaimSchema) => (
        <ClaimItem claimData={claimData} />
      ))}
    </ul>
  );
}
