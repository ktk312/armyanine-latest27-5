import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { EyeIcon } from "../../assets/icons";
import { useState } from "react";
import {Tooltip } from "@mui/material";
import { useFetchDogs } from "../dogsCategory/hooks/useGetDogs";
import { DogDetailsModal } from "../ui/modal/dogModals/dogProfileModal";


export default function AllDogs() {
  const [viewDog, setViewDog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // const { litter, loading, error } = useFetchLitterInspection(); // ✅ Using the hook
  const {dogs, loading, error} = useFetchDogs();

const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset pagination on filter change
};
 const openViewModal = (dog: any) => {
    setViewDog(dog);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewDog(null);
  };
  const ITEMS_PER_PAGE = 5;
 const [filters, setFilters] = useState({
        id: "",
        name: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = dogs.filter((order) =>
      Object.keys(filters).every((key) => {
        const filterValue = filters[key as keyof typeof filters].toLowerCase().trim();
        if (!filterValue) return true;
  
        let fieldValue = "";
        switch (key) {
          case "id":
            fieldValue = order.id.toString();
            break;
          case "dogName":
              fieldValue = order.dogName.toString();
              break;
          case "sireName":
            fieldValue = order?.sire?.dogName.toLowerCase().toString() || "";
            break;
          case "damName":
            fieldValue = order?.dam?.dogName.toLowerCase().toString() || "";
            break;
          case "matingDate":
            fieldValue = order?.dob.toLowerCase().toString();
            break;
          default:
            fieldValue = order[key as keyof typeof order]?.toString().toLowerCase() || "";
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] text-black dark:text-white">
      {loading ? (
        <p className="text-center p-5">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center p-5">Error: {error}</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["id","dog name", "sire", "dam", "received", "status", "actions"].map(
                  (key, idx) => (
                    <TableCell
                      key={idx}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start"
                    >
                      {key.toUpperCase()}
                      {key !== "actions" && (
                        <input
                          type="text"
                          placeholder={`Search ${key}`}
                          onChange={(e) =>
                            handleFilterChange(key, e.target.value)
                          }
                          className="mt-1 w-full border rounded-md p-1 text-sm"
                        />
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((order, index) => (
                <TableRow key={order?.id}  className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                  <TableCell className="px-5 py-4 text-start ">
                    {order?.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.sire?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.dam?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.dogName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                            ? "warning"
                            : "error"
                      }
                    >
                      {order?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                   <Tooltip title="Eye">
                        <button className="text-blue-500 mx-1"
                          onClick={() => openViewModal(order)}

                        >
                          <EyeIcon />
                        </button>
                      </Tooltip>
                    {/* <Tooltip title="Remove">
                      <button className="text-red-500 mx-1">
                        <TrashBinIcon />
                      </button>
                    </Tooltip> */}
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
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
       {/* View Dog Details Modal */}
            <DogDetailsModal
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              dog={viewDog}
            />
    </div>
  );
}
