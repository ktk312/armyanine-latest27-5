import { useEffect } from "react";
import Button from "../ui/button/Button";
import { EyeIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../assets/icons"; // Optional: for New button
import { useNavigate } from "react-router-dom";
import { useTraining } from "../dogsCategory/hooks/useTraining";
import { Tooltip } from "@mui/material";

// Dummy data – replace with API response or context state
export const performanceMetrics = [
  "Intelligence",
  "Willingness",
  "Energy",
  "Sensitivity",
  "Aggression",
] as const;

export type PerformanceMetric = typeof performanceMetrics[number];

export type Ratings = Record<PerformanceMetric, string>;

export interface TrainingRecord {
  id: number;
  trainerName: string;
  trainingCategory: string;
  trainingStartedOn: string;
  trainingCompleted: string;
  performance: string;
  intelligence: string;
  willingness: string;
  energy: string;
  sensitivity: string;
  ratings: Ratings;
}
export default function TrainingListView() {
  const navigate = useNavigate();
  const {
    trainingRecords,
    isLoading,
    error,
    getAllTraining,
    setSelectedTraining,
    deleteTraining
  } = useTraining();

  // Fetch records on component mount
  useEffect(() => {
    getAllTraining();
  }, [getAllTraining]);

  const handleNew = () => {
    navigate("/create-training-record");
  };

  const handleEditClick = (selectedTraining: any) => {
    // Set the selected stud certificate in the store
    setSelectedTraining(selectedTraining);

    // Navigate to the inspection form page
    navigate("/create-training-record");
  };

   const handleDelete = async (id: number) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this training record?");
  if (!confirmDelete) return;

  await deleteTraining((id));
  alert("Deleted Successfully")
};



  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">Training Records</h2>
        <Button
          size="sm"
          variant="primary"
          onClick={handleNew}
          endIcon={<PlusIcon className="h-5 w-5" />}
          className="transition-transform hover:scale-105"
        >
          New
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-6 py-6">
        {isLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Failed to load records</div>
        ) : trainingRecords.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">No training records found.</div>
        ) : (
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Trainer</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                {performanceMetrics.map((metric) => (
                  <th key={metric} className="px-4 py-3">
                    {metric}
                  </th>
                ))}
                <th className="px-4 py-3">Actions</th>

              </tr>
            </thead>
            <tbody>
              {trainingRecords.map((record, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ${index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                    } hover:bg-blue-50 dark:hover:bg-blue-900`}
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainerName}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingCategory}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingStartedOn}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.trainingCompleted}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.intelligence}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.willingness}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.energy}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.sensitivity}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                    {record?.aggression}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        // onClick={() => handleView(record.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label={`View training record with ID ${record.id}`}
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                       <Tooltip title="Edit">
                      <button
                        onClick={() => handleEditClick(record)}
                        className="text-green-500 hover:text-green-700"
                        aria-label={`Edit training record with ID ${record.id}`}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      </Tooltip>
                       <Tooltip title="Remove">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete training record with ID ${record.id}`}
                      >
                        <TrashBinIcon className="h-5 w-5" />
                      </button>
                      </Tooltip>
                    </div>
                  </td>

                  {/* {performanceMetrics.map((metric) => (
                  <td
                    key={metric}
                    className="px-4 py-3 text-gray-900 dark:text-gray-100"
                  >
                     {(record as TrainingRecord).ratings[metric] ?? "-"}

                  </td>
                ))} */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
