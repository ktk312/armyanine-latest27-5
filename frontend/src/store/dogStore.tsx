import { create } from "zustand";
import { Dog, DogStore } from "../components/dogsCategory/types/dog";
import {
  createDog,
  fetchDogs,
  fetchSireDamByBreedId,
  fetchSiresAndDams,
  updateDog,
  fetchDogsCount,
  filterDogs,
} from "../../src/components/dogsCategory/api/dogsApi"; // Import API function

// interface DogStore {
//   dogs: Dog[];
//   loading: boolean;
//   error: string | null;
//   fetchDogs: () => Promise<void>;
// }

export const useDogStore = create<DogStore>((set) => ({
  dogs: [],
  selectedDog: null,
  loading: false,
  error: null,
  count: 0,
  // Fetch Dog
  fetchDogs: async () => {
    set({ loading: true, error: null });

    try {
      const dogs = await fetchDogs(); // Use the API function
      set({ dogs, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dogs";
      set({ error: errorMessage, loading: false });
    }
  },
  filteredDog: async (breedId: string, cityId: string) =>{
    set({ loading: true, error: null });

    try {
      const dogs = await filterDogs(breedId, cityId); // Use the API function
      set({ dogs, loading: false });
      return dogs;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dogs";
      set({ error: errorMessage, loading: false });
      throw err; 
    }
  },
  // setDogs: (dogs) => set({ dogs }),
  setSelectedDog: (dog) => set({ selectedDog: dog }),
    resetSelectedDog: () => set({ selectedDog: null }),


  // Creating dog
  addDog: async (dogData: FormData) => {
    set({ loading: true, error: null });
    try {
      const newDog = await createDog(dogData); // Call API
      set((state) => ({
        dogs: [...state.dogs, newDog],
        loading: false,
        selectedDog: null,
      }));
      return newDog;
    } catch (error) {
      set({ error: "Failed to create dog", loading: false });
    }
  },

  // deleteDog: async (id: number) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await deleteDogById(id); // API call
  //     set((state) => ({
  //       dogs: state.dogs.filter((dog) => dog.id !== id),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: "Failed to delete dog", loading: false });
  //   }
  // },

  editOneDog: async (dogData: any, id: any) => {
    set({ loading: true, error: null });
    try {
      const updatedDog = await updateDog(dogData, id); // Call API
      set((state) => ({
        dogs: state.dogs.map((dog) =>
          dog.id === parseInt(id) ? updatedDog : dog
        ),
        loading: false,
        selectedDog: null,
      }));
      return updatedDog;
    } catch (error) {
      set({ error: "Failed to update dog", loading: false });
      throw error;
    }
  },
  getDogsCount: async () => {
    set({ loading: true, error: null });
    try {
      const dogsCount = await fetchDogsCount(); // This should return something like { totalDogs: 147 }

      set({
        count: dogsCount, // Set the count in Zustand state
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: "Failed to fetch dogs", loading: false });
    }
  },
}));

interface ParentDogStoreState {
  sires: Dog[];
  dams: Dog[];
  Parentloading: boolean;
  error: string | null;
  getSiresAndDams: () => Promise<void>;
  getSiresAndDamsByBreedId: (id: string) => Promise<void>;
}

export const useParentDogStore = create<ParentDogStoreState>((set) => ({
  sires: [],
  dams: [],
  Parentloading: false,
  error: null,

  getSiresAndDams: async () => {
    set({ Parentloading: true, error: null });
    try {
      const { sires, dams } = await fetchSiresAndDams();
      set({ sires, dams, Parentloading: false });
    } catch (error) {
      set({ error: "Failed to fetch sires and dams", Parentloading: false });
    }
  },

  getSiresAndDamsByBreedId: async (id: string) => {
    set({ Parentloading: true, error: null });
    try {
      const { sires, dams } = await fetchSireDamByBreedId(id);
      set({ sires, dams, Parentloading: false });
    } catch (error) {
      set({ error: "Failed to fetch sires and dams", Parentloading: false });
    }
  },
}));
