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
import { useFetchMicrochips } from "../../dogsCategory/hooks/useMicrochip";

// interface MicrochipItem {
//   id: number;
//   chipId: string;
// }

const ITEMS_PER_PAGE = 20;

export default function Microchip() {
  // const [filters, setFilters] = useState({ id: "", name: "" });
  const [filters, setFilters] = useState({ id: "", chipId: "" });

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { microchips, microchiploading, error, setSelectedMicrochip } = useFetchMicrochips();
  // const { deleteMicrochip } = useDeleteMicrochip();
  // const tableData: MicrochipItem[] = microchips.map((chip, index) => ({
  //   id: index + 1,
  //   chipId: chip.chipId,
  // }));


  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = microchips.filter((item) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
      if (!filterValue) return true;

      let fieldValue = "";
      switch (key) {
        case "id":
          fieldValue = item?.id?.toString();
          break;
        case "chipId":
          fieldValue = item?.chipId.toLowerCase();
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

  // const handleDelete = async (id: any) => {
  //   try {
  //     const response = await deleteMicrochip(id.toString());
  //     alert(response?.message || "Microchip deleted successfully.");
  //     // No need to navigate("/microchip") anymore
  //   } catch (error) {
  //     console.error("Error deleting microchip:", error);
  //     alert("Failed to delete microchip.");
  //   }
  // };

  const handleEditClick = (selectedMicrochip: any) => {
    // Set the selected stud certificate in the store
    setSelectedMicrochip(selectedMicrochip);

    // Navigate to the inspection form page
    navigate("/create/microchip", { state: { mode: "edit" } });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Microchip List</h2>
        <Button
          onClick={() => {
            setSelectedMicrochip(null);
            navigate("/create/microchip");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5 text-white" /> Create
        </Button>
      </div>


      <div className="max-w-full overflow-x-auto">
        {microchiploading ? (
          <div className="p-5">Loading...</div>
        ) : error ? (
          <div className="p-5 text-red-500">Failed to load categories</div>
        ) : (
          <>
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  {["S.No", "Microchip", "ACTIONS"].map((header, idx) => (
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
                              idx === 0 ? "id" : "chipId",
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
                  <TableRow key={index + 1} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <TableCell className="px-5 py-4 text-start">{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</TableCell>
                    <TableCell className="px-5 py-4 text-start"> {typeof order?.chipId === 'string' ? order.chipId : JSON.stringify(order?.chipId)}</TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      {/* <button className="text-blue-500 mx-1">
                        <EyeIcon />
                      </button> */}
                      <button className="text-blue-500 mx-1"
                        onClick={() => handleEditClick(order)}
                      >
                        <PencilIcon />
                      </button>
                      {/* <button className="text-red-500 mx-1"    
                     onClick={() => handleDelete(order?.id)}>
                        <TrashBinIcon />
                      </button> */}
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
