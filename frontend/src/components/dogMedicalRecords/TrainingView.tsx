import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { EyeIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../assets/icons"; // Optional: for New button
import { useNavigate } from "react-router-dom";
import { useTraining } from "../dogsCategory/hooks/useTraining";

// Dummy data – replace with API response or context state
export const performanceMetrics = [
  "Intelligence",
  "Willingness",
  "Energy",
  "Sensitivity",
  "Aggression",
] as const;

export type PerformanceMetric = typeof performanceMetrics[number];

export type Ratings = Record<PerformanceMetric, string>;

export interface TrainingRecord {
  id: number;
  trainerName: string;
  trainingCategory: string;
  trainingStartedOn: string;
  trainingCompletedOn: string;
  performance: string;
  intelligence: string;
  willingness: string;
  energy: string;
  sensitivity: string;
  ratings: Ratings;
}
export default function TrainingListView() {
  const navigate = useNavigate();
  const {
    trainingRecords,
    isLoading,
    error,
    getAllTraining,
  } = useTraining();

  // Fetch records on component mount
  useEffect(() => {
    getAllTraining();
  }, [getAllTraining]);

  const handleNew = () => {
    navigate("/create-training-record");
  };
  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">Training Records</h2>
        <Button
          size="sm"
          variant="primary"
          onClick={handleNew}
          endIcon={<PlusIcon className="h-5 w-5" />}
          className="transition-transform hover:scale-105"
        >
          New
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-6 py-6">
        {isLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Failed to load records</div>
        ) : trainingRecords.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">No training records found.</div>
        ) : (
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Trainer</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                {performanceMetrics.map((metric) => (
                  <th key={metric} className="px-4 py-3">
                    {metric}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>

              </tr>
            </thead>
            <tbody>
              {trainingRecords.map((record, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ${index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-blue-50 dark:hover:bg-blue-900`}
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainerName}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingCategory}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingStartedOn}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingCompleted}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.intelligence}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.willingness}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.energy}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.sensitivity}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.aggression}
                  </td>
  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        // onClick={() => handleView(record.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label={`View training record with ID ${record.id}`}
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        // onClick={() => handleEdit(record.id)}
                        className="text-green-500 hover:text-green-700"
                        aria-label={`Edit training record with ID ${record.id}`}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        // onClick={() => handleDelete(record.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete training record with ID ${record.id}`}
                      >
                        <TrashBinIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>

                  {/* {performanceMetrics.map((metric) => (
                  <td
                    key={metric}
                    className="px-4 py-3 text-gray-900 dark:text-gray-100"
                  >
                     {(record as TrainingRecord).ratings[metric] ?? "-"}

                  </td>
                ))} */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

//fetching training records from the API

// import { useEffect } from "react";
// import Button from "../ui/button/Button";
// import { PlusIcon } from "../../assets/icons";
// import { useNavigate } from "react-router-dom";
// import { useTraining } from "../dogsCategory/hooks/useTraining";
//  // adjust the path as needed

// const performanceMetrics = [
//   "Intelligence",
//   "Willingness",
//   "Energy",
//   "Sensitivity",
//   "Aggression",
// ] as const;


// export default function TrainingListView() {
//   const navigate = useNavigate();

//   // 1) Pull everything from your Zustand‐powered hook:
//   const {
//     trainingRecords,
//     isLoading,
//     error,
//     getAllTraining,
//   }: {
//     trainingRecords: any[];
//     isLoading: boolean;
//     error: unknown;
//     getAllTraining: () => void;
//   } = useTraining();

//   // 2) On first render, fetch the list:
//   useEffect(() => {
//     getAllTraining();
//   }, [getAllTraining]);

//   const handleNew = () => navigate("/create-training-record");

//   // 3) Helper: format an ISO date string to "YYYY-MM-DD"
//   const formatDate = (isoString: string | Date) => {
//     // If Date object, convert to ISO; if string, assume ISO
//     const date = typeof isoString === "string" ? new Date(isoString) : isoString;
//     return date.toISOString().split("T")[0];
//   };

//   // 4) Render loading / error if needed:
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <p className="text-gray-700 dark:text-gray-200">Loading training records...</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="p-6">
//         <p className="text-red-600 dark:text-red-400">
//           Failed to load training records: {typeof error === "string"
//             ? error
//             : (error && typeof error === "object" && "message" in error)
//             ? (error as { message?: string }).message
//             : "Unknown error"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md overflow-hidden transition-colors duration-300">
//       {/* Header */}
//       <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
//         <h2 className="text-2xl font-semibold tracking-wide">Training Records</h2>
//         <Button
//           size="sm"
//           variant="primary"
//           onClick={handleNew}
//           endIcon={<PlusIcon className="h-5 w-5" />}
//           className="transition-transform hover:scale-105"
//         >
//           New
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto px-6 py-6">
//         {trainingRecords.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-400">
//             No training records found.
//           </p>
//         ) : (
//           <table className="w-full table-auto border-collapse text-sm">
//             <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
//               <tr>
//                 <th className="px-4 py-3">Trainer</th>
//                 <th className="px-4 py-3">Category</th>
//                 <th className="px-4 py-3">Start</th>
//                 <th className="px-4 py-3">End</th>
//                 {performanceMetrics.map((metric) => (
//                   <th key={metric} className="px-4 py-3">
//                     {metric}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {trainingRecords.map((record, idx) => {
//                 return (
//                   <tr
//                     key={record.id}
//                     className={`transition-colors duration-200 ${
//                       idx % 2 === 0
//                         ? "bg-white dark:bg-gray-900"
//                         : "bg-gray-50 dark:bg-gray-800"
//                     } hover:bg-blue-50 dark:hover:bg-blue-900`}
//                   >
//                     {/* Trainer Name */}
//                     <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
//                       {record.trainerName}
//                     </td>

//                     {/* Category */}
//                     <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
//                       {record.trainingCategory}
//                     </td>

//                     {/* Start Date */}
//                     <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
//                       {formatDate(record.trainingStartedOn)}
//                     </td>

//                     {/* End Date */}
//                     <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
//                       {formatDate(record.trainingCompleted)}
//                     </td>

//                     {/* Metrics Columns */}
//                     {performanceMetrics.map((metric) => {
//                       // e.g. metric = "Intelligence" → key = "intelligence"
//                       const key = (metric.charAt(0).toLowerCase() +
//                         metric.slice(1)) as
//                         | "intelligence"
//                         | "willingness"
//                         | "energy"
//                         | "sensitivity"
//                         | "aggression";

//                       // Typescript will complain if record[key] isn't known—cast to string
//                       const value = (record as any)[key] as string | undefined;
//                       return (
//                         <td
//                           key={metric}
//                           className="px-4 py-3 text-gray-900 dark:text-gray-100"
//                         >
//                           {value ?? "-"}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
