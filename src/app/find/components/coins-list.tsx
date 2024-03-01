import { IAsset } from "../../models/Claim.model";

// TODO: color the negative balances
// const statuses = {
//   Completed: "text-green-400 bg-green-400/10",
//   Error: "text-rose-400 bg-rose-400/10",
// };

export function CoinsList({ coins }: { coins: IAsset[] }) {
  return (
    <div className="overfow-y-scrollk bg-gray-800 py-10">
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="max-[640px]:max-w-8 sm:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
          <col className="max-[640px]:max-w-8 lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
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
                  <div className="hidden rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10 sm:inline-block">
                    {coin.type}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-right font-mono text-sm leading-6 text-gray-400 max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8">
                <div className=" gap-x-3">
                  <div className="truncate text-right font-mono text-sm leading-6 text-gray-400">
                    {coin.balance.toFixed(8)}
                  </div>
                </div>
              </td>
              <td className="truncate py-4 pl-0 pr-4 text-right font-mono text-sm leading-6 text-gray-400 max-[640px]:max-w-8 sm:table-cell sm:pr-6 lg:pr-8">
                <span>{coin.usdPetition}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
