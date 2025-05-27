// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useLoandogsStore } from '../../../store/loanDog';

export const useLoanDogs = () => {
    const { sires, dams, totalLoanDog, loading, error, fetchLoanDog } =
        useLoandogsStore();

    useEffect(() => {
        fetchLoanDog();
    }, [fetchLoanDog]);

    return {
        sires,
        dams,
        totalLoanDog,
        loading,
        error,
        refetch: fetchLoanDog,
    };
};