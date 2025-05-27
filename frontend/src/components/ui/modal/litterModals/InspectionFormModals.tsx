import { useState, useRef, useEffect } from "react";
import Button from "../../button/Button";
import SelectInputs from "../../../form/form-elements/components/SelectInputs";
import DatePicker from "../../../form/form-elements/components/date-picker";
import InputsField from "../../../form/form-elements/components/InputField";
import FilledInputs from "../../../form/form-elements/components/FilledInputs";
import TextArea from "../../../form/input/TextArea";
import Label from "../../../form/Label";
import ComponentCard from "../../../common/ComponentCard";

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const LitterInspectionFormModals: React.FC<ModalProps> = ({
  isOpen,
  className,
  onClose,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState("");
  const [sireId, setSireId] = useState("");
  const [damId, setDamId] = useState("");
  const [message, setMessage] = useState("");
  const [isExtended, setIsExtended] = useState(false);

  const optionBreed = [
    { value: "Germen Shepherd", label: "Germen Shepherd" },
    { value: "Labrador Retriever", label: "Labrador Retriever" },
    { value: "Belgian Malinois", label: "Belgian Malinois" },
  ];
  const optionSire = [
    { value: "sire1", label: "Sire 1", id: "SIRE-001" },
    { value: "sire2", label: "Sire 2", id: "SIRE-002" },
  ];
  const optionDam = [
    { value: "dam1", label: "Dam 1", id: "DAM-001" },
    { value: "dam2", label: "Dam 2", id: "DAM-002" },
  ];

  const handleSireChange = (selectedValue: string) => {
    const selectedSire = optionSire.find((option) => option.value === selectedValue);
    if (selectedSire) setSireId(selectedSire.id);
  };

  const handleDamChange = (selectedValue: string) => {
    const selectedDam = optionDam.find((option) => option.value === selectedValue);
    if (selectedDam) setDamId(selectedDam.id);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      <div
        className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className={`relative w-full max-w-4xl p-6 bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            ×
          </button>
        )}
        <h4 className="mb-2 text-2xl font-semibold">Litter Inspection Form</h4>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <SelectInputs title="Breed" label="Select Breed" options={optionBreed} />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-6">
          <SelectInputs title="Sire" label="Select Sire" options={optionSire} onChange={handleSireChange} />
          <DatePicker title="Whelping Date" value={date} onChange={setDate} label="Select whelping Date" />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-6">
          <SelectInputs title="Dam" label="Select Dam" options={optionDam} onChange={handleDamChange} />
          <DatePicker title="Mating Date" value={date} onChange={setDate} label="Select mating date" />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-6">
          <FilledInputs value={sireId} title="Sire ACC No:" label="" />
          <FilledInputs value={damId} title="Dam ACC No:" label="" />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 mt-6">
          <InputsField title="No of Puppies Born:" value="" />
          <InputsField title="No of Male Puppies Alive" value="" />
          <InputsField title="No of Female Puppies Alive" value="" />
          <InputsField title="No of Puppies Expired" value="" />
        </div>
        <div className="flex justify-start mt-6">
          <Button size="sm" onClick={() => setIsExtended(!isExtended)}>
            {isExtended ? "Hide Additional Details" : "Add Overall Condition"}
          </Button>
        </div>
        {isExtended && (
          <ComponentCard title="Overall Condition of the Dam and Litter" className="mt-6">
            <Label>Condition of Dam</Label>
            <TextArea value={message} onChange={setMessage} rows={4} />
            <Label>Condition of Puppies</Label>
            <TextArea rows={4} />
            <Label>Uniformity Feature (if any)</Label>
            <TextArea rows={4} />
            <Label>Remarks</Label>
            <TextArea rows={4} />
          </ComponentCard>
        )}
        <div className="flex justify-end mt-6 gap-3">
          <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
          <Button size="sm" onClick={() => console.log("Submitting...")}>Update</Button>
        </div>
      </div>
    </div>
  );
};
