// hooks/dog/useDogHooks.ts
import { useEffect } from "react";
import { useDogStore } from "../../../store/dogStore";

export const useFetchDogs = () => {
  const { fetchDogs, loading, error, dogs, setSelectedDog } = useDogStore();

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return { loading, error, dogs, setSelectedDog };
};
