import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";
import { TrashBinIcon, EyeIcon, PencilIcon, PlusIcon } from "../../assets/icons";
import Button from "../ui/button/Button";


interface Medication {
    id: number;
    name: string;
    category: string;
    dosageForm: string;
    strength: string;
    expiryDate: string;
    status: string;
}

const tableData: Medication[] = [
    {
        id: 1,
        name: "Amoxicillin",
        category: "Antibiotic",
        dosageForm: "Tablet",
        strength: "250mg",
        expiryDate: "2026-01-01",
        status: "Available"
    },
    {
        id: 2,
        name: "Carprofen",
        category: "Pain Relief",
        dosageForm: "Injection",
        strength: "50mg/ml",
        expiryDate: "2025-09-10",
        status: "Out of Stock"
    }
];


const ITEMS_PER_PAGE = 20;

export default function MedicationForm() {
    const [filters, setFilters] = useState({
        id: "",
        name: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset pagination on filter change
    };

    const filteredData = tableData.filter((order) =>
        Object.keys(filters).every((key) => {
            const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
            if (!filterValue) return true;

            let fieldValue = "";
            switch (key) {
                case "id":
                    fieldValue = order.id.toString();
                    break;
                default:
                    fieldValue = "";
            }
            return fieldValue.includes(filterValue);
        })
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white">
            <div className="flex justify-between items-center mb-6 p-5">
                <h2 className="text-xl font-semibold"> Medication Management</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"> <PlusIcon className="w-4 h-5 text-white" /> Add Medication</Button>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            {["ID", "Name", "Category", "Dosage Form", "Strength", "Expiry Date", "Status", "Actions"].map((header, idx) => (
                                <TableCell key={idx} isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
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
                        {paginatedData.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="px-5 py-4 text-start">{order.id}</TableCell>
                                <TableCell className="px-5 py-4 text-start">{order.name}</TableCell>
                                <TableCell className="px-5 py-4 text-start">{order.category}</TableCell>
                                <TableCell className="px-5 py-4 text-start">{order.dosageForm}</TableCell>
                                <TableCell className="px-5 py-4 text-start">{order.strength}</TableCell>

                                <TableCell className="px-5 py-4 text-start">{order.expiryDate}</TableCell>
                                <TableCell className="px-4 py-3 text-start">
                                    <Badge
                                        size="sm"
                                        color={order.status === "Active" ? "success" : order.status === "Pending" ? "warning" : "error"}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>                                <TableCell className="px-4 py-3 text-start">
                                    <button className="text-blue-500 mx-1"><EyeIcon /></button>
                                    <button className="text-blue-500 mx-1"><PencilIcon /></button>
                                    <button className="text-red-500 mx-1"><TrashBinIcon /></button>
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
    );
}

