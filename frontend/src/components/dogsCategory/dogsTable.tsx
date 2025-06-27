import { useEffect, useState } from "react";
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
import { SoldDogsListModal } from "../ui/modal/dogModals/soldDogsModal";
import { LoanDogListModal } from "../ui/modal/dogModals/loanDogModal";
import { Tooltip } from "@mui/material";
import { useFetchDogs } from "./hooks/useFetchDogs";
import { useSoldDog } from "./hooks/useSoldDog";
import { useLoanDogs } from "./hooks/useLoanDogs";
import { useTransferredDog } from "./hooks/useTransferredDog";
import { useDeadDog } from "./hooks/useDeadDogs";
import { TransferDogsListModal } from "../ui/modal/dogModals/transferDogModal";
import { StandingDogListModal } from "../ui/modal/dogModals/standingDog";
import { useStandingDog } from "./hooks/useStandingDog";

import { useCndDogs } from "./hooks/useCndDogs";
import { useCnsDogs } from "./hooks/useCnsDogs";


import { DogDetailsModal } from "../ui/modal/dogModals/dogProfileModal";
import { useBreedStore } from "../../store/breedStore";
import { Breed, Dog } from "./types/dog";
import { BreedModal } from "../ui/modal/dogModals/breedModal";
import { useSiresAndDamsByBreed } from "./hooks/useSireAndDam";
import { DeadDogsListModal } from "../ui/modal/dogModals/deadDogsModal";
import { CNDDogsListModal } from "../ui/modal/dogModals/cndDogsModal";
import { CNSDogsListModal } from "../ui/modal/dogModals/cnsDogModal";

const ITEMS_PER_PAGE = 5;

export default function BasicTableOne() {
  // const [activeIndex, setActiveIndex] = useState<null | number>(null);
  // New
  const [activeModalType, setActiveModalType] = useState<string | null>(null);
  const handleCloseModal = () => setActiveModalType(null);
  const navigate = useNavigate();

  const { dogs, loading, error, setSelectedDog } = useFetchDogs();

  const { totalSoldDog } = useSoldDog();
  const { totalLoanDog } = useLoanDogs();
  const { totalTransferredDog } = useTransferredDog();
  const { totalDeadDog } = useDeadDog();
  const { totalStandingDog } = useStandingDog();
  const { totalCnd } = useCndDogs();
  const { totalCns } = useCnsDogs();
  const { breeds, getAllBreeds } = useBreedStore();



  const [activeBreedModal, setActiveBreedModal] = useState<{
    isOpen: boolean;
    breedName: string;
    breedId: number;
  }>({ isOpen: false, breedName: "", breedId: 0 });

  // When opening the modal:
  // const handleOpenBreedModal = (breed: Breed) => {
  //   setActiveBreedModal({
  //     isOpen: true,
  //     breedName: breed.name,
  //     breedId: breed.id
  //   });
  // };

  // Fetch sires and dams for the specific breed
  const { sires, dams } = useSiresAndDamsByBreed(activeModalType?.split('-')[1] ?? '');
  console.log("Active Breed Modal id :", activeBreedModal.breedId);

  console.log("Sires:", sires);
  console.log("Dams:", dams);



  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        await getAllBreeds();
      } catch (err) {
        console.error("Error fetching breeds:", err);
      }
    };
    fetchBreeds();
  }, [getAllBreeds]);

  const calculateBreedCount = (breedId: number, dogs: Dog[]): number => {
    return dogs.reduce((count, dog) =>
      dog.breedId === breedId ? count + 1 : count,
      0);
  };


  console.log("Breeds:", breeds);
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

  const breedStatistics = breeds.map(breed => ({
    label: breed.breed, // Using the 'breed' property from your response
    value: calculateBreedCount(breed.id, dogs), // You'll need to get the count from your backend or calculate it
    modalType: `breed-${breed.id}`, // Create unique modal type based on breed ID
    type: 'breed' as const,
    id: breed.id
  }));


  const specialStatistics = [

    { label: "Standing Dogs", value: totalStandingDog, modalType: "Standing" },
    { label: "Sold Dogs", value: totalSoldDog, modalType: "Sold" },
    { label: "Loaned Dogs", value: totalLoanDog, modalType: "Loaned" },
    {
      label: "Issued Dogs",
      value: totalTransferredDog,
      modalType: "Transferred",
    },
    {
      label: "Deaths",
      value: totalDeadDog,
      modalType: "Dead",
    },
    {
      label: "C&D",
      value: totalCnd,
      modalType: "C&D",
    }, {
      label: "C&S",
      value: totalCns,
      modalType: "C&S",
    },
  ];




  const dogStatistics = [
    // ...breeds.map(breed => ({
    //   label: breed.breed,
    //   value: 0,
    //   modalType: `breed-${breed.id}`,
    //   type: 'breed' as const,
    //   id: breed.id
    // })),
    ...breedStatistics,
    ...specialStatistics // Your existing special categories
  ];
  //   {
  //     label: "Labrador Retriever",
  //     value: totalLabradorRetriever,
  //     modalType: "Labrador",
  //   },
  //   { label: "Belgian Malinois", value: totalBelgianMalinois, modalType: "Belgian" },
  //   { label: "German Shepherd", value: total, modalType: "germanShepherd" },
  //   { label: "Standing Dogs", value: totalStandingDog, modalType: "Standing" },
  //   { label: "Sold Dogs", value: totalSoldDog, modalType: "Sold" },
  //   { label: "Loaned Dogs", value: totalLoanDog, modalType: "Loaned" },
  //   {
  //     label: "Transferred Dogs",
  //     value: totalTransferredDog,
  //     modalType: "Transferred",
  //   },





  const [filters, setFilters] = useState({
    id: "",
    name: "",
    sex: "",
    KP: "",
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

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNewPage = () => {
    navigate("/form-elements");
  };



  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 p-6">
          {dogStatistics.map((stat, index) => (
            <div
              key={index}
              onClick={() => setActiveModalType(stat.modalType)}
              className="cursor-pointer rounded-xl bg-gray-50 p-5 text-center shadow-sm transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                {stat.label}
              </h3>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </p>
            </div>
          ))}

          {activeModalType && (
            <>
              {/* Dynamic Breed Modal */}
              {activeModalType.startsWith('breed-') && (
                (() => {
                  // Debugging logs - keep these temporarily
                  const breedId = parseInt(activeModalType.split('-')[1]);
                  const currentBreed = breeds.find(b => b.id === breedId);
                  // const sires = useSiresAndDamsByBreed(breedId.toString()).sires;
                  // const dams = useSiresAndDamsByBreed(breedId.toString()).dams;

                  // console.log('--- Debugging Breed Modal ---');
                  // console.log('Active Breed ID:', breedId);
                  // console.log('All Sires:', sires);
                  // console.log('All Dams:', dams);
                  // console.log('Filtered Sires:', sires.filter(s => s.breedId === breedId));
                  // console.log('Filtered Dams:', dams.filter(d => d.breedId === breedId));
                  // console.log('Current Breed:', currentBreed);

                  return (
                    <BreedModal
                      isOpen={true}
                      onClose={handleCloseModal}
                      breedName={currentBreed?.breed || `Breed ${breedId}`}
                      sires={sires.filter(sire => {
                        const match = sire.breedId === breedId;
                        if (!match) {
                          console.log('Sire excluded:', sire, 'BreedId:', sire.breedId, 'Expected:', breedId);
                        }
                        return match;
                      })}
                      dams={dams.filter(dam => {
                        const match = dam.breedId === breedId;
                        if (!match) {
                          console.log('Dam excluded:', dam, 'BreedId:', dam.breedId, 'Expected:', breedId);
                        }
                        return match;
                      })}
                    />
                  );
                })()
              )}

              {/* Special Category Modals */}
              {activeModalType === "Standing" && (
                <StandingDogListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "Sold" && (
                <SoldDogsListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "Loaned" && (
                <LoanDogListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "Transferred" && (
                <TransferDogsListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "Dead" && (
                <DeadDogsListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "C&D" && (
                <CNDDogsListModal isOpen={true} onClose={handleCloseModal} />
              )}
              {activeModalType === "C&S" && (
                <CNSDogsListModal isOpen={true} onClose={handleCloseModal} />
              )}
            </>
          )}
        </div>

        <div className="flex justify-between items-center px-6 mb-6 text-gray-900 dark:text-gray-100">
          <h2 className="text-xl font-semibold">Dogs - List</h2>
          <Button
            size="sm"
            variant="primary"
            endIcon={<PlusIcon className="h-5 w-5" />}
            onClick={goToNewPage}
          >
            New
          </Button>
        </div>

        <div className="max-w-full overflow-x-auto px-6 pb-6">
          {loading ? (
            <p className="text-center py-6 text-gray-700 dark:text-gray-300">
              Loading dogs...
            </p>
          ) : error ? (
            <p className="text-center py-6 text-red-600 dark:text-red-400">
              {error}
            </p>
          ) : (
            <Table className="border-collapse">
              <TableHeader className="border-b border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-200">
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
                        {header !== "ACTIONS" && header != "S.No" && (
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
                {paginatedData.map((dog, index) => (
                  <TableRow
                    key={dog?.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }
                  >
                    <TableCell className="px-5 py-4 text-left text-gray-900 dark:text-gray-100">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-left text-gray-900 dark:text-gray-100">
                      {dog?.dogName}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-left text-gray-900 dark:text-gray-100">
                      {dog?.KP}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">
                      {(dog?.sex ?? "").charAt(0).toUpperCase() + (dog?.sex ?? "").slice(1)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">
                      {dog?.microchip?.chipId}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left">
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
                    <TableCell className="px-4 py-3 text-left">
                      <Tooltip title="View Dog">
                        <button
                          className="text-blue-500 mx-1 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => openViewModal(dog)}
                          aria-label="View Dog"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Edit Dog">
                        <button
                          className="text-blue-500 mx-1 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => {
                            setSelectedDog(dog);
                            navigate("/form-elements");
                          }}
                          aria-label="Edit Dog"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 text-gray-900 dark:text-gray-200">
            <button
              className="rounded border border-gray-400 bg-white px-3 py-1 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev: number) => Math.max(prev - 1, 1))
              }
            >
              Previous
            </button>
            <span className="text-sm font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="rounded border border-gray-400 bg-white px-3 py-1 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
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

      <DogDetailsModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        dog={viewDog}
      />
    </>
  );
}
