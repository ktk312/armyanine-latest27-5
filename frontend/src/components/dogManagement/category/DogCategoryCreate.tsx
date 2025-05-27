import React, { useEffect, useState } from "react";
import { useCreateDogcategory, useFetchDogsCategory } from "../../dogsCategory/hooks/useFetchCategory";
import { updateDogCategory } from "../../dogsCategory/api/dogsApi";

const DogCategoryCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);


  const { createNewDog} = useCreateDogcategory();
 const {selectedCategory} = useFetchDogsCategory();

 useEffect(() => {
  if (selectedCategory?.name) {
    setName(selectedCategory.name);
  }
}, [selectedCategory]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);

  try {
    if (selectedCategory) {
      const payload = { name };
      await updateDogCategory(String(selectedCategory.id), payload);

      setMessage("Category updated successfully!");
    } else {
      await createNewDog({ name });
      setMessage("Category created successfully!");
    }
    setName(""); // Clear input after both create and update
  } catch (err) {
    setMessage("Error saving category.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-all duration-300">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
          🐶   {loading
    ? selectedCategory?.id
      ? "Updating..."
      : "Creating..."
    : selectedCategory?.id
    ? "Update New Dog Category"
    : "Create New Dog Category"} 
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Category Name
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="e.g. Purebred, Working, Mixed Breed	
"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {loading
    ? selectedCategory?.id
      ? "Updating..."
      : "Creating..."
    : selectedCategory?.id
    ? "Update Category"
    : "Create Category"}
          </button>

          {message && (
            <div
              className={`text-center mt-4 text-sm font-medium ${
                message.includes("success") ? "text-green-600" : "text-red-500"
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

export default DogCategoryCreate;
