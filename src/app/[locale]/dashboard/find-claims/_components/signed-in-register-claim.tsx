"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useClaimsStore } from "@/app/[locale]/store/useClaimsStore";
import { SignedInRegisterWithClaims } from "./signed-in-register-with-claims";

export function SignedInRegisterClaim() {
  const selectedClaims = useClaimsStore((state) => state.selectedClaims);

  const isOpenByDefault = selectedClaims !== null && selectedClaims.length > 0;
  const [open, setOpen] = useState(isOpenByDefault);

  const cancelButtonRef = useRef(null);

  if (!open && selectedClaims !== null && selectedClaims.length > 0) {
    return (
      <>
        {/* Global notification live region, render this permanently at the end of the document */}
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-start px-4 py-4 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4  sm:items-center">
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
                className="pointer-events-auto w-full max-w-sm cursor-pointer overflow-hidden rounded-lg bg-stone-800 shadow-lg ring-4 ring-indigo-500 ring-opacity-90"
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
                        className="inline-flex flex-shrink-0 animate-bounce items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mb-0"
                      >
                        Register Claim
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
          className="relative z-50"
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
                  <SignedInRegisterWithClaims
                    onCancel={() => setOpen(false)}
                    cancelButtonRef={cancelButtonRef}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}
