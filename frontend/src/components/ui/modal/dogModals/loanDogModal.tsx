import { useRef, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../table";
import { GermanShepherd } from "../../../dogsCategory/types/GermanShepherd";
import { useLoanDogs } from "../../../dogsCategory/hooks/useLoanDogs";
import Badge from "../../badge/Badge";
import { LoanDog } from "../../../dogsCategory/types/loanDog";

interface ModalProps {
    isOpen: boolean;
    className?: string;
    onClose: () => void;
    showCloseButton?: boolean;
    isFullscreen?: boolean;
}



export const LoanDogListModal: React.FC<ModalProps> = ({
    isOpen,
    className,
    onClose,
    showCloseButton = true,
    isFullscreen = false,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<"sire" | "dam">("sire"); // <-- Tabs state
    const [filters, setFilters] = useState({
        id: "",
        dogName: "",
        soldTo: "",
        KP: "",
        loanDate: "",
        status: "",
    });
    const { sires, dams } = useLoanDogs();

    const ITEMS_PER_PAGE = 5;

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const filteredData = (activeTab === 'sire' ? sires : dams)
        .filter(dog =>
            Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                const dogValue = String(dog[key as keyof LoanDog]).toLowerCase();
                return dogValue.includes(value.toLowerCase());
            })
        );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
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

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-lg w-400 mx-auto p-6">
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
                            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">Loan Dogs</h4>
                        </div>

                        {/* TABS */}
                        <div className="flex mb-6 space-x-4 border-b">
                            <button
                                onClick={() => setActiveTab("sire")}
                                className={`pb-2 font-medium ${activeTab === "sire" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                            >
                                Sires ({sires.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("dam")}
                                className={`pb-2 font-medium ${activeTab === "dam" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                            >
                                Dams ({dams.length})
                            </button>
                        </div>

                        {/* TABLE */}
                        <div className="max-w-full overflow-x-auto  text-gray-800 dark:text-white/90">
                            <Table>
                                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                    <TableRow>
                                        {["S.No", "DOG NAME", "ACC NO", "LOAN DATE", "Status"].map((header, idx) => (
                                            <TableCell key={idx} isHeader className="px-5 py-3 font-medium  text-gray-800 dark:text-white/90 text-start">
                                                {header}
                                                {header !== "ACTIONS" && (
                                                    <input
                                                        type="text"
                                                        placeholder={`Search ${header}`}
                                                        onChange={(e) => handleFilterChange(header.replace(" ", "").toLowerCase(), e.target.value)}
                                                        className="mt-1 w-full border rounded-md p-1 text-sm"
                                                    />
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {paginatedData.map((order, index) => (
                                        <TableRow
                                            key={order.id}
                                            className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                                        >
                                            <TableCell className="px-5 py-4 text-start">{order.id}</TableCell>
                                            <TableCell className="px-5 py-4 text-start">{order.dogName}</TableCell>
                                            {/* <TableCell className="px-5 py-4 text-start">{order.soldTo}</TableCell> */}
                                            <TableCell className="px-5 py-4 text-start">{order.KP}</TableCell>
                                            <TableCell className="px-5 py-4 text-start">{order.loanDate || ""}</TableCell>

                                            <TableCell className="px-4 py-3 text-start">
                                                <Badge
                                                    size="sm"
                                                    color={
                                                        order.status === "Active"
                                                            ? "success"
                                                            : order.status === "Pending"
                                                                ? "warning"
                                                                : order.status === "Approved" ? "success"
                                                                    : "error"
                                                    }
                                                >
                                                    {order?.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center p-4">
                                <button
                                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                >
                                    Previous
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button
                                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

