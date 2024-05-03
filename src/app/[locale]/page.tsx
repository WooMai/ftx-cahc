import { unstable_noStore as noStore } from "next/cache";

import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { CountStats } from "@/app/[locale]/_components/count-stats";
import { TopNavHome } from "@/app/[locale]/_components/top-nav-home";
import { FightingFor } from "@/app/[locale]/_components/fighting-for";
import { Anticipate } from "@/app/[locale]/_components/anticipate";
import { Link } from "@/components/link";
import { ScrollDownIndicator } from "@/app/[locale]/_components/scroll-down-indicator";
import BackToTopButton from "./_components/back-to-top";

import { getTranslations } from "next-intl/server";

export default async function Home() {
  noStore();
  const t = await getTranslations("Home");

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-stone-950">
      <TopNavHome />
      <svg
        viewBox="0 0 1024 1024"
        className="top-1/5 absolute left-1/2 -z-10 h-[124rem] w-[124rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.5"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div className="px-6 py-8 pt-0 sm:px-6 sm:py-24 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-2xl pb-20 text-center">
          <div className="sm:mt-24 sm:block lg:mt-16">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 sm:hidden">
              {t("latest_news")}
            </span>
            <a
              href="https://x.com/MHE_BE3ET/status/1765258417890033876?s=20"
              target="_blank"
              className="mb-10 inline-flex space-x-6"
            >
              <span className="hidden rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 sm:inline">
                {t("latest")}
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>{t("latest_news_content")}</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <br />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
            <br />
          </h2>
          <div className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            <p className="mb-6">
              {t.rich('description', {
                b: (chunk) => <span className="font-bold">{chunk}</span>,
              })}
            </p>
            <p>
              {t.rich("legal_counsel", {
                b: (chunk) => <span className="font-bold">{chunk}</span>,
                docket: (chunk) => (
                    <Link
                        className="text-indigo-300 underline"
                        href="https://restructuring.ra.kroll.com/FTX/Home-DocketInfo"
                        target="_blank"
                    >
                      {chunk}
                      <ArrowTopRightOnSquareIcon className="mb-1 ml-1  inline h-4 w-4" />
                    </Link>
                ),
              })}
            </p>
          </div>
          <hr className="mt-10 opacity-20" />
          <div className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            <p className="mb-5">
              {t.rich('join_us', {
                b: (chunk) => <span className="font-bold">{chunk}</span>,
              })}
            </p>
            <p>
              {t.rich('read_more', {
                bylaws: (chunk) => (
                    <Link
                        href="https://drive.google.com/file/d/1MYUnEK7C4VguRmTWrvR3h9Zv4HePp6zw/view?usp=sharing"
                        className="text-indigo-300 underline"
                        target="_blank"
                    >
                      {chunk}
                      <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-4 w-4" />
                    </Link>
                ),
                charter: (chunk) => (
                    <Link
                        href="https://docs.google.com/document/d/1cw_ZWHNMM90IfGuOhDRQYl9PBSSV7pOdR4SfZhQZpG8/edit?usp=sharing"
                        target="_blank"
                        className="text-indigo-300 underline"
                    >
                      {chunk}
                      <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-4 w-4" />
                    </Link>
                ),
              })}
            </p>
          </div>
          <br />
          <div className="mt-10 flex flex-col items-center justify-center gap-x-3 sm:flex-row">
            <Link
              href="/find"
              className="w-full rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-semibold leading-loose text-white shadow-inner shadow-lg shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:w-fit"
            >
              {t("find_your_ftx_claim")} <span aria-hidden="true">→</span>
            </Link>
            <span className="block py-2 text-sm leading-loose text-white opacity-30 sm:inline-block sm:opacity-100">
              {t("to_get_started")}
            </span>
          </div>
          <div className="my-20">
            <CountStats />
          </div>
        </div>
        <hr className="opacity-10" />
        <div>
          <FightingFor />
        </div>
      </div>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-40rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <ScrollDownIndicator />
      <BackToTopButton />
      <Anticipate />
    </div>
  );
}
