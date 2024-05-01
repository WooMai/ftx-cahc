import "@/styles/globals.css";
import { CSPostHogProvider } from "./providers";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Footer } from "@/app/[locale]/_components/footer";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "FTX Customer Ad-Hoc Committee",
  description:
    "Ad-hoc committee fighting for better recovery for FTX customers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "#6365f1" },
          signIn: {
            elements: {
              footer: "hidden",
              formFieldInput:
                "rounded-md bg-stone-700 border-stone-600 shadow-inner shadow-lg shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500",
            },
          },
        }}
      >
        <html lang={locale} className="dark h-full bg-stone-950">
          <CSPostHogProvider>
            <body className={`h-full font-sans ${inter.variable}`}>
              <TRPCReactProvider>{children}</TRPCReactProvider>
              <div>
                <Footer />
              </div>
              <div id="modal-root" />
            </body>
          </CSPostHogProvider>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
