import { type IAsset } from "@/app/models/Claim.model";

export function CoinsList({ coins, contingentIndicator, earnIndicator }: { coins: IAsset[], contingentIndicator: string[], earnIndicator: boolean}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="overfow-y-scroll border-t border-t-stone-700 bg-stone-700/40 py-4 shadow-inner shadow-stone-950/20">
      {
      earnIndicator ? (
                <span
                  style={{ marginTop: -3 }}
                  className="ml-2 hidden rounded-md bg-cyan-800/50 px-2 py-1 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-500/25 sm:inline-block">
                <span className="text-xs leading-5">
                  Earn enabled
                </span></span>
              ) : null}
              {
              contingentIndicator.length > 1 ? (
                
                contingentIndicator.map((indicator) => (
                <span
                  style={{ marginTop: -3 }}
                  className="ml-2 hidden rounded-md bg-indigo-600/25 px-2 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/25 sm:inline-block">
                  <span className="text-xs leading-5">
                    indicator)
                  </span>
                </span>))
              ) : null}
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
