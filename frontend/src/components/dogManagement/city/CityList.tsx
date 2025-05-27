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
import { useFetchCities } from "../../dogsCategory/hooks/useCities";

const ITEMS_PER_PAGE = 5;

export default function CityList() {
  const [filters, setFilters] = useState({ id: "", name: "", country: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { city, CityLoading, Cityerror, setSelectedCity } = useFetchCities();
  //   const { deleteCity } = usecity();
  const filterKeys = ["id", "name", "country"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = city.filter((item: any) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
      if (!filterValue) return true;

      let fieldValue = "";
      switch (key) {
        case "id":
          fieldValue = item?.id?.toString();
          break;
        case "name":
          fieldValue = item?.city.toLowerCase() || "";
          break;
        case "country":
          fieldValue = item?.country?.countryName?.toLowerCase() || "";
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

  const handleEditClick = (selectedCountry: any) => {
    // Set the selected stud certificate in the store
    setSelectedCity(selectedCountry);
    // Navigate to the inspection form page
    navigate("/create-city", { state: { mode: "edit" } });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] text-black dark:text-white">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Cities List</h2>
        <Button
          onClick={() => {
            // setSelectedCity(null);
            navigate("/create-city");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5 text-white" /> Create
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        {CityLoading ? (
          <div className="p-5">Loading...</div>
        ) : Cityerror ? (
          <div className="p-5 text-red-500">Failed to load cities</div>
        ) : (
          <>
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["ID", "CITY NAME", "COUNTRY", "ACTIONS"].map((header, idx) => (
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
                            handleFilterChange(filterKeys[idx], e.target.value)

                          }
                          className="mt-1 w-full border rounded-md p-1 text-sm"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((city, index) => (
                  <TableRow key={city.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <TableCell className="px-5 py-4 text-start">{city.id}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{city.city}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{city.country?.countryName}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      {/* <button className="text-blue-500 mx-1">
                        <EyeIcon />
                      </button> */}
                      <button
                        className="text-blue-500 mx-1"
                        onClick={() => handleEditClick(city)}
                      >
                        <PencilIcon />
                      </button>
                      {/* <button
                        className="text-red-500 mx-1"
                        // onClick={() => handleDelete(city.id)}
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
              <span>Page {currentPage} of {totalPages}</span>
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
