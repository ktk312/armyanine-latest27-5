import { create } from "zustand";
import {
  createCountry,
  fetchAllCountry,
  updateCountry,
} from "../components/dogsCategory/api/dogsApi";
import {
  CountryState,
  CountryType,
} from "../components/dogsCategory/types/country";
import countries from "world-countries";

export const useCountryStore = create<CountryState>((set, get) => ({
  country: [],
  selectedCountry: null,
  countryLoading: false,
  Countryerror: null,

  getAllCountry: async (): Promise<CountryType[]> => {
    set({ countryLoading: true, Countryerror: null });

    try {
      const response = await fetchAllCountry();

      const countries: CountryType[] = response.map((country: any) => ({
        idCountry: country.idCountry,
        countryCode: country.countryCode,
        countryName: country.countryName,
        currencyCode: country.currencyCode,
        continent: country.continent,
      }));

      set({ country: countries, countryLoading: false });
      return countries;
    } catch (error) {
      set({
        Countryerror: "Failed to fetch countries",
        country: [],
        countryLoading: false,
      });
      return [];
    }
  },

  setSelectedCountry: async (country: CountryType | null): Promise<void> => {
    set({ selectedCountry: country });
  },

  editCountry: async (
    id: number,
    countryData: Partial<CountryType>
  ): Promise<CountryType | undefined> => {
    set({ countryLoading: true, Countryerror: null });
    try {
      const updatedCountry = await updateCountry(String(id), countryData);
      set((state) => ({
        country: state.country.map((b) => (b.id === id ? updatedCountry : b)),
        loading: false,
        selectedCountry: null,
      }));
      return updatedCountry;
    } catch (error) {
      set({ Countryerror: "Failed to update Country", countryLoading: false });
      return undefined;
    }
  },

  addCountry: async (data: Partial<CountryType>) => {
    set({ countryLoading: true, Countryerror: null });

    try {
      const newCountry = await createCountry(data); // Make sure `createCountry` returns CountryType
      set((state) => ({
        country: [...state.country, newCountry],
        countryLoading: false,
      }));
    } catch (error) {
      set({
        Countryerror: "Failed to add country",
        countryLoading: false,
      });
    }
  },
  createCountries: async () => {
    try {
      const existing = await get().getAllCountry();

      const formatted = countries
        .filter((c) => c.unMember === true)
        .map((c) => ({
          countryCode: c.cca2,
          countryName: c.name.common,
          currencyCode: c.currencies ? Object.keys(c.currencies)[0] : null,
          continent: c.region,
        }));

      for (const country of formatted) {
        const alreadyExists = existing.some(
          (ex) =>
            ex.countryName.trim().toLowerCase() ===
            country.countryName.trim().toLowerCase()
        );

        if (!alreadyExists) {
          await get().addCountry(country);
        }
      }

      // refresh after adding
      await get().getAllCountry();

      console.log("✅ All countries added (skipped duplicates).");
    } catch (error) {
      console.error("Error creating countries:", error);
    }
  },
}));

// import { create } from "zustand";
// import { Country } from "../components/dogsCategory/types/country";

// interface CountryStore {
//   countries: Country[];
//   setCountries: (countries: Country[] | ((prev: Country[]) => Country[])) => void;
// }

// export const useCountryStore = create<CountryStore>((set) => ({
//   countries: [],
//   setCountries: (countries) =>
//     set((state) => ({
//       countries: typeof countries === "function" ? countries(state.countries) : countries,
//     })),
// }));
