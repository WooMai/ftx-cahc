import { unstable_noStore as noStore } from "next/cache";

import { Link } from "@/components/link";
import { Text } from "@/components/text";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { SearchClaims } from "@/app/_components/search-claims";
import { CountStats } from "@/app/_components/count-stats";
import { TopNavHome } from "@/app/_components/top-nav-home";
import { FightingFor } from "@/app/_components/fighting-for";
import { Footer } from "@/app/_components/footer";

import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.claim.hello.query({ text: "from tRPC" });
  const latestClaim = await api.claim.getLatest.query();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gray-900">
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
      <div className="px-6 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl pb-20 text-center">
          <div className="mt-24 hidden sm:mt-32 sm:block lg:mt-16">
            <a
              href="https://x.com/sunil_trades/status/1763120860829716758?s=20"
              target="_blank"
              className="mb-10 inline-flex space-x-6"
            >
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                Introducing
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>A new FTX Customer Ad-Hoc Committee</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <br />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the FTX Customer Ad-Hoc Committee (CAHC)
            <br />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            With over <span className="font-bold">300+ creditors</span> holding{" "}
            <span className="font-bold">9-figures in claims</span>, we have
            formed the largest voting block in the FTX bankruptcy cases.
            <br />
            Represented by{" "}
            <span className="font-bold">McCarter & English, LLP</span>.
          </p>
          <hr className="mt-10 opacity-20" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            Though we are the largest group we need creditors to onboard to the
            CAHC to let the court know that our arguments do infact represent
            the views of customers.
          </p>
          <br />
          <div className="mt-10 flex items-center justify-center gap-x-3">
            <a
              href="/find"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-inner shadow-lg shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Find your claim <span aria-hidden="true">→</span>
            </a>
            <span className="text-sm font-semibold leading-6 text-white">
              to begin the onboarding process
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
    </div>
  );
}

// export default async function Home() {
//   noStore();
//   const hello = await api.claim.hello.query({ text: "from tRPC" });
//   {
//     hello ? hello.greeting : "Loading tRPC query...";
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//         <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-2xl text-white">
//             {hello ? hello.greeting : "Loading tRPC query..."}
//           </p>
//         </div>

//         <CrudShowcase />
//       </div>
//     </main>
//   );
// }
