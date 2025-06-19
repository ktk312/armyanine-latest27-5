import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
// import Badge from "../ui/badge/Badge";
import {
  TrashBinIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
} from "../../assets/icons";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import { useNavigate } from "react-router";
import {
  useDeleteStudCertificate,
  useFetchStudCertificate,
} from "./hooks/useStudCertificate";
import { formatDate } from "../../utils/utils";
import { Tooltip } from "@mui/material";
import { StudViewModal } from "../ui/modal/dogModals/studViewModal";
import { useStudCertificateStore } from "../../store/stud-certificate-store";

const ITEMS_PER_PAGE = 5;

export default function StudCertificate() {
  const [filters, setFilters] = useState({
    id: "",
    sireName: "",
    damName: "",
    breedName: "",
    matingDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, studCertificate, setSelectedStudCertificate } =
    useFetchStudCertificate();
  const {
    deleteStudCertificate,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteStudCertificate(); // Added this hook
  const [viewDog, setViewDog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openViewModal = (dog: any) => {
    setViewDog(dog);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewDog(null);
  };

  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset pagination on filter change
  };

  const filteredData = studCertificate.filter((order) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters]
        .toLowerCase()
        .trim();
      if (!filterValue) return true;

      let fieldValue = "";
      switch (key) {
        case "id":
          fieldValue = order.id.toString();
          break;
        case "sireName":
          fieldValue = order.sire.dogName.toLowerCase();
          break;
        case "damName":
          fieldValue = order.dam.dogName.toLowerCase();
          break;
        case "breedName":
          fieldValue = order.breed.breed.toLowerCase();
          break;
        case "matingDate":
          fieldValue = order.matingDate.toLowerCase();
          break;
        default:
          fieldValue =
            order[key as keyof typeof order]?.toString().toLowerCase() || "";
      }
      return fieldValue.includes(filterValue);
    })
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNewPage = () => {
    const { setSelectedStudCertificate } = useStudCertificateStore.getState(); // ✅ Access store directly

    setSelectedStudCertificate(null);
    navigate("/create-stud-certificate"); // Change the path accordingly
  };

  // const assignMicrochip = () => {
  //     navigate("/form-elements"); // Change the path accordingly
  // };

  const handleEditClick = (selectedStudCertificate: any) => {
    // Set the selected stud certificate in the store
    setSelectedStudCertificate(selectedStudCertificate);

    // Navigate to the inspection form page
    navigate("/litter-inspection");
  };
  const handleDeleteClick = async (id: string | number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stud certificate?"
    );
    if (confirmDelete) {
      try {
        await deleteStudCertificate(String(id));
        // The store will automatically update the studCertificate list
        if (deleteError) {
          alert("Failed to delete stud certificate: " + deleteError);
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete stud certificate. Please try again.");
      }
    }
  };

  const headers = [
    { label: "S.No", key: "" },
    { label: "SIRE", key: "sireName" },
    { label: "DAM", key: "damName" },
    { label: "MATING DATE", key: "matingDate" },
    { label: "CREATED", key: "" },
    { label: "STATUS", key: "" },
    { label: "ACTIONS", key: "" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white/90">
      <div className="flex justify-between items-center mb-6 p-5">
        <h2 className="text-xl font-semibold">Stud Certificate - List</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
          onClick={goToNewPage}
        >
          <PlusIcon className="w-5 h-5 text-white" /> Create
        </Button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] dark:text-white/90">
            <TableRow>
              {headers.map(({ label, key }, idx) => (
                <TableCell
                  key={idx}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start dark:text-white/90"
                >
                  {label}
                  {key && (
                    <input
                      type="text"
                      placeholder={`Search ${label}`}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="mt-1 w-full border dark:border-white/[0.5] rounded-md p-1 text-sm"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((order, index) => (
              <TableRow
                key={order.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                }
              >
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
                <TableCell className="px-5 py-4 text-start">
                  {formatDate(order?.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={order.status === "Active" ? "success" : "error"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <button
                    className="text-blue-500 mx-1"
                    onClick={() => openViewModal(order)}
                  >
                    <EyeIcon />
                  </button>
                  <button
                    className="text-blue-500 mx-1"
                    onClick={() => handleEditClick(order)}
                  >
                    <PencilIcon />
                  </button>
                  <Tooltip title="Remove">
                    <button
                      className="text-red-500 mx-1"
                      onClick={() => handleDeleteClick(order.id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? (
                        <span className="loading-spinner"></span> // Add your loading spinner
                      ) : (
                        <TrashBinIcon />
                      )}
                    </button>
                  </Tooltip>
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
      {/* View Dog Details Modal */}
      <StudViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        dog={viewDog}
      />
    </div>
  );
}
