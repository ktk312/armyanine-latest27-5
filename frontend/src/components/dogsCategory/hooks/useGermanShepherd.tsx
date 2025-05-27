// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useGermanShepherdStore } from '../../../store/germanshepherd';

export const useGermanShepherds = () => {
    const { sires, dams, total, loading, error, fetchGermanShepherds } =
        useGermanShepherdStore();

    useEffect(() => {
        fetchGermanShepherds();
    }, [fetchGermanShepherds]);

    return {
        sires,
        dams,
        total,
        loading,
        error,
        refetch: fetchGermanShepherds,
    };
};