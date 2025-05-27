import { CountryType } from "./country";

export interface City {
  id: number;
  countryId: number;
  city?: string;
  status?: string;
  country?: CountryType;
}

export interface CityState {
  city: City[];
  selectedCity: City | null;
  CityLoading: boolean;
  Cityerror: string | null;
  getAllCity: () => Promise<City[]>;
  getCitiesByCountryId: (countryId: string) => Promise<City[]>;  // <-- added here
  addCity: (cityData: Partial<City>) => Promise<void>;
  editCity: (id: number, CityData: Partial<City>) => Promise<City | undefined>;
  // removeCity: (id: number) => Promise<void>;
  setSelectedCity: (city: City | null) => Promise<void>;
  

}