// import { useRef, useEffect } from "react";


// interface InspectionViewModalProps {
//     isOpen: boolean;
//     className?: string;
//     onClose: () => void;
//     showCloseButton?: boolean;
//     isFullscreen?: boolean;
//     inspectionData: {
//         sire: string;
//         dam: string;
//         matingDate: string;
//         whelpingDate: string;
//         status: string;
//         puppiesBorn: number;
//         malePuppies: number;
//         femalePuppies: number;
//         expiredPuppies: number;
//         puppiesCondition: string;
//         damCondition: string;
//         uniformitySize: string;
//         specialRecommendation: string;
//         specialFeatures: string;
//         images: string[];
//     };
// }

// export const InspectionViewModal: React.FC<InspectionViewModalProps> = ({
//     isOpen,
//     onClose,
//     className,
//     showCloseButton = true,
//     isFullscreen = false,
//     inspectionData,
// }) => {
//     const modalRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleEscape = (event: KeyboardEvent) => {
//             if (event.key === "Escape") {
//                 onClose();
//             }
//         };

//         if (isOpen) {
//             document.addEventListener("keydown", handleEscape);
//         }

//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//         };
//     }, [isOpen, onClose]);

//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "unset";
//         }

//         return () => {
//             document.body.style.overflow = "unset";
//         };
//     }, [isOpen]);

//     if (!isOpen) return null;

//     const contentClasses = isFullscreen
//         ? "w-full h-full"
//         : "relative w-full rounded-3xl bg-white  dark:bg-gray-900";



//     return (
//         <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
//             {!isFullscreen && (
//                 <div
//                     className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
//                     onClick={onClose}
//                 ></div>
//             )}
//             <div
//                 ref={modalRef}
//                 className={`${contentClasses}  ${className}`}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {showCloseButton && (
//                     <button
//                         onClick={onClose}
//                         className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
//                     >
//                         <svg
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
//                                 fill="currentColor"
//                             />
//                         </svg>
//                     </button>
//                 )}
//                 <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
//                     <div className="px-2 pr-14">
//                         <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//                             Litter Inspection
//                         </h4>
//                         <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
//                             Litter Parent
//                         </p>
//                     </div>

//                     {/* Parent Details */}
//                     <div className="grid grid-cols-2 gap-10 xl:grid-cols-2 overflow-y-auto custom-scrollbar flex">
//                         <div className="space-y-6">
//                             <div><strong>Sire:</strong> <span className="text-blue-600">{inspectionData.sire}</span></div>
//                         </div>
//                         <div className="space-y-6">
//                             <div><strong>Dam:</strong> <span className="text-blue-600">{inspectionData.dam}</span></div>

//                         </div>
//                     </div>

//                     {/* Mating & Whelping Dates */}
//                     <div className="grid grid-cols-2 gap-10 xl:grid-cols-2 overflow-y-auto custom-scrollbar flex mt-5">
//                         <div className="space-y-6">
//                             <div><strong>Mating Date:</strong> {inspectionData.matingDate}</div>
//                         </div>
//                         <div className="space-y-6">
//                             <div><strong>Litters Whelping Date:</strong> {inspectionData.whelpingDate}</div>

//                         </div>
//                     </div>

//                     {/* Inspection Table */}
//                     <table className="w-full border border-gray-300 text-sm mt-5">
//                         <thead className="bg-gray-200 dark:bg-gray-800">
//                             <tr>
//                                 {[
//                                     "Status",
//                                     "Puppies Born",
//                                     "Male Puppies",
//                                     "Female Puppies",
//                                     "Expired Puppies",
//                                     "Puppies Condition",
//                                     "Dam Condition",
//                                     "Uniformity Size",
//                                     "Special Recommendation",
//                                     "Special Features"
//                                 ].map((header) => (
//                                     <th key={header} className="border border-gray-300 p-2 text-center dark:text-gray-200">{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr className="text-center">
//                                 <td className="border border-gray-300 p-2">
//                                     <span className={`px-2 py-1 rounded-lg ${inspectionData.status === "Approved" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
//                                         {inspectionData.status}
//                                     </span>
//                                 </td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.puppiesBorn}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.malePuppies}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.femalePuppies}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.expiredPuppies}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.puppiesCondition}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.damCondition}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.uniformitySize}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.specialRecommendation}</td>
//                                 <td className="border border-gray-300 p-2">{inspectionData.specialFeatures}</td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     {/* Litter Inspection Images Section */}
//                     {inspectionData.images.length > 0 && (
//                         <>
//                             <h3 className="mt-4 text-lg font-semibold text-center text-blue-600">Litter Inspection Image(s)</h3>
//                             <div className="flex gap-2 overflow-x-auto p-2">
//                                 {inspectionData.images.map((img, index) => (
//                                     <img key={index} src={img} alt={`Inspection ${index}`} className="h-32 rounded-md shadow-md" />
//                                 ))}
//                             </div>
//                         </>
//                     )}

//                     {/* Close Button */}
//                     <div className="text-center mt-4">
//                         <button
//                             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//                             onClick={onClose}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>

//         </div>

//     );
// };
