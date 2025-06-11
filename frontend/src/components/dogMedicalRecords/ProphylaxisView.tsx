// // import Button from "../ui/button/Button";
// // import { PlusIcon } from "../../assets/icons";
// // import { useNavigate } from "react-router-dom";
// // import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";

// // const headers = ["Date", "Prophylactic Drug", "Remarks"];

// // export default function ProphylaxisView() {
// //   const navigate = useNavigate();
// //   const goToNewPage = () => {
// //     navigate("/create-prophylaxis");
// //   };

// //   const { prophylaxisRecords = [], isLoading, error } = useProphylaxis();

// //   return (
// //     <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
// //       {/* Header with Title and New Button */}
// //       <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
// //         <h2 className="text-2xl font-semibold tracking-wide">
// //           Prophylaxis List
// //         </h2>
// //         <Button
// //           size="sm"
// //           variant="primary"
// //           endIcon={<PlusIcon className="h-5 w-5" />}
// //           onClick={goToNewPage}
// //           className="transition-transform hover:scale-105"
// //         >
// //           New
// //         </Button>
// //       </div>

// //       {/* Table Container with horizontal scroll */}
// //       <div className="max-w-full overflow-x-auto px-6 py-6">
// //         <table className="w-full text-sm table-auto border-collapse">
// //           <thead className="bg-gray-100 dark:bg-gray-800">
// //             <tr>
// //               {headers.map((title) => (
// //                 <th
// //                   key={title}
// //                   className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
// //                 >
// //                   {title}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {prophylaxisRecords.map((item, index) => (
// //               <tr
// //                 key={index}
// //                 className={`transition-colors duration-200 ${
// //                   index % 2 === 0
// //                     ? "bg-white dark:bg-gray-900"
// //                     : "bg-gray-50 dark:bg-gray-800"
// //                 } hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer`}
// //               >
// //                 <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
// //                   {item.date}
// //                 </td>
// //                 <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
// //                   {item.prophylacticDrug}
// //                 </td>
// //                 <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
// //                   {item.remarks}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// import Button from "../ui/button/Button";
// import { PlusIcon } from "../../assets/icons";
// import { useNavigate } from "react-router-dom";
// import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";
// import { useEffect } from "react"; // Add this import

// const headers = ["Date", "Prophylactic Drug", "Remarks"];

// export default function ProphylaxisView() {
//   const navigate = useNavigate();
//   const goToNewPage = () => {
//     navigate("/create-prophylaxis");
//   };

//   const {
//     prophylaxisRecords = [],
//     isLoading,
//     error,
//     getAllProphylaxis // Add this from the hook
//   } = useProphylaxis();

//   // Add this useEffect to fetch data when component mounts
//   useEffect(() => {
//     getAllProphylaxis();
//   }, [getAllProphylaxis]);

//   // Add loading and error states
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 dark:text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-red-500 dark:text-red-400">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
//       {/* Header with Title and New Button */}
//       <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
//         <h2 className="text-2xl font-semibold tracking-wide">
//           Prophylaxis List
//         </h2>
//         <Button
//           size="sm"
//           variant="primary"
//           endIcon={<PlusIcon className="h-5 w-5" />}
//           onClick={goToNewPage}
//           className="transition-transform hover:scale-105"
//         >
//           New
//         </Button>
//       </div>

//       {/* Table Container with horizontal scroll */}
//       <div className="max-w-full overflow-x-auto px-6 py-6">
//         {prophylaxisRecords.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">
//             No prophylaxis records found.
//           </p>
//         ) : (
//           <table className="w-full text-sm table-auto border-collapse">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 {headers.map((title) => (
//                   <th
//                     key={title}
//                     className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
//                   >
//                     {title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {prophylaxisRecords.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={`transition-colors duration-200 ${
//                     index % 2 === 0
//                       ? "bg-white dark:bg-gray-900"
//                       : "bg-gray-50 dark:bg-gray-800"
//                   } hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer`}
//                 >
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.date}
//                   </td>
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.prophylacticDrug}
//                   </td>
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.remarks}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

/// adding edit, delete and view along with their icons

// import Button from "../ui/button/Button";
// import {
//   PlusIcon,
//   PencilIcon,
//   TrashBinIcon,
//   EyeIcon,
// } from "../../assets/icons";
// import { useNavigate } from "react-router-dom";
// import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";
// import { useEffect } from "react";
// import { Tooltip } from "@mui/material"; // Import Tooltip

// const headers = ["Date", "Prophylactic Drug", "Remarks", "Actions"]; // Added Actions header

// export default function ProphylaxisView() {
//   const navigate = useNavigate();
//   const goToNewPage = () => {
//     navigate("/create-prophylaxis");
//   };

//   const {
//     prophylaxisRecords = [],
//     isLoading,
//     error,
//     getAllProphylaxis,
//     deleteProphylaxis, // Assuming you have a delete function in your hook
//   } = useProphylaxis();

//   useEffect(() => {
//     getAllProphylaxis();
//   }, [getAllProphylaxis]);

//   const handleDelete = async (id: string) => {
//     // Confirm before delete
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       try {
//         await deleteProphylaxis(Number(id));
//         // Refresh the list after successful deletion
//         await getAllProphylaxis();
//       } catch (err) {
//         console.error("Failed to delete prophylaxis:", err);
//         alert("Failed to delete record.");
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 dark:text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-red-500 dark:text-red-400">Error: {error}</p>
//       </div>
//     );
//   }

//   // Show a simple alert with the dog's details for now.
//   function openViewModal(dog: any): void {
//     alert(
//       `Date: ${dog.date}\nProphylactic Drug: ${dog.prophylacticDrug}\nRemarks: ${dog.remarks}`
//     );
//   }

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
//       {/* Header with Title and New Button */}
//       <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
//         <h2 className="text-2xl font-semibold tracking-wide">
//           Prophylaxis List
//         </h2>
//         <Button
//           size="sm"
//           variant="primary"
//           endIcon={<PlusIcon className="h-5 w-5" />}
//           onClick={goToNewPage}
//           className="transition-transform hover:scale-105"
//         >
//           New
//         </Button>
//       </div>

//       {/* Table Container with horizontal scroll */}
//       <div className="max-w-full overflow-x-auto px-6 py-6">
//         {prophylaxisRecords.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">
//             No prophylaxis records found.
//           </p>
//         ) : (
//           <table className="w-full text-sm table-auto border-collapse">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 {headers.map((title) => (
//                   <th
//                     key={title}
//                     className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
//                   >
//                     {title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {prophylaxisRecords.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={`transition-colors duration-200 ${
//                     index % 2 === 0
//                       ? "bg-white dark:bg-gray-900"
//                       : "bg-gray-50 dark:bg-gray-800"
//                   } hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer`}
//                 >
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.date}
//                   </td>
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.prophylacticDrug}
//                   </td>
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     {item.remarks}
//                   </td>
//                   {/* Actions Column */}
//                   <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
//                     <div className="flex justify-center">
//                       {/* view Button */}
//                       <Tooltip title="View Prophylaxis">
//                         <button
//                           className="text-blue-500 mx-1 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           onClick={() => openViewModal(item)}
//                           aria-label="View Dog"
//                         >
//                           <EyeIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>
//                       {/* Edit Button */}
//                       <Tooltip title="Edit Prophylaxis">
//                         <button
//                           className="text-blue-500 mx-1 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           onClick={() =>
//                             navigate(`/edit-prophylaxis/${item.id}`)
//                           } // Assuming you have an edit route
//                           aria-label="Edit Prophylaxis"
//                         >
//                           <PencilIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>

//                       {/* Delete Button */}
//                       <Tooltip title="Delete Prophylaxis">
//                         <button
//                           className="text-red-500 mx-1 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
//                           onClick={() => handleDelete(String(item.id))}
//                           aria-label="Delete Prophylaxis"
//                         >
//                           <TrashBinIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

//appealing UI with hover effects, tooltips, and responsive design

// import React, { useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { Tooltip } from "@mui/material";
// import Button from "../ui/button/Button";
// import {
//   PlusIcon,
//   PencilIcon,
//   TrashBinIcon,
//   EyeIcon,
// } from "../../assets/icons";
// import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";

// // Define a type for the prophylaxis record
// interface ProphylaxisRecord {
//   id: number;
//   date: string;
//   prophylacticDrug: string;
//   remarks: string;
// }

// const headers = ["Date", "Prophylactic Drug", "Remarks", "Actions"];

// export default function ProphylaxisView() {
//   const navigate = useNavigate();
//   const {
//     prophylaxisRecords = [],
//     isLoading,
//     error,
//     getAllProphylaxis,
//     deleteProphylaxis,
//   } = useProphylaxis();

//   // Use useCallback to memoize the goToNewPage function
//   const goToNewPage = useCallback(() => {
//     navigate("/create-prophylaxis");
//   }, [navigate]);

//   // Use useCallback to memoize the handleDelete function
//   const handleDelete = useCallback(
//     async (id: number) => {
//       const confirmed = window.confirm(
//         "Are you sure you want to delete this record?"
//       );
//       if (!confirmed) return;

//       try {
//         await deleteProphylaxis(id);
//         // Refresh the list after successful deletion
//         await getAllProphylaxis();
//       } catch (err: any) {
//         console.error("Failed to delete prophylaxis:", err);
//         alert("Failed to delete record.");
//       }
//     },
//     [deleteProphylaxis, getAllProphylaxis]
//   );

//   // Use useCallback to memoize the openViewModal function
//   const openViewModal = useCallback((record: ProphylaxisRecord): void => {
//     alert(
//       `Date: ${record.date}\nProphylactic Drug: ${record.prophylacticDrug}\nRemarks: ${record.remarks}`
//     );
//   }, []);

//   useEffect(() => {
//     getAllProphylaxis();
//   }, [getAllProphylaxis]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 dark:text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-red-500 dark:text-red-400">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
//       {/* Header with Title and New Button */}
//       <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
//         <h2 className="text-2xl font-semibold tracking-wide">
//           Prophylaxis List
//         </h2>
//         <Button
//           size="sm"
//           variant="primary"
//           endIcon={<PlusIcon className="h-5 w-5" />}
//           onClick={goToNewPage}
//           className="transition-transform hover:scale-105"
//         >
//           New
//         </Button>
//       </div>

//       {/* Table Container */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//           <thead className="bg-gray-50 dark:bg-gray-800">
//             <tr>
//               {headers.map((header) => (
//                 <th
//                   key={header}
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
//             {prophylaxisRecords.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={headers.length}
//                   className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400"
//                 >
//                   No prophylaxis records found.
//                 </td>
//               </tr>
//             ) : (
//               prophylaxisRecords.map((record) => (
//                 <tr
//                   key={record.id}
//                   className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {record.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                     {record.prophylacticDrug}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                     {record.remarks}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-center">
//                       {/* View Button */}
//                       <Tooltip title="View Prophylaxis">
//                         <button
//                           className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                           onClick={() => openViewModal(record)}
//                           aria-label="View Prophylaxis"
//                         >
//                           <EyeIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>
//                       {/* Edit Button */}
//                       <Tooltip title="Edit Prophylaxis">
//                         <button
//                           className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
//                           onClick={() =>
//                             navigate(`/edit-prophylaxis/${record.id}`)
//                           }
//                           aria-label="Edit Prophylaxis"
//                         >
//                           <PencilIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>
//                       {/* Delete Button */}
//                       <Tooltip title="Delete Prophylaxis">
//                         <button
//                           className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
//                           onClick={() => handleDelete(record.id)}
//                           aria-label="Delete Prophylaxis"
//                         >
//                           <TrashBinIcon className="h-5 w-5" />
//                         </button>
//                       </Tooltip>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// apply delete, edit and view functionality

// ProphylaxisView.tsx
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Button from "../ui/button/Button";
import {
  PlusIcon,
  PencilIcon,
  TrashBinIcon,
  EyeIcon,
} from "../../assets/icons";
import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";

// Define a type for the prophylaxis record
interface ProphylaxisRecord {
  id: number;
  date: string;
  prophylacticDrug: string;
  remarks: string;
}

const headers = ["Date", "Prophylactic Drug", "Remarks", "Actions"];

export default function ProphylaxisView() {
  const navigate = useNavigate();
  const {
    prophylaxisRecords = [],
    isLoading,
    error,
    getAllProphylaxis,
    deleteProphylaxis,
    updateProphylaxis, // Add updateProphylaxis from the hook
  } = useProphylaxis();

  // Use useCallback to memoize the goToNewPage function
  const goToNewPage = useCallback(() => {
    navigate("/create-prophylaxis");
  }, [navigate]);

  // Use useCallback to memoize the handleDelete function
  const handleDelete = useCallback(
    async (id: number) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (!confirmed) return;

      try {
        await deleteProphylaxis(id);
        // Refresh the list after successful deletion
        await getAllProphylaxis(); // This is now handled in the hook
      } catch (err: any) {
        console.error("Failed to delete prophylaxis:", err);
        alert("Failed to delete record.");
      }
    },
    [deleteProphylaxis]
  );

  // Use useCallback to memoize the openViewModal function
  const openViewModal = useCallback((record: ProphylaxisRecord): void => {
    alert(
      `Date: ${record.date}\nProphylactic Drug: ${record.prophylacticDrug}\nRemarks: ${record.remarks}`
    );
  }, []);

  // Function to handle edit
  const handleEdit = useCallback(
    (record: ProphylaxisRecord) => {
      navigate(`/edit-prophylaxis-records/${record.id}`);
    },
    [navigate]
  );

  useEffect(() => {
    getAllProphylaxis();
  }, [getAllProphylaxis]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Header with Title and New Button */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">
          Prophylaxis List
        </h2>
        <Button
          size="sm"
          variant="primary"
          endIcon={<PlusIcon className="h-5 w-5" />}
          onClick={goToNewPage}
          className="transition-transform hover:scale-105"
        >
          New
        </Button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {prophylaxisRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No prophylaxis records found.
                </td>
              </tr>
            ) : (
              prophylaxisRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.prophylacticDrug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.remarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center">
                      {/* View Button */}
                      <Tooltip title="View Prophylaxis">
                        <button
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => openViewModal(record)}
                          aria-label="View Prophylaxis"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      {/* Edit Button */}
                      <Tooltip title="Edit Prophylaxis">
                        <button
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => handleEdit(record)} // Use handleEdit
                          aria-label="Edit Prophylaxis"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      {/* Delete Button */}
                      <Tooltip title="Delete Prophylaxis">
                        <button
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                          onClick={() => handleDelete(record.id)}
                          aria-label="Delete Prophylaxis"
                        >
                          <TrashBinIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
