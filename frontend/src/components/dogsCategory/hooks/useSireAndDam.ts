import { useEffect } from "react";
import { useParentDogStore } from "../../../store/dogStore";

export const useSiresAndDams = () => {
  const { sires, dams, Parentloading, error, getSiresAndDams } = useParentDogStore();

  useEffect(() => {
    getSiresAndDams(); // Fetch data on component mount
  }, []);

  return { sires, dams, Parentloading, error };
};

export const useSiresAndDamsByBreed = (id: string) => {
  const {getSiresAndDamsByBreedId, sires, dams, Parentloading, error } = useParentDogStore();

  useEffect(() => {
    if(id){
      getSiresAndDamsByBreedId(id); // Fetch data on component mount

    }
  }, [id, getSiresAndDamsByBreedId]);

  return {getSiresAndDamsByBreedId, sires, dams, Parentloading, error };
};
