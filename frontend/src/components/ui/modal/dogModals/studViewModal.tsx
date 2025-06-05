// import { useRef, useEffect } from "react";
// import Badge from "../../badge/Badge";
// import { StudCertificate } from "../../../dogsCategory/types/studCertificate";

// interface ModalProps {
//   isOpen: boolean;
//   className?: string;
//   onClose: () => void;
//   showCloseButton?: boolean;
//   isFullscreen?: boolean;
//   dog: StudCertificate | null;
// }

// export const StudViewModal: React.FC<ModalProps> = ({
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

//   return (
//     <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
//       <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-400 mx-auto p-6">
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
//                 Stud Certificate Detail
//               </h4>
//             </div>

//             <div className="max-w-full overflow-x-auto text-gray-800 dark:text-white/90">
//               {dog && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//                     <div className="flex items-center gap-2">
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                         {dog?.sire?.dogName}{" "}
//                         <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
//                           (Sire)
//                         </span>
//                       </h2>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         ({dog?.sire?.KP})
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                         {dog?.dam?.dogName}{" "}
//                         <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
//                           (Dam)
//                         </span>
//                       </h2>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         ({dog?.dam?.KP})
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-500 dark:text-gray-400">
//                         DOB:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog?.matingDate
//                           ? new Date(dog?.matingDate).toLocaleDateString()
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
//                         Created At:
//                       </span>
//                       <span className="text-gray-800 dark:text-white">
//                         {dog?.createdAt || "N/A"}
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
//                   </div>
//                 </div>
//               )}

//               {/* Additional Information */}
//               {/* <div className="mt-6">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Additional Information</h4>
//                                 </div>
//                                 {dog?.message && (
//                                     <div className="flex items-center gap-2">
//                                         <span className="text-gray-500 dark:text-gray-400">Message:</span>
//                                         <span className="text-gray-800 dark:text-white">{dog?.message || "N/A"}</span>
//                                     </div>
//                                 )}

//                                 {dog?.reasons && (
//                                     <div className="flex items-center gap-2 mt-4">
//                                         <span className="text-gray-500 dark:text-gray-400">Virtues and Faults:</span>
//                                         <span className="text-gray-800 dark:text-white">{dog.reasons || "N/A"}</span>
//                                     </div>
//                                 )}
//                             </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//shamim-changes

import { useRef, useEffect } from "react";
import Badge from "../../badge/Badge";
import { StudCertificate } from "../../../dogsCategory/types/studCertificate";
// import { UserIcon, CalendarIcon, TagIcon, ClockIcon } from "../../../assets/icons"; // Assuming these icons exist in your assets

// Temporary icon components as placeholders
// const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg {...props} fill="none" viewBox="0 0 24 24">
//     <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
//     <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" />
//   </svg>
// );

const DogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M4 4 Q0 9, 3 14" stroke="currentColor" strokeWidth="2" />
    <path d="M20 4 Q24 9, 21 14" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
    <circle cx="12" cy="13" r="1" fill="currentColor" />
    <path d="M12 15 Q11 17, 12 18 Q13 17, 12 15" fill="currentColor" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M16 3v4M8 3v4M3 9h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const TagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M20.59 13.41l-8.59 8.59a2 2 0 01-2.83 0l-6.59-6.59a2 2 0 010-2.83l8.59-8.59a2 2 0 012.83 0l6.59 6.59a2 2 0 010 2.83z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
  </svg>
);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  dog: StudCertificate | null;
}

export const StudViewModal: React.FC<ModalProps> = ({
  isOpen,
  className,
  onClose,
  showCloseButton = true,
  isFullscreen = false,
  dog,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-300 scale-100";

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto z-[99999] p-4">
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200 hover:scale-105"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Stud Certificate Details
            </h4>
          </div>

          <div className="max-w-full overflow-x-auto text-gray-800 dark:text-white/90">
            {dog && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <DogIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {dog?.sire?.dogName}{" "}
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                          (Sire)
                        </span>
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ACC NO: {dog?.sire?.KP || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DogIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {dog?.dam?.dogName}{" "}
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                          (Dam)
                        </span>
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ACC NO: {dog?.dam?.KP || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Mating Date:
                      </span>
                      <p className="text-base text-gray-800 dark:text-white">
                        {dog?.matingDate
                          ? new Date(dog?.matingDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TagIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Breed:
                      </span>
                      <p className="text-base text-gray-800 dark:text-white">
                        {dog?.breed?.breed || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Created At:
                      </span>
                      <p className="text-base text-gray-800 dark:text-white">
                        {dog?.createdAt
                          ? new Date(dog?.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TagIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Status:
                      </span>
                      <Badge
                        size="sm"
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
                </div>
              </div>
            )}

            {/* Additional Information */}
            {/* <div className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Additional Information</h4>
              </div>
              {dog?.message && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">Message:</span>
                  <span className="text-gray-800 dark:text-white">{dog?.message || "N/A"}</span>
                </div>
              )}
              {dog?.reasons && (
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-gray-500 dark:text-gray-400">Virtues and Faults:</span>
                  <span className="text-gray-800 dark:text-white">{dog.reasons || "N/A"}</span>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
