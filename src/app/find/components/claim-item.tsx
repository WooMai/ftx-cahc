import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CoinsList } from "./coins-list";
import { Claim, ClaimSchema } from "@/app/models/Claim.model";
import { Text } from "@/components/text";

export default function ClaimItem({
  claimData,
}: {
  claimData: typeof ClaimSchema;
}) {
  let claimInstance;
  try {
    claimInstance = new Claim(claimData);
  } catch (error) {
    console.error("Error creating claim:", error);
    console.log(claimData);
  }
  if (!claimInstance) {
    return (
      <li key="error" className="gap-x-6 py-5">
        <Text>Something went wrong fetching the claim</Text>
      </li>
    );
  }
  return (
    <li key={claimInstance.uuid} className=" gap-x-6 bg-gray-800">
      <div className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 hover:bg-gray-700 sm:px-6">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 block text-xs leading-5 text-gray-400">
              Customer code
            </p>
            <p className="text-lg font-semibold leading-6 text-white">
              <span className="font-semibold">
                {claimInstance.customerCode}
              </span>
              {claimInstance.earnIndicator ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Earn enabled
                </p>
              ) : null}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-400">
              {claimInstance.assets.length} assets
            </p>
            <p className="text-md font-mono leading-6 text-white">
              {claimInstance.totalPetitionValue}
            </p>
          </div>
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <CoinsList coins={claimInstance.assets} />
    </li>
  );
}
