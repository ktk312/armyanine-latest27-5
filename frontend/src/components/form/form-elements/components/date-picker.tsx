
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import ComponentCard from "../../../common/ComponentCard";
import Label from "../../Label";
import { CalenderIcon } from "../../../../assets/icons";

type DatePickerProps = {
  title: string;
  value: string; // Selected date
  onChange: (date: string) => void; // Function to update state
  label?: string; // Optional label text
  placeholder?: string; // Placeholder text
};

export default function DatePicker({
  title = "title",
  value,
  onChange,
  label = "Select Date",
  placeholder = "Select Date",
}: DatePickerProps) {
  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      const selected = selectedDates[0];
      const localDate = selected.toLocaleDateString("en-CA"); // YYYY-MM-DD
      onChange(localDate);
    }
  };


  return (
    <ComponentCard title={title}>
      <div className="space-y-6">
        <div>
          <Label>{label}  <span className="text-red-500">*</span></Label>
          <div className="relative w-full flatpickr-wrapper">
            <Flatpickr
              value={value}
              onChange={handleDateChange}
              options={{
                dateFormat: "Y-m-d",
                allowInput: true,
                static: true,
                disableMobile: true,
              }}
              placeholder={placeholder}
              className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <CalenderIcon className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
