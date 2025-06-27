// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useCnsDogsStore } from '../../../store/cnsDogStore';

export const useCnsDogs = () => {
    const { sires, dams, totalCns, loading, error, fetchCns } =
        useCnsDogsStore();

    useEffect(() => {
        fetchCns();
    }, [fetchCns]);

    return {
        sires,
        dams,
        totalCns,
        loading,
        error,
        refetch: fetchCns,
    };
};