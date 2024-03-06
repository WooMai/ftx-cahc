"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useClaimsStore } from "@/app/store/useClaimsStore";
import {
  ArrowTopRightOnSquareIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export function Register() {
  const selectedClaims = useClaimsStore((state) => state.selectedClaims);
  const removeClaim = useClaimsStore((state) => state.removeClaimWithCode);
  const isOpenByDefault = selectedClaims !== null && selectedClaims.length > 0;
  const [open, setOpen] = useState(isOpenByDefault);

  const cancelButtonRef = useRef(null);

  if (!open && selectedClaims !== null && selectedClaims.length > 0) {
    return (
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-4 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4  sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={!open}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                onClick={() => setOpen(true)}
                className="pointer-events-auto w-full max-w-sm cursor-pointer overflow-hidden rounded-lg bg-stone-800 shadow-lg ring-4 ring-indigo-600 ring-opacity-90"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex w-0 flex-1 justify-between">
                      <p className="w-0 flex-1 text-sm font-medium leading-8 text-white">
                        Selected {selectedClaims.length} claim
                        {selectedClaims.length > 1 ? "s" : ""}
                      </p>
                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 animate-bounce items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mb-0"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  }
  return (
    open &&
    selectedClaims.length > 0 && (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          key="registration-modal-open"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-stone-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:py-4">
                  <div className="bg-stone-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start sm:pr-12">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-700 sm:mx-0 sm:h-10 sm:w-10">
                        <UserPlusIcon
                          className="h-6 w-6 text-violet-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-stone-100"
                        >
                          Join Us
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-stone-500">
                            Complete this registration form
                          </p>
                          <div className="mt-8">
                            {selectedClaims.map((claim, index) => (
                              <div
                                key={index}
                                className="mb-2 flex flex-row items-center justify-between rounded-md bg-stone-700 p-4 shadow-inner ring-1 ring-inset ring-stone-600"
                              >
                                <p className="text-sm font-bold text-white">
                                  {claim.customerCode}
                                </p>
                                <p className="text-sm text-white">
                                  {claim.totalPetitionValue}
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeClaim(claim.customerCode)
                                  }
                                  className="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-stone-400 hover:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                          <p className="my-6 text-left text-sm text-stone-300">
                            Do you confirm, under penalty of purgery, that you
                            are the owner of{" "}
                            {selectedClaims.length > 1
                              ? "these claims?"
                              : "this claim?"}
                            <br />
                          </p>
                          <div className="relative mb-4 inline-block w-full rounded-md bg-stone-700 px-3 pb-1.5 pt-2.5 text-left shadow-inner ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label
                              htmlFor="full-name"
                              className="block text-xs font-medium text-stone-400"
                            >
                              Full name
                            </label>
                            <input
                              id="full-name"
                              name="full-name"
                              className="w-full border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="Your Name"
                              type="text"
                            />
                          </div>
                          <div className="relative inline-block w-full rounded-md bg-stone-700 px-3 pb-1.5 pt-2.5 text-left shadow-inner ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label
                              htmlFor="register-email"
                              className="block text-xs font-medium text-stone-400"
                            >
                              Contact email
                            </label>
                            <input
                              id="register-email"
                              name="register-email"
                              className="w-full border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="your@email.com"
                              type="email"
                            />
                          </div>
                          <p className="py-4 text-left text-sm text-stone-300">
                            By confirming you agree the CAHC represents you in
                            preserving customer property rights, to publish your
                            name (not customer code) in the 2019 declaration to
                            the court, and to abide by our{" "}
                            <Link
                              href="https://drive.google.com/file/d/1MYUnEK7C4VguRmTWrvR3h9Zv4HePp6zw/view?usp=sharing"
                              className="text-indigo-300 underline"
                              target="_blank"
                            >
                              bylaws
                              <ArrowTopRightOnSquareIcon className="ml-1 inline h-4 w-4" />
                            </Link>
                            .{" "}
                            <span className="font-semibold text-white">
                              If you DO NOT confirm, the court will assume
                              customers agree with the debtors{"'"} proposed
                              petition value recoveries.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-800 px-4 pb-6 sm:my-3 sm:ml-14 sm:flex sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Yes, I Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-stone-400 shadow-sm hover:bg-stone-700 hover:text-stone-200 sm:ml-3 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}
