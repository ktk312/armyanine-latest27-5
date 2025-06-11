// src/components/prophylaxis/ProphylaxisRecordForm.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import { useProphylaxis } from "../../components/dogsCategory/hooks/useProphylaxis";
import { useBreedStore } from "../../store/breedStore";
import Select from "../../components/form/Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Label from "../../components/form/Label";
import { FiCalendar } from "react-icons/fi";

export default function ProphylaxisRecordForm() {
  const navigate = useNavigate();
  const { createProphylaxis, isLoading } = useProphylaxis();
  const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();

  const [formData, setFormData] = useState({
    date: "",
    prophylacticDrug: "",
    remarks: "",
    dogId: 1,
    breedId: "",
  });

  const [breedOptions, setBreedOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Fetch all breeds on mount
  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  // Transform breeds into Select options
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBreedChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      breedId: val,
    }));
  };

  const handleDateChange = (dates: Date[]) => {
    if (dates && dates.length > 0) {
      const selectedDate = dates[0];
      const formattedDate = selectedDate.toISOString().slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.prophylacticDrug || !formData.breedId) {
      alert("Date, Drug, and Breed are required.");
      return;
    }
    try {
      await createProphylaxis({
        date: formData.date,
        prophylacticDrug: formData.prophylacticDrug,
        remarks: formData.remarks,
        dogId: formData.dogId,
      });
      navigate("/prophylaxis-view");
    } catch (err) {
      console.error("Failed to create prophylaxis record:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-900 dark:!text-gray-100 mb-8">
        New Prophylaxis Record
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Field */}
        <div className="flex flex-col">
          <Label htmlFor="datePicker" className="mb-2">
            Date <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Flatpickr
              id="datePicker"
              value={formData.date}
              onChange={handleDateChange}
              options={{
                dateFormat: "Y-m-d",
                allowInput: true,
                static: true,
                disableMobile: true,
              }}
              placeholder="Select Date"
              className="
                w-full h-12
                rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                px-4
                text-gray-800 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                shadow-sm
                transition duration-200
                focus:outline-none
                focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-800
                focus:border-transparent
              "
            />
            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <FiCalendar className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </span>
          </div>
        </div>

        {/* Breed Select */}
        <div className="flex flex-col">
          <Label htmlFor="breedSelect" className="mb-2">
            Select Breed <span className="text-red-500">*</span>
          </Label>
          <div className="
            w-full h-12
            rounded-lg
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            shadow-sm
            transition duration-200
            focus-within:ring-2 focus-within:ring-brand-500 dark:focus-within:ring-brand-800
            focus-within:border-transparent
          ">
            <Select
              options={breedOptions}
              placeholder={breedLoading ? "Loading breeds..." : "Select Breed"}
              onChange={handleBreedChange}
              className="w-full h-full bg-transparent px-4 text-gray-800 dark:text-gray-100 focus:outline-none"
            />
          </div>
        </div>

        {/* Prophylactic Drug */}
        <div className="flex flex-col">
          <Label htmlFor="prophylacticDrug" className="mb-2">
            Prophylactic Drug <span className="text-red-500">*</span>
          </Label>
          <input
            type="text"
            name="prophylacticDrug"
            id="prophylacticDrug"
            value={formData.prophylacticDrug}
            onChange={handleChange}
            required
            placeholder="Enter drug name"
            className="
              w-full h-12
              rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              shadow-sm
              transition duration-200
              focus:outline-none
              focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-800
              focus:border-transparent
            "
          />
        </div>

        {/* Remarks (optional) */}
        <div className="flex flex-col">
          <Label htmlFor="remarks" className="mb-2">
            Remarks
          </Label>
          <textarea
            name="remarks"
            id="remarks"
            rows={2}
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Any notes or observations"
            className="
              w-full
              resize-none
              rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              px-4 py-3
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              shadow-sm
              transition duration-200
              focus:outline-none
              focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-800
              focus:border-transparent
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="
              px-6 py-2
              text-gray-700 dark:text-gray-200
              bg-white dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-600
              transition duration-200
            "
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={isLoading}
            className="
              px-6 py-2
              text-white
              bg-brand-600 dark:bg-brand-500
              hover:bg-brand-700 dark:hover:bg-brand-600
              rounded-lg
              shadow-md
              transition duration-200
            "
          >
            {isLoading ? "Saving..." : "Save Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
