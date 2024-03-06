import { ChevronDoubleUpIcon } from "@heroicons/react/16/solid";

const features = [
  {
    name: "Priority for customers.",
    description:
      "If the current plan stands, upside goes to non-customers even from proceeds that were 100% traced to customer wallets, like Anthropic.",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "Theft of property damages.",
    description:
      "Customers should recover today's valuation of their crypto assets due to theft of property.",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "No 30% withholding tax.",
    description:
      "Since the large majority of customers are non-US we will be subject to a 30% withholding tax which we will have to claim back from the IRS, an issue that the debtors have completely ignored due to their US focus.",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "Digital distributions.",
    description:
      "The debtors want to distribute recoveries via 'cash' which is lawyer-speak for checks in the mail. This is a huge and costly administrative burden that will reduce and delay recoveries.",
    icon: ChevronDoubleUpIcon,
  },
];

export function FightingFor() {
  return (
    <div className="bg-stone-900 py-24 ring-1 ring-stone-800 sm:rounded-xl sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Issues with current plan
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            We vote &apos;no&apos; on any plan unless the following issues are
            addressed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            The debtors have filed a half-baked and value-destructive plan. We
            aim to fix it by litigating our property rights and negotiating for
            common sense solutions like those below.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
