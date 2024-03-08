"use client";
import { Children, Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChartPieIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@/components/link";
import { TopNavHome } from "@/app/_components/top-nav-home";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { PgDateString } from "drizzle-orm/pg-core";

const teams = [
  {
    id: 1,
    name: "Telegram",
    href: "https://t.me/ftxcoalition",
    current: false,
  },
  {
    id: 2,
    name: "Twitter",
    href: "https://twitter.com/ftxcoalition",
    initial: "T",
    current: false,
  },
];

const dates = [
  {
    YYYYMMDD: "2024-03-01",
    dayMonthDate: "Mar 1",
    description: "Disclosure Statement Due (Blown)",
  },
  {
    YYYYMMDD: "2024-03-19",
    dayMonthDate: "Mar 19",
    description: "Omnibus Hearing",
    easternTime: "13:00 ET",
    cal: "https://restructuring.ra.kroll.com/FTX/Home-AddToCalendar?StartDate=04/18/2024%201:00:00%20PM&desc=Omnibus%20Hearing",
  },
  {
    YYYYMMDD: "2024-03-28",
    dayMonthDate: "Mar 28",
    description: "SBF Sentencing",
    easternTime: "13:00 ET",
  },
  {
    YYYYMMDD: "2024-05-15",
    dayMonthDate: "Mar 30",
    description: "Disclosure Statement Confirmation Hearing (Blown)",
  },
  {
    YYYYMMDD: "2024-04-18",
    dayMonthDate: "Apr 18",
    description: "Omnibus Hearing",
    easternTime: "13:00 ET",
    cal: "https://restructuring.ra.kroll.com/FTX/Home-AddToCalendar?StartDate=04/18/2024%201:00:00%20PM&desc=Omnibus%20Hearing",
  },
  {
    YYYYMMDD: "2024-05-12",
    dayMonthDate: "May 12",
    description: "Debtor Exclusivity Expires",
  },
  {
    YYYYMMDD: "2024-05-15",
    dayMonthDate: "May 15",
    description: "Omnibus Hearing",
    easternTime: "13:00 ET",
  },

  {
    YYYYMMDD: "2024-05-15",
    dayMonthDate: "May 15",
    description: "Bahamas Bar Date",
  },
  {
    YYYYMMDD: "2024-07-01",
    dayMonthDate: "Jul 1",
    description: "Plan Vote Deadline (Blown)",
  },
  {
    YYYYMMDD: "2024-07-12",
    dayMonthDate: "Jul 12",
    description: "Solicitation exlcusivity expires",
  },
];
function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navigation = [
    {
      name: "My Claim",
      href: "/dashboard",
      icon: HomeIcon,
      current: pathname.endsWith("/dashboard"),
    },
    {
      name: "Find Claim",
      href: "/dashboard/find-claims",
      icon: MagnifyingGlassIcon,
      current: pathname.endsWith("/dashboard/find-claims"),
    },
    // { name: "Objections", href: "#", icon: MegaphoneIcon, current: false },
    {
      name: "Victim Impact Statement",
      href: "/dashboard/victim-impact-statement",
      icon: EnvelopeIcon,
      current: pathname.endsWith("/dashboard/victim-impact-statement"),
    },
    // { name: "Court Calendar", href: "#", icon: CalendarIcon, current: false },
    // { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
    {
      name: "Recovery Analysis",
      href: "/dashboard/analysis",
      icon: ChartPieIcon,
      current: pathname.endsWith("/dashboard/analysis"),
    },
  ];
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-stone-950/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-stone-950 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">FTX CAHC</span>
                        <svg
                          width="50px"
                          height="50px"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M579.3 245c-27.6-18.8-47.5-38.7-60.1-53.2-12.6 14.5-32.6 34.3-60.3 53.2-51.7 35.2-110.9 54.6-176.4 57.9v232.9c0 8.5 1.1 18.4 3.4 29.4 0 0 28.5 179.4 233.3 272.1 0 0 148.7-56.3 214-214 15.2-34.7 22.4-65.8 22.4-87.5V302.9c-65.5-3.3-124.7-22.7-176.3-57.9z"
                            fill="rgba(99, 102, 241, 0.2)"
                          />

                          <path
                            d="M519.1 837.3c-80.4-34.8-138.6-91.1-177.2-147.5-20.9-7-41-14.5-60.2-22.2 8.1 15.2 17.2 30.4 27.3 45 35.7 51.9 99.7 122.6 201.8 164.5 2.7 1.1 5.5 1.7 8.3 1.7 2.8 0 5.6-0.5 8.3-1.6 74.3-30.6 128.4-76.3 166.1-119-16.7-0.8-33.9-2.1-51.4-3.8-33.1 32.4-73.9 61.7-123 82.9zM891.3 553.2c-7.4-6.6-15.9-13.3-25.5-19.9-19.5-13.7-43.2-27.4-70.3-40.6V285.5c0-12.2-9.8-22.1-21.8-22.1-64.5-0.3-122.3-17.6-171.9-51.4-38.5-26.2-59.2-53.9-64.7-61.8-4.1-5.9-10.8-9.5-18-9.5-7.1 0-13.9 3.5-18 9.4-5.5 7.9-26.3 35.6-64.8 61.8-49.7 33.8-107.6 51.1-172 51.4-12 0.1-21.8 10-21.8 22.1V378c-12.4 0.8-24.1 1.9-35.1 3.4-24.7 3.3-45.7 8.3-62.8 14.9-29 11.3-45.9 27.1-50.3 47-4.2 19 3.6 39.4 23 60.8l0.1 0.1c0.4 0.4 0.7 0.8 1.1 1.2 18.1 19.4 45.5 39.2 81.5 58.9 2.4 1.3 4.9 2.7 7.4 4 13.4 7.1 27.8 14.1 42.9 20.8 4.4 16.6 10.6 33.9 18.3 51.4 17.8 7.7 36.6 15.1 56.3 22.2-10.6-18.4-19.2-36.5-25.8-53.5 55.3 21.1 117.9 39.7 183.8 54.3 74 16.4 146.4 26.4 211.1 29.5-10.1 14.5-21.4 28.9-34.1 42.9 17.1 1.4 33.8 2.4 49.9 2.9 7.2-9.1 13.6-17.9 19.3-26.2 4.2-6.1 8.2-12.3 12.1-18.6 13.9-0.1 27.2-0.5 40.1-1.4 33.5-2.2 61.9-6.9 84.6-14 5-1.6 9.7-3.2 14.1-5 8.7-3.5 16.3-7.5 22.7-11.8-3.3-5.6-7.5-11-12.1-16.1-6.6 4.4-14.9 8.3-24.7 11.7-21.7 7.6-50.9 12.9-85.9 15.2-8.7 0.6-17.7 1-27 1.2 26.8-48.8 42.6-99.1 42.6-138.1V515c28 14.2 51.8 28.8 70.3 43.1 4.4 3.4 8.4 6.7 12.2 10.1 16.3 14.5 34.8 35.8 30.6 55-0.7 3-1.9 5.8-3.6 8.6 5.1 5.5 9.4 11 12.8 16.4 5.2-6.3 8.6-13.2 10.3-20.7 5-23-7.4-48-36.9-74.3z m-681.7-6.6c-0.7-0.4-1.5-0.8-2.2-1.2-33.9-18.7-59.6-37.7-75.5-55.3-0.1 0-0.1 0.1-0.2 0.1-6.3-6.4-10.4-13.4-11.9-16.1-5.6-9.7-7.8-18.6-6-26.6 4.8-21.9 39-38.3 93.6-46 10.9-1.5 22.6-2.7 35.1-3.5v137.8c0 9 0.9 18.7 2.5 28.8-12.4-5.9-24.3-11.9-35.4-18z m546-10.8c0 31.7-15.5 83.9-48.8 137.7-66.4-2.3-142-12.4-219.5-29.6-71.3-15.8-138.6-36.2-196.6-59.5-5.5-18.8-8.2-35.5-8.2-48.6V302.9c65.5-3.3 124.7-22.7 176.4-57.9 27.7-18.8 47.6-38.7 60.3-53.2 12.6 14.5 32.5 34.3 60.1 53.2 51.6 35.2 110.8 54.6 176.3 57.9v232.9z"
                            fill="rgb(99, 102, 241)"
                          />
                        </svg>
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-stone-900 text-white"
                                      : "text-gray-400 hover:bg-stone-900 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Resources
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-stone-900 text-white"
                                      : "text-gray-400 hover:bg-stone-900 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                  )}
                                >
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                            <li key="sign-out">
                              <SignOutButton>
                                <a
                                  href="#"
                                  className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-400 hover:bg-stone-800 hover:text-red-400"
                                >
                                  <span className="truncate">Sign Out</span>
                                </a>
                              </SignOutButton>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-stone-950 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">FTX CAHC</span>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M579.3 245c-27.6-18.8-47.5-38.7-60.1-53.2-12.6 14.5-32.6 34.3-60.3 53.2-51.7 35.2-110.9 54.6-176.4 57.9v232.9c0 8.5 1.1 18.4 3.4 29.4 0 0 28.5 179.4 233.3 272.1 0 0 148.7-56.3 214-214 15.2-34.7 22.4-65.8 22.4-87.5V302.9c-65.5-3.3-124.7-22.7-176.3-57.9z"
                    fill="rgba(99, 102, 241, 0.2)"
                  />

                  <path
                    d="M519.1 837.3c-80.4-34.8-138.6-91.1-177.2-147.5-20.9-7-41-14.5-60.2-22.2 8.1 15.2 17.2 30.4 27.3 45 35.7 51.9 99.7 122.6 201.8 164.5 2.7 1.1 5.5 1.7 8.3 1.7 2.8 0 5.6-0.5 8.3-1.6 74.3-30.6 128.4-76.3 166.1-119-16.7-0.8-33.9-2.1-51.4-3.8-33.1 32.4-73.9 61.7-123 82.9zM891.3 553.2c-7.4-6.6-15.9-13.3-25.5-19.9-19.5-13.7-43.2-27.4-70.3-40.6V285.5c0-12.2-9.8-22.1-21.8-22.1-64.5-0.3-122.3-17.6-171.9-51.4-38.5-26.2-59.2-53.9-64.7-61.8-4.1-5.9-10.8-9.5-18-9.5-7.1 0-13.9 3.5-18 9.4-5.5 7.9-26.3 35.6-64.8 61.8-49.7 33.8-107.6 51.1-172 51.4-12 0.1-21.8 10-21.8 22.1V378c-12.4 0.8-24.1 1.9-35.1 3.4-24.7 3.3-45.7 8.3-62.8 14.9-29 11.3-45.9 27.1-50.3 47-4.2 19 3.6 39.4 23 60.8l0.1 0.1c0.4 0.4 0.7 0.8 1.1 1.2 18.1 19.4 45.5 39.2 81.5 58.9 2.4 1.3 4.9 2.7 7.4 4 13.4 7.1 27.8 14.1 42.9 20.8 4.4 16.6 10.6 33.9 18.3 51.4 17.8 7.7 36.6 15.1 56.3 22.2-10.6-18.4-19.2-36.5-25.8-53.5 55.3 21.1 117.9 39.7 183.8 54.3 74 16.4 146.4 26.4 211.1 29.5-10.1 14.5-21.4 28.9-34.1 42.9 17.1 1.4 33.8 2.4 49.9 2.9 7.2-9.1 13.6-17.9 19.3-26.2 4.2-6.1 8.2-12.3 12.1-18.6 13.9-0.1 27.2-0.5 40.1-1.4 33.5-2.2 61.9-6.9 84.6-14 5-1.6 9.7-3.2 14.1-5 8.7-3.5 16.3-7.5 22.7-11.8-3.3-5.6-7.5-11-12.1-16.1-6.6 4.4-14.9 8.3-24.7 11.7-21.7 7.6-50.9 12.9-85.9 15.2-8.7 0.6-17.7 1-27 1.2 26.8-48.8 42.6-99.1 42.6-138.1V515c28 14.2 51.8 28.8 70.3 43.1 4.4 3.4 8.4 6.7 12.2 10.1 16.3 14.5 34.8 35.8 30.6 55-0.7 3-1.9 5.8-3.6 8.6 5.1 5.5 9.4 11 12.8 16.4 5.2-6.3 8.6-13.2 10.3-20.7 5-23-7.4-48-36.9-74.3z m-681.7-6.6c-0.7-0.4-1.5-0.8-2.2-1.2-33.9-18.7-59.6-37.7-75.5-55.3-0.1 0-0.1 0.1-0.2 0.1-6.3-6.4-10.4-13.4-11.9-16.1-5.6-9.7-7.8-18.6-6-26.6 4.8-21.9 39-38.3 93.6-46 10.9-1.5 22.6-2.7 35.1-3.5v137.8c0 9 0.9 18.7 2.5 28.8-12.4-5.9-24.3-11.9-35.4-18z m546-10.8c0 31.7-15.5 83.9-48.8 137.7-66.4-2.3-142-12.4-219.5-29.6-71.3-15.8-138.6-36.2-196.6-59.5-5.5-18.8-8.2-35.5-8.2-48.6V302.9c65.5-3.3 124.7-22.7 176.4-57.9 27.7-18.8 47.6-38.7 60.3-53.2 12.6 14.5 32.5 34.3 60.1 53.2 51.6 35.2 110.8 54.6 176.3 57.9v232.9z"
                    fill="rgb(99, 102, 241)"
                  />
                </svg>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-stone-800 text-white"
                              : "text-gray-400 hover:bg-stone-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    {" "}
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-stone-800 text-white"
                              : "text-gray-400 hover:bg-stone-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                    <li key="sign-out">
                      <SignOutButton>
                        <a
                          href="#"
                          className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-400 hover:bg-stone-800 hover:text-red-400"
                        >
                          <span className="truncate">Sign Out</span>
                        </a>
                      </SignOutButton>
                    </li>
                  </ul>
                </li>
                {/* <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-stone-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-stone-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-10 flex items-center gap-x-6 bg-stone-950 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
            Dashboard
          </div>

          <UserButton />
        </div>
        <main className="bg-stone-900 lg:pl-72">
          <div className="xl:pr-96">
            <div className="min-h-screen border-l border-l-stone-800">
              <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-10 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto max-w-3xl">{children}</div>
              </div>
            </div>
          </div>
        </main>
        {/* <main className="bg-stone-900 pb-10 lg:pl-72">
          <div className="min-h-screen border-l border-l-stone-800 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main> */}
        <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-stone-800 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <section className="mt-12">
            <h2 className="text-base font-semibold leading-6 text-stone-300">
              Important dates
            </h2>
            <ol className="mt-2 divide-y divide-stone-800 text-sm leading-6 text-stone-500">
              {dates.map((date, index) => (
                <li key={index} className="py-4 sm:flex">
                  <time
                    dateTime={date.YYYYMMDD}
                    className={classNames(
                      date.easternTime ? "text-white" : "text-stone-600",
                      "w-28 flex-none",
                    )}
                  >
                    {date.dayMonthDate}
                  </time>
                  <p
                    className={classNames(
                      date.easternTime ? "text-white" : "text-stone-600",
                      "mt-2 flex-auto sm:mt-0",
                    )}
                  >
                    {date.description}
                  </p>
                  {date.easternTime && (
                    <p
                      className={classNames(
                        date.easternTime ? "text-white" : "text-stone-600",
                        "flex-none sm:ml-6",
                      )}
                    >
                      <time dateTime={`${date.YYYYMMDD}T${date.easternTime}`}>
                        {date.easternTime}
                      </time>
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </>
  );
}
