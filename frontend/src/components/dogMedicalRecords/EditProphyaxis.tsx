import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useProphylaxis } from "../dogsCategory/hooks/useProphylaxis";
import { ProphylaxisInput } from "../dogsCategory/types/prophylaxis";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import { FiCalendar } from "react-icons/fi";

const EditProphylaxis = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedProphylaxis,
    updateProphylaxis,
    isLoading,
    error,
    selectProphylaxis,
    prophylaxisRecords,
    getAllProphylaxis,
  } = useProphylaxis();

  const [formData, setFormData] = useState<Partial<ProphylaxisInput>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      if (!id) return;
      const recordId = parseInt(id, 10);
      let rec = prophylaxisRecords.find((r) => r.id === recordId);
      if (!rec) {
        await getAllProphylaxis();
        rec = prophylaxisRecords.find((r) => r.id === recordId);
      }
      if (rec) selectProphylaxis(rec);
      else navigate("/prophylaxis-view");
    };
    fetchRecord();
  }, [id, prophylaxisRecords, selectProphylaxis, getAllProphylaxis, navigate]);

  useEffect(() => {
    if (selectedProphylaxis) {
      setFormData({
        date: selectedProphylaxis.date,
        prophylacticDrug: selectedProphylaxis.prophylacticDrug,
        remarks: selectedProphylaxis.remarks,
      });
    }
  }, [selectedProphylaxis]);

  const handleDateChange = (selectedDates: Date[]) => {
    const date = selectedDates[0];
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      setSaveError(null);
      if (!id) {
        setSaveError("Invalid record ID.");
        setSaving(false);
        return;
      }
      try {
        await updateProphylaxis(Number(id), formData);
        navigate("/prophylaxis-view");
      } catch (e: any) {
        setSaveError(e.message || "Update failed.");
      } finally {
        setSaving(false);
      }
    },
    [id, formData, updateProphylaxis, navigate]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-4 rounded-lg shadow-md">
          <strong className="block font-semibold">Error:</strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b dark:border-gray-700">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Edit Prophylaxis
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
            {saveError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <span className="font-medium">Oops!</span>
                <span className="block mt-1">{saveError}</span>
              </div>
            )}

            {/* Datepicker */}
            <div>
              <Label
                htmlFor="datePicker"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date of Treatment <span className="text-red-500">*</span>
              </Label>
              <div className="relative w-full flatpickr-wrapper mt-1">
                <Flatpickr
                  value={formData.date ?? undefined}
                  onChange={handleDateChange}
                  options={{
                    dateFormat: "Y-m-d",
                    allowInput: true,
                    static: true,
                    disableMobile: true,
                  }}
                  placeholder="Select Date"
                  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                />
                {/* If you want to wrap icons, use a span or div */}
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-6 w-6" />
                  {/* <CalenderIcon className="h-6 w-6" /> */}
                </span>
              </div>
            </div>

            {/* Drug */}
            <div>
              <Label
                htmlFor="prophylacticDrug"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Prophylactic Drug
              </Label>
              <Input
                type="text"
                id="prophylacticDrug"
                name="prophylacticDrug"
                placeholder="e.g., Ivermectin"
                value={formData.prophylacticDrug || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    prophylacticDrug: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              />
            </div>

            {/* Remarks fixed-size */}
            <div>
              <Label
                htmlFor="remarks"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Remarks
              </Label>
              <TextArea
                name="remarks"
                rows={3}
                placeholder="Add any additional notes here..."
                value={formData.remarks || ""}
                onChange={(value: string) =>
                  setFormData((prev) => ({ ...prev, remarks: value }))
                }
                className="mt-1 block resize-none w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate("/prophylaxis")}
                className="px-6 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <svg
                    className="w-5 h-5 animate-spin mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProphylaxis;
