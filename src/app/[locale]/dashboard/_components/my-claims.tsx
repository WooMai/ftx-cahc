"use client";
import ClaimItem from "@/app/[locale]/find/components/claim-item";
import { type Claim, ClaimDrizzle } from "@/app/[locale]/models/Claim.model";
import { api } from "@/trpc/react";
import {
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

import type { Key } from "react";
import {useTranslations} from "next-intl";

export function MyClaims({ userId }: { userId: string }) {
  const t = useTranslations("MyClaims");
  const { data, isLoading, error } = api.claim.getClaimsForUserWithId.useQuery({
    userId,
  });

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
                    <span className="hidden sm:inline">{t('customer_code_long')}</span>
                    <span className="sm:hidden">{t('customer_code_short')}</span>
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    <span className="font-semibold">{"         "}</span>
                  </div>
                </div>
                <div className="sm:ml-20 sm:flex sm:flex-col sm:items-start">
                  <p className="mt-1 text-xs leading-5 text-stone-400/50">
                    {t('petition_value')}
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    {"             "}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xs leading-5 text-stone-400">
                    {t('today_value')}
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
                    <span className="hidden sm:inline">{t('customer_code_long')}</span>
                    <span className="sm:hidden">{t('customer_code_short')}</span>
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    <span className="font-semibold">{"         "}</span>
                  </div>
                </div>
                <div className="sm:ml-20 sm:flex sm:flex-col sm:items-start">
                  <p className="mt-1 text-xs leading-5 text-stone-400/50">
                    {t('petition_value')}
                  </p>
                  <div className="my-1 inline-block min-h-4 min-w-32 animate-pulse rounded-md bg-stone-700 font-mono text-xs leading-6 text-white sm:text-base">
                    {"             "}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-4">
                <div className="sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xs leading-5 text-stone-400">
                    {t('today_value')}
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
        <p className="text-md max-w-4xl text-center leading-8 text-rose-500">
          Error `${JSON.stringify(error)}`:, please contact us on{" "}
          <a
            className="text-indigo-300 underline"
            href="https://t.me/ftxcoalition"
            target="_blank"
          >
            Telegram
          </a>{" "}
          for support.
        </p>
      </>
    );
  }

  const myClaims = data;

  return (
    <div>
      {!myClaims || myClaims.length === 0 ? (
        <Link
          href="/dashboard/find-claims"
          className="relative block w-full rounded-lg border-2 border-dashed border-stone-600 p-12 text-center hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <MagnifyingGlassPlusIcon className="mx-auto h-12 w-12 text-stone-300" />
          <span className="mt-2 block text-sm font-semibold text-stone-300">
            Find your claim to join the Customer Ad-Hoc Committee
          </span>
        </Link>
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
          <div className="flex flex-col-reverse justify-between py-5 sm:row-auto sm:flex-row">
            <p className="text-md max-w-4xl text-center leading-8 text-stone-500 sm:text-left">
              {t('verify_claim_text')}
            </p>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-80 sm:w-auto"
            >
              {t('verify_claim_btn')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
