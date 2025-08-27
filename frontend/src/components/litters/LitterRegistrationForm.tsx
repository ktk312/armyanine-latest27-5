import { useEffect, useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import DatePicker from "../form/form-elements/components/date-picker";
import Button from "../ui/button/Button";
import LitterFormTable from "../form/form-elements/components/LitterRegTable";
import { useFetchLitterInspection } from "../dogsCategory/hooks/litterInspection";
import Label from "../form/Label";
import Select from "../form/Select";
import { useBreedStore } from "../../store/breedStore";
import { useSiresAndDamsByBreed } from "../dogsCategory/hooks/useSireAndDam";
import { useNavigate } from "react-router";
import {
  useCreateLitterRegistration,
  useUpdateLitterregistration,
} from "../dogsCategory/hooks/useLitterRegistration";
import Input from "../form/input/InputField";

export default function LitterRegistrationForm() {
  const [date, setDate] = useState("");
  const [puppies, setPuppies] = useState([
    { kp: "", name: "", gender: "", color: "", microchip: "" },
  ]);
  const [selectedSire, setSelectedSire] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedDam, setSelectedDam] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [breedOptions, setBreedOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [Location, setLocation] = useState("");
  const { updateExistingLitterregistration } = useUpdateLitterregistration();

  const [dateMating, setMatingDate] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [error, setError] = useState<string | undefined>(undefined);

  const { breeds, getAllBreeds } = useBreedStore();
  // const { sires, dams } = useSiresAndDams();
  const navigate = useNavigate();
  const { selectedLitter, loading } = useFetchLitterInspection();
  const { createLitterRegistration } = useCreateLitterRegistration();

  useEffect(() => {
    if (selectedLitter) {
      const sireOption = selectedLitter.sire
        ? {
            value: selectedLitter.sire.id.toString(),
            label: selectedLitter.sire.dogName,
          }
        : null;
      const damOption = selectedLitter.dam
        ? {
            value: selectedLitter.dam.id.toString(),
            label: selectedLitter.dam.dogName,
          }
        : null;
      const breedOption = selectedLitter.breed
        ? {
            value: selectedLitter.breed.id.toString(),
            label: selectedLitter.breed.breed,
          }
        : null;
      const whelpinDate = selectedLitter?.dob;
      setDate(whelpinDate);
      setSelectedSire(sireOption);
      setSelectedDam(damOption);
      setSelectedBreed(breedOption);
      setMatingDate(selectedLitter.matingDate || "");
    }
  }, [selectedLitter]);

  // Get Litters
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
          label:
            breed?.breed?.charAt(0).toUpperCase() +
              (breed?.breed ?? "").slice(1) || "",
        }))
      );
    }
  }, [breeds]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  // Getting  sire and dam
  const { sires, dams } = useSiresAndDamsByBreed(selectedBreed?.value ?? "");

  const sireOptions = sires.map((sire) => ({
    value: String(sire.id),
    label: sire.KP ? `${sire.dogName} (${sire.KP})` : sire.dogName,
  }));

  const damOptions = dams.map((dam) => ({
    value: String(dam.id),
    label: dam.KP ? `${dam.dogName} (${dam.KP})` : dam.dogName,
  }));

  if (loading) return <p>Loading...</p>;
  const handleSubmit = async () => {
    try {
      const formattedPuppies = puppies.map((pup) => ({
        KP: pup.kp, // Assuming 'kp' is a unique identifier for the dog
        name: pup.name,
        color: pup.color,
        sex: pup.gender, // backend expects 'sex'
        microchip: pup.microchip,
      }));
      // let response=any[];
      for (const pup of formattedPuppies) {
        const payload = {
          breedId: Number(selectedBreed?.value),
          litterId: Number(selectedLitter?.id),
          sireId: Number(selectedSire?.value),
          damId: Number(selectedDam?.value),
          location: String(Location),
          matingDate: dateMating,
          dob: date,
          name: pup.name,
          sex: pup.sex,
          color: pup.color,
          KP: pup.KP,
          microchip: pup.microchip,
        };

        // Submit each puppy individually
        const response = await createLitterRegistration(payload);
        console.log(response);
        await updateExistingLitterregistration(Number(response?.id), payload);
      }
      // alert(response.message);
      // navigate("/litters-reigstration-request")
      alert("Dog Created successfully");
      navigate("/basic-tables");

      console.log(error);
    } catch (error: any) {
      setError("Failed to process mating request");
    }
  };
  return (
    <div>
      <PageBreadcrumb pageTitle="Litter Registartion Form" />
      {/* Breed Detail */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <Label>
            Select Breed <span className="text-red-500">*</span>
          </Label>
          <Select
            options={breedOptions}
            placeholder="Select Breed"
            onChange={(val) => setSelectedBreed({ value: val, label: val })}
            defaultValue={selectedLitter?.breed?.id.toString()}
            disabled={!!selectedLitter?.breedId}
          />
        </div>
      </div>
      {/* Sire and Dam */}
      <h2 className="text-xl font-semibold mt-9 dark:text-white">
        Litter Parent
      </h2>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
        <div className="space-y-6">
          <Label>
            Select Sire <span className="text-red-500">*</span>
          </Label>
          <Select
            options={sireOptions}
            placeholder="Select Sire"
            onChange={(val) => setSelectedSire({ value: val, label: val })}
            defaultValue={selectedLitter?.sire.id.toString()}
            disabled={!!selectedLitter?.sireId}
          />
        </div>
        <div className="space-y-6">
          <Label>
            Select Dam <span className="text-red-500">*</span>
          </Label>
          <Select
            options={damOptions}
            placeholder="Select Dam"
            onChange={(val) => setSelectedDam({ value: val, label: val })}
            defaultValue={selectedLitter?.dam.id.toString()}
            disabled={!!selectedLitter?.damId}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-9 dark:text-white">
        Puppies Information
      </h2>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-2">
        <div className="space-y-6">
          <DatePicker
            title="Whelping Date"
            value={date}
            onChange={setDate}
            label="Select whelping Date"
          />
        </div>
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            id="input"
            name="location"
            placeholder="Enter location"
            value={selectedLitter?.location}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Puppies detail */}
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-1 mt-9 ">
        <LitterFormTable puppies={puppies} setPuppies={setPuppies} />
      </div>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
