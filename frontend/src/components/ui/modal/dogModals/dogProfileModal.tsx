// import { useRef, useEffect } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const contentClasses = isFullscreen
//     ? "w-full h-full"
//     : "relative w-full rounded-3xl bg-white dark:bg-gray-900";

//   const ImageUrl = `http://localhost:3000${dog?.friendlyUrl}`;
//   console.log("this is image url:", ImageUrl);
//   return (
//     <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
//       <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-400 mx-auto max-h-[90vh] overflow-y-auto p-6">
//         {!isFullscreen && (
//           <div
//             className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
//             onClick={onClose}
//           ></div>
//         )}
//         <div
//           ref={modalRef}
//           className={`${contentClasses} ${className}`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {showCloseButton && (
//             <button
//               onClick={onClose}
//               className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </button>
//           )}
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
//                 Dog Profile
//               </h4>
//             </div>

//             <div className="max-w-full overflow-x-auto text-gray-800 dark:text-white/90">
//               {dog && (
//                 <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
//                   <div className="flex items-center gap-6">
//                     <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
//                       <img
//                         src={ImageUrl}
//                         alt="Dog"
//                         className="w-24 h-24 rounded-full object-cover"
//                       />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                         {dog.dogName}{" "}
//                         <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
//                           ({dog.sex})
//                         </span>
//                       </h2>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         ACC No: {dog.KP}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         DOB:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog?.dob
//                           ? new Date(dog.dob).toLocaleDateString()
//                           : "N/A"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         Breed:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog?.breed?.breed || "N/A"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         Microchip:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog?.microchip?.chipId || "N/A"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         Color:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog.color || "N/A"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         Status:
//                       </span>
//                       <Badge
//                         size="sm"
//                         color={
//                           dog.status === "Active"
//                             ? "success"
//                             : dog.status === "Pending"
//                             ? "warning"
//                             : "error"
//                         }
//                       >
//                         {dog.status}
//                       </Badge>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         📍 Location:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog.location || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Additional Information */}
//               <div className="mt-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
//                     Additional Information
//                   </h4>
//                 </div>
//                 {dog?.achievements && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Achievements:
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.achievements || "N/A"}
//                     </span>
//                   </div>
//                 )}

//                 {dog?.virtuesAndFaults && (
//                   <div className="flex items-center gap-2 mt-4">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Virtues and Faults:
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.virtuesAndFaults || "N/A"}
//                     </span>
//                   </div>
//                 )}

//                 {dog?.breedingAdvice && (
//                   <div className="flex items-center gap-2 mt-4">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Breeding Advice:
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.breedingAdvice || "N/A"}
//                     </span>
//                   </div>
//                 )}

//                 {dog?.progenyTrainability && (
//                   <div className="flex items-center gap-2 mt-4">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       Progeny Trainability:
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.progenyTrainability || "N/A"}
//                     </span>
//                   </div>
//                 )}

//                 {dog?.HD && (
//                   <div className="flex items-center gap-2 mt-4">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       HD (Hip Dysplasia):
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.HD || "N/A"}
//                     </span>
//                   </div>
//                 )}

//                 {dog?.ED && (
//                   <div className="flex items-center gap-2 mt-4">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       ED (Elbow Dysplasia):
//                     </span>
//                     <span className="text-gray-800 dark:text-white">
//                       {dog.ED || "N/A"}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//shamim changes Gp

// import { useRef, useEffect } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen || !dog) return null;

//   const contentClasses = isFullscreen
//     ? "w-full h-full"
//     : "relative w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900";

//   const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6 sm:p-8 overflow-y-auto">
//       <div
//         ref={modalRef}
//         className={`${contentClasses} ${className} shadow-xl overflow-hidden`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Dog Profile
//           </h2>
//           {showCloseButton && (
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Content */}
//         <div className="overflow-y-auto max-h-[80vh] px-6 py-4">
//           {/* Top Info */}
//           <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
//             <div className="w-28 h-28 rounded-full overflow-hidden shadow">
//               <img
//                 src={imageUrl}
//                 alt={dog.dogName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {dog.dogName}{" "}
//                 <span className="text-gray-500 dark:text-gray-300">
//                   ({dog.sex})
//                 </span>
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 ACC No: {dog.KP}
//               </p>
//             </div>
//           </div>

//           {/* Info Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//             <Info
//               label="DOB"
//               value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"}
//             />
//             <Info label="Breed" value={dog.breed?.breed || "N/A"} />
//             <Info label="Microchip" value={dog.microchip?.chipId || "N/A"} />
//             <Info label="Color" value={dog.color || "N/A"} />
//             <div className="flex items-center gap-2">
//               <span className="text-gray-500 dark:text-gray-400">Status:</span>
//               <Badge
//                 size="sm"
//                 color={
//                   dog.status === "Active"
//                     ? "success"
//                     : dog.status === "Pending"
//                     ? "warning"
//                     : "error"
//                 }
//               >
//                 {dog.status}
//               </Badge>
//             </div>
//             <Info label="📍 Location" value={dog.location || "N/A"} />
//           </div>

//           {/* Additional Info */}
//           <div className="mt-8 space-y-4">
//             <Section title="Additional Information">
//               <Info label="Achievements" value={dog.achievements || "N/A"} />
//               <Info
//                 label="Virtues and Faults"
//                 value={dog.virtuesAndFaults || "N/A"}
//               />
//               <Info
//                 label="Breeding Advice"
//                 value={dog.breedingAdvice || "N/A"}
//               />
//               <Info
//                 label="Progeny Trainability"
//                 value={dog.progenyTrainability || "N/A"}
//               />
//               <Info label="HD (Hip Dysplasia)" value={dog.HD || "N/A"} />
//               <Info label="ED (Elbow Dysplasia)" value={dog.ED || "N/A"} />
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Info Display
// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex items-start gap-2">
//     <span className="text-gray-500 dark:text-gray-400 font-medium">
//       {label}:
//     </span>
//     <span className="text-gray-800 dark:text-white">{value}</span>
//   </div>
// );

// // Section Header Wrapper
// const Section = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div>
//     <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//       {title}
//     </h4>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

//final version

// import { useRef, useEffect } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen || !dog) return null;

//   const contentClasses = isFullscreen
//     ? "w-full h-full"
//     : "relative w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900";

//   const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6 sm:p-8 overflow-y-auto">
//       <div
//         ref={modalRef}
//         className={`${contentClasses} ${className} shadow-xl overflow-hidden`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dog Profile</h2>
//           {showCloseButton && (
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Content */}
//         <div className="overflow-y-auto max-h-[80vh] px-6 py-4">
//           {/* Top Info */}
//           <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
//             <div className="w-28 h-28 rounded-full overflow-hidden shadow">
//               <img
//                 src={imageUrl}
//                 alt={dog.dogName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {dog.dogName}{" "}
//                 <span className="text-gray-500 dark:text-gray-300">({dog.sex})</span>
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 ACC No: {dog.KP}
//               </p>
//             </div>
//           </div>

//           {/* Info Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//             <Info label="DOB" value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"} />
//             <Info label="Breed" value={dog.breed?.breed || "N/A"} />
//             <Info label="Microchip" value={dog.microchip?.chipId || "N/A"} />
//             <Info label="Color" value={dog.color || "N/A"} />
//             <div className="flex items-center gap-2">
//               <span className="text-gray-500 dark:text-gray-400">Status:</span>
//               <Badge
//                 size="sm"
//                 color={
//                   dog.status === "Active"
//                     ? "success"
//                     : dog.status === "Pending"
//                     ? "warning"
//                     : "error"
//                 }
//               >
//                 {dog.status}
//               </Badge>
//             </div>
//             <Info label="📍 Location" value={dog.location || "N/A"} />
//           </div>

//           {/* Additional Info */}
//           <div className="mt-8 space-y-4">
//             <Section title="Additional Information">
//               <Info label="Achievements" value={dog.achievements || "N/A"} />
//               <Info label="Virtues and Faults" value={dog.virtuesAndFaults || "N/A"} />
//               <Info label="Breeding Advice" value={dog.breedingAdvice || "N/A"} />
//               <Info label="Progeny Trainability" value={dog.progenyTrainability || "N/A"} />
//               <Info label="HD (Hip Dysplasia)" value={dog.HD || "N/A"} />
//               <Info label="ED (Elbow Dysplasia)" value={dog.ED || "N/A"} />
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Info Display
// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex items-start gap-2">
//     <span className="text-gray-500 dark:text-gray-400 font-medium">{label}:</span>
//     <span className="text-gray-800 dark:text-white">{value}</span>
//   </div>
// );

// // Section Header Wrapper
// const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div>
//     <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h4>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

//111
// import { useRef, useEffect, useState } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// const tabs = ["Overview", "Health", "Breeding"];

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [showImagePreview, setShowImagePreview] = useState(false);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         if (showImagePreview) {
//           setShowImagePreview(false);
//         } else {
//           onClose();
//         }
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose, showImagePreview]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen || !dog) return null;

//   const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

//   const contentClasses = isFullscreen
//     ? "w-full h-full"
//     : "relative w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl backdrop-blur-xl";

//   return (
//     <div
//       className="fixed inset-0 z-[99999] flex items-center justify-center px-4 py-6 sm:p-8 overflow-y-auto bg-black/30 backdrop-blur-md animate-fadeIn"
//       onClick={onClose}
//     >
//       <div
//         ref={modalRef}
//         onClick={(e) => e.stopPropagation()}
//         className={`${contentClasses} ${className} animate-slideUp transition-all duration-300`}
//         tabIndex={-1}
//       >
//         {/* Close Button */}
//         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dog Profile</h2>
//           {showCloseButton && (
//             <button
//               onClick={onClose}
//               aria-label="Close"
//               className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Lightbox Image */}
//         {showImagePreview && (
//           <div
//             className="fixed inset-0 z-[999999] bg-black/80 flex items-center justify-center"
//             onClick={() => setShowImagePreview(false)}
//           >
//             <img
//               src={imageUrl}
//               alt={dog.dogName}
//               className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
//             />
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="px-6 py-4 overflow-y-auto max-h-[80vh] text-gray-800 dark:text-white/90">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row gap-6 items-center mb-4">
//             <div
//               className="w-28 h-28 rounded-full overflow-hidden shadow ring-2 ring-gray-300 dark:ring-gray-700 cursor-pointer"
//               onClick={() => setShowImagePreview(true)}
//             >
//               <img
//                 src={imageUrl}
//                 alt={dog.dogName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 {dog.dogName}{" "}
//                 <span className="text-gray-500 dark:text-gray-400">({dog.sex})</span>
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">ACC No: {dog.KP}</p>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex space-x-4 mb-6 border-b border-gray-300 dark:border-gray-700">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-2 text-sm font-medium ${
//                   activeTab === tab
//                     ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
//                     : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           {activeTab === "Overview" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//               <Info label="DOB" value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"} />
//               <Info label="Breed" value={dog.breed?.breed || "N/A"} />
//               <Info label="Color" value={dog.color || "N/A"} />
//               <Info label="Location" value={dog.location || "N/A"} />
//               <Info label="Microchip" value={dog.microchip?.chipId || "N/A"} />
//               <div className="flex items-center gap-2">
//                 <span className="min-w-[130px] font-medium text-gray-500 dark:text-gray-400">
//                   Status:
//                 </span>
//                 <Badge
//                   size="sm"
//                   color={
//                     dog.status === "Active"
//                       ? "success"
//                       : dog.status === "Pending"
//                       ? "warning"
//                       : "error"
//                   }
//                 >
//                   {dog.status}
//                 </Badge>
//               </div>
//             </div>
//           )}

//           {activeTab === "Health" && (
//             <div className="space-y-3 text-sm">
//               <Info label="HD (Hip Dysplasia)" value={dog.HD || "N/A"} />
//               <Info label="ED (Elbow Dysplasia)" value={dog.ED || "N/A"} />
//             </div>
//           )}

//           {activeTab === "Breeding" && (
//             <div className="space-y-3 text-sm">
//               <Info label="Achievements" value={dog.achievements || "N/A"} />
//               <Info label="Virtues & Faults" value={dog.virtuesAndFaults || "N/A"} />
//               <Info label="Breeding Advice" value={dog.breedingAdvice || "N/A"} />
//               <Info label="Trainability" value={dog.progenyTrainability || "N/A"} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Small helper for Info rows
// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex items-start gap-2">
//     <span className="min-w-[130px] font-medium text-gray-500 dark:text-gray-400">{label}:</span>
//     <span className="text-gray-800 dark:text-white">{value}</span>
//   </div>
// );

{
  /*deepseek jani*/
}

// import React, { useRef, useState, useEffect } from "react";
// import type { ReactNode, JSX } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [showImage, setShowImage] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   // Keyboard and overflow handlers
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         if (showImage) setShowImage(false);
//         else onClose();
//       }
//     };

//     if (isOpen) document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [isOpen, onClose, showImage]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const handleImageClick = () => {
//     setShowImage(true);
//   };

//   if (!isOpen || !dog) return null;

//   const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

//   return (
//     <>
//       {/* Main Modal */}
//       <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
//         <div
//           className={`relative w-full max-w-4xl rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-hidden transform transition-all duration-300 ${className}`}
//           ref={modalRef}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header with gradient */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5"
//                   />
//                 </svg>
//                 Dog Profile
//               </h2>

//               {showCloseButton && (
//                 <button
//                   onClick={onClose}
//                   className="text-white/80 hover:text-white transition-transform transform hover:scale-110"
//                   aria-label="Close modal"
//                 >
//                   <svg
//                     className="w-7 h-7"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Profile section */}
//           <div className="overflow-y-auto max-h-[80vh] px-6 py-5">
//             <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
//               <div className="relative group">
//                 <div
//                   className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
//                   onClick={handleImageClick}
//                 >
//                   {!imageLoaded && (
//                     <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
//                       <svg
//                         className="w-12 h-12 text-gray-400"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                   <img
//                     src={imageUrl}
//                     alt={dog.dogName}
//                     className={`w-full h-full object-cover ${
//                       imageLoaded ? "block" : "hidden"
//                     }`}
//                     onLoad={() => setImageLoaded(true)}
//                   />
//                 </div>
//                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
//                   <Badge
//                     size="md"
//                     color={
//                       dog.status === "Active"
//                         ? "success"
//                         : dog.status === "Pending"
//                         ? "warning"
//                         : "error"
//                     }
//                   >
//                     {dog.status}
//                   </Badge>
//                 </div>
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                   <span className="bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full">
//                     View Photo
//                   </span>
//                 </div>
//               </div>

//               <div className="text-center sm:text-left">
//                 <div className="mb-1">
//                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white inline-block mr-2">
//                     {dog.dogName}
//                   </h1>
//                   <span className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
//                     ({dog.sex})
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
//                   <InfoPill label="ACC No" value={dog.KP} />
//                   <InfoPill label="Breed" value={dog.breed?.breed || "N/A"} />
//                   <InfoPill label="Location" value={dog.location || "N/A"} />
//                 </div>
//               </div>
//             </div>

//             {/* Information grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
//               <InfoCard
//                 label="Date of Birth"
//                 value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"}
//                 icon="calendar"
//               />
//               <InfoCard
//                 label="Microchip"
//                 value={dog.microchip?.chipId || "N/A"}
//                 icon="chip"
//               />
//               <InfoCard
//                 label="Color"
//                 value={dog.color || "N/A"}
//                 icon="palette"
//               />
//               <InfoCard
//                 label="HD (Hip Dysplasia)"
//                 value={dog.HD || "N/A"}
//                 icon="health"
//               />
//               <InfoCard
//                 label="ED (Elbow Dysplasia)"
//                 value={dog.ED || "N/A"}
//                 icon="health"
//               />
//             </div>

//             {/* Detailed information sections */}
//             <div className="space-y-6">
//               <Section title="Achievements">
//                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                   {dog.achievements || "No achievements recorded"}
//                 </p>
//               </Section>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Section title="Virtues & Faults">
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {dog.virtuesAndFaults || "N/A"}
//                   </p>
//                 </Section>

//                 <Section title="Breeding Advice">
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {dog.breedingAdvice || "N/A"}
//                   </p>
//                 </Section>
//               </div>

//               <Section title="Progeny Trainability">
//                 <p className="text-gray-700 dark:text-gray-300">
//                   {dog.progenyTrainability || "N/A"}
//                 </p>
//               </Section>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Image Preview Modal */}
//       {showImage && (
//         <div
//           className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
//           onClick={() => setShowImage(false)}
//         >
//           <button
//             className="absolute top-6 right-6 text-white/80 hover:text-white transition-transform transform hover:scale-110"
//             aria-label="Close preview"
//           >
//             <svg
//               className="w-10 h-10"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>

//           <div className="max-w-4xl w-full flex flex-col items-center">
//             <div className="text-white text-lg font-medium mb-4">
//               {dog.dogName}'s Photo
//             </div>
//             <div className="bg-gray-800 border-2 border-white/10 rounded-lg overflow-hidden shadow-2xl">
//               <img
//                 src={imageUrl}
//                 alt={`Full preview of ${dog.dogName}`}
//                 className="max-w-[90vw] max-h-[80vh] object-contain"
//                 onClick={(e) => e.stopPropagation()}
//               />
//             </div>
//             <div className="text-white/60 text-sm mt-4">
//               Click anywhere outside the image to close
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// // Info Card Component
// const InfoCard = ({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value: string;
//   icon: string;
// }) => {
//   const iconMap: Record<string, JSX.Element> = {
//     calendar: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//         />
//       </svg>
//     ),
//     chip: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
//         />
//       </svg>
//     ),
//     palette: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
//         />
//       </svg>
//     ),
//     health: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//         />
//       </svg>
//     ),
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start space-x-3 transition-all hover:shadow-md">
//       <div className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
//         {iconMap[icon] || iconMap.calendar}
//       </div>
//       <div>
//         <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
//         <div className="font-medium text-gray-900 dark:text-white">{value}</div>
//       </div>
//     </div>
//   );
// };

// // Info Pill Component
// const InfoPill = ({ label, value }: { label: string; value: string }) => (
//   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
//     <span className="font-semibold mr-1.5">{label}:</span> {value}
//   </span>
// );

// // Section Component
// const Section = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
//     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5 mr-2 text-indigo-600"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//       {title}
//     </h3>
//     {children}
//   </div>
// );
{
  /*grok jani*/
}
// import { useRef, useEffect } from "react";
// import Badge from "../../badge/Badge";
// import { Dog } from "../../../dogsCategory/types/dog";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: Dog | null;
// }

// export const DogDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   className,
//   onClose,
//   showCloseButton = true,
//   isFullscreen = false,
//   dog,
// }) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen || !dog) return null;

//   const contentClasses = isFullscreen
//     ? "w-full h-full"
//     : "relative w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-800 shadow-2xl";

//   const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

//   return (
//     <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-900/60 backdrop-blur-md px-4 py-6 sm:p-8 overflow-y-auto transition-opacity duration-300">
//       <div
//         ref={modalRef}
//         className={`${contentClasses} ${className} transform transition-all duration-300 scale-100 hover:scale-[1.01]`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
//           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
//             Dog Profile
//           </h2>
//           {showCloseButton && (
//             <button
//               onClick={onClose}
//               className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
//             >
//               <svg
//                 className="w-7 h-7"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Content */}
//         <div className="overflow-y-auto max-h-[85vh] px-8 py-6">
//           {/* Top Info */}
//           <div className="flex flex-col sm:flex-row gap-8 items-center mb-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-sm">
//             <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-blue-100 dark:ring-blue-900 transition-transform duration-300 hover:scale-105">
//               <img
//                 src={imageUrl}
//                 alt={dog.dogName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-center sm:text-left">
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
//                 {dog.dogName}{" "}
//                 <span className="text-gray-500 dark:text-gray-400 text-lg">({dog.sex})</span>
//               </h3>
//               <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
//                 ACC No: {dog.KP}
//               </p>
//             </div>
//           </div>

//           {/* Info Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//             <Info label="DOB" value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"} />
//             <Info label="Breed" value={dog.breed?.breed || "N/A"} />
//             <Info label="Microchip" value={dog.microchip?.chipId || "N/A"} />
//             <Info label="Color" value={dog.color || "N/A"} />
//             <div className="flex items-center gap-3">
//               <span className="text-gray-500 dark:text-gray-400 font-medium">Status:</span>
//               <Badge
//                 size="md"
//                 color={
//                   dog.status === "Active"
//                     ? "success"
//                     : dog.status === "Pending"
//                     ? "warning"
//                     : "error"
//                 }
//               >
//                 {dog.status}
//               </Badge>
//             </div>
//             <Info label="📍 Location" value={dog.location || "N/A"} />
//           </div>

//           {/* Additional Info */}
//           <div className="mt-10 space-y-6">
//             <Section title="Additional Information">
//               <Info label="Achievements" value={dog.achievements || "N/A"} />
//               <Info label="Virtues and Faults" value={dog.virtuesAndFaults || "N/A"} />
//               <Info label="Breeding Advice" value={dog.breedingAdvice || "N/A"} />
//               <Info label="Progeny Trainability" value={dog.progenyTrainability || "N/A"} />
//               <Info label="HD (Hip Dysplasia)" value={dog.HD || "N/A"} />
//               <Info label="ED (Elbow Dysplasia)" value={dog.ED || "N/A"} />
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Info Display
// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//     <span className="text-gray-500 dark:text-gray-400 font-semibold">{label}:</span>
//     <span className="text-gray-800 dark:text-gray-200">{value}</span>
//   </div>
// );

// // Section Header Wrapper
// const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
//     <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">{title}</h4>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

import React, { useRef, useState, useEffect } from "react";
import type { JSX } from "react";
import Badge from "../../badge/Badge";
import { Dog } from "../../../dogsCategory/types/dog";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  dog: Dog | null;
}

export const DogDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  className,
  onClose,
  showCloseButton = true,
  // isFullscreen = false,
  dog,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Keyboard and overflow handlers
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showImagePreview) setShowImagePreview(false);
        else onClose();
      }
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, showImagePreview]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImagePreview(true);
  };

  if (!isOpen || !dog) return null;

  const imageUrl = `http://localhost:3000${dog.friendlyUrl}`;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div
          className={`relative w-full max-w-4xl rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-hidden ${className}`}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with theme-adaptive gradient */}

          <div className="bg-white dark:bg-gray-900 px-6 py-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                Dog Profile
              </h2>

              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 transform hover:scale-110"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Profile section */}
          <div className="overflow-y-auto max-h-[80vh] px-6 py-5">
            <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
              <div className="flex flex-col items-center">
                <div
                  className="relative group w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden cursor-pointer"
                  onClick={handleImageClick}
                >
                  {!imageLoaded && (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt={dog.dogName}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? "block" : "hidden"
                      }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white dark:text-gray-100 text-sm font-medium bg-black/50 px-2 py-1 rounded-full">
                      View Full Photo
                    </span>
                  </div>
                </div>

                {/* Badge positioned below the image */}
                <div className="mt-3">
                  <Badge
                    size="md"
                    color={
                      dog.status === "Active"
                        ? "success"
                        : dog.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {dog.status}
                  </Badge>
                </div>
              </div>

              <div className="text-center sm:text-left mt-4 sm:mt-0">
                <div className="mb-1">
                  <h1 className="text-3xl font-bold inline-block mr-2 text-gray-800 dark:!text-white">
                    {dog.dogName}
                  </h1>
                  <span className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                    ({dog.sex})
                  </span>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                  <InfoPill label="ACC No" value={dog.KP} />
                  <InfoPill label="Breed" value={dog.breed?.breed || "N/A"} />
                  <InfoPill label="Location" value={dog.location || "N/A"} />
                </div>
              </div>
            </div>

            {/* Information grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <InfoCard
                label="Date of Birth"
                value={dog.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"}
                icon="calendar"
              />
              <InfoCard
                label="Microchip"
                value={dog.microchip?.chipId || "N/A"}
                icon="chip"
              />
              <InfoCard
                label="Color"
                value={dog.color || "N/A"}
                icon="palette"
              />
              <InfoCard
                label="HD (Hip Dysplasia)"
                value={dog.HD || "N/A"}
                icon="health"
              />
              <InfoCard
                label="ED (Elbow Dysplasia)"
                value={dog.ED || "N/A"}
                icon="health"
              />
            </div>

            {/* Detailed information sections */}
            <div className="space-y-6">
              <Section title="Achievements">
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  {dog.achievements || "No achievements recorded"}
                </p>
              </Section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section title="Virtues & Faults">
                  <p className="text-gray-700 dark:text-gray-300">
                    {dog.virtuesAndFaults || "N/A"}
                  </p>
                </Section>

                <Section title="Breeding Advice">
                  <p className="text-gray-700 dark:text-gray-300">
                    {dog.breedingAdvice || "N/A"}
                  </p>
                </Section>
              </div>

              <Section title="Progeny Trainability">
                <p className="text-gray-700 dark:text-gray-300">
                  {dog.progenyTrainability || "N/A"}
                </p>
              </Section>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <button
            className="absolute top-6 right-6 text-white dark:text-gray-200 hover:text-gray-100 dark:hover:text-white transition-transform transform hover:scale-110"
            aria-label="Close preview"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="text-white dark:text-gray-100 text-xl font-bold mb-4">
              {dog.dogName}'s Photo
            </div>
            <div className="relative bg-gray-800 border-2 border-white/10 dark:border-gray-700 rounded-lg overflow-hidden shadow-2xl max-w-[90vw] max-h-[80vh]">
              <img
                src={imageUrl}
                alt={`Full preview of ${dog.dogName}`}
                className="w-full h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="text-white/60 dark:text-gray-400 text-sm mt-4">
              Click anywhere outside the image to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Info Card Component
const InfoCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => {
  const iconMap: Record<string, JSX.Element> = {
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    chip: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    palette: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    health: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start space-x-3">
      <div className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
        {iconMap[icon] || iconMap.calendar}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="font-medium text-gray-900 dark:text-gray-100">
          {value}
        </div>
      </div>
    </div>
  );
};

// Info Pill Component
const InfoPill = ({ label, value }: { label: string; value: string }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
    <span className="font-semibold mr-1.5">{label}:</span> {value}
  </span>
);

// Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {title}
    </h3>
    {children}
  </div>
);
