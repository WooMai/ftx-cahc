"use client";
import React, { useState } from "react";
import type { SetStateAction } from "react";

import type {
  ISearchCondition,
  ISearchRequest,
} from "@/app/models/Search.model";
import { PlusIcon } from "@heroicons/react/20/solid";
import { MinusIcon } from "@heroicons/react/16/solid";
import SelectAsset from "@/app/_components/select-asset";
import { defaultSearchPayload } from "@/app/_components/default-search-payload";

export function SearchForm({
  assets,
  searchConditions,
  performSearch,
}: {
  assets: { name: string }[];
  searchConditions: ISearchRequest;
  performSearch: (arg0: SetStateAction<ISearchRequest>) => Promise<void>;
}) {
  const [numConditions, setNumConditions] = useState<number>(1);

  const addCondition = () => {
    setNumConditions(numConditions + 1);
  };
  const removeCondition = () => {
    if (numConditions > 1) {
      setNumConditions(numConditions - 1);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const conditions = [];

    // build the request object
    for (let i = 0; i < numConditions; i++) {
      const condition: ISearchCondition = {
        name: formData.get(`conditions-${i}-name`) as string,
      };
      const minBalance = formData.get(`conditions-${i}-min_balance`) as string;
      const maxBalance = formData.get(`conditions-${i}-max_balance`) as string;

      if (minBalance) {
        condition.min_balance = parseFloat(minBalance);
      }
      if (maxBalance) {
        condition.max_balance = parseFloat(maxBalance);
      }
      conditions.push(condition);
    }

    const page = defaultSearchPayload.page;
    const page_size = defaultSearchPayload.page_size;

    const searchRequest: ISearchRequest = {
      conditions,
      page,
      page_size,
    };

    return await performSearch(searchRequest);
  };

  return (
    <div className="bg-stone-800 shadow-xl ring-1 ring-stone-700 sm:rounded-xl">
      <div className="px-4 py-2 sm:p-6">
        <div className="mt-2 max-w-xl text-sm text-stone-400">
          <p>Specify roughly how many tokens you had to identify your claim.</p>
        </div>

        <div className="">
          <div id="dynamicConditionsContainer" className="flex flex-row">
            <div className="flex-grow pr-4">
              <form onSubmit={(e) => submit(e)}>
                <input
                  readOnly
                  hidden
                  name="num-conditions"
                  id="num-conditions"
                  value={numConditions}
                />
                {Array.from({ length: numConditions }).map((_, index) => (
                  <div key={index} className="mt-4 flex flex-col sm:flex-row">
                    <SelectAsset
                      assets={assets}
                      index={index}
                      defaultValue={
                        index === 0
                          ? searchConditions.conditions[0]!.name
                          : undefined
                      }
                    />
                    <div className="inline-block sm:ml-10 ">
                      <div className="isolate flex flex-row rounded-md bg-stone-700 shadow-inner shadow-stone-900/50">
                        <div className="relative inline-block basis-3/6 rounded-md rounded-r-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 sm:col-span-1">
                          <label
                            htmlFor="name"
                            className="block text-xs font-medium text-stone-400"
                          >
                            Minimum
                          </label>
                          <input
                            type="number"
                            placeholder="100"
                            id={`conditions-${index}-min_balance`}
                            name={`conditions-${index}-min_balance`}
                            defaultValue={
                              searchConditions.conditions[index]?.min_balance
                            }
                            className="block max-w-16 border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600/80 focus:ring-0 sm:max-w-36 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="relative inline-block basis-3/6 rounded-md rounded-l-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600 sm:col-span-1">
                          <label
                            htmlFor="job-title"
                            className="block text-xs font-medium text-stone-400"
                          >
                            Maximum
                          </label>
                          <input
                            id={`conditions-${index}-max_balance`}
                            name={`conditions-${index}-max_balance`}
                            className="bloc6 max-w-16 border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600/80 focus:ring-0 sm:max-w-36 sm:text-sm sm:leading-6"
                            placeholder="1000"
                            defaultValue={
                              searchConditions.conditions[index]?.max_balance
                            }
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="mt-10 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="flex min-w-20 flex-1 flex-col justify-end">
              <div className="flex-grow"></div>
              <div className="mx-auto" style={{ paddingBottom: 82 }}>
                <button
                  key={"add-button"}
                  onClick={addCondition}
                  className="inline-block cursor-pointer rounded-full border border-stone-600 bg-stone-800 p-1 text-stone-600 shadow-sm hover:bg-stone-700/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  key={"remove-button"}
                  onClick={removeCondition}
                  className="ml-3 inline-block cursor-pointer rounded-full border border-stone-600 bg-stone-800 p-1 text-stone-600 shadow-sm hover:bg-stone-700/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                >
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
