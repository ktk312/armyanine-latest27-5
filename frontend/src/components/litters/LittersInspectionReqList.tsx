import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";
import {
  TrashBinIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
} from "../../assets/icons";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useFetchLitterInspection } from "../dogsCategory/hooks/litterInspection";
import { formatDate } from "../../utils/utils";
import { InspectionViewModal } from "../ui/modal/dogModals/InspectionViewModal";

const ITEMS_PER_PAGE = 5;

export default function LittersInspectionReqList() {
  const [filters, setFilters] = useState({
    id: "",
    sireName: "",
    damName: "",
    matingDate: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewInspection, setViewInspection] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (dog: any) => {
    setViewInspection(dog);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewInspection(null);
  };
  // const [isOpenView, setIsOpenView] = useState(false);
  const navigate = useNavigate();

  // const { studCertificate, loading, error, setSelectedStudCertificate } = useFetchLitterInspection(); // ✅ Using the hook
  const { litter, loading, error, setSelectedLitter } = useFetchLitterInspection(); // ✅ Using the hook

  // const openViewModal = () => setIsOpenView(true);
  const goToNewPage = () => navigate("/litter-inspection");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = litter.filter((order) =>
    Object.entries(filters).every(([key, filterValue]) => {
      filterValue = filterValue.toLowerCase().trim();
      if (!filterValue) return true;

      let fieldValue = "";
      switch (key) {
        case "id":
          fieldValue = order.id.toString();
          break;
        case "sireName":
          fieldValue = order?.sire?.dogName?.toLowerCase() || "";
          break;
        case "damName":
          fieldValue = order?.dam?.dogName?.toLowerCase() || "";
          break;
        case "matingDate":
          fieldValue = order?.matingDate?.toLowerCase() || "";
          break;
        case "status":
          fieldValue = order?.status?.toLowerCase() || "";
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
  const handleEditClick = (selectedLitter: any) => {
    // Set the selected stud certificate in the store
    setSelectedLitter(selectedLitter);

    // Navigate to the inspection form page
    navigate("/litter-registration");
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] text-black dark:text-white">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Inspection Requests - List</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
          onClick={goToNewPage}
        >
          <PlusIcon className="w-4 h-5 text-white" /> New
        </Button>
      </div>

      {loading ? (
        <p className="text-center p-5">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center p-5">Error: {error}</p>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {/* {["id", "sire", "dam", "received", "status", "actions"].map(
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
                )} */}

                {["s.no", "sireName", "damName", "matingDate", "status", "actions"].map(
                  (key, idx) => (
                    <TableCell
                      key={idx}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start"
                    >
                      {key.toUpperCase()}
                      {key !== "actions" && key != "s.no" && (
                        <input
                          type="text"
                          placeholder={`Search ${key}`}
                          onChange={(e) => handleFilterChange(key, e.target.value)}
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
                <TableRow key={order?.id} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                  <TableCell className="px-5 py-4 text-start">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.sire?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {order?.dam?.dogName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    {formatDate(order?.matingDate)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                            ? "warning"
                            : order.status === "Approved" ? "success"
                              : "error"
                      }
                    >
                      {order?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Tooltip title="Edit">
                      <button
                        className="text-green-500 mx-1"
                        // onClick={openModal}
                        onClick={() => handleEditClick(order)}
                      >
                        <PencilIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title="View">
                      <button
                        className="text-blue-500 mx-1"
                        onClick={() => openViewModal(order)}
                      >
                        <EyeIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <button className="text-red-500 mx-1">
                        <TrashBinIcon />
                      </button>
                    </Tooltip>
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
      <InspectionViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        dog={viewInspection}
      />
    </div>
  );
}
