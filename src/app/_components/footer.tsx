const navigation = {
  solutions: [
    {
      name: "Adversary Proceeding",
      href: "https://restructuring.ra.kroll.com/FTX/Home-DownloadPDF?id1=MzA1NjA5Mg==&id2=-1",
    },
    {
      name: "Anthropic Objection",
      href: "https://restructuring.ra.kroll.com/FTX/Home-DownloadPDF?id1=MzA2Nzk0MA==&id2=-1",
    },
    {
      name: "Estimation Objection",
      href: "https://restructuring.ra.kroll.com/FTX/Home-DownloadPDF?id1=MzA2Nzk0MA==&id2=-1",
    },
    {
      name: "Letter to UCC",
      href: "https://ftx-cahc.notion.site/CAHC-Charter-ddcecf6857ba44cd970b3afc5ccc26ca",
    },
  ],
  support: [
    {
      name: "CAHC Bylaws",
      href: "https://file.notion.so/f/f/09d510f2-14cd-448e-b84f-fa371f5ebeb4/184051bb-3a10-4ec9-8d5d-b991adee7222/FTX_CAHC_-_Bylaws.pdf?id=606f80bb-5a69-422d-9d40-f1a55ad7d128&table=block&spaceId=09d510f2-14cd-448e-b84f-fa371f5ebeb4&expirationTimestamp=1709316000000&signature=i0WmXtQi0odkyfUq-r97-_DLNxCwypnX4_BV9WghORk&downloadName=FTX+CAHC+-+Bylaws.pdf",
    },
    {
      name: "CAHC Charter",
      href: "https://docs.google.com/document/d/1cw_ZWHNMM90IfGuOhDRQYl9PBSSV7pOdR4SfZhQZpG8/edit?usp=sharing",
    },
  ],
  company: [
    { name: "CAHC Telegram", href: "https://t.me/ftxcoalition" },
    {
      name: "CAHC Twitter",
      href: "https://x.com/sunil_trades/status/1763120860829716758?s=20",
    },
  ],
  legal: [
    {
      name: "Debtor's Plan",
      href: "https://restructuring.ra.kroll.com/FTX/Home-DownloadPDF?id1=MjYxMDM2Mw==&id2=-1",
    },
    {
      name: "Disclosure Statement",
      href: "https://restructuring.ra.kroll.com/FTX/Home-DownloadPDF?id1=MjYxMDM2NA==&id2=-1",
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-stone-950" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
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
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Court Filings
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Documents
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Links
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        target="_blank"
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Debtors Filings
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
