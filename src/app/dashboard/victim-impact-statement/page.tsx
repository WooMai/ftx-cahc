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
          href="https://drive.google.com/file/d/1MYUnEK7C4VguRmTWrvR3h9Zv4HePp6zw/view?usp=sharing"
          className="text-indigo-300 underline"
          target="_blank"
        >
          what is a Victim Impact Statement
          <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-3 w-3" />
        </Link>
      </p>
      <div className="my-10 overflow-hidden rounded-lg bg-stone-800 shadow-xl ring-1 ring-stone-700 sm:p-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="border-b border-stone-700 pb-5 sm:flex sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold leading-6 text-stone-200">
              Paste this prompt into ChatGPT for help
            </h3>
            <div className="mt-3 flex sm:ml-4 sm:mt-0">
              <Link
                target="_blank"
                href="https://chat.openai.com/"
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                ChatGPT
                <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="border-b border-stone-700 py-4 pb-5">
            <p className="text-md max-w-4xl text-stone-400">
              Please help me draft a victim impact statement for the SBF
              sentencing.
              <br />
              <br />I am a victim of the FTX fraud and have suffered significant
              financial losses, psychological and emotional damage as a result
              of the theft of my assets. SBFs legal team is representing that
              FTX customers are being made whole. I want to make it clear that
              it is a false representation, that {'"'}100% petition date value
              {'"'} is in fact not being made whole when the stolen property is
              now worth much more. This has drastically changed the course of my
              life and I want to ensure that justice is served and not
              manipulated by a false narrative.
            </p>
          </div>
          <p className="text-md max-w-4xl pt-4 text-stone-500">
            Email your victim impact statement to:
            <br />
            <br />
            <span className="font-mono text-white">
              USANYS.FTXVictims@usdoj.gov
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
  );
}
