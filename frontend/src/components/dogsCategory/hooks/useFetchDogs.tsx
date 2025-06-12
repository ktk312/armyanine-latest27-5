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
  console.log("breed ID", breedId)
  const { filteredDog, fetchDogs,loading, error, dogs, setSelectedDog, selectedDog } = useDogStore();

  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (breedId || cityId) {
      console.log("---breeed ID are", breedId)
      filteredDog(breedId, cityId);
      setHasSearched(true);
    }else{
      fetchDogs();
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
