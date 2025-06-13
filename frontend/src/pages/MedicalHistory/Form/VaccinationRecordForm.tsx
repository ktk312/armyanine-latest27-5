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
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(error)
  const { dogs } = useFilteredDogs(selectedBreed?.value || "", "");
  const { createVaccination, selectedVaccination, setSelectedVaccination, updateVaccination } = useVaccination();
  const navigate = useNavigate();

  const dogOptions = dogs.map((dog) => ({
    value: dog.id.toString(),
    label: dog.dogName,
  }));

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const { breeds, getAllBreeds } = useBreedStore();

  // Populate breed options
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

  // Handle edit mode or reset
  useEffect(() => {
    if (selectedVaccination) {
      const { age, vaccine, dueDate, givenDate, batchNo, vetSign, dog, dogId } = selectedVaccination;

      setFormData({
        age: age.toString(),
        vaccine,
        dueDate: dueDate.split("T")[0],
        givenDate: givenDate.split("T")[0],
        batchNo: batchNo.toString(),
        vetSign,
        dogId,
      });

      if (dog) {
        setSelectedDog({ value: dog.id.toString(), label: dog.dogName });
        if (dog.breed) {
          setSelectedBreed({ value: dog.breed.id.toString(), label: dog.breed.breed });
        }
      }
    } else {
      // Clear form for create mode
      setFormData({
        age: "",
        vaccine: "",
        dueDate: "",
        givenDate: "",
        batchNo: "",
        vetSign: "",
        dogId: "",
      });
      setSelectedDog(null);
      setSelectedBreed(null);
    }
  }, [selectedVaccination]);

  // Reset selected dog when breed changes only in create mode
  useEffect(() => {
    if (!selectedVaccination) {
      setSelectedDog(null);
    }
  }, [selectedBreed]);

  // Clear store when component unmounts
  useEffect(() => {
    return () => {
      setSelectedVaccination(null);
    };
  }, [setSelectedVaccination]);

  // Submit handlers
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVaccination?.id) {
      setError("No vaccination record selected for update");
      return;
    }

    try {
      const updatedData = {
        dogId: selectedDog?.value || "",
        age: formData.age,
        vaccine: formData.vaccine,
        dueDate: new Date(formData.dueDate).toISOString(),
        givenDate: new Date(formData.givenDate).toISOString(),
        batchNo: formData.batchNo,
        vetSign: formData.vetSign,
      };

      await updateVaccination(selectedVaccination.id.toString(), updatedData);
      alert("Updated Successfully");

      setSelectedVaccination(null);
      navigate("/vaccination-view");
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
        dogId: selectedDog.value,
        age: formData.age,
        vaccine: formData.vaccine,
        dueDate: new Date(formData.dueDate).toISOString(),
        givenDate: new Date(formData.givenDate).toISOString(),
        batchNo: formData.batchNo,
        vetSign: formData.vetSign,
      };

      await createVaccination(vaccinationData);
      alert("Created Successfully");

      setFormData({
        age: "",
        vaccine: "",
        dueDate: "",
        givenDate: "",
        batchNo: "",
        vetSign: "",
        dogId: "",
      });
      setSelectedDog(null);
      setSelectedBreed(null);
      navigate("/vaccination-view");

    } catch (err) {
      setError("Failed to create vaccination record");
      console.error("Create error:", err);
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
  console.log("selcted breed and dog are", selectedDog, selectedBreed)
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
        {!selectedVaccination && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
              <Label>Select Breed <span className="text-red-500">*</span></Label>
              <Select
                options={breedOptions}
                placeholder="Select Breed"
                onChange={(val) => {
                  const selected = breedOptions.find((b) => b.value.toString() === val);
                  if (selected) setSelectedBreed(selected);
                }}

              />
            </div>
          </div>
        )}

        {!selectedVaccination && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
            <div className="space-y-6">
              <Label>Select Dog <span className="text-red-500">*</span></Label>
              <Select
                options={dogOptions}
                placeholder="Select Dog"
                onChange={(val) => {
                  const selected = dogOptions.find((d) => d.value.toString() === val);
                  if (selected) setSelectedDog(selected);
                }}

              />
            </div>
          </div>
        )}


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

