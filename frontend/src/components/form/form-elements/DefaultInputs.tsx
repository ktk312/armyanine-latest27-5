import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { CalenderIcon } from "../../../assets/icons";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { useSiresAndDamsByBreed } from "../../dogsCategory/hooks/useSireAndDam";
import { useFetchBreeds } from "../../dogsCategory/hooks/useBreed";
import { useFetchDogsCategory } from "../../dogsCategory/hooks/useFetchCategory";
import { useFetchDogs } from "../../dogsCategory/hooks/useFetchDogs";
import { useFetchUnassignMicrochips } from "../../dogsCategory/hooks/useMicrochip";
import { useFetchCountries } from "../../dogsCategory/hooks/useCountry";
import { useFetchCitiesByCountry } from "../../dogsCategory/hooks/useCities";
// Define interface for component props
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
    achievements: string;
    virtuesAndFaults: String;
    breedingAdvice: String;
    miscellaneousComments: String;
    progenyTrainability: String;
  };
}

export default function DefaultInputs({
  onChange,
  formData,
}: DefaultInputsProps) {
  // Real data
  const { selectedDog } = useFetchDogs();

  // update or create dog
  const [dogData, setDogData] = useState(formData || selectedDog || {});
  useEffect(() => {
    setDogData(formData || selectedDog || {});
  }, [formData, selectedDog]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDogData((prev: any) => ({ ...prev, [name]: value }));
    onChange(name, value);
  };
  const handleSelectChange = (name: string, value: string) => {
    setDogData((prev: any) => ({ ...prev, [name]: value }));
    onChange(name, value);
  };

  const parseDate = (dateString?: string | null) => {
    if (!dateString) return undefined;
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? undefined : d;
  };
  useEffect(() => {
    setDateOfBirth(parseDate(formData?.dob));
  }, [formData?.dob]);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(() =>
    parseDate(formData?.dob)
  );
  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      setDateOfBirth(selectedDate);

      const isoDateString = selectedDate.toISOString();
      setDogData((prev: any) => ({ ...prev, dob: isoDateString }));
      onChange("dob", isoDateString);
    }
  };

  const { microchips, microchiploading } = useFetchUnassignMicrochips();
  const [microchipOption, setmicrochipOption] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    if (microchips.length > 0) {
      setmicrochipOption(
        microchips.map((microchip) => ({
          value: microchip?.id.toString(), // Convert number to string
          label: microchip?.chipId,
        }))
      );
    }
  }, [microchips]);

  // Breed Data
  const { breeds, loading } = useFetchBreeds();
  const [breedOptions, setBreedOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (breeds.length > 0) {
      setBreedOptions(
        breeds.map((breed) => ({
          value: breed?.id.toString(), // Convert number to string
          label: breed?.breed?.charAt(0).toUpperCase() + (breed?.breed ?? "").slice(1) || "",
        }))
      );
    }
  }, [breeds]);

  // Dog Category
  const { categories, dogLoading } = useFetchDogsCategory();
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryOptions(
        categories.map((category) => ({
          value: category.id.toString(), // Convert number to string
          label: category.name.charAt(0).toUpperCase() + (category.name ?? "").slice(1) || "",
        }))
      );
    }
  }, [categories]);

  // Convert sires and dams into dropdown format
  const { sires, dams } = useSiresAndDamsByBreed(
    String(dogData?.breedId) ?? ""
  );

  const sireOptions = sires.map((sire) => ({
    value: String(sire.id),
    label: sire.KP ? `${sire.dogName} (${sire.KP})` : sire.dogName,
  }));

  const damOptions = dams.map((dam) => ({
    value: String(dam.id),
    label: dam.KP ? `${dam.dogName} (${dam.KP})` : dam.dogName,
  }));

  // Country Data

  const { country, countryLoading } = useFetchCountries();

  const countryOptions = country.map((c) => ({
    value: c.idCountry,
    label: c.countryName,
  }));

  const { city, CityLoading } = useFetchCitiesByCountry(
    String(dogData?.countryId)
  );

  const cityOptions = city.map((c) => ({
    value: c.id,
    label: c.city || "Unknown City",
  }));

  const ListofHair = [
    { value: "hair", label: "Hair" },
    { value: "long_coat", label: "Long Coat" },
    { value: "short_coat", label: "Short Coat" }

  ];
  const ListofHD = [
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" },
  ];
  const ListofED = [
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" },
  ];
  const ListGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleBreedChange = (value: string) => {
    const breedId = parseInt(value);
    setDogData((prev) => ({ ...prev, breedId }));
    onChange("breedId", breedId);
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = parseInt(value);
    setDogData((prev) => ({ ...prev, categoryId }));
    onChange("categoryId", categoryId);
  };

  const handleCountryChange = (value: string) => {
    const countryId = parseInt(value);
    setDogData((prev) => ({ ...prev, countryId }));
    onChange("countryId", countryId);
  };

  const handleCityChange = (value: string) => {
    const cityId = parseInt(value);
    setDogData((prev) => ({ ...prev, cityId }));
    onChange("cityId", cityId);
  };

  const handleSireChange = (value: string) => {
    const sireId = parseInt(value);
    setDogData((prev) => ({ ...prev, sireId }));
    onChange("sireId", sireId);
  };

  const handleDamChange = (value: string) => {
    const damId = parseInt(value);
    setDogData((prev) => ({ ...prev, damId }));
    onChange("damId", damId);
  };
  const handleMicrochips = (value: string) => {
    const microchip = value;
    setDogData((prev) => ({ ...prev, microchip }));
    onChange("microchip", microchip);
  };
  console.log(
    "selectedDog?.microchip?.chipId.toString()",
    selectedDog?.microchip?.chipId.toString(),
    microchipOption
  );

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label>
            Select Breed <span className="text-red-500">*</span>
          </Label>
          <Select
            options={breedOptions}
            placeholder={loading ? "Loading breeds..." : "Select Option"}
            onChange={handleBreedChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.breed?.id?.toString()}
          />
        </div>
        <div>
          <Label>
            Dog Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="input"
            name="dogName"
            placeholder="Enter dog name"
            value={formData?.dogName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>
            Dog Category <span className="text-red-500">*</span>
          </Label>
          <Select
            options={categoryOptions}
            placeholder={dogLoading ? "Loading category..." : "Select Option"}
            onChange={handleCategoryChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.category?.name}
          />
        </div>
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            id="input"
            name="location"
            placeholder="Enter location"
            value={formData?.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Country of Origin</Label>
          <Select
            options={countryOptions}
            placeholder={
              countryLoading ? "Loading country..." : "Select Option"
            }
            onChange={handleCountryChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.country?.countryName}
          />
        </div>
        <div>
          <Label>City of Origin</Label>
          <Select
            options={cityOptions}
            placeholder={CityLoading ? "Loading city..." : "Select Option"}
            onChange={handleCityChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.city?.city}
          />
        </div>
        <div>
          <Label>Breeder</Label>
          <Input
            type="text"
            id="input"
            name="breeder"
            placeholder="Enter breeder name"
            value={formData?.breeder}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>
            Sex <span className="text-red-500">*</span>
          </Label>
          <Select
            defaultValue={selectedDog?.sex || ""}
            options={ListGender}
            placeholder="Select an option"
            onChange={(value) => handleSelectChange("sex", value)}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="datePicker">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <div className="relative w-full flatpickr-wrapper">
            <Flatpickr
              value={dateOfBirth ?? undefined}
              onChange={handleDateChange}
              options={{
                dateFormat: "Y-m-d",
                allowInput: true,
                static: true,
                disableMobile: true,
              }}
              placeholder="Select Date"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400 dark:bg-gray-900">
              <CalenderIcon className="size-6" />
            </span>
          </div>
        </div>

        <div>
          <Label>Sire</Label>
          <Select
            // defaultValue={String(selectedDog?.sireId) || ""}
            options={sireOptions}
            placeholder="Select an option"
            onChange={handleSireChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.sire?.id.toString() || ""}
          />
        </div>
        <div>
          <Label>Dam</Label>
          <Select
            // defaultValue={String(selectedDog?.damId) || ""}
            options={damOptions}
            placeholder="Select an option"
            onChange={handleDamChange}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.dam?.id.toString() || ""}
          />
        </div>
        {/* <div>
          <Label>Microchips <span className="text-red-500">*</span></Label>
          <Select
            // defaultValue={String(selectedDog?.damId) || ""}
            options={microchipOption}
            placeholder={microchiploading ? "Loading microchip..." : "Select Option"}
            onChange={handleMicrochips}
            className="dark:bg-dark-900"
            defaultValue={selectedDog?.microchip?.chipId.toString()}
            disabled={!!selectedDog?.microchipId}
          />
        </div>
        <div>
          <Label>ACC Reg # <span className="text-red-500">*</span></Label>
          <Input type="text" id="input" name="KP" value={selectedDog?.KP} onChange={handleChange} disabled={!!selectedDog?.KP}/>
        </div> */}
        {!(selectedDog?.microchipId && selectedDog?.KP) && (
          <>
            <div>
              <Label>Microchips</Label>
              <Select
                options={microchipOption}
                placeholder={
                  microchiploading ? "Loading microchip..." : "Select Option"
                }
                onChange={handleMicrochips}
                className="dark:bg-dark-900"
                defaultValue={selectedDog?.microchip?.chipId.toString()}
                disabled={!!selectedDog?.microchipId}
              />
            </div>
          </>
        )}
        <div>
          <Label>
            ACC Reg # <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="input"
            name="KP"
            value={dogData?.KP || ""}
            onChange={handleChange}
          // disabled={!!selectedDog?.KP}
          />
          {/* <Input
                type="text"
                id="input"
                name="KP"
                value={selectedDog?.KP.toString() || ""}
                onChange={handleChange}
              /> */}
        </div>
        <div>
          <Label>Achievements in Field</Label>
          <Input
            type="text"
            id="input"
            name="achievements"
            value={formData?.achievements}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Depth Chest</Label>
          <Input
            type="text"
            id="input"
            name="chestDepth"
            placeholder="Depth Chest(cm)"
            value={formData?.chestDepth}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Chest Circumference:</Label>
          <Input
            type="text"
            name="chestCircumference"
            id="input"
            value={formData?.chestCircumference}
            onChange={handleChange}
            placeholder="Chest Circumference (cm)"
          />
        </div>
        <div>
          <Label>Weight</Label>
          <Input
            type="text"
            id="input"
            name="weight"
            placeholder="Weight (kg)"
            value={formData?.weight}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Color & Markings</Label>
          <Input
            type="text"
            id="input"
            name="color"
            placeholder="Color & Markings"
            value={formData?.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Hair</Label>
          <Select
            defaultValue={selectedDog?.hair || ""}
            options={ListofHair}
            placeholder="Select an option"
            onChange={(value) => handleSelectChange("hair", value)}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>HD</Label>
          <Select
            defaultValue={selectedDog?.HD || ""}
            options={ListofHD}
            placeholder="Select an option"
            onChange={(value) => handleSelectChange("HD", value)}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>ED</Label>
          <Select
            defaultValue={selectedDog?.ED || ""}
            options={ListofED}
            placeholder="Select an option"
            onChange={(value) => handleSelectChange("ED", value)}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
