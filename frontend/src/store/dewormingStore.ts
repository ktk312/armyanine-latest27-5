import { create } from "zustand";
import { DewormingState } from "../components/dogsCategory/types/deworming";
import { addDeworming, deleteDeworming, getAllDeworming, getDewormingById, updateDeworming } from "../components/dogsCategory/api/dogsApi";

export const useDewormingStore = create<DewormingState>((set) => ({
  records: [],
  selected: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const records = await getAllDeworming();
      set({ records, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true });
    try {
      const record = await getDewormingById(id);
      set({ selected: record, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const newRecord = await addDeworming(data);
      set((state) => ({
        records: [...state.records, newRecord],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true });
    try {
      const updated = await updateDeworming(id, data);
      set((state) => ({
        records: state.records.map((r) => (r.id === id ? updated : r)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true });
    try {
      await deleteDeworming(id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setSelected: (record) => set({ selected: record }),
}));
