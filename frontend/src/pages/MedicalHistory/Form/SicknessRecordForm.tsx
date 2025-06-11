// frontend/src/pages/MedicalHistory/Form/DewormingRecordForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button/Button";

export default function SicknessRecordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    drug: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    navigate("/medical-history");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:!text-gray-100 mb-6">
        New Deworming Record
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
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
            Veterinarian Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter vet's name"
            className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary">Save Record</Button>
        </div>
      </form>
    </div>
  );
}
