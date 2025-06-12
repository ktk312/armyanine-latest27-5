
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../ui/button/Button";
import { EyeIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../assets/icons";
import { useDeworming } from "../dogsCategory/hooks/useDeworming";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

const ITEMS_PER_PAGE = 5;
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
const columns = [
  { label: "S.No", key: "id" },
  { label: "Dog Name", key: "dog.dogName" },
  { label: "Drug", key: "drug" },
  { label: "Sign", key: "sign" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];
export default function DewormingView() {
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col.key, ""]))
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    dewormingRecords,
    isLoading,
    error,
    getAllDeworming,
    setSelectedDeworming,
    deleteDeworming
  } = useDeworming();

  useEffect(() => {
    getAllDeworming();
  }, [getAllDeworming]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = dewormingRecords.filter((item) =>
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

  const navigate = useNavigate();

  const goToNewPage = () => {
    setSelectedDeworming(null);
    navigate("/create-deworming-record");
  };

  const handleEditClick = (record: any) => {
    setSelectedDeworming(record);
    navigate("/create-deworming-record");
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deworming record?");
    if (!confirmDelete) return;

    await deleteDeworming(id);
    alert("Deleted Successfully");
  };

  return (
    <div className="rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-sm transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">Deworming List</h2>
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

      <div className="overflow-x-auto px-6 pb-6">
        {isLoading ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="py-6 text-center text-red-500">Error: {error}</div>
        ) : (
          <>
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
                      <TableCell className="px-5 py-4 text-start">{order.drug}</TableCell>
                      <TableCell className="px-5 py-4 text-start">{order.sign}</TableCell>
                      <TableCell className="px-5 py-4 text-start">{formattedDate}</TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <button className="text-blue-500 mx-1">
                          <EyeIcon />
                        </button>
                        <button className="text-blue-500 mx-1"
                          onClick={() => {
                            handleEditClick(order);
                          }}>
                          <PencilIcon />
                        </button>
                        <button className="text-red-500 mx-1" onClick={() => {
                          handleDelete(order?.id);
                        }}>
                          <TrashBinIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-gray-900 dark:text-gray-200">
              <button
                className="rounded border border-gray-400 bg-white px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span className="text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="rounded border border-gray-400 bg-white px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
