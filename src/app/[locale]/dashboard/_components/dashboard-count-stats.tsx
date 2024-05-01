"use client";
import { api } from "@/trpc/react";
import {useTranslations} from "next-intl";

export const DashboardCountStats = () => {
  const t = useTranslations("CountStats");
  const { data, isLoading, error } = api.user.userCount.useQuery();

  const stats = [
    {
      name: t("stat1"),
      stat: !isLoading && !error ? data!.count : "",
    },
    {
      name: t("stat2"),
      stat: !isLoading && !error ? data!.value : "",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-stone-900 px-4 py-6 sm:px-6 lg:px-8"
          >
            <p className="text-sm font-medium leading-6 text-stone-400">
              {stat.name}
            </p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-white">
                {!isLoading && !error ? stat.stat : ""}&nbsp;
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
