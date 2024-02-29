// const stats = [
//   { name: "Number of deploys", value: "405" },
//   { name: "Average deploy time", value: "3.65", unit: "mins" },
//   { name: "Number of servers", value: "3" },
//   { name: "Success rate", value: "98.5%" },
// ];

// export function CountStats() {
//   return (
//     <div className="bg-gray-900">
//       <div className="mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
//           {stats.map((stat) => (
//             <div
//               key={stat.name}
//               className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8"
//             >
//               <p className="text-sm font-medium leading-6 text-gray-400">
//                 {stat.name}
//               </p>
//               <p className="mt-2 flex items-baseline gap-x-2">
//                 <span className="text-4xl font-semibold tracking-tight text-white">
//                   {stat.value}
//                 </span>
//                 {stat.unit ? (
//                   <span className="text-sm text-gray-400">{stat.unit}</span>
//                 ) : null}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
const stats = [
  { name: "Creditors Joined", stat: "332" },
  { name: "Petition Date Claims", stat: "$101,434,943" },
];

export function CountStats() {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 grid-cols-2 gap-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white  bg-gradient-to-r from-indigo-100 px-4 py-5 shadow-lg sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
