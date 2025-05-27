import { useEffect } from 'react';
import { useLinebreedingStore } from '../../../store/linebreedingStore';

export const useLinebreeding = (id?: string) => {
  const { availableSires, loading, error, fetchAvailableSires, reset } = useLinebreedingStore();

  useEffect(() => {
    if (id) {
      fetchAvailableSires(id);
    }
    return () => reset();
  }, [id, fetchAvailableSires, reset]);

  return {
    sires: availableSires,
    loading,
    error,
    refetch: () => id ? fetchAvailableSires(id) : Promise.resolve(),
  };
};