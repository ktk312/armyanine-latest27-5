import { create } from "zustand";
import { City, CityState } from "../components/dogsCategory/types/city";
import { createCity, fetchAllCities, fetchAllCitiesByCountryId, updateCity } from "../components/dogsCategory/api/dogsApi";

export const useCityStore = create<CityState>((set) => ({
  city: [],
  selectedCity: null,
  CityLoading: false,
  Cityerror: null,

  getAllCity: async (): Promise<City[]> => {
    set({ CityLoading: true, Cityerror: null });

    try {
      const response = await fetchAllCities();

      const cities: City[] = response.map((city: any) => ({
        id: city.id,
        countryId: city.countryId,
        city: city.city,
        status: city.status,
        country: city.country,
      }));

      set({ city: cities, CityLoading: false });
      console.log("--cities are", cities)
      return cities;
    } catch (error) {
      set({
        Cityerror: "Failed to fetch cities",
        city: [],
        CityLoading: false,
      });
      return [];
    }
  },
  setSelectedCity: async (city: City | null): Promise<void> => {
    set({ selectedCity: city });
  },

  editCity: async (
    id: number,
    cityData: Partial<City>
  ): Promise<City | undefined> => {
    set({ CityLoading: true, Cityerror: null });
    try {
      const updatedCity = await updateCity(String(id), cityData);
      set((state) => ({
        city: state.city.map((b) => (b.id === id ? updatedCity : b)),
        loading: false,
        selectedCity: null,
      }));
      return updatedCity;
    } catch (error) {
      set({ Cityerror: "Failed to update City", CityLoading: false });
      return undefined;
    }
  },
  addCity: async (data: Partial<City>) => {
    set({ CityLoading: true, Cityerror: null });

    try {
      const newCity = await createCity(data); // This uses your working API
      set((state) => ({
        city: [...state.city, newCity],
        CityLoading: false,
      }));
    } catch (error) {
      set({
        Cityerror: "Failed to add city",
        CityLoading: false,
      });
    }
  },
  getCitiesByCountryId: async (countryId: string) => {
    set({ CityLoading: true, Cityerror: null });
    try {
      const cities = await fetchAllCitiesByCountryId(countryId);
      set({ city: cities, CityLoading: false });
      return cities;
    } catch (error) {
      set({ Cityerror: "Failed to fetch cities by country", CityLoading: false });
      return [];
    }
  },
    resetCityState: () => {
    set({
      selectedCity: null,
      Cityerror: null,
      CityLoading: false,
    });
  },
}));
