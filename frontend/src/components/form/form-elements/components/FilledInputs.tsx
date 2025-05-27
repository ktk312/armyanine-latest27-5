import ComponentCard from "../../../common/ComponentCard";

type FilledInputsProps = {
  value: string;
  label: string;
  title: string;
};

const FilledInputs: React.FC<FilledInputsProps> = ({ value, label, title}) => {
  console.log(label)
  return (
    <ComponentCard title={title}>
      <div className="space-y-6 grid grid-cols-1 gap-6 xl:grid-cols-1">
        {/* Sire ID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
          {/* <Label>{label}</Label> */}
          <p className="mt-1 text-sm text-gray-500">{value || "Not Selected"}</p>
        </div>
      </div>
    </ComponentCard>
  );
};

export default FilledInputs;
