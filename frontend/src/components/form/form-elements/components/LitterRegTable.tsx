import { Dispatch, SetStateAction } from "react";
import Label from "../../Label";
import Input from "../../input/InputField";
import { Card, CardContent } from "@mui/material";
import Button from "../../../ui/button/Button";
import { MenuItem, Select } from "@mui/material";

interface Puppy {
  name: string;
  gender: string;
  color: string;
}

interface LitterFormTableProps {
  puppies: Puppy[];
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}

export default function LitterFormTable({ puppies, setPuppies }: LitterFormTableProps) {
  const addDog = () => {
    setPuppies([...puppies, { name: "", gender: "", color: "" }]);
  };

  const updateDog = (index: number, field: string, value: string) => {
    const updatedDogs = [...puppies];
    updatedDogs[index] = { ...updatedDogs[index], [field]: value };
    setPuppies(updatedDogs);
  };

  return (
    <div className="space-y-6">
      {puppies.map((dog, index) => (
        <Card
          key={index}
          className="p-4 !bg-white dark:!bg-gray-800 dark:!text-white !rounded-lg !shadow-md"
        >
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Dog Name */}
            <div>
              <Label className="dark:text-white">Dog Name <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                placeholder="Enter Dog's Name"
                value={dog.name}
                onChange={(e) => updateDog(index, "name", e.target.value)}
                className="dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Gender (Select Dropdown) */}
            <div>
  <Label className="dark:text-white">Gender <span className="text-red-500">*</span></Label>
  <Select
    value={dog.gender}
    onChange={(e) => updateDog(index, "gender", e.target.value)}
    displayEmpty
    fullWidth
    className="!bg-white !text-black dark:!bg-gray-800 dark:!text-white dark:!border-gray-600"
  >
    <MenuItem value="">- Select Gender -</MenuItem>
    <MenuItem value="male">Male</MenuItem>
    <MenuItem value="female">Female</MenuItem>
  </Select>
</div>


            {/* Color and Markings */}
            <div>
              <Label className="dark:text-white">Color and Markings</Label>
              <Input
                type="text"
                placeholder="Enter Dog's Color & Markings"
                value={dog.color}
                onChange={(e) => updateDog(index, "color", e.target.value)}
                className="dark:bg-gray-900 dark:text-white"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        className="text-sm dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        size="sm"
        onClick={addDog}
      >
        + Add Dog
      </Button>
    </div>
  );
}
