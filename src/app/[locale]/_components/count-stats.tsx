"use client";
import { api } from "@/trpc/react";

export function CountStats() {
  const { data, isLoading, error } = api.user.userCount.useQuery();

  const stats = [
    {
      name: "Customers Joined",
      stat: !isLoading && !error ? data!.count : "",
    },
    {
      name: "Claim value",
      stat: !isLoading && !error ? data!.value : "",
    },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white  bg-gradient-to-r from-indigo-100 px-4 py-5 shadow-lg sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {!isLoading && !error ? item.stat : ""}&nbsp;
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
