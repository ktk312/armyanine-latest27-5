import { create } from "zustand";
import axios from "axios";
import { fetchBulldogsList } from "../components/dogsCategory/api/dogsApi";
import { BulldogState } from "../components/dogsCategory/types/buldogs";

export const useBulldogsStore = create<BulldogState>((set) => ({
    sires: [],
    dams: [],
    totalBulldog: 0,
    loading: false,
    error: null,
  
    fetchBulldog: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchBulldogsList();
        set({
          sires: response.sires,
          dams: response.dams,
          totalBulldog: response.totalBulldog,
          loading: false,
        });
      } catch (err) {
        set({
          error: axios.isAxiosError(err)
            ? err.message
            : 'Failed to fetch Bulldog',
          loading: false,
        });
      }
    },
  }));