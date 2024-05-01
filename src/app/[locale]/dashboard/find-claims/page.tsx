import {Search} from "@/app/[locale]/find/components/search";
import {getAssets} from "@/app/[locale]/actions";

import {Link} from "@/components/link";
import {SignedInRegisterClaim} from "./_components/signed-in-register-claim";
import {getTranslations} from "next-intl/server";
import {LanguageSelector} from "@/app/[locale]/_components/language-selector";

export default async function Find() {
  const assets = await getAssets();
  const t = await getTranslations('Find');

  return (
    <div className="relative isolate min-h-screen overflow-hidden  bg-stone-900">
      <div className="my-8 w-24">
        <LanguageSelector/>
      </div>
      <h3 className="mb-6 mt-8 text-base font-semibold leading-6 text-stone-200">
        {t("title")}
      </h3>
      <p className="text-md max-w-4xl text-stone-500">
        <span className="">
            {t.rich('subtitle', {
              MyClaims: text => <Link className="text-stone-300 whitespace-nowrap" href="/dashboard">{text}</Link>
            })}
        </span>
      </p>
      <div className="">
        <div className="min-h-screen w-full  bg-stone-900">
          <div className="mx-auto max-w-screen-md sm:py-10">
            <Search
              assets={assets.map((asset) => ({ name: asset.name ?? "" }))}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-10rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <SignedInRegisterClaim />
    </div>
  );
}
