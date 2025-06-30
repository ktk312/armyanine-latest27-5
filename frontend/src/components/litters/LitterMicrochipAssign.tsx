import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import DatePicker from "../form/form-elements/components/date-picker";
import Button from "../ui/button/Button";
import AssignMicrochipForm from "../form/form-elements/components/AssignMicrochip";
import Label from "../form/Label";
import Select from "../form/Select";
import { useBreedStore } from "../../store/breedStore";
import { useSiresAndDams } from "../dogsCategory/hooks/useSireAndDam";
import { useFetchLitterRegistration, useUpdateLitterregistration } from "../dogsCategory/hooks/useLitterRegistration";
import { useNavigate } from "react-router";
import Input from "../form/input/InputField";


export default function AssignMicrochip() {
    const [date, setDate] = useState("");
    const [puppies, setPuppies] = useState([{ name: "", sex: "", color: "", microchip: "", KP: "", }]);

    const [selectedSire, setSelectedSire] = useState<{ value: string; label: string } | null>(null);
    const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);

    const [selectedDam, setSelectedDam] = useState<{ value: string; label: string } | null>(null);
    const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [dateMating, setMatingDate] = useState("");
    const [Location, setLocation] = useState("");



    const { breeds, getAllBreeds } = useBreedStore();
    const { sires, dams } = useSiresAndDams();
    const { selectedLitterRegistration } = useFetchLitterRegistration();
    const { updateExistingLitterregistration } = useUpdateLitterregistration();
    const navigate = useNavigate();

    // if(selectedLitterRegistration?.)
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                await getAllBreeds();
            } catch (err) {
                setError("Failed to load breeds");
            }
        };
        fetchBreeds();
    }, [getAllBreeds]);

    useEffect(() => {
        if (breeds.length > 0) {
            setBreedOptions(
                breeds.map((breed) => ({
                    value: breed.id.toString(),
                    label: breed?.breed?.charAt(0).toUpperCase() + (breed?.breed ?? "").slice(1) || "",
                }))
            );
        }
    }, [breeds]);
    // Getting  sire and dam 
    const sireOptions = sires.map((sire) => ({
        value: sire.id.toString(),
        label: sire.dogName,
    }));

    const damOptions = dams.map((dam) => ({
        value: dam.id.toString(),
        label: dam.dogName,
    }));


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("---inside handle --->>", e.target.value)
        setLocation(e.target.value);
    };
    useEffect(() => {
        if (selectedLitterRegistration) {
            setLocation(selectedLitterRegistration?.location || "");
            // other setup...
        }
    }, [selectedLitterRegistration]);
    useEffect(() => {
        if (selectedLitterRegistration) {

            // Extract puppy data from selectedLitterRegistration
            const puppiesData = [
                {
                    name: selectedLitterRegistration.name || "", // Set default value if name is null
                    gender: selectedLitterRegistration.sex || "", // Set default value if sex is null
                    color: selectedLitterRegistration.color || "", // Set default value if color is null
                    microchip: selectedLitterRegistration.microchip || "", // Default to empty string if null
                    KP: selectedLitterRegistration.KP || "",
                    sex: selectedLitterRegistration?.sex || "",
                }
            ];
            const sireOption = selectedLitterRegistration.litter.sire ? { value: selectedLitterRegistration.litter.sire.id.toString(), label: selectedLitterRegistration.litter.sire.dogName } : null;
            const damOption = selectedLitterRegistration.litter.dam ? { value: selectedLitterRegistration.litter.dam.id.toString(), label: selectedLitterRegistration.litter.dam.dogName } : null;
            const breedOption = selectedLitterRegistration.litter.breed ? { value: selectedLitterRegistration.litter.breed.id.toString(), label: selectedLitterRegistration.litter.breed.breed } : null;
            const whelpingDate = selectedLitterRegistration?.litter?.dob;
            setDate(whelpingDate);
            setPuppies(puppiesData);
            setSelectedSire(sireOption);
            setSelectedDam(damOption);
            setSelectedBreed(breedOption);
            setMatingDate(selectedLitterRegistration.litter.matingDate || '');
            setLocation(selectedLitterRegistration?.location || Location);
        }
    }, [selectedLitterRegistration]);

    const handleSubmit = async () => {
        try {
            const formattedPuppies = puppies.map(pup => ({
                name: pup.name,
                color: pup.color,
                sex: pup.sex, // backend expects 'sex'
                KP: pup.KP,
                microchip: pup.microchip || "",
            }));
            // let response=any[];
            for (const pup of formattedPuppies) {
                const payload = {
                    litterId: Number(selectedLitterRegistration?.litterId),
                    sireId: Number(selectedSire?.value),
                    breedId: Number(selectedBreed?.value),
                    damId: Number(selectedDam?.value),
                    location: String(Location),
                    matingDate: dateMating,
                    dob: date,
                    name: pup.name,
                    sex: pup.sex,
                    color: pup.color,
                    KP: pup.KP,
                    microchip: pup.microchip || "",
                };
                // Submit each puppy individually
                const response = await updateExistingLitterregistration(Number(selectedLitterRegistration?.id), payload);
                alert(response?.message)
            }
            // alert(response.message);
            navigate("/basic-tables")
            setError(undefined);
            console.log(error);
        } catch (error: any) {
            console.error("Mating submission error:", error);
            setError("Failed to process mating request");
        }
    };
    return (
        <div>
            <PageBreadcrumb pageTitle="Litter Registartion Form" />
            {/* Breed Detail */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <Label>Select Breed <span className="text-red-500">*</span></Label>
                    <Select
                        options={breedOptions}
                        placeholder="Select Sire"
                        onChange={(val) => setSelectedBreed({ value: val, label: val })}
                        defaultValue={selectedLitterRegistration?.litter.breed.id.toString()}
                        disabled={!!selectedLitterRegistration?.litter?.breed}
                    />
                </div>
            </div>
            {/* Sire and Dam */}
            <h2 className="text-xl font-semibold mt-9">Litter Parent</h2>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
                <div className="space-y-6">
                    <Label>Select Sire <span className="text-red-500">*</span></Label>
                    <Select
                        options={sireOptions}
                        placeholder="Select Sire"
                        onChange={(val) => setSelectedSire({ value: val, label: val })}
                        defaultValue={selectedLitterRegistration?.litter?.sire?.id.toString()}
                        disabled={!!selectedLitterRegistration?.litter?.sireId}
                    />
                </div>
                <div className="space-y-6">
                    <Label>Select Dam <span className="text-red-500">*</span></Label>
                    <Select
                        options={damOptions}
                        placeholder="Select Dam"
                        onChange={(val) => setSelectedDam({ value: val, label: val })}
                        defaultValue={selectedLitterRegistration?.litter?.dam?.id.toString()}
                        disabled={!!selectedLitterRegistration?.litter?.damId}
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-9">Puppies Information</h2>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
                <div className="space-y-6">
                    <DatePicker title="Whelping Date" value={date} onChange={setDate} label="Select whelping Date" />
                </div>
                <div>
                    <Label>Location</Label>
                    {/* <Input type="text" id="input" name="location" placeholder="Enter location" value={selectedLitterRegistration?.location || ""} onChange={handleChange} /> */}
                    <Input
                        type="text"
                        id="input"
                        name="location"
                        placeholder="Enter location"
                        value={Location}
                        onChange={handleChange}
                    />
                </div>
            </div>


            {/* Puppies detail */}
            <div className="grid grid-cols-1 gap-2 xl:grid-cols-1 mt-9">
                <AssignMicrochipForm puppies={puppies} setPuppies={setPuppies} />
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" onClick={handleSubmit}>
                    Update
                </Button>
            </div>
        </div>
    )
}