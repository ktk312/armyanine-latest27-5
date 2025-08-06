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
import { Tooltip } from "@mui/material";
import { useFetchDogs } from "../dogsCategory/hooks/useGetDogs";
import { DogDetailsModal } from "../ui/modal/dogModals/dogProfileModal";


export default function AllDogs() {
  const [viewDog, setViewDog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // const { litter, loading, error } = useFetchLitterInspection(); // ✅ Using the hook
  const { dogs, loading, error } = useFetchDogs();

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
    KP: "",
    sex: "",
    microchip: "",
    status: "",
  });
  const headerToKeyMap: Record<string, keyof typeof filters> = {
    "S.No": "id",
    "DOG NAME": "name",
    "ACC NO": "KP",
    SEX: "sex",
    MICROCHIP: "microchip",
    STATUS: "status",
  };
  const [currentPage, setCurrentPage] = useState(1);
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = dogs.filter((dog) => {
    return Object.entries(filters).every(([filterKey, filterValue]) => {
      const value = filterValue.toLowerCase().trim();
      if (!value) return true;

      switch (filterKey) {
        case "id":
          return dog.id?.toString().toLowerCase().includes(value);
        case "name":
          return dog.dogName?.toLowerCase().includes(value);
        case "KP":
          return dog.KP?.toLowerCase().includes(value);
        case "sex":
          return dog.sex?.toLowerCase().includes(value);
        case "microchip":
          return dog.microchip?.chipId.toLowerCase().includes(value);
        case "status":
          return dog.status?.toLowerCase().includes(value);
        default:
          return true;
      }
    });
  });
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
                {[
                  "S.No",
                  "DOG NAME",
                  "ACC NO",
                  "SEX",
                  "MICROCHIP",
                  "STATUS",
                  "ACTIONS",
                ].map((header, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className="px-5 py-3 font-medium text-left"
                  >
                    <div className="flex flex-col gap-1">
                      <span>{header}</span>
                      {header !== "ACTIONS" && (
                        <input
                          type="text"
                          placeholder={`Search ${header}`}
                          onChange={(e) => {
                            const key =
                              headerToKeyMap[
                              header as keyof typeof headerToKeyMap
                              ];
                            if (key) {
                              handleFilterChange(key, e.target.value);
                            }
                          }}
                          className="mt-1 w-full border dark:border-white/[0.5] rounded-md p-1 text-sm text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
                        />
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.map((order, index) => (
                <TableRow key={order?.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                  <TableCell className="px-5 py-4 text-start ">
                    {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.KP}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {(order?.sex ?? "").charAt(0).toUpperCase() + (order?.sex ?? "").slice(1)}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.microchip?.chipId}
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
