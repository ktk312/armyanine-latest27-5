import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../assets/icons";
import { useVaccination } from "../dogsCategory/hooks/useVaccination";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { Table, TableBody, TableHeader, TableRow, TableCell } from "../ui/table";

const ITEMS_PER_PAGE = 5;

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

const columns = [
  { label: "S.No", key: "" },
  { label: "Acc No", key: "dog.KP" },

  { label: "Dog Name", key: "dog.dogName" },
  { label: "Age", key: "age" },
  { label: "Vaccine", key: "vaccine" },
  { label: "Date Due", key: "dueDate" },
  { label: "Date Given", key: "givenDate" },
  { label: "Batch No", key: "batchNo" },
  { label: "ACTIONS", key: "" },
];

const VaccinationView = () => {
  const navigate = useNavigate();
  const goToNewPage = () => {
    navigate("/create-vaccination-record");
  };

  const { vaccinations = [], getAllVaccinations, setSelectedVaccination, deleteVaccination } = useVaccination();

  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col.key, ""]))
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllVaccinations();
  }, [getAllVaccinations]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = vaccinations.filter((item) =>
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

  const handleEditClick = (selectedVaccination: any) => {
    setSelectedVaccination(selectedVaccination);
    navigate("/create-vaccination-record");
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vaccination record?");
    if (!confirmDelete) return;

    await deleteVaccination(String(id));
    alert("Deleted Successfully");
  };

  return (
    <section
      aria-labelledby="vaccination-heading"
      className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] text-black dark:text-white shadow-sm transition-colors duration-300"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 pt-6 text-gray-900 dark:text-gray-100">
        <h2 id="vaccination-heading" className="text-xl font-semibold tracking-tight">
          Vaccination List
        </h2>
        <Button
          size="sm"
          variant="primary"
          endIcon={<PlusIcon className="h-5 w-5" />}
          onClick={goToNewPage}
          className="whitespace-nowrap"
        >
          New
        </Button>
      </header>

      <div className="max-w-full overflow-x-auto px-4 sm:px-6 pb-6 pt-4">
        <Table>
          <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
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
            {paginatedData.map((item, index) => {
              const formattedDueDate = item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "";
              const formattedGivenDate = item.givenDate ? new Date(item.givenDate).toLocaleDateString() : "";

              return (
                <TableRow
                  key={item.id}
                  className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                >
                  <TableCell className="px-5 py-4 text-start">{index + 1}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{item.dog?.KP || ""}</TableCell>

                  <TableCell className="px-5 py-4 text-start">{item.dog?.dogName || ""}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{item.age.toLocaleString()}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{item.vaccine ?? ""}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{formattedDueDate}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{formattedGivenDate}</TableCell>
                  <TableCell className="px-5 py-4 text-start">{item.batchNo.toLocaleString()}</TableCell>

                  <TableCell className="px-4 py-3 text-start flex gap-2">
                    <Tooltip title="Edit">
                      <button className="text-blue-500" onClick={() => handleEditClick(item)}>
                        <PencilIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <button className="text-red-500" onClick={() => handleDelete(item.id)}>
                        <TrashBinIcon />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

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
    </section>
  );
};

export default VaccinationView;
