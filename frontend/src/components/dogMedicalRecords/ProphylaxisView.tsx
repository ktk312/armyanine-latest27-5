import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Button from "../ui/button/Button";
import {
  PlusIcon,
  PencilIcon,
  TrashBinIcon,
  EyeIcon,
} from "../../assets/icons";
import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";

// Define a type for the prophylaxis record
interface ProphylaxisRecord {
  id: number;
  date: string;
  prophylacticDrug: string;
  remarks: string;
}

const headers = ["Date", "Prophylactic Drug", "Remarks", "Actions"];

export default function ProphylaxisView() {
  const navigate = useNavigate();
  const {
    prophylaxisRecords = [],
    isLoading,
    error,
    getAllProphylaxis,
    deleteProphylaxis,
    setSelectedProphylaxis

  } = useProphylaxis();

  // Use useCallback to memoize the goToNewPage function
  const goToNewPage = useCallback(() => {
    navigate("/create-prophylaxis");
  }, [navigate]);


  //handle to delete
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Prophylaxis record?");
    if (!confirmDelete) return;

    await deleteProphylaxis((id));
    alert("Deleted Successfully")
  };


  // Use useCallback to memoize the openViewModal function
  const openViewModal = useCallback((record: ProphylaxisRecord): void => {
    alert(
      `Date: ${record.date}\nProphylactic Drug: ${record.prophylacticDrug}\nRemarks: ${record.remarks}`
    );
  }, []);

  // Function to handle edit
  const handleEditClick = (selectedVaccination: any) => {
    // Set the selected stud certificate in the store
    setSelectedProphylaxis(selectedVaccination);

    // Navigate to the inspection form page
    navigate("/create-prophylaxis");
  };

  useEffect(() => {
    getAllProphylaxis();
  }, [getAllProphylaxis]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Header with Title and New Button */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">
          Prophylaxis List
        </h2>
        <Button
          size="sm"
          variant="primary"
          endIcon={<PlusIcon className="h-5 w-5" />}
          onClick={goToNewPage}
          className="transition-transform hover:scale-105"
        >
          New
        </Button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {prophylaxisRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No prophylaxis records found.
                </td>
              </tr>
            ) : (
              prophylaxisRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.prophylacticDrug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.remarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center">
                      {/* View Button */}
                      <Tooltip title="View Prophylaxis">
                        <button
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => openViewModal(record)}
                          aria-label="View Prophylaxis"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      {/* Edit Button */}
                      <Tooltip title="Edit Prophylaxis">
                        <button
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => handleEditClick(record)} // Use handleEdit
                          aria-label="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      {/* Delete Button */}
                      <Tooltip title="Remove">
                        <button
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                          onClick={() => handleDelete(record.id)}
                          aria-label="Delete Prophylaxis"
                        >
                          <TrashBinIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
