// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useBelgianMalinoisStore } from '../../../store/belgianmalinoisStore';

export const useBelgianMalinois = () => {
    const { sires, dams, totalBelgianMalinois, loading, error, fetchBelgianMalinois } =
        useBelgianMalinoisStore();

    useEffect(() => {
        fetchBelgianMalinois();
    }, [fetchBelgianMalinois]);

    return {
        sires,
        dams,
        totalBelgianMalinois,
        loading,
        error,
        refetch: fetchBelgianMalinois,
    };
};