import { useTranslations } from "next-intl";

export function ImportantDates() {
  const t = useTranslations("ImportantDates");
  const keys = [
    "date1",
    "date2",
    "date3",
    "date4",
    "date5",
    "date6",
    "date7",
    "date8",
    "date9",
    "date10",
    "date11",
  ]; // List all the date keys
  function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <section className="mt-12">
      <h2 className="text-base font-semibold leading-6 text-stone-300">
        {t("title")}
      </h2>
      <ol className="mt-2 divide-y divide-stone-800 text-sm leading-6 text-stone-500">
        {keys.map((key) => (
          <li key={key} className="py-4 sm:flex">
            <time
              className={classNames(
                t(`${key}.highlight`) === "yes"
                  ? "text-white"
                  : "text-stone-600",
                "w-28 flex-none",
              )}
            >
              {t(`${key}.title`)}
            </time>
            <p
              className={classNames(
                t(`${key}.highlight`) === "yes"
                  ? "text-white"
                  : "text-stone-600",
                "mt-2 flex-auto sm:mt-0",
              )}
            >
              {t(`${key}.description`)}
            </p>
            {t(`${key}.easternTime`) && (
              <p className={classNames("text-white", "flex-none sm:ml-6")}>
                <time>{t(`${key}.easternTime`)}</time>
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
