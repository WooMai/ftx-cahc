import {auth, currentUser} from "@clerk/nextjs";

import {dehydrate, HydrationBoundary, QueryClient,} from "@tanstack/react-query";
import {MyClaims} from "./_components/my-claims";
import {DashboardCountStats} from "./_components/dashboard-count-stats";
import {Link} from "@/components/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/16/solid";
import {LanguageSelector} from "../_components/language-selector";
import {getTranslations} from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("Dashboard");
  const { sessionClaims } = auth();
  let userId: string | undefined | null = sessionClaims?.external_id as string;
  console.log("userId found on auth", userId);
  if (typeof userId === "undefined" || userId === null) {
    // fetch user
    const user = await currentUser();
    userId = user?.publicMetadata.external_id as string | undefined;
    console.log("userId found on public metadata", userId);
    if (!userId) {
      userId = user?.unsafeMetadata.external_id as string | undefined;
      console.log("userId found on unsafe metadata", userId);
    }
    if (!userId) {
      // if still no userId, error
      console.error("No session claims found, no metadata found");
    }
  }

  const queryClient = new QueryClient();

  //   const claims: (typeof ClaimSchema)[] = data!.data.claims;

  return (
    <div className="mt-8">
      <div className="mb-8 w-24">
        <LanguageSelector />
      </div>

      <h3 className="mb-6 text-base font-semibold leading-6 text-stone-200">
        {t('title')}
      </h3>
      <p className="text-md max-w-4xl text-stone-500">
        <span className="">
          {t('subtitle')}
        </span>
      </p>
      <div className="border-b border-stone-700 bg-stone-900">
        <DashboardCountStats />
      </div>
      <div className="mt-16 pb-5">
        <h3 className="text-base font-semibold leading-6 text-stone-200">
          {t('claim_list_title')}
        </h3>
      </div>
      {typeof userId !== "undefined" && (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MyClaims userId={userId} />
        </HydrationBoundary>
      )}
      {!userId && (
        <p className="text-md max-w-4xl text-center leading-8 text-rose-500">
          Error `${JSON.stringify(sessionClaims)}`:, please contact us on{" "}
          <a href="https://t.me/ftxcoalition" target="_blank">
            Telegram
          </a>{" "}
          for support.
        </p>
      )}
      <div className="pt-10">
        <h3 className="text-base font-semibold leading-6 text-stone-200">
          {t('now_what')}
        </h3>
        <br />
        <p className="text-md max-w-4xl text-stone-500">
          {t.rich('now_what_text', {
            white: (elem) => <span className="text-white">{elem}</span>,
            telegram: (elem) => (
                <Link
                    href="https://t.me/ftxcoalition"
                    className="text-indigo-300 underline"
                    target="_blank"
                >
                  {elem}
                  <ArrowTopRightOnSquareIcon className="mb-1 ml-1 inline h-3 w-3"/>
                </Link>
            )
          })}
        </p>
      </div>
      <div className="mt-10 border-t border-stone-700 pb-5 pt-10">
        <h3 className="text-base font-semibold leading-6 text-stone-200">
          {t('about_us')}
        </h3>
        <p className="text-md mt-10 max-w-4xl text-stone-500 whitespace-pre-line">
          {t('about_us_text')}
        </p>
      </div>
    </div>
  );
}
