// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
// // import Progeny from "../progeny/Progeny";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCa
// tegory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DatabaseView = () => {
//   // const { loading, error, fetchDogs } = useDogStore();
//   const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null);

//   const { dogs, loading, error } = useFilteredDogs(String(selectedBreed?.value), String(selectedCity?.value))
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   console.log(setBreedFilter, setLocationFilter)

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl
//       ? `http://localhost:3000${dog.friendlyUrl}`
//       : ``,
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown", // ✅ FIXED
//     location: dog.city?.city ?? "Unknown", // ✅ FIXED
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog?.isDeath ?? "",
//     deathDate: dog?.deathDate ?? "",
//     category: dog?.category?.name ?? "",
//     chestDepth: dog?.chestDepth ?? "",
//     chestCircumference: dog?.chestCircumference ?? "",
//     weight: dog?.weight ?? "",
//     city: dog?.city?.city ?? "",
//     virtuesAndFaults: dog?.virtuesAndFaults ?? "",
//     breedingAdvice: dog?.breedingAdvice ?? "",
//     miscellaneousComments: dog?.miscellaneousComments ?? "",
//     progenyTrainability: dog?.progenyTrainability ?? ""
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     const matchesQuery =
//       dog.title.toLowerCase().includes(query) ||
//       dog.registrationNumber.toLowerCase().includes(query) ||
//       dog.microchip?.toLowerCase().includes(query);

//     const matchesBreed = breedFilter ? dog.breed.toLowerCase() === breedFilter.toLowerCase() : true;
//     const matchesLocation = locationFilter ? dog.location.toLowerCase() === locationFilter.toLowerCase() : true;

//     return matchesQuery && matchesBreed && matchesLocation;
//   });

//   // Fetch All Cities
//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(
//         city.map((city) => ({
//           value: city.id.toString(), // Convert number to string
//           label: city.city || "",
//         }))
//       );
//     }
//   }, [city]);

//   // Fetch Breeds from store
//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     const fetchBreeds = async () => {
//       await getAllBreeds(); // Fetch breeds from store
//     };
//     fetchBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(
//         breeds.map((breed) => ({
//           value: breed.id.toString(), // Convert number to string
//           label: breed.breed || "",
//         }))
//       );
//     }
//   }, [breeds]);
//   return (
//     <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 min-h-[30vh]">
//       <Button
//         // variant="contained"
//         // color="primary"
//         onClick={() => setSelectedDog(null)}
//         className=""
//       >
//         ⬅ Back
//       </Button>
//       {!selectedDog ? (
//         <>
//           <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
//             🐾 Army Canine Centre
//           </h1>

// {/* Filters */}
// <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-10 px-2 space-y-4 md:space-y-0 md:space-x-0">
//   {/* Breed Selector */}
//   <div className="w-full md:w-1/3 pr-2">
//     <SelectInputs
//       title="Select Breed"
//       placeholder={breedLoading ? "Loading breeds..." : "Select Breed"}
//       options={breedOptions}
//       onChange={(val) => setSelectedBreed({ value: val, label: val })}
//       className="w-full dark:bg-gray-700 dark:text-white"
//     />
//   </div>

//   {/* City Selector */}
//   <div className="w-full md:w-1/3 px-1">
//     <SelectInputs
//       title="Select City"
//       placeholder={CityLoading ? "Loading Cities..." : "Select City"}
//       options={cityOptions}
//       onChange={(val) => setSelectedCity({ value: val, label: val })}
//       className="w-full dark:bg-gray-700 dark:text-white"
//     />
//   </div>

//   {/* Search Bar */}
//   <div className="w-full md:w-1/3 pl-2">
//     <div className="flex items-center w-full backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
//         />
//       </svg>
//       <Input
//         type="text"
//         placeholder="Search by Name, Microchip, ACC #"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base"
//       />
//     </div>
//   </div>
// </div>

//           {/* Loading */}
//           {loading && (
//             <div className="text-center mt-10">
//               <CircularProgress />
//             </div>
//           )}

//           {/* Error */}
//           {error && (
//             <div className="text-center text-red-500 font-semibold">
//               {error}
//             </div>
//           )}

//           {/* Dog Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {filteredDogs.map((dog) => (
//               <Card
//                 key={dog.id}
//                 onClick={() => setSelectedDog(dog)}
//                 className="cursor-pointer shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//               >
//                 <CardContent className="p-5 dark:bg-gray-800 dark:text-red-300">
//                   <div className="w-full aspect-w-4 aspect-h-3 mb-4 rounded-lg overflow-hidden">
//                     {dog.imageUrl ? (
//                       <img
//                         src={dog.imageUrl}
//                         alt={dog.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-300 rounded-lg mb-4">
//                         ACC
//                       </div>
//                     )}
//                   </div>
//                   <Typography className="text-lg font-semibold text-gray-800 dark:text-white text-center">
//                     {dog.title}
//                   </Typography>
//                   <Typography className="text-sm text-gray-500 dark:text-gray-400 text-center">
//                     ACC no #: {dog.registrationNumber}
//                   </Typography>

//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <div className="w-full md:w-1/4 space-y-2 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
//             {[
//               "Basic Data",
//               "Pedigree",
//               // "Breed Survey",
//               "Siblings",
//               "Progeny",
//               "Virtual Breeding",
//               // "Medical Data",
//             ].map((item) => (
//               <div
//                 key={item}
//                 onClick={() => setSelectedSection(item)}
//                 className={`px-4 py-2 rounded-lg cursor-pointer transition ${selectedSection === item
//                   ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white font-semibold"
//                   : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                   }`}
//               >
//                 • {item}
//               </div>
//             ))}
//           </div>

//           {/* Dog Detail View */}
//           <div className="w-full md:w-3/4 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
//             <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
//               {selectedDog.title} (ACC no# {selectedDog.registrationNumber})
//             </h2>
//             {selectedDog.imageUrl ? (
//               <img
//                 src={selectedDog.imageUrl}
//                 className="w-32 h-32 rounded-lg object-cover border border-gray-200"
//               />
//             ) : (
//               <div className="w-32 h-32 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
//                 No Image
//               </div>
//             )}
//             <div className="text-gray-700 dark:text-gray-300 space-y-2 pt-5">
//               {selectedSection === "Basic Data" && (
//                 <>
//                   <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-3">
//                     <p><strong>Breed:</strong> {selectedDog.breed}</p>
//                     <p><strong>Location:</strong> {selectedDog.location}</p>
//                     <p><strong>Country:</strong> {selectedDog.country}</p>
//                     <p><strong>Sex:</strong> {selectedDog.sex}</p>
//                     <p><strong>Microchip:</strong> {selectedDog.microchip}</p>
//                     <p><strong>Date of Birth:</strong>  {new Date(selectedDog.birthDate).toISOString().split("T")[0]}
//                     </p>
//                     <p><strong>Sire:</strong> {selectedDog.sire}</p>
//                     <p><strong>Dam:</strong> {selectedDog.dam}</p>
//                     <p>
//                       <strong>Death or Alive:</strong>{" "}
//                       {selectedDog?.isDeath ? "Death" : "Alive"}
//                     </p>
//                     <p><strong>Death Date:</strong> {selectedDog?.deathDate}</p>
//                     <p><strong>Category:</strong> {selectedDog?.category}</p>
//                     <p><strong>chestDepth:</strong> {selectedDog?.chestDepth}</p>
//                     <p><strong>Chest Circumference:</strong> {selectedDog?.chestCircumference}</p>
//                     <p><strong>Weight:</strong> {selectedDog?.weight}</p>
//                     <p><strong>City:</strong> {selectedDog?.city}</p>
//                     <p><strong>Virtues And Faults:</strong> {selectedDog?.virtuesAndFaults}</p>
//                     <p><strong>Breeding Advice:</strong> {selectedDog?.breedingAdvice}</p>
//                     <p><strong>Miscellaneous Comments:</strong> {selectedDog?.miscellaneousComments}</p>
//                     <p><strong>Progeny Trainability:</strong> {selectedDog?.progenyTrainability}</p>
//                   </div>
//                 </>
//               )}
//               {/* {selectedSection === "Pedigree" && <Pedigree />} */}
//               {selectedSection == "Pedigree" && <PedigreeTree dogId={selectedDog.id} />}
//               {/* {selectedSection == "Pedigree" && <PedigreeTree dogId={selectedDog.id} lineage={"sire"} />} */}

//               {selectedSection === "Progeny" && <Progeny dogId={selectedDog.id} />}
//               {/* {selectedSection === "Breed Survey" && <div>Breed survey data goes here.</div>} */}
//               {selectedSection === "Siblings" && <DogList dogId={selectedDog.id} />}
//               {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//               {/* {selectedSection === "Medical Data" && <div>Medical history data goes here.</div>} */}
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatabaseView;

// shamim changes-1

// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DatabaseView = () => {
//   const [selectedBreed, setSelectedBreed] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);

//   const { dogs, loading, error } = useFilteredDogs(
//     String(selectedBreed?.value),
//     String(selectedCity?.value)
//   );

//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");

//   // Map API data into our MappedDog shape
//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : "",
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown",
//     location: dog.city?.city ?? "Unknown",
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId ?? null,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog?.isDeath ?? false,
//     deathDate: dog?.deathDate ?? "",
//     category: dog?.category?.name ?? "",
//     chestDepth: dog?.chestDepth ?? "",
//     chestCircumference: dog?.chestCircumference ?? "",
//     weight: dog?.weight ?? "",
//     city: dog?.city?.city ?? "",
//     virtuesAndFaults: dog?.virtuesAndFaults ?? "",
//     breedingAdvice: dog?.breedingAdvice ?? "",
//     miscellaneousComments: dog?.miscellaneousComments ?? "",
//     progenyTrainability: dog?.progenyTrainability ?? "",
//   }));

//   // Filter dogs based on search, breed, location
//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     const matchesQuery =
//       dog.title.toLowerCase().includes(query) ||
//       dog.registrationNumber.toLowerCase().includes(query) ||
//       dog.microchip?.toLowerCase().includes(query);

//     const matchesBreed = breedFilter
//       ? dog.breed.toLowerCase() === breedFilter.toLowerCase()
//       : true;
//     const matchesLocation = locationFilter
//       ? dog.location.toLowerCase() === locationFilter.toLowerCase()
//       : true;

//     return matchesQuery && matchesBreed && matchesLocation;
//   });

//   // Fetch all cities
//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(
//         city.map((c) => ({
//           value: c.id.toString(),
//           label: c.city || "",
//         }))
//       );
//     }
//   }, [city]);

//   // Fetch breeds from store
//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     const fetchBreeds = async () => {
//       await getAllBreeds();
//     };
//     fetchBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(
//         breeds.map((breed) => ({
//           value: breed.id.toString(),
//           label: breed.breed || "",
//         }))
//       );
//     }
//   }, [breeds]);

//   return (
//     <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 min-h-[30vh]">
//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={() => setSelectedDog(null)}
//         className="mb-4"
//       >
//         ← Back
//       </Button>

//       {!selectedDog ? (
//         <>
//           <Typography
//             variant="h3"
//             component="h1"
//             className="mb-10 text-center font-extrabold text-gray-900 dark:text-white"
//           >
//             🐾 Army Canine Centre
//           </Typography>

//           {/* Filters */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
//             {/* Breed Selector */}
//             <div className="w-full md:w-1/3">
//               <SelectInputs
//                 title="Select Breed"
//                 placeholder={breedLoading ? "Loading breeds..." : "Select Breed"}
//                 options={breedOptions}
//                 onChange={(val) => setSelectedBreed({ value: val, label: val })}
//                 className="w-full dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             {/* City Selector */}
//             <div className="w-full md:w-1/3">
//               <SelectInputs
//                 title="Select City"
//                 placeholder={CityLoading ? "Loading Cities..." : "Select City"}
//                 options={cityOptions}
//                 onChange={(val) => setSelectedCity({ value: val, label: val })}
//                 className="w-full dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             {/* Search Bar */}
//             <div className="w-full md:w-1/3">
//               <div className="flex items-center w-full backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
//                   />
//                 </svg>
//                 <Input
//                   type="text"
//                   aria-label="Search dogs by Name, Microchip or ACC number"
//                   placeholder="Search by Name, Microchip, ACC #"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="text-center mt-16">
//               <CircularProgress />
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <Typography
//               variant="body1"
//               color="error"
//               className="text-center font-semibold mt-6"
//             >
//               {error}
//             </Typography>
//           )}

//           {/* Dog Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {filteredDogs.map((dog) => (
//               <Card
//                 key={dog.id}
//                 onClick={() => setSelectedDog(dog)}
//                 className="cursor-pointer shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-105 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     setSelectedDog(dog);
//                   }
//                 }}
//                 aria-label={`View details for ${dog.title}`}
//               >
//                 <CardContent className="p-5 dark:bg-gray-800 dark:text-red-300">
//                   <div className="w-full aspect-w-4 aspect-h-3 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
//                     {dog.imageUrl ? (
//                       <img
//                         src={dog.imageUrl}
//                         alt={dog.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-40 text-red-500 dark:text-red-300 font-bold text-xl select-none">
//                         ACC
//                       </div>
//                     )}
//                   </div>
//                   <Typography
//                     variant="h6"
//                     component="h3"
//                     className="text-center text-gray-800 dark:text-white"
//                   >
//                     {dog.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="text-center text-gray-500 dark:text-gray-400"
//                   >
//                     ACC no #: {dog.registrationNumber}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar Navigation */}
//           <nav
//             aria-label="Dog detail sections"
//             className="w-full md:w-1/4 space-y-2 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl"
//           >
//             {[
//               "Basic Data",
//               "Pedigree",
//               "Siblings",
//               "Progeny",
//               "Virtual Breeding",
//             ].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setSelectedSection(item)}
//                 className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
//                   selectedSection === item
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-blue-100 dark:hover:bg-blue-900 dark:text-gray-300"
//                 }`}
//                 aria-current={selectedSection === item ? "true" : undefined}
//               >
//                 {item}
//               </button>
//             ))}
//           </nav>

//           {/* Content Area */}
//           <section className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg overflow-auto max-h-[80vh]">
//             {selectedSection === "Basic Data" && (
//               <DogList dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Pedigree" && (
//               <PedigreeTree dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Siblings" && (
//               <DogList dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Progeny" && (
//               <Progeny dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Virtual Breeding" && (
//               <VirtualBreeding />
//             )}
//           </section>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatabaseView;

//shamim changes-2
// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Divider,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";
// import {
//   Pets as PetsIcon,
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Cake as CakeIcon,
//   LocationOn as LocationIcon,
//   Flag as FlagIcon,
//   Fingerprint as FingerprintIcon,
//   Psychology as PsychologyIcon,
//   Science as ScienceIcon,
//   FamilyRestroom as FamilyIcon,
//   AccountTree as PedigreeIcon,
//   FavoriteBorder as FavoriteBorderIcon,
// } from "@mui/icons-material";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DetailItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <Box className="flex items-center gap-2 mb-2">
//     {icon && <Box className="text-green-600 dark:text-green-400">{icon}</Box>}
//     <Typography
//       variant="body2"
//       className="font-semibold text-gray-700 dark:text-gray-300 min-w-[130px]"
//     >
//       {label}:
//     </Typography>
//     <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
//       {value}
//     </Typography>
//   </Box>
// );

// const DatabaseView = () => {
//   const [selectedBreed, setSelectedBreed] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);

//   const { dogs, loading, error } = useFilteredDogs(
//     String(selectedBreed?.value),
//     String(selectedCity?.value)
//   );
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");

//   // Navigation items with icons
//   const navItems = [
//     { name: "Basic Data", icon: <PetsIcon /> },
//     { name: "Pedigree", icon: <PedigreeIcon /> },
//     { name: "Siblings", icon: <FamilyIcon /> },
//     { name: "Progeny", icon: <PsychologyIcon /> },
//     { name: "Virtual Breeding", icon: <ScienceIcon /> },
//   ];

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : ``,
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown",
//     location: dog.city?.city ?? "Unknown",
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog?.isDeath ?? false,
//     deathDate: dog?.deathDate ?? "",
//     category: dog?.category?.name ?? "",
//     chestDepth: dog?.chestDepth ?? "",
//     chestCircumference: dog?.chestCircumference ?? "",
//     weight: dog?.weight ?? "",
//     city: dog?.city?.city ?? "",
//     virtuesAndFaults: dog?.virtuesAndFaults ?? "",
//     breedingAdvice: dog?.breedingAdvice ?? "",
//     miscellaneousComments: dog?.miscellaneousComments ?? "",
//     progenyTrainability: dog?.progenyTrainability ?? "",
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       (dog.title.toLowerCase().includes(query) ||
//         dog.registrationNumber.toLowerCase().includes(query) ||
//         dog.microchip?.toLowerCase().includes(query)) &&
//       (breedFilter ? dog.breed.toLowerCase() === breedFilter.toLowerCase() : true) &&
//       (locationFilter
//         ? dog.location.toLowerCase() === locationFilter.toLowerCase()
//         : true)
//     );
//   });

//   // Fetch All Cities
//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>(
//     []
//   );

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(
//         city.map((city) => ({
//           value: city.id.toString(),
//           label: city.city || "",
//         }))
//       );
//     }
//   }, [city]);

//   // Fetch Breeds from store
//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>(
//     []
//   );

//   useEffect(() => {
//     const fetchBreeds = async () => {
//       await getAllBreeds();
//     };
//     fetchBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(
//         breeds.map((breed) => ({
//           value: breed.id.toString(),
//           label: breed.breed || "",
//         }))
//       );
//     }
//   }, [breeds]);

//   return (
//     <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       {/* Back Button */}
//       {selectedDog && (
//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={() => setSelectedDog(null)}
//           className="mb-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           Back to List
//         </Button>
//       )}

//       {!selectedDog ? (
//         <>
//           {/* Header */}
//           <Box className="text-center mb-8">
//             <Typography
//               variant="h3"
//               className="font-bold text-gray-800 dark:text-white"
//             >
//               <span className="text-green-600">Army Canine Centre</span> Database
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               className="text-gray-500 dark:text-gray-400"
//             >
//               Comprehensive registry of working dogs
//             </Typography>
//           </Box>

//           {/* Filters */}
//           <Box className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
//             {/* Breed Selector */}
//             <Box className="w-full md:w-1/3">
//               <SelectInputs
//                 title="Select Breed"
//                 placeholder={breedLoading ? "Loading breeds..." : "Filter by Breed"}
//                 options={breedOptions}
//                 onChange={(val) =>
//                   setSelectedBreed({ value: val, label: val })
//                 }
//                 className="w-full"
//               />
//             </Box>

//             {/* City Selector */}
//             <Box className="w-full md:w-1/3">
//               <SelectInputs
//                 title="Select Location"
//                 placeholder={CityLoading ? "Loading cities..." : "Filter by City"}
//                 options={cityOptions}
//                 onChange={(val) => setSelectedCity({ value: val, label: val })}
//                 className="w-full"
//               />
//             </Box>

//             {/* Search Bar */}
//             <Box className="w-full md:w-1/3 relative">
//               <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Search dogs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//                 aria-label="Search dogs"
//               />
//             </Box>
//           </Box>

//           {/* Dogs List */}
//           <Box
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//             aria-live="polite"
//           >
//             {loading ? (
//               <Box className="col-span-full flex justify-center items-center p-4">
//                 <CircularProgress />
//               </Box>
//             ) : filteredDogs.length === 0 ? (
//               <Box className="col-span-full text-center text-gray-500">
//                 No dogs found matching your criteria.
//               </Box>
//             ) : (
//               filteredDogs.map((dog) => (
//                 <Card
//                   key={dog.id}
//                   className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-900 dark:text-gray-100"
//                   onClick={() => setSelectedDog(dog)}
//                   aria-label={`View details of ${dog.title}`}
//                 >
//                   <CardContent>
//                     <Box className="flex flex-col items-center gap-2">
//                       <Avatar
//                         src={dog.imageUrl}
//                         alt={`${dog.title} picture`}
//                         sx={{ width: 150, height: 150 }}
//                         variant="rounded"
//                         className="mb-2"
//                       />
//                       <Typography
//                         variant="h6"
//                         className="font-semibold text-center text-gray-900 dark:text-gray-100"
//                       >
//                         {dog.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         className="text-green-600 dark:text-green-400 text-center"
//                       >
//                         {dog.registrationNumber}
//                       </Typography>
//                       <Chip
//                         label={dog.breed}
//                         className="capitalize text-xs font-semibold mt-1"
//                         color="success"
//                         size="small"
//                       />
//                       <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
//                         {dog.location}
//                       </Typography>
//                       <Box className="flex gap-2 mt-2">
//                         {dog.sex === "male" ? (
//                           <MaleIcon color="primary" />
//                         ) : dog.sex === "female" ? (
//                           <FemaleIcon color="secondary" />
//                         ) : null}
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </Box>
//         </>
//       ) : (
//         // Selected Dog Details
//         <Box className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
//           {/* Navigation Tabs */}
//           <Box className="flex flex-wrap gap-4 mb-6 border-b border-gray-300 dark:border-gray-700">
//             {navItems.map(({ name, icon }) => (
//               <Button
//                 key={name}
//                 startIcon={icon}
//                 variant={selectedSection === name ? "contained" : "outlined"}
//                 onClick={() => setSelectedSection(name)}
//                 size="small"
//                 className="capitalize"
//                 aria-current={selectedSection === name ? "page" : undefined}
//               >
//                 {name}
//               </Button>
//             ))}
//           </Box>

//           {/* Section Content */}
//           {selectedSection === "Basic Data" && (
//             <Box>
//               <Box className="flex gap-4 flex-wrap items-center justify-center mb-6">
//                 <Avatar
//                   src={selectedDog.imageUrl}
//                   alt={`${selectedDog.title} picture`}
//                   sx={{ width: 180, height: 180 }}
//                   variant="rounded"
//                 />
//                 <Box>
//                   <Typography variant="h4" className="font-bold mb-2">
//                     {selectedDog.title}
//                   </Typography>
//                   <Typography variant="subtitle1" className="mb-4 text-gray-600 dark:text-gray-400">
//                     Reg #: {selectedDog.registrationNumber}
//                   </Typography>
//                   <Typography variant="body2" className="mb-1">
//                     {selectedDog.sex === "male" ? (
//                       <MaleIcon color="primary" className="mr-1" />
//                     ) : selectedDog.sex === "female" ? (
//                       <FemaleIcon color="secondary" className="mr-1" />
//                     ) : null}
//                     <strong>Sex:</strong> {selectedDog.sex}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Divider className="mb-6" />

//               {/* Details Grid */}
//               <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <DetailItem icon={<CakeIcon />} label="Birth Date" value={new Date(selectedDog.birthDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} />
//                 <DetailItem icon={<LocationIcon />} label="Location" value={selectedDog.location} />
//                 <DetailItem icon={<FlagIcon />} label="Country" value={selectedDog.country} />
//                 <DetailItem icon={<FingerprintIcon />} label="Microchip" value={selectedDog.microchip ?? "N/A"} />
//                 <DetailItem icon={<FamilyIcon />} label="Sire" value={selectedDog.sire} />
//                 <DetailItem icon={<FamilyIcon />} label="Dam" value={selectedDog.dam} />
//                 <DetailItem label="Is Deceased" value={selectedDog.isDeath ? "Yes" : "No"} />
//                 {selectedDog.isDeath && (
//                   <DetailItem
//                     label="Death Date"
//                     value={new Date(selectedDog.deathDate).toLocaleDateString(undefined, {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   />
//                 )}
//                 <DetailItem label="Category" value={selectedDog.category} />
//                 <DetailItem label="Chest Depth" value={selectedDog.chestDepth} />
//                 <DetailItem label="Chest Circumference" value={selectedDog.chestCircumference} />
//                 <DetailItem label="Weight" value={selectedDog.weight} />
//                 <DetailItem label="Virtues and Faults" value={selectedDog.virtuesAndFaults} />
//                 <DetailItem label="Breeding Advice" value={selectedDog.breedingAdvice} />
//                 <DetailItem label="Miscellaneous Comments" value={selectedDog.miscellaneousComments} />
//                 <DetailItem label="Progeny Trainability" value={selectedDog.progenyTrainability} />
//               </Box>
//             </Box>
//           )}

//           {selectedSection === "Pedigree" && <PedigreeTree dogId={selectedDog.id} />}

//           {selectedSection === "Siblings" && <DogList dogId={selectedDog.id} />}

//           {selectedSection === "Progeny" && <Progeny dogId={selectedDog.id} />}

//           {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//         </Box>
//       )}
//     </div>
//   );
// };

// export default DatabaseView;

//shamim changes-3

// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Divider,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";
// import {
//   Pets as PetsIcon,
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Cake as CakeIcon,
//   LocationOn as LocationIcon,
//   Flag as FlagIcon,
//   Fingerprint as FingerprintIcon,
//   Psychology as PsychologyIcon,
//   Science as ScienceIcon,
//   FamilyRestroom as FamilyIcon,
//   AccountTree as PedigreeIcon,
// } from "@mui/icons-material";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DetailItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <Box className="flex items-center gap-2 mb-2">
//     {icon && <Box className="text-green-600 dark:text-green-400">{icon}</Box>}
//     <Typography
//       variant="body2"
//       sx={{
//         fontWeight: 600,
//         color: "text.primary",
//         minWidth: { xs: 100, sm: 130 },
//       }}
//     >
//       {label}:
//     </Typography>
//     <Typography variant="body2" sx={{ color: "text.secondary" }}>
//       {value}
//     </Typography>
//   </Box>
// );

// const DatabaseView = () => {
//   const [selectedBreed, setSelectedBreed] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const { dogs, loading, error } = useFilteredDogs(
//     String(selectedBreed?.value),
//     String(selectedCity?.value)
//   );
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");

//   const navItems = [
//     { name: "Basic Data", icon: <PetsIcon /> },
//     { name: "Pedigree", icon: <PedigreeIcon /> },
//     { name: "Siblings", icon: <FamilyIcon /> },
//     { name: "Progeny", icon: <PsychologyIcon /> },
//     { name: "Virtual Breeding", icon: <ScienceIcon /> },
//   ];

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : ``,
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown",
//     location: dog.city?.city ?? "Unknown",
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog.isDeath ?? false,
//     deathDate: dog.deathDate ?? "",
//     category: dog.category?.name ?? "",
//     chestDepth: dog.chestDepth ?? "",
//     chestCircumference: dog.chestCircumference ?? "",
//     weight: dog.weight ?? "",
//     city: dog.city?.city ?? "",
//     virtuesAndFaults: dog.virtuesAndFaults ?? "",
//     breedingAdvice: dog.breedingAdvice ?? "",
//     miscellaneousComments: dog.miscellaneousComments ?? "",
//     progenyTrainability: dog.progenyTrainability ?? "",
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       (dog.title.toLowerCase().includes(query) ||
//         dog.registrationNumber.toLowerCase().includes(query) ||
//         dog.microchip?.toLowerCase().includes(query)) &&
//       (breedFilter
//         ? dog.breed.toLowerCase() === breedFilter.toLowerCase()
//         : true) &&
//       (locationFilter
//         ? dog.location.toLowerCase() === locationFilter.toLowerCase()
//         : true)
//     );
//   });

//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(
//         city.map((c) => ({ value: c.id.toString(), label: c.city || "" }))
//       );
//     }
//   }, [city]);

//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     getAllBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(
//         breeds.map((b) => ({ value: b.id.toString(), label: b.breed || "" }))
//       );
//     }
//   }, [breeds]);

//   return (
//     <>
//       <style>
//         {`
//           .database-view {
//             min-height: 100vh;
//             padding: 1rem;
//           }

//           @media (min-width: 640px) {
//             .database-view {
//               padding: 1.5rem;
//             }
//           }

//           @media (min-width: 1024px) {
//             .database-view {
//               padding: 2rem;
//             }
//           }

//           .filter-section {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//             margin-bottom: 2rem;
//             padding: 1rem;
//             background: white;
//             border-radius: 0.75rem;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }

//           @media (min-width: 768px) {
//             .filter-section {
//               flex-direction: row;
//               align-items: center;
//               justify-content: space-between;
//               padding: 1.5rem;
//             }
//           }

//           .filter-section > div {
//             flex: 1;
//             min-width: 0;
//           }

//           .dog-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 1.5rem;
//           }

//           @media (max-width: 640px) {
//             .dog-grid {
//               grid-template-columns: 1fr;
//             }
//           }

//           .dog-card {
//             transition: transform 0.25s ease, box-shadow 0.25s ease;
//           }

//           .dog-card:hover {
//             transform: scale(1.03);
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.08);
//           }

//           .dog-details {
//             max-width: 90%;
//             margin: 0 auto;
//             padding: 1.5rem;
//             border-radius: 0.75rem;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }

//           @media (min-width: 1024px) {
//             .dog-details {
//               max-width: 80rem;
//             }
//           }

//           .nav-buttons {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 0.5rem;
//             margin-bottom: 1.5rem;
//             border-bottom: 1px solid #e0e0e0;
//             padding-bottom: 1rem;
//           }

//           @media (max-width: 640px) {
//             .nav-buttons {
//               flex-direction: column;
//               align-items: stretch;
//             }
//           }

//           .dog-details-header {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 1rem;
//             margin-bottom: 1.5rem;
//           }

//           @media (min-width: 768px) {
//             .dog-details-header {
//               flex-direction: row;
//               justify-content: center;
//             }
//           }

//           .details-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }

//           @media (min-width: 640px) {
//             .details-grid {
//               grid-template-columns: repeat(2, 1fr);
//             }
//           }

//           @media (min-width: 1024px) {
//             .details-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }

//           .avatar-img {
//             max-width: 100%;
//             height: auto;
//           }

//           h3 {
//             font-size: 1.5rem;
//             font-weight: bold;
//           }

//           @media (min-width: 640px) {
//             h3 {
//               font-size: 2rem;
//             }
//           }

//           @media (min-width: 1024px) {
//             h3 {
//               font-size: 2.5rem;
//             }
//           }
//         `}
//       </style>
//       <div className="database-view bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         {selectedDog && (
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => setSelectedDog(null)}
//             sx={{
//               mb: 4,
//               fontWeight: 600,
//               color: "text.secondary",
//               transition: "background-color 0.3s ease",
//               "&:hover": {
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === "dark"
//                     ? "rgba(255,255,255,0.12)"
//                     : "rgba(0,0,0,0.08)",
//               },
//             }}
//           >
//             Back to List
//           </Button>
//         )}

//         {!selectedDog ? (
//           <>
//             <Box className="text-center mb-8">
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "text.primary",
//                   fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
//                 }}
//               >
//                 <Box component="span" sx={{ color: "success.main" }}>
//                   Army Canine Centre
//                 </Box>{" "}
//                 Database
//               </Typography>
//               <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
//                 Comprehensive registry of working dogs
//               </Typography>
//             </Box>

//             <Box className="filter-section">
//               <Box>
//                 <SelectInputs
//                   title="Select Breed"
//                   placeholder={
//                     breedLoading ? "Loading breeds..." : "Filter by Breed"
//                   }
//                   options={breedOptions}
//                   onChange={(val) =>
//                     setSelectedBreed({ value: val, label: val })
//                   }
//                   className="w-full"
//                 />
//               </Box>
//               <Box>
//                 <SelectInputs
//                   title="Select Location"
//                   placeholder={
//                     CityLoading ? "Loading cities..." : "Filter by City"
//                   }
//                   options={cityOptions}
//                   onChange={(val) =>
//                     setSelectedCity({ value: val, label: val })
//                   }
//                   className="w-full"
//                 />
//               </Box>
//               <Box className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search dogs..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 w-full"
//                   aria-label="Search dogs"
//                 />
//               </Box>
//             </Box>

//             <Box className="dog-grid" aria-live="polite">
//               {loading ? (
//                 <Box className="col-span-full flex justify-center items-center p-4">
//                   <CircularProgress />
//                 </Box>
//               ) : filteredDogs.length === 0 ? (
//                 <Box className="col-span-full text-center text-gray-500">
//                   No dogs found matching your criteria.
//                 </Box>
//               ) : (
//                 filteredDogs.map((dog) => (
//                   <Card
//                     key={dog.id}
//                     onClick={() => setSelectedDog(dog)}
//                     aria-label={`View details of ${dog.title}`}
//                     className="dog-card"
//                     sx={{
//                       cursor: "pointer",
//                       backgroundColor: (theme) =>
//                         theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
//                     }}
//                   >
//                     <CardContent>
//                       <Box className="flex flex-col items-center gap-2">
//                         <Avatar
//                           src={dog.imageUrl}
//                           alt={`${dog.title} picture`}
//                           sx={{
//                             width: { xs: 120, sm: 150 },
//                             height: { xs: 120, sm: 150 },
//                             borderRadius: 2,
//                             mb: 1,
//                           }}
//                           variant="rounded"
//                           className="avatar-img"
//                         />
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             fontWeight: 700,
//                             textAlign: "center",
//                             color: (theme) =>
//                               theme.palette.mode === "dark"
//                                 ? "#e0e0e0"
//                                 : "#1b5e20",
//                             fontSize: { xs: "1rem", sm: "1.25rem" },
//                           }}
//                         >
//                           {dog.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "success.main",
//                             fontWeight: 600,
//                             textAlign: "center",
//                             fontSize: { xs: "0.875rem", sm: "1rem" },
//                           }}
//                         >
//                           {dog.registrationNumber}
//                         </Typography>
//                         <Chip
//                           label={dog.breed}
//                           color="success"
//                           size="small"
//                           sx={{
//                             fontWeight: "bold",
//                             letterSpacing: "0.05em",
//                             textTransform: "capitalize",
//                           }}
//                         />
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "text.secondary",
//                             mt: 0.5,
//                             textAlign: "center",
//                             fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                           }}
//                         >
//                           {dog.location}
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                           {dog.sex === "male" ? (
//                             <MaleIcon fontSize="medium" color="primary" />
//                           ) : dog.sex === "female" ? (
//                             <FemaleIcon fontSize="medium" color="secondary" />
//                           ) : null}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </Box>
//           </>
//         ) : (
//           <Box className="dog-details bg-white dark:bg-gray-900">
//             <Box className="nav-buttons">
//               {navItems.map(({ name, icon }) => (
//                 <Button
//                   key={name}
//                   startIcon={icon}
//                   variant={selectedSection === name ? "contained" : "outlined"}
//                   onClick={() => setSelectedSection(name)}
//                   size="small"
//                   sx={{
//                     textTransform: "capitalize",
//                     flex: { xs: "1 0 100%", sm: "0 1 auto" },
//                     fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                   }}
//                 >
//                   {name}
//                 </Button>
//               ))}
//             </Box>

//             {selectedSection === "Basic Data" && (
//               <Box>
//                 <Box className="dog-details-header">
//                   <Avatar
//                     src={selectedDog.imageUrl}
//                     alt={`${selectedDog.title} picture`}
//                     sx={{
//                       width: { xs: 120, sm: 150, md: 180 },
//                       height: { xs: 120, sm: 150, md: 180 },
//                       borderRadius: 2,
//                     }}
//                     variant="rounded"
//                     className="avatar-img"
//                   />
//                   <Box>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         fontWeight: 700,
//                         mb: 1,
//                         fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
//                       }}
//                     >
//                       {selectedDog.title}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: "text.secondary",
//                         mb: 2,
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                       }}
//                     >
//                       Reg #: {selectedDog.registrationNumber}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
//                     >
//                       {selectedDog.sex === "male" ? (
//                         <MaleIcon
//                           color="primary"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       ) : (
//                         <FemaleIcon
//                           color="secondary"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       )}
//                       <strong>Sex:</strong> {selectedDog.sex}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ mb: 4 }} />

//                 <Box className="details-grid">
//                   <DetailItem
//                     icon={<CakeIcon />}
//                     label="Birth Date"
//                     value={new Date(selectedDog.birthDate).toLocaleDateString(
//                       undefined,
//                       {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }
//                     )}
//                   />
//                   <DetailItem
//                     icon={<LocationIcon />}
//                     label="Location"
//                     value={selectedDog.location}
//                   />
//                   <DetailItem
//                     icon={<FlagIcon />}
//                     label="Country"
//                     value={selectedDog.country}
//                   />
//                   <DetailItem
//                     icon={<FingerprintIcon />}
//                     label="Microchip"
//                     value={selectedDog.microchip ?? "N/A"}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Sire"
//                     value={selectedDog.sire}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Dam"
//                     value={selectedDog.dam}
//                   />
//                   <DetailItem
//                     label="Is Deceased"
//                     value={selectedDog.isDeath ? "Yes" : "No"}
//                   />
//                   {selectedDog.isDeath && (
//                     <DetailItem
//                       label="Death Date"
//                       value={new Date(selectedDog.deathDate).toLocaleDateString(
//                         undefined,
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         }
//                       )}
//                     />
//                   )}
//                   <DetailItem label="Category" value={selectedDog.category} />
//                   <DetailItem
//                     label="Chest Depth"
//                     value={selectedDog.chestDepth}
//                   />
//                   <DetailItem
//                     label="Chest Circumference"
//                     value={selectedDog.chestCircumference}
//                   />
//                   <DetailItem label="Weight" value={selectedDog.weight} />
//                   <DetailItem
//                     label="Virtues and Faults"
//                     value={selectedDog.virtuesAndFaults}
//                   />
//                   <DetailItem
//                     label="Breeding Advice"
//                     value={selectedDog.breedingAdvice}
//                   />
//                   <DetailItem
//                     label="Miscellaneous Comments"
//                     value={selectedDog.miscellaneousComments}
//                   />
//                   <DetailItem
//                     label="Progeny Trainability"
//                     value={selectedDog.progenyTrainability}
//                   />
//                 </Box>
//               </Box>
//             )}

//             {selectedSection === "Pedigree" && (
//               <PedigreeTree dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Siblings" && (
//               <DogList dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Progeny" && (
//               <Progeny dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//           </Box>
//         )}
//       </div>
//     </>
//   );
// };

// export default DatabaseView;

//shamim changes-4

// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Divider,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";
// import {
//   Pets as PetsIcon,
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Cake as CakeIcon,
//   LocationOn as LocationIcon,
//   Flag as FlagIcon,
//   Fingerprint as FingerprintIcon,
//   Psychology as PsychologyIcon,
//   Science as ScienceIcon,
//   FamilyRestroom as FamilyIcon,
//   AccountTree as PedigreeIcon,
// } from "@mui/icons-material";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DetailItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <Box className="flex items-center gap-2 mb-2">
//     {icon && <Box className="text-green-600 dark:text-green-400">{icon}</Box>}
//     <Typography
//       variant="body2"
//       sx={{ fontWeight: 600, color: "text.primary", minWidth: { xs: 100, sm: 130 } }}
//     >
//       {label}:
//     </Typography>
//     <Typography variant="body2" sx={{ color: "text.secondary" }}>
//       {value}
//     </Typography>
//   </Box>
// );

// const DatabaseView = () => {
//   const [selectedBreed, setSelectedBreed] = useState<{ value: string; label: string } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null);
//   const { dogs, loading, error } = useFilteredDogs(
//     String(selectedBreed?.value),
//     String(selectedCity?.value)
//   );
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   const navItems = [
//     { name: "Basic Data", icon: <PetsIcon /> },
//     { name: "Pedigree", icon: <PedigreeIcon /> },
//     { name: "Siblings", icon: <FamilyIcon /> },
//     { name: "Progeny", icon: <PsychologyIcon /> },
//     { name: "Virtual Breeding", icon: <ScienceIcon /> },
//   ];

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : ``,
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown",
//     location: dog.city?.city ?? "Unknown",
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog.isDeath ?? false,
//     deathDate: dog.deathDate ?? "",
//     category: dog.category?.name ?? "",
//     chestDepth: dog.chestDepth ?? "",
//     chestCircumference: dog.chestCircumference ?? "",
//     weight: dog.weight ?? "",
//     city: dog.city?.city ?? "",
//     virtuesAndFaults: dog.virtuesAndFaults ?? "",
//     breedingAdvice: dog.breedingAdvice ?? "",
//     miscellaneousComments: dog.miscellaneousComments ?? "",
//     progenyTrainability: dog.progenyTrainability ?? "",
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       (dog.title.toLowerCase().includes(query) ||
//         dog.registrationNumber.toLowerCase().includes(query) ||
//         dog.microchip?.toLowerCase().includes(query)) &&
//       (breedFilter ? dog.breed.toLowerCase() === breedFilter.toLowerCase() : true) &&
//       (locationFilter
//         ? dog.location.toLowerCase() === locationFilter.toLowerCase()
//         : true)
//     );
//   });

//   const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentDogs = filteredDogs.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(city.map((c) => ({ value: c.id.toString(), label: c.city || "" })));
//     }
//   }, [city]);

//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<{ value: string; label: string }[]>([]);

//   useEffect(() => {
//     getAllBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(breeds.map((b) => ({ value: b.id.toString(), label: b.breed || "" })));
//     }
//   }, [breeds]);

//   return (
//     <>
//       <style>
//         {`
//           .database-view {
//             min-height: 100vh;
//             padding: 1rem;
//           }

//           @media (min-width: 640px) {
//             .database-view {
//               padding: 1.5rem;
//             }
//           }

//           @media (min-width: 1024px) {
//             .database-view {
//               padding: 2rem;
//             }
//           }

//           .filter-section {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//             margin-bottom: 2rem;
//             padding: 1rem;
//             background: white;
//             border-radius: 0.75rem;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           }

//           @media (min-width: 768px) {
//             .filter-section {
//               flex-direction: row;
//               align-items: center;
//               justify-content: space-between;
//               padding: 1.5rem;
//             }
//           }

//           .filter-section > div {
//             flex: 1;
//             min-width: 0;
//           }

//           .dog-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 1.5rem;
//           }

//           @media (max-width: 640px) {
//             .dog-grid {
//               grid-template-columns: 1fr;
//             }
//           }

//           .dog-card {
//             transition: transform 0.25s ease, box-shadow 0.25s ease;
//           }

//           .dog-card:hover {
//             transform: scale(1.03);
//             box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.08);
//           }

//           .dog-details {
//             max-width: 90%;
//             margin: 0 auto;
//             padding: 1.5rem;
//             border-radius: 0.75rem;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }

//           @media (min-width: 1024px) {
//             .dog-details {
//               max-width: 80rem;
//             }
//           }

//           .nav-buttons {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 0.5rem;
//             margin-bottom: 1.5rem;
//             border-bottom: 1px solid #e0e0e0;
//             padding-bottom: 1rem;
//           }

//           @media (max-width: 640px) {
//             .nav-buttons {
//               flex-direction: column;
//               align-items: stretch;
//             }
//           }

//           .dog-details-header {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 1rem;
//             margin-bottom: 1.5rem;
//           }

//           @media (min-width: 768px) {
//             .dog-details-header {
//               flex-direction: row;
//               justify-content: center;
//             }
//           }

//           .details-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }

//           @media (min-width: 640px) {
//             .details-grid {
//               grid-template-columns: repeat(2, 1fr);
//             }
//           }

//           @media (min-width: 1024px) {
//             .details-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }

//           .avatar-img {
//             max-width: 100%;
//             height: auto;
//           }

//           .pagination {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 0.5rem;
//             margin-top: 2rem;
//             flex-wrap: wrap;
//           }

//           .pagination-button {
//             min-width: 2.5rem;
//             height: 2.5rem;
//             font-size: 0.875rem;
//             padding: 0;
//           }

//           @media (max-width: 640px) {
//             .pagination-button {
//               min-width: 2rem;
//               height: 2rem;
//               font-size: 0.75rem;
//             }
//           }

//           .pagination-button.active {
//             background-color: #1976d2;
//             color: white;
//             font-weight: bold;
//           }

//           .pagination-button:disabled {
//             opacity: 0.5;
//             cursor: not-allowed;
//           }

//           @media (max-width: 640px) {
//             .pagination .hidden-on-mobile {
//               display: none;
//             }
//           }
//         `}
//       </style>
//       <div className="database-view bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         {selectedDog && (
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => setSelectedDog(null)}
//             sx={{
//               mb: 4,
//               fontWeight: 600,
//               color: "text.secondary",
//               transition: "background-color 0.3s ease",
//               "&:hover": {
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
//               },
//             }}
//           >
//             Back to List
//           </Button>
//         )}

//         {!selectedDog ? (
//           <>
//             <Box className="text-center mb-8">
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "text.primary",
//                   fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
//                 }}
//               >
//                 <Box component="span" sx={{ color: "success.main" }}>
//                   Army Canine Centre
//                 </Box>{" "}
//                 Database
//               </Typography>
//               <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
//                 Comprehensive registry of working dogs
//               </Typography>
//             </Box>

//             <Box className="filter-section">
//               <Box>
//                 <SelectInputs
//                   title="Select Breed"
//                   placeholder={breedLoading ? "Loading breeds..." : "Filter by Breed"}
//                   options={breedOptions}
//                   onChange={(val) => {
//                     setSelectedBreed({ value: val, label: val });
//                     setCurrentPage(1); // Reset to page 1 on filter change
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box>
//                 <SelectInputs
//                   title="Select Location"
//                   placeholder={CityLoading ? "Loading cities..." : "Filter by City"}
//                   options={cityOptions}
//                   onChange={(val) => {
//                     setSelectedCity({ value: val, label: val });
//                     setCurrentPage(1); // Reset to page 1 on filter change
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search dogs..."
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setCurrentPage(1); // Reset to page 1 on search
//                   }}
//                   className="pl-10 w-full"
//                   aria-label="Search dogs"
//                 />
//               </Box>
//             </Box>

//             <Box className="dog-grid" aria-live="polite">
//               {loading ? (
//                 <Box className="col-span-full flex justify-center items-center p-4">
//                   <CircularProgress />
//                 </Box>
//               ) : currentDogs.length === 0 ? (
//                 <Box className="col-span-full text-center text-gray-500">
//                   No dogs found matching your criteria.
//                 </Box>
//               ) : (
//                 currentDogs.map((dog) => (
//                   <Card
//                     key={dog.id}
//                     onClick={() => setSelectedDog(dog)}
//                     aria-label={`View details of ${dog.title}`}
//                     className="dog-card"
//                     sx={{
//                       cursor: "pointer",
//                       backgroundColor: (theme) =>
//                         theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
//                     }}
//                   >
//                     <CardContent>
//                       <Box className="flex flex-col items-center gap-2">
//                         <Avatar
//                           src={dog.imageUrl}
//                           alt={`${dog.title} picture`}
//                           sx={{
//                             width: { xs: 120, sm: 150 },
//                             height: { xs: 120, sm: 150 },
//                             borderRadius: 2,
//                             mb: 1,
//                           }}
//                           variant="rounded"
//                           className="avatar-img"
//                         />
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             fontWeight: 700,
//                             textAlign: "center",
//                             color: (theme) => (theme.palette.mode === "dark" ? "#e0e0e0" : "#1b5e20"),
//                             fontSize: { xs: "1rem", sm: "1.25rem" },
//                           }}
//                         >
//                           {dog.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "success.main",
//                             fontWeight: 600,
//                             textAlign: "center",
//                             fontSize: { xs: "0.875rem", sm: "1rem" },
//                           }}
//                         >
//                           {dog.registrationNumber}
//                         </Typography>
//                         <Chip
//                           label={dog.breed}
//                           color="success"
//                           size="small"
//                           sx={{ fontWeight: "bold", letterSpacing: "0.05em", textTransform: "capitalize" }}
//                         />
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "text.secondary",
//                             mt: 0.5,
//                             textAlign: "center",
//                             fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                           }}
//                         >
//                           {dog.location}
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                           {dog.sex === "male" ? (
//                             <MaleIcon fontSize="medium" color="primary" />
//                           ) : dog.sex === "female" ? (
//                             <FemaleIcon fontSize="medium" color="secondary" />
//                           ) : null}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </Box>

//             {totalPages > 1 && (
//               <Box className="pagination">
//                 <Button
//                   className="pagination-button"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   aria-label="Previous page"
//                   sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                 >
//                   Prev
//                 </Button>
//                 {[...Array(totalPages)].map((_, index) => {
//                   const page = index + 1;
//                   // Show only 5 page numbers on mobile, centered around current page
//                   const showPage =
//                     totalPages <= 5 ||
//                     page === 1 ||
//                     page === totalPages ||
//                     (page >= currentPage - 2 && page <= currentPage + 2);
//                   if (!showPage) {
//                     return index === currentPage - 3 || index === currentPage + 2 ? (
//                       <Button
//                         key={page}
//                         className="pagination-button hidden-on-mobile"
//                         disabled
//                         sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                       >
//                         ...
//                       </Button>
//                     ) : null;
//                   }
//                   return (
//                     <Button
//                       key={page}
//                       className={`pagination-button ${currentPage === page ? "active" : ""}`}
//                       onClick={() => handlePageChange(page)}
//                       aria-label={`Page ${page}`}
//                       aria-current={currentPage === page ? "page" : undefined}
//                       sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                     >
//                       {page}
//                     </Button>
//                   );
//                 })}
//                 <Button
//                   className="pagination-button"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   aria-label="Next page"
//                   sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             )}
//           </>
//         ) : (
//           <Box className="dog-details bg-white dark:bg-gray-900">
//             <Box className="nav-buttons">
//               {navItems.map(({ name, icon }) => (
//                 <Button
//                   key={name}
//                   startIcon={icon}
//                   variant={selectedSection === name ? "contained" : "outlined"}
//                   onClick={() => setSelectedSection(name)}
//                   size="small"
//                   sx={{
//                     textTransform: "capitalize",
//                     flex: { xs: "1 0 100%", sm: "0 1 auto" },
//                     fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                   }}
//                 >
//                   {name}
//                 </Button>
//               ))}
//             </Box>

//             {selectedSection === "Basic Data" && (
//               <Box>
//                 <Box className="dog-details-header">
//                   <Avatar
//                     src={selectedDog.imageUrl}
//                     alt={`${selectedDog.title} picture`}
//                     sx={{
//                       width: { xs: 120, sm: 150, md: 180 },
//                       height: { xs: 120, sm: 150, md: 180 },
//                       borderRadius: 2,
//                     }}
//                     variant="rounded"
//                     className="avatar-img"
//                   />
//                   <Box>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         fontWeight: 700,
//                         mb: 1,
//                         fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
//                       }}
//                     >
//                       {selectedDog.title}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: "text.secondary",
//                         mb: 2,
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                       }}
//                     >
//                       Reg #: {selectedDog.registrationNumber}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
//                     >
//                       {selectedDog.sex === "male" ? (
//                         <MaleIcon color="primary" sx={{ verticalAlign: "middle", mr: 0.5 }} />
//                       ) : (
//                         <FemaleIcon color="secondary" sx={{ verticalAlign: "middle", mr: 0.5 }} />
//                       )}
//                       <strong>Sex:</strong> {selectedDog.sex}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ mb: 4 }} />

//                 <Box className="details-grid">
//                   <DetailItem
//                     icon={<CakeIcon />}
//                     label="Birth Date"
//                     value={new Date(selectedDog.birthDate).toLocaleDateString(undefined, {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   />
//                   <DetailItem icon={<LocationIcon />} label="Location" value={selectedDog.location} />
//                   <DetailItem icon={<FlagIcon />} label="Country" value={selectedDog.country} />
//                   <DetailItem
//                     icon={<FingerprintIcon />}
//                     label="Microchip"
//                     value={selectedDog.microchip ?? "N/A"}
//                   />
//                   <DetailItem icon={<FamilyIcon />} label="Sire" value={selectedDog.sire} />
//                   <DetailItem icon={<FamilyIcon />} label="Dam" value={selectedDog.dam} />
//                   <DetailItem label="Is Deceased" value={selectedDog.isDeath ? "Yes" : "No"} />
//                   {selectedDog.isDeath && (
//                     <DetailItem
//                       label="Death Date"
//                       value={new Date(selectedDog.deathDate).toLocaleDateString(undefined, {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     />
//                   )}
//                   <DetailItem label="Category" value={selectedDog.category} />
//                   <DetailItem label="Chest Depth" value={selectedDog.chestDepth} />
//                   <DetailItem label="Chest Circumference" value={selectedDog.chestCircumference} />
//                   <DetailItem label="Weight" value={selectedDog.weight} />
//                   <DetailItem label="Virtues and Faults" value={selectedDog.virtuesAndFaults} />
//                   <DetailItem label="Breeding Advice" value={selectedDog.breedingAdvice} />
//                   <DetailItem label="Miscellaneous Comments" value={selectedDog.miscellaneousComments} />
//                   <DetailItem label="Progeny Trainability" value={selectedDog.progenyTrainability} />
//                 </Box>
//               </Box>
//             )}

//             {selectedSection === "Pedigree" && <PedigreeTree dogId={selectedDog.id} />}
//             {selectedSection === "Siblings" && <DogList dogId={selectedDog.id} />}
//             {selectedSection === "Progeny" && <Progeny dogId={selectedDog.id} />}
//             {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//           </Box>
//         )}
//       </div>
//     </>
//   );
// };

// export default DatabaseView;

//shamim changes-5 this one is much better

// import { useEffect, useState } from "react";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Divider,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";
// import {
//   Pets as PetsIcon,
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Cake as CakeIcon,
//   LocationOn as LocationIcon,
//   Flag as FlagIcon,
//   Fingerprint as FingerprintIcon,
//   Psychology as PsychologyIcon,
//   Science as ScienceIcon,
//   FamilyRestroom as FamilyIcon,
//   AccountTree as PedigreeIcon,
// } from "@mui/icons-material";

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DetailItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <Box className="flex items-center gap-2 mb-3 animate-fade-in">
//     {icon && <Box className="text-green-600 dark:text-green-400">{icon}</Box>}
//     <Typography
//       variant="body2"
//       sx={{
//         fontWeight: 600,
//         color: "text.primary",
//         minWidth: { xs: 100, sm: 130 },
//         letterSpacing: "0.02em",
//       }}
//     >
//       {label}:
//     </Typography>
//     <Typography variant="body2" sx={{ color: "text.secondary" }}>
//       {value}
//     </Typography>
//   </Box>
// );

// const DatabaseView = () => {
//   const [selectedBreed, setSelectedBreed] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const { dogs, loading, error } = useFilteredDogs(
//     String(selectedBreed?.value),
//     String(selectedCity?.value)
//   );
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedPedigreeDog, setselectedPedigreeDog] = useState<null | MappedDog>(null);

//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [breedFilter, setBreedFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   const navItems = [
//     { name: "Basic Data", icon: <PetsIcon /> },
//     { name: "Pedigree", icon: <PedigreeIcon /> },
//     { name: "Siblings", icon: <FamilyIcon /> },
//     { name: "Progeny", icon: <PsychologyIcon /> },
//     { name: "Virtual Breeding", icon: <ScienceIcon /> },
//   ];

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName}`,
//     registrationNumber: dog.KP,
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : ``,
//     breed: dog.breed?.breed ?? "Unknown",
//     country: dog.country?.countryName ?? "Unknown",
//     location: dog.city?.city ?? "Unknown",
//     sex: dog.sex,
//     microchip: dog.microchip?.chipId,
//     birthDate: dog.dob,
//     sire: dog.sire?.dogName ?? "Unknown",
//     dam: dog.dam?.dogName ?? "Unknown",
//     isDeath: dog.isDeath ?? false,
//     deathDate: dog.deathDate ?? "",
//     category: dog.category?.name ?? "",
//     chestDepth: dog.chestDepth ?? "",
//     chestCircumference: dog.chestCircumference ?? "",
//     weight: dog.weight ?? "",
//     city: dog.city?.city ?? "",
//     virtuesAndFaults: dog.virtuesAndFaults ?? "",
//     breedingAdvice: dog.breedingAdvice ?? "",
//     miscellaneousComments: dog.miscellaneousComments ?? "",
//     progenyTrainability: dog.progenyTrainability ?? "",
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       (dog.title.toLowerCase().includes(query) ||
//         dog.registrationNumber.toLowerCase().includes(query) ||
//         dog.microchip?.toLowerCase().includes(query)) &&
//       (breedFilter
//         ? dog.breed.toLowerCase() === breedFilter.toLowerCase()
//         : true) &&
//       (locationFilter
//         ? dog.location.toLowerCase() === locationFilter.toLowerCase()
//         : true)
//     );
//   });

//   const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentDogs = filteredDogs.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       setCityOptions(
//         city.map((c) => ({ value: c.id.toString(), label: c.city || "" }))
//       );
//     }
//   }, [city]);

//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     getAllBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       setBreedOptions(
//         breeds.map((b) => ({ value: b.id.toString(), label: b.breed || "" }))
//       );
//     }
//   }, [breeds]);

//   return (
//     <>
//       <style>
//         {`
//           /* Global Styles */
//           .database-view {
//             min-height: 100vh;
//             padding: 1.5rem;
//             background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
//             font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
//           }

//           .dark .database-view {
//             background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//           }

//           @media (min-width: 640px) {
//             .database-view {
//               padding: 2rem;
//             }
//           }

//           @media (min-width: 1024px) {
//             .database-view {
//                padding: 3rem;
//             }
//           }

//             {/* City Selector */}
//             <div className="w-full md:w-1/3 px-1">
//               <SelectInputs
//                 title="Select City"
//                 placeholder={CityLoading ? "Loading Cities..." : "Select City"}
//                 options={cityOptions}
//                 onChange={(val) => setSelectedCity({ value: val, label: val })}
//                 className="w-full dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             {/* Search Bar */}
//             <div className="w-full md:w-1/3 pl-2">
//               <div className="flex items-center w-full backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
//                   />
//                 </svg>
//                 <Input
//                   type="text"
//                   placeholder="Search by Name, Microchip, ACC #"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm sm:text-base"
//                 />
//               </div>
//             </div>
//           </div>

//           /* Filter Section */
//           .filter-section {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//             margin-bottom: 2.5rem;
//             padding: 1.5rem;
//             background: rgba(255, 255, 255, 0.95);
//             backdrop-filter: blur(8px);
//             border-radius: 1rem;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             border: 1px solid rgba(0, 0, 0, 0.05);
//           }

//           .dark .filter-section {
//             background: rgba(30, 41, 59, 0.95);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//           }

//           @media (min-width: 768px) {
//             .filter-section {
//               flex-direction: row;
//               align-items: center;
//               justify-content: space-between;
//               // padding: 2rem;
//             }
//           }

//           .filter-section > div {
//             flex: 1;
//             min-width: 0;
//           }

//           /* Dog Grid */
//           .dog-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//             gap: 1.5rem;
//             animation: fadeIn 0.5s ease-in;
//           }

//           @media (max-width: 640px) {
//             .dog-grid {
//               grid-template-columns: 1fr;
//             }
//           }

//           .dog-card {
//             background: white;
//             border-radius: 1rem;
//             overflow: hidden;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             will-change: transform, box-shadow;
//           }

//           .dark .dog-card {
//             background: #1e293b;
//           }

//           .dog-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
//           }

//           .card-header {
//             background: linear-gradient(90deg, #1b5e20 0%, #2e7d32 100%);
//             padding: 0.5rem 1rem;
//             color: white;
//             text-align: center;
//             border-bottom: 2px solid #1565c0;
//           }

//           .avatar-img {
//             max-width: 100%;
//             height: auto;
//             object-fit: cover;
//             border: 2px solid #e0e0e0;
//             border-radius: 0.5rem;
//           }

//           .dark .avatar-img {
//             border-color: #4b5563;
//           }

//           /* Pagination */
//           .pagination {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 0.5rem;
//             margin-top: 2.5rem;
//             flex-wrap: wrap;
//           }

//           .pagination-info {
//             font-size: 0.875rem;
//             color: #4b5563;
//             margin-bottom: 1rem;
//             text-align: center;
//           }

//           .dark .pagination-info {
//             color: #9ca3af;
//           }

//           .pagination-button {
//             min-width: 2.5rem;
//             height: 2.5rem;
//             border-radius: 50%;
//             font-size: 0.875rem;
//             padding: 0;
//             transition: background-color 0.3s ease, transform 0.2s ease;
//           }

//           .pagination-button:hover:not(:disabled) {
//             background-color: #1565c0;
//             color: white;
//             transform: scale(1.1);
//           }

//           .pagination-button.active {
//             background-color: #1b5e20;
//             color: white;
//             font-weight: bold;
//             transform: scale(1.1);
//           }

//           .pagination-button:disabled {
//             opacity: 0.5;
//             cursor: not-allowed;
//           }

//           @media (max-width: 640px) {
//             .pagination-button {
//               min-width: 2rem;
//               height: 2rem;
//               font-size: 0.75rem;
//             }
//           }

//           /* Dog Details */
//           .dog-details {
//             max-width: 90%;
//             margin: 0 auto;
//            padding: 2rem;
//             border-radius: 1rem;
//             background: white;
//             box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
//             animation: fadeIn 0.5s ease-in;
//           }

//           .dark .dog-details {
//             background: #1e293b;
//           }

//           @media (min-width: 1024px) {
//             .dog-details {
//               max-width: 80rem;
//             }
//           }

//           .nav-buttons {
//             display: flex;
//             flex-wrap: wrap;
//             gap: 0.75rem;
//             margin-bottom: 2rem;
//             position: relative;
//           }

//           .nav-button {
//             position: relative;
//             text-transform: none;
//             font-weight: 500;
//             color: #4b5563;
//             padding-bottom: 0.5rem;
//           }

//           .dark .nav-button {
//             color: #9ca3af;
//           }

//           .nav-button.active::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 100%;
//             height: 2px;
//             background: #1b5e20;
//             animation: slideIn 0.3s ease;
//           }

//           @media (max-width: 640px) {
//             .nav-buttons {
//               flex-direction: column;
//               align-items: stretch;
//             }
//             .nav-button {
//               font-size: 0.875rem;
//             }
//           }

//           .dog-details-header {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 1.5rem;
//             margin-bottom: 2rem;
//             background: linear-gradient(180deg, rgba(27, 94, 32, 0.1) 0%, transparent 100%);
//             padding: 1.5rem;
//             border-radius: 0.75rem;
//           }

//           @media (min-width: 768px) {
//             .dog-details-header {
//               flex-direction: row;
//               justify-content: center;
//             }
//           }

//           .details-grid {
//             display: grid;
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//             animation: fadeIn 0.5s ease-in;
//           }

//           @media (min-width: 640px) {
//             .details-grid {
//               grid-template-columns: repeat(2, 1fr);
//             }
//           }

//           @media (min-width: 1024px) {
//             .details-grid {
//               grid-template-columns: repeat(3, 1fr);
//             }
//           }

//           /* Animations */
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }

//           @keyframes slideIn {
//             from { width: 0; }
//             to { width: 100%; }
//           }

//           /* Focus States */
//           .pagination-button:focus, .nav-button:focus {
//             outline: 2px solid #1b5e20;
//             outline-offset: 2px;
//           }
//         `}
//       </style>
//       <div className="database-view">
//         {selectedDog && (
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => setSelectedDog(null)}
//             sx={{
//               mb: 4,
//               fontWeight: 600,
//               color: "text.secondary",
//               textTransform: "none",
//               background: "rgba(255, 255, 255, 0.95)",
//               "&:hover": {
//                 backgroundColor: "#1b5e20",
//                 color: "white",
//               },
//               "&:focus": {
//                 outline: "2px solid #1b5e20",
//                 outlineOffset: "2px",
//               },
//               padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
//             }}
//           >
//             Back to List
//           </Button>
//         )}

//         {!selectedDog ? (
//           <>
//             <Box className="text-center mb-10">
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontWeight: 700,
//                   color: "text.primary",
//                   fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
//                   letterSpacing: "0.02em",
//                 }}
//               >
//                 <Box component="span" sx={{ color: "#1b5e20" }}>
//                   Army Canine Centre
//                 </Box>{" "}
//                 Database
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   color: "text.secondary",
//                   mt: 1,
//                   fontSize: { xs: "1rem", sm: "1.125rem" },
//                 }}
//               >
//                 Comprehensive registry of working dogs
//               </Typography>
//             </Box>

//             <Box className="filter-section">
//               <Box>
//                 <SelectInputs
//                   title="Select Breed"
//                   placeholder={
//                     breedLoading ? "Loading breeds..." : "Filter by Breed"
//                   }
//                   options={breedOptions}
//                   onChange={(val) => {
//                     setSelectedBreed({ value: val, label: val });
//                     setCurrentPage(1);
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box>
//                 <SelectInputs
//                   title="Select Location"
//                   placeholder={
//                     CityLoading ? "Loading cities..." : "Filter by City"
//                   }
//                   options={cityOptions}
//                   onChange={(val) => {
//                     setSelectedCity({ value: val, label: val });
//                     setCurrentPage(1);
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box className="relative">
//                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search dogs..."
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="pl-10 w-full"
//                   aria-label="Search dogs"
//                 />
//               </Box>
//             </Box>

//             <Box className="dog-grid" aria-live="polite">
//               {loading ? (
//                 <Box className="col-span-full flex justify-center items-center p-6">
//                   <CircularProgress sx={{ color: "#1b5e20" }} />
//                 </Box>
//               ) : currentDogs.length === 0 ? (
//                 <Box className="col-span-full text-center text-gray-500 p-6">
//                   No dogs found matching your criteria.
//                 </Box>
//               ) : (
//                 currentDogs.map((dog) => (
//                   <Card
//                     key={dog.id}
//                     onClick={() => setSelectedDog(dog)}
//                     aria-label={`View details of ${dog.title}`}
//                     className="dog-card"
//                     sx={{ cursor: "pointer" }}
//                   >
//                     <Box className="card-header">
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: { xs: "1rem", sm: "1.25rem" },
//                         }}
//                       >
//                         {dog.title}
//                       </Typography>
//                     </Box>
//                     <CardContent sx={{ p: 2 }}>
//                       <Box className="flex flex-col items-center gap-2">
//                         <Avatar
//                           src={dog.imageUrl}
//                           alt={`${dog.title} picture`}
//                           sx={{
//                             width: { xs: 140, sm: 160 },
//                             height: { xs: 140, sm: 160 },
//                             borderRadius: 2,
//                             mb: 1,
//                           }}
//                           variant="rounded"
//                           className="avatar-img"
//                           imgProps={{ loading: "lazy" }}
//                         />
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "#1b5e20",
//                             fontWeight: 600,
//                             textAlign: "center",
//                             fontSize: { xs: "0.875rem", sm: "1rem" },
//                           }}
//                         >
//                           {dog.registrationNumber}
//                         </Typography>
//                         <Chip
//                           label={dog.breed}
//                           color="success"
//                           size="small"
//                           sx={{
//                             fontWeight: "bold",
//                             letterSpacing: "0.05em",
//                             textTransform: "capitalize",
//                             bgcolor: "#2e7d32",
//                             color: "white",
//                           }}
//                         />
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "text.secondary",
//                             mt: 0.5,
//                             textAlign: "center",
//                             fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                           }}
//                         >
//                           {dog.location}
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                           {dog.sex === "male" ? (
//                             <MaleIcon
//                               fontSize="medium"
//                               sx={{ color: "#1976d2" }}
//                             />
//                           ) : dog.sex === "female" ? (
//                             <FemaleIcon
//                               fontSize="medium"
//                               sx={{ color: "#d81b60" }}
//                             />
//                           ) : null}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </Box>

//             {totalPages > 1 && (
//               <>
//                 <Typography className="pagination-info">
//                   Showing {startIndex + 1} -{" "}
//                   {Math.min(endIndex, filteredDogs.length)} of{" "}
//                   {filteredDogs.length} dogs
//                 </Typography>
//                 <Box className="pagination">
//                   <Button
//                     className="pagination-button"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     aria-label="Previous page"
//                     sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                   >
//                     Prev
//                   </Button>
//                   {[...Array(totalPages)].map((_, index) => {
//                     const page = index + 1;
//                     const isCurrent = page === currentPage;
//                     const showPage =
//                       totalPages <= 5 ||
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 2 && page <= currentPage + 2);
//                     if (!showPage) {
//                       return index === currentPage - 3 ||
//                         index === currentPage + 2 ? (
//                         <Button
//                           key={page}
//                           className="pagination-button"
//                           disabled
//                           sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                         >
//                           ...
//                         </Button>
//                       ) : null;
//                     }
//                     return (
//                       <Button
//                         key={page}
//                         className={`pagination-button ${
//                           isCurrent ? "active" : ""
//                         }`}
//                         onClick={() => handlePageChange(page)}
//                         aria-label={`Page ${page}`}
//                         aria-current={isCurrent ? "page" : undefined}
//                         sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                       >
//                         {page}
//                       </Button>
//                     );
//                   })}
//                   <Button
//                     className="pagination-button"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     aria-label="Next page"
//                     sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </>
//         ) : (
//           <Box className="dog-details">
//             <Box className="nav-buttons">
//               {navItems.map(({ name, icon }) => (
//                 <Button
//                   key={name}
//                   startIcon={icon}
//                   className={`nav-button ${
//                     selectedSection === name ? "active" : ""
//                   }`}
//                   onClick={() => setSelectedSection(name)}
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 500,
//                     flex: { xs: "1 0 100%", sm: "0 1 auto" },
//                     fontSize: { xs: "0.875rem", sm: "1rem" },
//                     color: "inherit",
//                     "&:hover": {
//                       color: "#1b5e20",
//                     },
//                   }}
//                 >
//                   {name}
//                 </Button>
//               ))}
//             </Box>

//             {selectedSection === "Basic Data" && (
//               <Box>
//                 <Box className="dog-details-header">
//                   <Avatar
//                     src={selectedDog.imageUrl}
//                     alt={`${selectedDog.title} picture`}
//                     sx={{
//                       width: { xs: 140, sm: 160, md: 200 },
//                       height: { xs: 140, sm: 160, md: 200 },
//                       borderRadius: 2,
//                     }}
//                     variant="rounded"
//                     className="avatar-img"
//                     imgProps={{ loading: "lazy" }}
//                   />
//                   <Box sx={{ flex: 1 }}>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         fontWeight: 700,
//                         mb: 1,
//                         fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
//                         color: "#1b5e20",
//                       }}
//                     >
//                       {selectedDog.title}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: "text.secondary",
//                         mb: 2,
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                       }}
//                     >
//                       Reg #: {selectedDog.registrationNumber}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                         fontWeight: 500,
//                       }}
//                     >
//                       {selectedDog.sex === "male" ? (
//                         <MaleIcon
//                           color="primary"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       ) : (
//                         <FemaleIcon
//                           color="secondary"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       )}
//                       <strong>Sex:</strong> {selectedDog.sex}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ mb: 4, borderColor: "rgba(0, 0, 0, 0.1)" }} />

//                 <Box className="details-grid">
//                   <DetailItem
//                     icon={<CakeIcon />}
//                     label="Birth Date"
//                     value={new Date(selectedDog.birthDate).toLocaleDateString(
//                       undefined,
//                       {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }
//                     )}
//                   />
//                   <DetailItem
//                     icon={<LocationIcon />}
//                     label="Location"
//                     value={selectedDog.location}
//                   />
//                   <DetailItem
//                     icon={<FlagIcon />}
//                     label="Country"
//                     value={selectedDog.country}
//                   />
//                   <DetailItem
//                     icon={<FingerprintIcon />}
//                     label="Microchip"
//                     value={selectedDog.microchip ?? "N/A"}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Sire"
//                     value={selectedDog.sire}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Dam"
//                     value={selectedDog.dam}
//                   />
//                   <DetailItem
//                     label="Is Deceased"
//                     value={selectedDog.isDeath ? "Yes" : "No"}
//                   />
//                   {selectedDog.isDeath && (
//                     <DetailItem
//                       label="Death Date"
//                       value={new Date(selectedDog.deathDate).toLocaleDateString(
//                         undefined,
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         }
//                       )}
//                     />
//                   )}
//                   <DetailItem label="Category" value={selectedDog.category} />
//                   <DetailItem
//                     label="Chest Depth"
//                     value={selectedDog.chestDepth}
//                   />
//                   <DetailItem
//                     label="Chest Circumference"
//                     value={selectedDog.chestCircumference}
//                   />
//
//                   <DetailItem label="Weight" value={selectedDog.weight} />
//                   <DetailItem
//                     label="Virtues and Faults"
//                     value={selectedDog.virtuesAndFaults}
//                   />
//                   <DetailItem
//                     label="Breeding Advice"
//                     value={selectedDog.breedingAdvice}
//                   />
//                   <DetailItem
//                     label="Miscellaneous Comments"
//                     value={selectedDog.miscellaneousComments}
//                   />
//                   <DetailItem
//                     label="Progeny Trainability"
//                     value={selectedDog.progenyTrainability}
//                   />
//                 </Box>
//               </Box>
//             )}

//             {selectedSection === "Pedigree" && (
//               <PedigreeTree dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Siblings" && (
//               <DogList dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Progeny" && (
//               <Progeny dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//           </Box>
//         )}
//       </div>
//     </>
//   );
// };

// export default DatabaseView;

//table

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Divider,
//   Chip,
//   Avatar,
//   Tabs,
//   Tab,
//   useMediaQuery,
//   useTheme,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import SelectInputs from "../form/form-elements/components/SelectInputs";
// import Input from "../form/input/InputField";
// import DogList from "../dogsCategory/DogSiblingsList";
// import PedigreeTree from "../dogsCategory/react-tree";
// import VirtualBreeding from "../dogsCategory/virtualBreeding";
// import Progeny from "../progeny/Progeny";
// import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
// import { useBreedStore } from "../../store/breedStore";
// import { useFetchCities } from "../dogsCategory/hooks/useCities";
// import {
//   Pets as PetsIcon,
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Cake as CakeIcon,
//   LocationOn as LocationIcon,
//   Flag as FlagIcon,
//   Fingerprint as FingerprintIcon,
//   Psychology as PsychologyIcon,
//   Science as ScienceIcon,
//   FamilyRestroom as FamilyIcon,
//   AccountTree as PedigreeIcon,
// } from "@mui/icons-material";

// // Custom Material-UI theme
// const canineTheme = createTheme({
//   palette: {
//     primary: { main: "#1b5e20" }, // Military green
//     secondary: { main: "#1976d2" }, // Navy blue
//     error: { main: "#d32f2f" },
//     background: { default: "#f5f7fa", paper: "#ffffff" },
//     text: { primary: "#1e293b", secondary: "#4b5563" },
//   },
//   typography: {
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     h3: { fontWeight: 700 },
//     h4: { fontWeight: 700 },
//     subtitle1: { fontWeight: 500 },
//     body2: { fontWeight: 400 },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: 8,
//           padding: "0.5rem 1rem",
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         },
//       },
//     },
//   },
// });

// interface MappedDog {
//   id: number;
//   title: string;
//   registrationNumber: string;
//   imageUrl: string;
//   breed: string;
//   country: string;
//   location: string;
//   sex: string;
//   microchip: string | null;
//   birthDate: string;
//   sire: string;
//   dam: string;
//   isDeath: boolean;
//   deathDate: string;
//   category: string;
//   chestDepth: string;
//   chestCircumference: string;
//   weight: string;
//   city: string;
//   virtuesAndFaults: string;
//   breedingAdvice: string;
//   miscellaneousComments: string;
//   progenyTrainability: string;
// }

// const DetailItem = ({
//   icon,
//   label,
//   value,
// }: {
//   icon?: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <Box className="flex items-center gap-2 mb-3 animate-fade-in">
//     {icon && <Box sx={{ color: "primary.main" }}>{icon}</Box>}
//     <Typography
//       variant="body2"
//       sx={{
//         fontWeight: 600,
//         color: "text.primary",
//         minWidth: { xs: 100, sm: 130 },
//         letterSpacing: "0.02em",
//       }}
//     >
//       {label}:
//     </Typography>
//     <Typography variant="body2" sx={{ color: "text.secondary" }}>
//       {value || "N/A"}
//     </Typography>
//   </Box>
// );

// const DatabaseView = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [selectedBreed, setSelectedBreed] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const [selectedCity, setSelectedCity] = useState<{
//     value: string;
//     label: string;
//   } | null>(null);
//   const { dogs, loading, error } = useFilteredDogs(
//     selectedBreed?.value || "",
//     selectedCity?.value || ""
//   );
//   const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
//   const [selectedSection, setSelectedSection] = useState("Basic Data");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   const navItems = [
//     { name: "Basic Data", icon: <PetsIcon /> },
//     { name: "Pedigree", icon: <PedigreeIcon /> },
//     { name: "Siblings", icon: <FamilyIcon /> },
//     { name: "Progeny", icon: <PsychologyIcon /> },
//     { name: "Virtual Breeding", icon: <ScienceIcon /> },
//   ];

//   const mappedDogs: MappedDog[] = dogs.map((dog) => ({
//     id: dog.id || 0,
//     title: `${dog.showTitle ? dog.showTitle + " " : ""}${dog.dogName || "Unknown"}`,
//     registrationNumber: dog.KP || "N/A",
//     imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : "",
//     breed: dog.breed?.breed || "Unknown",
//     country: dog.country?.countryName || "Unknown",
//     location: dog.city?.city || "Unknown",
//     sex: dog.sex || "Unknown",
//     microchip: dog.microchip?.chipId || null,
//     birthDate: dog.dob || "",
//     sire: dog.sire?.dogName || "Unknown",
//     dam: dog.dam?.dogName || "Unknown",
//     isDeath: dog.isDeath || false,
//     deathDate: dog.deathDate || "",
//     category: dog.category?.name || "",
//     chestDepth: dog.chestDepth || "",
//     chestCircumference: dog.chestCircumference || "",
//     weight: dog.weight || "",
//     city: dog.city?.city || "",
//     virtuesAndFaults: dog.virtuesAndFaults || "",
//     breedingAdvice: dog.breedingAdvice || "",
//     miscellaneousComments: dog.miscellaneousComments || "",
//     progenyTrainability: dog.progenyTrainability || "",
//   }));

//   const filteredDogs = mappedDogs.filter((dog) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       dog.title.toLowerCase().includes(query) ||
//       dog.registrationNumber.toLowerCase().includes(query) ||
//       (dog.microchip && dog.microchip.toLowerCase().includes(query))
//     );
//   });

//   const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentDogs = filteredDogs.slice(startIndex, endIndex);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBack = () => {
//     setSelectedDog(null);
//     setSelectedSection("Basic Data");
//     setCurrentPage(1);
//   };

//   const { city, CityLoading } = useFetchCities();
//   const [cityOptions, setCityOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     if (city.length > 0) {
//       const uniqueCities = Array.from(
//         new Set(city.map((c) => c.id.toString()))
//       ).map((id) => ({
//         value: id,
//         label: city.find((c) => c.id.toString() === id)?.city || "",
//       }));
//       setCityOptions(uniqueCities);
//     }
//   }, [city]);

//   const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
//   const [breedOptions, setBreedOptions] = useState<
//     { value: string; label: string }[]
//   >([]);

//   useEffect(() => {
//     getAllBreeds();
//   }, [getAllBreeds]);

//   useEffect(() => {
//     if (breeds.length > 0) {
//       const uniqueBreeds = Array.from(
//         new Set(breeds.map((b) => b.id.toString()))
//       ).map((id) => ({
//         value: id,
//         label: breeds.find((b) => b.id.toString() === id)?.breed || "",
//       }));
//       setBreedOptions(uniqueBreeds);
//     }
//   }, [breeds]);

//   return (
//     <ThemeProvider theme={canineTheme}>
//       <div className="database-view">
//         <style>
//           {`
//             .database-view {
//               min-height: 100vh;
//               padding: ${theme.spacing(3)};
//               background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
//               position: relative;
//               overflow: hidden;
//             }

//             .database-view:: Rede: {
//               background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
//             }

//             .database-view::before {
//               content: '';
//               position: absolute;
//               top: 0;
//               left: 0;
//               right: 0;
//               bottom: 0;
//               background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(27,94,32,0.1)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.41L7 13.83l1.41-1.41L11 14.83V17h2v-2.17l2.59-2.59L17 13.83l-3.59 3.58zM12 7c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>') no-repeat center;
//               background-size: 30%;
//               opacity: 0.05;
//               z-index: -1;
//             }

//             .filter-section {
//               display: flex;
//               flex-direction: column;
//               gap: ${theme.spacing(2)};
//               margin-bottom: ${theme.spacing(3)};
//               padding: ${theme.spacing(2)};
//               background: rgba(255, 255, 255, 0.95);
//               backdrop-filter: blur(8px);
//               border-radius: ${theme.spacing(1)};
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             }

//             @media (min-width: ${theme.breakpoints.values.md}px) {
//               .filter-section {
//                 flex-direction: row;
//                 align-items: center;
//                 justify-content: space-between;
//               }
//             }

//             .dog-grid {
//               display: grid;
//               grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//               gap: ${theme.spacing(2)};
//               animation: fadeIn 0.5s ease-in;
//             }

//             @media (max-width: ${theme.breakpoints.values.sm}px) {
//               .dog-grid {
//                 grid-template-columns: 1fr;
//               }
//             }

//             .dog-card {
//               background: ${theme.palette.background.paper};
//               transition: transform 0.3s ease, box-shadow 0.3s ease;
//             }

//             .dog-card:hover {
//               transform: translateY(-5px);
//               box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
//             }

//             .card-header {
//               background: linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%);
//               padding: ${theme.spacing(1, 2)};
//               color: white;
//               text-align: center;
//             }

//             .avatar-img {
//               max-width: 100%;
//               height: auto;
//               object-fit: cover;
//               border: 2px solid ${theme.palette.grey[200]};
//               border-radius: ${theme.spacing(0.5)};
//             }

//             .dark .avatar-img {
//               border-color: ${theme.palette.grey[600]};
//             }

//             .pagination {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               gap: ${theme.spacing(1)};
//               margin-top: ${theme.spacing(3)};
//               flex-wrap: wrap;
//             }

//             .pagination-info {
//               font-size: 0.875rem;
//               color: ${theme.palette.text.secondary};
//               margin-bottom: ${theme.spacing(2)};
//               text-align: center;
//             }

//             .pagination-button {
//               min-width: 2.5rem;
//               height: 2.5rem;
//               border-radius: 50%;
//               font-size: 0.875rem;
//               padding: 0;
//               transition: background-color 0.3s ease, transform 0.2s ease;
//             }

//             .pagination-button:hover:not(:disabled) {
//               background-color: ${theme.palette.secondary.main};
//               color: white;
//               transform: scale(1.1);
//             }

//             .pagination-button.active {
//               background-color: ${theme.palette.primary.main};
//               color: white;
//               font-weight: bold;
//               transform: scale(1.1);
//             }

//             .dog-details {
//               max-width: 90%;
//               margin: 0 auto;
//               padding: ${theme.spacing(3)};
//               background: ${theme.palette.background.paper};
//             }

//             @media (min-width: ${theme.breakpoints.values.lg}px) {
//               .dog-details {
//                 max-width: 80rem;
//               }
//             }

//             .dog-details-header {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               gap: ${theme.spacing(2)};
//               margin-bottom: ${theme.spacing(3)};
//               background: linear-gradient(180deg, rgba(27, 94, 32, 0.1) 0%, transparent 100%);
//               padding: ${theme.spacing(2)};
//               border-radius: ${theme.spacing(1)};
//             }

//             @media (min-width: ${theme.breakpoints.values.md}px) {
//               .dog-details-header {
//                 flex-direction: row;
//                 justify-content: center;
//               }
//             }

//             .details-grid {
//               display: grid;
//               grid-template-columns: 1fr;
//               gap: ${theme.spacing(2)};
//               animation: fadeIn 0.5s ease-in;
//             }

//             @media (min-width: ${theme.breakpoints.values.sm}px) {
//               .details-grid {
//                 grid-template-columns: repeat(2, 1fr);
//               }
//             }

//             @media (min-width: ${theme.breakpoints.values.lg}px) {
//               .details-grid {
//                 grid-template-columns: repeat(3, 1fr);
//               }
//             }

//             @keyframes fadeIn {
//               from { opacity: 0; transform: translateY(10px); }
//               to { opacity: 1; transform: translateY(0); }
//             }

//             @keyframes slideIn {
//               from { width: 0; }
//               to { width: 100%; }
//             }
//           `}
//         </style>

//         {selectedDog && (
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={handleBack}
//             sx={{
//               mb: 4,
//               fontWeight: 600,
//               color: "text.secondary",
//               background: "rgba(255, 255, 255, 0.95)",
//               "&:hover": {
//                 backgroundColor: "primary.main",
//                 color: "white",
//               },
//               padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
//             }}
//             aria-label="Back to dog list"
//           >
//             Back to List
//           </Button>
//         )}

//         {!selectedDog ? (
//           <>
//             <Box className="text-center mb-10">
//               <Typography
//                 variant="h3"
//                 sx={{
//                   fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
//                   color: "text.primary",
//                 }}
//               >
//                 <Box component="span" sx={{ color: "primary.main" }}>
//                   Army Canine Centre
//                 </Box>{" "}
//                 Database
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   color: "text.secondary",
//                   mt: 1,
//                   fontSize: { xs: "1rem", sm: "1.125rem" },
//                 }}
//               >
//                 Comprehensive registry of working dogs
//               </Typography>
//             </Box>

//             <Box className="filter-section">
//               <Box sx={{ flex: 1 }}>
//                 <SelectInputs
//                   title="Select Breed"
//                   placeholder={
//                     breedLoading ? "Loading breeds..." : "Filter by Breed"
//                   }
//                   options={breedOptions}
//                   value={selectedBreed?.value || ""}
//                   onChange={(val) => {
//                     setSelectedBreed(
//                       val ? { value: val, label: val } : null
//                     );
//                     setCurrentPage(1);
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <SelectInputs
//                   title="Select Location"
//                   placeholder={
//                     CityLoading ? "Loading cities..." : "Filter by City"
//                   }
//                   options={cityOptions}
//                   value={selectedCity?.value || ""}
//                   onChange={(val) => {
//                     setSelectedCity(
//                       val ? { value: val, label: val } : null
//                     );
//                     setCurrentPage(1);
//                   }}
//                   className="w-full"
//                 />
//               </Box>
//               <Box sx={{ flex: 1, position: "relative" }}>
//                 <SearchIcon
//                   sx={{
//                     position: "absolute",
//                     left: 10,
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     color: "text.secondary",
//                   }}
//                 />
//                 <Input
//                   type="text"
//                   placeholder="Search dogs..."
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="pl-10 w-full"
//                   aria-label="Search dogs"
//                 />
//               </Box>
//               <Button
//                 onClick={() => {
//                   setSelectedBreed(null);
//                   setSelectedCity(null);
//                   setSearchQuery("");
//                   setCurrentPage(1);
//                 }}
//                 variant="outlined"
//                 sx={{ mt: { xs: 2, md: 0 }, color: "primary.main", borderColor: "primary.main" }}
//                 aria-label="Clear filters"
//               >
//                 Clear Filters
//               </Button>
//             </Box>

//             {error && (
//               <Box sx={{ textAlign: "center", color: "error.main", p: 4 }}>
//                 Error loading dogs: {typeof error === "string" ? error : (error as any)?.message || "Please try again later."}
//               </Box>
//             )}

//             <Box className="dog-grid" aria-live="polite">
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
//                   <CircularProgress sx={{ color: "primary.main" }} />
//                 </Box>
//               ) : filteredDogs.length === 0 ? (
//                 <Box sx={{ textAlign: "center", color: "text.secondary", p: 6 }}>
//                   No dogs found matching your criteria.
//                 </Box>
//               ) : (
//                 currentDogs.map((dog) => (
//                   <Card
//                     key={dog.id}
//                     onClick={() => setSelectedDog(dog)}
//                     aria-label={`View details of ${dog.title}`}
//                     className="dog-card"
//                     sx={{ cursor: "pointer" }}
//                   >
//                     <Box className="card-header">
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: { xs: "1rem", sm: "1.25rem" },
//                         }}
//                       >
//                         {dog.title}
//                       </Typography>
//                     </Box>
//                     <CardContent sx={{ p: 2 }}>
//                       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
//                         <Avatar
//                           src={dog.imageUrl}
//                           alt={`${dog.title} picture`}
//                           sx={{
//                             width: { xs: 140, sm: 160 },
//                             height: { xs: 140, sm: 160 },
//                             borderRadius: 2,
//                             mb: 1,
//                           }}
//                           variant="rounded"
//                           className="avatar-img"
//                           imgProps={{ loading: "lazy" }}
//                         />
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             color: "primary.main",
//                             fontWeight: 600,
//                             textAlign: "center",
//                             fontSize: { xs: "0.875rem", sm: "1rem" },
//                           }}
//                         >
//                           {dog.registrationNumber}
//                         </Typography>
//                         <Chip
//                           label={dog.breed}
//                           color="primary"
//                           size="small"
//                           sx={{
//                             fontWeight: "bold",
//                             letterSpacing: "0.05em",
//                             textTransform: "capitalize",
//                             bgcolor: "primary.main",
//                             color: "white",
//                           }}
//                         />
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "text.secondary",
//                             mt: 0.5,
//                             textAlign: "center",
//                             fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                           }}
//                         >
//                           {dog.location}
//                         </Typography>
//                         <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
//                           {dog.sex.toLowerCase() === "male" ? (
//                             <MaleIcon
//                               fontSize="medium"
//                               sx={{ color: "secondary.main" }}
//                             />
//                           ) : dog.sex.toLowerCase() === "female" ? (
//                             <FemaleIcon
//                               fontSize="medium"
//                               sx={{ color: "error.main" }}
//                             />
//                           ) : null}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </Box>

//             {totalPages > 1 && (
//               <>
//                 <Typography className="pagination-info">
//                   Showing {startIndex + 1} -{" "}
//                   {Math.min(endIndex, filteredDogs.length)} of{" "}
//                   {filteredDogs.length} dogs
//                 </Typography>
//                 <Box className="pagination">
//                   <Button
//                     className="pagination-button"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     aria-label="Previous page"
//                     sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                   >
//                     Prev
//                   </Button>
//                   {[...Array(totalPages)].map((_, index) => {
//                     const page = index + 1;
//                     const isCurrent = page === currentPage;
//                     const showPage =
//                       totalPages <= 5 ||
//                       page === 1 ||
//                       page === totalPages ||
//                       (page >= currentPage - 2 && page <= currentPage + 2);
//                     if (!showPage) {
//                       return index === currentPage - 3 ||
//                         index === currentPage + 2 ? (
//                         <Button
//                           key={page}
//                           className="pagination-button"
//                           disabled
//                           sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                         >
//                           ...
//                         </Button>
//                       ) : null;
//                     }
//                     return (
//                       <Button
//                         key={page}
//                         className={`pagination-button ${
//                           isCurrent ? "active" : ""
//                         }`}
//                         onClick={() => handlePageChange(page)}
//                         aria-label={`Page ${page}`}
//                         aria-current={isCurrent ? "page" : undefined}
//                         sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                       >
//                         {page}
//                       </Button>
//                     );
//                   })}
//                   <Button
//                     className="pagination-button"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     aria-label="Next page"
//                     sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </>
//             )}
//           </>
//         ) : (
//           <Box className="dog-details">
//             {isMobile ? (
//               <Tabs
//                 value={selectedSection}
//                 onChange={(_, newValue) => setSelectedSection(newValue)}
//                 variant="scrollable"
//                 scrollButtons="auto"
//                 aria-label="Dog details navigation"
//                 sx={{ mb: 3 }}
//               >
//                 {navItems.map(({ name, icon }) => (
//                   <Tab
//                     key={name}
//                     label={name}
//                     value={name}
//                     icon={icon}
//                     iconPosition="start"
//                     sx={{ textTransform: "none", fontWeight: 500 }}
//                   />
//                 ))}
//               </Tabs>
//             ) : (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
//                 {navItems.map(({ name, icon }) => (
//                   <Button
//                     key={name}
//                     startIcon={icon}
//                     className={`nav-button ${
//                       selectedSection === name ? "active" : ""
//                     }`}
//                     onClick={() => setSelectedSection(name)}
//                     sx={{
//                       textTransform: "none",
//                       fontWeight: 500,
//                       fontSize: { xs: "0.875rem", sm: "1rem" },
//                       color: "text.secondary",
//                       "&:hover": {
//                         color: "primary.main",
//                       },
//                       position: "relative",
//                       "&.active::after": {
//                         content: '""',
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "2px",
//                         background: "primary.main",
//                         animation: "slideIn 0.3s ease",
//                       },
//                     }}
//                     aria-label={`${name} section`}
//                   >
//                     {name}
//                   </Button>
//                 ))}
//               </Box>
//             )}

//             {selectedSection === "Basic Data" && (
//               <Box>
//                 <Box className="dog-details-header">
//                   <Avatar
//                     src={selectedDog.imageUrl}
//                     alt={`${selectedDog.title} picture`}
//                     sx={{
//                       width: { xs: 140, sm: 160, md: 200 },
//                       height: { xs: 140, sm: 160, md: 200 },
//                       borderRadius: 2,
//                     }}
//                     variant="rounded"
//                     className="avatar-img"
//                     imgProps={{ loading: "lazy" }}
//                   />
//                   <Box sx={{ flex: 1 }}>
//                     <Typography
//                       variant="h4"
//                       sx={{
//                         mb: 1,
//                         fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
//                         color: "primary.main",
//                       }}
//                     >
//                       {selectedDog.title}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: "text.secondary",
//                         mb: 2,
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                       }}
//                     >
//                       Reg #: {selectedDog.registrationNumber}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: { xs: "0.875rem", sm: "1rem" },
//                         fontWeight: 500,
//                       }}
//                     >
//                       {selectedDog.sex.toLowerCase() === "male" ? (
//                         <MaleIcon
//                           color="secondary"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       ) : selectedDog.sex.toLowerCase() === "female" ? (
//                         <FemaleIcon
//                           color="error"
//                           sx={{ verticalAlign: "middle", mr: 0.5 }}
//                         />
//                       ) : null}
//                       <strong>Sex:</strong> {selectedDog.sex}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ mb: 4, borderColor: "rgba(0, 0, 0, 0.1)" }} />

//                 <Box className="details-grid">
//                   <DetailItem
//                     icon={<CakeIcon />}
//                     label="Birth Date"
//                     value={
//                       selectedDog.birthDate
//                         ? new Date(selectedDog.birthDate).toLocaleDateString(
//                             undefined,
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )
//                         : "N/A"
//                     }
//                   />
//                   <DetailItem
//                     icon={<LocationIcon />}
//                     label="Location"
//                     value={selectedDog.location}
//                   />
//                   <DetailItem
//                     icon={<FlagIcon />}
//                     label="Country"
//                     value={selectedDog.country}
//                   />
//                   <DetailItem
//                     icon={<FingerprintIcon />}
//                     label="Microchip"
//                     value={selectedDog.microchip ?? ""}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Sire"
//                     value={selectedDog.sire}
//                   />
//                   <DetailItem
//                     icon={<FamilyIcon />}
//                     label="Dam"
//                     value={selectedDog.dam}
//                   />
//                   <DetailItem
//                     label="Is Deceased"
//                     value={selectedDog.isDeath ? "Yes" : "No"}
//                   />
//                   {selectedDog.isDeath && (
//                     <DetailItem
//                       label="Death Date"
//                       value={
//                         selectedDog.deathDate
//                           ? new Date(selectedDog.deathDate).toLocaleDateString(
//                               undefined,
//                               {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                               }
//                             )
//                           : "N/A"
//                       }
//                     />
//                   )}
//                   <DetailItem label="Category" value={selectedDog.category} />
//                   <DetailItem
//                     label="Chest Depth"
//                     value={selectedDog.chestDepth}
//                   />
//                   <DetailItem
//                     label="Chest Circumference"
//                     value={selectedDog.chestCircumference}
//                   />
//                   <DetailItem label="Weight" value={selectedDog.weight} />
//                   <DetailItem
//                     label="Virtues and Faults"
//                     value={selectedDog.virtuesAndFaults}
//                   />
//                   <DetailItem
//                     label="Breeding Advice"
//                     value={selectedDog.breedingAdvice}
//                   />
//                   <DetailItem
//                     label="Miscellaneous Comments"
//                     value={selectedDog.miscellaneousComments}
//                   />
//                   <DetailItem
//                     label="Progeny Trainability"
//                     value={selectedDog.progenyTrainability}
//                   />
//                 </Box>
//               </Box>
//             )}

//             {selectedSection === "Pedigree" && (
//               <PedigreeTree dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Siblings" && (
//               <DogList dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Progeny" && (
//               <Progeny dogId={selectedDog.id} />
//             )}
//             {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
//           </Box>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default DatabaseView;

//final version with separated css file

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
  Chip,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SelectInputs from "../form/form-elements/components/SelectInputs";
import Input from "../form/input/InputField";
import DogList from "../dogsCategory/DogSiblingsList";
import PedigreeTree from "../dogsCategory/react-tree";
import VirtualBreeding from "../dogsCategory/virtualBreeding";
import Progeny from "../progeny/Progeny";
import {
  useFetchDogs,
  useFilteredDogs,
} from "../dogsCategory/hooks/useFetchDogs";
import { useBreedStore } from "../../store/breedStore";
import { useFetchCities } from "../dogsCategory/hooks/useCities";
import {
  Pets as PetsIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Flag as FlagIcon,
  Fingerprint as FingerprintIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  FamilyRestroom as FamilyIcon,
  AccountTree as PedigreeIcon,
  MedicalServices as Medical,
} from "@mui/icons-material";
import "./styles/DatabaseView.css"; // Import the separated CSS file
import MedicalHistory from "../dogsCategory/MedicalHistory";

// Custom Material-UI theme
const canineTheme = createTheme({
  palette: {
    primary: { main: "#1b5e20" }, // Military green
    secondary: { main: "#1976d2" }, // Navy blue
    error: { main: "#d32f2f" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#4b5563" },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    subtitle1: { fontWeight: 500 },
    body2: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "0.5rem 1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

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
  achievements: string;
  weight: string;
  city: string;
  virtuesAndFaults: string;
  breedingAdvice: string;
  miscellaneousComments: string;
  progenyTrainability: string;
}

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <Box className="flex items-center gap-2 mb-3 animate-fade-in dark:!text-white/90">
    {icon && <Box sx={{ color: "primary.main" }}>{icon}</Box>}
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: "text.primary",
        minWidth: { xs: 100, sm: 130 },
        letterSpacing: "0.02em",
      }}
      className="dark:!text-white/90"
    >
      {label}:
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.secondary" }}
      className="dark:!text-white/90"
    >
      {value || "N/A"}
    </Typography>
  </Box>
);

const DatabaseView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedBreed, setSelectedBreed] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const { dogs, loading, error } = useFilteredDogs(
    selectedBreed?.value || "",
    selectedCity?.value || ""
  );
  const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
  const [selectedSection, setSelectedSection] = useState("Basic Data");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const navItems = [
    { name: "Basic Data", icon: <PetsIcon /> },
    { name: "Pedigree", icon: <PedigreeIcon /> },
    { name: "Siblings", icon: <FamilyIcon /> },
    { name: "Progeny", icon: <PsychologyIcon /> },
    { name: "Virtual Breeding", icon: <ScienceIcon /> },
    { name: "Medical History", icon: <Medical /> },
  ];

  const mappedDogs: MappedDog[] = dogs.map((dog) => ({
    id: dog.id || 0,
    title: `${dog.showTitle ? dog.showTitle + " " : ""}${
      dog.dogName || "Unknown"
    }`,
    registrationNumber: dog.KP || "N/A",
    imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : "",
    breed: dog.breed?.breed || "Unknown",
    country: dog.country?.countryName || "Unknown",
    location: dog.city?.city || "Unknown",
    sex: dog.sex || "Unknown",
    microchip: dog.microchip?.chipId || null,
    birthDate: dog.dob || "",
    sire: dog.sire?.dogName || "Unknown",
    dam: dog.dam?.dogName || "Unknown",
    isDeath: dog.isDeath || false,
    deathDate: dog.deathDate || "",
    category: dog.category?.name || "",
    chestDepth: dog.chestDepth || "",
    chestCircumference: dog.chestCircumference || "",
    achievements: dog.achievements || "",
    weight: dog.weight || "",
    city: dog.city?.city || "",
    virtuesAndFaults: dog.virtuesAndFaults || "",
    breedingAdvice: dog.breedingAdvice || "",
    miscellaneousComments: dog.miscellaneousComments || "",
    progenyTrainability: dog.progenyTrainability || "",
  }));

  const filteredDogs = mappedDogs.filter((dog) => {
    const query = searchQuery.toLowerCase();
    return (
      dog.title.toLowerCase().includes(query) ||
      dog.registrationNumber.toLowerCase().includes(query) ||
      (dog.microchip && dog.microchip.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDogs = filteredDogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedDog(null);
    setSelectedSection("Basic Data");
    setCurrentPage(1);
  };

  const { city, CityLoading } = useFetchCities();
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (city.length > 0) {
      const uniqueCities = Array.from(
        new Set(city.map((c) => c.id.toString()))
      ).map((id) => ({
        value: id,
        label: city.find((c) => c.id.toString() === id)?.city || "",
      }));
      setCityOptions(uniqueCities);
    }
  }, [city]);

  const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
  const [breedOptions, setBreedOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  useEffect(() => {
    if (breeds.length > 0) {
      const uniqueBreeds = Array.from(
        new Set(breeds.map((b) => b.id.toString()))
      ).map((id) => ({
        value: id,
        label: breeds.find((b) => b.id.toString() === id)?.breed || "",
      }));
      setBreedOptions(uniqueBreeds);
    }
  }, [breeds]);

  return (
    <ThemeProvider theme={canineTheme}>
      <div className="database-view dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90">
        {selectedDog && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              mb: 4,
              fontWeight: 600,
              color: "text.secondary",
              background: "rgba(255, 255, 255, 0.95)",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
              padding: { xs: "0.5rem 1rem", sm: "0.75rem 1.5rem" },
            }}
            aria-label="Back to dog list"
          >
            Back to List
          </Button>
        )}

        {!selectedDog ? (
          <>
            <Box className="text-center mb-10 bg-white/[0.03]">
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                  color: "text.primary",
                }}
                className="text-gray-500"
              >
                <Box component="span" sx={{ color: "primary.main" }}>
                  Army Canine Centre
                </Box>{" "}
                <span className="dark:text-white/90">Database</span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  // color: "text.secondary",
                  mt: 1,
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                }}
                className="dark:text-white/90"
              ></Typography>
            </Box>

            <Box className="filter-section">
              <Box sx={{ flex: 1 }}>
                <SelectInputs
                  title="Select Breed"
                  placeholder={
                    breedLoading ? "Loading breeds..." : "Filter by Breed"
                  }
                  options={breedOptions}
                  value={selectedBreed?.value || ""}
                  onChange={(val) => {
                    setSelectedBreed(val ? { value: val, label: val } : null);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SelectInputs
                  title="Select Location"
                  placeholder={
                    CityLoading ? "Loading cities..." : "Filter by City"
                  }
                  options={cityOptions}
                  value={selectedCity?.value || ""}
                  onChange={(val) => {
                    setSelectedCity(val ? { value: val, label: val } : null);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </Box>
              <Box
                sx={{ flex: 1, position: "relative" }}
                className="dark:text-white/90"
              >
                <SearchIcon
                  sx={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "text.secondary",
                  }}
                />
                <Input
                  type="text"
                  placeholder="Search dogs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-full"
                  aria-label="Search dogs"
                />
              </Box>
              <Button
                onClick={() => {
                  setSelectedBreed(null);
                  setSelectedCity(null);
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                variant="outlined"
                sx={{
                  mt: { xs: 2, md: 0 },
                  color: "primary.main",
                  borderColor: "primary.main",
                }}
                aria-label="Clear filters"
              >
                Clear Filters
              </Button>
            </Box>

            {error && (
              <Box sx={{ textAlign: "center", color: "error.main", p: 4 }}>
                Error loading dogs:{" "}
                {typeof error === "string"
                  ? error
                  : (error as any)?.message || "Please try again later."}
              </Box>
            )}

            <Box className="dog-grid" aria-live="polite">
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              ) : filteredDogs.length === 0 ? (
                <Box
                  sx={{ textAlign: "center", color: "text.secondary", p: 6 }}
                >
                  No dogs found matching your criteria.
                </Box>
              ) : (
                currentDogs.map((dog) => (
                  <Card
                    key={dog.id}
                    onClick={() => setSelectedDog(dog)}
                    aria-label={`View details of ${dog.title}`}
                    className="dog-card cursor-pointer rounded-lg bg-white dark:bg-dark-100/[0.03] dark:text-white/90 shadow-md hover:shadow-lg transition duration-200"
                  >
                    <Box className="card-header">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        {dog.title}
                      </Typography>
                    </Box>
                    <CardContent className="p-2 bg-white dark:bg-black">
                      <Box className="flex flex-col items-center gap-2">
                        <Avatar
                          src={dog.imageUrl}
                          alt={`${dog.title} picture`}
                          sx={{
                            width: { xs: 140, sm: 160 },
                            height: { xs: 140, sm: 160 },
                            borderRadius: 2,
                            mb: 1,
                          }}
                          variant="rounded"
                          className="avatar-img"
                          imgProps={{ loading: "lazy" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            textAlign: "center",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          }}
                        >
                          {dog.registrationNumber}
                        </Typography>
                        <Chip
                          label={dog.breed}
                          color="primary"
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            letterSpacing: "0.05em",
                            textTransform: "capitalize",
                            bgcolor: "primary.main",
                            color: "white",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            mt: 0.5,
                            textAlign: "center",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                          className="dark:!text-white"
                        >
                          {dog.location}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {dog.sex.toLowerCase() === "male" ? (
                            <MaleIcon
                              fontSize="medium"
                              sx={{ color: "secondary.main" }}
                            />
                          ) : dog.sex.toLowerCase() === "female" ? (
                            <FemaleIcon
                              fontSize="medium"
                              sx={{ color: "error.main" }}
                            />
                          ) : null}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>

            {totalPages > 1 && (
              <>
                <Typography className="pagination-info text-black dark:!text-white">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredDogs.length)} of{" "}
                  {filteredDogs.length} dogs
                </Typography>
                <Box className="pagination">
                  <Button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                  >
                    Prev
                  </Button>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrent = page === currentPage;
                    const showPage =
                      totalPages <= 5 ||
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2);
                    if (!showPage) {
                      return index === currentPage - 3 ||
                        index === currentPage + 2 ? (
                        <Button
                          key={page}
                          className="pagination-button"
                          disabled
                          sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                        >
                          ...
                        </Button>
                      ) : null;
                    }
                    return (
                      <Button
                        key={page}
                        className={`pagination-button ${
                          isCurrent ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Page ${page}`}
                        aria-current={isCurrent ? "page" : undefined}
                        sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  <Button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <Box className="dog-details bg-white dark:!bg-gray-800 dark:!text-white">
            {isMobile ? (
              <Tabs
              orientation="vertical"
                value={selectedSection}
                onChange={(_, newValue) => setSelectedSection(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Dog details navigation"
                sx={{ mb: 3 }}
              >
                {navItems.map(({ name, icon }) => (
                  <Tab
                    key={name}
                    label={name}
                    value={name}
                    icon={icon}
                    iconPosition="start"
                    sx={{fontWeight: 500,alignItems: 'flex-start'}}
                  />
                ))}
              </Tabs>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {navItems.map(({ name, icon }) => (
                  <Button
                    key={name}
                    startIcon={icon}
                    className={`nav-button ${
                      selectedSection === name ? "active" : ""
                    }`}
                    onClick={() => setSelectedSection(name)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                      position: "relative",
                      "&.active::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        background: "primary.main",
                        animation: "slideIn 0.3s ease",
                      },
                    }}
                    aria-label={`${name} section`}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
            )}

            {selectedSection === "Basic Data" && (
              <Box>
                <Box className="dog-details-header bg-white dark:!bg-gray-800">
                  <Avatar
                    src={selectedDog.imageUrl}
                    alt={`${selectedDog.title} picture`}
                    sx={{
                      width: { xs: 140, sm: 160, md: 200 },
                      height: { xs: 140, sm: 160, md: 200 },
                      borderRadius: 2,
                    }}
                    variant="rounded"
                    className="avatar-img"
                    imgProps={{ loading: "lazy" }}
                  />
                  <Box sx={{ flex: 1 }} className="dark:!text-white">
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 1,
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                        color: "primary.main",
                      }}
                      className="dark:!text-white/90"
                    >
                      {selectedDog.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "text.secondary",
                        mb: 2,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                      className="dark:!text-white/90"
                    >
                      Reg #: {selectedDog.registrationNumber}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        fontWeight: 500,
                      }}
                      className="dark:!text-white/90"
                    >
                      {selectedDog.sex.toLowerCase() === "male" ? (
                        <MaleIcon
                          color="secondary"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                      ) : selectedDog.sex.toLowerCase() === "female" ? (
                        <FemaleIcon
                          color="error"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                      ) : null}
                      <strong className="dark:!text-white/90">Sex:</strong>{" "}
                      {selectedDog.sex}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4, borderColor: "rgba(0, 0, 0, 0.1)" }} />

                <Box className="details-grid">
                  <DetailItem
                    icon={<CakeIcon />}
                    label="Birth Date"
                    value={
                      selectedDog.birthDate
                        ? new Date(selectedDog.birthDate).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"
                    }
                  />
                  <DetailItem
                    icon={<LocationIcon />}
                    label="Location"
                    value={selectedDog.location}
                  />
                  <DetailItem
                    icon={<FlagIcon />}
                    label="Country"
                    value={selectedDog.country}
                  />
                  <DetailItem
                    icon={<FingerprintIcon />}
                    label="Microchip"
                    value={selectedDog.microchip ?? ""}
                  />
                  <DetailItem
                    icon={<FamilyIcon />}
                    label="Sire"
                    value={selectedDog.sire}
                  />
                  <DetailItem
                    icon={<FamilyIcon />}
                    label="Dam"
                    value={selectedDog.dam}
                  />
                  <DetailItem
                    label="Is Deceased"
                    value={selectedDog.isDeath ? "Yes" : "No"}
                  />
                  {selectedDog.isDeath && (
                    <DetailItem
                      label="Death Date"
                      value={
                        selectedDog.deathDate
                          ? new Date(selectedDog.deathDate).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "N/A"
                      }
                    />
                  )}
                  <DetailItem label="Category" value={selectedDog.category} />
                  <DetailItem
                    label="Chest Depth"
                    value={selectedDog.chestDepth}
                  />
                  <DetailItem
                    label="Chest Circumference"
                    value={selectedDog.chestCircumference}
                  />
                  <DetailItem
                    label="Field Achievements"
                    value={selectedDog.achievements}
                  />
                  <DetailItem label="Weight" value={selectedDog.weight} />
                  <DetailItem
                    label="Virtues and Faults"
                    value={selectedDog.virtuesAndFaults}
                  />
                  <DetailItem
                    label="Breeding Advice"
                    value={selectedDog.breedingAdvice}
                  />
                  <DetailItem
                    label="Miscellaneous Comments"
                    value={selectedDog.miscellaneousComments}
                  />
                  <DetailItem
                    label="Progeny Trainability"
                    value={selectedDog.progenyTrainability}
                  />
                </Box>
              </Box>
            )}

            {selectedSection === "Pedigree" && (
              <PedigreeTree dogId={selectedDog.id} />
            )}
            {selectedSection === "Siblings" && (
              <DogList dogId={selectedDog.id} />
            )}
            {selectedSection === "Progeny" && (
              <Progeny dogId={selectedDog.id} />
            )}
            {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
            {selectedSection === "Medical History" && (
              <MedicalHistory dogId={selectedDog.id} />
            )}
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
};

export default DatabaseView;
