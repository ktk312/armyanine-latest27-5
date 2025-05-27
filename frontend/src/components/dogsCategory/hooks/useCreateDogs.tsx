import { useDogStore } from "../../../store/dogStore";

export const useCreateDog = () => {
  const { addDog, loading, error, editOneDog } = useDogStore();

  const createNewDog = async (dogData: FormData) => {
    const response = await addDog(dogData);
    return response;
  };
  const updateNewDog = async (dogData: FormData, id: string) => {
    const response = await editOneDog(dogData, id);
    return response;
  };

  return { updateNewDog,createNewDog, loading, error };
};

