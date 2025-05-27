import { create } from 'zustand';
import { LinebreedingState } from '../components/dogsCategory/types/linebreeding';
import { fetchAllSireByDamID } from '../components/dogsCategory/api/dogsApi';

export const useLinebreedingStore = create<LinebreedingState>((set) => ({
    availableSires: [],
    loading: false,
    error: null,

    fetchAvailableSires: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { availableSires } = await fetchAllSireByDamID(id);
            set({ availableSires, loading: false });
            return availableSires;
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch sires',
                loading: false
            });
            throw error;
        }
    },

    reset: () => set({ availableSires: [], error: null }),
}));