// hooks/useFetchDogStats.ts
import { useEffect } from 'react';
import { useDogStatsStore } from '../../../store/dashboardStateStore';

export const useFetchDogStats = () => {
    const { dogStats, fetchDogStats, loading, error } = useDogStatsStore();

    useEffect(() => {
        fetchDogStats();
    }, [fetchDogStats]);

    return { dogStats, loading, error };
};