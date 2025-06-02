import { useEffect, useState } from "react";
import SelectInputs from "../form/form-elements/components/SelectInputs";
import Input from "../form/input/InputField";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
// import Progeny from "../progeny/Progeny";
import DogList from "../dogsCategory/DogSiblingsList";
import PedigreeTree from "../dogsCategory/react-tree";
import VirtualBreeding from "../dogsCategory/virtualBreeding";
import Progeny from "../progeny/Progeny";
import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
import { useBreedStore } from "../../store/breedStore";
import { useFetchCities } from "../dogsCategory/hooks/useCities";

interface MappedDog {
  id: number;
  title: string;
  registrationNumber: string;
  imageUrl: string;
  breed: string;
  country: string;
  location: string;
  sex: string;
  microchip: string | null;
  birthDate: string;
  sire: string;
  dam: string;
  isDeath: boolean;
  deathDate: string;
  category: string;
  chestDepth: string;
  chestCircumference: string;
  fieldAchievements: string;
  weight: string
  city: string;
  virtuesAndFaults: string;
  breedingAdvice: string;
  miscellaneousComments: string;
  progenyTrainability: string;
}

const DatabaseView = () => {
  // const { loading, error, fetchDogs } = useDogStore();
  const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null);

  const { dogs, loading, error } = useFilteredDogs(String(selectedBreed?.value), String(selectedCity?.value))
  const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
  const [selectedSection, setSelectedSection] = useState("Basic Data");
  const [searchQuery, setSearchQuery] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  console.log(setBreedFilter, setLocationFilter)

  const mappedDogs: MappedDog[] = dogs.map((dog) => ({
    id: dog.id,
    title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
    registrationNumber: dog.KP,
    imageUrl: dog.friendlyUrl
      ? `http://localhost:3000${dog.friendlyUrl}`
      : ``,
    breed: dog.breed?.breed ?? "Unknown",
    country: dog.country?.countryName ?? "Unknown", // ✅ FIXED
    location: dog.city?.city ?? "Unknown", // ✅ FIXED
    sex: dog.sex,
    microchip: dog.microchip?.chipId,
    birthDate: dog.dob,
    sire: dog.sire?.dogName ?? "Unknown",
    dam: dog.dam?.dogName ?? "Unknown",
    isDeath: dog?.isDeath ?? "",
    deathDate: dog?.deathDate ?? "",
    category: dog?.category?.name ?? "",
    chestDepth: dog?.chestDepth ?? "",
    chestCircumference: dog?.chestCircumference ?? "",
    fieldAchievements: dog?.fieldAchievements ?? "",
    weight: dog?.weight ?? "",
    city: dog?.city?.city ?? "",
    virtuesAndFaults: dog?.virtuesAndFaults ?? "",
    breedingAdvice: dog?.breedingAdvice ?? "",
    miscellaneousComments: dog?.miscellaneousComments ?? "",
    progenyTrainability: dog?.progenyTrainability ?? ""
  }));



  const filteredDogs = mappedDogs.filter((dog) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      dog.title.toLowerCase().includes(query) ||
      dog.registrationNumber.toLowerCase().includes(query) ||
      dog.microchip?.toLowerCase().includes(query);

    const matchesBreed = breedFilter ? dog.breed.toLowerCase() === breedFilter.toLowerCase() : true;
    const matchesLocation = locationFilter ? dog.location.toLowerCase() === locationFilter.toLowerCase() : true;

    return matchesQuery && matchesBreed && matchesLocation;
  });



  // Fetch All Cities
  const { city, CityLoading } = useFetchCities();
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (city.length > 0) {
      setCityOptions(
        city.map((city) => ({
          value: city.id.toString(), // Convert number to string
          label: city.city || "",
        }))
      );
    }
  }, [city]);


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
  return (
    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 min-h-[30vh]">
      <Button
        // variant="contained"
        // color="primary"
        onClick={() => setSelectedDog(null)}
        className=""
      >
        ⬅ Back
      </Button>
      {!selectedDog ? (
        <>
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
            🐾 Army Canine Centre
          </h1>

{/* Filters */}
<div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-10 px-2 space-y-4 md:space-y-0 md:space-x-0">
  {/* Breed Selector */}
  <div className="w-full md:w-1/3 pr-2">
    <SelectInputs
      title="Select Breed"
      placeholder={breedLoading ? "Loading breeds..." : "Select Breed"}
      options={breedOptions}
      onChange={(val) => setSelectedBreed({ value: val, label: val })}
      className="w-full dark:bg-gray-700 dark:text-white"
    />
  </div>

  {/* City Selector */}
  <div className="w-full md:w-1/3 px-1">
    <SelectInputs
      title="Select City"
      placeholder={CityLoading ? "Loading Cities..." : "Select City"}
      options={cityOptions}
      onChange={(val) => setSelectedCity({ value: val, label: val })}
      className="w-full dark:bg-gray-700 dark:text-white"
    />
  </div>

  {/* Search Bar */}
  <div className="w-full md:w-1/3 pl-2">
    <div className="flex items-center w-full backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
        />
      </svg>
      <Input
        type="text"
        placeholder="Search by Name, Microchip, ACC #"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base"
      />
    </div>
  </div>
</div>



          {/* Loading */}
          {loading && (
            <div className="text-center mt-10">
              <CircularProgress />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-500 font-semibold">
              {error}
            </div>
          )}

          {/* Dog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredDogs.map((dog) => (
              <Card
                key={dog.id}
                onClick={() => setSelectedDog(dog)}
                className="cursor-pointer shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-5 dark:bg-gray-800 dark:text-red-300">
                  <div className="w-full aspect-w-4 aspect-h-3 mb-4 rounded-lg overflow-hidden">
                    {dog.imageUrl ? (
                      <img
                        src={dog.imageUrl}
                        alt={dog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-300 rounded-lg mb-4">
                        ACC
                      </div>
                    )}
                  </div>
                  <Typography className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                    {dog.title}
                  </Typography>
                  <Typography className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    ACC no #: {dog.registrationNumber}
                  </Typography>

                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 space-y-2 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
            {[
              "Basic Data",
              "Pedigree",
              // "Breed Survey",
              "Siblings",
              "Progeny",
              "Virtual Breeding",
              // "Medical Data",
            ].map((item) => (
              <div
                key={item}
                onClick={() => setSelectedSection(item)}
                className={`px-4 py-2 rounded-lg cursor-pointer transition ${selectedSection === item
                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                • {item}
              </div>
            ))}
          </div>

          {/* Dog Detail View */}
          <div className="w-full md:w-3/4 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {selectedDog.title} (ACC no# {selectedDog.registrationNumber})
            </h2>
            {selectedDog.imageUrl ? (
              <img
                src={selectedDog.imageUrl}
                className="w-32 h-32 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="text-gray-700 dark:text-gray-300 space-y-2 pt-5">
              {selectedSection === "Basic Data" && (
                <>
                  <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-3">
                    <p><strong>Breed:</strong> {selectedDog.breed}</p>
                    <p><strong>Location:</strong> {selectedDog.location}</p>
                    <p><strong>Country:</strong> {selectedDog.country}</p>
                    <p><strong>Sex:</strong> {selectedDog.sex}</p>
                    <p><strong>Microchip:</strong> {selectedDog.microchip}</p>
                    <p><strong>Date of Birth:</strong>  {new Date(selectedDog.birthDate).toISOString().split("T")[0]}
                    </p>
                    <p><strong>Sire:</strong> {selectedDog.sire}</p>
                    <p><strong>Dam:</strong> {selectedDog.dam}</p>
                    <p>
                      <strong>Death or Alive:</strong>{" "}
                      {selectedDog?.isDeath ? "Death" : "Alive"}
                    </p>
                    <p><strong>Death Date:</strong> {selectedDog?.deathDate}</p>
                    <p><strong>Category:</strong> {selectedDog?.category}</p>
                    <p><strong>chestDepth:</strong> {selectedDog?.chestDepth}</p>
                    <p><strong>Chest Circumference:</strong> {selectedDog?.chestCircumference}</p>
                    <p><strong>Field Achievements:</strong> {selectedDog?.fieldAchievements}</p>
                    <p><strong>Weight:</strong> {selectedDog?.weight}</p>
                    <p><strong>City:</strong> {selectedDog?.city}</p>
                    <p><strong>Virtues And Faults:</strong> {selectedDog?.virtuesAndFaults}</p>
                    <p><strong>Breeding Advice:</strong> {selectedDog?.breedingAdvice}</p>
                    <p><strong>Miscellaneous Comments:</strong> {selectedDog?.miscellaneousComments}</p>
                    <p><strong>Progeny Trainability:</strong> {selectedDog?.progenyTrainability}</p>
                  </div>
                </>
              )}
              {/* {selectedSection === "Pedigree" && <Pedigree />} */}
              {selectedSection == "Pedigree" && <PedigreeTree dogId={selectedDog.id} />}
              {selectedSection === "Progeny" && <Progeny dogId={selectedDog.id} />}
              {/* {selectedSection === "Breed Survey" && <div>Breed survey data goes here.</div>} */}
              {selectedSection === "Siblings" && <DogList dogId={selectedDog.id} />}
              {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
              {/* {selectedSection === "Medical Data" && <div>Medical history data goes here.</div>} */}
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseView;
