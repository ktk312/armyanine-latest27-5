// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useCndDogsStore } from '../../../store/cndDogStore';


export const useCndDogs = () => {
    const { sires, dams, totalCnd, loading, error, fetchCnd } =
        useCndDogsStore();

    useEffect(() => {
        fetchCnd();
    }, [fetchCnd]);

    return {
        sires,
        dams,
        totalCnd,
        loading,
        error,
        refetch: fetchCnd,
    };
};