import { useEffect, useState } from "react";
import Button from "../../../components/ui/button/Button";
import { useTraining } from "../../../components/dogsCategory/hooks/useTraining";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { useFilteredDogs } from "../../../components/dogsCategory/hooks/useFetchDogs";
import { useBreedStore } from "../../../store/breedStore";
import { useNavigate } from "react-router";

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
  const [trainingCompleted, setTrainingCompletedOn] = useState("");
  const [trainingCategory, setTrainingCategory] = useState("");
  const [selectedDog, setSelectedDog] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const { dogs} = useFilteredDogs(selectedBreed?.value || "", "")
  const [error, setError] = useState<string | undefined>(undefined);
   console.log(error)


  const { selectedTraining, updateTraining, createTraining, setSelectedTraining } = useTraining();
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const navigate = useNavigate();
 
  const { breeds, getAllBreeds } = useBreedStore();

  // Get Breed
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        await getAllBreeds();
      } catch (err) {
        setError("Failed to load breeds");
      }
    };
    fetchBreeds();
  }, [getAllBreeds]);

  useEffect(() => {
    if (breeds.length > 0) {
      setBreedOptions(
        breeds.map((breed) => ({
          value: breed.id.toString(),
          label: breed.breed || "",
        }))
      );
    }
  }, [breeds]);
  const handleRatingChange = (metric: string, rating: string) => {
    setRatings((prev) => ({ ...prev, [metric]: rating }));
  };
  const dogOptions = dogs.map(dog => ({
    value: dog.id.toString(), // or whatever unique identifier your dog has
    label: dog.dogName // or whatever property you want to display as the label
  }));
  // Prefill form if selectedTraining is present
  useEffect(() => {
    if (selectedTraining) {
      setTrainerName(selectedTraining.trainerName || "");
      setTrainingStartedOn(selectedTraining.trainingStartedOn?.substring(0, 10) || "");
      setTrainingCompletedOn(selectedTraining.trainingCompleted?.substring(0, 10) || "");
      setTrainingCategory(selectedTraining.trainingCategory || "");

      setRatings({
        Intelligence: selectedTraining.intelligence || "",
        Willingness: selectedTraining.willingness || "",
        Energy: selectedTraining.energy || "",
        Sensitivity: selectedTraining.sensitivity || "",
        Aggression: selectedTraining.aggression || "",
      });

      if (selectedTraining.dog?.breed?.breed) {
        setSelectedBreed({
          value: selectedTraining.dog.breed.breed,
          label: selectedTraining.dog.breed.breed,
        });
      }

      if (selectedTraining.dog?.id && selectedTraining.dog?.dogName) {
        setSelectedDog({
          value: selectedTraining.dog.id.toString(),
          label: selectedTraining.dog.dogName,
        });
      }
    }
  }, [selectedTraining]);

  const handleSave = () => {
    if (!selectedDog || !selectedBreed) {
      alert("Please select both breed and dog.");
      return;
    }

    const payload = {
      dogId: Number(selectedDog.value),
      trainerName,
      trainingStartedOn,
      trainingCompleted,
      trainingCategory,
      intelligence: ratings.Intelligence,
      willingness: ratings.Willingness,
      energy: ratings.Energy,
      sensitivity: ratings.Sensitivity,
      aggression: ratings.Aggression,
    };

    if (selectedTraining?.id) {
      updateTraining(selectedTraining.id, payload);
      alert("Updated Successfully")
      navigate("/training-view")
    } else {
      createTraining(payload);
      alert("Created Successfully")
      navigate("/training-view")
    }
  };

  useEffect(() => {
  if (!selectedTraining) {
    setTrainerName("");
    setTrainingStartedOn("");
    setTrainingCompletedOn("");
    setTrainingCategory("");
    setRatings({});
    setSelectedBreed(null);
    setSelectedDog(null);
  }
}, []);

// Reset selected dog when breed changes only in create mode
  useEffect(() => {
    if (!selectedTraining) {
      setSelectedDog(null);
    }
  }, [selectedBreed]);

  // Clear store when component unmounts
  useEffect(() => {
    return () => {
      setSelectedTraining(null);
    };
  }, [setSelectedTraining]);

  return (
    <section
      className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 overflow-hidden p-6"
      aria-label="Training Records"
      role="region"
      tabIndex={-1}
    >
      {/* Form Inputs for Trainer Information */}
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {!selectedTraining &&(<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label>Select Breed <span className="text-red-500">*</span></Label>
            <Select
              options={breedOptions}
              placeholder="Select Breed"
              onChange={(val) => setSelectedBreed({ value: val, label: val })}
              // defaultValue={selectedTraining?.dog?.breed?.id.toString()}            // disabled={!!selectedBreed?.value}
            />
          </div>
        </div>)}
        {!selectedTraining &&(<div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
          <div className="space-y-6">
            <Label>Select Dog <span className="text-red-500">*</span></Label>
            <Select
              options={dogOptions}
              placeholder="Select Dog"
              onChange={(val) => setSelectedDog({ value: val, label: val })}
              // defaultValue={selectedTraining?.dog?.dogName.toString()}
            />
          </div>
        </div>)}
        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Trainer Name</span>
          <input
            type="text"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            defaultValue={selectedTraining?.trainerName}
            placeholder="Enter trainer name"
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Started On</span>
          <input
            type="date"
            value={trainingStartedOn}
            defaultValue={selectedTraining?.trainingStartedOn}
            onChange={(e) => setTrainingStartedOn(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Completed</span>
          <input
            type="date"
            value={trainingCompleted}
            defaultValue={selectedTraining?.trainingCompleted}
            onChange={(e) => setTrainingCompletedOn(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col text-gray-900 dark:text-gray-100">
          <span className="mb-1 font-semibold">Training Category</span>
          <input
            type="text"
            value={trainingCategory}
            defaultValue={selectedTraining?.trainingCategory}
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
          {selectedTraining ? "Update" : "Save"}

        </Button>
      </div>
    </section>
  );
};

export default TrainingRecordForm;
