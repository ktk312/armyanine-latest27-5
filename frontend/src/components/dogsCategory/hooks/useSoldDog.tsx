// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useSolddogsStore } from '../../../store/soldDogStore';

export const useSoldDog = () => {
    const { sires, dams, totalSoldDog, loading, error, fetchSoldDog } =
        useSolddogsStore();

    useEffect(() => {
        fetchSoldDog();
    }, [fetchSoldDog]);

    return {
        sires,
        dams,
        totalSoldDog,
        loading,
        error,
        refetch: fetchSoldDog,
    };
};