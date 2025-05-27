import { create } from "zustand";
import axios from "axios";
import {  fetchSoldList } from "../components/dogsCategory/api/dogsApi";
import { SoldDogState } from "../components/dogsCategory/types/soldDog";

export const useSolddogsStore = create<SoldDogState>((set) => ({
    sires: [],
    dams: [],
    totalSoldDog: 0,
    loading: false,
    error: null,
  
    fetchSoldDog: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchSoldList();
        set({
          sires: response.sires,
          dams: response.dams,
          totalSoldDog: response.total,
          loading: false,
        });
      } catch (err) {
        set({
          error: axios.isAxiosError(err)
            ? err.message
            : 'Failed to fetch sold dogs',
          loading: false,
        });
      }
    },
  }));