import { create } from "zustand";
import { Breed, BreedState } from "../components/dogsCategory/types/breed";
import { createBreed, deleteBreed, fetchBreedById, fetchBreeds, updateBreed } from "../components/dogsCategory/api/dogsApi";


export const useBreedStore = create<BreedState>((set) => ({
  breeds: [],
  selectedBreed: null,
  loading: false,
  error: null,

  getAllBreeds: async () => {
    set({ loading: true, error: null });
    try {
      const breeds = await fetchBreeds(); // Fetch breeds from API
      
      set({ breeds, loading: false });

      return breeds; // ✅ Ensure breeds are returned
    } catch (error) {
      set({ error: "Failed to fetch breeds", loading: false });
      return []; // ✅ Return an empty array in case of error to avoid "void" issues
    }
  },
  setSelectedBreed: (breeds) => set({ selectedBreed: breeds }),

  getBreedById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const breed = await fetchBreedById(String(id));
      set({ selectedBreed: breed, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch breed", loading: false });
    }
  },

  addBreed: async (breedData: Partial<Breed>) => {
    set({ loading: true, error: null });
    try {
      const newBreed = await createBreed(breedData);
      set((state) => ({ breeds: [...state.breeds, newBreed], loading: false, selectedBreed: null }));
    } catch (error) {
      set({ error: "Failed to create breed", loading: false });
    }
  },

  editBreed: async (id: number, breedData: Partial<Breed>) => {
    set({ loading: true, error: null });
    try {
      const updatedBreed = await updateBreed(String(id), breedData);
      set((state) => ({
        breeds: state.breeds.map((b) => (b.id === id ? updatedBreed : b)),
        loading: false,
        selectedBreed: null
      }));
    } catch (error) {
      set({ error: "Failed to update breed", loading: false });
    }
  },

  removeBreed: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteBreed(String(id));
      set((state) => ({
        breeds: state.breeds.filter((b) => b.id !== id),
        loading: false,
        selectedBreed: null,
      }));
    } catch (error) {
      set({ error: "Failed to delete breed", loading: false });
    }
  },
  selectBreed: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const breed = await fetchBreedById(String(id));
      set({ selectedBreed: breed, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch breed details", loading: false });
    }
  },
}));
