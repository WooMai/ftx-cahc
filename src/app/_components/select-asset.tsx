import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

import { Fragment, useState } from "react";

import { getAssets } from "@/app/actions";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectAsset({
  assets,
  defaultValue,
  index,
}: {
  assets: { name: string }[];
  defaultValue?: string;
  index: number;
}) {
  const defaultValueOrEmptyString = defaultValue ? defaultValue : "";
  console.log(defaultValue);
  const [query, setQuery] = useState(defaultValueOrEmptyString);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredAssets =
    query === ""
      ? assets
      : assets.filter((asset) => {
          return asset.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedAsset}
      onChange={setSelectedAsset}
      className="relative mb-1 rounded-md bg-stone-700 shadow-inner ring-1 ring-inset ring-stone-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:mb-0"
    >
      <Combobox.Label
        className="absolute left-3 top-0 z-10 block text-xs font-medium leading-6 text-stone-400 "
        style={{ marginTop: 4.5 }}
      >
        Asset
      </Combobox.Label>
      <div className="relative">
        <Combobox.Input
          id={`conditions-${index}-name`}
          type="text"
          name={`conditions-${index}-name`}
          className="w-full rounded-md border-0 bg-transparent py-1.5 pl-3 pr-10 text-white ring-0 sm:text-sm sm:leading-6"
          style={{ marginTop: 16.5, paddingTop: 10.5 }}
          onChange={(event) => setQuery(event.target.value)}
          defaultValue={defaultValue ? defaultValue : undefined}
          displayValue={(asset) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return typeof asset === "object" && asset !== null
              ? //@ts-expect-error - TS doesn't understand what is being passed to this func
                asset.name
              : defaultValue
                ? defaultValue
                : "";
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-stone-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredAssets.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredAssets.map((asset, index) => (
              <Combobox.Option
                key={`${asset.name}-${index}`}
                value={asset}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-stone-300/50",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold",
                      )}
                    >
                      {asset.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
