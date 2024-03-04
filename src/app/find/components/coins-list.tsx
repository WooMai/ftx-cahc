import { type IAsset } from "@/app/models/Claim.model";
import { Link } from "@/components/link";

export function CoinsList({ coins }: { coins: IAsset[]}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="overfow-y-scroll border-t border-t-stone-700 bg-stone-700/40 py-4 shadow-inner shadow-stone-950/20">
      <div className="mt-6 mb-12 px-4 sm:p-6">
      <div className="bg-stone-800 shadow-xl ring-1 ring-stone-700 rounded-xl">
      <div className="py-4 px-6 flex flex-col sm:flex-row justify-between">
        <div className="mr-4 flex flex-row align-middle">
          <p className="inline-block leading-9 text-sm text-stone-400 italic text-center sm:text-left">Register this claim as yours <span aria-hidden="true">&rarr;</span> </p>
        </div>
        <Link
          href={""}
            className="sm:inline-flex sm:mb-0 mb-2 items-center rounded-md bg-indigo-600 sm:px-3 sm:py-2 px-8 text-center inline-block py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" 
            >Mark as my claim</Link>
      </div>
      </div>
      </div>
      
      <table className=" w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="max-[640px]:max-w-8 sm:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-stone-500/80">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-4 font-semibold max-[640px]:max-w-8 sm:pl-6 lg:pl-8"
            >
              Asset
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8"
            >
              Balance
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8"
            >
              Petition (USD)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {coins.map((coin: IAsset) => (
            <tr key={coin.name}>
              <td className="py-4 pl-4 pr-4 max-[640px]:max-w-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-white">
                    {coin.name}
                  </div>
                  <div className="hidden rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-stone-300 ring-1 ring-inset ring-white/10 sm:inline-block">
                    {coin.type}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-right font-mono text-sm leading-6 text-stone-300 max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8">
                <div className=" gap-x-3">
                  <div className="truncate text-right font-mono text-sm leading-6 text-stone-300">
                    {coin.balance.toFixed(8)}
                  </div>
                </div>
              </td>
              <td className="truncate py-4 pl-0 pr-4 text-right font-mono text-sm leading-6 text-stone-300 max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8">
                <span
                  className={classNames(
                    parseFloat(coin.usdPetition.replace(/[^0-9.-]+/g, "")) < 0
                      ? "text-rose-500"
                      : "",
                  )}
                >
                  {coin.usdPetition}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
