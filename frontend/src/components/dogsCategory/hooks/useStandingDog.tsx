// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useStandDogsStore } from '../../../store/standingDogStore';

export const useStandingDog = () => {
    const { sires, dams, totalStandingDog, loading, error, fetchStandingDog } =
        useStandDogsStore();

    useEffect(() => {
        fetchStandingDog();
    }, [fetchStandingDog]);

    return {
        sires,
        dams,
        totalStandingDog,
        loading,
        error,
        refetch: fetchStandingDog,
    };
};