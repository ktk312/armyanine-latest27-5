import { useState } from "react";
import Button from "../../../components/ui/button/Button";

const performanceMetrics = [
  "Intelligence",
  "Willingness",
  "Energy",
  "Sensitivity",
  "Aggression",
];

const ratingOptions = ["Very Good", "Good", "Fair", "Poor"];

const TrainingRecordForm = () => {
  const [trainerName, setTrainerName] = useState("");
  const [trainingStartedOn, setTrainingStartedOn] = useState("");
  const [trainingCompletedOn, setTrainingCompletedOn] = useState("");
  const [trainingCategory, setTrainingCategory] = useState("");

  const [ratings, setRatings] = useState<Record<string, string>>({});

  const goToNewPage = () => {
    alert("Add new training record functionality is not implemented yet.");
  };

  const handleRatingChange = (metric: string, rating: string) => {
    setRatings((prev) => ({ ...prev, [metric]: rating }));
  };

  const handleSave = () => {
    const trainingData = {
      trainerName,
      trainingStartedOn,
      trainingCompletedOn,
      trainingCategory,
      ratings,
    };

    console.log("Saving training data:", trainingData);
    alert("Training data saved! (Check console for details)");
  };

  return (
    <section
      className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 overflow-hidden p-6"
      aria-label="Training Records"
      role="region"
      tabIndex={-1}
    >
      {/* Form Inputs for Trainer Information */}
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Trainer Name</span>
          <input
            type="text"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            placeholder="Enter trainer name"
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Started On</span>
          <input
            type="date"
            value={trainingStartedOn}
            onChange={(e) => setTrainingStartedOn(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Completed</span>
          <input
            type="date"
            value={trainingCompletedOn}
            onChange={(e) => setTrainingCompletedOn(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Category</span>
          <input
            type="text"
            value={trainingCategory}
            onChange={(e) => setTrainingCategory(e.target.value)}
            placeholder="Enter category"
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </form>

      {/* Performance Ratings Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border-separate border-spacing-y-3 text-sm">
          <thead>
            <tr className="text-left text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
              <th className="px-4 py-3 font-semibold uppercase tracking-wide select-none">
                Performance
              </th>
              {ratingOptions.map((opt) => (
                <th
                  key={opt}
                  className="px-4 py-3 font-semibold uppercase tracking-wide select-none text-center"
                >
                  {opt}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {performanceMetrics.map((metric) => (
              <tr
                key={metric}
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">
                  {metric}
                </td>
                {ratingOptions.map((rating) => (
                  <td key={rating} className="px-4 py-3 text-center">
                    {/* 
                      Checkbox acts like a radio button here - only one rating per metric can be selected.
                    */}
                    <input
                      type="checkbox"
                      checked={ratings[metric] === rating}
                      onChange={() => handleRatingChange(metric, rating)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                      aria-label={`${metric} rating: ${rating}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          size="md"
          variant="primary"
          onClick={handleSave}
          aria-label="Save training data"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Save
        </Button>
      </div>
    </section>
  );
};

export default TrainingRecordForm;

//// creating new data through api

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../components/ui/button/Button";
// import { useTraining } from "../../../components/dogsCategory/hooks/useTraining";


// const performanceMetrics = [
//   "Intelligence",
//   "Willingness",
//   "Energy",
//   "Sensitivity",
//   "Aggression",
// ];

// const ratingOptions = ["Very Good", "Good", "Fair", "Poor"];

// export default function TrainingRecordForm() {
//   const [trainerName, setTrainerName] = useState("");
//   const [trainingStartedOn, setTrainingStartedOn] = useState("");
//   const [trainingCompletedOn, setTrainingCompletedOn] = useState("");
//   const [trainingCategory, setTrainingCategory] = useState("");
//   const [ratings, setRatings] = useState<Record<string, string>>({});

//   const { createTraining, isLoading, error: hookError } = useTraining();
//   const navigate = useNavigate();

//   const handleRatingChange = (metric: string, rating: string) => {
//     setRatings((prev) => ({ ...prev, [metric]: rating }));
//   };

//   const handleSave = async () => {
//     try {
//       // Construct payload for API
//       await createTraining({
//         trainerName,
//         trainingStartedOn,
//         trainingCompleted: trainingCompletedOn,
//         trainingCategory,
//         // Map each metric to API fields:
//         performance: ratings["Performance"] || "",
//         intelligence: ratings["Intelligence"] || "",
//         willingness: ratings["Willingness"] || "",
//         energy: ratings["Energy"] || "",
//         sensitivity: ratings["Sensitivity"] || "",
//         aggression: ratings["Aggression"] || "",
//         // TODO: replace with actual dogId selection
//         dogId: 1,
//       });
//       // On success, navigate back to list view
//       navigate("/training-view");
//     } catch (err) {
//       console.error("Failed to create training record", err);
//     }
//   };

//   return (
//     <section
//       className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 overflow-hidden p-6"
//       aria-label="Training Records"
//       role="region"
//       tabIndex={-1}
//     >
//       <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <label className="flex flex-col text-gray-900 dark:text-gray-100">
//           <span className="mb-1 font-semibold">Trainer Name</span>
//           <input
//             type="text"
//             value={trainerName}
//             onChange={(e) => setTrainerName(e.target.value)}
//             placeholder="Enter trainer name"
//             className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="flex flex-col text-gray-900 dark:text-gray-100">
//           <span className="mb-1 font-semibold">Training Started On</span>
//           <input
//             type="date"
//             value={trainingStartedOn}
//             onChange={(e) => setTrainingStartedOn(e.target.value)}
//             className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="flex flex-col text-gray-900 dark:text-gray-100">
//           <span className="mb-1 font-semibold">Training Completed</span>
//           <input
//             type="date"
//             value={trainingCompletedOn}
//             onChange={(e) => setTrainingCompletedOn(e.target.value)}
//             className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>

//         <label className="flex flex-col text-gray-900 dark:text-gray-100">
//           <span className="mb-1 font-semibold">Training Category</span>
//           <input
//             type="text"
//             value={trainingCategory}
//             onChange={(e) => setTrainingCategory(e.target.value)}
//             placeholder="Enter category"
//             className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </label>
//       </form>

//       <div className="overflow-x-auto mb-8">
//         <table className="min-w-full border-separate border-spacing-y-3 text-sm">
//           <thead>
//             <tr className="text-left text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               <th className="px-4 py-3 font-semibold uppercase tracking-wide select-none">
//                 Performance
//               </th>
//               {ratingOptions.map((opt) => (
//                 <th
//                   key={opt}
//                   className="px-4 py-3 font-semibold uppercase tracking-wide select-none text-center"
//                 >
//                   {opt}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {performanceMetrics.map((metric) => (
//               <tr
//                 key={metric}
//                 className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">
//                   {metric}
//                 </td>
//                 {ratingOptions.map((rating) => (
//                   <td key={rating} className="px-4 py-3 text-center">
//                     <input
//                       type="checkbox"
//                       checked={ratings[metric] === rating}
//                       onChange={() => handleRatingChange(metric, rating)}
//                       className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
//                       aria-label={`${metric} rating: ${rating}`}
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {hookError && (
//         <p className="text-red-600 dark:text-red-400 mb-4">{hookError}</p>
//       )}

//       <div className="flex justify-end">
//         <Button
//           size="md"
//           variant="primary"
//           onClick={handleSave}
//           disabled={isLoading}
//           aria-label="Save training data"
//           className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//         >
//           {isLoading ? "Saving..." : "Save"}
//         </Button>
//       </div>
//     </section>
//   );
// }
