import { useState } from "react";
import Button from "../ui/button/Button";
import { PlusIcon } from "../../assets/icons"; // Optional: for New button
import { useNavigate } from "react-router-dom";

// Dummy data – replace with API response or context state
type Ratings = Record<PerformanceMetric, string>;

const dummyTrainingData = [
  {
    trainerName: "John Doe",
    trainingStartedOn: "2025-06-01",
    trainingCompletedOn: "2025-06-10",
    trainingCategory: "Obedience",
    ratings: {
      Intelligence: "Very Good",
      Willingness: "Good",
      Energy: "Fair",
      Sensitivity: "Good",
      Aggression: "Poor",
    } as Ratings,
  },
  {
    trainerName: "Emily Smith",
    trainingStartedOn: "2025-05-20",
    trainingCompletedOn: "2025-06-01",
    trainingCategory: "Guard",
    ratings: {
      Intelligence: "Good",
      Willingness: "Good",
      Energy: "Very Good",
      Sensitivity: "Fair",
      Aggression: "Very Good",
    } as Ratings,
  },
];

const performanceMetrics = [
  "Intelligence",
  "Willingness",
  "Energy",
  "Sensitivity",
  "Aggression",
] as const;

type PerformanceMetric = typeof performanceMetrics[number];

export default function TrainingListView() {
  const [records] = useState(dummyTrainingData);

  const navigate = useNavigate();
  const handleNew = () => {
    navigate("/create-training-record");
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
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-blue-900`}
              >
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {record.trainerName}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {record.trainingCategory}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {record.trainingStartedOn}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {record.trainingCompletedOn}
                </td>
                {performanceMetrics.map((metric) => (
                  <td
                    key={metric}
                    className="px-4 py-3 text-gray-900 dark:text-gray-100"
                  >
                    {record.ratings[metric]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
