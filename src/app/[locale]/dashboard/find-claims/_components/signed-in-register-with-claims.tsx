import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

import {
  UserPlusIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useClaimsStore } from "@/app/[locale]/store/useClaimsStore";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { revalidatePath } from "next/cache";

export const SignedInRegisterWithClaims = ({
  onCancel,
  cancelButtonRef,
}: {
  onCancel: () => void;
  cancelButtonRef: React.RefObject<HTMLButtonElement> | null;
}) => {
  const { user, isLoaded, isSignedIn } = useUser();
  let external_id: string | null = null;
  if (isLoaded && isSignedIn) {
    external_id =
      user.externalId === null || typeof user.externalId === "undefined"
        ? (user.publicMetadata?.external_id as string | null) ??
          (user.unsafeMetadata?.external_id as string | null)
        : user.externalId;
  }

  const selectedClaims = useClaimsStore((state) => state.selectedClaims);
  const removeClaim = useClaimsStore((state) => state.removeClaimWithCode);
  const reset = useClaimsStore((state) => state.reset);
  const router = useRouter();

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  // trpc
  const mutation = api.user.userClaimsCreate.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create user if doesn't already exist. throw error if user already exists
    try {
      const buildRequestArray = selectedClaims.map(
        (claim): { userId: string; customerCode: string } => {
          return { userId: external_id!, customerCode: claim.customerCode };
        },
      );

      await mutation.mutateAsync(buildRequestArray);

      // wipe the store
      reset();
      router.push("/dashboard");
    } catch (error: unknown) {
      // we handle the database validation error here

      if ((error as { shape?: { message: string } }).shape) {
        if (
          (error as { shape?: { message: string } }).shape?.message ===
          'duplicate key value violates unique constraint "user_claims_user_id_customer_code_unique"'
        ) {
          console.log(
            (error as { shape?: { message: string } }).shape?.message,
          );
          setAlreadyAdded(true);
        }
      } else {
        if (external_id === null || typeof external_id === "undefined") {
          alert(
            "We're experiencing high traffic and need a few minutes for your account to be created. Please refresh and try again in a few minutes.",
          );
          revalidatePath("/", "layout");
        } else {
          alert(
            "Something went wrong. Please contact us on Telegram for support",
          );
          console.error(error);
        }
      }
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="relative bg-stone-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start sm:pr-12">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 sm:mx-0 sm:h-10 sm:w-10">
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
              Register this claim as yours
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-stone-500">Review the terms below</p>
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
                      onClick={() => removeClaim(claim.customerCode)}
                      className="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-stone-400 hover:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <p className="my-6 text-left text-sm text-stone-300">
                Do you confirm, under penalty of perjury, that you are the owner
                of {selectedClaims.length > 1 ? "these claims?" : "this claim?"}
                <br />
              </p>

              <p className="py-4 text-left text-sm text-stone-300">
                By confirming you agree to joining the CAHC plaintiffs in
                defending your property rights, to publish your name (no other
                personal info) in the 2019 declaration to the court, and to
                abide by our{" "}
                <Link
                  href="https://drive.google.com/file/d/1MYUnEK7C4VguRmTWrvR3h9Zv4HePp6zw/view?usp=sharing"
                  className="text-indigo-300 underline"
                  target="_blank"
                >
                  bylaws
                  <ArrowTopRightOnSquareIcon className="ml-1 inline h-4 w-4" />
                </Link>
                . <br />
                <span className="font-semibold text-white">
                  If you DO NOT confirm, the court will assume customers agree
                  with the debtors{"'"} proposed petition value recoveries.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {mutation.isError && alreadyAdded && (
        <div className="bg-stone-800 px-4 pb-6 sm:my-3 sm:flex sm:px-6">
          <div className="w-full rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4 sm:mx-14">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon
                  className="h-5 w-5 text-yellow-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have already registered this claim.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-stone-800 px-4 pb-6 sm:my-3 sm:ml-14 sm:flex sm:px-6">
        {!mutation.isError && (
          <>
            <button
              disabled={mutation.isPending}
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto"
            >
              {mutation.isPending && (
                <span>
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              )}
              <span>Yes, I Confirm</span>
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-stone-400 shadow-sm hover:bg-stone-700 hover:text-stone-200 sm:ml-3 sm:mt-0 sm:w-auto"
              onClick={onCancel}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </>
        )}
        {mutation.isError && !alreadyAdded ? (
          <p className="text-rose-500">
            An error occurred: {mutation.error.message}.
            <br />
            Please contact support on
            <a
              className="text-indigo-300 underline"
              href="https://t.me/ftxcoalition"
              target="_blank"
            >
              telegram
            </a>
          </p>
        ) : null}
        {mutation.isSuccess ? (
          <div className="bg-stone-800 px-4 pb-6 sm:my-3 sm:flex sm:px-6">
            <div className="w-full rounded-md border-l-4 border-green-400 bg-yellow-50 p-4 sm:mx-14">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Success!</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};
