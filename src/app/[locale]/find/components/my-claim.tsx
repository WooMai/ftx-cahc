"use client";
import { type Claim } from "@/app/[locale]/models/Claim.model";
import { useClaimsStore } from "@/app/[locale]/store/useClaimsStore";

export function ThisIsMyClaim({ claim }: { claim: Claim }) {
  // update state store

  const selectClaim = useClaimsStore((state) => state.selectClaim);
  const selectedClaims = useClaimsStore((state) => state.selectedClaims);
  const isSelected = selectedClaims.some(
    (selectedClaim) => selectedClaim.customerCode === claim.customerCode,
  );

  const chooseClaim = (claim: Claim) => {
    selectClaim({
      customerCode: claim.customerCode,
      totalPetitionValue: claim.totalPetitionValue,
    });
  };

  if (isSelected) {
    return null;
  }
  return (
    <div className="mt-1 px-4 sm:px-6 sm:py-3">
      {/* <div className="bg-stone-800 shadow-sm ring-1 ring-stone-700 rounded-xl"> */}
      <div className="flex flex-col justify-start px-0 pb-6 sm:flex-row">
        <div className="mb-3 mr-4 flex flex-row align-middle sm:mb-0">
          <p className="inline-block text-center text-sm italic leading-9 text-stone-400 sm:text-left">
            Register this claim to get started{" "}
            <span aria-hidden="true">&rarr;</span>{" "}
          </p>
        </div>
        <button
          onClick={() => chooseClaim(claim)}
          className="mb-2 inline-block items-center rounded-md bg-indigo-600 px-8 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mb-0 sm:inline-flex sm:px-3 sm:py-2"
        >
          This is my claim
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}
