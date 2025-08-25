import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table/index";
import { PencilIcon, PlusIcon } from "../../../assets/icons";
import Button from "../../ui/button/Button";
import { useNavigate } from "react-router";
import { useFetchCountries } from "../../dogsCategory/hooks/useCountry"; // Your country fetching hook

const ITEMS_PER_PAGE = 20;

export default function CountryList() {
  const [filters, setFilters] = useState({ id: "", countryName: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { country, countryLoading, Countryerror, setSelectedCountry } = useFetchCountries();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleEditClick = (selectedCountry: any) => {
    // Set the selected stud certificate in the store
    setSelectedCountry(selectedCountry);

    // Navigate to the inspection form page
    navigate("/create-country", { state: { mode: "edit" } });
  };

  // Filter countries by ID and name
  const filteredData = country.filter((item: any) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
      if (!filterValue) return true;

      let fieldValue = "";
      switch (key) {
        case "id":
          fieldValue = item?.idCountry?.toString() || "";
          break;
        case "countryName":
          fieldValue = item?.countryName?.toLowerCase() || "";
          break;
        default:
          fieldValue = "";
      }
      return fieldValue.includes(filterValue);
    })
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] text-black dark:text-white">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Country List</h2>
        <Button
          onClick={() => navigate("/create-country")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5 text-white" /> Create
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        {countryLoading ? (
          <div className="p-5">Loading...</div>
        ) : Countryerror ? (
          <div className="p-5 text-red-500">Failed to load countries</div>
        ) : (
          <>
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["ID", "COUNTRY NAME", "ACTIONS"].map((header, idx) => (
                    <TableCell
                      key={idx}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start"
                    >
                      {header}
                      {header !== "ACTIONS" && (
                        <input
                          type="text"
                          placeholder={`Search ${header}`}
                          onChange={(e) =>
                            handleFilterChange(
                              idx === 0 ? "id" : "countryName",
                              e.target.value
                            )
                          }
                          className="mt-1 w-full border rounded-md p-1 text-sm"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((country, index) => (
                  <TableRow
                    key={country.idCountry}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }
                  >
                    <TableCell className="px-5 py-4 text-start">{country.idCountry}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{country.countryName}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        className="text-blue-500 mx-1"
                        onClick={() => handleEditClick(country)}
                      >
                        <PencilIcon />
                      </button>
                      {/* <button
                        className="text-red-500 mx-1"
                        // onClick={() => handleDelete(country.id)} // Implement delete if needed
                      >
                        <TrashBinIcon />
                      </button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center p-4">
              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
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
