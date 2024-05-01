import { ChevronDoubleUpIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";

const features = [
  {
    name: "priority_for_customers",
    description: "priority_for_customers_desc",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "theft_of_property_damages",
    description: "theft_of_property_damages_desc",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "no_withholding_tax",
    description: "no_withholding_tax_desc",
    icon: ChevronDoubleUpIcon,
  },
  {
    name: "digital_distributions",
    description: "digital_distributions_desc",
    icon: ChevronDoubleUpIcon,
  },
];

export function FightingFor() {
  const t = useTranslations("FightingFor");

  return (
    <div className="bg-stone-900 py-24 ring-1 ring-stone-800 sm:rounded-xl sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            {t("issues_with_current_plan")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("we_vote_no")}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {t("debtors_filed_plan")}
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
                {t(feature.name)}
              </dt>{" "}
              <dd className="inline">{t(feature.description)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
