import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { PlusIcon } from "../../assets/icons";
import { useDeworming } from "../dogsCategory/hooks/useDeworming";
import { useNavigate } from "react-router";

const headers = [
  { label: "Date", key: "date" },
  { label: "Drug", key: "drug" },
  { label: "Sign", key: "sign" },
   { label: "Actions", key: "actions" },
];

const ITEMS_PER_PAGE = 5;

export default function DewormingView() {
  const [filters, setFilters] = useState({ date: "", drug: "", sign: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const {
    dewormingRecords,
    isLoading,
    error,
    getAllDeworming,
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
    const itemValue = item[key as keyof typeof item];
    return String(itemValue).toLowerCase().includes(value.toLowerCase());
  })
);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));

  const navigate = useNavigate();
  const goToNewPage = () => {
    navigate("/create-deworming-record");
  };

  // const handleView = (id: number) => {
  //   console.log(`View deworming record with ID: ${id}`);
  //   navigate(`view-deworming/${id}`);
  // };

  // const handleEdit = (id: number) => {
  //   console.log(`Edit deworming record with ID: ${id}`);
  //   navigate(`/edit-deworming/${id}`);
  // };
  // const handleDelete = (id: number) => {
  //   console.log(`Delete deworming record with ID: ${id}`);
  //   // Implement delete API call and refresh data as needed
  // };
  
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

      {/* Table */}
      <div className="overflow-x-auto px-6 pb-6">
         {isLoading ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="py-6 text-center text-red-500">Error: {error}</div>
        ) :
        (
            <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300"
                >
                  <div className="flex flex-col gap-1">
                    <span>{header.label}</span>
                    <input
                      type="text"
                      placeholder={`Search ${header.label}`}
                      onChange={(e) =>
                        handleFilterChange(header.key, e.target.value)
                      }
                      className="w-full border border-gray-300 dark:border-white/[0.2] rounded-md px-2 py-1 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:bg-gray-800 dark:placeholder-gray-500"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr
                key={idx}
                className={`transition-colors duration-200 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-blue-900`}
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="px-4 py-4 text-gray-900 dark:text-gray-100"
                  >
                    {item[header.key as keyof typeof item]}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        )
        }
      

        {/* Pagination */}
           {!isLoading && filteredData.length > 0 && (
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
          
        </div>
          )}
      </div>
    </div>
  );
}
