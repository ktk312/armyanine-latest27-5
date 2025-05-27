import { create } from 'zustand';
import axios from 'axios';
import { LitterInspection, LitterStore } from '../components/dogsCategory/types/litterInspection';
import { createLitterInspection, fetchAllLitterInspection, updateLitterInspection } from '../components/dogsCategory/api/dogsApi';

export const useLitterStore = create<LitterStore>((set) => ({
  litter: [],
  selectedLitter: null,
  loading: false,
  error: null,

  fetchLitter: async () => {
    try {
      set({ loading: true });
      const litter = await fetchAllLitterInspection();
      set({ litter, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setSelectedLitter: (litter) => {
    set({ selectedLitter: litter });
  },

  addLitter: async (litterData) => {
    const data= await createLitterInspection(litterData);
    set((state) => ({ litter: [...state.litter, data], loading: false, selectedLitter: null }));
    return data;
  },

   editLitter: async (
      id: number,
      litterData: Partial<LitterInspection>
    ): Promise<LitterInspection | undefined> => {
      set({ loading: true, error: null });
      try {
        const updatedLitter = await updateLitterInspection(String(id), litterData);
        set((state) => ({
          LitterInspection: state.litter.map((b) => (b.id === id ? updatedLitter : b)),
          loading: false,
          selectedLitter: null,
        }));
        return updatedLitter;
      } catch (error) {
        set({ error: "Failed to update stud certification", loading: false });
        return undefined;
      }
    },

  fetchLitterById: async (id) => {
    try {
      set({ loading: true });
      const { data } = await axios.get(`/api/litter/${id}`);
      set({ selectedLitter: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
