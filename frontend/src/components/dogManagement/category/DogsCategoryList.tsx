import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table/index";
import {
  PencilIcon,
  PlusIcon,
} from "../../../assets/icons";
import Button from "../../ui/button/Button";
import { useNavigate } from "react-router";
import { useFetchDogsCategory } from "../../dogsCategory/hooks/useFetchCategory";
import { Tooltip } from "@mui/material";

interface Order {
  id: number;
  name: string;
}

const ITEMS_PER_PAGE = 5;

export default function DogsCategoryList() {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const Navigate = useNavigate();

  // 🐶 Fetch categories from API
  const { dogLoading, error, categories = [] } = useFetchDogsCategory();
  const { setSelectedDogcategory } = useFetchDogsCategory();
  //  const {setSelectedDogcategory} = useFetchDogsCategory();

  // 🔁 Map API output to match local interface
  const tableData: Order[] = categories.map((dog) => ({
    id: dog.id,
    name: dog.name ?? "",
  }));

  // 🔍 Filter logic
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to page 1 on filter change
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
        case "name":
          fieldValue = order.name.toLowerCase();
          break;
        default:
          fieldValue = order[key as keyof Order]?.toString().toLowerCase() || "";
      }
      return fieldValue.includes(filterValue);
    })
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 📍 Redirect on Edit
  const updateDogCategory = (data: any) => {
    setSelectedDogcategory(data)
    Navigate("/dog/create/category"); // Adjust the path as needed
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Dogs Categories - List</h2>
        <Button
          onClick={() => {
            setSelectedDogcategory(null); // ✅ Reset selectedCategory before navigating
            Navigate("/dog/create/category");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5 text-white" /> Create
        </Button>


      </div>

      <div className="max-w-full overflow-x-auto">
        {dogLoading ? (
          <div className="p-5">Loading...</div>
        ) : error ? (
          <div className="p-5 text-red-500">Failed to load categories</div>
        ) : (
          <>
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["S.No", "CATEGORY NAME", "ACTIONS"].map((header, idx) => (
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
                              idx === 0 ? "id" : "name",
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
                {paginatedData.map((order, index) => (
                  <TableRow key={order.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <TableCell className="px-5 py-4 text-start">{order.id}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{(order?.name ?? "").charAt(0).toUpperCase() + (order?.name ?? "").slice(1)}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Tooltip title="Edit">
                        <button className="text-blue-500 mx-1"
                          onClick={() => {
                            updateDogCategory(order);
                          }}>
                          <PencilIcon />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 ">
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
