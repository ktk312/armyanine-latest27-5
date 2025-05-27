import { create } from "zustand";
import axios from "axios";
import { fetchLoanDogsList } from "../components/dogsCategory/api/dogsApi";
import { LoanDogState } from "../components/dogsCategory/types/loanDog";

export const useLoandogsStore = create<LoanDogState>((set) => ({
    sires: [],
    dams: [],
    totalLoanDog: 0,
    loading: false,
    error: null,

    fetchLoanDog: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetchLoanDogsList();
            set({
                sires: response.sires,
                dams: response.dams,
                totalLoanDog: response.totalLoanDogs,
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