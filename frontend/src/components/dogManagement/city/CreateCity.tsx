import React, { useEffect, useState } from "react";
import Select from "../../form/Select";
import Label from "../../form/Label";
import { useFetchCountries } from "../../dogsCategory/hooks/useCountry";
import { useAddCity, useEditCity, useFetchCities } from "../../dogsCategory/hooks/useCities";
import { useLocation, useNavigate } from "react-router-dom";

interface CityForm {
  id?: number;
  city?: string;
  countryId?: number;
  status?: string;
}

const CreateCity: React.FC = () => {
  const [form, setForm] = useState<CityForm>({ countryId: 0, city: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const location = useLocation();

  const { country, countryLoading } = useFetchCountries();
  const { selectedCity, setSelectedCity } = useFetchCities()
  const { handleAddCity } = useAddCity();
  const { handleEditCity } = useEditCity();

  // Populate form in edit mode
  // useEffect(() => {
  //   if (selectedCity) {
  //     console.log("----inside seected ", selectedCity)
  //     setForm({
  //       id: selectedCity.id,
  //       city: selectedCity.city || "",
  //       countryId: selectedCity.countryId,
  //       status: selectedCity.status,
  //     });
  //   }
  // }, [selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      setForm({
        city: selectedCity.city,
        countryId: selectedCity.countryId,
        status: selectedCity.status,
      });
    } else {
      // Reset form when selectedCity is null (creation mode)
      setForm({
        city: "",
        status: "Active",
      });
    }
  }, [selectedCity]);

  const countryOptions = country.map((c) => ({
    value: c.idCountry.toString(),
    label: c.countryName,
  }));

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCountryChange = (value: string) => {
    setForm({ ...form, countryId: parseInt(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (selectedCity) {
        // Edit
        await handleEditCity(String(selectedCity.id), form);
        setMessage("City updated successfully!");
      } else {
        // Add
        await handleAddCity(form);
        setMessage("City created successfully!");
        setForm({ city: "", countryId: 0 });
      }

      navigate("/cities");
    } catch (err) {
      console.error(err);
      setMessage("Error saving city.");
    } finally {
      setLoading(false);
    }
  };
  const isEditMode = location.state?.mode === "edit";
  useEffect(() => {
    if (selectedCity) {
      setForm({ city: selectedCity.city || "" });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!isEditMode) {
      setSelectedCity(null); // Clear if not editing
      setForm({ city: "" }); // Reset form
    } else if (selectedCity) {
      setForm({ city: selectedCity.city || "" });
    }
  }, [isEditMode, selectedCity]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
          {loading
            ? selectedCity
              ? "Updating..."
              : "Creating..."
            : selectedCity
              ? "Update City"
              : "Add New City"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
              City Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter city name"
            />
          </div>

          {!selectedCity && (
            <div>
              <Label>
                Country <span className="text-red-500">*</span>
              </Label>
              <Select
                options={countryOptions}
                placeholder={countryLoading ? "Loading countries..." : "Select a country"}
                onChange={handleCountryChange}
                defaultValue={form.countryId ? String(form.countryId) : undefined}
                className="dark:bg-dark-900"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {loading
              ? selectedCity
                ? "Updating..."
                : "Creating..."
              : selectedCity
                ? "Update City"
                : "Create City"}
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

export default CreateCity;
