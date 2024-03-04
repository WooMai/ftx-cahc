import React, { useState } from "react"; // Import useState
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid"; // Ensure ChevronDownIcon is imported
import { CoinsList } from "./coins-list";
import { Claim, type ClaimSchema } from "@/app/models/Claim.model";
import { Text } from "@/components/text";

export default function ClaimItem({
  claimData,
}: {
  claimData: typeof ClaimSchema;
}) {
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  let claimInstance;
  try {
    claimInstance = new Claim(claimData);
  } catch (error) {
    console.error("Error creating claim:", error);
    return (
      <li key="error" className="gap-x-6 py-5">
        <Text>Something went wrong fetching the claim</Text>
      </li>
    );
  }

  return (
    <li key={claimInstance.uuid} className="gap-x-6 bg-stone-800">
      <div
        className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-stone-700/25 sm:px-6"
        onClick={() => setIsVisible(!isVisible)} // Toggle visibility on click
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 block text-xs leading-5 text-stone-400">
              Customer code
            </p>
            <p className="text-lg font-semibold leading-6 text-white flex flex-row align-middle">
              <span className="font-semibold">
                {claimInstance.customerCode}
              </span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-stone-400">
              {claimInstance.assets.length} assets
            </p>
            <p className="text-md font-mono leading-6 text-white">
              {claimInstance.totalPetitionValue}
            </p>
          </div>
          {isVisible ? (
            <ChevronDownIcon
              className="h-5 w-5 flex-none text-stone-400"
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-stone-400"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {isVisible && <CoinsList coins={claimInstance.assets} earnIndicator={claimInstance.earnIndicator} contingentIndicator={claimInstance.contingentIndicator} />}
    </li>
  );
}
