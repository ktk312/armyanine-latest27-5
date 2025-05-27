// useWhelpingStore.ts
import { MonthlyWhelpingData } from '../components/dogsCategory/types/whelpingStatistic';
import { create } from 'zustand';
import { fetchMonthlyWhelpingStats } from '../components/dogsCategory/api/dogsApi';

interface WhelpingState {
    monthlyData: MonthlyWhelpingData[] | null;
    loading: boolean;
    error: string | null;
    fetchMonthlyWhelpingData: (year: string) => Promise<void>;
}

export const useWhelpingStore = create<WhelpingState>((set: any) => ({
    monthlyData: null,
    loading: false,
    error: null,

    fetchMonthlyWhelpingData: async (year: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetchMonthlyWhelpingStats(year);
            set({ monthlyData: response.data.data.monthlyData, loading: false });
        } catch (error: any) {
            set({
                error: error?.response?.data?.error || 'Failed to fetch whelping data',
                loading: false,
            });
        }
    },
}));
