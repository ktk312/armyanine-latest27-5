import React, { useEffect, useState } from "react";
import Button from "../../../components/ui/button/Button";
import Select from "../../../components/form/Select";
import Label from "../../../components/form/Label";
import { useBreedStore } from "../../../store/breedStore";
import { useFilteredDogs } from "../../../components/dogsCategory/hooks/useFetchDogs";
import { useVaccination } from "../../../components/dogsCategory/hooks/useVaccination";
import { useNavigate } from "react-router";

const VaccinationRecordForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    vaccine: "",
    dueDate: "",
    givenDate: "",
    batchNo: "",
    vetSign: "",
    dogId: "",
  });

  const [selectedDog, setSelectedDog] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(error)
  const { dogs } = useFilteredDogs(selectedBreed?.value || "", "")
  const { createVaccination, selectedVaccination, setSelectedVaccination, updateVaccination } = useVaccination();
  const navigate = useNavigate();
  const dogOptions = dogs.map(dog => ({
    value: dog.id.toString(), // or whatever unique identifier your dog has
    label: dog.dogName // or whatever property you want to display as the label
  }));

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (selectedVaccination) {
      const dog = selectedVaccination.dog;

      setFormData({
        age: selectedVaccination.age.toString(),
        vaccine: selectedVaccination.vaccine,
        dueDate: selectedVaccination.dueDate.split("T")[0], // Format to yyyy-mm-dd
        givenDate: selectedVaccination.givenDate.split("T")[0],
        batchNo: selectedVaccination.batchNo.toString(),
        vetSign: selectedVaccination.vetSign,
        dogId: selectedVaccination.dogId,
      });

      if (dog) {
        setSelectedDog({ value: String(dog.id), label: dog.dogName });
      }
    }
  }, [selectedVaccination]);

  // Handle update vaccination
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVaccination?.id) {
      setError("No vaccination record selected for update");
      return;
    }

    try {
      const updatedData = {
        dogId: selectedDog?.value || "", // make sure this is string
        age: formData.age,
        vaccine: formData.vaccine,
        dueDate: new Date(formData.dueDate).toISOString(),
        givenDate: new Date(formData.givenDate).toISOString(),
        batchNo: formData.batchNo,
        vetSign: formData.vetSign,
      };
      console.log("---before update", updatedData)
      await updateVaccination(selectedVaccination.id.toString(), updatedData);
      alert("Updated Successfully");
      // Clear state after update
      setFormData({
        age: "",
        vaccine: "",
        dueDate: "",
        givenDate: "",
        batchNo: "",
        vetSign: "",
        dogId: ""
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      setSelectedVaccination(null); // clear store
      navigate("/vaccination-view")
      console.log("Vaccination record updated successfully");
    } catch (err) {
      setError("Failed to update vaccination record");
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
      const vaccinationData = {
        dogId: selectedDog.value, // or parseInt(selectedDog.value) if ID is a number
        age: formData.age,
        vaccine: formData.vaccine,
        dueDate: new Date(formData.dueDate).toISOString(), // Format as ISO string
        givenDate: new Date(formData.givenDate).toISOString(),
        batchNo: formData.batchNo,
        vetSign: formData.vetSign,
      };

      const response = await createVaccination(vaccinationData);
      console.log("response are", response)
      // Reset form after successful submission
      setFormData({
        age: "",
        vaccine: "",
        dueDate: "",
        givenDate: "",
        batchNo: "",
        vetSign: "",
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
  const fields = [
    { key: "age", label: "Age", type: "text", placeholder: "e.g. 3 months" },
    { key: "vaccine", label: "Vaccine", type: "text", placeholder: "e.g. Rabies" },
    { key: "dueDate", label: "Due Date", type: "date" },
    { key: "givenDate", label: "Given Date", type: "date" },
    { key: "batchNo", label: "Batch No", type: "text", placeholder: "e.g. RB-203" },
    { key: "vetSign", label: "Vet Sign", type: "text", placeholder: "e.g. Dr. Khan" },
  ];
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


  return (
    <section
      aria-labelledby="vaccination-form-heading"
      className="max-w-3xl mx-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 p-6 space-y-6"
      role="region"
    >
      <header>
        <h2
          id="vaccination-form-heading"
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight"
        >
          {selectedVaccination ? "Update Vaccination Record" : "Add Vaccination Record"}
        </h2>
      </header>

      <form onSubmit={selectedVaccination ? handleUpdate : handleSubmit} className="grid gap-6 sm:grid-cols-2">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <Label>Select Breed <span className="text-red-500">*</span></Label>
            <Select
              options={breedOptions}
              placeholder="Select Breed"
              onChange={(val) => setSelectedBreed({ value: val, label: val })}
              defaultValue={selectedVaccination?.dog?.breed?.breed.toString()}            // disabled={!!selectedBreed?.value}
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
              defaultValue={selectedVaccination?.dog?.dogName.toString()}
            />
          </div>
        </div>

        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key} className="flex flex-col gap-1">
            <label
              htmlFor={key}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {label}
            </label>
            <input
              id={key}
              name={key}
              type={type}
              value={formData[key as keyof typeof formData]}
              placeholder={placeholder}
              onChange={(e) => handleChange(key, e.target.value)}
              className="rounded-md border border-gray-300 dark:border-white/[0.2] bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
        ))}


        <div className="sm:col-span-2">
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            aria-label={selectedVaccination ? "Update vaccination record" : "Submit new vaccination record"}
          >
            {selectedVaccination ? "Update Record" : "Save Record"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VaccinationRecordForm;
