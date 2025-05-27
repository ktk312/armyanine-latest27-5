import { useEffect, useState } from "react";
import { useDogStore } from "../../../store/dogStore";

export const useFetchDogs = () => {
  const { fetchDogs, loading, error, dogs, setSelectedDog, selectedDog } =
    useDogStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return { loading, error, dogs, setSelectedDog, selectedDog }; //Fix: Return loading, not isLoading
};


// Filter Dog Hook
export const useFilteredDogs = (breedId: string, cityId: string) => {
  const { filteredDog, loading, error, dogs, setSelectedDog, selectedDog } = useDogStore();

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (breedId && cityId) {
      filteredDog(breedId, cityId);
      setHasSearched(true);
    }
  }, [breedId, cityId, filteredDog]);

  return { loading, error, dogs, setSelectedDog, selectedDog, hasSearched };
};
export const useFetchParentDogs = () => {
  const { fetchDogs, loading, error, dogs, setSelectedDog } = useDogStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return { loading, error, dogs, setSelectedDog }; //Fix: Return loading, not isLoading
};
