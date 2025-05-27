import { create } from "zustand";
import axios from "axios";
import { fetchBelgianMalinoisDogsList } from "../components/dogsCategory/api/dogsApi";
import { BelgianMalinoisState } from "../components/dogsCategory/types/Belgian";

export const useBelgianMalinoisStore = create<BelgianMalinoisState>((set) => ({
    sires: [],
    dams: [],
    totalBelgianMalinois: 0,
    loading: false,
    error: null,
  
    fetchBelgianMalinois: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchBelgianMalinoisDogsList();
        set({
          sires: response.sires,
          dams: response.dams,
          totalBelgianMalinois: response.totalBelgianMalinoiss,
          loading: false,
        });
      } catch (err) {
        set({
          error: axios.isAxiosError(err)
            ? err.message
            : 'Failed to fetch BelgianMalinois',
          loading: false,
        });
      }
    },
  }));