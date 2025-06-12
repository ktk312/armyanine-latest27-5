import { create } from "zustand";
import { TrainingState } from "../components/dogsCategory/types/training";
import { addTraining, deleteTraining, getAllTraining, getTrainingById, updateTraining } from "../components/dogsCategory/api/dogsApi";


export const useTrainingStore = create<TrainingState>((set) => ({
  records: [],
  selected: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const records = await getAllTraining();
      set({ records, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true });
    try {
      const record = await getTrainingById(id);
      set({ selected: record, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const newRecord = await addTraining(data);
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
      const updated = await updateTraining(id, data);
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
      await deleteTraining(id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setSelected: (record) => set({ selected: record }),
  

// Add this method to the store:
clearSelectedTraining: () => set({ selected: null }),

}));
