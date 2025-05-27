import "flatpickr/dist/themes/airbnb.css";
import Label from "../../Label";

type DatePickerProps = {
    title: string;
    value: string; // Selected year
    onChange: (year: string) => void; // Function to update state
    label?: string; // Optional label text
    placeholder?: string; // Placeholder text
};

export default function YearPicker({
    value,
    onChange,
    label = "Select Year",
    placeholder = "Select Year",
}: DatePickerProps) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        //   <ComponentCard title={title}>
        <div>
            <div className="space-y-6">
                <div>
                    <Label>{label}</Label>
                    <div className="relative w-full">
                        <select
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                        >
                            <option value="">{placeholder}</option>
                            {years.map((year) => (
                                <option key={year} value={year.toString()}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            {/* <CalenderIcon className="size-6" /> */}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        //   </ComponentCard>
    );
}