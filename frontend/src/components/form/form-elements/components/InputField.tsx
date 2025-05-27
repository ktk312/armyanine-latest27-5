
import "flatpickr/dist/themes/airbnb.css";
import ComponentCard from "../../../common/ComponentCard";
import Label from "../../Label";
import Input from "../../input/InputField";


type InputFieldProps = {
    title: string;
  value: string; // Selected date
//   onChange: (date: string) => void; // Function to update state
  label?: string; // Optional label text
  placeholder?: string; // Placeholder text
};
export default function InputsField({
    title="title",
  label = "Select Date",
  placeholder = "Select Date",
}: InputFieldProps) {
  return (
    <ComponentCard title={title}>
      <div className="space-y-6">
        <div>
          <Label>{label}</Label>
          <Input type="text" id="input" placeholder={placeholder} />
        </div>
      </div>
    </ComponentCard>
  );
}
