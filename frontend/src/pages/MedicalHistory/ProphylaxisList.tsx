// frontend/src/pages/MedicalHistory/Form/ProphylaxisRecordForm.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import DatePicker from "../../components/form/form-elements/components/date-picker";


export default function ProphylaxisRecordForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Store as string (YYYY-MM-DD)
    drug: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", {
      ...formData,
      date: formData.date, // Already formatted as string
    });
    navigate("/medical-history");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 dark:!text-gray-100 mb-6">
        New Prophylaxis Record
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <DatePicker
            title="Date"
            value={formData.date}
            onChange={(date: string) =>
              setFormData((prev) => ({ ...prev, date }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prophylactic Drug
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
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            placeholder="Any notes or observations"
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
