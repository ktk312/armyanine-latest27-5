import { useRef, useEffect } from "react";
import Badge from "../../badge/Badge";
import { Dog } from "../../../dogsCategory/types/dog";

interface ModalProps {
    isOpen: boolean;
    className?: string;
    onClose: () => void;
    showCloseButton?: boolean;
    isFullscreen?: boolean;
    dog: Dog | null
}


export const DogDetailsModal: React.FC<ModalProps> = ({
    isOpen,
    className,
    onClose,
    showCloseButton = true,
    isFullscreen = false,
    dog
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
        : "relative w-full rounded-3xl bg-white dark:bg-gray-900";


    const ImageUrl = `http://localhost:3000${dog?.friendlyUrl}`;
    console.log("this is image url:", ImageUrl)
    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-400 mx-auto max-h-[90vh] overflow-y-auto p-6">
                {!isFullscreen && (
                    <div
                        className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
                        onClick={onClose}
                    ></div>
                )}
                <div
                    ref={modalRef}
                    className={`${contentClasses} ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                        >
                            <svg
                                width="24"
                                height="24"
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
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Dog Profile</h4>
                        </div>

                        <div className="max-w-full overflow-x-auto text-gray-800 dark:text-white/90">
                            {dog && (
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
                                            <img src={ImageUrl} alt="Dog" className="w-24 h-24 rounded-full object-cover" />

                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                {dog.dogName}{" "}
                                                <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
                                                    ({dog.sex})
                                                </span>
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">ACC No: {dog.KP}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">DOB:</span>
                                            <span className="text-gray-800 dark:text-white">
                                                {dog?.dob ? new Date(dog.dob).toLocaleDateString() : "N/A"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                                            <span className="text-gray-800 dark:text-white">{dog?.breed?.breed || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">Microchip:</span>
                                            <span className="text-gray-800 dark:text-white">{dog?.microchip?.chipId || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">Color:</span>
                                            <span className="text-gray-800 dark:text-white">{dog.color || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">Status:</span>
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
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">📍 Location:</span>
                                            <span className="text-gray-800 dark:text-white">{dog.location || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Additional Information */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Additional Information</h4>
                                </div>
                                {dog?.achievements && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 dark:text-gray-400">Achievements:</span>
                                        <span className="text-gray-800 dark:text-white">{dog.achievements || "N/A"}</span>
                                    </div>
                                )}

                                {dog?.virtuesAndFaults && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-gray-500 dark:text-gray-400">Virtues and Faults:</span>
                                        <span className="text-gray-800 dark:text-white">{dog.virtuesAndFaults || "N/A"}</span>
                                    </div>
                                )}

                                {dog?.breedingAdvice && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-gray-500 dark:text-gray-400">Breeding Advice:</span>
                                        <span className="text-gray-800 dark:text-white">{dog.breedingAdvice || "N/A"}</span>
                                    </div>
                                )}

                                {dog?.progenyTrainability && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-gray-500 dark:text-gray-400">Progeny Trainability:</span>
                                        <span className="text-gray-800 dark:text-white">{dog.progenyTrainability || "N/A"}</span>
                                    </div>
                                )}

                                {dog?.HD && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-gray-500 dark:text-gray-400">HD (Hip Dysplasia):</span>
                                        <span className="text-gray-800 dark:text-white">{dog.HD || "N/A"}</span>
                                    </div>
                                )}

                                {dog?.ED && (
                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="text-gray-500 dark:text-gray-400">ED (Elbow Dysplasia):</span>
                                        <span className="text-gray-800 dark:text-white">{dog.ED || "N/A"}</span>
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

