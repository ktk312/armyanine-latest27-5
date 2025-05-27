import { useEffect } from "react";
import { useMicrochipStore } from "../../../store/microchipstore";
import { Microchip } from "../types/microchip";

// Hook to fetch microchips
export const useFetchMicrochips = () => {
  
  const { microchips, microchiploading, error, selectedMicrochip, setSelectedMicrochip, fetchMicrochips } = useMicrochipStore();

  useEffect(() => {
    fetchMicrochips(); 
  }, [fetchMicrochips]);
  return { microchips, microchiploading, error, selectedMicrochip, setSelectedMicrochip };
};

// fetch unassign miocrochips

export const useFetchUnassignMicrochips = () => {
  
  const { microchips, microchiploading, error, selectedMicrochip, setSelectedMicrochip, fetchUnassignMicrochips } = useMicrochipStore();

  useEffect(() => {
    fetchUnassignMicrochips(); 
  }, [fetchUnassignMicrochips]);
  return { microchips, microchiploading, error, selectedMicrochip, setSelectedMicrochip };
};


// Hook to create a microchip
export const useCreateMicrochip = () => {
  const { addMicrochip, microchiploading,  error } = useMicrochipStore();

  const createNewMicrochip = async (chipId: string) => {
    await addMicrochip(chipId);
  };
  return { createNewMicrochip, microchiploading, error };
};

export const useEditMicrochip = () => {
  const { editMicrochip, microchiploading, error } = useMicrochipStore();

  const handleEditMicrochip = async (id: string, data: Partial<Microchip>) => {
   const response = await editMicrochip(Number(id), data);
   return response;
  };

  return { handleEditMicrochip, microchiploading, error };
};

export const useDeleteMicrochip = () => {
  const { deleteMicrochipByChipId, fetchMicrochips, microchiploading, error } = useMicrochipStore();
  // 👆 Notice we also pull fetchMicrochips from the store here.

  const deleteMicrochip = async (id: string) => {
    if (id) {
      const response = await deleteMicrochipByChipId(id);
      await fetchMicrochips(); // 👈 This now works perfectly
      return response;
    }
  };

  return { deleteMicrochip, microchiploading, error };
};
