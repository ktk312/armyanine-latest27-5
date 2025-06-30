// frontend/src/pages/MedicalHistory/Form/DewormingRecordForm.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { useFilteredDogs } from "../../../components/dogsCategory/hooks/useFetchDogs";
import { useSickness } from "../../../components/dogsCategory/hooks/useSickness";
import { useBreedStore } from "../../../store/breedStore";

export default function SicknessRecordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    diseases: "",
    treatment: "",
    dogId: ""
  });
  const [selectedDog, setSelectedDog] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(error)

  const { dogs } = useFilteredDogs(selectedBreed?.value || "", "")

  const { createSickness, selectedSickness, setSelectedSickness, updateSickness } = useSickness();
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
          label: breed?.breed?.charAt(0).toUpperCase() + (breed?.breed ?? "").slice(1) || "",
        }))
      );
    }
  }, [breeds]);

  const dogOptions = dogs.map(dog => ({
    value: dog.id.toString(), // or whatever unique identifier your dog has
    label: dog.KP + ' - ' + dog.dogName, // or whatever property you want to display as the label
  }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    if (selectedSickness) {
      const dog = selectedSickness.dog;

      setFormData({
        date: selectedSickness.date.split("T")[0], // Format to yyyy-mm-dd
        diseases: selectedSickness.diseases,
        treatment: selectedSickness.treatment,
        dogId: selectedSickness.dogId.toLocaleString(),
      });

      if (dog) {
        setSelectedDog({ value: String(dog.id), label: dog.dogName });
      }
    }
  }, [selectedSickness]);

  // Handle update vaccination
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSickness?.id) {
      setError("No sickness record selected for update");
      return;
    }

    try {
      const updatedData = {
        date: formData.date.split("T")[0], // Format to yyyy-mm-dd
        diseases: formData.diseases,
        treatment: formData.treatment,
        dogId: Number(selectedDog?.value),
      };
      console.log("---before update", updatedData)
      await updateSickness(selectedSickness.id, updatedData);
      alert("Updated Successfully");
      // Clear state after update
      setFormData({
        date: "",
        diseases: "",
        treatment: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      setSelectedSickness(null); // clear store
      navigate("/sickness-view")
      console.log("sickness record updated successfully");
    } catch (err) {
      setError("Failed to update sickness record");
      console.error("Update error:", err);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDog?.value) {
      setError("Please select a dog");
      return;
    }

    try {
      const sicknessData = {
        dogId: Number(selectedDog.value), // or parseInt(selectedDog.value) if ID is a number
        diseases: formData.diseases,
        treatment: formData.treatment,
        date: new Date(formData.date).toISOString(), // Format as ISO string
      };

      const response = await createSickness(sicknessData);
      console.log("response are", response)
      // Reset form after successful submission
      setFormData({
        date: "",
        diseases: "",
        treatment: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      navigate("/sickness-view")

      // Show success message or redirect
      console.log("Sickness record created successfully");
    } catch (err) {
      setError("Failed to create Sickness record");
      console.error("Error creating Sickness:", err);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:!text-gray-100 mb-6">
        {selectedSickness ? " Updatw Sickness Record" : " New Sickness Record"}
      </h1>
      <form onSubmit={selectedSickness ? handleUpdate : handleSubmit} className="space-y-5">
        {!selectedSickness && (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label>Select Breed <span className="text-red-500">*</span></Label>
            <Select
              options={breedOptions}
              placeholder="Select Breed"
              onChange={(val) => setSelectedBreed({ value: val, label: val })}
            // defaultValue={selectedSickness?.dog?.breed?.breed.toString()}            // disabled={!!selectedBreed?.value}
            />
          </div>
        </div>)}
        {!selectedSickness && (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
          <div className="space-y-6">
            <Label>Select Dog <span className="text-red-500">*</span></Label>
            <Select
              options={dogOptions}
              placeholder="Select Dog"
              onChange={(val) => setSelectedDog({ value: val, label: val })}
            // defaultValue={selectedSickness?.dog?.dogName.toString()}
            />
          </div>
        </div>)}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Disease
          </label>
          <input
            type="text"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            required
            placeholder="Enter disease name"
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Treatment Given
          </label>
          <input
            type="text"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            required
            placeholder="Enter given treatment"
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary">{selectedSickness ? "Update Record" : "Save Record"}</Button>
        </div>
      </form>
    </div>
  );
}
