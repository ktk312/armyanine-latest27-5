// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useDeadDogsStore } from '../../../store/deadDogStore';


export const useDeadDog = () => {
    const { sires, dams, totalDeadDog, loading, error, fetchDeadDog } =
        useDeadDogsStore();

    useEffect(() => {
        fetchDeadDog();
    }, [fetchDeadDog]);

    return {
        sires,
        dams,
        totalDeadDog,
        loading,
        error,
        refetch: fetchDeadDog,
    };
};