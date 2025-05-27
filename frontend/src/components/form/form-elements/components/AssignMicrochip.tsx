
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Label from "../../Label";
import Input from "../../input/InputField";
import { Card, CardContent } from "@mui/material";
import { useFetchUnassignMicrochips } from "../../../dogsCategory/hooks/useMicrochip";
import Select from "../../Select";

// 🎯 Props type for the component
interface Puppy {
    name: string;
    sex: string;
    color: string;
    microchip: string; // Optional microchip ID
    KP: string; // ACC Registration Number
}

// 🎯 LitterFormTableProps
interface LitterFormTableProps {
    puppies: Puppy[];
    setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}

export default function AssignMicrochipForm({ puppies, setPuppies }: LitterFormTableProps) {
    // Initialize states for microchips
    console.log("---the pupppy are selected are", puppies)
    // Update puppy details like name, gender, or color
    const updateDog = (index: number, field: string, value: string) => {
        const updatedPuppies = [...puppies];
        updatedPuppies[index] = { ...updatedPuppies[index], [field]: value };
        setPuppies(updatedPuppies);
    };

    // Update the microchip ID for a specific puppy
    const { microchips, microchiploading } = useFetchUnassignMicrochips();
    const [microchipOption, setmicrochipOption] = useState<{ value: string; label: string }[]>([]);
    useEffect(() => {
        if (microchips.length > 0) {
            setmicrochipOption(
                microchips.map((microchip) => ({
                    value: String(microchip?.id), // Convert number to string
                    label: String(microchip?.chipId),
                }))
            );
        }
    }, [microchips]);

    // Update the ACC Registration number (KP)
    const updateKP = (index: number, value: string) => {
        const updatedPuppies = [...puppies];
        updatedPuppies[index] = { ...updatedPuppies[index], KP: value };
        setPuppies(updatedPuppies);
    };

    // const handleMicrochips = (value: string) => {
    //     const microchip = value;
    //     setPuppies(prev => ({ ...prev, microchip }));
    //     onChange("microchip", microchip);
    //   };
    const genderOptions = [
        { value: "", label: "- Select Gender -" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];
    return (
        <div className="space-y-6">
            {puppies.map((puppy, index) => (
                <Card key={index} className="p-4">
                    <CardContent className="grid grid-cols-3 gap-4">
                        {/* Puppy Name */}
                        <div>
                            <Label>Puppy Name <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                placeholder="Enter Puppy Name"
                                value={puppy.name}
                                onChange={(e) => updateDog(index, "name", e.target.value)}
                            />
                        </div>

                        {/* Gender (Select Dropdown) */}
                        <div>
                            <Label>Gender <span className="text-red-500">*</span></Label>
                            <Select
                                key={`sex-${index}-${puppy.sex}`} // 👈 force re-render when `puppy.sex` changes
                                defaultValue={puppy.sex}
                                onChange={(value: string) => updateDog(index, "sex", value)}
                                options={genderOptions}
                            >
                            </Select>
                        </div>

                        {/* Microchip (Select Dropdown) */}
                        <div>
                            <Label>Microchips</Label>
                            <Select
                                // defaultValue={String(selectedDog?.damId) || ""}
                                options={microchipOption}
                                placeholder={microchiploading ? "Loading microchip..." : "Select Option"}
                                onChange={(value: string) => updateDog(index, "microchip", value)}
                                className="dark:bg-dark-900"
                                defaultValue={puppy?.microchip || ""}
                            />
                        </div>

                        {/* Color */}
                        <div>
                            <Label>Color</Label>
                            <Input
                                type="text"
                                placeholder="Enter Puppy Color"
                                value={puppy.color}
                                onChange={(e) => updateDog(index, "color", e.target.value)}
                            />
                        </div>

                        {/* ACC Reg # */}
                        <div>
                            <Label>ACC Reg # <span className="text-red-500">*</span></Label>
                            <Input
                                type="text"
                                placeholder="Enter ACC Reg Number"
                                value={puppy.KP}
                                onChange={(e) => updateKP(index, e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
