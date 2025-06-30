import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import DatePicker from "../form/form-elements/components/date-picker";
import Button from "../ui/button/Button";
import FilledInputs from "../form/form-elements/components/FilledInputs";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import { useStudCertificateStore } from "../../store/stud-certificate-store";
import Select from "../form/Select";
import { useBreedStore } from "../../store/breedStore";
import Input from "../form/input/InputField";
import { useSiresAndDamsByBreed } from "../dogsCategory/hooks/useSireAndDam";
import { useNavigate } from "react-router";
import { useCreateLitterInspection } from "../dogsCategory/hooks/litterInspection";

interface formData {
    noOfPuppies: number,
    noOfFemale: number,
    noOfMale: number,
    noOfExpired: number,
    conditionOfDam: string,
    conditionOfPuppies: string,
    uniformFeature: string,
    Remarks: string
}

export default function LitterInspectionForm() {
    const [formData, setFormData] = useState<formData>({
        noOfPuppies: 0,
        noOfFemale: 0,
        noOfMale: 0,
        noOfExpired: 0,
        conditionOfDam: "",
        conditionOfPuppies: "",
        uniformFeature: "",
        Remarks: ""
    });
    const [matingDate, setMatingDate] = useState("");
    const [date, setDate] = useState("");
    // const [message, setMessage] = useState("");
    const [isExtended, setIsExtended] = useState(false);

    const [selectedSire, setSelectedSire] = useState<{ value: string; label: string } | null>(null);
    const [selectedDam, setSelectedDam] = useState<{ value: string; label: string } | null>(null);
    const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);

    const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    const { breeds, getAllBreeds } = useBreedStore();
    const { selectedStufCert, loading } = useStudCertificateStore();
    const { createLitterInspection } = useCreateLitterInspection()
    // const { sires, dams } = useSiresAndDams();
    const navigate = useNavigate();
    // const {updateExistingLitterInspection} = useUpdateLitterInspection()

    // const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({ ...prev, [name]: value }));
    // };

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

    useEffect(() => {
        if (selectedStufCert) {
            const sireOption = selectedStufCert.sire ? { value: selectedStufCert.sire.id.toString(), label: selectedStufCert.sire.dogName } : null;
            const damOption = selectedStufCert.dam ? { value: selectedStufCert.dam.id.toString(), label: selectedStufCert.dam.dogName } : null;
            const breedOption = selectedStufCert.breed ? { value: selectedStufCert.breed.id.toString(), label: selectedStufCert.breed.breed } : null;

            setSelectedSire(sireOption);
            setSelectedDam(damOption);
            setSelectedBreed(breedOption);
            setMatingDate(selectedStufCert.matingDate || '');
        }
    }, [selectedStufCert]);

    const { sires, dams } = useSiresAndDamsByBreed(selectedBreed?.value ?? "");

    const sireOptions = sires.map((sire) => ({
        value: String(sire.id),
        label: sire.KP ? `${sire.dogName} (${sire.KP})` : sire.dogName,
    }));

    const damOptions = dams.map((dam) => ({
        value: String(dam.id),
        label: dam.KP ? `${dam.dogName} (${dam.KP})` : dam.dogName,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (!date || !matingDate || !selectedSire || !selectedDam || !selectedBreed) {
                alert("Please fill all required fields");
                navigate("/stud-certificate")
                return setError("Please fill all required fields");
            }
            const payload = {
                studCertId: Number(selectedStufCert?.id),
                breedId: Number(selectedBreed?.value),
                sireId: Number(selectedSire?.value),
                damId: Number(selectedDam?.value),
                matingDate,
                dob: date,
                noOfPuppies: Number(formData.noOfPuppies),
                noOfFemale: Number(formData.noOfFemale),
                noOfMale: Number(formData.noOfMale),
                noOfExpired: Number(formData.noOfExpired),
                conditionOfDam: String(formData?.conditionOfDam),
                conditionOfPuppies: String(formData?.conditionOfPuppies),
                uniformFeature: String(formData?.uniformFeature),
                Remarks: String(formData?.Remarks)
            };
            const response = await createLitterInspection(payload);
            alert(response.message);
            navigate("/litters-inspection-request-list")
            setError(undefined);
        } catch (error: any) {
            console.error("Mating submission error:", error);
            setError("Failed to process mating request");
        }
    };


    if (error) return <div className="p-4">Loading...</div>;

    return (
        <div>
            <PageBreadcrumb pageTitle="Litter Inspection Form" />
            <ComponentCard title="Default Inputs">

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        <div>
                            <Label>Select Breed <span className="text-red-500">*</span></Label>
                            <Select
                                options={breedOptions}
                                placeholder="Select Breed"
                                onChange={(val) => setSelectedBreed({ value: val, label: val })}
                                defaultValue={selectedStufCert?.breed?.id.toString()}
                                disabled={!!selectedStufCert?.breed}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-9">
                    <div className="space-y-6">
                        <div>
                            <Label>Select Sire <span className="text-red-500">*</span></Label>
                            <Select
                                options={sireOptions}
                                placeholder="Select Sire"
                                onChange={(val) => setSelectedSire({ value: val, label: val })}
                                defaultValue={selectedStufCert?.sire.id.toString()}
                                disabled={!!selectedStufCert?.sireId}
                            />
                        </div>
                        <DatePicker title="Whelping Date" value={date} onChange={setDate} label="Select whelping Date" />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <Label>Select Dam <span className="text-red-500">*</span></Label>
                            <Select
                                options={damOptions}
                                placeholder="Select Dam"
                                onChange={(val) => setSelectedDam({ value: val, label: val })}
                                defaultValue={selectedStufCert?.dam.id.toString()}
                                disabled={!!selectedStufCert?.damId}
                            />
                        </div>
                        <DatePicker title="Mating Date" value={matingDate} onChange={setMatingDate} label="Select mating date" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-9">
                    <div className="space-y-6">
                        <FilledInputs label={selectedStufCert?.dam?.dogName || ""} title="Sire ACC No:"
                            value={selectedStufCert?.sire?.KP || ""}

                        />
                    </div>
                    <div className="space-y-6">
                        <FilledInputs label="" title="Dam ACC No:"
                            value={selectedStufCert?.dam?.KP || ""}
                        // readOnly
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2 xl:grid-cols-4 mt-9">
                    <div className="space-y-6">
                        <Label>No of Puppies Born  <span className="text-red-500">*</span></Label>
                        <Input type="text" name="noOfPuppies" value={formData.noOfPuppies} onChange={handleChange} />
                    </div>
                    <div className="space-y-6">
                        <Label>No of Male Puppies Alive <span className="text-red-500">*</span></Label>
                        <Input type="text" name="noOfMale" value={formData.noOfMale} onChange={handleChange} />
                    </div>
                    <div className="space-y-6">
                        <Label>No of Female Puppies Alive <span className="text-red-500">*</span></Label>
                        <Input type="text" name="noOfFemale" value={formData.noOfFemale} onChange={handleChange} />
                    </div>
                    <div className="space-y-6">
                        <Label>No of Puppies Expired <span className="text-red-500">*</span></Label>
                        <Input type="text" name="noOfExpired" value={formData.noOfExpired} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex justify-start mt-6">
                    <Button size="sm" onClick={() => setIsExtended(!isExtended)}>
                        {isExtended ? "Hide Additional Details" : "Add overall condition of the Dam and Litter"}
                    </Button>
                </div>

                {isExtended && (
                    <div className="grid grid-cols-1 gap-2 xl:grid-cols-1 mt-9">
                        <div className="space-y-6">
                            <ComponentCard title="Overall Condition of the Dam and Litter">
                                <div className="space-y-6">
                                    <div>
                                        <Label>Condition of Dam</Label>
                                        <TextArea value={formData?.conditionOfDam} onChange={(value) =>
                                            setFormData(prev => ({ ...prev, conditionOfDam: value }))
                                        } rows={6} />
                                    </div>
                                    <div>
                                        <Label>Condition of Puppies</Label>
                                        <TextArea value={formData?.conditionOfPuppies} onChange={(value) =>
                                            setFormData(prev => ({ ...prev, conditionOfPuppies: value }))
                                        } rows={6} />
                                    </div>
                                    <div>
                                        <Label>Uniformity Feature (if any)</Label>
                                        <TextArea value={formData?.uniformFeature} onChange={(value) =>
                                            setFormData(prev => ({ ...prev, uniformFeature: value }))
                                        } rows={6} />
                                    </div>
                                    <div>
                                        <Label>Remarks</Label>
                                        <TextArea value={formData?.Remarks} onChange={(value) =>
                                            setFormData(prev => ({ ...prev, Remarks: value }))
                                        } rows={6} />
                                    </div>
                                </div>
                            </ComponentCard>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-0 rounded-lg shadow "
                        onClick={handleSubmit} // Use handleSubmit for form submission
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </div>

            </ComponentCard>
        </div>
    );
}
