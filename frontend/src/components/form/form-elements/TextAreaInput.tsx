import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";
import { useFetchDogs } from "../../dogsCategory/hooks/useFetchDogs";

interface DefaultInputsProps {
  onChange: (name: string, value: string | number | File) => void;
  formData: {
    dogName: string;
    breedId: number | string | null;
    dob: string;
    sex: string;
    categoryId: number | string | null;
    countryId: number | string | null;
    cityId: number | string | null;
    status: string;
    microchip: string;
    location: string;
    breeder: string;
    sireId: number | null;
    damId: number | null;
    KP: string;
    color: string;
    hair: string;
    HD: string;
    ED: string;
    weight: string;
    chestDepth: string;
    chestCircumference: string;
    fieldAchievements: string;
    virtuesAndFaults: string;
    breedingAdvice: string;
    miscellaneousComments: string;
    progenyTrainability: string;
  };
}
export default function TextAreaInput({ onChange, formData }: DefaultInputsProps) {

  const { selectedDog } = useFetchDogs();
  // update or create dog
  const [dogData, setDogData] = useState(formData || selectedDog || {});
  console.log(dogData)
  useEffect(() => {
    setDogData(formData || selectedDog || {});
  }, [formData, selectedDog]);



  // const [messageTwo, setMessageTwo] = useState("");

  return (
    <ComponentCard title="Textarea input field">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>Particular Virtues and Faults</Label>

          <TextArea
             name="virtuesAndFaults"
            value={formData?.virtuesAndFaults}
            onChange={(value) => {
              setDogData(prev => ({ ...prev, virtuesAndFaults: value }));
              onChange("virtuesAndFaults", value);
            }}
            rows={6}
          />
        </div>

        {/* Disabled TextArea */}
        <div>
          <Label>Advice, Recommendation & Warning for selection of a Breeding Partner</Label>
          <TextArea 
          name="breedingAdvice"
          value={formData?.breedingAdvice}
          onChange={(value) => {
            setDogData(prev => ({ ...prev, breedingAdvice: value }));
            onChange("breedingAdvice", value);
          }}
            rows={6} />
        </div>

        {/* Error TextArea */}
        <div>
          <Label>Miscellaneous Comments</Label>
          <TextArea
          name="miscellaneousComments"
            value={formData?.miscellaneousComments}
            onChange={(value) => {
              setDogData(prev => ({ ...prev, miscellaneousComments: value }));
              onChange("miscellaneousComments", value);
            }}
            rows={6}
          />
        </div>
        <div>
          <Label>Working / Trainability of Progeny</Label>
          <TextArea
          name="progenyTrainability"
            value={formData?.progenyTrainability}
            onChange={(value) => {
              setDogData(prev => ({ ...prev, progenyTrainability: value }));
              onChange("progenyTrainability", value);
            }}
            rows={6}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
