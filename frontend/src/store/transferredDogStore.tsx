import { create } from "zustand";
import axios from "axios";
import { fetchTransferredDogList } from "../components/dogsCategory/api/dogsApi";
import { TransferredDogState } from "../components/dogsCategory/types/transferredDog";

export const useTransferredDogsStore = create<TransferredDogState>((set) => ({
    sires: [],
    dams: [],
    totalTransferredDog: 0,
    loading: false,
    error: null,
  
    fetchTransferredDog: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchTransferredDogList();
        set({
          sires: response.sires,
          dams: response.dams,
          totalTransferredDog: response.total,
          loading: false,
        });
      } catch (err) {
        set({
          error: axios.isAxiosError(err)
            ? err.message
            : 'Failed to fetch transferred dogs',
          loading: false,
        });
      }
    },
  }));