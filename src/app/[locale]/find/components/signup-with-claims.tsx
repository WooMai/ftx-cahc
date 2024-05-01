import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useSignUp, useSignIn, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";

import {
  UserPlusIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useClaimsStore } from "@/app/[locale]/store/useClaimsStore";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export const SignUpWithClaims = ({
  onCancel,
  cancelButtonRef,
}: {
  onCancel: () => void;
  cancelButtonRef: React.RefObject<HTMLButtonElement> | null;
}) => {
  const t = useTranslations("SignUpWithClaims");
  const selectedClaims = useClaimsStore((state) => state.selectedClaims);
  const removeClaim = useClaimsStore((state) => state.removeClaimWithCode);

  // clerk: https://clerk.com/docs/custom-flows/magic-links
  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  const [createUserAlreadyExists, setCreateUserAlreadyExists] = useState(false);

  console.log("rendering");
  // trpc
  const mutation = api.user.userCreateWithClaims.useMutation();

  if (!isLoaded) {
    return null;
  }

  const { startEmailLinkFlow, cancelEmailLinkFlow } =
    signUp.createEmailLinkFlow();

  const createClerkUser = async (withUUID: string) => {
    console.log("starting");
    setExpired(false);
    setVerified(false);
    // Start the sign up flow, by collecting
    // the user's email address.

    await signUp.create({
      emailAddress: emailAddress.toLowerCase(),
      unsafeMetadata: { external_id: withUUID },
    });
    // Start the magic link flow.
    // Pass your app URL that users will be navigated
    // when they click the magic link from their
    // email inbox.
    // su will hold the updated sign up object.
    const su = await startEmailLinkFlow({
      redirectUrl: `https://${process.env.NEXT_PUBLIC_DOMAIN}/verification`,
    });
    const verification = su.verifications.emailAddress;
    if (verification.verifiedFromTheSameClient()) {
      setVerified(true);
      console.log("verified");
      // If you're handling the verification result from
      // another route/component, you should return here.
      // See the <MagicLinkVerification/> component as an
      // example below.
      // If you want to complete the flow on this tab,
      // don't return. Check the sign up status instead.
      //   return;
    } else if (verification.status === "expired") {
      setExpired(true);
      console.log("expired");
    }

    if (su.status === "complete") {
      console.log("complete");
      // Sign up is complete, we have a session.
      // Navigate to the after sign up URL.
      await setActive({
        session: su.createdSessionId,
        beforeEmit: () => router.push("/dashboard"),
      });
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create user if doesn't already exist. throw error if user already exists
    try {
      const result = await mutation.mutateAsync({
        user: { email: emailAddress.toLowerCase(), fullName: fullName },
        claims: selectedClaims,
      });
      if (!result)
        throw Error(
          "no user returned from successful mutation for " + emailAddress,
        );
      await createClerkUser(result.user.id);
    } catch (error: unknown) {
      if ((error as { shape?: { message: string } }).shape) {
        if (
          (error as { shape?: { message: string } }).shape?.message ===
          'duplicate key value violates unique constraint "users_email_unique"'
        ) {
          console.log(
            (error as { shape?: { message: string } }).shape?.message,
          );
          setCreateUserAlreadyExists(true);
        }
      } else {
        console.log("Unexpected error", error);
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
              {t("makeYourVoiceHeard")}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-stone-500">
                {t("completeRegistrationForm")}
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
                      onClick={() => removeClaim(claim.customerCode)}
                      className="ml-3 flex-shrink-0 rounded-md text-sm font-medium text-stone-400 hover:text-stone-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {t("removeButton")}
                    </button>
                  </div>
                ))}
              </div>
              <p className="my-6 text-left text-sm text-stone-300">
                {t("confirmOwnershipText", {
                  count: selectedClaims.length,
                })}
                <br />
              </p>
              <div className="relative mb-4 inline-block w-full rounded-md bg-stone-700 px-3 pb-1.5 pt-2.5 text-left shadow-inner ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                <label
                  htmlFor="full-name"
                  className="block text-xs font-medium text-stone-400"
                >
                  {t("fullNameLabel")}
                </label>
                <input
                  required
                  id="full-name"
                  name="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600 invalid:border-red-500 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder={t("fullNamePlaceholder")}
                />
              </div>
              <div className="relative inline-block w-full rounded-md bg-stone-700 px-3 pb-1.5 pt-2.5 text-left shadow-inner ring-1 ring-inset ring-stone-600 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-stone-400"
                >
                  {t("emailLabel")}
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full border-0 bg-transparent p-0 text-stone-100 placeholder:text-stone-600 invalid:border-red-500 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
              <div className="py-4 text-left text-sm text-stone-300">
                <p className="mb-2.5 whitespace-pre-line">
                  {t.rich("agreementText", {
                    bylaws: text => <Link
                        href="https://drive.google.com/file/d/1MYUnEK7C4VguRmTWrvR3h9Zv4HePp6zw/view?usp=sharing"
                        className="text-indigo-300 underline"
                        target="_blank"
                    >
                      {text}
                      <ArrowTopRightOnSquareIcon className="ml-1 inline h-4 w-4" />
                    </Link>
                  })}
                </p>
                <p className="font-semibold text-white">
                  {t("disagreementWarning")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mutation.isError && createUserAlreadyExists && (
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
                  {t("emailAlreadyInUseError")}{" "}
                  <SignInButton mode="modal" afterSignInUrl="/dashboard">
                    <span className="cursor-pointer">
                      <span className="underline hover:text-yellow-600">
                        {t("signInLink")}
                      </span>
                      .
                    </span>
                  </SignInButton>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-stone-800 px-4 pb-6 sm:my-3 sm:ml-14 sm:flex sm:px-6">
        {!mutation.isError && !createUserAlreadyExists && (
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
            <span>{t("confirmButton")}</span>
          </button>
        )}
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm text-stone-400 shadow-sm hover:bg-stone-700 hover:text-stone-200 sm:ml-3 sm:mt-0 sm:w-auto"
          onClick={onCancel}
          ref={cancelButtonRef}
        >
          {t("cancelButton")}
        </button>
      </div>
      {mutation.isSuccess && (
        <div className="absolute left-0 top-0 z-20 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
          <div className="h-full self-center text-center">
            <EnvelopeIcon className="inline-block h-10 w-10 animate-bounce text-indigo-300" />
            <p className="text-md py-4 text-center text-stone-300">
              {t("successMessage")}
              <br />
              <span className="font-semibold text-white">
                {t("checkEmailMessage")}
              </span>
            </p>
          </div>
        </div>
      )}
      {expired && (
        <div className="absolute left-0 top-0 z-20 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
          <div className="h-full self-center text-center">
            <ExclamationTriangleIcon className="inline-block h-10 w-10 text-indigo-300" />
            <p className="text-md py-4 text-left text-stone-300">
              {t("emailExpiredError")}
            </p>
          </div>
        </div>
      )}
      {verified && (
        <div className="absolute left-0 top-0 z-20 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
          <div className="h-full self-center text-center">
            <CheckIcon className="inline-block h-10 w-10 text-indigo-300" />
            <p className="text-md py-4 text-left text-stone-300">
              {t("signInOtherTabMessage")}
            </p>
          </div>
        </div>
      )}
    </form>
  );
};
