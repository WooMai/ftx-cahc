import { currentUser } from "@clerk/nextjs";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MyClaims } from "./_components/my-claims";
import { DashboardCountStats } from "./_components/dashboard-count-stats";

export default async function Page() {
  const user = await currentUser();
  const userId: string = user?.unsafeMetadata.external_id as string;

  const queryClient = new QueryClient();

  //   const claims: (typeof ClaimSchema)[] = data!.data.claims;

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-base font-semibold leading-6 text-stone-200">
        Welcome to the FTX Customer Ad-Hoc Voting Block
      </h3>
      <p className="text-md max-w-4xl text-stone-500">
        <span className="">
          We have now formed the largest voting block with hundreds of members
          and 9-figures in claims.
        </span>
      </p>
      <div className="border-b border-stone-700 bg-stone-900">
        <DashboardCountStats />
      </div>
      <div className="mt-16 pb-5">
        <h3 className="text-base font-semibold leading-6 text-stone-200">
          Your Claim
        </h3>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyClaims userId={userId} />
      </HydrationBoundary>

      <div className="mt-20 border-t border-stone-700 pb-5 pt-10">
        <p className="text-md max-w-4xl text-stone-500">
          Thus far the FTX Debtors have proposed a value destructive plan.
          <br />
          Since the Unsecured Creditors Committee has a fiduciary duty to all
          unsecured creditors including Alameda creditors, they are unable to
          fight on behalf of only FTX customers. Nor is the Ad Hoc Committee
          counseled by Eversheds an option, as they already agreed to settle
          their litigation and are now bound to support the debtors.
          <br />
          <br /> The estate is due to recover well over 100% petition date value
          and instead of accruing the surplus back to customers, the debtors
          plan to use our assets to pay non-customers and US government
          regulators instead.
          <br />
          <br />
          The judge requires us to formally organize in order for our point of
          view to be considered in court.
        </p>
      </div>
    </div>
  );
}
