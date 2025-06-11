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
import { useFilteredDogs } from "../../components/dogsCategory/hooks/useFetchDogs";

export default function ProphylaxisRecordForm() {
  const [selectedDog, setSelectedDog] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(error)
  const { dogs, loading, } = useFilteredDogs(selectedBreed?.value || "", "")
  console.log(loading)
  const navigate = useNavigate();
  const { createProphylaxis, isLoading, selectedProphylaxis, updateProphylaxis, setSelectedProphylaxis } = useProphylaxis();
  const { breeds, getAllBreeds } = useBreedStore();
  const dogOptions = dogs.map(dog => ({
    value: dog.id.toString(), // or whatever unique identifier your dog has
    label: dog.dogName // or whatever property you want to display as the label
  }));
  const [formData, setFormData] = useState({
    date: "",
    prophylacticDrug: "",
    remarks: "",
    dogId: "",
  });


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


  useEffect(() => {
    if (selectedProphylaxis) {
      const dog = selectedProphylaxis.dog;

      setFormData({
        date: selectedProphylaxis.date.split("T")[0], // Format to yyyy-mm-dd
        prophylacticDrug: selectedProphylaxis.prophylacticDrug.toString(),
        remarks: selectedProphylaxis.remarks,
        dogId: String(selectedProphylaxis.dogId),
      });

      if (dog) {
        setSelectedDog({ value: String(dog.id), label: dog.dogName });
      }
    }
  }, [selectedProphylaxis]);



  // Handle update vaccination
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProphylaxis?.id) {
      setError("No vaccination record selected for update");
      return;
    }

    try {
      const updatedData = {
        dogId: Number(selectedDog?.value), // make sure this is string
        date: new Date(formData.date).toISOString(),
        prophylacticDrug: formData.prophylacticDrug,
        remarks: formData.remarks,
      };
      await updateProphylaxis(selectedProphylaxis?.id, updatedData);
      alert("Updated Successfully");
      // Clear state after update
      setFormData({
        date: "",
        prophylacticDrug: "",
        remarks: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      setSelectedProphylaxis(null); // clear store
      navigate("/prophylaxis-view")
      console.log("prophylaxis record updated successfully");
    } catch (err) {
      setError("Failed to update prophylaxis record");
      console.error("Update error:", err);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log("inside the creation")
    if (!selectedDog?.value) {
      setError("Please select a dog");
      return;
    }

    try {
      const prophylaxisData = {
        dogId: Number(selectedDog.value),
        remarks: formData.remarks,
        date: new Date(formData.date).toISOString(), // Format as ISO string
        prophylacticDrug: formData.prophylacticDrug,
      };

      const response = await createProphylaxis(prophylaxisData);
      console.log("response are", response)

      // Reset form after successful submission
      setFormData({
        date: "",
        remarks: "",
        prophylacticDrug: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);

      // Show success message or redirect
      alert("Prophylaxis record created successfully");
      navigate("/prophylaxis-view")
      console.log("Prophylaxis record created successfully");
    } catch (err) {
      setError("Failed to create Prophylaxis record");
      console.error("Error creating Prophylaxis:", err);
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-900 dark:!text-gray-100 mb-8">
        {selectedProphylaxis ? " Update Prophylaxis Record" : " New Prophylaxis Record"}
      </h1>

      <form onSubmit={selectedProphylaxis ? handleUpdate : handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label>Select Breed <span className="text-red-500">*</span></Label>
            <Select
              options={breedOptions}
              placeholder="Select Breed"
              onChange={(val) => setSelectedBreed({ value: val, label: val })}
              defaultValue={selectedProphylaxis?.dog?.breed?.breed.toString()}            // disabled={!!selectedBreed?.value}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
          <div className="space-y-6">
            <Label>Select Dog <span className="text-red-500">*</span></Label>
            <Select
              options={dogOptions}
              placeholder="Select Dog"
              onChange={(val) => setSelectedDog({ value: val, label: val })}
              defaultValue={selectedProphylaxis?.dog?.dogName.toString()}
            />
          </div>
        </div>
        {/* Date Field */}
        <div className="flex flex-col">
          <Label htmlFor="datePicker" className="mb-2">
            Date <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Flatpickr
              id="datePicker"
              value={formData.date}
              defaultValue={selectedProphylaxis?.date}
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
            defaultValue={selectedProphylaxis?.prophylacticDrug}
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
            defaultValue={selectedProphylaxis?.remarks}
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
            {selectedProphylaxis ? "Update Record" : "Save Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
