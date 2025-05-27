// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useBulldogsStore } from '../../../store/bulldogStore';

export const useBulldog = () => {
    const { sires, dams, totalBulldog, loading, error, fetchBulldog } =
        useBulldogsStore();

    useEffect(() => {
        fetchBulldog();
    }, [fetchBulldog]);

    return {
        sires,
        dams,
        totalBulldog,
        loading,
        error,
        refetch: fetchBulldog,
    };
};