import { useEffect, useCallback, useState } from "react";
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
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

const ITEMS_PER_PAGE = 5;
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const columns = [
  { label: "S.No", key: "id" },
  { label: "Dog Name", key: "dog.dogName" },
  { label: "Prophylactic Drug", key: "prophylacticDrug" },
  { label: "remarks", key: "remarks" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

export default function ProphylaxisView() {
  const navigate = useNavigate();
  const {
    prophylaxisRecords = [],
    isLoading,
    error,
    getAllProphylaxis,
    deleteProphylaxis,
    setSelectedProphylaxis

  } = useProphylaxis();
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col.key, ""]))
  ); 
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = prophylaxisRecords.filter((item) =>
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
  // Use useCallback to memoize the goToNewPage function
  const goToNewPage = useCallback(() => {
    navigate("/create-prophylaxis");
  }, [navigate]);


  //handle to delete
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Prophylaxis record?");
    if (!confirmDelete) return;

    await deleteProphylaxis((id));
    alert("Deleted Successfully")
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Function to handle edit
  const handleEditClick = (selectedVaccination: any) => {
    // Set the selected stud certificate in the store
    setSelectedProphylaxis(selectedVaccination);

    // Navigate to the inspection form page
    navigate("/create-prophylaxis");
  };

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
              const formattedDate = order.date ? new Date(order.date).toLocaleDateString() : "";

              return (
                <TableRow key={order.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                  <TableCell className="px-5 py-4 text-start">{order.id}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{order.dog?.dogName}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{order.prophylacticDrug}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{order.remarks}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{formattedDate}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Tooltip title="view">
                      <button className="text-blue-500 mx-1">
                        <EyeIcon />
                      </button>
                    </Tooltip>
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
