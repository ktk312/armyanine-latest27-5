import axios from "axios";
import { Dog } from "../types/dog";
import { endpoint } from "../../../config/constant";
import { Breed } from "../types/breed";
import {
  DogCategory,
  NewDogCategory,
  UpdateDogCategory,
} from "../types/dogCategory";

import {
  MatingNotAllowedResponse,
  StudCertificate,
  VirtualBreed,
} from "../types/studCertificate";
import { LitterInspection } from "../types/litterInspection";
import { LitterRegistration } from "../types/littersRegistration";
import { User } from "../types/userAuth";
import { LinebreedingResponse } from "../types/linebreeding";
import { DogStats } from "../types/dashboardState";
import { DeleteMicrochipResponse, Microchip } from "../types/microchip";
import { ChangePasswordInput } from "../types/ChangePassword";
import { CountryType } from "../types/country";
import { City } from "../types/city";
import { VaccinationInput, VaccinationRecord } from "../types/vaccination";
import { ProphylaxisInput, ProphylaxisRecord } from "../types/prophylaxis";
import { DewormingInput, DewormingRecord } from "../types/deworming";
import { TrainingInput, TrainingRecord } from "../types/training";
import { SicknessInput, SicknessRecord } from "../types/sickness";

//User Login
export const userLogin = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const response = await axios.post(endpoint.USER_LOGIN, {
    email,
    password,
  });

  return response.data;
};
export const changePassword = async (
  data: ChangePasswordInput,
  token: string
) => {
  console.log("token are", token);
  const response = await axios.post(endpoint.CHANGE_PASSWORD, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//dog count
export const fetchDogsCount = async (): Promise<number> => {
  const response = await axios.get(endpoint.GET_DOGS_COUNT);
  return response.data.totalDogs; // Assuming the API returns an object with a 'count' property
};

export const fetchDogs = async (): Promise<Dog[]> => {
  const response = await axios.get(endpoint.GET_DOGS);
  return response.data;
};

// Filter dog on the basis of breed and city
export const filterDogs = async (
  breedId: string,
  cityId: string
): Promise<Dog[]> => {
  const response = await axios.get(endpoint.DOGS_FILTER(breedId, cityId));
  return response.data;
};

export const fetchOneDogs = async (id: string): Promise<Dog> => {
  const response = await axios.get(endpoint.GET_DOG_BY_ID(id));
  return response.data;
};

// Fetch all Parent data
export const fetchSiresAndDams = async (): Promise<{
  sires: Dog[];
  dams: Dog[];
}> => {
  try {
    const response = await axios.get(endpoint.GET_PARENT);
    return response.data; // { sires: [...], dams: [...] }
  } catch (error) {
    console.error("Error fetching sires and dams:", error);
    throw new Error("Failed to fetch sires and dams");
  }
};

// Fetch siblings of a specific dog
export const fetchSiblings = async (dogId: number): Promise<Dog[]> => {
  try {
    const response = await axios.get(endpoint.GET_SIBLINGS(dogId)); // ✅ Call the function
    return response.data;
  } catch (error) {
    console.error(`Error fetching siblings for dog ${dogId}:`, error);
    throw new Error("Failed to fetch siblings");
  }
};

export const fetchSireDamByBreedId = async (
  breedId: string
): Promise<{ sires: Dog[]; dams: Dog[] }> => {
  try {
    const response = await axios.get(endpoint.GET_DOG_BREEDID(breedId));
    return response.data; // { sires: [...], dams: [...] }
  } catch (error) {
    console.error("Error fetching sires and dams:", error);
    throw new Error("Failed to fetch sires and dams");
  }
};

// Create Dog
export const createDog = async (dogData: FormData): Promise<Dog> => {
  const response = await axios.post(endpoint.ADD_DOG, dogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update Dog
export const updateDog = async (
  dogData: Partial<Dog>,
  id: string
): Promise<Dog> => {
  const response = await axios.patch(endpoint.UPDATE_DOG(id), dogData);
  return response.data;
};

// Fetch all breeds data
export const fetchBreeds = async (): Promise<Breed[]> => {
  const response = await axios.get(endpoint.GET_BREEDS);
  return response.data;
};

// Fetch a single breed by ID
export const fetchBreedById = async (id: string): Promise<Breed> => {
  const response = await axios.get(endpoint.GET_BREED_BY_ID(id));
  return response.data;
};

// Create a new Microchip

export const generateMicrochip = async (
  chipId: string
): Promise<{ success: boolean; chipId: any }> => {
  const response = await axios.post(endpoint.GENERATE_MICROCHIP, { chipId });
  return response.data;
};
//Update Microchip
export const updateMicrochip = async (
  id: string,
  updatedData: Partial<Microchip>
): Promise<Microchip> => {
  const response = await axios.patch(
    endpoint.UPDATE_MICROCHIP(id),
    updatedData
  );
  return response.data;
};

// Get all Microchip
export const getAllMicrochips = async (): Promise<{
  success: boolean;
  microchips: any[];
}> => {
  const response = await axios.get(endpoint.GET_ALL_MICROCHIPS);
  return response.data;
};

// Get all Un assign Microchip
export const getAllUnassignMicrochips = async (): Promise<{
  success: boolean;
  microchips: any[];
}> => {
  const response = await axios.get(endpoint.GET_ALL_NOT_ASSIGN_MICROCHIPS);
  return response.data;
};

// Delete Microchip
export const deleteMicrochip = async (
  id: string
): Promise<DeleteMicrochipResponse> => {
  const res = await axios.delete(endpoint.DELETE_MICROCHIP(id));
  return res.data;
};

// Create a new breed
export const createBreed = async (
  breedData: Partial<Breed>
): Promise<Breed> => {
  const response = await axios.post(endpoint.ADD_BREED, breedData);
  return response.data;
};

// Update an existing breed
export const updateBreed = async (
  id: string,
  breedData: Partial<Breed>
): Promise<Breed> => {
  const response = await axios.put(endpoint.UPDATE_BREED(id), breedData);
  return response.data;
};

// Delete a breed by ID
export const deleteBreed = async (id: string): Promise<void> => {
  await axios.delete(endpoint.DELETE_BREED(id));
};

// Fetch All Category
export const fetchDogCategory = async (): Promise<DogCategory[]> => {
  const response = await axios.get(endpoint.GET_CATEGORY);
  return response.data;
};

// Create dog category
export const createDogCategory = async (
  dogCategoryData: NewDogCategory
): Promise<DogCategory> => {
  // ...
  const response = await axios.post(endpoint.ADD_CATEGORY, dogCategoryData);
  return response.data;
};

// Update a dog category
export const updateDogCategory = async (
  id: string,
  categoryData: UpdateDogCategory
): Promise<UpdateDogCategory> => {
  const response = await axios.patch(
    endpoint.UPDATE_CATEGORY(id),
    categoryData
  );
  return response.data;
};

//All Country API
export const createCountry = async (
  countryData: Partial<CountryType>
): Promise<CountryType> => {
  const response = await axios.post(endpoint.CREATE_COUNTRY, countryData);
  return response.data;
};

//Update Country
export const updateCountry = async (
  id: string,
  updatedData: Partial<CountryType>
): Promise<CountryType> => {
  const response = await axios.patch(endpoint.UPDATE_COUNTRY(id), updatedData);
  return response.data;
};

export const fetchAllCountry = async (): Promise<CountryType[]> => {
  const response = await axios.get(endpoint.GET_COUNTRY);
  return response.data;
};

//Fetch All Country
export const createCity = async (cityData: Partial<City>): Promise<City> => {
  const response = await axios.post(endpoint.CREATE_CITY, cityData);
  return response.data;
};

//Update City
export const updateCity = async (
  id: string,
  updatedData: Partial<City>
): Promise<City> => {
  const response = await axios.patch(endpoint.UPDATE_CITY(id), updatedData);
  return response.data;
};

export const fetchAllCities = async (): Promise<City[]> => {
  const response = await axios.get(endpoint.GET_CITIES);
  return response.data;
};
export const fetchAllCitiesByCountryId = async (
  countryId: string
): Promise<City[]> => {
  const response = await axios.get(endpoint.GET_CITIES_COUNTRY_ID(countryId));
  return response.data;
};

// Fetch All Stud Certificate
export const fetchAllStudCertificate = async (): Promise<StudCertificate[]> => {
  const response = await axios.get(endpoint.GETALL_CERTIFICATE);
  return response.data;
};

//create stud Certificate
export const createStudCertification = async (
  StudCertificate: Partial<StudCertificate>
): Promise<StudCertificate | MatingNotAllowedResponse> => {
  const response = await axios.post(
    endpoint.CREATE_CERTIFICATE,
    StudCertificate
  );
  return response.data;
};

//Update stud certification
export const updateStudCertificate = async (
  id: string,
  updatedData: Partial<StudCertificate>
): Promise<StudCertificate> => {
  const response = await axios.patch(endpoint.UPDATE_CERTIF(id), updatedData);
  return response.data;
};

// delete stude certification by id
export const deletedStude = async (id: string): Promise<void> => {
  const response = await axios.delete(endpoint.DELETE_CERTIF(id));
  return response.data;
};

//  GET ONE BY ID
export const fetchStudCertificateById = async (id: string) => {
  const response = await axios.get(endpoint.GETONE_CERTIF(id));
  return response.data;
};

// Create Litter Inspection
export const createLitterInspection = async (
  litterData: Partial<LitterInspection>
): Promise<LitterInspection> => {
  const response = await axios.post(
    endpoint.CREATE_LITTER_INSPECTION,
    litterData
  );
  return response.data;
};

export const fetchAllLitterInspection = async (): Promise<
  LitterInspection[]
> => {
  const response = await axios.get(endpoint.GETALL_LITTER_INSPECTION);
  return response.data;
};
export const updateLitterInspection = async (
  id: string,
  updatedData: Partial<LitterInspection>
): Promise<LitterInspection> => {
  const response = await axios.patch(
    endpoint.UPDATE_LITTER_INSPECTION(id),
    updatedData
  );
  return response.data;
};

// Litter Registration
export const createLitterRegistration = async (
  litterData: Partial<LitterRegistration>
): Promise<LitterRegistration> => {
  const response = await axios.post(
    endpoint.CREATE_LITTER_REGISTRATION,
    litterData
  );
  return response.data;
};

export const fetchAllLitterRegistration = async (): Promise<
  LitterRegistration[]
> => {
  const response = await axios.get(endpoint.GET_ALL_REGISTRATION);
  return response.data;
};

export const updateLitterRegistration = async (
  id: string,
  updatedData: Partial<LitterRegistration>
): Promise<LitterRegistration> => {
  const response = await axios.patch(
    endpoint.UPDATE_REGISTRATION(id),
    updatedData
  );
  return response.data;
};

// VIRTUAL BREEDING
export const checkVirtualBreed = async (
  breedData: VirtualBreed
): Promise<VirtualBreed | MatingNotAllowedResponse> => {
  const response = await axios.post(
    endpoint.VIRTUAL_BREEDING_CHECKED,
    breedData
  );
  return response.data;
};

//Fetch all lineage dogs SIRE's
export const fetchAllSireByDamID = async (
  id: string
): Promise<LinebreedingResponse> => {
  try {
    const response = await axios.post(endpoint.GET_LINEAGE_SIRE(id));
    return response.data; // { sires: [...], dams: [...] }
  } catch (error) {
    console.error("Error fetching sires and dams:", error);
    throw new Error("Failed to fetch sires and dams");
  }
};

// Dashboard Statistics

export const fetchDashboardStats = async (): Promise<DogStats> => {
  try {
    const response = await axios.get(endpoint.DASHBOARD_STATE);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard stats");
  }
};

// Get the Monthly Whelping Graph API
export const fetchMonthlyWhelpingStats = async (year: string) => {
  try {
    const response = await axios.get(endpoint.DASHBOARD_WHELPING_STATE(year));
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard stats");
  }
};

//Dog module all breed dogs
export const fetchGermanShepherdList = async () => {
  try {
    const response = await axios.get(endpoint.GERMANSHEPHERD_LIST);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching german shepherd:", error);
    throw new Error("Failed to fetch german shepherd");
  }
};

export const fetchLabradorRetrieverList = async () => {
  try {
    const response = await axios.get(endpoint.LABRADOR_RETRIEVER);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching Labrador Retriever:", error);
    throw new Error("Failed to fetch Labrador Retriever");
  }
};

export const fetchBulldogsList = async () => {
  try {
    const response = await axios.get(endpoint.BULLDOGS);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching BULLDOGS:", error);
    throw new Error("Failed to fetch BULLDOGS");
  }
};

export const fetchBelgianMalinoisDogsList = async () => {
  try {
    const response = await axios.get(endpoint.BELGIAN_MALINOIS);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching BULLDOGS:", error);
    throw new Error("Failed to fetch BULLDOGS");
  }
};

export const fetchLoanDogsList = async () => {
  try {
    const response = await axios.get(endpoint.LOANED_DOG);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching Loan Dogs:", error);
    throw new Error("Failed to fetch Loan Dogs");
  }
};

export const fetchSoldList = async () => {
  try {
    const response = await axios.get(endpoint.SOLD_DOG);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching Loan Dogs:", error);
    throw new Error("Failed to fetch Loan Dogs");
  }
};

export const fetchTransferredDogList = async () => {
  try {
    const response = await axios.get(endpoint.TRANSFERRED_DOGS);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching Loan Dogs:", error);
    throw new Error("Failed to fetch Loan Dogs");
  }
};

export const fetchStandingDogList = async () => {
  try {
    const response = await axios.get(endpoint.STANDING_DOG);
    return response.data; // This should return the data in the required format
  } catch (error) {
    console.error("Error fetching Loan Dogs:", error);
    throw new Error("Failed to fetch Loan Dogs");
  }
};

// Medical History API

// VACCINATION

export const addVaccination = async (
  data: Partial<VaccinationInput>
): Promise<VaccinationRecord> => {
  console.log("----data-0-----", data)
  const response = await axios.post(endpoint.ADD_VACCINATION, data);
  console.log("----data-0-response----", response)

  return response.data;
};

export const getAllVaccination = async (): Promise<VaccinationRecord[]> => {
  const response = await axios.get(endpoint.GETALL_VACCINATION);
  return response.data;
};

// Update Vaccination Record
export const updateVaccination = async (
  id: string,
  data: Partial<VaccinationInput>
): Promise<VaccinationRecord> => {
  console.log("----id and data inside API test", id, data)
try {
const response = await axios.patch(endpoint.UPDATE_VACCINATION(id), data);
  return response.data;
} catch (error) {
  console.error("Failed to update vaccination", error);
  throw error;
}
};

// Delete Vaccination Record
export const deleteVaccination = async (id: string): Promise<void> => {
  const response = await axios.delete(endpoint.DELETE_VACCINATION(id));
  return response.data;
};

//Prophylaxis Module
// Add
export const addProphylaxis = async (
  data: Partial<ProphylaxisInput>
): Promise<ProphylaxisRecord> => {
  const res = await axios.post(endpoint.ADD_PROPHYLAXIS, data);
  return res.data;
};

// Get All
export const getAllProphylaxis = async (): Promise<ProphylaxisRecord[]> => {
  const res = await axios.get(endpoint.GET_ALL_PROPHYLAXIS);
  return res.data;
};


// Update ----------

//shamim-changes
export const updateProphylaxis = async (
  id: number,
  data: Partial<ProphylaxisInput>
): Promise<ProphylaxisRecord> => {
  // build the URL by calling the function
  const url = endpoint.UPDATE_PROPHYLAXIS(id.toString());
  console.log("PATCH →", url); //changed from PUT to PATCH
  const res = await axios.patch(url, data);
  return res.data;
};

// Previous code

// export const updateProphylaxis = async (
//   id: number,
//   data: Partial<ProphylaxisInput>
// ): Promise<ProphylaxisRecord> => {
//   const res = await axios.put(`${endpoint.UPDATE_PROPHYLAXIS}/${id}`, data);
//   return res.data;
// };

// Delete ------------

//shamim-changes
export const deleteProphylaxis = async (id: number) => {
  const url = endpoint.DELETE_PROPHYLAXIS(id.toString());
  return axios.delete(url).then(res => res.data);
};

export const getOneProphylaxis = async (id: number) => {
  const url = endpoint.GETONE_PROPHYLAXIS(id.toString());
  const { data } = await axios.get(url);
  return data;
};

//previous code

// export const deleteProphylaxis = async (id: number): Promise<void> => {
//   await axios.delete(`${endpoint.DELETE_PROPHYLAXIS}/${id}`);
// };

// Dewarming Module API

export const getAllDeworming = async (): Promise<DewormingRecord[]> => {
  const res = await axios.get(endpoint.GET_ALL_DEWORMING);
  return res.data;
};

export const getDewormingById = async (
  id: number
): Promise<DewormingRecord> => {
  const res = await axios.get(`${endpoint.GET_DEWORMING_BY_ID}/${id}`);
  return res.data;
};

export const addDeworming = async (
  data: Partial<DewormingInput>
): Promise<DewormingRecord> => {
  const res = await axios.post(endpoint.ADD_DEWORMING, data);
  return res.data;
};

export const updateDeworming = async (
  id: number,
  data: Partial<DewormingInput>
): Promise<DewormingRecord> => {
  const res = await axios.patch(endpoint.UPDATE_DEWORMING(String(id)), data);
  return res.data;
};

export const deleteDeworming = async (id: number): Promise<void> => {
  await axios.delete(endpoint.DELETE_DEWORMING(String(id)));
};

// Training Module

export const getAllTraining = async (): Promise<TrainingRecord[]> => {
  const res = await axios.get(endpoint.GET_ALL_TRAINING);
  return res.data;
};

export const getTrainingById = async (id: number): Promise<TrainingRecord> => {
  const res = await axios.get(`${endpoint.GET_TRAINING_BY_ID}/${id}`);
  return res.data;
};

export const addTraining = async (
  data: Partial<TrainingInput>
): Promise<TrainingRecord> => {
  const res = await axios.post(endpoint.ADD_TRAINING, data);
  return res.data;
};

export const updateTraining = async (
  id: number,
  data: Partial<TrainingInput>
): Promise<TrainingRecord> => {
  const res = await axios.patch(endpoint.UPDATE_TRAINING(String(id)), data);
  return res.data;
};

export const deleteTraining = async (id: number): Promise<void> => {
  await axios.delete(endpoint.DELETE_TRAINING(String(id)));
};

// Sickness Module
export const getAllSickness = async (): Promise<SicknessRecord[]> => {
  const res = await axios.get(endpoint.GET_ALL_SICKNESS);
  return res.data;
};

export const getSicknessById = async (id: number): Promise<SicknessRecord> => {
  const res = await axios.get(`${endpoint.GET_SICKNESS_BY_ID}/${id}`);
  return res.data;
};

export const addSickness = async (
  data: Partial<SicknessInput>
): Promise<SicknessRecord> => {
  const res = await axios.post(endpoint.ADD_SICKNESS, data);
  return res.data;
};

export const updateSickness = async (
  id: number,
  data: Partial<SicknessInput>
): Promise<SicknessRecord> => {
  const res = await axios.put(`${endpoint.UPDATE_SICKNESS}/${id}`, data);
  return res.data;
};

export const deleteSickness = async (id: number): Promise<void> => {
  await axios.delete(`${endpoint.DELETE_SICKNESS}/${id}`);
};
