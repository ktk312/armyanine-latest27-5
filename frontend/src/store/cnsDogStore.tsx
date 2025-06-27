import { create } from "zustand";
import axios from "axios";
import { fetchCnsDogList } from "../components/dogsCategory/api/dogsApi";
import { CnsState } from "../components/dogsCategory/types/cns";


export const useCnsDogsStore = create<CnsState>((set) => ({
  sires: [],
  dams: [],
  totalCns: 0,
  loading: false,
  error: null,

  fetchCns: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchCnsDogList();
      set({
        sires: response.sires,
        dams: response.dams,
        totalCns: response.total,
        loading: false,
      });
    } catch (err) {
      set({
        error: axios.isAxiosError(err)
          ? err.message
          : 'Failed to fetch standing dogs',
        loading: false,
      });
    }
  },
}));