
import React, { useEffect, useState } from "react";
import { useCreateDogbreed, useFetchBreeds, useUpdateDogbreed } from "../../dogsCategory/hooks/useBreed";
import { useLocation } from "react-router-dom";

const DogBreedCreate: React.FC = () => {
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { createNewBreed } = useCreateDogbreed();
  const { updateExistingBreed } = useUpdateDogbreed();
  const { selectedBreed, setSelectedBreed } = useFetchBreeds(); // ✅ assuming this is exposed
  console.log("selected", selectedBreed)
  const location = useLocation();

  const isEditMode = location.state?.mode === "edit";
  useEffect(() => {
    if (selectedBreed) {
      setBreed(selectedBreed?.breed || "");
      console.log("--breedbare", breed, selectedBreed?.breed)
    }
  }, [selectedBreed]);
  // ✅ Populate form if in edit mode
  useEffect(() => {
    if (isEditMode && selectedBreed) {
      setBreed(selectedBreed.breed || "");
    } else {
      setBreed("");
      setSelectedBreed(null); // clear if not editing
    }
  }, [isEditMode, selectedBreed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isEditMode && selectedBreed?.id) {
        await updateExistingBreed(Number(selectedBreed.id), { breed });
        setMessage("Breed updated successfully!");
      } else {
        await createNewBreed({ breed });
        setMessage("Breed created successfully!");
        setBreed(""); // reset field after create
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving breed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
          🐶 {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Dog Breed"
              : "Create Dog Breed"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Breed Name
            </label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="e.g. German Shepherd, Labrador Retriever, Bulldog"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Breed"
                : "Create Breed"}
          </button>

          {message && (
            <div
              className={`text-center mt-4 text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-500"
                }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DogBreedCreate;
