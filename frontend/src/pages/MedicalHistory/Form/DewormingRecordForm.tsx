// frontend/src/pages/MedicalHistory/Form/DewormingRecordForm.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { useBreedStore } from "../../../store/breedStore";
import { useFilteredDogs } from "../../../components/dogsCategory/hooks/useFetchDogs";
import { useDeworming } from "../../../components/dogsCategory/hooks/useDeworming";

export default function DewormingRecordForm() {
  const [selectedDog, setSelectedDog] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(error)
  const { dogs } = useFilteredDogs(selectedBreed?.value || "", "")
  const { createDeworming, setSelectedDeworming, selectedDeworming, updateDeworming } = useDeworming();
  console.log("setSelectedDeworming", selectedDeworming)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    drug: "",
    sign: "",
    dogId: ""
  });

  const { breeds, getAllBreeds } = useBreedStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dogOptions = dogs.map(dog => ({
    value: dog.id.toString(), // or whatever unique identifier your dog has
    label: dog.dogName // or whatever property you want to display as the label
  }));

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


  useEffect(() => {
    if (selectedDeworming) {
      const dog = selectedDeworming.dog;

      setFormData({
        dogId: selectedDeworming.dogId.toString(),
        drug: selectedDeworming.drug,
        sign: selectedDeworming.sign, // Format to yyyy-mm-dd
        date: selectedDeworming.date.split("T")[0],
      });

      if (dog) {
        setSelectedDog({ value: String(dog.id), label: dog.dogName });
      }
    }
  }, [selectedDeworming]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("---inisde handle submit")
    if (!selectedDog?.value) {
      setError("Please select a dog");
      return;
    }

    try {
      const vaccinationData = {
        dogId: Number(selectedDog.value),
        drug: formData.drug,
        sign: formData.sign, // Format as ISO string
        date: new Date(formData.date).toISOString(),
      };

      const response = await createDeworming(vaccinationData);
      console.log("response are", response)
      // Reset form after successful submission
      setFormData({
        drug: "",
        sign: "",
        date: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);

      // Show success message or redirect
      console.log("Vaccination record created successfully");
    } catch (err) {
      setError("Failed to create vaccination record");
      console.error("Error creating vaccination:", err);
    }
  };

  // Handle Update Deworming 

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDeworming?.id) {
      setError("No deworming record selected for update");
      return;
    }

    try {
      const updatedData = {
        dogId: Number(selectedDeworming.dogId),
        drug: formData.drug,
        sign: formData.sign, // Format as ISO string
        date: new Date(formData.date).toISOString(),
      };
      console.log("---before update", updatedData)
      await updateDeworming(selectedDeworming?.id, updatedData);
      alert("Updated Successfully");
      // Clear state after update
      setFormData({
        dogId: "",
        drug: "",
        sign: "",
        date: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      setSelectedDeworming(null); // clear store
      navigate("/deworming-view")
      console.log("Deworming record updated successfully");
    } catch (err) {
      setError("Failed to update vaccination record");
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:!text-gray-100 mb-6">
        {selectedDeworming ? "Update Deworming Record" : "New Deworming Record"}
      </h1>
      <form onSubmit={selectedDeworming ? handleUpdate : handleSubmit} className="space-y-5">
         {!selectedDeworming && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label>Select Breed <span className="text-red-500">*</span></Label>
            <Select
              options={breedOptions}
              placeholder="Select Breed"
              onChange={(val) => setSelectedBreed({ value: val, label: val })}
              // defaultValue={selectedDeworming?.dog?.breed?.breed.toString()}            // disabled={!!selectedBreed?.value}
            />
          </div>
        </div>
         )}
         
       {!selectedDeworming &&( <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
          <div className="space-y-6">
            <Label>Select Dog <span className="text-red-500">*</span></Label>
            <Select
              options={dogOptions}
              placeholder="Select Dog"
              onChange={(val) => setSelectedDog({ value: val, label: val })}
              // defaultValue={selectedDeworming?.dog?.dogName.toString()}
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
            Drug
          </label>
          <input
            type="text"
            name="drug"
            value={formData.drug}
            onChange={handleChange}
            required
            placeholder="Enter drug name"
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sign
          </label>
          <input
            type="text"
            name="sign"
            value={formData.sign}
            onChange={handleChange}
            required
            placeholder="Enter vet's name"
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {/* <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button> */}
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            aria-label={selectedDeworming ? "Update Deworming record" : "Submit new Deworming record"}
          >
            {selectedDeworming ? "Update Record" : "Save Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
