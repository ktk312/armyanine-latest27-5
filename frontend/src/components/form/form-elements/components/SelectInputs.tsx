import ComponentCard from "../../../common/ComponentCard";
import Label from "../../Label";
import Select from "../../Select";

// Type definition for Option and SelectInputsProps
type Option = {
  value: string;
  label: string;
};

type SelectInputsProps = {
  title?: string;
  label?: string;
  options: Option[]; // Required options array
  value?: string; // Add the value property
  placeholder?: string;
  onChange?: (value: string) => void; // Required onChange function
  className?: string;
};

const SelectInputs: React.FC<SelectInputsProps> = ({
  title = "Select Inputs",
  label = "Select Input",
  options,
  // value, // Destructure the value prop
  placeholder = "Select Option",
  onChange,
  className = "dark:bg-dark-900",
}) => {
  // Directly passing the selected value from Select to onChange
  const handleSelectChange = (value: string) => {
    if(onChange){
      onChange(value); // Directly pass the selected value to the parent handler

    }
  };

  return (
    <ComponentCard title={title}>
      <div className="space-y-6">
        <div>
          <Label>{label}</Label>
          <Select
            options={options}
            // value={value} // Pass the value to the Select component
            placeholder={placeholder}
            onChange={handleSelectChange} // Passing value directly
            className={className}
          />
        </div>
      </div>
    </ComponentCard>
  );
};

export default SelectInputs;
