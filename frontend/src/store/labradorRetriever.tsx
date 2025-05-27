import { create } from "zustand";
import axios from "axios";
import { fetchLabradorRetrieverList } from "../components/dogsCategory/api/dogsApi";
import { LabradorRetrieverState } from "../components/dogsCategory/types/LabradorRetriever";

export const useLabradorRetrieverStore = create<LabradorRetrieverState>((set) => ({
    sires: [],
    dams: [],
    totalLabradorRetriever: 0,
    loading: false,
    error: null,

    fetchLabradorRetriever: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetchLabradorRetrieverList();

            set({
                sires: response.sires,
                dams: response.dams,
                totalLabradorRetriever: response.totalLabradorRetreiver,
                loading: false,
            });

        } catch (err) {
            set({
                error: axios.isAxiosError(err)
                    ? err.message
                    : 'Failed to fetch Labrador Retriver',
                loading: false,
            });
        }
    },
}));