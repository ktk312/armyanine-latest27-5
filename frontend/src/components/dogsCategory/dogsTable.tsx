import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { EyeIcon, PencilIcon, PlusIcon } from "../../assets/icons";
import Badge from "../ui/badge/Badge";
// import { DogRegModal } from "../ui/modal/dogModals/dogRegModal";
import { GermanSheperdListModal } from "../ui/modal/dogModals/germanShepherdModal";
import { SoldDogsListModal } from "../ui/modal/dogModals/soldDogsModal";
import { LoanDogListModal } from "../ui/modal/dogModals/loanDogModal";
import { Tooltip } from "@mui/material";
import { useFetchDogs } from "./hooks/useFetchDogs";
import { useGermanShepherds } from "./hooks/useGermanShepherd";
import { useLabradorRetriever } from "./hooks/useLabradorRetriever";
import { LabradorRetrieverListModal } from "../ui/modal/dogModals/labradorRetrieverModal";
import { useBulldog } from "./hooks/useBulldogs";
import { BulldogListModal } from "../ui/modal/dogModals/bulldogModal";
// import { BelgianMalinoisListModal } from "../ui/modal/dogModals/belgianMalinoisModal";
// import { useBelgianMalinois } from "./hooks/useBelgianMalinois";
import { useSoldDog } from "./hooks/useSoldDog";
import { useLoanDogs } from "./hooks/useLoanDogs";
import { TransferDogsListModal } from "../ui/modal/dogModals/transferDogModal";
import { useTransferredDog } from "./hooks/useTransferredDog";
import { StandingDogListModal } from "../ui/modal/dogModals/standingDog";
import { useStandingDog } from "./hooks/useStandingDog";
import { DogDetailsModal } from "../ui/modal/dogModals/dogProfileModal";
// import { deleteDogById } from "./api/dogsApi";

const ITEMS_PER_PAGE = 5;

export default function BasicTableOne() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const handleCloseModal = () => setActiveIndex(null);
  const navigate = useNavigate();

  // Fetching dogs from Zustand store
  const { dogs, loading, error, setSelectedDog } = useFetchDogs(); // 👈 Use setDogs from Zustand
  const { total } = useGermanShepherds();
  const { totalLabradorRetriever } = useLabradorRetriever();
  const { totalBulldog } = useBulldog();
  // const { totalBelgianMalinois } = useBelgianMalinois();
  const { totalSoldDog } = useSoldDog();
  const { totalLoanDog } = useLoanDogs();
  const { totalTransferredDog } = useTransferredDog();
  const { totalStandingDog } = useStandingDog();

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

  const dogStatistics = [
    { label: "Labrador Retriever", value: totalLabradorRetriever, modalType: "Labrador" },
    { label: "Belgian Malinois", value: totalBulldog, modalType: "Belgian" },
    { label: "German Shepherd", value: total, modalType: "germanShepherd" },
    // { label: "Bull Dogs", value: totalBulldog, modalType: "Bulldog" },

    { label: "Standing Dogs", value: totalStandingDog, modalType: "Standing" },
    { label: "Sold Dogs", value: totalSoldDog, modalType: "Sold" },
    { label: "Loaned Dogs", value: totalLoanDog, modalType: "Loaned" },
    { label: "Transferred Dogs", value: totalTransferredDog, modalType: "Transferred" },
  ];

  const [filters, setFilters] = useState({
    name: "",
    sex: "",
    KP: "",
    microchip: "",
    status: "",
  });
  const headerToKeyMap: Record<string, keyof typeof filters> = {
    "DOG NAME": "name",
    "ACC NO": "KP",
    "SEX": "sex",
    "MICROCHIP": "microchip",
    "STATUS": "status",
  };
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset pagination on filter change
  };

  const filteredData = dogs.filter((dog) => {
    return Object.entries(filters).every(([filterKey, filterValue]) => {
      const value = filterValue.toLowerCase().trim();
      if (!value) return true;

      switch (filterKey) {
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

  const goToNewPage = () => {
    navigate("/form-elements"); // Change the path accordingly
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 p-5">
          {dogStatistics.map((stat, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="p-5 border rounded-xl text-center bg-gray-100 dark:bg-gray-800 shadow-md"
            >
              <h3 className="font-semibold text-gray-700 dark:text-white">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </p>
            </div>
          ))}

          {activeIndex === 0 && (
            <LabradorRetrieverListModal isOpen={true} onClose={handleCloseModal} />

            // <GermanSheperdListModal isOpen={true} onClose={handleCloseModal} />
          )}
          {activeIndex === 1 && (
            // <BelgianMalinoisListModal isOpen={true} onClose={handleCloseModal} />
            <BulldogListModal isOpen={true} onClose={handleCloseModal} />

            // <LabradorRetrieverListModal isOpen={true} onClose={handleCloseModal} />
          )}
          {activeIndex === 2 && (
            <GermanSheperdListModal isOpen={true} onClose={handleCloseModal} />

          )}
          {/* {activeIndex === 3 && (
            <BelgianMalinoisListModal isOpen={true} onClose={handleCloseModal} />
          )} */}
          {activeIndex === 3 && (
            <StandingDogListModal isOpen={true} onClose={handleCloseModal} />
          )}
          {activeIndex === 4 && (
            <SoldDogsListModal isOpen={true} onClose={handleCloseModal} />
          )}
          {activeIndex === 5 && (
            <LoanDogListModal isOpen={true} onClose={handleCloseModal} />
          )}
          {activeIndex === 6 && (
            <TransferDogsListModal isOpen={true} onClose={handleCloseModal} />
          )}
        </div>
        <div className="flex justify-between items-center mb-6 p-5 text-black dark:text-white">
          <h2 className="text-xl font-semibold">Dogs - List</h2>
          <Button
            size="sm"
            variant="primary"
            endIcon={<PlusIcon className="size-5" />}
            onClick={goToNewPage}
          >
            New
          </Button>
        </div>

        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p className="text-center p-4">Loading dogs...</p>
          ) : error ? (
            <p className="text-center p-4 text-red-500">{error}</p>
          ) : (
            <Table>
              <TableHeader className="border-b border-gray-100 text-gray-800 dark:text-white/90">
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
                      className="px-5 py-3 font-medium text-gray-800 dark:text-white/90 text-start"
                    >
                      {header}
                      {header !== "ACTIONS" && (
                        <input
                          type="text"
                          placeholder={`Search ${header}`}
                          onChange={(e) => {
                            const key = headerToKeyMap[header as keyof typeof headerToKeyMap];
                            if (key) {
                              handleFilterChange(key, e.target.value);
                            }
                          }}
                          className="mt-1 w-full border rounded-md p-1 text-sm"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((dog, index) => (
                  <TableRow
                    key={dog?.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }
                  >
                    <TableCell className="px-5 py-4 text-start text-black dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-black dark:text-white">
                      {dog?.dogName}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-black dark:text-white">
                      {dog?.KP}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-black dark:text-white">
                      {dog?.sex}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-black dark:text-white">
                      {dog?.microchip?.chipId}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge
                        size="sm"
                        color={
                          dog?.status === "Active"
                            ? "success"
                            : dog?.status === "Pending"
                              ? "warning"
                              : "error"
                        }
                      >
                        {dog?.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Tooltip title="Eye">
                        <button className="text-blue-500 mx-1"
                          onClick={() => openViewModal(dog)}

                        >
                          <EyeIcon />
                        </button>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <button
                          className="text-blue-500 mx-1"
                          onClick={() => {
                            setSelectedDog(dog);
                            navigate("/form-elements");
                          }}
                        >
                          <PencilIcon />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              className="px-3 py-1 border rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev: number) => Math.max(prev - 1, 1))
              }
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
                setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Dog Details Modal */}
      <DogDetailsModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        dog={viewDog}
      />
    </>
  );
}
