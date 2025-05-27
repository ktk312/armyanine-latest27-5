import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import DatePicker from "../form/form-elements/components/date-picker";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { useCreateStudCertificate } from "./hooks/useStudCertificate";
import { useBreedStore } from "../../store/breedStore";
import Label from "../form/Label";
import Select from "../form/Select";
import ComponentCard from "../common/ComponentCard";
import { useStudCertificateStore } from "../../store/stud-certificate-store";
import { useSiresAndDamsByBreed } from "./hooks/useSireAndDam";
import { useLinebreeding } from "./hooks/linbreeding";

// Utility function to get background class based on coefficient
const getPageBackgroundClass = (coefficient: number | null) => {
    if (coefficient === null) return '';
    if (coefficient > 25) return 'bg-red-600';
    if (coefficient > 12.5) return 'bg-orange-600';
    if (coefficient > 6.25) return 'bg-yellow-600';
    if (coefficient > 0) return 'bg-green-600';                            // Dangerous
};
export default function CreateStudCertificate() {
    const [date, setDate] = useState("");
    const [selectedSire, setSelectedSire] = useState<{ value: string; label: string } | null>(null);
    const [selectedDam, setSelectedDam] = useState<{ value: string; label: string } | null>(null);
    const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
    const [error, setError] = useState<string | undefined>(undefined); // To display error messages
    const [matingDate, setMatingDate] = useState("");
    console.log(matingDate)
    const [reasons, setReasons] = useState<string[]>([]);
    const [selectedCoefficient, setSelectedCoefficient] = useState<number | null>(null);
    const navigate = useNavigate();
    const { createNewStudCertificate, loading } = useCreateStudCertificate();
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
        } else {
            // Creating new certificate — clear the form
            setSelectedSire(null);
            setSelectedDam(null);
            setSelectedBreed(null);
            setDate('');
            setSelectedCoefficient(null);
            setReasons([]);
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
                    label: breed.breed || "",
                }))
            );
        }
    }, [breeds]);



    //  Getting Sire and Dam using Breed ID


    const { dams } = useSiresAndDamsByBreed(selectedBreed?.value ?? "");
    const { sires } = useLinebreeding(selectedDam?.value);
    const sireOptions = sires.map((sire) => ({

        value: String(sire.id),
        label: `${sire.dogName}${sire.KP ? ` (${sire.KP})` : ''} - Coefficient: ${sire.inbreedingCoefficient ?? 'N/A'}%`,
        coefficient: sire?.inbreedingCoefficient,
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
                breedId: Number(selectedBreed?.value), // Pass the whole breed object
                sireId: Number(selectedSire?.value), // Convert sire ID to number
                damId: Number(selectedDam?.value),   // Convert dam ID to number
                matingDate: date,  // Mating date
                forceCreate: false,
            };
            // Call the API or function to create the stud certificate
            const response = await createNewStudCertificate(payload);
            // if (response) {
            //     setSelectedBreed(null);
            //     setSelectedSire(null);
            //     setSelectedDam(null);
            //     setDate('');
            //     setSelectedCoefficient(null);

            // }
            // Log the created data for confirmation
            alert(response.message)

            if (response.reasons && Array.isArray(response.reasons)) {
                setReasons(response?.reasons);
            } else {
                setReasons([]);
                navigate("/stud-certificate")
            }

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


    const handleForceCreate = async () => {
        try {
            const payload = {
                breedId: Number(selectedBreed?.value),
                sireId: Number(selectedSire?.value),
                damId: Number(selectedDam?.value),
                matingDate: date,
                forceCreate: true, // Set forceCreate to true to bypass inbreeding check
            };

            // Call the API to create the stud certificate with forceCreate set to true
            const response = await createNewStudCertificate(payload);
            alert(response.message);

            navigate("/stud-certificate");
        } catch (error) {
            console.error("Mating submission error:", error);
            setError("Failed to process mating request");
        }
    };
    return (
        <div>

            <PageBreadcrumb pageTitle="Stud Certificate Form" />
            <ComponentCard title="Stud Certification">
                <div className={`p-4 text-white ${getPageBackgroundClass(selectedCoefficient)} rounded-lg`}>
                    {selectedCoefficient === null ? (
                        "No Sire selected"
                    ) : selectedCoefficient > 25 ? (
                        `High risk: Sire has a high inbreeding coefficient (${selectedCoefficient}%)`
                    ) : selectedCoefficient > 12.5 ? (
                        `Medium-high risk: Sire has a moderate inbreeding coefficient (${selectedCoefficient}%)`
                    ) : selectedCoefficient > 6.25 ? (
                        `Medium risk: Sire has a low inbreeding coefficient (${selectedCoefficient}%)`
                    ) : (
                        `Low risk: Sire has minimal inbreeding coefficient`
                    )}
                </div>
                <div className={`min-h-screen p-6 transition-colors duration-500 `}>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <div className="space-y-6">
                            <Label>Select Breed <span className="text-red-500">*</span></Label>
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
                            <Label>Select Dam <span className="text-red-500">*</span></Label>
                            <Select
                                options={damOptions}
                                placeholder={loading ? "Loading Dam..." : "Select Dam"}
                                onChange={(val) => setSelectedDam({ value: val, label: val })}
                                className="dark:bg-dark-900"
                                defaultValue={selectedStufCert?.dam?.id.toString()}
                            />
                            <DatePicker
                                title="Mating Date"
                                value={date}
                                onChange={setDate}
                                label="Select Mating Date"
                            />
                        </div>

                        <div className="space-y-6">
                            <Label>Select Sire <span className="text-red-500">*</span></Label>
                            <Select
                                options={sireOptions}
                                placeholder={loading ? "Loading Sire..." : "Select Sire"}
                                // onChange={(val) => setSelectedSire({ value: val, label: val })}
                                onChange={(val) => {
                                    const selectedId = Number(val);
                                    const selected = sireOptions.find((opt) => Number(opt.value) === selectedId);

                                    setSelectedSire({ value: val, label: val });
                                    setSelectedCoefficient(selected?.coefficient ?? null);
                                }}
                                className="dark:bg-dark-900"
                                defaultValue={selectedStufCert?.sire?.id.toString()}
                            />

                        </div>


                        <div className="flex gap-4 mt-4">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-0 rounded-lg shadow "
                                onClick={handleSubmit} // Use handleSubmit for form submission
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>

                            <Button
                                className="bg-black hover:bg-gray-800 text-white px-4 py-0 rounded-lg shadow"
                                onClick={() => window.location.reload()}
                            >
                                Reload
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
                            <Button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-0 rounded-lg shadow mt-4"
                                onClick={handleForceCreate}
                            >
                                Force Create Stud Certificate Despite Inbreeding
                            </Button>
                        </div>
                    )}
                </div>
            </ComponentCard>
        </div>
    );
}
