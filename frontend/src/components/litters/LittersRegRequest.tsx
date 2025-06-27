// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table/index";
// import Badge from "../ui/badge/Badge";
// import { TrashBinIcon, EyeIcon, PlusIcon, TagIcon } from "../../assets/icons";
// import Button from "../ui/button/Button";
// import { useNavigate } from "react-router";
// import { Tooltip } from "@mui/material";
// import { useFetchLitterRegistration } from "../dogsCategory/hooks/useLitterRegistration";
// import { formatDate } from "../../utils/utils";
// import { RegistrationViewModal } from "../ui/modal/dogModals/registerViewModal";

// const ITEMS_PER_PAGE = 5;

// export default function LitterRegRequests() {
//   const [filters, setFilters] = useState({
//     id: "",
//     dob: "",
//     name: "",
//     sex: "",
//     sire: "",
//     dam: "",
//     created: "",
//     status: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewRegistration, setViewRegistration] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//   const openViewModal = (dog: any) => {
//     setViewRegistration(dog);
//     setIsViewModalOpen(true);
//   };

//   const closeViewModal = () => {
//     setIsViewModalOpen(false);
//     setViewRegistration(null);
//   };
//   const handleFilterChange = (key: string, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setCurrentPage(1); // Reset pagination on filter change
//   };

//   const { litterRegistration, setSelectedLitterRegistration } = useFetchLitterRegistration(); // ✅ Using the hook
//   //   const { litter, loading, error, setSelectedLitter } = useFetchLitterInspection(); // ✅ Using the hook

//   const filteredData = litterRegistration.filter((order) =>
//     Object.keys(filters).every((key) => {
//       const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
//       if (!filterValue) return true;

//       let fieldValue = "";

//       switch (key) {
//         case "id":
//           fieldValue = order?.id?.toString().toLowerCase();
//           break;
//         case "dob":
//           fieldValue = formatDate(order?.litter?.dob).toLowerCase();
//           break;
//         case "name":
//           fieldValue = order?.name?.toLowerCase();
//           break;
//         case "sex":
//           fieldValue = order?.sex?.toLowerCase();
//           break;
//         case "sire":
//           fieldValue = order?.litter?.sire?.dogName?.toLowerCase();
//           break;
//         case "dam":
//           fieldValue = order?.litter?.dam?.dogName?.toLowerCase();
//           break;
//         case "created":
//           fieldValue = formatDate(order?.createdAt).toLowerCase();
//           break;
//         case "status":
//           fieldValue = order?.status?.toLowerCase();
//           break;
//         default:
//           fieldValue = "";
//       }

//       return fieldValue.includes(filterValue);
//     })
//   );
//   // Pagination Logic
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );
//   const navigate = useNavigate();


//   const goToNewPage = () => {
//     navigate("/litter-registration"); // Change the path accordingly
//   };

//   // assign microchip
//   const assignMicrochip = (selectedLitter: any) => {
//     navigate("/assign-microchip"); // Change the path accordingly
//     setSelectedLitterRegistration(selectedLitter);

//   }
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white">
//       <div className="flex justify-between items-center mb-6 p-5">
//         <h2 className="text-xl font-semibold"> Registration Requests</h2>
//         <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2" onClick={goToNewPage}> <PlusIcon className="w-4 h-5 text-white" /> New</Button>
//       </div>
//       <div className="max-w-full overflow-x-auto">
//         <Table>
//           <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//             <TableRow>

//               {[
//                 { label: "S.No", key: "" },
//                 { label: "DOB", key: "dob" },
//                 { label: "ACC NO", key: "kp" },
//                 { label: "DOG NAME", key: "name" },
//                 { label: "Gender", key: "sex" },
//                 { label: "SIRE", key: "sire" },
//                 { label: "DAM", key: "dam" },
//                 { label: "CREATED", key: "created" },
//                 { label: "STATUS", key: "status" },
//                 { label: "ACTIONS", key: "" },
//               ].map(({ label, key }, idx) => (
//                 <TableCell key={idx} isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
//                   {label}
//                   {key && (
//                     <input
//                       type="text"
//                       placeholder={`Search ${label}`}
//                       onChange={(e) => handleFilterChange(key, e.target.value)}
//                       className="mt-1 w-full border rounded-md p-1 text-sm"
//                     />
//                   )}
//                 </TableCell>
//               ))}
//               {/* {["S.No", "DOB", " DOG NAME", "Gender", "SIRE", "DAM", "CREATED", "STATUS", "ACTIONS"].map((header, idx) => (
//                                 <TableCell key={idx} isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
//                                     {header}
//                                     {header !== "ACTIONS" && (
//                                         <input
//                                             type="text"
//                                             placeholder={`Search ${header}`}
//                                             onChange={(e) => handleFilterChange(header.replace(" ", "").toLowerCase(), e.target.value)}
//                                             className="mt-1 w-full border rounded-md p-1 text-sm"
//                                         />
//                                     )}
//                                 </TableCell>
//                             ))} */}
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {paginatedData.map((order, index) => (
//               <TableRow key={order?.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
//                 <TableCell className="px-5 py-4 text-start">{index + 1}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{formatDate(order?.litter?.dob)}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{order?.KP}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{order?.name}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{order?.sex}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{order?.litter?.sire?.dogName}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">{order?.litter?.dam?.dogName}</TableCell>
//                 <TableCell className="px-5 py-4 text-start">  {formatDate(order?.createdAt)}</TableCell>
//                 <TableCell className="px-4 py-3 text-start">
//                   <Badge
//                     size="sm"
//                     color={order?.status === "Active" ? "success" : order?.status === "Pending" ? "warning" : order.status === "Completed" ? "success" : "error"}
//                   >
//                     {order?.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 text-start">
//                   <Tooltip title="">
//                     <button className="text-blue-500 mx-1" onClick={() => openViewModal(order)}><EyeIcon /></button>
//                   </Tooltip>
//                   {/* <button className="text-blue-500 mx-1"><PencilIcon /></button> */}
//                   <Tooltip title="Assign Microchip">
//                     <button className="text-blue-500 mx-1" onClick={() => assignMicrochip(order)}><TagIcon /></button>
//                   </Tooltip>
//                   <Tooltip title="Remove">
//                     <button className="text-red-500 mx-1"><TrashBinIcon /></button>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination Controls */}
//         <div className="flex justify-between items-center p-4">
//           <button
//             className="px-3 py-1 border rounded-md disabled:opacity-50"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             Previous
//           </button>
//           <span>Page {currentPage} of {totalPages}</span>
//           <button
//             className="px-3 py-1 border rounded-md disabled:opacity-50"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       <RegistrationViewModal
//         isOpen={isViewModalOpen}
//         onClose={closeViewModal}
//         dog={viewRegistration}
//       />
//     </div>
//   );
// }
