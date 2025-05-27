import { create } from "zustand";
import { GermanShepherdState } from "../components/dogsCategory/types/GermanShepherd";
import axios from "axios";
import { fetchGermanShepherdList } from "../components/dogsCategory/api/dogsApi";

export const useGermanShepherdStore = create<GermanShepherdState>((set) => ({
    sires: [],
    dams: [],
    total: 0,
    loading: false,
    error: null,
  
    fetchGermanShepherds: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchGermanShepherdList();
        set({
          sires: response.sires,
          dams: response.dams,
          total: response.totalGermanShepherd,
          loading: false,
        });
      } catch (err) {
        set({
          error: axios.isAxiosError(err)
            ? err.message
            : 'Failed to fetch German Shepherds',
          loading: false,
        });
      }
    },
  }));