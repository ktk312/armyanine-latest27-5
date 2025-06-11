import { create } from "zustand";
import { ProphylaxisState } from "../components/dogsCategory/types/prophylaxis";
import { addProphylaxis, deleteProphylaxis, getAllProphylaxis, updateProphylaxis } from "../components/dogsCategory/api/dogsApi";


export const useProphylaxisStore = create<ProphylaxisState>((set) => ({
  records: [],
  selected: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const data = await getAllProphylaxis();
      set({ records: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  create: async (data) => {
    try {
      const newRecord = await addProphylaxis(data);
      console.log("Fetched Prophylaxis newRecord inside store:", newRecord);


      set((state) => ({ records: [...state.records, newRecord] }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  update: async (id, data) => {
    try {
      const updated = await updateProphylaxis(id, data);
      set((state) => ({
        records: state.records.map((r) => (r.id === id ? updated : r)),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  remove: async (id) => {
    try {
      await deleteProphylaxis(id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  setSelected: (record) => set({ selected: record }),
}));
