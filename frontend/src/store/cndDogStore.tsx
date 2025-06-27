import { create } from "zustand";
import axios from "axios";
import { fetchCndDogList } from "../components/dogsCategory/api/dogsApi";
import { CndState } from "../components/dogsCategory/types/cnd";

export const useCndDogsStore = create<CndState>((set) => ({
  sires: [],
  dams: [],
  totalCnd: 0,
  loading: false,
  error: null,

  fetchCnd: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchCndDogList();
      set({
        sires: response.sires,
        dams: response.dams,
        totalCnd: response.total,
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