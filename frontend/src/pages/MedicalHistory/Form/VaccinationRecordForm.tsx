import React, { useState } from "react";
import Button from "../../../components/ui/button/Button";

const VaccinationRecordForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    vaccine: "",
    dateDue: "",
    dateGiven: "",
    batchNo: "",
    vetSign: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save the data (e.g., API call or state update)
    console.log("Submitted Data:", formData);
  };

  const fields = [
    { key: "age", label: "Age", type: "text", placeholder: "e.g. 3 months" },
    { key: "vaccine", label: "Vaccine", type: "text", placeholder: "e.g. Rabies" },
    { key: "dateDue", label: "Date Due", type: "date" },
    { key: "dateGiven", label: "Date Given", type: "date" },
    { key: "batchNo", label: "Batch No", type: "text", placeholder: "e.g. RB-203" },
    { key: "vetSign", label: "Vet Sign", type: "text", placeholder: "e.g. Dr. Khan" },
  ];

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
          Add Vaccination Record
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
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
            aria-label="Submit new vaccination record"
          >
            Save Record
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VaccinationRecordForm;
