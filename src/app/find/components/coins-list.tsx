import { Claim, type IAsset } from "@/app/models/Claim.model";
import { ThisIsMyClaim } from "./my-claim";

export function CoinsList({ coins, claim }: { coins: IAsset[]; claim: Claim }) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="overfow-y-scroll border-t border-t-stone-700 bg-stone-700/40 py-4 shadow-inner shadow-stone-950/20">
      <ThisIsMyClaim claim={claim} />
      <table className=" w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="max-[640px]:max-w-8 sm:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-xs leading-6 text-stone-500/80 sm:text-sm">
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
              Petition USD
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8"
            >
              Today{"'"}s USD
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {coins.map((coin: IAsset) => (
            <tr key={coin.name}>
              <td className="py-4 pl-4 pr-4 max-[640px]:max-w-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-xs font-medium leading-6 text-white sm:text-sm">
                    {coin.name}
                  </div>
                  <div className="hidden rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-stone-300 ring-1 ring-inset ring-white/10 sm:inline-block">
                    {coin.type}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-right font-mono text-xs leading-6 text-stone-300 max-[640px]:max-w-8 sm:table-cell sm:pr-6 sm:text-sm lg:pr-8">
                <div className=" gap-x-3">
                  <div className="truncate text-right font-mono text-xs leading-6 text-stone-300 sm:text-sm">
                    {coin.balance.toFixed(8)}
                  </div>
                </div>
              </td>
              <td className="truncate py-4 pl-0 pr-4 text-right font-mono text-xs leading-6 text-stone-500 max-[640px]:max-w-8 sm:table-cell sm:pr-6 sm:text-sm lg:pr-8">
                <span
                  className={classNames(
                    parseFloat(coin.usdPetition.replace(/[^0-9.-]+/g, "")) < 0
                      ? "text-rose-500/50"
                      : "",
                  )}
                >
                  {coin.usdPetition}
                </span>
              </td>
              <td className="truncate py-4 pl-0 pr-4 text-right font-mono text-xs leading-6 text-stone-300 max-[640px]:max-w-8 sm:table-cell sm:pr-6 sm:text-sm lg:pr-8">
                <span
                  className={classNames(
                    parseFloat(coin.usdLatest.replace(/[^0-9.-]+/g, "")) < 0
                      ? "text-rose-500"
                      : "",
                  )}
                >
                  {coin.usdLatest}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
