const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function CoinDetail({ claim }) {
  const coins = claim.token_fiat_nft_balance;
  return (
    <div className="bg-gray-800 py-10">
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Asset
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Balance
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
            >
              Petition (USD)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {coins.map((coin) => (
            <tr key={coin.name}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-white">
                    {coin.name}
                  </div>
                  <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                    {coin.type}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-gray-400">
                    {coin.balance}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-right font-mono text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                <span>{coin.balance}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
