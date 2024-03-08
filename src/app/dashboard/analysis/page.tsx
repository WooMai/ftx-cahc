import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const stats = [
  { name: "Estate Assets (est)", value: "$16.1", unit: "billion" },
  { name: "Net Estate Surplus (est)", value: "$4.06", unit: "billion" },
  { name: "If SOL, Anthropic fire sold", value: "$1.05" },
  {
    name: "If SOL, Anthropic retained",
    value: "$1.34",
    // unit: "USD"
  },
];

export default async function RecoveryAnalysis() {
  const user = await currentUser();
  const userId: string = user?.unsafeMetadata.external_id as string;

  const queryClient = new QueryClient();

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-base font-semibold leading-6 text-stone-200">
        Recovery Analysis
      </h3>
      <p className="text-md max-w-4xl text-stone-500">
        <span className="">
          The estate holds far more assets than the customer property valued at
          petition date prices which will lead to a {">"}$1 plan.
        </span>
      </p>
      <br />
      <br />
      <div className="border-b border-stone-700 bg-stone-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-stone-900 px-4 py-6 sm:px-6 lg:px-8"
              >
                <p className="text-sm font-medium leading-6 text-stone-400">
                  {stat.name}
                </p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </span>
                  {stat.unit ? (
                    <span className="text-sm text-stone-400">{stat.unit}</span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10  pb-5">
        <h3 className="mb-6 text-base font-semibold leading-6 text-stone-200">
          ...breakdown coming soon
        </h3>
        <p className="text-md max-w-4xl text-stone-500">
          The below document shows a breakdown of estate assets and estimated
          recoveries.
        </p>
      </div>
    </div>
  );
}
