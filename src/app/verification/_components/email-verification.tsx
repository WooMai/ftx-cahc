"use client";
import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
type EmailLinkError = {
  code: string;
  name: string;
  message: string;
};
export function EmailVerification() {
  const [verificationStatus, setVerificationStatus] = useState("loading");

  const { handleEmailLinkVerification } = useClerk();

  useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: `https://${process.env.NEXT_PUBLIC_DOMAIN}/find`,
          redirectUrlComplete: `https://${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
        });
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified");
      } catch (err) {
        // Verification has failed.
        let status = "failed";
        if (
          isEmailLinkError(err as EmailLinkError) &&
          (err as EmailLinkError).code === EmailLinkErrorCode.Expired
        ) {
          status = "expired";
        }
        setVerificationStatus(status);
      }
    }
    void verify();
  }, [handleEmailLinkVerification]);

  if (verificationStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (verificationStatus === "failed") {
    return (
      <div className="absolute left-0 top-0 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
        <div className="h-full self-center text-center">
          <ExclamationTriangleIcon className="inline-block h-10 w-10 text-indigo-300" />
          <p className="py-4 text-left text-sm text-stone-300">
            Email link verification failed
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === "expired") {
    return (
      <div className="absolute left-0 top-0 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
        <div className="h-full self-center text-center">
          <ExclamationTriangleIcon className="inline-block h-10 w-10 text-indigo-300" />
          <p className="py-4 text-left text-sm text-stone-300">
            Email link has expired
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-0 flex min-h-full w-full justify-center bg-stone-800/90 align-middle">
      <div className="h-full self-center text-center">
        <CheckIcon className="inline-block h-10 w-10 text-indigo-300" />
        <p className="py-4 text-left text-sm text-stone-300">
          Successfully signed up!
        </p>
      </div>
    </div>
  );
}
