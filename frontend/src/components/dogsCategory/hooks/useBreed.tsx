import { useQuery } from "@tanstack/react-query";
import { api_keys } from "../../../config/constant";
import {  fetchBreeds } from "../api/dogsApi";
import { useBreedStore } from "../../../store/breedStore";
import { useEffect } from "react";
import { Breed } from "../types/dog";

// Hook to get all breeds
export const useBreeds = () => {
  return useQuery({
    queryKey: [api_keys.GET_BREEDS],
    queryFn: fetchBreeds,
  });
};


export const useFetchBreeds = () => {
  const { getAllBreeds, loading, error, breeds, selectedBreed, setSelectedBreed} = useBreedStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  return { loading, error, breeds, selectedBreed,setSelectedBreed }; //Fix: Return loading, not isLoading
};

// Hook to get a single breed by ID
// export const useBreedById = (id: number) => {
//   return useQuery({
//     queryKey: [api_keys.GET_BREED_BY_ID, id],
//     queryFn: () => fetchBreedById(String(id)),
//     enabled: !!id,
//   });
// };

// // Hook to create a breed
// export const useCreateBreed = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createBreed,
//     onSuccess: () => {
//       queryClient.invalidateQueries([api_keys.GET_BREEDS]);
//     },
//   });
// };

export const useCreateDogbreed = () => {
  const { addBreed, loading, error } = useBreedStore();  // Use `loading` instead of `dogLoading`

  const createNewBreed = async (breedData: Partial<Breed>) => {
    await addBreed(breedData); // Call the addBreed function from the store
  };

  return { createNewBreed, loading, error }; // Return `loading` instead of `dogLoading`
};


export const useUpdateDogbreed = () => {
  const { editBreed, loading, error } = useBreedStore(); // assuming `updateBreed` exists in your store

  const updateExistingBreed = async (id: number, breedData: Partial<Breed>) => {
    await editBreed((id), breedData); // Call the update function from the store
  };

  return { updateExistingBreed, loading, error };
};
// // Hook to update a breed
// export const useUpdateBreed = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: { id: string; breedData: Partial<Breed> }) =>
//       updateBreed(data.id, data.breedData),
//     onSuccess: () => {
//       queryClient.invalidateQueries([api_keys.GET_BREEDS]);
//     },
//   });
// };

// // Hook to delete a breed
// export const useDeleteBreed = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteBreed,
//     onSuccess: () => {
//       queryClient.invalidateQueries([api_keys.GET_BREEDS]);
//     },
//   });
// };
