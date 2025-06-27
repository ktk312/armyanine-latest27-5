import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../assets/icons"; // Optional: for New button
import { useNavigate } from "react-router-dom";
import { useTraining } from "../dogsCategory/hooks/useTraining";
import { Tooltip } from "@mui/material";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

// Dummy data – replace with API response or context state
export const performanceMetrics = [
  "Intelligence",
  "Willingness",
  "Energy",
  "Sensitivity",
  "Aggression",
] as const;
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export type PerformanceMetric = typeof performanceMetrics[number];

export type Ratings = Record<PerformanceMetric, string>;

export interface TrainingRecord {
  id: number;
  trainerName: string;
  trainingCategory: string;
  trainingStartedOn: string;
  trainingCompleted: string;
  performance: string;
  intelligence: string;
  willingness: string;
  energy: string;
  sensitivity: string;
  ratings: Ratings;
}
const ITEMS_PER_PAGE = 5;
const columns = [
  { label: "S.No", key: "" },
  { label: "Acc No", key: "dog.KP" },

  { label: "Dog Name", key: "dog.dogName" },
  { label: "Trainer", key: "trainerName" },
  { label: "Category", key: "trainingCategory" },
  { label: "Start Date", key: "trainingStartedOn" },
  { label: "End Date", key: "trainingCompleted" },
  { label: "Intelligence", key: "intelligence" },
  { label: "Willingness", key: "willingness" },
  { label: "Energy", key: "energy" },
  { label: "Sensitivity", key: "sensitivity" },
  { label: "Aggression", key: "aggression" },
  { label: "Action", key: "action" },
];
export default function TrainingListView() {
  const navigate = useNavigate();
  const {
    trainingRecords,
    isLoading,
    error,
    getAllTraining,
    setSelectedTraining,
    deleteTraining
  } = useTraining();
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col.key, ""]))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = trainingRecords.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (!key || !value) return true;
      let raw = getNestedValue(item, key);

      if (raw instanceof Date) {
        raw = raw.toLocaleDateString();
      } else if (key.includes("Date") && typeof raw === "string") {
        // Parse and format string dates for consistent filtering
        const parsed = new Date(raw);
        raw = isNaN(parsed.getTime()) ? raw : parsed.toLocaleDateString();
      }

      const stringValue = raw != null ? String(raw).toLowerCase() : "";
      return stringValue.includes(value.toLowerCase());
    })
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  // Fetch records on component mount
  useEffect(() => {
    getAllTraining();
  }, [getAllTraining]);

  const handleNew = () => {
    navigate("/create-training-record");
  };

  const handleEditClick = (selectedTraining: any) => {
    // Set the selected stud certificate in the store
    setSelectedTraining(selectedTraining);

    // Navigate to the inspection form page
    navigate("/create-training-record");
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this training record?");
    if (!confirmDelete) return;

    await deleteTraining((id));
    alert("Deleted Successfully")
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
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map(({ label, key }, idx) => (
                  <TableCell key={idx} isHeader className="px-5 py-3 font-medium text-gray-500 text-start dark:text-gray-300">
                    {label}
                    {key && (
                      <input
                        type="text"
                        placeholder={`Search ${label}`}
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(key, e.target.value)}
                        className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm rounded-md px-2 py-1 text-gray-900 dark:text-white"
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((order, index) => {
                const formattedStartDate = order.trainingStartedOn ? new Date(order.trainingStartedOn).toLocaleDateString() : "";
                const formattedCompletedDate = order.trainingCompleted ? new Date(order.trainingCompleted).toLocaleDateString() : "";

                return (
                  <TableRow key={order.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{index + 1}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.dog?.KP}</TableCell>

                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.dog?.dogName}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.trainerName}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.trainingCategory}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{formattedStartDate}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{formattedCompletedDate}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.intelligence}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.willingness}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.energy}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.sensitivity}</TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-900 dark:text-white">{order.aggression}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Tooltip title="Edit">
                        <button className="text-blue-500 mx-1"
                          onClick={() => {
                            handleEditClick(order);
                          }}>
                          <PencilIcon />
                        </button>
                      </Tooltip>
                      <Tooltip title="Remove">
                        <button className="text-red-500 mx-1" onClick={() => {
                          handleDelete(order?.id);
                        }}>
                          <TrashBinIcon />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

        )}
        {/* ✅ Pagination Controls */}
        <div className="flex justify-between items-center mt-6 px-2 text-sm text-gray-700 dark:text-gray-300">
          <button
            className="px-3 py-1 border rounded-md dark:border-gray-600 dark:bg-gray-800 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded-md dark:border-gray-600 dark:bg-gray-800 disabled:opacity-50"
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
