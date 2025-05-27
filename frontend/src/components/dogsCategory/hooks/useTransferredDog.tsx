// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useTransferredDogsStore } from '../../../store/transferredDogStore';

export const useTransferredDog = () => {
    const { sires, dams, totalTransferredDog, loading, error, fetchTransferredDog } =
        useTransferredDogsStore();

    useEffect(() => {
        fetchTransferredDog();
    }, [fetchTransferredDog]);

    return {
        sires,
        dams,
        totalTransferredDog,
        loading,
        error,
        refetch: fetchTransferredDog,
    };
};