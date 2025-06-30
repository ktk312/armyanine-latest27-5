import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { useCreateStudCertificate } from "./hooks/useStudCertificate";
import { useBreedStore } from "../../store/breedStore";
import Label from "../form/Label";
import Select from "../form/Select";
import ComponentCard from "../common/ComponentCard";
import { useStudCertificateStore } from "../../store/stud-certificate-store";
import { useSiresAndDamsByBreed } from "./hooks/useSireAndDam";
import { checkVirtualBreed } from "./api/dogsApi";

export default function VirtualBreeding() {
    const [selectedSire, setSelectedSire] = useState<{ value: string; label: string } | null>(null);
    const [selectedDam, setSelectedDam] = useState<{ value: string; label: string } | null>(null);
    const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
    const [error, setError] = useState<string | undefined>(undefined); // To display error messages
    const [matingDate, setMatingDate] = useState("");
    const [reasons, setReasons] = useState<string[]>([]);

    console.log(matingDate)
    const { loading } = useCreateStudCertificate();
    const { selectedStufCert } = useStudCertificateStore();

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


    // Fetch Breeds from store
    const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
    const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            await getAllBreeds(); // Fetch breeds from store
        };
        fetchBreeds();
    }, [getAllBreeds]);

    useEffect(() => {
        if (breeds.length > 0) {
            setBreedOptions(
                breeds.map((breed) => ({
                    value: breed.id.toString(), // Convert number to string
                    label: breed?.breed?.charAt(0).toUpperCase() + (breed?.breed ?? "").slice(1) || "",
                }))
            );
        }
    }, [breeds]);



    //  Getting Sire and Dam using Breed ID
    const { sires, dams } = useSiresAndDamsByBreed(selectedBreed?.value ?? "");

    const sireOptions = sires.map((sire) => ({
        value: String(sire.id),
        label: sire.KP ? `${sire.dogName} (${sire.KP})` : sire.dogName,
    }));

    const damOptions = dams.map((dam) => ({
        value: String(dam.id),
        label: dam.KP ? `${dam.dogName} (${dam.KP})` : dam.dogName,
    }));


    // Handle submit 
    const handleSubmit = async () => {
        try {
            // Prepare payload data
            const payload = {
                // breedId: Number(selectedBreed?.value), // Pass the whole breed object
                sireId: Number(selectedSire?.value), // Convert sire ID to number
                damId: Number(selectedDam?.value),   // Convert dam ID to number
            };
            // Call the API or function to create the stud certificate
            const response = await checkVirtualBreed(payload);

            // Log the created data for confirmation
            alert(response.message)

            if (response.reasons && Array.isArray(response.reasons)) {
                setReasons(response?.reasons);
            } else {
                setReasons([]);
            }

            // Show success alert
            // setError(undefined);


        } catch (error: any) {
            console.error("Mating submission error:", error);

            let errorMessage = "Failed to process mating request";

            if (error.response) {
                // Handle specific mating denial error
                if (error.response.data?.error?.includes("Mating denied")) {
                    // This catches the inbreeding error from your API
                    errorMessage = error.response.data.error;
                }
                // Handle other API errors
                else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
        }
    };

    return (
        <div>
            {/* <PageBreadcrumb pageTitle="" /> */}
            <ComponentCard title="Stud Certification">

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="space-y-6">
                        <Label>Select Breed</Label>
                        <Select
                            options={breedOptions}
                            placeholder={breedLoading ? "Loading breeds..." : "Select Breed"}
                            onChange={(val) => setSelectedBreed({ value: val, label: val })}
                            className="dark:bg-dark-900"
                            defaultValue={selectedStufCert?.breed?.id.toString()}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-9">
                    <div className="space-y-6">
                        <Label>Select Sire</Label>
                        <Select
                            options={sireOptions}
                            placeholder={loading ? "Loading Sire..." : "Select Sire"}
                            onChange={(val) => setSelectedSire({ value: val, label: val })}
                            className="dark:bg-dark-900"
                            defaultValue={selectedStufCert?.sire?.id.toString()}
                        />
                    </div>

                    <div className="space-y-6">
                        <Label>Select Dam</Label>
                        <Select
                            options={damOptions}
                            placeholder={loading ? "Loading Dam..." : "Select Dam"}
                            onChange={(val) => setSelectedDam({ value: val, label: val })}
                            className="dark:bg-dark-900"
                            defaultValue={selectedStufCert?.dam?.id.toString()}
                        />
                    </div>


                    <div className="flex gap-4 mt-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-0 rounded-lg shadow "
                            onClick={handleSubmit} // Use handleSubmit for form submission
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? "Checking..." : "Check"}
                        </Button>
                    </div>
                </div>
                {/* Show error message if any */}
                {error && <div className="text-red-500 mt-4">{error}</div>}
                {reasons.length > 0 && (
                    <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded text-red-800">
                        <p className="font-semibold">Reasons:</p>
                        <ul className="list-disc list-inside">
                            {reasons.map((reason, index) => (
                                <li key={index}>{reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </ComponentCard>
        </div>
    );
}
