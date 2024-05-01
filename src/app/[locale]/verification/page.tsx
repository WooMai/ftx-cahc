import { TopNavHome } from "@/app/[locale]/_components/top-nav-home";
import { EmailVerification } from "./_components/email-verification";

export default async function Verification() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-stone-950">
      <TopNavHome />
      <EmailVerification />
    </div>
  );
}
