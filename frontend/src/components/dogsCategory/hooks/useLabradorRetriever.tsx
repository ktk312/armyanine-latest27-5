// hooks/useGermanShepherds.ts
import { useEffect } from 'react';
import { useLabradorRetrieverStore } from '../../../store/labradorRetriever';

export const useLabradorRetriever = () => {
    const { sires, dams, totalLabradorRetriever, loading, error, fetchLabradorRetriever } =
        useLabradorRetrieverStore();
    useEffect(() => {
        fetchLabradorRetriever();
    }, [fetchLabradorRetriever]);
    useEffect(() => {
    }, [totalLabradorRetriever, sires]);
    return {
        sires,
        dams,
        totalLabradorRetriever,
        loading,
        error,
        refetch: fetchLabradorRetriever,
    };
};