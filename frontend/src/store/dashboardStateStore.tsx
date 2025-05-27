import { create } from 'zustand';
import { DogStatsState } from '../components/dogsCategory/types/dashboardState';
import { fetchDashboardStats } from '../components/dogsCategory/api/dogsApi';


export const useDogStatsStore = create<DogStatsState>((set) => ({
    dogStats: null,
    loading: false,
    error: null,

    fetchDogStats: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetchDashboardStats();
            set({ dogStats: response, loading: false });
        } catch (error: any) {
            set({
                error: error?.response?.data?.error || 'Failed to fetch dog stats',
                loading: false,
            });
        }
    },
}));