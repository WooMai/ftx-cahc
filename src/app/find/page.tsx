import { TopNavHome } from "@/app/_components/top-nav-home";

import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";
import { Search } from "./components/search";

export default async function Find() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["searchResults"],
  //   queryFn: () =>
  //     searchWithConditions({
  //       conditions: [{ name: "BTC", min_balance: 100, max_balance: 10000 }],
  //       page: 1,
  //       page_size: 10,
  //     }),
  // });

  return (
    <>
      <Hydrate state={dehydrate(queryClient)}>
        <div className="relative isolate min-h-screen overflow-hidden  bg-gray-900">
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

          <div className="">
            <hr className="opacity-10" />
            <div className="min-h-screen w-full  bg-gray-900">
              <div className="mx-auto max-w-screen-md">
                <Search />
              </div>
            </div>
          </div>
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-10rem)] xl:left-[calc(50%-24rem)]"
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
      </Hydrate>
    </>
  );
}
