import { useEffect } from "react";
import { useCatgeoryStore } from "../../../store/dogCategoryStore";
import { NewDogCategory } from "../types/dogCategory";

export const useFetchDogsCategory = () => {
  const { getAllDogCategory, dogLoading, error, categories, selectedCategory ,setSelectedDogcategory} = useCatgeoryStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    getAllDogCategory();
  }, [getAllDogCategory]);

  return { dogLoading, error, categories, selectedCategory,setSelectedDogcategory }; //Fix: Return loading, not isLoading
};


export const useCreateDogcategory = () => {
  const { addDogCategory, dogLoading, error } = useCatgeoryStore();

  const createNewDog = async (dogData: NewDogCategory) => {
    await addDogCategory(dogData);
  };

  return { createNewDog, dogLoading, error };
};