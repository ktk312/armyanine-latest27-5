import { create } from "zustand";
import { VaccinationState } from "../components/dogsCategory/types/vaccination";
import { addVaccination, deleteVaccination, getAllVaccination, updateVaccination } from "../components/dogsCategory/api/dogsApi";

export const useVaccinationStore = create<VaccinationState>((set) => ({
  records: [],
  selected: null,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const res = await getAllVaccination();
      set({ records: res, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

 create: async (data) => {
  set({ loading: true });
  try {
    const response = await addVaccination(data); // This should also accept Partial
    set((state) => ({
      records: [...state.records, response],
      loading: false,
    }));
  } catch (error: any) {
    set({ error: error.message, loading: false });
  }
},

  update: async (id, data) => {
    const res = await updateVaccination(id, data);
    set((state) => ({
      records: state.records.map((r) => (r.id === id ? res : r)),
    }));
  },

  remove: async (id) => {
    const res = await deleteVaccination(id);
    set((state) => ({
      records: state.records.filter((r) => r.id !== id),
    }));
  },

  setSelected: (record) => set({ selected: record }),
}));