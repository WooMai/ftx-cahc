import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

import Link from "next/link";

export default function VictimImpactStatementPage() {
  return (
    <div className="mt-8">
      <h3 className="mb-6 text-base font-semibold leading-6 text-stone-200">
        Write a victim impact statement for the SBF sentencing 2024
      </h3>
      <p className="text-md max-w-4xl text-stone-500">
        <span className="">
          Impacted customers have been requested by the DOJ to submit a victim
          impact statement to make it clear that {'"'}100% petition date{'"'} is
          in fact not being made whole when the stolen property is now worth
          much more.
        </span>
        <br />
        <br />
        Here is a resource to learn{" "}
        <Link
          href="https://www.justice.gov/criminal/criminal-vns/victim-impact-statements#:~:text=What%20is%20the%20purpose%20of,ordeal%20the%20crime%20has%20caused"
          className="text-indigo-300 underline"
          target="_blank"
        >
          what is a Victim Impact Statement
          <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-3 w-3" />
        </Link>
      </p>
      <div className="my-10 overflow-hidden rounded-lg bg-stone-800 shadow-xl ring-1 ring-stone-700 sm:p-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="">
            <p className="text-md max-w-4xl text-stone-500">
              Email your victim impact statement to:
              <br />
              <br />
              <span className="font-mono text-white">
                USANYS.FTXVictims@usdoj.gov
              </span>
              ,
              <br />
              <span className="font-mono text-white">
                Wendy.Olsen@usdoj.gov
              </span>
              ,
              <br />
              <span className="font-mono text-white">
                joseph@moskowitz-law.com
              </span>
              ,
              <br />
              <span className="font-mono text-white">
                rejane@moskowitz-law.com
              </span>
              <br />
              <br />
              before Mar 18th, 2024 to give them time to review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
