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

  let claimInstance: Claim;

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
        <div className="flex min-w-0 gap-x-6">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 block text-xs leading-5 text-stone-400">
              <span className="hidden sm:inline">Customer code</span>
              <span className="sm:hidden">Code</span>
            </p>
            <p className="flex flex-row align-middle text-xs font-semibold leading-6 text-white sm:text-base">
              <span className="font-semibold">
                {claimInstance.customerCode}
              </span>
              {claimInstance.earnIndicator ? (
                <span
                  style={{ marginTop: -3 }}
                  className="ml-2 hidden rounded-md bg-cyan-800/50 px-2 py-1 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/25 sm:inline-block"
                >
                  <span className="text-xs leading-5">Earn enabled</span>
                </span>
              ) : null}
              {claimInstance.contingentIndicator.length > 1
                ? claimInstance.contingentIndicator.map((indicator, index) => (
                    <span
                      key={index}
                      style={{ marginTop: -3 }}
                      className="ml-2 hidden rounded-md bg-indigo-600/25 px-2 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/25 sm:inline-block"
                    >
                      <span className="text-xs leading-5">{indicator}</span>
                    </span>
                  ))
                : null}
            </p>
          </div>
          <div className="sm:ml-20 sm:flex sm:flex-col sm:items-start">
            <p className="mt-1 text-xs leading-5 text-stone-400/50">
              Petition value
            </p>
            <p className="truncate font-mono text-xs leading-6 text-white/25 sm:text-base">
              {claimInstance.totalPetitionValue}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-stone-400">
              Today{"'"}s value
            </p>
            <p className="font-mono text-xs leading-6 text-white sm:text-base">
              {claimInstance.totalLatestValue}
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
      {isVisible && (
        <>
          <CoinsList claim={claimInstance} coins={claimInstance.assets} />
        </>
      )}
    </li>
  );
}
