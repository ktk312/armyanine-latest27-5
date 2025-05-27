import { create } from "zustand";
import axios from "axios";
import { fetchStandingDogList } from "../components/dogsCategory/api/dogsApi";
import { StandingDogState } from "../components/dogsCategory/types/standingDog";

export const useStandDogsStore = create<StandingDogState>((set) => ({
    sires: [],
    dams: [],
    totalStandingDog: 0,
    loading: false,
    error: null,
  
    fetchStandingDog: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchStandingDogList();
        set({
          sires: response.sires,
          dams: response.dams,
          totalStandingDog: response.total,
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