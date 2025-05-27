import { create } from "zustand";
import { createDogCategory, fetchDogCategory } from "../components/dogsCategory/api/dogsApi";
import { CategoryState, NewDogCategory } from "../components/dogsCategory/types/dogCategory";


export const useCatgeoryStore = create<CategoryState>((set) => ({
  categories: [],
  selectedCategory: null,
  dogLoading: false,
  error: null,

  getAllDogCategory: async () => {
    set({ dogLoading: true, error: null });
    try {
      const categories = await fetchDogCategory(); // Fetch breeds from API
      
      set({ categories, dogLoading: false });

      return categories; // ✅ Ensure breeds are returned
    } catch (error) {
      set({ error: "Failed to fetch breeds", dogLoading: false });
      return []; // ✅ Return an empty array in case of error to avoid "void" issues
    }
  },
  setSelectedDogcategory: (category) => set({ selectedCategory: category }),


  // getCategoryById: async (id: number) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const category = await fetchBreedById(String(id));
  //     set({ selectedCategory: category, loading: false });
  //   } catch (error) {
  //     set({ error: "Failed to fetch category", loading: false });
  //   }
  // },

  addDogCategory: async (dogCategoryData: NewDogCategory) => {
    set({ dogLoading: true, error: null });
    try {
      const newCategory = await createDogCategory(dogCategoryData);
      set((state) => ({ categories: [...state.categories, newCategory], dogLoading: false,  selectedCategory: null }));
     
      return newCategory;
    } catch (error) {
      set({ error: "Failed to create newCategory", dogLoading: false });
    }
  },

  // updateDogCategory: async (id, categoryData) => {
  //   set({ dogLoading: true, error: null });
  //   try {
  //     const updatedCategory = await updateDogCategory(id, categoryData);
  //     set((state) => ({
  //       categories: state.categories.map((c) =>
  //         c.id === id ? updatedCategory : c
  //       ),
  //       dogLoading: false,
  //     }));
  //     return updatedCategory;
  //   } catch (error) {
  //     set({ error: "Failed to update category", dogLoading: false });
  //     return null;
  //   }
  // },
  
  // editDogCategoryBreed: async (id: number,CategoryData: Partial<DogCategory>) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const updatedBreed = await editDogCategoryBreed(String(id), CategoryData);
  //     set((state) => ({
  //       breeds: state.breeds.map((b) => (b.id === id ? updatedBreed : b)),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: "Failed to update breed", loading: false });
  //   }
  // },

  // removeBreed: async (id: number) => {
  //   set({ loading: true, error: null });
  //   try {
  //     await deleteBreed(String(id));
  //     set((state) => ({
  //       breeds: state.breeds.filter((b) => b.id !== id),
  //       loading: false,
  //     }));
  //   } catch (error) {
  //     set({ error: "Failed to delete breed", loading: false });
  //   }
  // },

  // select: async (id: number) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const breed = await fetchBreedById(String(id));
  //     set({ selec: breed, loading: false });
  //   } catch (error) {
  //     set({ error: "Failed to fetch breed details", loading: false });
  //   }
  // },
}));
