import { create } from "zustand";
import axios from "axios";
import { fetchDeadDogList } from "../components/dogsCategory/api/dogsApi";
import { DeadDogState } from "../components/dogsCategory/types/deadDog";

export const useDeadDogsStore = create<DeadDogState>((set) => ({
  sires: [],
  dams: [],
  totalDeadDog: 0,
  loading: false,
  error: null,

  fetchDeadDog: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchDeadDogList();
      set({
        sires: response.sires,
        dams: response.dams,
        totalDeadDog: response.total,
        loading: false,
      });
    } catch (err) {
      set({
        error: axios.isAxiosError(err)
          ? err.message
          : 'Failed to fetch Dead dogs',
        loading: false,
      });
    }
  },
}));