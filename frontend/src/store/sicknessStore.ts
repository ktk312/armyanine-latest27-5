import { create } from "zustand";
import { SicknessState } from "../components/dogsCategory/types/sickness";
import { addSickness, deleteSickness, getAllSickness, getSicknessById, updateSickness } from "../components/dogsCategory/api/dogsApi";

export const useSicknessStore = create<SicknessState>((set) => ({
  records: [],
  selected: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const records = await getAllSickness();
      set({ records, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true });
    try {
      const record = await getSicknessById(id);
      set({ selected: record, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const newRecord = await addSickness(data);
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
      const updated = await updateSickness(id, data);
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
      await deleteSickness(id);
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
