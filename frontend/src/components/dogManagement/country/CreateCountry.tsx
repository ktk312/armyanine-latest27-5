import React, { useEffect, useState } from "react";
import { useAddCountry, useEditCountry, useFetchCountries } from "../../dogsCategory/hooks/useCountry";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";


interface CountryForm {
  countryName: string;
  status?: string;
}

const CreateCountry: React.FC = () => {
  const [form, setForm] = useState<CountryForm>({ countryName: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleAddCountry } = useAddCountry(); // your hook for adding country
  const { selectedCountry, setSelectedCountry } = useFetchCountries()
  console.log("selected coutry are", selectedCountry)
  const { handleEditCountry } = useEditCountry();

  const location = useLocation();
  const isEditMode = location.state?.mode === "edit";
  useEffect(() => {
    if (selectedCountry) {
      setForm({ countryName: selectedCountry.countryName || "" });
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (!isEditMode) {
      setSelectedCountry(null); // Clear if not editing
      setForm({ countryName: "" }); // Reset form
    } else if (selectedCountry) {
      setForm({ countryName: selectedCountry.countryName || "" });
    }
  }, [isEditMode, selectedCountry]);
  console.log("---selected country are ", selectedCountry)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (selectedCountry) {
        // Edit Mode
        await handleEditCountry(selectedCountry.idCountry, form);
        setMessage("Country updated successfully!");
      } else {
        // Add Mode
        await handleAddCountry(form);
        setMessage("Country created successfully!");
        setForm({ countryName: "" });
      }
      setSelectedCountry(null);

      navigate("/countries");
    } catch (err) {
      console.error(err);
      setMessage("Error saving country.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
          {loading
            ? selectedCountry
              ? "Updating..."
              : "Creating..."
            : selectedCountry
              ? "Update Country"
              : "Add New Country"}

        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
              Country Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="countryName"
              value={form.countryName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter country name"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {loading
              ? selectedCountry
                ? "Updating..."
                : "Creating..."
              : selectedCountry
                ? "Update Country"
                : "Add New Country"}
          </button>

          {message && (
            <div
              className={`text-center mt-4 text-sm font-medium ${message.includes("success")
                ? "text-green-600 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
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

export default CreateCountry;
